/**
 * Document status utilities for tracking pending transmissions
 * @module utils/documentStatusUtils
 */

import { DOCUMENT_STATUS_DETAILED } from '../constants/documentLifecycle';

/**
 * Check if a document is ready to be transmitted
 * @param {Object} document - The document object
 * @returns {boolean} - True if document is ready for transmission
 */
export const isDocumentReadyForTransmission = (document) => {
  if (!document) return false;
  
  // Documents that are ready to be sent:
  // 1. ELB status with current revision (ready for first submission)
  // 2. CMN, ACC, RCH status (need to incorporate comments and resend)
  // 3. APR status (approved, ready for Rev. 0)
  
  const readyStatuses = ['ELB', 'CMN', 'ACC', 'RCH', 'APR'];
  
  return readyStatuses.includes(document.status) && 
         document.currentRevision && 
         document.currentFiles;
};

/**
 * Check if a document has been transmitted in its current revision
 * @param {Object} document - The document object
 * @returns {boolean} - True if document has been transmitted
 */
export const hasDocumentBeenTransmitted = (document) => {
  if (!document || !document.revisionHistory) return false;
  
  // Check if current revision has an outgoing transmittal
  const currentRevision = document.currentRevision || document.revision;
  const currentRevisionHistory = document.revisionHistory.find(
    rev => rev.revision === currentRevision
  );
  
  return currentRevisionHistory && currentRevisionHistory.outgoingTransmittal;
};

/**
 * Check if a document is pending transmission
 * @param {Object} document - The document object
 * @returns {boolean} - True if document is pending transmission
 */
export const isDocumentPendingTransmission = (document) => {
  return isDocumentReadyForTransmission(document) && 
         !hasDocumentBeenTransmitted(document);
};

/**
 * Get the transmission status of a document
 * @param {Object} document - The document object
 * @returns {string} - Status: 'ready', 'pending', 'transmitted', 'not_ready'
 */
export const getDocumentTransmissionStatus = (document) => {
  if (!isDocumentReadyForTransmission(document)) {
    return 'not_ready';
  }
  
  if (hasDocumentBeenTransmitted(document)) {
    return 'transmitted';
  }
  
  return 'pending';
};

/**
 * Get documents pending transmission from a list
 * @param {Array} documents - Array of document objects
 * @returns {Array} - Array of documents pending transmission
 */
export const getPendingTransmissionDocuments = (documents) => {
  if (!Array.isArray(documents)) return [];
  
  return documents.filter(isDocumentPendingTransmission);
};

/**
 * Get transmission urgency based on document status and date
 * @param {Object} document - The document object
 * @returns {string} - Urgency level: 'low', 'normal', 'high', 'urgent'
 */
export const getDocumentTransmissionUrgency = (document) => {
  if (!document) return 'normal';
  
  // High urgency for documents with client feedback that need response
  if (['CMN', 'ACC', 'RCH'].includes(document.status)) {
    return 'high';
  }
  
  // Normal urgency for approved documents ready for construction
  if (document.status === 'APR') {
    return 'normal';
  }
  
  // Low urgency for internal documents ready for first submission
  if (document.status === 'ELB') {
    return 'low';
  }
  
  return 'normal';
};

/**
 * Get transmission priority based on document properties
 * @param {Object} document - The document object
 * @returns {string} - Priority: 'LOW', 'NORMAL', 'HIGH', 'URGENT'
 */
export const getDocumentTransmissionPriority = (document) => {
  const urgency = getDocumentTransmissionUrgency(document);
  
  switch (urgency) {
    case 'urgent':
      return 'URGENT';
    case 'high':
      return 'HIGH';
    case 'low':
      return 'LOW';
    default:
      return 'NORMAL';
  }
};

/**
 * Get transmission status label for display
 * @param {string} status - The transmission status
 * @returns {string} - Human-readable label
 */
export const getTransmissionStatusLabel = (status) => {
  const labels = {
    'ready': 'Listo para envío',
    'pending': 'Pendiente de envío',
    'transmitted': 'Ya enviado',
    'not_ready': 'No listo'
  };
  
  return labels[status] || 'Desconocido';
};

/**
 * Get transmission status color for UI
 * @param {string} status - The transmission status
 * @returns {string} - CSS color class or hex color
 */
export const getTransmissionStatusColor = (status) => {
  const colors = {
    'ready': '#10b981',      // green
    'pending': '#f59e0b',   // amber
    'transmitted': '#6b7280', // gray
    'not_ready': '#ef4444'  // red
  };
  
  return colors[status] || '#6b7280';
};

/**
 * Get transmission status icon for UI
 * @param {string} status - The transmission status
 * @returns {string} - Emoji or icon name
 */
export const getTransmissionStatusIcon = (status) => {
  const icons = {
    'ready': '✅',
    'pending': '⏳',
    'transmitted': '📤',
    'not_ready': '❌'
  };
  
  return icons[status] || '❓';
};

/**
 * Group documents by transmission status
 * @param {Array} documents - Array of document objects
 * @returns {Object} - Grouped documents by status
 */
export const groupDocumentsByTransmissionStatus = (documents) => {
  if (!Array.isArray(documents)) return {};
  
  return documents.reduce((groups, document) => {
    const status = getDocumentTransmissionStatus(document);
    
    if (!groups[status]) {
      groups[status] = [];
    }
    
    groups[status].push(document);
    
    return groups;
  }, {});
};

/**
 * Get transmission statistics for a project
 * @param {Array} documents - Array of document objects
 * @returns {Object} - Statistics object
 */
export const getTransmissionStatistics = (documents) => {
  if (!Array.isArray(documents)) {
    return {
      total: 0,
      pending: 0,
      transmitted: 0,
      notReady: 0,
      ready: 0
    };
  }
  
  const groups = groupDocumentsByTransmissionStatus(documents);
  
  return {
    total: documents.length,
    pending: groups.pending?.length || 0,
    transmitted: groups.transmitted?.length || 0,
    notReady: groups.not_ready?.length || 0,
    ready: groups.ready?.length || 0
  };
};
