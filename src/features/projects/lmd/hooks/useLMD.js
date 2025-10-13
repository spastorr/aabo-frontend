/**
 * useLMD hook
 * Manages document list data and filtering
 * @module features/projects/lmd/hooks/useLMD
 */

import { useState, useEffect, useMemo } from 'react';
import { getDocumentsByProject } from '../../../../services/documentsApi';
import { getErrorMessage } from '../../../../utils/errorHandlers';

export const useLMD = (projectId) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    discipline: 'all',
    search: '',
  });

  useEffect(() => {
    if (projectId) {
      fetchDocuments();
    }
  }, [projectId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDocumentsByProject(projectId);
      
      if (response.success) {
        setDocuments(response.data);
      } else {
        setError('Error al cargar documentos');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Filter by status
      if (filters.status !== 'all' && doc.status !== filters.status) {
        return false;
      }

      // Filter by discipline
      if (filters.discipline !== 'all' && doc.discipline !== filters.discipline) {
        return false;
      }

      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          doc.code.toLowerCase().includes(searchLower) ||
          doc.name.toLowerCase().includes(searchLower) ||
          doc.responsible.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [documents, filters.status, filters.discipline, filters.search]);

  return {
    documents: filteredDocuments,
    allDocuments: documents,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchDocuments,
  };
};

export default useLMD;

