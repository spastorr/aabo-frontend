/**
 * Documents API service
 * @module services/documentsApi
 */

import apiClient from './apiClient';
import { env } from '../config/env';
import * as documentMocks from './mocks/documentMocks';

/**
 * Get documents by project ID
 * @param {string} projectId - Project ID
 * @returns {Promise} Documents data
 */
export const getDocumentsByProject = async (projectId) => {
  if (env.useMocks) {
    return documentMocks.getDocumentsByProject(projectId);
  }
  return apiClient.get(`/projects/${projectId}/documents`);
};

/**
 * Get document by ID
 * @param {string} documentId - Document ID
 * @returns {Promise} Document data
 */
export const getDocumentById = async (documentId) => {
  if (env.useMocks) {
    return documentMocks.getDocumentById(documentId);
  }
  return apiClient.get(`/documents/${documentId}`);
};

/**
 * Create new document
 * @param {string} projectId - Project ID
 * @param {Object} documentData - Document data
 * @returns {Promise} Created document
 */
export const createDocument = async (projectId, documentData) => {
  if (env.useMocks) {
    return documentMocks.createDocument(projectId, documentData);
  }
  return apiClient.post(`/projects/${projectId}/documents`, documentData);
};

/**
 * Update document
 * @param {string} documentId - Document ID
 * @param {Object} documentData - Updated document data
 * @returns {Promise} Updated document
 */
export const updateDocument = async (documentId, documentData) => {
  if (env.useMocks) {
    return documentMocks.updateDocument(documentId, documentData);
  }
  return apiClient.put(`/documents/${documentId}`, documentData);
};

/**
 * Delete document
 * @param {string} documentId - Document ID
 * @returns {Promise} Deletion result
 */
export const deleteDocument = async (documentId) => {
  if (env.useMocks) {
    return documentMocks.deleteDocument(documentId);
  }
  return apiClient.delete(`/documents/${documentId}`);
};

/**
 * Get document history/versions
 * @param {string} documentId - Document ID
 * @returns {Promise} Document history
 */
export const getDocumentHistory = async (documentId) => {
  if (env.useMocks) {
    return documentMocks.getDocumentHistory(documentId);
  }
  return apiClient.get(`/documents/${documentId}/history`);
};

