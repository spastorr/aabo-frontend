/**
 * Document traceability utilities
 * @module utils/documentTraceabilityUtils
 */

import { 
  REVIEW_TIMELINE, 
  DOCUMENT_STATUS_DETAILED, 
  ALERT_TYPES,
  COST_CATEGORIES,
  TRACEABILITY_SECTIONS 
} from '../constants/documentLifecycle';

/**
 * Calculate working days between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Number of working days
 */
export const calculateWorkingDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  
  while (start <= end) {
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++;
    }
    start.setDate(start.getDate() + 1);
  }
  
  return count;
};

/**
 * Check if a document review is overdue
 * @param {Object} document - Document object
 * @param {string} reviewDeadline - Review deadline date
 * @returns {Object} Overdue status and days overdue
 */
export const checkReviewOverdue = (document, reviewDeadline) => {
  if (!reviewDeadline || !document.sendDate) {
    return { isOverdue: false, daysOverdue: 0 };
  }

  const today = new Date();
  const deadline = new Date(reviewDeadline);
  const daysOverdue = Math.max(0, calculateWorkingDays(deadline, today));
  
  return {
    isOverdue: daysOverdue > 0,
    daysOverdue,
    deadline: reviewDeadline,
    sendDate: document.sendDate
  };
};

/**
 * Calculate review deadline based on send date and timeline
 * @param {string} sendDate - Date when document was sent
 * @param {string} timeline - Review timeline (STANDARD, URGENT, COMPLEX)
 * @returns {string} Review deadline date
 */
export const calculateReviewDeadline = (sendDate, timeline = REVIEW_TIMELINE.STANDARD) => {
  if (!sendDate) return null;
  
  const send = new Date(sendDate);
  const workingDays = typeof timeline === 'number' ? timeline : REVIEW_TIMELINE[timeline] || REVIEW_TIMELINE.STANDARD;
  
  let count = 0;
  let currentDate = new Date(send);
  
  while (count < workingDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
      count++;
    }
  }
  
  return currentDate.toISOString().split('T')[0];
};

/**
 * Generate document alerts based on current status and dates
 * @param {Object} document - Document object
 * @returns {Array} Array of alerts
 */
export const generateDocumentAlerts = (document) => {
  const alerts = [];
  
  // Check for overdue reviews
  if (document.reviewDeadline) {
    const overdueCheck = checkReviewOverdue(document, document.reviewDeadline);
    if (overdueCheck.isOverdue) {
      alerts.push({
        type: ALERT_TYPES.REVIEW_OVERDUE,
        severity: 'high',
        message: `Revisión vencida hace ${overdueCheck.daysOverdue} días laborables`,
        details: {
          deadline: overdueCheck.deadline,
          sendDate: overdueCheck.sendDate,
          daysOverdue: overdueCheck.daysOverdue
        },
        action: 'Contactar cliente para seguimiento'
      });
    }
  }
  
  // Check for pending approvals
  if (document.status === 'APR' && !document.approvalDate) {
    alerts.push({
      type: ALERT_TYPES.APPROVAL_PENDING,
      severity: 'medium',
      message: 'Documento aprobado - Listo para Rev. 0',
      details: {
        currentRevision: document.currentRevision,
        status: document.status
      },
      action: 'Generar Rev. 0 para construcción'
    });
  }
  
  // Check for high revision cycles
  if (document.revisionHistory && document.revisionHistory.length > 5) {
    alerts.push({
      type: ALERT_TYPES.REVISION_CYCLE,
      severity: 'low',
      message: `Documento con ${document.revisionHistory.length} revisiones`,
      details: {
        revisionCount: document.revisionHistory.length,
        currentRevision: document.currentRevision
      },
      action: 'Revisar proceso de elaboración'
    });
  }
  
  return alerts;
};

/**
 * Calculate total cost for a document across all revisions
 * @param {Object} document - Document object
 * @returns {Object} Cost breakdown
 */
