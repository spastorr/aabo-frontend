/**
 * Knowledge Hub mock data
 * @module services/mocks/knowledgeHubMocks
 */

// Historical Projects Mock Data
const mockHistoricalProjects = [
  {
    id: 'proj-001',
    code: 'PTR-REF-2020',
    name: 'Refinería Esmeraldas - Expansión de Capacidad',
    client: 'EP Petroecuador',
    type: 'Refinería',
    description: 'Proyecto de expansión de capacidad de procesamiento de crudo de 110,000 a 175,000 barriles por día',
    startDate: '2020-01-15',
    completionDate: '2021-12-20',
    duration: 23,
    budget: 3500000,
    finalCost: 3450000,
    documents: 342,
    transmittals: 89,
    rfis: 45,
    disciplines: ['Procesos', 'Mecánica', 'Eléctrica', 'Instrumentación & Control'],
    teamMembers: 28,
    tags: ['refinería', 'expansión', 'alta presión', 'crudo pesado'],
    successRate: 95,
    lessonsLearned: [
      'Implementación temprana de sistema de control distribuido (DCS) mejoró tiempos de comisionamiento',
      'Coordinación estrecha con cliente durante fase de ingeniería básica redujo cambios tardíos',
      'Uso de modelado 3D evitó interferencias en campo'
    ],
    lmd: [
      { id: '1', code: 'PTR-REF-2020-PRO-001', name: 'Diagrama de Flujo de Proceso', discipline: 'Procesos', status: 'APR', revision: 'C', approvalDate: '2021-11-15' },
      { id: '2', code: 'PTR-REF-2020-MEC-001', name: 'Especificación de Bombas Centrífugas', discipline: 'Mecánica', status: 'APR', revision: 'B', approvalDate: '2021-10-20' }
    ],
    metrics: {
      budgetByDiscipline: [
        { discipline: 'Procesos', budgeted: 1200000, actual: 1180000 },
        { discipline: 'Mecánica', budgeted: 1000000, actual: 1020000 },
        { discipline: 'Eléctrica', budgeted: 800000, actual: 790000 },
        { discipline: 'Instrumentación & Control', budgeted: 500000, actual: 460000 }
      ],
      schedulePerformance: { plannedDuration: 24, actualDuration: 23 },
      qualityMetrics: { approvedFirstTime: 78, avgRevisions: 2.3, rfisResolved: 91, clientSatisfaction: 4.5 },
      resourceUtilization: { plannedHours: 45000, actualHours: 43500, avgTeamSize: 28 }
    }
  },
  {
    id: 'proj-002',
    code: 'PTZ-UPS-2021',
    name: 'Campo Sacha - Optimización de Producción',
    client: 'Petroamazonas',
    type: 'Upstream',
    description: 'Proyecto de optimización de sistemas de producción en campo maduro',
    startDate: '2021-03-10',
    completionDate: '2022-09-30',
    duration: 18,
    budget: 1800000,
    finalCost: 1750000,
    documents: 187,
    transmittals: 52,
    rfis: 28,
    disciplines: ['Procesos', 'Mecánica', 'Instrumentación & Control'],
    teamMembers: 15,
    tags: ['upstream', 'optimización', 'producción', 'campo maduro'],
    successRate: 92,
    lessonsLearned: [
      'Análisis de integridad de líneas existentes fue crucial antes de aumentar presiones operativas',
      'Trabajo con operaciones en paralelo requirió coordinación excepcional'
    ]
  },
  {
    id: 'proj-003',
    code: 'SCH-MID-2022',
    name: 'Sistema de Transporte de Gas - Fase 3',
    client: 'Schlumberger',
    type: 'Midstream',
    description: 'Diseño de sistema de gasoductos de alta presión para transporte de gas natural',
    startDate: '2022-05-01',
    completionDate: '2023-11-20',
    duration: 19,
    budget: 2200000,
    finalCost: 2180000,
    documents: 256,
    transmittals: 67,
    rfis: 34,
    disciplines: ['Procesos', 'Civil', 'Mecánica'],
    teamMembers: 20,
    tags: ['gasoducto', 'alta presión', 'gas natural', 'offshore'],
    successRate: 94
  }
];

