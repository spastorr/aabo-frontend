/**
 * useSearch - Hook for semantic search functionality
 * @module features/knowledgeHub/search/hooks
 */

import { useState, useEffect } from 'react';
import { searchKnowledgeHub } from '../../../../services/knowledgeHubApi';

const useSearch = ({ query, filters, enabled }) => {
  const [results, setResults] = useState({
    historicalProjects: [],
    clientStandards: [],
    internalGuides: [],
    externalNorms: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (enabled && query) {
      performSearch();
    }
  }, [query, filters, enabled]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchKnowledgeHub({
        query,
        ...filters
      });

      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.message || 'Error al realizar la búsqueda');
      }
    } catch (err) {
      setError('Error de conexión al realizar la búsqueda');
      console.error('Error searching knowledge hub:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error
  };
};

export default useSearch;

