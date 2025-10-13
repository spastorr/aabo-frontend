/**
 * Timesheet mock data
 * @module services/mocks/timesheetMocks
 */

import { TIMESHEET_STATUS } from '../../constants';

let timesheetIdCounter = 6;

export const mockTimesheets = [
  {
    id: 'TS-001',
    userId: 'USR-002',
    userName: 'María González',
    projectId: 'PROJ-001',
    projectName: 'Refinería Esmeraldas - Modernización',
    documentId: 'DOC-001',
    documentCode: 'AAB-PRO-ESM-001-PFD-001',
    documentName: 'PFD - Unidad de Destilación',
    date: '2024-10-10',
    hours: 6,
    description: 'Desarrollo de PFD - Unidad de Destilación',
    status: TIMESHEET_STATUS.APPROVED,
    approvedBy: 'Luis Ramírez',
    approvedDate: '2024-10-11',
    costRate: 45, // USD per hour
  },
  {
    id: 'TS-002',
    userId: 'USR-003',
    userName: 'Carlos Méndez',
    projectId: 'PROJ-001',
    projectName: 'Refinería Esmeraldas - Modernización',
    documentId: 'DOC-002',
    documentCode: 'AAB-MEC-ESM-001-CAL-001',
    documentName: 'Cálculo Mecánico - Intercambiador',
    date: '2024-10-10',
    hours: 8,
    description: 'Cálculo de espesor para intercambiador de calor',
    status: TIMESHEET_STATUS.APPROVED,
    approvedBy: 'Luis Ramírez',
    approvedDate: '2024-10-11',
    costRate: 50,
  },
  {
    id: 'TS-003',
    userId: 'USR-002',
    userName: 'María González',
    projectId: 'PROJ-001',
    projectName: 'Refinería Esmeraldas - Modernización',
    documentId: 'DOC-003',
    documentCode: 'AAB-PRO-ESM-001-PID-001',
    documentName: 'P&ID - Sistema de Enfriamiento',
    date: '2024-10-11',
    hours: 5,
    description: 'Revisión y actualización de P&ID',
    status: TIMESHEET_STATUS.PENDING,
    costRate: 45,
  },
  {
    id: 'TS-004',
    userId: 'USR-004',
    userName: 'Ana Rodríguez',
    projectId: 'PROJ-002',
    projectName: 'Planta de Tratamiento - Petroamazonas',
    documentId: 'DOC-010',
    documentCode: 'AAB-ELE-PET-002-DIA-001',
    documentName: 'Diagrama Unifilar - Subestación',
    date: '2024-10-12',
    hours: 7,
    description: 'Diseño de diagrama unifilar para subestación eléctrica',
    status: TIMESHEET_STATUS.PENDING,
    costRate: 48,
  },
  {
    id: 'TS-005',
    userId: 'USR-002',
    userName: 'María González',
    projectId: 'PROJ-001',
    projectName: 'Refinería Esmeraldas - Modernización',
    documentId: 'DOC-001',
    documentCode: 'AAB-PRO-ESM-001-PFD-001',
    documentName: 'PFD - Unidad de Destilación',
    date: '2024-10-09',
    hours: 4,
    description: 'Correcciones según comentarios del cliente',
    status: TIMESHEET_STATUS.REJECTED,
    rejectedBy: 'Luis Ramírez',
    rejectedDate: '2024-10-10',
    rejectionReason: 'Por favor incluir más detalle en la descripción',
    costRate: 45,
  },
];

export const getTimesheetsByProject = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timesheets = mockTimesheets.filter(t => t.projectId === projectId);
      resolve({ success: true, data: timesheets });
    }, 400);
  });
};

export const getTimesheetsByUser = (userId, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let timesheets = mockTimesheets.filter(t => t.userId === userId);
      
      if (filters.startDate) {
        timesheets = timesheets.filter(t => t.date >= filters.startDate);
      }
      if (filters.endDate) {
        timesheets = timesheets.filter(t => t.date <= filters.endDate);
      }
      if (filters.status) {
        timesheets = timesheets.filter(t => t.status === filters.status);
      }
      
      resolve({ success: true, data: timesheets });
    }, 400);
  });
};

