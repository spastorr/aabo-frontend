/**
 * Timesheets API service
 * @module services/timesheetsApi
 */

import apiClient from './apiClient';
import { env } from '../config/env';
import * as timesheetMocks from './mocks/timesheetMocks';

/**
 * Get timesheets by project
 * @param {string} projectId - Project ID
 * @returns {Promise} Timesheets data
 */
export const getTimesheetsByProject = async (projectId) => {
  if (env.useMocks) {
    return timesheetMocks.getTimesheetsByProject(projectId);
  }
  return apiClient.get(`/projects/${projectId}/timesheets`);
};

/**
 * Get timesheets by user
 * @param {string} userId - User ID
 * @param {Object} filters - Optional filters
 * @returns {Promise} Timesheets data
 */
export const getTimesheetsByUser = async (userId, filters = {}) => {
  if (env.useMocks) {
    return timesheetMocks.getTimesheetsByUser(userId, filters);
  }
  return apiClient.get(`/users/${userId}/timesheets`, { params: filters });
};

/**
 * Get pending timesheets for approval
 * @param {string} projectId - Project ID
 * @returns {Promise} Pending timesheets
 */
export const getPendingTimesheets = async (projectId) => {
  if (env.useMocks) {
    return timesheetMocks.getPendingTimesheets(projectId);
  }
  return apiClient.get(`/projects/${projectId}/timesheets/pending`);
};

/**
 * Create new timesheet entry
 * @param {Object} timesheetData - Timesheet data
 * @returns {Promise} Created timesheet
 */
export const createTimesheet = async (timesheetData) => {
  if (env.useMocks) {
    return timesheetMocks.createTimesheet(timesheetData);
  }
  return apiClient.post('/timesheets', timesheetData);
};

/**
 * Update timesheet
 * @param {string} id - Timesheet ID
 * @param {Object} timesheetData - Updated timesheet data
 * @returns {Promise} Updated timesheet
 */
export const updateTimesheet = async (id, timesheetData) => {
  if (env.useMocks) {
    return timesheetMocks.updateTimesheet(id, timesheetData);
  }
  return apiClient.put(`/timesheets/${id}`, timesheetData);
};

/**
 * Delete timesheet
 * @param {string} id - Timesheet ID
 * @returns {Promise} Deletion result
 */
export const deleteTimesheet = async (id) => {
  if (env.useMocks) {
    return timesheetMocks.deleteTimesheet(id);
  }
  return apiClient.delete(`/timesheets/${id}`);
};

/**
 * Approve timesheet
 * @param {string} id - Timesheet ID
 * @param {string} comments - Optional approval comments
 * @returns {Promise} Approval result
 */
export const approveTimesheet = async (id, comments = '') => {
  if (env.useMocks) {
    return timesheetMocks.approveTimesheet(id, comments);
  }
  return apiClient.post(`/timesheets/${id}/approve`, { comments });
};

/**
 * Reject timesheet
 * @param {string} id - Timesheet ID
 * @param {string} reason - Rejection reason
 * @returns {Promise} Rejection result
 */
export const rejectTimesheet = async (id, reason) => {
  if (env.useMocks) {
    return timesheetMocks.rejectTimesheet(id, reason);
  }
  return apiClient.post(`/timesheets/${id}/reject`, { reason });
};

/**
 * Get timesheet summary
 * @param {string} projectId - Project ID
 * @param {Object} filters - Date range filters
 * @returns {Promise} Timesheet summary data
 */
export const getTimesheetSummary = async (projectId, filters = {}) => {
  if (env.useMocks) {
    return timesheetMocks.getTimesheetSummary(projectId, filters);
  }
  return apiClient.get(`/projects/${projectId}/timesheets/summary`, { params: filters });
};

