/**
 * Projects API service
 * @module services/projectsApi
 */

import apiClient from './apiClient';
import { env } from '../config/env';
import * as projectMocks from './mocks/projectMocks';
import { getProjectGanttDocuments, getProjectGanttRevisions } from './mocks/ganttMocks';

/**
 * Get all projects
 * @returns {Promise} Projects data
 */
export const getProjects = async () => {
  if (env.useMocks) {
    return projectMocks.getProjects();
  }
  return apiClient.get('/projects');
};

/**
 * Get project by ID
 * @param {string} id - Project ID
 * @returns {Promise} Project data
 */
export const getProjectById = async (id) => {
  if (env.useMocks) {
    return projectMocks.getProjectById(id);
  }
  return apiClient.get(`/projects/${id}`);
};

/**
 * Create new project
 * @param {Object} projectData - Project data
 * @returns {Promise} Created project
 */
export const createProject = async (projectData) => {
  if (env.useMocks) {
    return projectMocks.createProject(projectData);
  }
  return apiClient.post('/projects', projectData);
};

/**
 * Update project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise} Updated project
 */
export const updateProject = async (id, projectData) => {
  if (env.useMocks) {
    // Mock update
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: { id, ...projectData } });
      }, 300);
    });
  }
  return apiClient.put(`/projects/${id}`, projectData);
};

/**
 * Delete project
 * @param {string} id - Project ID
 * @returns {Promise} Deletion result
 */
export const deleteProject = async (id) => {
  if (env.useMocks) {
    // Mock delete
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Project deleted' });
      }, 300);
    });
  }
  return apiClient.delete(`/projects/${id}`);
};

/**
 * Close/Finalize project
 * @param {string} id - Project ID
 * @param {Object} closeData - Close project data (reason, notes, closedAt)
 * @returns {Promise} Updated project
 */
export const closeProject = async (id, closeData) => {
  if (env.useMocks) {
    // Mock close project
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedProject = {
          id,
          status: 'COMPLETED',
          closedAt: closeData.closedAt,
          closeReason: closeData.reason,
          finalNotes: closeData.notes,
          progress: 100
        };
        resolve({ 
          success: true, 
          data: updatedProject,
          message: 'Proyecto cerrado exitosamente'
        });
      }, 500);
    });
  }
  return apiClient.put(`/projects/${id}/close`, closeData);
};

/**
 * Get project documents for Gantt chart
 * @param {string} projectId - Project ID
 * @returns {Promise} Documents data
 */
export const getProjectDocuments = async (projectId) => {
  if (env.useMocks) {
    return getProjectGanttDocuments(projectId);
  }
  return apiClient.get(`/projects/${projectId}/documents`);
};

/**
 * Get project revisions for Gantt chart
 * @param {string} projectId - Project ID
 * @returns {Promise} Revisions data
 */
export const getProjectRevisions = async (projectId) => {
  if (env.useMocks) {
    return getProjectGanttRevisions(projectId);
  }
  return apiClient.get(`/projects/${projectId}/revisions`);
};

