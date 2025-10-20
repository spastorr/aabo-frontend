/**
 * Project mock data
 * @module services/mocks/projectMocks
 */

import { PROJECT_STATUS, DOCUMENT_STATUS } from '../../constants';

export const mockProjects = [
  {
    id: 'PROJ-001',
    name: 'Refinería La Libertad - Modernización',
    code: 'RLL-MOD-2024',
    client: 'Petroecuador',
    type: 'REFINERY',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    progress: 35,
    budget: 1500000,
    spent: 525000,
    description: 'Modernización de unidades de refinería',
    teamMembers: 12,
  },
  {
    id: 'PROJ-002',
    name: 'Campo Shushufindi - Facilidades de Producción',
    code: 'CSH-FAC-2024',
    client: 'Petroamazonas',
    type: 'UPSTREAM',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    progress: 62,
    budget: 850000,
    spent: 527000,
    description: 'Diseño de facilidades de superficie',
    teamMembers: 8,
  },
  {
    id: 'PROJ-003',
    name: 'Terminal Balao - Ampliación',
    code: 'TBL-AMP-2023',
    client: 'EP Petroecuador',
    type: 'MIDSTREAM',
    status: PROJECT_STATUS.COMPLETED,
    startDate: '2023-06-01',
    endDate: '2024-02-28',
    progress: 100,
    budget: 2200000,
    spent: 2150000,
    description: 'Ampliación de capacidad de almacenamiento',
    teamMembers: 15,
  },
  {
    id: 'PROJ-004',
    name: 'Planta Petroamazonas - Optimización',
    code: 'PPA-OPT-2023',
    client: 'Petroamazonas',
    type: 'PROCESSING',
    status: PROJECT_STATUS.COMPLETED,
    startDate: '2023-01-15',
    endDate: '2023-11-30',
    progress: 100,
    budget: 1800000,
    spent: 1750000,
    description: 'Optimización de procesos de separación',
    teamMembers: 10,
  },
  {
    id: 'PROJ-005',
    name: 'Oleoducto Transecuatoriano - Mantenimiento',
    code: 'OTR-MAN-2024',
    client: 'EP Petroecuador',
    type: 'PIPELINE',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '2024-02-01',
    endDate: '2024-10-31',
    progress: 78,
    budget: 950000,
    spent: 741000,
    description: 'Mantenimiento preventivo y correctivo',
    teamMembers: 6,
  },
  {
    id: 'PROJ-006',
    name: 'Refinería Esmeraldas - Nueva Unidad',
    code: 'REM-NUE-2022',
    client: 'Petroecuador',
    type: 'REFINERY',
    status: PROJECT_STATUS.COMPLETED,
    startDate: '2022-03-01',
    endDate: '2023-08-31',
    progress: 100,
    budget: 3200000,
    spent: 3100000,
    description: 'Nueva unidad de hidrotratamiento',
    teamMembers: 18,
  },
  {
    id: 'PROJ-007',
    name: 'Campo Sacha - Desarrollo Fase II',
    code: 'CSA-F2-2024',
    client: 'Petroamazonas',
    type: 'UPSTREAM',
    status: PROJECT_STATUS.ON_HOLD,
    startDate: '2024-05-01',
    endDate: '2025-03-31',
    progress: 15,
    budget: 1200000,
    spent: 180000,
    description: 'Desarrollo de nuevos pozos',
    teamMembers: 9,
  },
  {
    id: 'PROJ-008',
    name: 'Terminal Monteverde - Modernización',
    code: 'TMV-MOD-2023',
    client: 'EP Petroecuador',
    type: 'MIDSTREAM',
    status: PROJECT_STATUS.COMPLETED,
    startDate: '2023-04-01',
    endDate: '2023-12-15',
    progress: 100,
    budget: 750000,
    spent: 720000,
    description: 'Modernización de sistemas de carga',
    teamMembers: 7,
  },
  {
    id: 'PROJ-009',
    name: 'Planta de Gas Natural - Expansión',
    code: 'PGN-EXP-2024',
    client: 'Petroecuador',
    type: 'PROCESSING',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '2024-01-01',
    endDate: '2025-01-31',
    progress: 45,
    budget: 2100000,
    spent: 945000,
    description: 'Expansión de capacidad de procesamiento',
    teamMembers: 14,
  },
  {
    id: 'PROJ-010',
    name: 'Campo Libertador - Rehabilitación',
    code: 'CLI-REH-2022',
    client: 'Petroamazonas',
    type: 'UPSTREAM',
    status: PROJECT_STATUS.COMPLETED,
    startDate: '2022-08-01',
    endDate: '2023-06-30',
    progress: 100,
    budget: 1400000,
    spent: 1350000,
    description: 'Rehabilitación de facilidades existentes',
    teamMembers: 11,
  },
];

export const getProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: mockProjects });
    }, 500);
  });
};

export const getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id);
      if (project) {
        resolve({ success: true, data: project });
      } else {
        reject({ success: false, error: 'Project not found' });
      }
    }, 300);
  });
};

export const createProject = (projectData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProject = {
        id: `PROJ-${String(mockProjects.length + 1).padStart(3, '0')}`,
        ...projectData,
        progress: 0,
        spent: 0,
        // Convert teamMembers array to count for backward compatibility
        teamMembers: Array.isArray(projectData.teamMembers) 
          ? projectData.teamMembers.length 
          : projectData.teamMembers || 0,
        // Store the full team members data
        teamMembersData: projectData.teamMembers || [],
      };
      resolve({ success: true, data: newProject });
    }, 500);
  });
};

