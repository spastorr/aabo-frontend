/**
 * Transmittal mock data
 * @module services/mocks/transmittalMocks
 */

export const mockTransmittals = [
  {
    id: 'TRN-001',
    code: 'TRN-RLL-MOD-2024-0001',
    projectId: 'PROJ-001',
    type: 'OUTGOING',
    recipient: 'Petroecuador',
    subject: 'Envío de Documentos - Rev. B',
    description: 'Se envían los siguientes documentos para revisión y aprobación del cliente, incorporando los comentarios de la revisión A.',
    date: '2024-09-02',
    dueDate: '2024-09-16',
    documentCount: 3,
    status: 'PENDING_RESPONSE',
    priority: 'HIGH',
    relatedRFIs: ['RFI-001'], // RFI enviado en este transmittal
    responseTransmittalId: 'TRN-002', // Transmittal de respuesta
    documents: [
      {
        code: 'RLL-MOD-PRC-001-PFD',
        name: 'Process Flow Diagram - Módulo de Destilación',
        revision: 'B',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-002-PID',
        name: 'P&ID - Sistema Principal',
        revision: 'B',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-003-HMB',
        name: 'Heat & Material Balance',
        revision: 'B',
        discipline: 'Procesos'
      }
    ],
    history: [
      {
        action: 'Transmittal creado',
        user: 'Juan Pérez',
        date: '2024-09-01T10:00:00Z'
      },
      {
        action: 'Documentos adjuntados (3)',
        user: 'Juan Pérez',
        date: '2024-09-01T14:30:00Z'
      },
      {
        action: 'RFI RFI-RLL-MOD-0001 incluido',
        user: 'Juan Pérez',
        date: '2024-09-01T15:00:00Z'
      },
      {
        action: 'Transmittal enviado a Petroecuador',
        user: 'María González',
        date: '2024-09-02T09:15:00Z'
      }
    ]
  },
  {
    id: 'TRN-002',
    code: 'TRN-RLL-MOD-2024-0002',
    projectId: 'PROJ-001',
    type: 'INCOMING',
    sender: 'Petroecuador',
    subject: 'Respuesta a Transmittal TRN-RLL-MOD-2024-0001',
    description: 'Se retornan documentos con comentarios para su incorporación.',
    date: '2024-09-15',
    documentCount: 3,
    status: 'RESPONDED',
    priority: 'HIGH',
    originalTransmittalId: 'TRN-001', // Transmittal original al que responde
    relatedRFIs: ['RFI-001'], // RFI respondido en este transmittal
    response: 'Los documentos han sido revisados. Se aprueban con comentarios que deben ser incorporados en la siguiente revisión. Ver archivo adjunto con comentarios detallados.',
    responseBy: 'Ing. Carlos Rodríguez - Petroecuador',
    responseDate: '2024-09-15',
    documents: [
      {
        code: 'RLL-MOD-PRC-001-PFD',
        name: 'Process Flow Diagram - Módulo de Destilación',
        revision: 'B',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-002-PID',
        name: 'P&ID - Sistema Principal',
        revision: 'B',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-003-HMB',
        name: 'Heat & Material Balance',
        revision: 'B',
        discipline: 'Procesos'
      }
    ],
    history: [
      {
        action: 'Transmittal recibido de Petroecuador',
        user: 'Sistema',
        date: '2024-09-15T08:45:00Z'
      },
      {
        action: 'Respuesta registrada',
        user: 'María González',
        date: '2024-09-15T10:30:00Z'
      },
      {
        action: 'Documentos asignados para corrección',
        user: 'María González',
        date: '2024-09-15T11:00:00Z'
      }
    ]
  },
  {
    id: 'TRN-003',
    code: 'TRN-RLL-MOD-2024-0003',
    projectId: 'PROJ-001',
    type: 'OUTGOING',
    recipient: 'Petroecuador',
    subject: 'Envío de Documentos Mecánicos - Rev. A',
    description: 'Primera emisión de documentos de la disciplina mecánica para revisión del cliente.',
    date: '2024-09-20',
    dueDate: '2024-10-04',
    documentCount: 5,
    status: 'SENT',
    priority: 'NORMAL',
    relatedRFIs: ['RFI-003'], // RFI enviado en este transmittal
    documents: [
      {
        code: 'RLL-MOD-MEC-001-PLE',
        name: 'Plot Plan - Arreglo General',
        revision: 'A',
        discipline: 'Mecánica'
      },
      {
        code: 'RLL-MOD-MEC-002-ELS',
        name: 'Lista de Equipos',
        revision: 'A',
        discipline: 'Mecánica'
      },
      {
        code: 'RLL-MOD-MEC-010-TDS',
        name: 'Torre de Destilación - Hoja de Datos',
        revision: 'A',
        discipline: 'Mecánica'
      },
      {
        code: 'RLL-MOD-MEC-020-IDS',
        name: 'Intercambiador de Calor - Hoja de Datos',
        revision: 'A',
        discipline: 'Mecánica'
      },
      {
        code: 'RLL-MOD-MEC-030-PDS',
        name: 'Bomba Centrífuga - Hoja de Datos',
        revision: 'A',
        discipline: 'Mecánica'
      }
    ],
    history: [
      {
        action: 'Transmittal creado',
        user: 'Pedro Ramírez',
        date: '2024-09-19T14:00:00Z'
      },
      {
        action: 'Documentos adjuntados (5)',
        user: 'Pedro Ramírez',
        date: '2024-09-19T16:45:00Z'
      },
      {
        action: 'Transmittal enviado a Petroecuador',
        user: 'María González',
        date: '2024-09-20T08:30:00Z'
      }
    ]
  },
  {
    id: 'TRN-004',
    code: 'TRN-RLL-MOD-2024-0004',
    projectId: 'PROJ-001',
    type: 'OUTGOING',
    recipient: 'Petroecuador',
    subject: 'Envío de Documentos Eléctricos - Rev. 0',
    description: 'Envío para información de los documentos preliminares de la disciplina eléctrica.',
    date: '2024-09-25',
    documentCount: 2,
    status: 'DRAFT',
    priority: 'LOW',
    documents: [
      {
        code: 'RLL-MOD-ELE-001-DUS',
        name: 'Diagrama Unifilar',
        revision: '0',
        discipline: 'Eléctrica'
      },
      {
        code: 'RLL-MOD-ELE-002-LCC',
        name: 'Load Calculation',
        revision: '0',
        discipline: 'Eléctrica'
      }
    ],
    history: [
      {
        action: 'Transmittal creado',
        user: 'Ana Martínez',
        date: '2024-09-25T09:00:00Z'
      },
      {
        action: 'Documentos adjuntados (2)',
        user: 'Ana Martínez',
        date: '2024-09-25T11:20:00Z'
      }
    ]
  },
  {
    id: 'TRN-005',
    code: 'TRN-RLL-MOD-2024-0005',
    projectId: 'PROJ-001',
    type: 'INCOMING',
    sender: 'Proveedor XYZ - Equipos',
    subject: 'Información Técnica - Bombas Centrífugas',
    description: 'Se envía información técnica solicitada sobre las bombas modelo ABC-123.',
    date: '2024-09-28',
    documentCount: 4,
    status: 'RECEIVED',
    priority: 'NORMAL',
    documents: [
      {
        code: 'VENDOR-XYZ-PMP-001-CAT',
        name: 'Catálogo Técnico Bomba ABC-123',
        revision: '2',
        discipline: 'Información de Proveedor'
      },
      {
        code: 'VENDOR-XYZ-PMP-002-CRV',
        name: 'Curvas de Operación',
        revision: '2',
        discipline: 'Información de Proveedor'
      },
      {
        code: 'VENDOR-XYZ-PMP-003-DIM',
        name: 'Dibujo Dimensional',
        revision: '1',
        discipline: 'Información de Proveedor'
      },
      {
        code: 'VENDOR-XYZ-PMP-004-MAN',
        name: 'Manual de Operación y Mantenimiento',
        revision: '1',
        discipline: 'Información de Proveedor'
      }
    ],
    history: [
      {
        action: 'Transmittal recibido de Proveedor XYZ',
        user: 'Sistema',
        date: '2024-09-28T14:15:00Z'
      },
      {
        action: 'Documentos revisados y archivados',
        user: 'Pedro Ramírez',
        date: '2024-09-28T16:00:00Z'
      }
    ]
  },
  {
    id: 'TRN-006',
    code: 'TRN-RLL-MOD-2024-0006',
    projectId: 'PROJ-001',
    type: 'OUTGOING',
    recipient: 'Petroecuador',
    subject: 'Re-envío Documentos - Rev. C (Comentarios Incorporados)',
    description: 'Se reenvían los documentos Rev. C con los comentarios del cliente incorporados según lo solicitado.',
    date: '2024-10-01',
    dueDate: '2024-10-15',
    documentCount: 3,
    status: 'SENT',
    priority: 'URGENT',
    documents: [
      {
        code: 'RLL-MOD-PRC-001-PFD',
        name: 'Process Flow Diagram - Módulo de Destilación',
        revision: 'C',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-002-PID',
        name: 'P&ID - Sistema Principal',
        revision: 'C',
        discipline: 'Procesos'
      },
      {
        code: 'RLL-MOD-PRC-003-HMB',
        name: 'Heat & Material Balance',
        revision: 'C',
        discipline: 'Procesos'
      }
    ],
    history: [
      {
        action: 'Transmittal creado',
        user: 'Juan Pérez',
        date: '2024-09-30T15:00:00Z'
      },
      {
        action: 'Comentarios de Rev. B incorporados',
        user: 'Juan Pérez',
        date: '2024-09-30T16:30:00Z'
      },
      {
        action: 'Documentos adjuntados (3)',
        user: 'Juan Pérez',
        date: '2024-09-30T17:00:00Z'
      },
      {
        action: 'Transmittal enviado a Petroecuador',
        user: 'María González',
        date: '2024-10-01T08:00:00Z'
      }
    ]
  }
];

