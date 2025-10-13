/**
 * RFI mock data
 * @module services/mocks/rfiMocks
 */

import { RFI_STATUS } from '../../constants';

export const mockRFIs = [
  {
    id: 'RFI-001',
    code: 'RFI-RLL-MOD-0001',
    projectId: 'PROJ-001',
    subject: 'Aclaración sobre presión de diseño',
    description: 'Solicitud de confirmación de presión de diseño para tanque T-101. Se requiere verificar si la presión de diseño de 150 PSI especificada en el P&ID es consistente con las condiciones de operación esperadas según el estudio de proceso.',
    status: RFI_STATUS.ANSWERED,
    priority: 'HIGH',
    createdBy: 'Ing. Carlos Méndez',
    createdDate: '2024-08-20',
    responseDate: '2024-08-25',
    recipient: 'Cliente - Departamento Técnico',
    dueDate: '2024-08-23',
    transmittalId: 'TRN-001',
    linkedDocuments: ['PRC-RLL-MOD-001-P001-Rev A', 'PRC-RLL-MOD-001-T001-Rev 0'],
    response: 'La presión de diseño de 150 PSI es correcta. Sin embargo, se recomienda aumentar el factor de seguridad considerando las condiciones de pico durante el arranque. Favor revisar el documento adjunto con las nuevas especificaciones.',
  },
  {
    id: 'RFI-002',
    code: 'RFI-RLL-MOD-0002',
    projectId: 'PROJ-001',
    subject: 'Especificación de material para tubería de alta temperatura',
    description: 'Se requiere confirmar el material especificado para la línea L-201 que operará a 450°C. El material propuesto es SA-106 Gr. B pero existen dudas sobre su idoneidad para estas condiciones.',
    status: RFI_STATUS.PENDING_RESPONSE,
    priority: 'MEDIUM',
    createdBy: 'Ing. María González',
    createdDate: '2024-10-05',
    recipient: 'Cliente - Ingeniería de Materiales',
    dueDate: '2024-10-12',
    linkedDocuments: ['MEC-RLL-MOD-001-L201-Rev A'],
  },
  {
    id: 'RFI-003',
    code: 'RFI-RLL-MOD-0003',
    projectId: 'PROJ-001',
    subject: 'Ubicación de instrumentos de control en sala de control',
    description: 'Solicitud de plano de distribución de sala de control para ubicar correctamente los displays y paneles de control del sistema SCADA.',
    status: RFI_STATUS.OPEN,
    priority: 'LOW',
    createdBy: 'Ing. Pedro Ramírez',
    createdDate: '2024-10-10',
    recipient: 'Cliente - Departamento de Instrumentación',
    dueDate: '2024-10-20',
    transmittalId: 'TRN-003',
  },
  {
    id: 'RFI-004',
    code: 'RFI-RLL-MOD-0004',
    projectId: 'PROJ-001',
    subject: 'Clarificación sobre normativa de seguridad aplicable',
    description: 'Se requiere confirmar si además de NFPA 70, se debe aplicar alguna normativa local específica para las instalaciones eléctricas del área clasificada Zona 1.',
    status: RFI_STATUS.ANSWERED,
    priority: 'HIGH',
    createdBy: 'Ing. Laura Torres',
    createdDate: '2024-09-15',
    responseDate: '2024-09-18',
    recipient: 'Cliente - HSE',
    dueDate: '2024-09-17',
    response: 'Confirmar aplicación de NFPA 70 y adicionalmente la norma local NEC-2020 Sección 505. Adjunto documento con los requisitos específicos.',
    linkedDocuments: ['ELE-RLL-MOD-001-CA01-Rev B'],
  },
  {
    id: 'RFI-005',
    code: 'RFI-RLL-MOD-0005',
    projectId: 'PROJ-001',
    subject: 'Carga de viento para diseño estructural',
    description: 'Solicitud de información sobre la velocidad de viento de diseño a considerar para las estructuras metálicas según la ubicación geográfica del proyecto.',
    status: RFI_STATUS.CLOSED,
    priority: 'MEDIUM',
    createdBy: 'Ing. Roberto Silva',
    createdDate: '2024-08-01',
    responseDate: '2024-08-05',
    recipient: 'Cliente - Ingeniería Civil',
    dueDate: '2024-08-04',
    response: 'La velocidad de viento de diseño es de 160 km/h. Considerar ASCE 7-16 para los cálculos estructurales.',
  },
];

export const getRFIsByProject = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rfis = mockRFIs.filter(r => r.projectId === projectId);
      resolve({ success: true, data: rfis });
    }, 400);
  });
};

export const createRFI = (rfiData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRFI = {
        id: `RFI-${Date.now()}`,
        ...rfiData,
        createdDate: new Date().toISOString().split('T')[0],
      };
      mockRFIs.push(newRFI);
      resolve({ success: true, data: newRFI });
    }, 300);
  });
};

/**
 * Get RFIs by transmittal ID
 * @param {string} transmittalId - The transmittal ID
 * @returns {Promise} Promise with RFIs data
 */
export const getRFIsByTransmittal = (transmittalId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rfis = mockRFIs.filter(rfi => rfi.transmittalId === transmittalId);
      resolve({ success: true, data: rfis });
    }, 300);
  });
};

export const updateRFI = (rfiId, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockRFIs.findIndex(r => r.id === rfiId);
      if (index !== -1) {
        mockRFIs[index] = { ...mockRFIs[index], ...updates };
        resolve({ success: true, data: mockRFIs[index] });
      } else {
        resolve({ success: false, error: 'RFI not found' });
      }
    }, 300);
  });
};

