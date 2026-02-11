import React, { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserManager } from '../../hooks/useUserManager';
import DocumentUpload from '../../components/elements/DocumentsUpload';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';

/* ---------- helpers ---------- */
const shortenFileName = (name, max = 18) => {
  if (!name) return '';
  if (name.length <= max) return name;
  const ext = name.split('.').pop();
  return `${name.slice(0, max - ext.length - 3)}...${ext}`;
};

const GigDocuments = () => {
  const { user } = useAuth();
  const {
    userData,
    documents,
    uploadDocument,
    removeDocument,
    updateVerificationStatus
  } = useUserManager();

  const [isSaving, setIsSaving] = useState(false);

  const isVerified = userData?.verificationStatus === 'verified';

  const requiredDocuments = [
    { id: 'aadhaar', type: 'Aadhaar Card', description: 'Government issued ID proof' },
    { id: 'pan', type: 'PAN Card', description: 'Permanent Account Number' },
    { id: 'drivingLicense', type: 'Driving License', description: 'Valid driving license' },
    { id: 'vehicleRC', type: 'Vehicle RC', description: 'Vehicle Registration Certificate' }
  ];

  /* ---------- derived state (reactive) ---------- */
  const documentProgress = useMemo(() => {
    const docs = documents?.requiredDocuments || {};
    const uploaded = Object.values(docs).filter(d => d?.uploaded).length;
    const total = requiredDocuments.length;

    return {
      uploaded,
      total,
      percentage: Math.round((uploaded / total) * 100)
    };
  }, [documents, requiredDocuments.length]);

  const hasAllRequired = documentProgress.uploaded === documentProgress.total;

  /* ---------- handlers ---------- */
  const handleDocumentUpload = (documentType, file) => {
    const reader = new FileReader();
    reader.onload = e => {
      uploadDocument(documentType, {
        name: file.name,
        size: file.size,
        type: file.type,
        data: e.target.result,
        uploadedAt: new Date().toISOString(),
        uploaded: true,
        status: 'pending'
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDocuments = async () => {
    if (!hasAllRequired) return;

    setIsSaving(true);
    try {
      await updateVerificationStatus('pending');
      alert('Documents submitted for verification.');
    } catch {
      alert('Failed to submit documents.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-muted-foreground">
          Upload and manage your verification documents
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Upload Progress</h3>
          <span className="text-sm font-medium">
            {documentProgress.uploaded}/{documentProgress.total}
          </span>
        </div>

        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span>{documentProgress.percentage}%</span>
        </div>

        <div className="h-2 bg-muted rounded-full">
          <div
            className="h-2 bg-primary rounded-full transition-all"
            style={{ width: `${documentProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-xl border bg-card">
        <div className="p-6 border-b">
          <h3 className="font-semibold">Required Documents</h3>
        </div>

        <div className="p-6 space-y-6">
          {requiredDocuments.map(doc => {
            const uploadedDoc = documents?.requiredDocuments?.[doc.id];
            const isUploaded = uploadedDoc?.uploaded;

            return (
              <div
                key={doc.id}
                className={`border rounded-lg p-4 ${
                  isUploaded ? 'border-success/20 bg-success/5' : ''
                }`}
              >
                <div className="mb-3">
                  <h4 className="font-medium">{doc.type}</h4>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>

                {!isVerified && (
                  <>
                    <DocumentUpload
                      label={isUploaded ? 'Update Document' : 'Upload Document'}
                      accept="image/*,.pdf"
                      onUpload={file => handleDocumentUpload(doc.id, file)}
                      existingDocument={uploadedDoc || null}
                    />

                    {isUploaded && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 text-error"
                        onClick={() => removeDocument(doc.id)}
                      >
                        <Icon name="Trash2" size={14} className="mr-1" />
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save */}
      {!isVerified && (
        <Button
          size="lg"
          disabled={!hasAllRequired || isSaving}
          onClick={handleSaveDocuments}
        >
          {isSaving ? 'Saving…' : 'Save & Submit Documents'}
        </Button>
      )}
    </div>
  );
};

export default GigDocuments;
