/**
 * Dashboard mock data
 * @module services/mocks/dashboardMocks
 */

export const mockDashboardData = {
  'PROJ-001': {
    kpis: {
      progress: 35,
      documentsTotal: 48,
      documentsApproved: 18,
      budgetSpent: 525000,
      budgetTotal: 1500000,
      teamMembers: 12,
      daysRemaining: 197,
    },
    disciplineProgress: [
      { name: 'PROCESS', progress: 45 },
      { name: 'MECHANICAL', progress: 38 },
      { name: 'ELECTRICAL', progress: 28 },
      { name: 'CIVIL', progress: 32 },
      { name: 'INSTRUMENTATION', progress: 40 },
    ],
    sCurve: {
      currentWeek: 24,
      totalWeeks: 72,
      planned: [0, 2, 5, 10, 15, 22, 28, 35, 42, 48, 54, 59, 64, 68, 72, 76, 79, 82, 85, 87, 89, 91, 92, 93, 94, 95, 96, 97, 97.5, 98, 98.5, 99, 99.2, 99.5, 99.7, 99.8, 100],
      actual: [0, 1, 4, 8, 12, 18, 24, 30, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
    },
    budgetByDiscipline: [
      { discipline: 'PROCESS', budgeted: 450000, spent: 180000 },
      { discipline: 'MECHANICAL', budgeted: 380000, spent: 145000 },
      { discipline: 'ELECTRICAL', budgeted: 280000, spent: 78000 },
      { discipline: 'CIVIL', budgeted: 250000, spent: 80000 },
      { discipline: 'INSTRUMENTATION', budgeted: 140000, spent: 42000 },
    ],
    budgetOverTime: {
      totalBudget: 1500000,
      currentWeek: 24,
      // Budget acumulado planificado por semana
      planned: [0, 30000, 75000, 150000, 225000, 330000, 420000, 525000, 630000, 720000, 810000, 885000, 960000, 1020000, 1080000, 1140000, 1185000, 1230000, 1275000, 1305000, 1335000, 1365000, 1380000, 1395000, 1410000, 1425000, 1440000, 1455000, 1462500, 1470000, 1477500, 1485000, 1488000, 1492500, 1495500, 1497000, 1500000],
      // Budget acumulado real por semana
      actual: [0, 25000, 60000, 120000, 180000, 270000, 360000, 450000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000, 525000],
    },
    recentActivity: [
      {
        id: 'act-1',
        type: 'approval',
        message: 'Documento RLL-MOD-2024-PRO-PFD-0001 aprobado',
        user: 'Ing. Carlos Méndez',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: 'act-2',
        type: 'transmittal',
        message: 'Transmittal TRN-RLL-MOD-2024-0003 enviado al cliente',
        user: 'María González',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      },
      {
        id: 'act-3',
        type: 'document',
        message: 'Nuevo documento RLL-MOD-2024-MEC-DS-0005 agregado',
        user: 'Ing. Ana Torres',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        id: 'act-4',
        type: 'rfi',
        message: 'RFI-RLL-MOD-0002 respondido por el cliente',
        user: 'Sistema',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      },
      {
        id: 'act-5',
        type: 'update',
        message: 'Actualización de cronograma del proyecto',
        user: 'Gerente de Proyecto',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      },
      {
        id: 'act-6',
        type: 'comment',
        message: 'Comentarios agregados al documento RLL-MOD-2024-ELE-DS-0012',
        user: 'Ing. Roberto Pérez',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      },
      {
        id: 'act-7',
        type: 'transmittal',
        message: 'Transmittal TRN-RLL-MOD-2024-0002 recibido del cliente',
        user: 'Sistema',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      },
      {
        id: 'act-8',
        type: 'approval',
        message: 'Documento RLL-MOD-2024-MEC-CA-0003 aprobado con comentarios',
        user: 'Ing. Carlos Méndez',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      },
      {
        id: 'act-9',
        type: 'document',
        message: 'Nuevo documento RLL-MOD-2024-INS-DB-0008 agregado',
        user: 'Ing. Laura Martínez',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      },
      {
        id: 'act-10',
        type: 'rfi',
        message: 'RFI-RLL-MOD-0001 enviado al cliente',
        user: 'Ing. Ana Torres',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
      },
      {
        id: 'act-11',
        type: 'update',
        message: 'Revisión de especificaciones técnicas completada',
        user: 'Gerente de Proyecto',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      },
      {
        id: 'act-12',
        type: 'comment',
        message: 'Reunión de coordinación - Acuerdos documentados',
        user: 'Ing. Roberto Pérez',
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
      },
    ],
  },
  'PROJ-002': {
    kpis: {
      progress: 62,
      documentsTotal: 35,
      documentsApproved: 28,
      budgetSpent: 527000,
      budgetTotal: 850000,
      teamMembers: 8,
      daysRemaining: 74,
    },
    disciplineProgress: [
      { name: 'PROCESS', progress: 70 },
      { name: 'MECHANICAL', progress: 65 },
      { name: 'ELECTRICAL', progress: 55 },
      { name: 'CIVIL', progress: 60 },
      { name: 'INSTRUMENTATION', progress: 58 },
    ],
    sCurve: {
      currentWeek: 35,
      totalWeeks: 44,
      planned: [0, 3, 8, 15, 23, 32, 40, 48, 55, 62, 68, 73, 78, 82, 86, 89, 92, 94, 96, 97, 98, 99, 99.5, 100],
      actual: [0, 2, 7, 14, 22, 30, 38, 46, 54, 60, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62],
    },
    budgetByDiscipline: [
      { discipline: 'PROCESS', budgeted: 280000, spent: 210000 },
      { discipline: 'MECHANICAL', budgeted: 220000, spent: 165000 },
      { discipline: 'ELECTRICAL', budgeted: 150000, spent: 93000 },
      { discipline: 'CIVIL', budgeted: 130000, spent: 42000 },
      { discipline: 'INSTRUMENTATION', budgeted: 70000, spent: 17000 },
    ],
    budgetOverTime: {
      totalBudget: 850000,
      currentWeek: 35,
      planned: [0, 25000, 68000, 127500, 195500, 272000, 340000, 408000, 467500, 527000, 578000, 620500, 663000, 697000, 731000, 756500, 782000, 799000, 816000, 824500, 833000, 841500, 846750, 850000],
      actual: [0, 20000, 59500, 119000, 187000, 255000, 323000, 391000, 459000, 510000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000, 527000],
    },
    recentActivity: [
      {
        id: 'act-1',
        type: 'approval',
        message: 'Lote de 5 documentos aprobados',
        user: 'Cliente Petroamazonas',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'act-2',
        type: 'document',
        message: 'Revisión B de P&ID completada',
        user: 'Ing. Roberto Sánchez',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  'PROJ-003': {
    kpis: {
      progress: 100,
      documentsTotal: 67,
      documentsApproved: 67,
      budgetSpent: 2150000,
      budgetTotal: 2200000,
      teamMembers: 15,
      daysRemaining: 0,
    },
    disciplineProgress: [
      { name: 'PROCESS', progress: 100 },
      { name: 'MECHANICAL', progress: 100 },
      { name: 'ELECTRICAL', progress: 100 },
      { name: 'CIVIL', progress: 100 },
      { name: 'INSTRUMENTATION', progress: 100 },
    ],
    sCurve: {
      currentWeek: 40,
      totalWeeks: 40,
      planned: [0, 3, 8, 15, 23, 32, 40, 48, 56, 63, 70, 76, 81, 85, 89, 92, 94, 96, 97, 98, 99, 99.5, 100],
      actual: [0, 2, 7, 14, 22, 31, 39, 47, 55, 62, 69, 75, 80, 84, 88, 91, 93, 95, 96.5, 97.5, 98.5, 99.5, 100],
    },
    budgetByDiscipline: [
      { discipline: 'PROCESS', budgeted: 650000, spent: 650000 },
      { discipline: 'MECHANICAL', budgeted: 580000, spent: 575000 },
      { discipline: 'ELECTRICAL', budgeted: 420000, spent: 418000 },
      { discipline: 'CIVIL', budgeted: 380000, spent: 380000 },
      { discipline: 'INSTRUMENTATION', budgeted: 170000, spent: 127000 },
    ],
    budgetOverTime: {
      totalBudget: 2200000,
      currentWeek: 40,
      planned: [0, 66000, 176000, 330000, 506000, 704000, 880000, 1056000, 1232000, 1386000, 1540000, 1672000, 1782000, 1870000, 1958000, 2024000, 2068000, 2112000, 2134000, 2156000, 2178000, 2189000, 2200000],
      actual: [0, 55000, 154000, 308000, 484000, 682000, 858000, 1034000, 1210000, 1364000, 1518000, 1650000, 1760000, 1848000, 1936000, 2002000, 2046000, 2090000, 2123000, 2145000, 2167000, 2189000, 2150000],
    },
    recentActivity: [
      {
        id: 'act-1',
        type: 'approval',
        message: 'Proyecto cerrado exitosamente',
        user: 'Gerente de Proyecto',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

export const getDashboardData = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = mockDashboardData[projectId];
      if (data) {
        resolve({ success: true, data });
      } else {
        resolve({ success: false, error: 'Dashboard data not found' });
      }
    }, 400);
  });
};

