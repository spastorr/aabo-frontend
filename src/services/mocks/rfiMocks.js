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
    estimatedResponseDate: '2024-08-25', // Fecha estimada de respuesta
    recipient: 'Cliente - Departamento Técnico',
    dueDate: '2024-08-23',
    transmittalId: 'TRN-001', // Transmittal donde se envió
    responseTransmittalId: 'TRN-002', // Transmittal de respuesta
    linkedDocuments: ['PRC-RLL-MOD-001-P001-Rev A', 'PRC-RLL-MOD-001-T001-Rev 0'],
    response: 'La presión de diseño de 150 PSI es correcta. Sin embargo, se recomienda aumentar el factor de seguridad considerando las condiciones de pico durante el arranque. Favor revisar el documento adjunto con las nuevas especificaciones.',
    alertStatus: 'RESPONDED', // RESPONDED, OVERDUE, APPROACHING_DUE, ON_TIME
    daysOverdue: 0,
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
    estimatedResponseDate: '2024-10-10', // 5 días después de creación
    recipient: 'Cliente - Ingeniería de Materiales',
    dueDate: '2024-10-12',
    transmittalId: 'TRN-003', // Transmittal donde se envió
    linkedDocuments: ['MEC-RLL-MOD-001-L201-Rev A'],
    alertStatus: 'OVERDUE', // Ya pasó la fecha estimada
    daysOverdue: 3, // Días de retraso
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
    estimatedResponseDate: '2024-10-15', // 5 días después de creación
    recipient: 'Cliente - Departamento de Instrumentación',
    dueDate: '2024-10-20',
    transmittalId: 'TRN-003',
    alertStatus: 'APPROACHING_DUE', // Se acerca la fecha estimada
    daysOverdue: 0,
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
    estimatedResponseDate: '2024-09-20', // Fecha estimada de respuesta
    recipient: 'Cliente - HSE',
    dueDate: '2024-09-17',
    response: 'Confirmar aplicación de NFPA 70 y adicionalmente la norma local NEC-2020 Sección 505. Adjunto documento con los requisitos específicos.',
    linkedDocuments: ['ELE-RLL-MOD-001-CA01-Rev B'],
    alertStatus: 'RESPONDED',
    daysOverdue: 0,
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
    estimatedResponseDate: '2024-08-06', // Fecha estimada de respuesta
    recipient: 'Cliente - Ingeniería Civil',
    dueDate: '2024-08-04',
    response: 'La velocidad de viento de diseño es de 160 km/h. Considerar ASCE 7-16 para los cálculos estructurales.',
    alertStatus: 'RESPONDED',
    daysOverdue: 0,
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
      // Calculate estimated response date if not provided (default 5 days)
      const createdDate = rfiData.createdDate || new Date().toISOString().split('T')[0];
      const estimatedResponseDate = rfiData.estimatedResponseDate || calculateEstimatedResponseDate(createdDate, rfiData.responseDays || 5);
      
      const newRFI = {
        id: `RFI-${Date.now()}`,
        ...rfiData,
        createdDate,
        estimatedResponseDate,
        alertStatus: 'ON_TIME',
        daysOverdue: 0,
      };
      mockRFIs.push(newRFI);
      resolve({ success: true, data: newRFI });
    }, 300);
  });
};

/**
 * Calculate estimated response date (default 5 days from creation)
 * @param {string} createdDate - Creation date
 * @param {number} daysToAdd - Days to add (default 5)
 * @returns {string} Estimated response date
 */
export const calculateEstimatedResponseDate = (createdDate, daysToAdd = 5) => {
  const date = new Date(createdDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
};

/**
 * Calculate alert status based on dates
 * @param {Object} rfi - RFI object
 * @returns {Object} Alert information
 */
export const calculateAlertStatus = (rfi) => {
  const today = new Date();
  const estimatedDate = new Date(rfi.estimatedResponseDate);
  const createdDate = new Date(rfi.createdDate);
  
  // If already responded
  if (rfi.status === RFI_STATUS.ANSWERED || rfi.status === RFI_STATUS.CLOSED) {
    return {
      alertStatus: 'RESPONDED',
      daysOverdue: 0,
      message: 'Respondido'
    };
  }
  
  // Calculate days difference
  const daysDiff = Math.floor((today - estimatedDate) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 0) {
    return {
      alertStatus: 'OVERDUE',
      daysOverdue: daysDiff,
      message: `${daysDiff} día${daysDiff !== 1 ? 's' : ''} de retraso`
    };
  } else if (daysDiff >= -1) {
    return {
      alertStatus: 'APPROACHING_DUE',
      daysOverdue: 0,
      message: 'Se acerca la fecha estimada'
    };
  } else {
    return {
      alertStatus: 'ON_TIME',
      daysOverdue: 0,
      message: 'En tiempo'
    };
  }
};

/**
 * Get RFIs with alert status
 * @param {string} projectId - Project ID
 * @returns {Promise} Promise with RFIs and alert data
 */
export const getRFIsWithAlerts = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rfis = mockRFIs.filter(r => r.projectId === projectId);
      
      // Calculate alert status for each RFI
      const rfisWithAlerts = rfis.map(rfi => {
        const alertInfo = calculateAlertStatus(rfi);
        return {
          ...rfi,
          alertStatus: alertInfo.alertStatus,
          daysOverdue: alertInfo.daysOverdue,
          alertMessage: alertInfo.message
        };
      });
      
      resolve({ success: true, data: rfisWithAlerts });
    }, 400);
  });
};

/**
 * Get overdue RFIs
 * @param {string} projectId - Project ID
 * @returns {Promise} Promise with overdue RFIs
 */
export const getOverdueRFIs = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rfis = mockRFIs.filter(r => r.projectId === projectId);
      const overdueRFIs = rfis.filter(rfi => {
        const alertInfo = calculateAlertStatus(rfi);
        return alertInfo.alertStatus === 'OVERDUE';
      });
      
      resolve({ success: true, data: overdueRFIs });
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

