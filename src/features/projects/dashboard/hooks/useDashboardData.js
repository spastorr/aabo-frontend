/**
 * useDashboardData hook
 * Fetches and manages dashboard data for a project
 * @module features/projects/dashboard/hooks/useDashboardData
 */

import { useState, useEffect, useCallback } from 'react';
import { env } from '../../../../config/env';
import { getDashboardData } from '../../../../services/mocks/dashboardMocks';
import { getErrorMessage } from '../../../../utils/errorHandlers';

export const useDashboardData = (projectId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, always use mock data
      if (env.useMocks || env.isDevelopment) {
        const response = await getDashboardData(projectId);
        
        if (response.success) {
          setData(response.data);
        } else {
          setError('No se encontraron datos para este proyecto');
        }
      } else {
        // TODO: Call real API when backend is ready
        // const response = await apiClient.get(`/projects/${projectId}/dashboard`);
        // setData(response.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    fetchDashboardData();
  }, [projectId, fetchDashboardData]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};

export default useDashboardData;

