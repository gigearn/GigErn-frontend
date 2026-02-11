import { useState, useEffect } from 'react';

const USER_DATA_KEY = 'gigEarn_userData';
const DOCUMENTS_KEY = 'gigEarn_documents';

export const useUserManager = () => {
  const [userData, setUserData] = useState(null);
  const [documents, setDocuments] = useState({ requiredDocuments: {} });

  /* ---------- init ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_DATA_KEY);
    const storedDocs = localStorage.getItem(DOCUMENTS_KEY);

    if (storedUser) setUserData(JSON.parse(storedUser));
    if (storedDocs) setDocuments(JSON.parse(storedDocs));
  }, []);

  /* ---------- helpers ---------- */
  const persistDocuments = (updated) => {
    setDocuments(updated);
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
  };

  /* ---------- required docs ---------- */
  const getRequiredDocuments = (role) => {
    if (role === 'gig') {
      return ['aadhaar', 'pan', 'drivingLicense', 'vehicleRC'];
    }
    return [];
  };

  /* ---------- register ---------- */
  const registerUser = (userInfo) => {
    const requiredDocuments = {};
    getRequiredDocuments(userInfo.role).forEach(id => {
      requiredDocuments[id] = {
        uploaded: false,
        fileData: null,
        uploadedAt: null,
        status: null,
      };
    });

    const newUser = {
      ...userInfo,
      verificationStatus: 'unverified',
      createdAt: new Date().toISOString(),
    };

    setUserData(newUser);
    persistDocuments({ requiredDocuments });
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));

    return newUser;
  };

  /* ---------- upload ---------- */
  const uploadDocument = (docId, fileData) => {
    setDocuments(prev => {
      const updated = {
        ...prev,
        requiredDocuments: {
          ...prev.requiredDocuments,
          [docId]: {
            uploaded: true,
            fileData,
            uploadedAt: new Date().toISOString(),
            status: 'pending',
          },
        },
      };

      localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  /* ---------- remove ---------- */
  const removeDocument = (docId) => {
    setDocuments(prev => {
      const updated = {
        ...prev,
        requiredDocuments: {
          ...prev.requiredDocuments,
          [docId]: {
            uploaded: false,
            fileData: null,
            uploadedAt: null,
            status: null,
          },
        },
      };

      localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  /* ---------- progress ---------- */
  const getDocumentProgress = () => {
    const docs = Object.values(documents.requiredDocuments || {});
    const total = docs.length;
    const uploaded = docs.filter(d => d.uploaded).length;

    return {
      total,
      uploaded,
      percentage: total ? Math.round((uploaded / total) * 100) : 0,
    };
  };

  const getMissingDocuments = () =>
    Object.entries(documents.requiredDocuments || {})
      .filter(([_, d]) => !d.uploaded)
      .map(([id]) => id);

  /* ---------- verification ---------- */
  const updateVerificationStatus = (status) => {
    if (!userData) return;
    const updated = {
      ...userData,
      verificationStatus: status,
      verificationUpdatedAt: new Date().toISOString(),
    };
    setUserData(updated);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updated));
  };

  const clearUserData = () => {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(DOCUMENTS_KEY);
    setUserData(null);
    setDocuments({ requiredDocuments: {} });
  };

  return {
    userData,
    documents,
    registerUser,
    uploadDocument,
    removeDocument,
    getDocumentProgress,
    getMissingDocuments,
    updateVerificationStatus,
    clearUserData,
  };
};