/**
 * Get transmittals by project ID
 * @param {string} projectId - The project ID
 * @returns {Promise} Promise with transmittals data
 */
export const getTransmittalsByProject = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transmittals = mockTransmittals.filter(t => t.projectId === projectId);
      resolve({ success: true, data: transmittals });
    }, 400);
  });
};

/**
 * Get transmittal by ID
 * @param {string} id - The transmittal ID
 * @returns {Promise} Promise with transmittal data
 */
export const getTransmittalById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transmittal = mockTransmittals.find(t => t.id === id);
      if (transmittal) {
        resolve({ success: true, data: transmittal });
      } else {
        resolve({ success: false, error: 'Transmittal no encontrado' });
      }
    }, 300);
  });
};

/**
 * Create new transmittal
 * @param {Object} transmittalData - The transmittal data
 * @returns {Promise} Promise with created transmittal
 */
export const createTransmittal = (transmittalData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTransmittal = {
        id: `TRN-${Date.now()}`,
        ...transmittalData,
        status: 'DRAFT',
        date: new Date().toISOString().split('T')[0],
        history: [
          {
            action: 'Transmittal creado',
            user: 'Usuario Actual',
            date: new Date().toISOString()
          }
        ]
      };
      mockTransmittals.push(newTransmittal);
      resolve({ success: true, data: newTransmittal });
    }, 500);
  });
};

