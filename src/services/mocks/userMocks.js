/**
 * User mock data
 * @module services/mocks/userMocks
 */

import { ROLES } from '../../constants';

export const mockUsers = [
  {
    id: 'USR-001',
    email: 'admin@aabo.com',
    name: 'Juan Pérez',
    role: ROLES.ADMIN,
    permissions: [
      'project:view',
      'project:create',
      'document:view',
      'document:approve',
      'document:download',
      'document:view_content',
      'admin:access'
    ],
    projectIds: ['PROJ-001', 'PROJ-002', 'PROJ-003'],
    avatar: null,
  },
  {
    id: 'USR-002',
    email: 'engineer@aabo.com',
    name: 'María González',
    role: ROLES.ENGINEER,
    permissions: [
      'project:view',
      'document:view',
      'document:create',
      'document:download',
      'document:view_content'
    ],
    projectIds: ['PROJ-001', 'PROJ-002'],
    avatar: null,
  },
];

export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') {
        resolve({
          success: true,
          data: {
            user,
            token: 'mock-jwt-token-' + Date.now(),
          },
        });
      } else {
        reject({
          success: false,
          error: 'Credenciales inválidas',
        });
      }
    }, 800);
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: mockUsers[0] });
    }, 300);
  });
};

