// Simple UUID generator
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Audit log storage key
const AUDIT_LOG_KEY = 'gigEarn_auditLog';

// Audit action types
export const AUDIT_ACTIONS = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REQUESTED_REUPLOAD: 'requested_reupload',
  BLOCKED: 'blocked',
  UNBLOCKED: 'unblocked',
  OVERRIDDEN: 'overridden',
};

// Rejection reasons
export const REJECTION_REASONS = {
  BLURRY_DOC: 'BLURRY_DOC',
  MISMATCH: 'MISMATCH',
  EXPIRED: 'EXPIRED',
  INCOMPLETE: 'INCOMPLETE',
  FAKE: 'FAKE',
  POOR_QUALITY: 'POOR_QUALITY',
  INVALID_FORMAT: 'INVALID_FORMAT',
  MISSING_INFO: 'MISSING_INFO',
};

// Create audit log entry
export const createAuditLog = (entityType, entityId, action, verifierId, verifierName, reason = null, notes = null) => {
  const auditEntry = {
    id: generateUUID(),
    entityType, // 'gig' | 'store'
    entityId,
    action,
    verifierId,
    verifierName,
    reason,
    notes,
    timestamp: new Date().toISOString(),
  };

  // Save to localStorage
  try {
    const existingLogs = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
    existingLogs.push(auditEntry);
    
    // Keep only last 1000 entries to prevent storage issues
    if (existingLogs.length > 1000) {
      existingLogs.splice(0, existingLogs.length - 1000);
    }
    
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(existingLogs));
  } catch (error) {
    console.error('Error saving audit log:', error);
  }

  return auditEntry;
};

// Get audit logs
export const getAuditLogs = (filters = {}) => {
  try {
    const logs = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
    
    let filteredLogs = logs;
    
    // Apply filters
    if (filters.entityType) {
      filteredLogs = filteredLogs.filter(log => log.entityType === filters.entityType);
    }
    
    if (filters.entityId) {
      filteredLogs = filteredLogs.filter(log => log.entityId === filters.entityId);
    }
    
    if (filters.verifierId) {
      filteredLogs = filteredLogs.filter(log => log.verifierId === filters.verifierId);
    }
    
    if (filters.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action);
    }
    
    if (filters.startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(filters.endDate));
    }
    
    // Sort by timestamp (newest first)
    return filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
  } catch (error) {
    console.error('Error getting audit logs:', error);
    return [];
  }
};

// Get verifier performance stats
export const getVerifierStats = (verifierId, startDate = null, endDate = null) => {
  const logs = getAuditLogs({
    verifierId,
    startDate,
    endDate,
  });

  const stats = {
    totalReviewed: logs.length,
    approved: logs.filter(log => log.action === AUDIT_ACTIONS.APPROVED).length,
    rejected: logs.filter(log => log.action === AUDIT_ACTIONS.REJECTED).length,
    requestedReupload: logs.filter(log => log.action === AUDIT_ACTIONS.REQUESTED_REUPLOAD).length,
    averageTime: 0, // This would need more complex calculation with submission times
  };

  stats.approvalRate = stats.totalReviewed > 0 ? (stats.approved / stats.totalReviewed) * 100 : 0;

  return stats;
};

// Get all verifiers performance
export const getAllVerifiersStats = (startDate = null, endDate = null) => {
  const logs = getAuditLogs({ startDate, endDate });
  
  // Group by verifier
  const verifierGroups = {};
  logs.forEach(log => {
    if (!verifierGroups[log.verifierId]) {
      verifierGroups[log.verifierId] = {
        verifierId: log.verifierId,
        verifierName: log.verifierName,
        logs: []
      };
    }
    verifierGroups[log.verifierId].logs.push(log);
  });

  // Calculate stats for each verifier
  return Object.values(verifierGroups).map(verifier => {
    const stats = getVerifierStats(verifier.verifierId, startDate, endDate);
    return {
      ...verifier,
      ...stats
    };
  });
};

// Get entity verification history
export const getEntityHistory = (entityType, entityId) => {
  return getAuditLogs({ entityType, entityId });
};
