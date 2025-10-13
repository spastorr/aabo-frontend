/**
 * Permission checking utilities for RBAC/ABAC
 * @module utils/permissions
 */

import { ROLE_HIERARCHY } from '../constants/roles';

/**
 * Checks if user has a specific permission
 * @param {Object} user - User object with permissions array
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

/**
 * Checks if user has any of the specified permissions
 * @param {Object} user - User object with permissions array
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} True if user has any permission
 */
export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => user.permissions.includes(permission));
};

/**
 * Checks if user has all of the specified permissions
 * @param {Object} user - User object with permissions array
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} True if user has all permissions
 */
export const hasAllPermissions = (user, permissions) => {
  if (!user || !user.permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => user.permissions.includes(permission));
};

/**
 * Checks if user role has higher or equal hierarchy than required role
 * @param {string} userRole - User's role
 * @param {string} requiredRole - Required role
 * @returns {boolean} True if user role is sufficient
 */
export const hasRoleLevel = (userRole, requiredRole) => {
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  return userLevel >= requiredLevel;
};

/**
 * Checks if user can access a specific project
 * @param {Object} user - User object
 * @param {string} projectId - Project ID
 * @returns {boolean} True if user can access project
 */
export const canAccessProject = (user, projectId) => {
  if (!user || !projectId) return false;
  // Super admin can access all projects
  if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') return true;
  // Check if user is assigned to project
  return user.projectIds?.includes(projectId) || false;
};