// Client Standards Mock Data
const mockClientStandards = [
  {
    id: 'client-001',
    name: 'EP Petroecuador',
    code: 'EP-PTR',
    description: 'Empresa Pública de Hidrocarburos del Ecuador',
    standardsCount: 45,
    activeProjects: 3,
    lastUpdate: '2024-02',
    contactInfo: {
      email: 'ingenieria@eppetroecuador.ec',
      phone: '+593 2 1234567',
      address: 'Quito, Ecuador'
    },
    standards: [
      {
        id: 'std-001',
        code: 'PEC-EXP--UIO-00-INS-01',
        name: 'Instrucciones para Elaboración de Entregables',
        version: 'Rev. 3',
        lastUpdate: '2024-01-15',
        isActive: true,
        category: 'Diseño',
        description: 'Especificaciones para la elaboración y presentación de documentos de ingeniería'
      },
      {
        id: 'std-002',
        code: 'PEC-DES-UIO-001',
        name: 'Estándar de Diseño de Tuberías',
        version: 'Rev. 2',
        lastUpdate: '2023-11-20',
        isActive: true,
        category: 'Diseño'
      }
    ]
  },
  {
    id: 'client-002',
    name: 'Petroamazonas',
    code: 'PTZ',
    description: 'Empresa de exploración y producción de hidrocarburos',
    standardsCount: 38,
    activeProjects: 2,
    lastUpdate: '2024-01',
    contactInfo: {
      email: 'proyectos@petroamazonas.ec',
      phone: '+593 6 7891234'
    },
    standards: [
      {
        id: 'std-003',
        code: 'PTZ-EST-001',
        name: 'Especificaciones Técnicas Generales',
        version: 'Rev. 4',
        lastUpdate: '2024-01-10',
        isActive: true,
        category: 'General'
      }
    ]
  },
  {
    id: 'client-003',
    name: 'Schlumberger',
    code: 'SLB',
    description: 'Empresa de servicios petroleros',
    standardsCount: 52,
    activeProjects: 1,
    lastUpdate: '2023-12',
    standards: []
  },
  {
    id: 'client-004',
    name: 'PetroChina',
    code: 'PC',
    description: 'Compañía petrolera internacional',
    standardsCount: 67,
    activeProjects: 0,
    lastUpdate: '2023-10',
    standards: []
  }
];

// Internal Guides Mock Data
const mockInternalGuides = [
  {
    id: 'guide-001',
    title: 'Procedimiento para Cálculo de PSV (Válvulas de Seguridad)',
    code: 'AABO-PROC-PSV-001',
    description: 'Metodología detallada para dimensionamiento y selección de válvulas de seguridad y alivio de presión',
    category: 'procedimientos',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2024-01-20',
    author: 'Ing. Carlos Mendoza'
  },
  {
    id: 'guide-002',
    title: 'Hoja de Cálculo: Espesor de Tuberías ASME B31.3',
    code: 'AABO-CALC-TUB-001',
    description: 'Plantilla Excel para cálculo de espesores de tubería según código ASME B31.3',
    category: 'calculos',
    version: 'Rev. 3',
    status: 'approved',
    lastUpdate: '2023-12-15',
    author: 'Ing. María González'
  },
  {
    id: 'guide-003',
    title: 'Mejores Prácticas: Diseño de P&IDs',
    code: 'AABO-BP-PID-001',
    description: 'Guía de mejores prácticas para la elaboración de Diagramas de Tuberías e Instrumentación',
    category: 'mejores-practicas',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2024-02-10',
    author: 'Ing. Roberto Silva'
  },
  {
    id: 'guide-004',
    title: 'Checklist de Revisión de Documentos de Ingeniería',
    code: 'AABO-CHK-REV-001',
    description: 'Lista de verificación para asegurar la calidad de entregables antes de emisión',
    category: 'checklists',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2023-11-30',
    author: 'Ing. Ana Rodríguez'
  },
  {
    id: 'guide-005',
    title: 'Plantilla: Memoria de Cálculo Estructural',
    code: 'AABO-TPL-EST-001',
    description: 'Plantilla estandarizada para presentación de memorias de cálculo estructural',
    category: 'plantillas',
    version: 'Rev. 1',
    status: 'in-review',
    lastUpdate: '2024-03-01',
    author: 'Ing. Luis Torres'
  },
  {
    id: 'guide-006',
    title: 'Lecciones Aprendidas: Manejo de Vibraciones en Tuberías',
    code: 'AABO-LL-VIB-001',
    description: 'Compilación de soluciones efectivas para problemas de vibración en sistemas de tubería',
    category: 'lecciones-aprendidas',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2023-10-15',
    author: 'Equipo de Ingeniería'
  }
];

// External Norms Mock Data
const mockExternalNorms = [
  {
    id: 'norm-001',
    title: 'Process Piping',
    code: 'ASME B31.3',
    organization: 'ASME',
    edition: '2020',
    year: 2020,
    description: 'Código para diseño, materiales, fabricación, montaje, inspección y pruebas de tuberías de proceso',
    accessType: 'local',
    lastUpdate: '2020-07-01',
    reaffirmed: '2021'
  },
  {
    id: 'norm-002',
    title: 'Specification for Line Pipe',
    code: 'API 5L',
    organization: 'API',
    edition: '46th Edition',
    year: 2018,
    description: 'Especificación para tubería de línea de acero para transporte de gas, agua y petróleo',
    accessType: 'local',
    lastUpdate: '2018-03-01'
  },
  {
    id: 'norm-003',
    title: 'Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries',
    code: 'API 610',
    organization: 'API',
    edition: '12th Edition',
    year: 2023,
    description: 'Estándar para bombas centrífugas en la industria del petróleo y gas',
    accessType: 'local',
    lastUpdate: '2023-01-15',
    hasUpdates: true
  },
  {
    id: 'norm-004',
    title: 'Quality management systems — Requirements',
    code: 'ISO 9001:2015',
    organization: 'ISO',
    edition: '2015',
    year: 2015,
    description: 'Estándar internacional de sistemas de gestión de calidad',
    accessType: 'external',
    lastUpdate: '2015-09-15'
  },
  {
    id: 'norm-005',
    title: 'Boiler and Pressure Vessel Code',
    code: 'ASME BPVC Section VIII',
    organization: 'ASME',
    edition: '2023',
    year: 2023,
    description: 'Código para diseño y fabricación de recipientes a presión',
    accessType: 'local',
    lastUpdate: '2023-07-01'
  },
  {
    id: 'norm-006',
    title: 'Standard Test Method for Tension Testing of Metallic Materials',
    code: 'ASTM E8/E8M',
    organization: 'ASTM',
    edition: '2023',
    year: 2023,
    description: 'Método estándar de prueba de tensión para materiales metálicos',
    accessType: 'external',
    lastUpdate: '2023-02-01'
  }
];