export const calculateDocumentCosts = (document) => {
  const costs = {
    total: 0,
    byCategory: {},
    byRevision: [],
    breakdown: {
      development: 0,
      review: 0,
      revision: 0,
      approval: 0,
      transmittal: 0,
      redLine: 0,
      asBuilt: 0
    }
  };
  
  if (document.revisionHistory) {
    document.revisionHistory.forEach(revision => {
      const revisionCost = revision.cost || 0;
      costs.total += revisionCost;
      
      // Categorize costs
      if (revision.revision === 'A' || revision.revision === 'B') {
        costs.breakdown.development += revisionCost;
      } else if (revision.status === 'IFC' || revision.status === 'ASB') {
        costs.breakdown.approval += revisionCost;
      } else if (revision.status === 'RDL') {
        costs.breakdown.redLine += revisionCost;
      } else {
        costs.breakdown.revision += revisionCost;
      }
      
      // Track by revision
      costs.byRevision.push({
        revision: revision.revision,
        cost: revisionCost,
        date: revision.date,
        status: revision.status
      });
    });
  }
  
  return costs;
};

/**
 * Generate document traceability report
 * @param {Object} document - Document object
 * @returns {Object} Complete traceability report
 */
export const generateTraceabilityReport = (document) => {
  const alerts = generateDocumentAlerts(document);
  const costs = calculateDocumentCosts(document);
  
  return {
    document: {
      id: document.id,
      code: document.code,
      name: document.name,
      currentStatus: document.status,
      currentRevision: document.currentRevision,
      responsible: document.responsible,
      discipline: document.discipline
    },
    
    timeline: {
      created: document.revisionHistory?.[document.revisionHistory.length - 1]?.date,
      firstSubmission: document.revisionHistory?.find(r => r.outgoingTransmittal)?.date,
      lastActivity: document.revisionHistory?.[0]?.date,
      approvalDate: document.approvalDate,
      totalDays: document.revisionHistory ? 
        calculateWorkingDays(
          document.revisionHistory[document.revisionHistory.length - 1]?.date,
          document.revisionHistory[0]?.date
        ) : 0
    },
    
    revisionHistory: document.revisionHistory || [],
    
    transmittals: {
      outgoing: document.revisionHistory?.filter(r => r.outgoingTransmittal).map(r => r.outgoingTransmittal) || [],
      incoming: document.revisionHistory?.filter(r => r.incomingTransmittal).map(r => r.incomingTransmittal) || []
    },
    
    costs,
    
    alerts,
    
    files: {
      current: document.currentFiles || {},
      historical: document.revisionHistory?.map(r => r.files).filter(Boolean) || []
    },
    
    workflow: {
      currentStage: getCurrentWorkflowStage(document),
      nextActions: getNextWorkflowActions(document),
      blockers: getWorkflowBlockers(document)
    }
  };
};

/**
 * Get current workflow stage for a document
 * @param {Object} document - Document object
 * @returns {string} Current workflow stage
 */
export const getCurrentWorkflowStage = (document) => {
  if (document.status === 'ELB') {
    return 'INTERNAL_REVIEW';
  } else if (document.status === 'REV') {
    return 'CLIENT_REVIEWING';
  } else if (['CMN', 'ACC', 'RCH'].includes(document.status)) {
    return 'CLIENT_RESPONSE_RECEIVED';
  } else if (document.status === 'APR') {
    return 'READY_FOR_SUBMISSION';
  } else if (document.status === 'IFC') {
    return 'APPROVED_FOR_CONSTRUCTION';
  } else if (document.status === 'ASB') {
    return 'AS_BUILT_COMPLETE';
  } else if (document.status === 'RDL') {
    return 'CONSTRUCTION_COMPLETE';
  }
  
  return 'DRAFT';
};

/**
 * Get next workflow actions for a document
 * @param {Object} document - Document object
 * @returns {Array} Array of next actions
 */
export const getNextWorkflowActions = (document) => {
  const actions = [];
  
  switch (document.status) {
    case 'ELB':
      actions.push('Completar revisión interna');
      actions.push('Preparar para envío al cliente');
      break;
    case 'REV':
      actions.push('Esperar respuesta del cliente');
      actions.push('Seguimiento si no hay respuesta');
      break;
    case 'CMN':
      actions.push('Incorporar comentarios del cliente');
      actions.push('Preparar siguiente revisión');
      break;
    case 'ACC':
      actions.push('Realizar ajustes menores');
      actions.push('Preparar Rev. 0');
      break;
    case 'RCH':
      actions.push('Reelaborar documento');
      actions.push('Revisar proceso de elaboración');
      break;
    case 'APR':
      actions.push('Generar Rev. 0');
      actions.push('Enviar para construcción');
      break;
    case 'IFC':
      actions.push('Monitorear construcción');
      actions.push('Documentar cambios en campo');
      break;
  }
  
  return actions;
};

