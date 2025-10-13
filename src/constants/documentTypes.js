/**
 * Document types
 * @module constants/documentTypes
 */

export const DOCUMENT_TYPES = {
  // Process documents
  PFD: 'PFD', // Process Flow Diagram
  PID: 'PID', // Piping & Instrumentation Diagram
  HMB: 'HMB', // Heat & Material Balance
  DATASHEET: 'DATASHEET',
  
  // Mechanical documents
  GA_DRAWING: 'GA_DRAWING', // General Arrangement
  EQUIPMENT_LIST: 'EQUIPMENT_LIST',
  CALCULATION: 'CALCULATION',
  
  // Electrical documents
  SLD: 'SLD', // Single Line Diagram
  CABLE_SCHEDULE: 'CABLE_SCHEDULE',
  
  // Civil/Structural
  STRUCTURAL_DRAWING: 'STRUCTURAL_DRAWING',
  FOUNDATION_DRAWING: 'FOUNDATION_DRAWING',
  
  // General
  SPECIFICATION: 'SPECIFICATION',
  REPORT: 'REPORT',
  PROCEDURE: 'PROCEDURE',
  MANUAL: 'MANUAL',
  OTHER: 'OTHER',
};

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.PFD]: 'Diagrama de Flujo de Proceso',
  [DOCUMENT_TYPES.PID]: 'Diagrama P&ID',
  [DOCUMENT_TYPES.HMB]: 'Balance de Masa y Energía',
  [DOCUMENT_TYPES.DATASHEET]: 'Hoja de Datos',
  [DOCUMENT_TYPES.GA_DRAWING]: 'Arreglo General',
  [DOCUMENT_TYPES.EQUIPMENT_LIST]: 'Lista de Equipos',
  [DOCUMENT_TYPES.CALCULATION]: 'Cálculo',
  [DOCUMENT_TYPES.SLD]: 'Diagrama Unifilar',
  [DOCUMENT_TYPES.CABLE_SCHEDULE]: 'Lista de Cables',
  [DOCUMENT_TYPES.STRUCTURAL_DRAWING]: 'Plano Estructural',
  [DOCUMENT_TYPES.FOUNDATION_DRAWING]: 'Plano de Fundaciones',
  [DOCUMENT_TYPES.SPECIFICATION]: 'Especificación',
  [DOCUMENT_TYPES.REPORT]: 'Reporte',
  [DOCUMENT_TYPES.PROCEDURE]: 'Procedimiento',
  [DOCUMENT_TYPES.MANUAL]: 'Manual',
  [DOCUMENT_TYPES.OTHER]: 'Otro',
};

