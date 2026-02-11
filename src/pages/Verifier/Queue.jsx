import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const VerificationQueue = () => {
  const navigate = useNavigate();
  const { pendingStoreVerifications, pendingGigVerifications } = useAdminData();
  const [activeTab, setActiveTab] = useState('stores');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter verifications based on search
  const filteredStoreVerifications = useMemo(() => 
    pendingStoreVerifications.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.phone.includes(searchTerm)
    ), [pendingStoreVerifications, searchTerm]);

  const filteredGigVerifications = useMemo(() =>
    pendingGigVerifications.filter(gig =>
      gig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.phone.includes(searchTerm)
    ), [pendingGigVerifications, searchTerm]);

  // Calculate SLA time
  const calculateSLA = (submittedAt) => {
    const submitted = new Date(submittedAt);
    const now = new Date();
    const diffMs = now - submitted;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24);
      return `${days}d ${diffHours % 24}h`;
    }
    return `${diffHours}h ${diffMins}m`;
  };

  const getSLAColor = (submittedAt) => {
    const submitted = new Date(submittedAt);
    const now = new Date();
    const diffHours = (now - submitted) / (1000 * 60 * 60);
    
    if (diffHours > 24) return 'text-destructive';
    if (diffHours > 8) return 'text-warning';
    return 'text-success';
  };

  const handleReview = (entityType, entityId) => {
    navigate(`/verify/review/${entityType}/${entityId}`);
  };

  const tabs = useMemo(() => [
    {
      id: 'stores',
      label: 'Store Verifications',
      count: filteredStoreVerifications.length,
      icon: 'Store',
    },
    {
      id: 'gigs',
      label: 'Gig Verifications',
      count: filteredGigVerifications.length,
      icon: 'Users',
    },
  ], [filteredStoreVerifications.length, filteredGigVerifications.length]);

  return (
    <div 
      className="w-full px-6 pb-6" 
      style={{ 
        paddingTop: '0px !important', 
        marginTop: '0px !important',
        position: 'relative',
        top: '0px'
      }}
    >
      {/* Header */}
      <div 
        className="mb-4" 
        style={{ 
          marginTop: '0px !important',
          paddingTop: '0px !important'
        }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Verification Queue</h1>
        <p className="text-muted-foreground">
          Review and process pending document verifications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pending</p>
              <p className="text-2xl font-bold text-foreground">
                {filteredStoreVerifications.length + filteredGigVerifications.length}
              </p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Store Verifications</p>
              <p className="text-2xl font-bold text-foreground">
                {filteredStoreVerifications.length}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="Store" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Gig Verifications</p>
              <p className="text-2xl font-bold text-foreground">
                {filteredGigVerifications.length}
              </p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <Icon name="Users" size={24} className="text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Verification List */}
      <div className="space-y-4">
        {activeTab === 'stores' && (
          <>
            {filteredStoreVerifications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Store Verifications</h3>
                <p className="text-muted-foreground">All store verifications are up to date</p>
              </div>
            ) : (
              filteredStoreVerifications.map((store, index) => (
                <div key={`store-${store.userId}-${index}`} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-foreground">{store.name}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                          PENDING
                        </span>
                        {!store.hasAllDocuments && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                            DOCUMENTS MISSING
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground">{store.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="text-foreground">{store.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className={getSLAColor(store.registeredAt)}>
                            {calculateSLA(store.registeredAt)} ago
                          </p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground mb-2">Required Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {store.requiredDocuments?.map((doc, docIndex) => {
                            const isUploaded = store.documents?.[doc.id]?.uploaded;
                            return (
                              <span
                                key={`doc-${doc.id}-${docIndex}`}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  isUploaded
                                    ? 'bg-success/10 text-success'
                                    : 'bg-destructive/10 text-destructive'
                                }`}
                              >
                                {doc.name} {isUploaded ? '✓' : '✗'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() => handleReview('store', store.userId)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'gigs' && (
          <>
            {filteredGigVerifications.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Gig Verifications</h3>
                <p className="text-muted-foreground">All gig verifications are up to date</p>
              </div>
            ) : (
              filteredGigVerifications.map((gig, index) => (
                <div key={`gig-${gig.userId}-${index}`} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold text-foreground">{gig.name}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                          PENDING
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                          NEWCOMER
                        </span>
                        {!gig.hasAllDocuments && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                            DOCUMENTS MISSING
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground">{gig.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="text-foreground">{gig.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className={getSLAColor(gig.registeredAt)}>
                            {calculateSLA(gig.registeredAt)} ago
                          </p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground mb-2">Required Documents:</p>
                        <div className="flex flex-wrap gap-2">
                          {gig.requiredDocuments?.map((doc, docIndex) => {
                            const isUploaded = gig.documents?.[doc.id]?.uploaded;
                            return (
                              <span
                                key={`doc-${doc.id}-${docIndex}`}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  isUploaded
                                    ? 'bg-success/10 text-success'
                                    : 'bg-destructive/10 text-destructive'
                                }`}
                              >
                                {doc.name} {isUploaded ? '✓' : '✗'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() => handleReview('gig', gig.userId)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationQueue;
