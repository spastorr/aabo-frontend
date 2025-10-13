/**
 * usePortfolio hook
 * Manages portfolio data fetching and state
 * @module features/projects/portfolio/hooks/usePortfolio
 */

import { useState, useEffect } from 'react';
import { getProjects } from '../../../../services/projectsApi';
import { getErrorMessage } from '../../../../utils/errorHandlers';

export const usePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjects();
      
      if (response.success) {
        setProjects(response.data);
      } else {
        setError('Error al cargar proyectos');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

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
    refetch: fetchProjects,
  };
};

export default usePortfolio;

