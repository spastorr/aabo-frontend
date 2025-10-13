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

