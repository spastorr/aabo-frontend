/**
 * useHistoricalProjects - Hook for fetching historical projects data
 * @module features/knowledgeHub/historical-projects/hooks
 */

import { useState, useEffect } from 'react';
import { getHistoricalProjects } from '../../../../services/knowledgeHubApi';

const useHistoricalProjects = ({ searchQuery = '', filters = {} }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalDocuments: 0,
    totalClients: 0,
    avgSuccess: 0
  });

  useEffect(() => {
    fetchProjects();
  }, [searchQuery, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getHistoricalProjects({
        search: searchQuery,
        ...filters
      });

      if (response.success) {
        setProjects(response.data.projects);
        setStats(response.data.stats);
      } else {
        setError(response.message || 'Error al cargar proyectos históricos');
      }
    } catch (err) {
      setError('Error de conexión al cargar proyectos');
      console.error('Error fetching historical projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    stats
  };
};

export default useHistoricalProjects;