// Mock lessons learned data for active projects
const mockLessonsLearned = {
  'PROJ-001': [
    {
      id: 'lesson-001-1',
      title: 'Importancia de la coordinación temprana con el cliente',
      description: 'Durante la fase de ingeniería básica, la coordinación semanal con el cliente redujo significativamente los cambios tardíos. Solo se registraron 3 órdenes de cambio menores vs. las 15-20 típicas en proyectos similares.',
      category: 'Gestión',
      impact: 'HIGH',
      tags: ['coordinación', 'cliente', 'cambios'],
      createdAt: '2024-01-20T10:00:00Z',
      createdBy: 'Carlos Mendoza',
      updatedAt: null,
      updatedBy: null
    },
    {
      id: 'lesson-001-2',
      title: 'Uso de modelado 3D para detección de interferencias',
      description: 'El uso intensivo de Plant 3D permitió detectar y resolver 12 interferencias potenciales antes de la construcción, evitando retrabajos costosos en campo.',
      category: 'Técnico',
      impact: 'MEDIUM',
      tags: ['modelado', 'interferencias', 'construcción'],
      createdAt: '2024-02-15T14:30:00Z',
      createdBy: 'María González',
      updatedAt: null,
      updatedBy: null
    }
  ],
  'PROJ-002': [
    {
      id: 'lesson-002-1',
      title: 'Análisis de integridad de líneas existentes',
      description: 'El análisis ultrasónico de líneas existentes fue crucial antes de aumentar presiones operativas. Se identificaron 8 segmentos con corrosión severa que fueron reemplazados preventivamente.',
      category: 'Técnico',
      impact: 'HIGH',
      tags: ['integridad', 'ultrasonido', 'corrosión'],
      createdAt: '2024-03-10T09:15:00Z',
      createdBy: 'Ana Rodríguez',
      updatedAt: null,
      updatedBy: null
    }
  ],
  'PROJ-005': [
    {
      id: 'lesson-005-1',
      title: 'Coordinación con operaciones durante mantenimiento',
      description: 'El trabajo en paralelo con operaciones requirió coordinación excepcional. Se implementó un sistema de permisos digital que mejoró la seguridad y redujo paradas no planificadas en 40%.',
      category: 'Proceso',
      impact: 'MEDIUM',
      tags: ['operaciones', 'permisos', 'seguridad'],
      createdAt: '2024-02-28T16:45:00Z',
      createdBy: 'Luis Torres',
      updatedAt: null,
      updatedBy: null
    }
  ]
};

export const getProjectLessonsLearned = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let lessons = mockLessonsLearned[projectId] || [];
      
      // Remove duplicates based on ID
      const uniqueLessons = lessons.filter((lesson, index, self) => 
        index === self.findIndex(l => l.id === lesson.id)
      );
      
      // Update the mock data to remove duplicates
      mockLessonsLearned[projectId] = uniqueLessons;
      
      resolve({ success: true, data: uniqueLessons });
    }, 300);
  });
};

export const addLessonLearned = (projectId, lessonData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate unique ID with timestamp and random component
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      const lessonId = `lesson-${projectId}-${timestamp}-${random}`;
      
      const newLesson = {
        id: lessonId,
        ...lessonData,
        createdAt: lessonData.createdAt || new Date().toISOString(),
        createdBy: lessonData.createdBy || 'Usuario Actual'
      };
      
      // Add to mock data
      if (!mockLessonsLearned[projectId]) {
        mockLessonsLearned[projectId] = [];
      }
      
      // Check if lesson with same ID already exists
      const existingIndex = mockLessonsLearned[projectId].findIndex(l => l.id === lessonId);
      if (existingIndex === -1) {
        mockLessonsLearned[projectId].unshift(newLesson);
      }
      
      resolve({ success: true, data: newLesson });
    }, 500);
  });
};

export const updateLessonLearned = (projectId, lessonId, lessonData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!mockLessonsLearned[projectId]) {
        resolve({ success: false, error: 'Project not found' });
        return;
      }
      
      const lessonIndex = mockLessonsLearned[projectId].findIndex(l => l.id === lessonId);
      if (lessonIndex === -1) {
        resolve({ success: false, error: 'Lesson not found' });
        return;
      }
      
      const updatedLesson = {
        ...mockLessonsLearned[projectId][lessonIndex],
        ...lessonData,
        updatedAt: lessonData.updatedAt || new Date().toISOString(),
        updatedBy: lessonData.updatedBy || 'Usuario Actual'
      };
      
      mockLessonsLearned[projectId][lessonIndex] = updatedLesson;
      resolve({ success: true, data: updatedLesson });
    }, 500);
  });
};

export const deleteLessonLearned = (projectId, lessonId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!mockLessonsLearned[projectId]) {
        resolve({ success: false, error: 'Project not found' });
        return;
      }
      
      const initialLength = mockLessonsLearned[projectId].length;
      mockLessonsLearned[projectId] = mockLessonsLearned[projectId].filter(l => l.id !== lessonId);
      
      if (mockLessonsLearned[projectId].length < initialLength) {
        resolve({ success: true, message: 'Lesson deleted successfully' });
      } else {
        resolve({ success: false, error: 'Lesson not found' });
      }
    }, 300);
  });
};

