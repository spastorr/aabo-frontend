/**
 * Resources API service
 * @module services/resourcesApi
 */

import apiClient from './apiClient';
import { env } from '../config/env';
import * as resourceMocks from './mocks/resourceMocks';

/**
 * Get team workload overview
 * @param {string} projectId - Optional project ID to filter
 * @returns {Promise} Workload data
 */
export const getTeamWorkload = async (projectId = null) => {
  if (env.useMocks) {
    return resourceMocks.getTeamWorkload(projectId);
  }
  const url = projectId ? `/projects/${projectId}/resources/workload` : '/resources/workload';
  return apiClient.get(url);
};

/**
 * Get resource assignments for a project
 * @param {string} projectId - Project ID
 * @returns {Promise} Assignments data
 */
export const getResourceAssignments = async (projectId) => {
  if (env.useMocks) {
    return resourceMocks.getResourceAssignments(projectId);
  }
  return apiClient.get(`/projects/${projectId}/resources/assignments`);
};

/**
 * Assign resource to document
 * @param {Object} assignmentData - Assignment data
 * @returns {Promise} Assignment result
 */
export const assignResource = async (assignmentData) => {
  if (env.useMocks) {
    return resourceMocks.assignResource(assignmentData);
  }
  return apiClient.post('/resources/assign', assignmentData);
};

/**
 * Update resource assignment
 * @param {string} assignmentId - Assignment ID
 * @param {Object} assignmentData - Updated assignment data
 * @returns {Promise} Updated assignment
 */
export const updateResourceAssignment = async (assignmentId, assignmentData) => {
  if (env.useMocks) {
    return resourceMocks.updateResourceAssignment(assignmentId, assignmentData);
  }
  return apiClient.put(`/resources/assignments/${assignmentId}`, assignmentData);
};

/**
 * Remove resource assignment
 * @param {string} assignmentId - Assignment ID
 * @returns {Promise} Removal result
 */
export const removeResourceAssignment = async (assignmentId) => {
  if (env.useMocks) {
    return resourceMocks.removeResourceAssignment(assignmentId);
  }
  return apiClient.delete(`/resources/assignments/${assignmentId}`);
};

/**
 * Get capacity planning data
 * @param {Object} filters - Date range and other filters
 * @returns {Promise} Capacity data
 */
export const getCapacityPlanning = async (filters = {}) => {
  if (env.useMocks) {
    return resourceMocks.getCapacityPlanning(filters);
  }
  return apiClient.get('/resources/capacity', { params: filters });
};

/**
 * Get team members available for assignment
 * @param {string} projectId - Project ID
 * @param {string} discipline - Optional discipline filter
 * @returns {Promise} Available team members
 */
export const getAvailableTeamMembers = async (projectId, discipline = null) => {
  if (env.useMocks) {
    return resourceMocks.getAvailableTeamMembers(projectId, discipline);
  }
  const params = discipline ? { discipline } : {};
  return apiClient.get(`/projects/${projectId}/resources/available`, { params });
};

