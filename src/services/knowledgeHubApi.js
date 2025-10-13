/**
 * Knowledge Hub API Service
 * @module services/knowledgeHubApi
 */

import apiClient from './apiClient';
import { getKnowledgeHubMocks } from './mocks';

// Use mocks by default if VITE_USE_MOCKS is not explicitly set to 'false'
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

/**
 * Get historical projects
 */
export const getHistoricalProjects = async (params = {}) => {
  if (USE_MOCKS) {
    return getKnowledgeHubMocks().getHistoricalProjects(params);
  }
  return apiClient.get('/knowledge-hub/historical-projects', { params });
};

/**
 * Get standards by type
 */
export const getStandards = async (type) => {
  if (USE_MOCKS) {
    return getKnowledgeHubMocks().getStandards(type);
  }
  return apiClient.get(`/knowledge-hub/standards/${type}`);
};

/**
 * Search across Knowledge Hub
 */
export const searchKnowledgeHub = async (params = {}) => {
  if (USE_MOCKS) {
    return getKnowledgeHubMocks().searchKnowledgeHub(params);
  }
  return apiClient.get('/knowledge-hub/search', { params });
};

/**
 * Get client standards profile
 */
export const getClientProfile = async (clientId) => {
  if (USE_MOCKS) {
    return getKnowledgeHubMocks().getClientProfile(clientId);
  }
  return apiClient.get(`/knowledge-hub/clients/${clientId}`);
};

/**
 * Upload new standard
 */
export const uploadStandard = async (type, data) => {
  if (USE_MOCKS) {
    return getKnowledgeHubMocks().uploadStandard(type, data);
  }
  return apiClient.post(`/knowledge-hub/standards/${type}`, data);
};

