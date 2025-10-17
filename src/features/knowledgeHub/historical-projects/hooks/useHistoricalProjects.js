/**
 * useHistoricalProjects - Hook for fetching historical projects data
 * Uses the same filter structure as portfolio for consistency
 * @module features/knowledgeHub/historical-projects/hooks
 */

import { useState, useEffect } from 'react';
import { getHistoricalProjects } from '../../../../services/knowledgeHubApi';
import { getErrorMessage } from '../../../../utils/errorHandlers';

const useHistoricalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
  });
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalDocuments: 0,
    totalClients: 0,
    avgSuccess: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getHistoricalProjects();

      if (response.success) {
        setProjects(response.data.projects || []);
        setStats(response.data.stats || {
          totalProjects: 0,
          totalDocuments: 0,
          totalClients: 0,
          avgSuccess: 0
        });
      } else {
        setError(response.message || 'Error al cargar proyectos históricos');
      }
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Error fetching historical projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters client-side (same logic as portfolio)
  const filteredProjects = projects.filter((project) => {
    // Filter by status
    if (filters.status !== 'all' && project.status !== filters.status) {
      return false;
    }

    // Filter by type
    if (filters.type !== 'all' && project.type !== filters.type) {
      return false;
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        project.name.toLowerCase().includes(searchLower) ||
        project.code.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return {
    projects: filteredProjects,
    allProjects: projects,
    loading,
    error,
    filters,
    setFilters,
    stats,
    refetch: fetchProjects,
  };
};

export default useHistoricalProjects;

