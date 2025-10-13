/**
 * Custom hook for resource planning data
 * @module features/projects/resource-planning/hooks/useResources
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getTeamWorkload,
  getResourceAssignments,
  assignResource,
  updateResourceAssignment,
  removeResourceAssignment,
  getCapacityPlanning,
  getAvailableTeamMembers,
} from '../../../../services/resourcesApi';

const useResources = (projectId) => {
  const [teamWorkload, setTeamWorkload] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [capacityData, setCapacityData] = useState(null);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load team workload
  const loadTeamWorkload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeamWorkload(projectId);
      
      if (response.success) {
        setTeamWorkload(response.data);
      } else {
        setError(response.error || 'Error al cargar carga de trabajo');
      }
    } catch (err) {
      setError(err.message || 'Error al cargar carga de trabajo');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Load assignments
  const loadAssignments = useCallback(async () => {
    if (!projectId) return;
    
    try {
      const response = await getResourceAssignments(projectId);
      if (response.success) {
        setAssignments(response.data);
      }
    } catch (err) {
      console.error('Error loading assignments:', err);
    }
  }, [projectId]);

  // Load capacity planning
  const loadCapacityPlanning = useCallback(async (filters = {}) => {
    try {
      const response = await getCapacityPlanning(filters);
      if (response.success) {
        setCapacityData(response.data);
      }
    } catch (err) {
      console.error('Error loading capacity planning:', err);
    }
  }, []);

  // Load available team members
  const loadAvailableMembers = useCallback(async (discipline = null) => {
    if (!projectId) return;
    
    try {
      const response = await getAvailableTeamMembers(projectId, discipline);
      if (response.success) {
        setAvailableMembers(response.data);
      }
    } catch (err) {
      console.error('Error loading available members:', err);
    }
  }, [projectId]);

  // Assign resource
  const handleAssignResource = async (assignmentData) => {
    try {
      const response = await assignResource(assignmentData);
      if (response.success) {
        await loadAssignments();
        await loadTeamWorkload();
        await loadCapacityPlanning();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update assignment
  const handleUpdateAssignment = async (assignmentId, assignmentData) => {
    try {
      const response = await updateResourceAssignment(assignmentId, assignmentData);
      if (response.success) {
        await loadAssignments();
        await loadTeamWorkload();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Remove assignment
  const handleRemoveAssignment = async (assignmentId) => {
    try {
      const response = await removeResourceAssignment(assignmentId);
      if (response.success) {
        await loadAssignments();
        await loadTeamWorkload();
        await loadCapacityPlanning();
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Load data on mount
  useEffect(() => {
    loadTeamWorkload();
    if (projectId) {
      loadAssignments();
      loadAvailableMembers();
    }
    loadCapacityPlanning();
  }, [projectId, loadTeamWorkload, loadAssignments, loadAvailableMembers, loadCapacityPlanning]);

  return {
    teamWorkload,
    assignments,
    capacityData,
    availableMembers,
    loading,
    error,
    actions: {
      assign: handleAssignResource,
      updateAssignment: handleUpdateAssignment,
      removeAssignment: handleRemoveAssignment,
      refresh: loadTeamWorkload,
      refreshAssignments: loadAssignments,
      refreshCapacity: loadCapacityPlanning,
      loadAvailableMembers,
    },
  };
};

export default useResources;

