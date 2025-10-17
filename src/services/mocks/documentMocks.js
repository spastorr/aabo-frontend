/**
 * Document mock data
 * @module services/mocks/documentMocks
 */

import { DOCUMENT_STATUS, DISCIPLINES } from '../../constants';

export const mockDocuments = [
  {
    id: 'DOC-001',
    code: 'B43ITT298-TPT-10-PFD-001',
    name: 'Diagrama de Flujo de Proceso - Unidad de Destilación',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.PROCESS,
    type: 'PFD',
    status: 'IFC',  // Para Construcción
    revision: '0',
    currentRevision: '0',
    responsible: 'Ing. Carlos Méndez',
    sendDate: '2024-08-15',
    approvalDate: '2024-09-02',
    cost: 4500,
    description: 'PFD de la unidad de destilación atmosférica',
    comments: 'Aprobado para construcción',
    stamp: 'APROBADO PARA CONSTRUCCIÓN',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-0.pdf', name: 'B43ITT298-TPT-10-PFD-001-0.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-0.xlsx', name: 'B43ITT298-TPT-10-PFD-001-0.xlsx', type: 'xlsx' }
    },
    revisionHistory: [
      { 
        revision: '0', 
        date: '2024-09-02', 
        status: 'IFC', 
        comments: 'Aprobado para construcción', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 420,
        costBreakdown: { hours: 6, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-010', code: 'TRN-B43-2024-010', date: '2024-08-30' },
        incomingTransmittal: { id: 'TRN-011', code: 'TRN-B43-IN-2024-011', date: '2024-09-02', clientResponse: 'APR' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-0.pdf', name: 'B43ITT298-TPT-10-PFD-001-0.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-0.xlsx', name: 'B43ITT298-TPT-10-PFD-001-0.xlsx', type: 'xlsx' }
        }
      },
      { 
        revision: 'D', 
        date: '2024-08-25', 
        status: DOCUMENT_STATUS.ACC, 
        comments: 'Ajustar símbolos de válvulas', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 560,
        costBreakdown: { hours: 8, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-008', code: 'TRN-B43-2024-008', date: '2024-08-20' },
        incomingTransmittal: { id: 'TRN-009', code: 'TRN-B43-IN-2024-009', date: '2024-08-25', clientResponse: 'ACC' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-D.pdf', name: 'B43ITT298-TPT-10-PFD-001-D.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-D.xlsx', name: 'B43ITT298-TPT-10-PFD-001-D.xlsx', type: 'xlsx' }
        }
      },
      { 
        revision: 'C', 
        date: '2024-08-15', 
        status: DOCUMENT_STATUS.CMN, 
        comments: 'Revisar balance de masa', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 700,
        costBreakdown: { hours: 10, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-006', code: 'TRN-B43-2024-006', date: '2024-08-10' },
        incomingTransmittal: { id: 'TRN-007', code: 'TRN-B43-IN-2024-007', date: '2024-08-15', clientResponse: 'CMN' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-C.pdf', name: 'B43ITT298-TPT-10-PFD-001-C.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-C.xlsx', name: 'B43ITT298-TPT-10-PFD-001-C.xlsx', type: 'xlsx' }
        }
      },
      { 
        revision: 'B', 
        date: '2024-08-05', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Revisión interna', 
        reviewer: 'Líder de Procesos',
        cost: 840,
        costBreakdown: { hours: 12, rate: 70, resource: 'Ing. Carlos Méndez' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-B.pdf', name: 'B43ITT298-TPT-10-PFD-001-B.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-B.xlsx', name: 'B43ITT298-TPT-10-PFD-001-B.xlsx', type: 'xlsx' }
        }
      },
      { 
        revision: 'A', 
        date: '2024-07-28', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Primera versión', 
        reviewer: 'Ing. Carlos Méndez',
        cost: 1680,
        costBreakdown: { hours: 24, rate: 70, resource: 'Ing. Carlos Méndez' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-10-PFD-001-A.pdf', name: 'B43ITT298-TPT-10-PFD-001-A.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-10-PFD-001-A.xlsx', name: 'B43ITT298-TPT-10-PFD-001-A.xlsx', type: 'xlsx' }
        }
      },
    ],
  },
  {
    id: 'DOC-002',
    code: 'B43ITT298-TPT-10-282',
    name: 'P&ID - Sistema de Enfriamiento',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.PROCESS,
    type: 'DRAWING',  // Es un dibujo, no lleva tipo en el código
    status: DOCUMENT_STATUS.ACC,
    revision: 'D',
    currentRevision: 'D',
    responsible: 'Ing. Carlos Méndez',
    sendDate: '2024-09-10',
    approvalDate: null,
    cost: 6200,
    description: 'P&ID del sistema de agua de enfriamiento',
    comments: 'Revisar válvulas de control - incorporar y enviar Rev. E',
    revisionHistory: [
      { 
        revision: 'D', 
        date: '2024-09-10', 
        status: DOCUMENT_STATUS.ACC, 
        comments: 'Revisar válvulas de control', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 490,
        costBreakdown: { hours: 7, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-012', code: 'TRN-B43-2024-012', date: '2024-09-05' },
        incomingTransmittal: { id: 'TRN-013', code: 'TRN-B43-IN-2024-013', date: '2024-09-10', clientResponse: 'ACC' }
      },
      { 
        revision: 'C', 
        date: '2024-08-30', 
        status: DOCUMENT_STATUS.CMN, 
        comments: 'Ajustar líneas de proceso', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 910,
        costBreakdown: { hours: 13, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-008', code: 'TRN-B43-2024-008', date: '2024-08-25' },
        incomingTransmittal: { id: 'TRN-009', code: 'TRN-B43-IN-2024-009', date: '2024-08-30', clientResponse: 'CMN' }
      },
      { 
        revision: 'B', 
        date: '2024-08-20', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Revisión interna', 
        reviewer: 'Líder de Procesos',
        cost: 1260,
        costBreakdown: { hours: 18, rate: 70, resource: 'Ing. Carlos Méndez' }
      },
    ],
  },
  {
    id: 'DOC-003',
    code: 'B43ITT298-TPT-80-DS-001',
    name: 'Datasheet - Bomba Centrífuga P-101',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.MECHANICAL,
    type: 'DS',
    status: DOCUMENT_STATUS.ELB,
    revision: 'B',
    responsible: 'Ing. Ana Torres',
    sendDate: null,
    approvalDate: null,
    cost: 1800,
    description: 'Hoja de datos de bomba centrífuga',
    comments: 'En revisión interna antes de envío',
    revisionHistory: [
      { 
        revision: 'B', 
        date: '2024-09-28', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Segunda revisión interna', 
        reviewer: 'Líder de Mecánica',
        cost: 520,
        costBreakdown: { hours: 8, rate: 65, resource: 'Ing. Ana Torres' }
      },
      { 
        revision: 'A', 
        date: '2024-09-20', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Primera versión', 
        reviewer: 'Ing. Ana Torres',
        cost: 1040,
        costBreakdown: { hours: 16, rate: 65, resource: 'Ing. Ana Torres' }
      },
    ],
  },
  {
    id: 'DOC-004',
    code: 'B43ITT298-TPT-70-315',
    name: 'Diagrama Unifilar - Subestación Principal',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.ELECTRICAL,
    type: 'DRAWING',
    status: DOCUMENT_STATUS.CMN,
    revision: 'C',
    currentRevision: 'C',
    responsible: 'Ing. Luis Rodríguez',
    sendDate: '2024-09-20',
    approvalDate: null,
    reviewDeadline: '2024-09-27',  // 5 días laborables
    cost: 5400,
    description: 'SLD de la subestación de 13.8kV',
    comments: 'Verificar capacidad de transformadores. Enviar Rev. D',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-70-315-C.pdf', name: 'B43ITT298-TPT-70-315-C.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-70-315-C.dwg', name: 'B43ITT298-TPT-70-315-C.dwg', type: 'dwg' }
    },
    revisionHistory: [
      { 
        revision: 'C', 
        date: '2024-09-20', 
        status: DOCUMENT_STATUS.CMN, 
        comments: 'Verificar capacidad de transformadores', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 1125,
        costBreakdown: { hours: 15, rate: 75, resource: 'Ing. Luis Rodríguez' },
        outgoingTransmittal: { id: 'TRN-014', code: 'TRN-B43-2024-014', date: '2024-09-18' },
        incomingTransmittal: { id: 'TRN-015', code: 'TRN-B43-IN-2024-015', date: '2024-09-20', clientResponse: 'CMN' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-70-315-C.pdf', name: 'B43ITT298-TPT-70-315-C.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-70-315-C.dwg', name: 'B43ITT298-TPT-70-315-C.dwg', type: 'dwg' }
        }
      },
      { 
        revision: 'B', 
        date: '2024-09-10', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Revisión interna', 
        reviewer: 'Líder Eléctrico',
        cost: 1500,
        costBreakdown: { hours: 20, rate: 75, resource: 'Ing. Luis Rodríguez' },
        files: {
          pdf: { url: '/documents/B43ITT298-TPT-70-315-B.pdf', name: 'B43ITT298-TPT-70-315-B.pdf' },
          editable: { url: '/documents/B43ITT298-TPT-70-315-B.dwg', name: 'B43ITT298-TPT-70-315-B.dwg', type: 'dwg' }
        }
      },
    ],
  },
  {
    id: 'DOC-005',
    code: 'B43ITT298-ZPF-30-085',
    name: 'Plano de Fundaciones - Tanques',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.CIVIL,
    type: 'DRAWING',
    status: 'ASB',  // As Built
    revision: '1',
    currentRevision: '1',
    responsible: 'Ing. Patricia Vega',
    sendDate: '2024-07-10',
    approvalDate: '2024-08-05',
    cost: 7800,
    description: 'Planos de fundaciones para tanques de almacenamiento',
    comments: 'As Built - Incorpora cambios de Red Line',
    stamp: 'AS BUILT - COMO SE CONSTRUYÓ',
    redLineReference: 'B43ITT298-ZPF-30-RL-085-0',
    revisionHistory: [
      { 
        revision: '1', 
        date: '2024-10-05', 
        status: 'ASB', 
        comments: 'As Built - Incorpora cambios constructivos', 
        reviewer: 'CDD',
        cost: 975,
        costBreakdown: { hours: 15, rate: 65, resource: 'Ing. Patricia Vega' }
      },
      { 
        revision: '0', 
        date: '2024-08-05', 
        status: 'IFC', 
        comments: 'Aprobado para construcción', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 325,
        costBreakdown: { hours: 5, rate: 65, resource: 'Ing. Patricia Vega' }
      },
      { 
        revision: 'C', 
        date: '2024-07-10', 
        status: DOCUMENT_STATUS.APR, 
        comments: 'Aprobado', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 1300,
        costBreakdown: { hours: 20, rate: 65, resource: 'Ing. Patricia Vega' }
      },
    ],
  },
  {
    id: 'DOC-006',
    code: 'B43ITT298-TPT-60-CALC-003',
    name: 'Cálculo de Lazos de Control',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.INSTRUMENTATION,
    type: 'CALC',
    status: DOCUMENT_STATUS.ACC,
    revision: 'C',
    currentRevision: 'C',
    responsible: 'Ing. Roberto Sánchez',
    sendDate: '2024-09-15',
    approvalDate: null,
    reviewDeadline: '2024-09-22',
    cost: 3200,
    description: 'Dimensionamiento de válvulas de control',
    comments: 'Aprobado con comentarios - Ajustar rangos de instrumentos antes de Rev. 0',
    revisionHistory: [
      { 
        revision: 'C', 
        date: '2024-09-15', 
        status: DOCUMENT_STATUS.ACC, 
        comments: 'Ajustar rangos de instrumentos', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 600,
        costBreakdown: { hours: 8, rate: 75, resource: 'Ing. Roberto Sánchez' },
        outgoingTransmittal: { id: 'TRN-012', code: 'TRN-B43-2024-012', date: '2024-09-12' },
        incomingTransmittal: { id: 'TRN-013', code: 'TRN-B43-IN-2024-013', date: '2024-09-15', clientResponse: 'ACC' }
      },
      { 
        revision: 'B', 
        date: '2024-09-05', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Revisión interna', 
        reviewer: 'Líder I&C',
        cost: 1050,
        costBreakdown: { hours: 14, rate: 75, resource: 'Ing. Roberto Sánchez' }
      },
    ],
  },
  {
    id: 'DOC-007',
    code: 'B43ITT298-TPT-10-ET-007',
    name: 'Especificación Técnica - Intercambiadores',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.PROCESS,
    type: 'ET',
    status: DOCUMENT_STATUS.RCH,
    revision: 'C',
    responsible: 'Ing. Carlos Méndez',
    sendDate: '2024-08-25',
    approvalDate: null,
    reviewDeadline: '2024-09-01',
    cost: 4100,
    description: 'ET para intercambiadores de calor',
    comments: 'RECHAZADO - Revisar completamente condiciones de diseño y parámetros térmicos',
    revisionHistory: [
      { 
        revision: 'C', 
        date: '2024-08-25', 
        status: DOCUMENT_STATUS.RCH, 
        comments: 'Rechazado - Errores en diseño térmico', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 840,
        costBreakdown: { hours: 12, rate: 70, resource: 'Ing. Carlos Méndez' },
        outgoingTransmittal: { id: 'TRN-008', code: 'TRN-B43-2024-008', date: '2024-08-22' },
        incomingTransmittal: { id: 'TRN-009', code: 'TRN-B43-IN-2024-009', date: '2024-08-25', clientResponse: 'RCH' }
      },
      { 
        revision: 'B', 
        date: '2024-08-15', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Revisión interna', 
        reviewer: 'Líder de Procesos',
        cost: 1540,
        costBreakdown: { hours: 22, rate: 70, resource: 'Ing. Carlos Méndez' }
      },
    ],
  },
  {
    id: 'DOC-008',
    code: 'B43ITT298-TPT-80-DS-002',
    name: 'Datasheet - Compresor K-201',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.MECHANICAL,
    type: 'DS',
    status: DOCUMENT_STATUS.ELB,
    revision: 'A',
    responsible: 'Ing. Ana Torres',
    sendDate: null,
    approvalDate: null,
    cost: 2100,
    description: 'Hoja de datos de compresor centrífugo',
    comments: 'En elaboración - primera versión',
    revisionHistory: [
      { 
        revision: 'A', 
        date: '2024-09-28', 
        status: DOCUMENT_STATUS.ELB, 
        comments: 'Primera versión', 
        reviewer: 'Ing. Ana Torres',
        cost: 1170,
        costBreakdown: { hours: 18, rate: 65, resource: 'Ing. Ana Torres' }
      },
    ],
  },
  {
    id: 'DOC-009',
    code: 'B43ITT298-ZPF-30-RL-085',
    name: 'Red Line - Fundaciones Tanques (Cambios en Campo)',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.CIVIL,
    type: 'RED_LINE',
    status: 'RDL',
    revision: '0',
    responsible: 'Fiscalizador de Obra',
    sendDate: '2024-09-15',
    approvalDate: '2024-09-15',
    cost: 0,
    description: 'Marcas de cambios realizados en campo sobre plano de fundaciones',
    comments: 'Cambios: Ajuste en profundidad de cimentación debido a hallazgos geotécnicos',
    stamp: 'RED LINE - CAMBIOS EN CAMPO',
    originalDocumentCode: 'B43ITT298-ZPF-30-085-0',
    revisionHistory: [
      { 
        revision: '0', 
        date: '2024-09-15', 
        status: 'RDL', 
        comments: 'Cambios en campo documentados', 
        reviewer: 'Fiscalizador',
        cost: 195,
        costBreakdown: { hours: 3, rate: 65, resource: 'Fiscalizador de Obra' },
        incomingTransmittal: { id: 'TRN-016', code: 'TRN-B43-IN-2024-016', date: '2024-09-15', clientResponse: 'RDL' }
      },
    ],
  },
  // Documentos pendientes de envío - Ejemplos
  {
    id: 'DOC-010',
    code: 'B43ITT298-TPT-10-PFD-002',
    name: 'Diagrama de Flujo de Proceso - Unidad de Hidrotratamiento',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.PROCESS,
    type: 'PFD',
    status: 'ELB',  // En elaboración - listo para primera entrega
    revision: 'A',
    currentRevision: 'A',
    responsible: 'Ing. María González',
    sendDate: null,  // No ha sido enviado aún
    approvalDate: null,
    cost: 3200,
    description: 'PFD de la unidad de hidrotratamiento de naftas',
    comments: 'Documento listo para primera entrega al cliente',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-10-PFD-002-A.pdf', name: 'B43ITT298-TPT-10-PFD-002-A.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-10-PFD-002-A.xlsx', name: 'B43ITT298-TPT-10-PFD-002-A.xlsx', type: 'xlsx' }
    },
    revisionHistory: [
      { 
        revision: 'A', 
        date: '2024-10-15', 
        status: 'ELB', 
        comments: 'Primera versión - Lista para envío', 
        reviewer: 'Ing. María González',
        cost: 3200,
        costBreakdown: { hours: 40, rate: 80, resource: 'Ing. María González' }
      },
    ],
  },
  {
    id: 'DOC-011',
    code: 'B43ITT298-TPT-10-283',
    name: 'P&ID - Sistema de Hidrotratamiento',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.PROCESS,
    type: 'DRAWING',
    status: 'CMN',  // Comentado - necesita incorporar comentarios
    revision: 'D',
    currentRevision: 'D',
    responsible: 'Ing. Carlos Méndez',
    sendDate: '2024-10-10',
    approvalDate: null,
    cost: 4800,
    description: 'P&ID del sistema de hidrotratamiento con comentarios incorporados',
    comments: 'Incorporar comentarios del cliente y reenviar Rev. E',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-10-283-D.pdf', name: 'B43ITT298-TPT-10-283-D.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-10-283-D.dwg', name: 'B43ITT298-TPT-10-283-D.dwg', type: 'dwg' }
    },
    revisionHistory: [
      { 
        revision: 'D', 
        date: '2024-10-15', 
        status: 'CMN', 
        comments: 'Comentarios incorporados - Listo para reenvío', 
        reviewer: 'Ing. Carlos Méndez',
        cost: 600,
        costBreakdown: { hours: 8, rate: 75, resource: 'Ing. Carlos Méndez' }
      },
      { 
        revision: 'C', 
        date: '2024-10-10', 
        status: 'CMN', 
        comments: 'Revisar válvulas de control', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 450,
        outgoingTransmittal: { id: 'TRN-017', code: 'TRN-B43-2024-017', date: '2024-10-08' },
        incomingTransmittal: { id: 'TRN-018', code: 'TRN-B43-IN-2024-018', date: '2024-10-10', clientResponse: 'CMN' }
      },
    ],
  },
  {
    id: 'DOC-012',
    code: 'B43ITT298-TPT-80-DS-003',
    name: 'Datasheet - Intercambiador de Calor E-201',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.MECHANICAL,
    type: 'DS',
    status: 'ACC',  // Aprobado con comentarios - listo para Rev. 0
    revision: 'C',
    currentRevision: 'C',
    responsible: 'Ing. Ana Torres',
    sendDate: '2024-10-12',
    approvalDate: null,
    cost: 2800,
    description: 'Hoja de datos de intercambiador de calor',
    comments: 'Aprobado con comentarios menores - Listo para Rev. 0',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-80-DS-003-C.pdf', name: 'B43ITT298-TPT-80-DS-003-C.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-80-DS-003-C.xlsx', name: 'B43ITT298-TPT-80-DS-003-C.xlsx', type: 'xlsx' }
    },
    revisionHistory: [
      { 
        revision: 'C', 
        date: '2024-10-15', 
        status: 'ACC', 
        comments: 'Comentarios menores incorporados - Listo para Rev. 0', 
        reviewer: 'Ing. Ana Torres',
        cost: 400,
        costBreakdown: { hours: 5, rate: 80, resource: 'Ing. Ana Torres' }
      },
      { 
        revision: 'B', 
        date: '2024-10-12', 
        status: 'ACC', 
        comments: 'Ajustar especificaciones térmicas', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 600,
        outgoingTransmittal: { id: 'TRN-019', code: 'TRN-B43-2024-019', date: '2024-10-10' },
        incomingTransmittal: { id: 'TRN-020', code: 'TRN-B43-IN-2024-020', date: '2024-10-12', clientResponse: 'ACC' }
      },
    ],
  },
  {
    id: 'DOC-013',
    code: 'B43ITT298-TPT-70-316',
    name: 'Diagrama Unifilar - Tablero de Distribución',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.ELECTRICAL,
    type: 'DRAWING',
    status: 'RCH',  // Rechazado - necesita reelaboración
    revision: 'B',
    currentRevision: 'B',
    responsible: 'Ing. Luis Rodríguez',
    sendDate: '2024-10-08',
    approvalDate: null,
    cost: 3600,
    description: 'SLD del tablero de distribución principal',
    comments: 'Reelaborar completamente - Errores en especificaciones eléctricas',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-70-316-B.pdf', name: 'B43ITT298-TPT-70-316-B.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-70-316-B.dwg', name: 'B43ITT298-TPT-70-316-B.dwg', type: 'dwg' }
    },
    revisionHistory: [
      { 
        revision: 'B', 
        date: '2024-10-15', 
        status: 'RCH', 
        comments: 'Reelaborado según comentarios - Listo para reenvío', 
        reviewer: 'Ing. Luis Rodríguez',
        cost: 1200,
        costBreakdown: { hours: 15, rate: 80, resource: 'Ing. Luis Rodríguez' }
      },
      { 
        revision: 'A', 
        date: '2024-10-08', 
        status: 'RCH', 
        comments: 'Errores en especificaciones eléctricas', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 800,
        outgoingTransmittal: { id: 'TRN-021', code: 'TRN-B43-2024-021', date: '2024-10-05' },
        incomingTransmittal: { id: 'TRN-022', code: 'TRN-B43-IN-2024-022', date: '2024-10-08', clientResponse: 'RCH' }
      },
    ],
  },
  {
    id: 'DOC-014',
    code: 'B43ITT298-TPT-60-CALC-004',
    name: 'Cálculo de Presión de Diseño',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.INSTRUMENTATION,
    type: 'CALC',
    status: 'APR',  // Aprobado - listo para Rev. 0
    revision: 'D',
    currentRevision: 'D',
    responsible: 'Ing. Roberto Sánchez',
    sendDate: '2024-10-14',
    approvalDate: null,
    cost: 2400,
    description: 'Cálculo de presión de diseño para válvulas de seguridad',
    comments: 'Aprobado sin comentarios - Listo para Rev. 0',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-TPT-60-CALC-004-D.pdf', name: 'B43ITT298-TPT-60-CALC-004-D.pdf' },
      editable: { url: '/documents/B43ITT298-TPT-60-CALC-004-D.xlsx', name: 'B43ITT298-TPT-60-CALC-004-D.xlsx', type: 'xlsx' }
    },
    revisionHistory: [
      { 
        revision: 'D', 
        date: '2024-10-15', 
        status: 'APR', 
        comments: 'Aprobado sin comentarios - Listo para Rev. 0', 
        reviewer: 'Fiscalizador PETROECUADOR',
        cost: 300,
        outgoingTransmittal: { id: 'TRN-023', code: 'TRN-B43-2024-023', date: '2024-10-12' },
        incomingTransmittal: { id: 'TRN-024', code: 'TRN-B43-IN-2024-024', date: '2024-10-14', clientResponse: 'APR' }
      },
    ],
  },
  {
    id: 'DOC-015',
    code: 'B43ITT298-ZPF-30-086',
    name: 'Plano de Fundaciones - Edificio de Control',
    projectId: 'PROJ-001',
    discipline: DISCIPLINES.CIVIL,
    type: 'DRAWING',
    status: 'ELB',  // En elaboración - listo para primera entrega
    revision: 'A',
    currentRevision: 'A',
    responsible: 'Ing. Patricia Vega',
    sendDate: null,  // No ha sido enviado aún
    approvalDate: null,
    cost: 4200,
    description: 'Planos de fundaciones para edificio de control',
    comments: 'Documento listo para primera entrega al cliente',
    currentFiles: {
      pdf: { url: '/documents/B43ITT298-ZPF-30-086-A.pdf', name: 'B43ITT298-ZPF-30-086-A.pdf' },
      editable: { url: '/documents/B43ITT298-ZPF-30-086-A.dwg', name: 'B43ITT298-ZPF-30-086-A.dwg', type: 'dwg' }
    },
    revisionHistory: [
      { 
        revision: 'A', 
        date: '2024-10-16', 
        status: 'ELB', 
        comments: 'Primera versión - Lista para envío', 
        reviewer: 'Ing. Patricia Vega',
        cost: 4200,
        costBreakdown: { hours: 60, rate: 70, resource: 'Ing. Patricia Vega' }
      },
    ],
  },
];

