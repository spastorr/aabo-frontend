/**
 * System permissions for RBAC/ABAC
 * @module constants/permissions
 */

export const PERMISSIONS = {
  // Project permissions
  PROJECT_VIEW: 'project:view',
  PROJECT_CREATE: 'project:create',
  PROJECT_EDIT: 'project:edit',
  PROJECT_DELETE: 'project:delete',
  
  // Document permissions
  DOCUMENT_VIEW: 'document:view',
  DOCUMENT_CREATE: 'document:create',
  DOCUMENT_EDIT: 'document:edit',
  DOCUMENT_DELETE: 'document:delete',
  DOCUMENT_APPROVE: 'document:approve',
  DOCUMENT_DOWNLOAD: 'document:download',
  DOCUMENT_VIEW_CONTENT: 'document:view_content',
  
  // Transmittal permissions
  TRANSMITTAL_VIEW: 'transmittal:view',
  TRANSMITTAL_CREATE: 'transmittal:create',
  TRANSMITTAL_SEND: 'transmittal:send',
  
  // RFI permissions
  RFI_VIEW: 'rfi:view',
  RFI_CREATE: 'rfi:create',
  RFI_RESPOND: 'rfi:respond',
  RFI_CLOSE: 'rfi:close',
  
  // Timesheet permissions
  TIMESHEET_VIEW: 'timesheet:view',
  TIMESHEET_CREATE: 'timesheet:create',
  TIMESHEET_APPROVE: 'timesheet:approve',
  
  // Resource permissions
  RESOURCE_VIEW: 'resource:view',
  RESOURCE_ASSIGN: 'resource:assign',
  
  // Admin permissions
  ADMIN_ACCESS: 'admin:access',
  USER_MANAGE: 'user:manage',
  ROLE_MANAGE: 'role:manage',
  CLIENT_MANAGE: 'client:manage',
  SYSTEM_CONFIG: 'system:config',
  AUDIT_VIEW: 'audit:view',
  
  // Knowledge Hub permissions
  KNOWLEDGE_VIEW: 'knowledge:view',
  KNOWLEDGE_UPLOAD: 'knowledge:upload',
  KNOWLEDGE_MANAGE: 'knowledge:manage',
};

export const PERMISSION_LABELS = {
  [PERMISSIONS.PROJECT_VIEW]: 'Ver Proyectos',
  [PERMISSIONS.PROJECT_CREATE]: 'Crear Proyectos',
  [PERMISSIONS.PROJECT_EDIT]: 'Editar Proyectos',
  [PERMISSIONS.PROJECT_DELETE]: 'Eliminar Proyectos',
  [PERMISSIONS.DOCUMENT_VIEW]: 'Ver Documentos',
  [PERMISSIONS.DOCUMENT_CREATE]: 'Crear Documentos',
  [PERMISSIONS.DOCUMENT_EDIT]: 'Editar Documentos',
  [PERMISSIONS.DOCUMENT_DELETE]: 'Eliminar Documentos',
  [PERMISSIONS.DOCUMENT_APPROVE]: 'Aprobar Documentos',
  // ... more labels as needed
};

