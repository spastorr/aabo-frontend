/**
 * Reports mock data
 * @module services/mocks/reportsMocks
 */

export const getReportsData = async (projectId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const mockReportsData = {
    projectId,
    costProgress: {
      projected: [
        { month: 'Ene', value: 100000 },
        { month: 'Feb', value: 200000 },
        { month: 'Mar', value: 350000 },
        { month: 'Abr', value: 500000 },
        { month: 'May', value: 650000 },
        { month: 'Jun', value: 800000 },
        { month: 'Jul', value: 950000 },
        { month: 'Ago', value: 1100000 },
        { month: 'Sep', value: 1250000 },
        { month: 'Oct', value: 1400000 },
        { month: 'Nov', value: 1500000 },
        { month: 'Dic', value: 1500000 }
      ],
      actual: [
        { month: 'Ene', value: 95000 },
        { month: 'Feb', value: 180000 },
        { month: 'Mar', value: 320000 },
        { month: 'Abr', value: 480000 },
        { month: 'May', value: 620000 },
        { month: 'Jun', value: 750000 },
        { month: 'Jul', value: 900000 },
        { month: 'Ago', value: 1050000 },
        { month: 'Sep', value: 1200000 },
        { month: 'Oct', value: 1350000 },
        { month: 'Nov', value: 1450000 },
        { month: 'Dic', value: 1500000 }
      ]
    },
    sCurve: {
      planned: [
        { week: 1, progress: 2 },
        { week: 2, progress: 5 },
        { week: 3, progress: 8 },
        { week: 4, progress: 12 },
        { week: 5, progress: 18 },
        { week: 6, progress: 25 },
        { week: 7, progress: 33 },
        { week: 8, progress: 42 },
        { week: 9, progress: 52 },
        { week: 10, progress: 62 },
        { week: 11, progress: 72 },
        { week: 12, progress: 80 },
        { week: 13, progress: 87 },
        { week: 14, progress: 92 },
        { week: 15, progress: 96 },
        { week: 16, progress: 98 },
        { week: 17, progress: 99 },
        { week: 18, progress: 100 }
      ],
      actual: [
        { week: 1, progress: 1 },
        { week: 2, progress: 4 },
        { week: 3, progress: 7 },
        { week: 4, progress: 11 },
        { week: 5, progress: 16 },
        { week: 6, progress: 22 },
        { week: 7, progress: 29 },
        { week: 8, progress: 37 },
        { week: 9, progress: 46 },
        { week: 10, progress: 55 },
        { week: 11, progress: 64 },
        { week: 12, progress: 72 },
        { week: 13, progress: 79 },
        { week: 14, progress: 85 },
        { week: 15, progress: 90 },
        { week: 16, progress: 94 },
        { week: 17, progress: 97 },
        { week: 18, progress: 100 }
      ]
    },
    overdueDocuments: [
      {
        id: 'DOC-001',
        code: 'PAL-AZUL-PROC-001',
        title: 'P&ID Principal',
        discipline: 'Procesos',
        plannedDate: '2024-01-15',
        actualDate: '2024-01-22',
        daysOverdue: 7,
        status: 'En Revisión'
      },
      {
        id: 'DOC-002',
        code: 'PAL-AZUL-MECH-015',
        title: 'Especificación de Bombas',
        discipline: 'Mecánica',
        plannedDate: '2024-02-01',
        actualDate: null,
        daysOverdue: 15,
        status: 'En Elaboración'
      },
      {
        id: 'DOC-003',
        code: 'PAL-AZUL-ELEC-008',
        title: 'Diagrama Unifilar',
        discipline: 'Eléctrica',
        plannedDate: '2024-02-10',
        actualDate: '2024-02-18',
        daysOverdue: 8,
        status: 'Comentado'
      }
    ],
    monthlyProgress: {
      currentMonth: 'Febrero 2024',
      totalDocuments: 156,
      completedDocuments: 89,
      inProgressDocuments: 45,
      pendingDocuments: 22,
      completionRate: 57.1,
      disciplines: [
        { name: 'Procesos', completed: 25, total: 40, percentage: 62.5 },
        { name: 'Mecánica', completed: 20, total: 35, percentage: 57.1 },
        { name: 'Eléctrica', completed: 18, total: 30, percentage: 60.0 },
        { name: 'Civil', completed: 15, total: 25, percentage: 60.0 },
        { name: 'Instrumentación', completed: 11, total: 26, percentage: 42.3 }
      ]
    },
    weeklyProgress: {
      currentWeek: 'Semana 8',
      weekStart: '2024-02-19',
      weekEnd: '2024-02-25',
      documentsCompleted: 12,
      documentsInProgress: 8,
      documentsPending: 5,
      teamProductivity: 85,
      milestones: [
        { name: 'Entrega Rev. C', status: 'Completado', date: '2024-02-20' },
        { name: 'Revisión Cliente', status: 'En Progreso', date: '2024-02-25' },
        { name: 'Preparación Rev. D', status: 'Pendiente', date: '2024-03-01' }
      ]
    }
  };

  return {
    success: true,
    data: mockReportsData
  };
};

export default {
  getReportsData
};
