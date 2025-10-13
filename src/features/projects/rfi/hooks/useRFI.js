/**
 * useRFI Hook
 * Manages RFI data and operations
 * @module features/projects/rfi/hooks/useRFI
 */

import { useState, useEffect } from 'react';
import { getRFIsByProject } from '../../../../services/mocks/rfiMocks';

const useRFI = (projectId) => {
  const [rfis, setRFIs] = useState([]);
  const [filteredRFIs, setFilteredRFIs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  // Load RFIs
  useEffect(() => {
    loadRFIs();
  }, [projectId]);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [rfis, filters]);

  const loadRFIs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRFIsByProject(projectId);
      if (response.success) {
        setRFIs(response.data);
      } else {
        setError('Error al cargar los RFIs');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('Error loading RFIs:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...rfis];

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(rfi => rfi.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(rfi => 
        rfi.code.toLowerCase().includes(search) ||
        rfi.subject.toLowerCase().includes(search) ||
        rfi.description.toLowerCase().includes(search)
      );
    }

    setFilteredRFIs(filtered);
  };

  const createRFI = async (rfiData) => {
    try {
      // In a real app, this would call an API
      const newRFI = {
        id: `RFI-${Date.now()}`,
        code: generateRFICode(projectId),
        projectId,
        ...rfiData,
        status: 'OPEN',
        createdDate: new Date().toISOString().split('T')[0],
      };
      setRFIs([newRFI, ...rfis]);
      return { success: true, data: newRFI };
    } catch (err) {
      console.error('Error creating RFI:', err);
      return { success: false, error: 'Error al crear RFI' };
    }
  };

  const updateRFI = async (rfiId, updates) => {
    try {
      // In a real app, this would call an API
      setRFIs(rfis.map(rfi => 
        rfi.id === rfiId ? { ...rfi, ...updates } : rfi
      ));
      return { success: true };
    } catch (err) {
      console.error('Error updating RFI:', err);
      return { success: false, error: 'Error al actualizar RFI' };
    }
  };

  const generateRFICode = (projectId) => {
    // Simple code generator - in real app this would be more sophisticated
    const count = rfis.length + 1;
    return `RFI-${projectId}-${String(count).padStart(4, '0')}`;
  };

  return {
    rfis: filteredRFIs,
    loading,
    error,
    filters,
    setFilters,
    createRFI,
    updateRFI,
    reload: loadRFIs,
  };
};

export default useRFI;

