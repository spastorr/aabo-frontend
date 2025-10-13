/**
 * Permissions Context Provider
 * Implements RBAC/ABAC system
 * @module contexts/PermissionsContext
 */

import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions, canAccessProject } from '../utils/permissions';

const PermissionsContext = createContext(null);

export const PermissionsProvider = ({ children }) => {
  const { user } = useAuth();

  const checkPermission = (permission) => {
    return hasPermission(user, permission);
  };

  const checkAnyPermission = (permissions) => {
    return hasAnyPermission(user, permissions);
  };

  const checkAllPermissions = (permissions) => {
    return hasAllPermissions(user, permissions);
  };

  const checkProjectAccess = (projectId) => {
    return canAccessProject(user, projectId);
  };

  const value = {
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    checkProjectAccess,
  };

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export default PermissionsContext;

