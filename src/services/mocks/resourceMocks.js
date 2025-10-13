/**
 * Resource mock data
 * @module services/mocks/resourceMocks
 */

export const mockTeamMembers = [
  {
    id: 'USR-001',
    name: 'Luis Ramírez',
    role: 'Gerente de Proyecto',
    discipline: 'Gestión',
    costRate: 65,
    totalHours: 160,
    allocatedHours: 140,
    availableHours: 20,
    utilization: 87.5, // percentage
    projects: [
      { id: 'PROJ-001', name: 'Refinería Esmeraldas', hours: 80 },
      { id: 'PROJ-002', name: 'Planta Petroamazonas', hours: 60 },
    ],
  },
  {
    id: 'USR-002',
    name: 'María González',
    role: 'Ingeniera de Procesos Senior',
    discipline: 'Procesos',
    costRate: 45,
    totalHours: 160,
    allocatedHours: 158,
    availableHours: 2,
    utilization: 98.75,
    projects: [
      { id: 'PROJ-001', name: 'Refinería Esmeraldas', hours: 120 },
      { id: 'PROJ-003', name: 'Terminal Balao', hours: 38 },
    ],
    status: 'overloaded',
  },
  {
    id: 'USR-003',
    name: 'Carlos Méndez',
    role: 'Ingeniero Mecánico',
    discipline: 'Mecánica',
    costRate: 50,
    totalHours: 160,
    allocatedHours: 95,
    availableHours: 65,
    utilization: 59.4,
    projects: [
      { id: 'PROJ-001', name: 'Refinería Esmeraldas', hours: 95 },
    ],
    status: 'available',
  },
  {
    id: 'USR-004',
    name: 'Ana Rodríguez',
    role: 'Ingeniera Eléctrica',
    discipline: 'Eléctrica',
    costRate: 48,
    totalHours: 160,
    allocatedHours: 130,
    availableHours: 30,
    utilization: 81.25,
    projects: [
      { id: 'PROJ-002', name: 'Planta Petroamazonas', hours: 80 },
      { id: 'PROJ-003', name: 'Terminal Balao', hours: 50 },
    ],
  },
  {
    id: 'USR-005',
    name: 'Pedro Torres',
    role: 'Ingeniero Civil Junior',
    discipline: 'Civil',
    costRate: 35,
    totalHours: 160,
    allocatedHours: 70,
    availableHours: 90,
    utilization: 43.75,
    projects: [
      { id: 'PROJ-002', name: 'Planta Petroamazonas', hours: 70 },
    ],
    status: 'available',
  },
  {
    id: 'USR-006',
    name: 'Laura Vega',
    role: 'Ingeniera de Instrumentación',
    discipline: 'Instrumentación',
    costRate: 47,
    totalHours: 160,
    allocatedHours: 155,
    availableHours: 5,
    utilization: 96.9,
    projects: [
      { id: 'PROJ-001', name: 'Refinería Esmeraldas', hours: 100 },
      { id: 'PROJ-003', name: 'Terminal Balao', hours: 55 },
    ],
  },
];

export const mockAssignments = [
  {
    id: 'ASG-001',
    projectId: 'PROJ-001',
    userId: 'USR-002',
    userName: 'María González',
    documentId: 'DOC-001',
    documentCode: 'AAB-PRO-ESM-001-PFD-001',
    documentName: 'PFD - Unidad de Destilación',
    estimatedHours: 40,
    actualHours: 35,
    startDate: '2024-10-01',
    dueDate: '2024-10-15',
    status: 'in_progress',
  },
  {
    id: 'ASG-002',
    projectId: 'PROJ-001',
    userId: 'USR-003',
    userName: 'Carlos Méndez',
    documentId: 'DOC-002',
    documentCode: 'AAB-MEC-ESM-001-CAL-001',
    documentName: 'Cálculo Mecánico - Intercambiador',
    estimatedHours: 50,
    actualHours: 42,
    startDate: '2024-10-05',
    dueDate: '2024-10-20',
    status: 'in_progress',
  },
  {
    id: 'ASG-003',
    projectId: 'PROJ-001',
    userId: 'USR-006',
    userName: 'Laura Vega',
    documentId: 'DOC-005',
    documentCode: 'AAB-INS-ESM-001-DAT-001',
    documentName: 'Datasheet - Transmisores de Presión',
    estimatedHours: 30,
    actualHours: 0,
    startDate: '2024-10-10',
    dueDate: '2024-10-25',
    status: 'assigned',
  },
];

export const getTeamWorkload = (projectId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let members = [...mockTeamMembers];
      
      if (projectId) {
        members = members.map(member => {
          const projectHours = member.projects.find(p => p.id === projectId);
          return {
            ...member,
            projectHours: projectHours ? projectHours.hours : 0,
          };
        }).filter(member => member.projectHours > 0);
      }
      
      resolve({ success: true, data: members });
    }, 400);
  });
};

export const getResourceAssignments = (projectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const assignments = mockAssignments.filter(a => a.projectId === projectId);
      resolve({ success: true, data: assignments });
    }, 400);
  });
};

export const assignResource = (assignmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAssignment = {
        ...assignmentData,
        id: `ASG-${String(mockAssignments.length + 1).padStart(3, '0')}`,
        actualHours: 0,
        status: 'assigned',
      };
      mockAssignments.push(newAssignment);
      resolve({ success: true, data: newAssignment });
    }, 500);
  });
};

export const updateResourceAssignment = (assignmentId, assignmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockAssignments.findIndex(a => a.id === assignmentId);
      if (index !== -1) {
        mockAssignments[index] = { ...mockAssignments[index], ...assignmentData };
        resolve({ success: true, data: mockAssignments[index] });
      } else {
        resolve({ success: false, error: 'Assignment not found' });
      }
    }, 400);
  });
};

export const removeResourceAssignment = (assignmentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockAssignments.findIndex(a => a.id === assignmentId);
      if (index !== -1) {
        mockAssignments.splice(index, 1);
        resolve({ success: true, message: 'Assignment removed' });
      } else {
        resolve({ success: false, error: 'Assignment not found' });
      }
    }, 300);
  });
};

export const getCapacityPlanning = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        totalTeamCapacity: 960, // 6 people * 160 hours
        totalAllocated: 748,
        totalAvailable: 212,
        averageUtilization: 77.9,
        overloadedMembers: mockTeamMembers.filter(m => m.utilization > 95).length,
        availableMembers: mockTeamMembers.filter(m => m.utilization < 70).length,
        byDiscipline: [
          { discipline: 'Procesos', capacity: 160, allocated: 158, utilization: 98.75 },
          { discipline: 'Mecánica', capacity: 160, allocated: 95, utilization: 59.4 },
          { discipline: 'Eléctrica', capacity: 160, allocated: 130, utilization: 81.25 },
          { discipline: 'Civil', capacity: 160, allocated: 70, utilization: 43.75 },
          { discipline: 'Instrumentación', capacity: 160, allocated: 155, utilization: 96.9 },
          { discipline: 'Gestión', capacity: 160, allocated: 140, utilization: 87.5 },
        ],
      };
      
      resolve({ success: true, data });
    }, 400);
  });
};

export const getAvailableTeamMembers = (projectId, discipline = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let available = mockTeamMembers.filter(m => m.availableHours > 10);
      
      if (discipline) {
        available = available.filter(m => m.discipline === discipline);
      }
      
      resolve({ success: true, data: available });
    }, 300);
  });
};

