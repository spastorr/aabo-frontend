/**
 * Document statuses based on APP_Concept.txt
 * @module constants/statuses
 */

export const DOCUMENT_STATUS = {
  APR: 'APR', // Aprobado
  ACC: 'ACC', // Aprobado con comentarios
  CMN: 'CMN', // Comentado
  RCH: 'RCH', // Rechazado
  ELB: 'ELB', // En elaboración
};

export const DOCUMENT_STATUS_LABELS = {
  [DOCUMENT_STATUS.APR]: 'Aprobado',
  [DOCUMENT_STATUS.ACC]: 'Aprobado con Comentarios',
  [DOCUMENT_STATUS.CMN]: 'Comentado',
  [DOCUMENT_STATUS.RCH]: 'Rechazado',
  [DOCUMENT_STATUS.ELB]: 'En Elaboración',
};

export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.ACTIVE]: 'Activo',
  [PROJECT_STATUS.ON_HOLD]: 'En Espera',
  [PROJECT_STATUS.COMPLETED]: 'Completado',
  [PROJECT_STATUS.CANCELLED]: 'Cancelado',
};


export const RFI_STATUS = {
  OPEN: 'OPEN',
  PENDING_RESPONSE: 'PENDING_RESPONSE',
  ANSWERED: 'ANSWERED',
  CLOSED: 'CLOSED',
};

export const RFI_STATUS_LABELS = {
  [RFI_STATUS.OPEN]: 'Abierta',
  [RFI_STATUS.PENDING_RESPONSE]: 'Pendiente Respuesta',
  [RFI_STATUS.ANSWERED]: 'Respondida',
  [RFI_STATUS.CLOSED]: 'Cerrada',
};

export const RFI_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const RFI_PRIORITY_LABELS = {
  [RFI_PRIORITY.LOW]: 'Baja',
  [RFI_PRIORITY.MEDIUM]: 'Media',
  [RFI_PRIORITY.HIGH]: 'Alta',
};