export const getDocumentsByProject = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const docs = mockDocuments.filter(d => d.projectId === projectId);
      resolve({ success: true, data: docs });
    }, 400);
  });
};

// Alias for compatibility with LMD integration in transmittals
export const getLMDByProject = getDocumentsByProject;

export const getDocumentById = (documentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const doc = mockDocuments.find(d => d.id === documentId);
      if (doc) {
        resolve({ success: true, data: doc });
      } else {
        reject({ success: false, error: 'Document not found' });
      }
    }, 300);
  });
};

export const createDocument = (projectId, documentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDoc = {
        id: `DOC-${String(mockDocuments.length + 1).padStart(3, '0')}`,
        projectId,
        ...documentData,
        status: DOCUMENT_STATUS.ELB,
        revision: '0',
        sendDate: null,
        approvalDate: null,
      };
      resolve({ success: true, data: newDoc });
    }, 500);
  });
};

export const updateDocument = (documentId, documentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: { id: documentId, ...documentData } });
    }, 400);
  });
};

export const deleteDocument = (documentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Document deleted' });
    }, 300);
  });
};

export const getDocumentHistory = (documentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = [
        {
          id: 'VER-001',
          revision: 'B',
          date: '2024-09-02',
          status: DOCUMENT_STATUS.APR,
          comments: 'Aprobado sin comentarios',
          user: 'Cliente',
        },
        {
          id: 'VER-002',
          revision: 'A',
          date: '2024-08-20',
          status: DOCUMENT_STATUS.ACC,
          comments: 'Revisar detalles de tubería',
          user: 'Cliente',
        },
        {
          id: 'VER-003',
          revision: '0',
          date: '2024-08-05',
          status: DOCUMENT_STATUS.CMN,
          comments: 'Comentarios menores',
          user: 'Cliente',
        },
      ];
      resolve({ success: true, data: history });
    }, 400);
  });
};

