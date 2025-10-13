/**
 * useStandards - Hook for fetching standards data
 * @module features/knowledgeHub/standards/hooks
 */

import { useState, useEffect } from 'react';
import { getStandards } from '../../../../services/knowledgeHubApi';

const useStandards = (type) => {
  const [clientStandards, setClientStandards] = useState([]);
  const [internalGuides, setInternalGuides] = useState([]);
  const [externalNorms, setExternalNorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStandards();
  }, [type]);

  const fetchStandards = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getStandards(type);

      if (response.success) {
        if (type === 'client') {
          setClientStandards(response.data);
        } else if (type === 'internal') {
          setInternalGuides(response.data);
        } else if (type === 'external') {
          setExternalNorms(response.data);
        }
      } else {
        setError(response.message || 'Error al cargar estándares');
      }
    } catch (err) {
      setError('Error de conexión al cargar estándares');
      console.error('Error fetching standards:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    clientStandards,
    internalGuides,
    externalNorms,
    loading,
    error
  };
};

export default useStandards;

