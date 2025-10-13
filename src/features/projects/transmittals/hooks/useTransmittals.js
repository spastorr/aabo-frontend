/**
 * useTransmittals - Hook for managing transmittal data
 * @module features/projects/transmittals/hooks/useTransmittals
 */

import { useState, useEffect, useCallback } from 'react';
import { getTransmittalsByProject } from '../../../../services/mocks/transmittalMocks';

const useTransmittals = (projectId) => {
  const [transmittals, setTransmittals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransmittals = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getTransmittalsByProject(projectId);
      
      if (response.success) {
        setTransmittals(response.data);
      } else {
        setError(response.error || 'Error al cargar transmittals');
      }
    } catch (err) {
      console.error('Error loading transmittals:', err);
      setError('Error al cargar transmittals');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadTransmittals();
  }, [loadTransmittals]);

  const refreshTransmittals = () => {
    loadTransmittals();
  };

  return {
    transmittals,
    loading,
    error,
    refreshTransmittals
  };
};

export default useTransmittals;