// Search Results Mock Data
const generateSearchResults = (query) => {
  // Simulate search with basic matching
  const queryLower = query.toLowerCase();
  
  return {
    historicalProjects: mockHistoricalProjects
      .filter(p => 
        p.name.toLowerCase().includes(queryLower) ||
        p.description?.toLowerCase().includes(queryLower) ||
        p.tags?.some(t => t.toLowerCase().includes(queryLower))
      )
      .map(p => ({
        ...p,
        relevanceScore: Math.random() * 0.3 + 0.7,
        excerpt: `...${p.description?.substring(0, 150)}...`
      })),
    
    clientStandards: mockClientStandards.flatMap(client =>
      client.standards
        .filter(s => 
          s.name.toLowerCase().includes(queryLower) ||
          s.code.toLowerCase().includes(queryLower)
        )
        .map(s => ({
          ...s,
          client: client.name,
          relevanceScore: Math.random() * 0.3 + 0.7
        }))
    ),
    
    internalGuides: mockInternalGuides
      .filter(g =>
        g.title.toLowerCase().includes(queryLower) ||
        g.description?.toLowerCase().includes(queryLower)
      )
      .map(g => ({
        ...g,
        relevanceScore: Math.random() * 0.3 + 0.7,
        excerpt: `...${g.description?.substring(0, 150)}...`
      })),
    
    externalNorms: mockExternalNorms
      .filter(n =>
        n.title.toLowerCase().includes(queryLower) ||
        n.code.toLowerCase().includes(queryLower) ||
        n.description?.toLowerCase().includes(queryLower)
      )
      .map(n => ({
        ...n,
        relevanceScore: Math.random() * 0.3 + 0.7,
        excerpt: `...${n.description?.substring(0, 150)}...`
      }))
  };
};

// Mock API functions
export const getKnowledgeHubMocks = () => ({
  getHistoricalProjects: (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
        let filtered = [...mockHistoricalProjects];

        // Apply filters
        if (params.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.code.toLowerCase().includes(search) ||
            p.client.toLowerCase().includes(search)
          );
        }

        if (params.client) {
          filtered = filtered.filter(p => p.client === params.client);
        }

        if (params.projectType) {
          filtered = filtered.filter(p => p.type === params.projectType);
        }

        if (params.year) {
          filtered = filtered.filter(p =>
            p.completionDate.startsWith(params.year)
          );
        }

        if (params.tags && params.tags.length > 0) {
          filtered = filtered.filter(p =>
            params.tags.some(tag => p.tags?.includes(tag))
          );
        }

        const stats = {
          totalProjects: mockHistoricalProjects.length,
          totalDocuments: mockHistoricalProjects.reduce((sum, p) => sum + p.documents, 0),
          totalClients: new Set(mockHistoricalProjects.map(p => p.client)).size,
          avgSuccess: Math.round(
            mockHistoricalProjects.reduce((sum, p) => sum + (p.successRate || 0), 0) /
            mockHistoricalProjects.length
          )
        };

        resolve({
          success: true,
          data: {
            projects: filtered,
            stats
          }
        });
    }, 500);
  });
  },

  getStandards: (type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
        let data;
        if (type === 'client') {
          data = mockClientStandards;
        } else if (type === 'internal') {
          data = mockInternalGuides;
        } else if (type === 'external') {
          data = mockExternalNorms;
        }

        resolve({
          success: true,
          data: data || []
        });
    }, 500);
  });
  },

  searchKnowledgeHub: (params = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = generateSearchResults(params.query || '');

        resolve({
          success: true,
          data: results
        });
      }, 800);
    });
  },

  getClientProfile: (clientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const client = mockClientStandards.find(c => c.id === clientId);

        if (client) {
          resolve({ success: true, data: client });
        } else {
          resolve({ success: false, message: 'Cliente no encontrado' });
        }
      }, 300);
    });
  },

  uploadStandard: (type, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock: Uploading standard', type, data);
        resolve({
          success: true,
          message: 'Estándar subido exitosamente',
          data: { id: `new-${Date.now()}`, ...data }
        });
      }, 1000);
    });
  }
});
