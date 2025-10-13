/**
 * Custom hook for timesheets data
 * @module features/projects/timesheets/hooks/useTimesheets
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getTimesheetsByProject,
  getPendingTimesheets,
  getTimesheetSummary,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  approveTimesheet,
  rejectTimesheet,
} from '../../../../services/timesheetsApi';

const useTimesheets = (projectId) => {
  const [timesheets, setTimesheets] = useState([]);
  const [pendingTimesheets, setPendingTimesheets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load timesheets
  const loadTimesheets = useCallback(async () => {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await getTimesheetsByProject(projectId);
      
      if (response.success) {
        setTimesheets(response.data);
      } else {
        setError(response.error || 'Error al cargar planillas');
      }
    } catch (err) {
      setError(err.message || 'Error al cargar planillas');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Load pending timesheets
  const loadPendingTimesheets = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const response = await getPendingTimesheets(projectId);
      if (response.success) {
        setPendingTimesheets(response.data);
      }
    } catch (err) {
      console.error('Error loading pending timesheets:', err);
    }
  }, [projectId]);

  // Load summary
  const loadSummary = useCallback(async (filters = {}) => {
    if (!projectId) return;
    
    try {
      const response = await getTimesheetSummary(projectId, filters);
      if (response.success) {
        setSummary(response.data);
      }
    } catch (err) {
      console.error('Error loading timesheet summary:', err);
    }
  }, [projectId]);

  // Create new timesheet
  const handleCreateTimesheet = async (timesheetData) => {
    try {
      const response = await createTimesheet(timesheetData);
      if (response.success) {
        await loadTimesheets();
        await loadSummary();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update timesheet
  const handleUpdateTimesheet = async (id, timesheetData) => {
    try {
      const response = await updateTimesheet(id, timesheetData);
      if (response.success) {
        await loadTimesheets();
        await loadSummary();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Delete timesheet
  const handleDeleteTimesheet = async (id) => {
    try {
      const response = await deleteTimesheet(id);
      if (response.success) {
        await loadTimesheets();
        await loadSummary();
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Approve timesheet
  const handleApproveTimesheet = async (id, comments = '') => {
    try {
      const response = await approveTimesheet(id, comments);
      if (response.success) {
        await loadTimesheets();
        await loadPendingTimesheets();
        await loadSummary();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Reject timesheet
  const handleRejectTimesheet = async (id, reason) => {
    try {
      const response = await rejectTimesheet(id, reason);
      if (response.success) {
        await loadTimesheets();
        await loadPendingTimesheets();
        await loadSummary();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Load data on mount
  useEffect(() => {
    loadTimesheets();
    loadPendingTimesheets();
    loadSummary();
  }, [projectId, loadTimesheets, loadPendingTimesheets, loadSummary]);

  return {
    timesheets,
    pendingTimesheets,
    summary,
    loading,
    error,
    actions: {
      create: handleCreateTimesheet,
      update: handleUpdateTimesheet,
      delete: handleDeleteTimesheet,
      approve: handleApproveTimesheet,
      reject: handleRejectTimesheet,
      refresh: loadTimesheets,
      refreshSummary: loadSummary,
    },
  };
};

export default useTimesheets;

