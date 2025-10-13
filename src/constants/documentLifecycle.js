/**
 * Document lifecycle constants based on PETROECUADOR manual
 * @module constants/documentLifecycle
 */

// Document revision types
export const REVISION_TYPE = {
  INTERNAL: 'INTERNAL',      // A, B - Internal revisions (not sent to client)
  FOR_REVIEW: 'FOR_REVIEW',  // C - First submission to PETROECUADOR
  WITH_COMMENTS: 'WITH_COMMENTS', // D, E, etc. - Revisions with incorporated comments
  FOR_CONSTRUCTION: 'FOR_CONSTRUCTION', // 0 - Approved for construction
  AS_BUILT: 'AS_BUILT',      // 1, 2, etc. - As-built revisions
  RED_LINE: 'RED_LINE',      // RL - Field changes markup
};

// Document status detailed labels
export const DOCUMENT_STATUS_DETAILED = {
  // Internal revisions (A, B)
  ELB: {
    code: 'ELB',
    label: 'En Elaboración',
    description: 'Documento en desarrollo interno',
    color: { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
  },
  
  // Submitted for review (C onwards)
  REV: {
    code: 'REV',
    label: 'En Revisión',
    description: 'Enviado a PETROECUADOR para revisión',
    color: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  },
  
  // Client feedback
  CMN: {
    code: 'CMN',
    label: 'Comentado',
    description: 'Requiere incorporar comentarios',
    color: { bg: '#fef3c7', text: '#854d0e', border: '#fde047' },
  },
  
  ACC: {
    code: 'ACC',
    label: 'Aprobado con Comentarios',
    description: 'Comentarios menores, puede pasar a Rev. 0',
    color: { bg: '#fef3c7', text: '#854d0e', border: '#fde047' },
  },
  
  RCH: {
    code: 'RCH',
    label: 'Rechazado',
    description: 'Errores fundamentales, debe reelaborarse',
    color: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  },
  
  // Approved states
  APR: {
    code: 'APR',
    label: 'Aprobado',
    description: 'Listo para emitir Rev. 0',
    color: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  },
  
  IFC: {
    code: 'IFC',
    label: 'Para Construcción',
    description: 'Rev. 0 - Aprobado para construcción',
    color: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  },
  
  // Field and as-built
  RDL: {
    code: 'RDL',
    label: 'Red Line',
    description: 'Marcas de cambios en campo',
    color: { bg: '#fce7f3', text: '#831843', border: '#f9a8d4' },
  },
  
  ASB: {
    code: 'ASB',
    label: 'As Built',
    description: 'Como se construyó - Registro final',
    color: { bg: '#e0e7ff', text: '#3730a3', border: '#a5b4fc' },
  },
};

// Revision stages
export const REVISION_STAGES = {
  INTERNAL_A: { code: 'A', type: REVISION_TYPE.INTERNAL, label: 'Rev. A - Interna', sendToClient: false },
  INTERNAL_B: { code: 'B', type: REVISION_TYPE.INTERNAL, label: 'Rev. B - Interna', sendToClient: false },
  FIRST_SUBMISSION: { code: 'C', type: REVISION_TYPE.FOR_REVIEW, label: 'Rev. C - Primera Entrega', sendToClient: true },
  REVISION_D: { code: 'D', type: REVISION_TYPE.WITH_COMMENTS, label: 'Rev. D - Con Comentarios', sendToClient: true },
  REVISION_E: { code: 'E', type: REVISION_TYPE.WITH_COMMENTS, label: 'Rev. E - Con Comentarios', sendToClient: true },
  FOR_CONSTRUCTION: { code: '0', type: REVISION_TYPE.FOR_CONSTRUCTION, label: 'Rev. 0 - Para Construcción', sendToClient: true },
  AS_BUILT_1: { code: '1', type: REVISION_TYPE.AS_BUILT, label: 'Rev. 1 - As Built', sendToClient: true },
  AS_BUILT_2: { code: '2', type: REVISION_TYPE.AS_BUILT, label: 'Rev. 2 - As Built', sendToClient: true },
};

// Document code structure fields
export const CODE_FIELDS = {
  PROJECT: 'project',          // B43ITT298
  CONTRACTOR: 'contractor',    // SHY (opcional)
  LOCATION: 'location',        // TPT
  DISCIPLINE: 'discipline',    // 70
  DOCTYPE: 'doctype',          // LDC (se omite para dibujos)
  SEQUENTIAL: 'sequential',    // 001
  REVISION: 'revision',        // C, 0, 1, etc.
};

// Discipline codes (numeric)
export const DISCIPLINE_CODES = {
  PROCESS: '10',
  CIVIL: '30',
  PIPING: '50',
  INSTRUMENTATION: '60',
  ELECTRICAL: '70',
  MECHANICAL: '80',
};

export const DISCIPLINE_CODE_LABELS = {
  '10': 'Procesos',
  '30': 'Civil',
  '50': 'Tubería',
  '60': 'Instrumentación',
  '70': 'Eléctrico',
  '80': 'Mecánica',
};

// Review timeline in working days
export const REVIEW_TIMELINE = {
  STANDARD: 5,  // 5 días laborables para revisión estándar
  URGENT: 2,    // 2 días para revisiones urgentes
  COMPLEX: 10,  // 10 días para documentos complejos
};

// Stamps/Seals
export const DOCUMENT_STAMPS = {
  FOR_CONSTRUCTION: 'APROBADO PARA CONSTRUCCIÓN',
  AS_BUILT: 'AS BUILT - COMO SE CONSTRUYÓ',
  RED_LINE: 'RED LINE - CAMBIOS EN CAMPO',
};

