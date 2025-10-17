/**
 * Gantt chart mock data
 * @module services/mocks/ganttMocks
 */

import { DOCUMENT_STATUS_DETAILED, REVISION_STAGES } from '../../constants/documentLifecycle';
import { DISCIPLINES, DOCUMENT_TYPES } from '../../constants';

// Mock documents with timeline data
export const mockGanttDocuments = [
  {
    id: 'DOC-001',
    code: 'B43ITT298-SHY-TPT-10-PFD-001',
    name: 'Diagrama de Flujo de Proceso',
    type: 'PFD',
    discipline: 'PROCESS',
    status: 'IFC',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    sendDate: '2024-02-10',
    approvalDate: '2024-02-15',
    dueDate: '2024-02-20',
    responsible: 'Ing. Juan Pérez',
    cost: 15000,
    description: 'Diagrama principal del proceso de refinación',
    currentRevision: '0',
    revisions: [
      { revision: 'A', date: '2024-01-20', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-01-25', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-02-10', type: 'FOR_REVIEW', status: 'COMPLETED' },
      { revision: '0', date: '2024-02-15', type: 'FOR_CONSTRUCTION', status: 'COMPLETED' }
    ]
  },
  {
    id: 'DOC-002',
    code: 'B43ITT298-SHY-TPT-50-PID-001',
    name: 'Diagrama P&ID - Línea Principal',
    type: 'PID',
    discipline: 'PIPING',
    status: 'REV',
    startDate: '2024-01-20',
    endDate: '2024-03-10',
    sendDate: '2024-03-05',
    dueDate: '2024-03-15',
    responsible: 'Ing. María García',
    cost: 25000,
    description: 'Diagrama de tuberías e instrumentación',
    currentRevision: 'C',
    revisions: [
      { revision: 'A', date: '2024-01-25', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-02-05', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-03-05', type: 'FOR_REVIEW', status: 'PENDING' }
    ]
  },
  {
    id: 'DOC-003',
    code: 'B43ITT298-SHY-TPT-80-GA-001',
    name: 'Arreglo General - Unidad de Proceso',
    type: 'DRAWING',
    discipline: 'MECHANICAL',
    status: 'CMN',
    startDate: '2024-02-01',
    endDate: '2024-04-15',
    sendDate: '2024-04-10',
    approvalDate: null,
    dueDate: '2024-04-20',
    responsible: 'Ing. Carlos López',
    cost: 18000,
    description: 'Plano de arreglo general de equipos',
    currentRevision: 'D',
    revisions: [
      { revision: 'A', date: '2024-02-10', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-02-20', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-04-10', type: 'FOR_REVIEW', status: 'COMPLETED' },
      { revision: 'D', date: '2024-04-15', type: 'WITH_COMMENTS', status: 'IN_PROGRESS' }
    ]
  },
  {
    id: 'DOC-004',
    code: 'B43ITT298-SHY-TPT-70-SLD-001',
    name: 'Diagrama Unifilar - Alimentación Principal',
    type: 'SLD',
    discipline: 'ELECTRICAL',
    status: 'ELB',
    startDate: '2024-02-15',
    endDate: '2024-04-30',
    sendDate: null,
    dueDate: '2024-05-10',
    responsible: 'Ing. Ana Martínez',
    cost: 12000,
    description: 'Diagrama unifilar del sistema eléctrico',
    currentRevision: 'B',
    revisions: [
      { revision: 'A', date: '2024-02-25', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-03-15', type: 'INTERNAL', status: 'IN_PROGRESS' }
    ]
  },
  {
    id: 'DOC-005',
    code: 'B43ITT298-SHY-TPT-30-FND-001',
    name: 'Plano de Fundaciones - Estructura Principal',
    type: 'DRAWING',
    discipline: 'CIVIL',
    status: 'APR',
    startDate: '2024-01-30',
    endDate: '2024-03-20',
    sendDate: '2024-03-15',
    approvalDate: '2024-03-20',
    dueDate: '2024-03-25',
    responsible: 'Ing. Roberto Silva',
    cost: 20000,
    description: 'Planos de fundaciones y estructuras',
    currentRevision: '0',
    revisions: [
      { revision: 'A', date: '2024-02-10', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-02-25', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-03-15', type: 'FOR_REVIEW', status: 'COMPLETED' },
      { revision: '0', date: '2024-03-20', type: 'FOR_CONSTRUCTION', status: 'COMPLETED' }
    ]
  },
  {
    id: 'DOC-006',
    code: 'B43ITT298-SHY-TPT-60-ITB-001',
    name: 'Lista de Instrumentos - Control de Proceso',
    type: 'DATASHEET',
    discipline: 'INSTRUMENTATION',
    status: 'REV',
    startDate: '2024-03-01',
    endDate: '2024-05-15',
    sendDate: '2024-05-10',
    dueDate: '2024-05-20',
    responsible: 'Ing. Luis Fernández',
    cost: 16000,
    description: 'Lista de instrumentos y controladores',
    currentRevision: 'C',
    revisions: [
      { revision: 'A', date: '2024-03-15', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-04-05', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-05-10', type: 'FOR_REVIEW', status: 'PENDING' }
    ]
  },
  {
    id: 'DOC-007',
    code: 'B43ITT298-SHY-TPT-80-CAL-001',
    name: 'Memoria de Cálculo - Presión de Diseño',
    type: 'CALCULATION',
    discipline: 'MECHANICAL',
    status: 'ELB',
    startDate: '2024-03-10',
    endDate: '2024-05-30',
    sendDate: null,
    dueDate: '2024-06-10',
    responsible: 'Ing. Patricia Ruiz',
    cost: 14000,
    description: 'Cálculos de presión y espesores',
    currentRevision: 'A',
    revisions: [
      { revision: 'A', date: '2024-03-20', type: 'INTERNAL', status: 'IN_PROGRESS' }
    ]
  },
  {
    id: 'DOC-008',
    code: 'B43ITT298-SHY-TPT-10-SPC-001',
    name: 'Especificación Técnica - Equipos de Proceso',
    type: 'SPECIFICATION',
    discipline: 'PROCESS',
    status: 'IFC',
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    sendDate: '2024-02-25',
    approvalDate: '2024-02-28',
    dueDate: '2024-03-05',
    responsible: 'Ing. Diego Morales',
    cost: 22000,
    description: 'Especificaciones técnicas de equipos',
    currentRevision: '0',
    revisions: [
      { revision: 'A', date: '2024-01-20', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'B', date: '2024-02-05', type: 'INTERNAL', status: 'COMPLETED' },
      { revision: 'C', date: '2024-02-25', type: 'FOR_REVIEW', status: 'COMPLETED' },
      { revision: '0', date: '2024-02-28', type: 'FOR_CONSTRUCTION', status: 'COMPLETED' }
    ]
  }
];

// Mock revisions timeline
export const mockGanttRevisions = [
  // Document 1 revisions
  {
    id: 'REV-001',
    documentId: 'DOC-001',
    revision: 'A',
    date: '2024-01-20',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Revisión interna inicial',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-002',
    documentId: 'DOC-001',
    revision: 'B',
    date: '2024-01-25',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Correcciones menores',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-003',
    documentId: 'DOC-001',
    revision: 'C',
    date: '2024-02-10',
    type: 'FOR_REVIEW',
    status: 'COMPLETED',
    comments: 'Primera entrega al cliente',
    reviewer: 'PETROECUADOR'
  },
  {
    id: 'REV-004',
    documentId: 'DOC-001',
    revision: '0',
    date: '2024-02-15',
    type: 'FOR_CONSTRUCTION',
    status: 'COMPLETED',
    comments: 'Aprobado para construcción',
    reviewer: 'PETROECUADOR'
  },
  
  // Document 2 revisions
  {
    id: 'REV-005',
    documentId: 'DOC-002',
    revision: 'A',
    date: '2024-01-25',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Revisión interna',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-006',
    documentId: 'DOC-002',
    revision: 'B',
    date: '2024-02-05',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Ajustes de diseño',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-007',
    documentId: 'DOC-002',
    revision: 'C',
    date: '2024-03-05',
    type: 'FOR_REVIEW',
    status: 'PENDING',
    comments: 'Enviado para revisión',
    reviewer: 'PETROECUADOR'
  },
  
  // Document 3 revisions
  {
    id: 'REV-008',
    documentId: 'DOC-003',
    revision: 'A',
    date: '2024-02-10',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Revisión interna',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-009',
    documentId: 'DOC-003',
    revision: 'B',
    date: '2024-02-20',
    type: 'INTERNAL',
    status: 'COMPLETED',
    comments: 'Correcciones',
    reviewer: 'Ing. Supervisor'
  },
  {
    id: 'REV-010',
    documentId: 'DOC-003',
    revision: 'C',
    date: '2024-04-10',
    type: 'FOR_REVIEW',
    status: 'COMPLETED',
    comments: 'Primera entrega',
    reviewer: 'PETROECUADOR'
  },
  {
    id: 'REV-011',
    documentId: 'DOC-003',
    revision: 'D',
    date: '2024-04-15',
    type: 'WITH_COMMENTS',
    status: 'IN_PROGRESS',
    comments: 'Incorporando comentarios',
    reviewer: 'PETROECUADOR'
  }
];

// Mock milestones
export const mockGanttMilestones = [
  {
    id: 'MIL-001',
    name: 'Inicio de Proyecto',
    date: '2024-01-15',
    type: 'PROJECT_START',
    description: 'Fecha de inicio del proyecto'
  },
  {
    id: 'MIL-002',
    name: 'Primera Entrega',
    date: '2024-03-15',
    type: 'DELIVERY',
    description: 'Primera entrega de documentos'
  },
  {
    id: 'MIL-003',
    name: 'Revisión de Cliente',
    date: '2024-04-30',
    type: 'REVIEW',
    description: 'Fecha límite para comentarios del cliente'
  },
  {
    id: 'MIL-004',
    name: 'Documentos para Construcción',
    date: '2024-06-15',
    type: 'FOR_CONSTRUCTION',
    description: 'Todos los documentos en Rev. 0'
  },
  {
    id: 'MIL-005',
    name: 'Fin de Proyecto',
    date: '2024-07-30',
    type: 'PROJECT_END',
    description: 'Fecha de finalización del proyecto'
  }
];

// API functions
export const getProjectGanttDocuments = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockGanttDocuments.map(doc => ({
          ...doc,
          projectId
        }))
      });
    }, 500);
  });
};

export const getProjectGanttRevisions = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockGanttRevisions.map(rev => ({
          ...rev,
          projectId
        }))
      });
    }, 300);
  });
};

export const getProjectGanttMilestones = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: mockGanttMilestones.map(milestone => ({
          ...milestone,
          projectId
        }))
      });
    }, 200);
  });
};