export const getPendingTimesheets = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timesheets = mockTimesheets.filter(
        t => t.projectId === projectId && t.status === TIMESHEET_STATUS.PENDING
      );
      resolve({ success: true, data: timesheets });
    }, 400);
  });
};

export const createTimesheet = (timesheetData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTimesheet = {
        ...timesheetData,
        id: `TS-${String(timesheetIdCounter++).padStart(3, '0')}`,
        status: TIMESHEET_STATUS.PENDING,
      };
      mockTimesheets.push(newTimesheet);
      resolve({ success: true, data: newTimesheet });
    }, 500);
  });
};

export const updateTimesheet = (id, timesheetData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTimesheets.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTimesheets[index] = { ...mockTimesheets[index], ...timesheetData };
        resolve({ success: true, data: mockTimesheets[index] });
      } else {
        resolve({ success: false, error: 'Timesheet not found' });
      }
    }, 400);
  });
};

export const deleteTimesheet = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTimesheets.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTimesheets.splice(index, 1);
        resolve({ success: true, message: 'Timesheet deleted' });
      } else {
        resolve({ success: false, error: 'Timesheet not found' });
      }
    }, 300);
  });
};

export const approveTimesheet = (id, comments = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTimesheets.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTimesheets[index] = {
          ...mockTimesheets[index],
          status: TIMESHEET_STATUS.APPROVED,
          approvedBy: 'Luis Ramírez',
          approvedDate: new Date().toISOString().split('T')[0],
          approvalComments: comments,
        };
        resolve({ success: true, data: mockTimesheets[index] });
      } else {
        resolve({ success: false, error: 'Timesheet not found' });
      }
    }, 500);
  });
};

export const rejectTimesheet = (id, reason) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTimesheets.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTimesheets[index] = {
          ...mockTimesheets[index],
          status: TIMESHEET_STATUS.REJECTED,
          rejectedBy: 'Luis Ramírez',
          rejectedDate: new Date().toISOString().split('T')[0],
          rejectionReason: reason,
        };
        resolve({ success: true, data: mockTimesheets[index] });
      } else {
        resolve({ success: false, error: 'Timesheet not found' });
      }
    }, 500);
  });
};

export const getTimesheetSummary = (projectId, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let timesheets = mockTimesheets.filter(t => t.projectId === projectId);
      
      if (filters.startDate) {
        timesheets = timesheets.filter(t => t.date >= filters.startDate);
      }
      if (filters.endDate) {
        timesheets = timesheets.filter(t => t.date <= filters.endDate);
      }
      
      const totalHours = timesheets.reduce((sum, t) => sum + t.hours, 0);
      const approvedHours = timesheets
        .filter(t => t.status === TIMESHEET_STATUS.APPROVED)
        .reduce((sum, t) => sum + t.hours, 0);
      const pendingHours = timesheets
        .filter(t => t.status === TIMESHEET_STATUS.PENDING)
        .reduce((sum, t) => sum + t.hours, 0);
      const totalCost = timesheets
        .filter(t => t.status === TIMESHEET_STATUS.APPROVED)
        .reduce((sum, t) => sum + (t.hours * t.costRate), 0);
      
      const summary = {
        totalHours,
        approvedHours,
        pendingHours,
        totalCost,
        entriesCount: timesheets.length,
        approvedCount: timesheets.filter(t => t.status === TIMESHEET_STATUS.APPROVED).length,
        pendingCount: timesheets.filter(t => t.status === TIMESHEET_STATUS.PENDING).length,
        rejectedCount: timesheets.filter(t => t.status === TIMESHEET_STATUS.REJECTED).length,
      };
      
      resolve({ success: true, data: summary });
    }, 400);
  });
};