/**
 * Get transmittals related to an RFI
 * @param {string} rfiId - The RFI ID
 * @returns {Promise} Promise with related transmittals
 */
export const getTransmittalsByRFI = (rfiId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const relatedTransmittals = mockTransmittals.filter(t => 
        t.relatedRFIs && t.relatedRFIs.includes(rfiId)
      );
      resolve({ success: true, data: relatedTransmittals });
    }, 300);
  });
};

/**
 * Get response transmittal for an original transmittal
 * @param {string} originalTransmittalId - The original transmittal ID
 * @returns {Promise} Promise with response transmittal
 */
export const getResponseTransmittal = (originalTransmittalId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responseTransmittal = mockTransmittals.find(t => 
        t.originalTransmittalId === originalTransmittalId
      );
      if (responseTransmittal) {
        resolve({ success: true, data: responseTransmittal });
      } else {
        resolve({ success: false, error: 'No se encontró transmittal de respuesta' });
      }
    }, 300);
  });
};

/**
 * Get RFIs related to a transmittal
 * @param {string} transmittalId - The transmittal ID
 * @returns {Promise} Promise with related RFIs
 */
export const getRFIsByTransmittal = (transmittalId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transmittal = mockTransmittals.find(t => t.id === transmittalId);
      if (transmittal && transmittal.relatedRFIs) {
        // Mock RFI data - in a real app, this would fetch from RFI service
        const mockRFIs = transmittal.relatedRFIs.map(rfiId => ({
          id: rfiId,
          code: `RFI-${rfiId.split('-')[1]}`,
          subject: `RFI relacionado al transmittal ${transmittal.code}`,
          status: 'OPEN',
          priority: 'NORMAL',
          date: transmittal.date,
          discipline: 'General'
        }));
        resolve({ success: true, data: mockRFIs });
      } else {
        resolve({ success: true, data: [] });
      }
    }, 300);
  });
};