/**
 * Get workflow blockers for a document
 * @param {Object} document - Document object
 * @returns {Array} Array of blockers
 */
export const getWorkflowBlockers = (document) => {
  const blockers = [];
  
  // Check for overdue reviews
  if (document.reviewDeadline) {
    const overdueCheck = checkReviewOverdue(document, document.reviewDeadline);
    if (overdueCheck.isOverdue) {
      blockers.push({
        type: 'CLIENT_RESPONSE',
        message: 'Cliente no ha respondido en el plazo establecido',
        severity: 'high',
        daysOverdue: overdueCheck.daysOverdue
      });
    }
  }
  
  // Check for missing files
  if (!document.currentFiles || (!document.currentFiles.pdf && !document.currentFiles.editable)) {
    blockers.push({
      type: 'MISSING_FILES',
      message: 'Documento sin archivos adjuntos',
      severity: 'medium'
    });
  }
  
  // Check for high revision count
  if (document.revisionHistory && document.revisionHistory.length > 5) {
    blockers.push({
      type: 'HIGH_REVISION_COUNT',
      message: 'Documento con muchas revisiones',
      severity: 'low',
      revisionCount: document.revisionHistory.length
    });
  }
  
  return blockers;
};

/**
 * Format document status with color and icon
 * @param {string} status - Document status
 * @returns {Object} Formatted status with styling
 */
export const formatDocumentStatus = (status) => {
  const statusConfig = DOCUMENT_STATUS_DETAILED[status];
  if (!statusConfig) {
    return {
      label: status,
      color: { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
      icon: '📄'
    };
  }
  
  const icons = {
    ELB: '📝',
    REV: '📤',
    CMN: '💬',
    ACC: '✅',
    RCH: '❌',
    APR: '✅',
    IFC: '🏗️',
    RDL: '🔴',
    ASB: '📋',
    OVERDUE: '⚠️'
  };
  
  return {
    ...statusConfig,
    icon: icons[status] || '📄'
  };
};

/**
 * Get documents that need attention (overdue, pending actions)
 * @param {Array} documents - Array of documents
 * @returns {Array} Documents needing attention
 */
export const getDocumentsNeedingAttention = (documents) => {
  return documents.filter(doc => {
    const alerts = generateDocumentAlerts(doc);
    return alerts.length > 0;
  }).map(doc => ({
    ...doc,
    alerts: generateDocumentAlerts(doc),
    priority: generateDocumentAlerts(doc).some(a => a.severity === 'high') ? 'high' : 'medium'
  }));
};

/**
 * Calculate project document statistics
 * @param {Array} documents - Array of documents
 * @returns {Object} Project statistics
 */
export const calculateProjectDocumentStats = (documents) => {
  const stats = {
    total: documents.length,
    byStatus: {},
    byDiscipline: {},
    overdue: 0,
    pendingTransmittal: 0,
    totalCost: 0,
    averageRevisions: 0
  };
  
  documents.forEach(doc => {
    // Count by status
    stats.byStatus[doc.status] = (stats.byStatus[doc.status] || 0) + 1;
    
    // Count by discipline
    stats.byDiscipline[doc.discipline] = (stats.byDiscipline[doc.discipline] || 0) + 1;
    
    // Check for overdue
    if (doc.reviewDeadline && checkReviewOverdue(doc, doc.reviewDeadline).isOverdue) {
      stats.overdue++;
    }
    
    // Check for pending transmittal
    if (doc.status === 'APR' && !doc.approvalDate) {
      stats.pendingTransmittal++;
    }
    
    // Calculate costs
    const costs = calculateDocumentCosts(doc);
    stats.totalCost += costs.total;
    
    // Count revisions
    if (doc.revisionHistory) {
      stats.averageRevisions += doc.revisionHistory.length;
    }
  });
  
  stats.averageRevisions = stats.total > 0 ? stats.averageRevisions / stats.total : 0;
  
  return stats;
};

/**
 * Mock function to save document changes
 * In a real application, this would make an API call
 * @param {Object} document - Updated document object
 * @returns {Promise<Object>} Success response
 */
export const saveDocumentChanges = async (document) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be:
  // return await api.put(`/documents/${document.id}`, document);
  
  console.log('Document saved:', document);
  
  return {
    success: true,
    data: document,
    message: 'Documento actualizado correctamente'
  };
};
