/**
 * useCloseProject hook
 * Handles project closing functionality
 * @module features/projects/dashboard/hooks/useCloseProject
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { closeProject } from '@services/projectsApi';
import { PROJECT_STATUS } from '@constants';
import { getErrorMessage } from '@utils/errorHandlers';

export const useCloseProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const closeProjectHandler = async (projectId, closeData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await closeProject(projectId, closeData);
      
      if (response.success) {
        // Show success message
        alert('✅ Proyecto cerrado exitosamente');
        
        // Navigate back to portfolio
        navigate('/projects');
        
        return response.data;
      } else {
        throw new Error(response.message || 'Error al cerrar el proyecto');
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      alert(`❌ Error al cerrar el proyecto: ${errorMessage}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const canCloseProject = (project) => {
    if (!project) return false;
    return project.status === PROJECT_STATUS.ACTIVE;
  };

  const getCloseButtonText = (project) => {
    if (!project) return 'Cerrar Proyecto';
    
    switch (project.status) {
      case PROJECT_STATUS.ACTIVE:
        return '🔒 Cerrar Proyecto';
      case PROJECT_STATUS.COMPLETED:
        return '✅ Proyecto Cerrado';
      case PROJECT_STATUS.ON_HOLD:
        return '⏸️ Proyecto en Pausa';
      case PROJECT_STATUS.CANCELLED:
        return '❌ Proyecto Cancelado';
      default:
        return 'Cerrar Proyecto';
    }
  };

  const getCloseButtonVariant = (project) => {
    if (!project) return 'danger';
    
    switch (project.status) {
      case PROJECT_STATUS.ACTIVE:
        return 'danger';
      case PROJECT_STATUS.COMPLETED:
        return 'success';
      case PROJECT_STATUS.ON_HOLD:
        return 'warning';
      case PROJECT_STATUS.CANCELLED:
        return 'secondary';
      default:
        return 'danger';
    }
  };

  return {
    loading,
    error,
    closeProject: closeProjectHandler,
    canCloseProject,
    getCloseButtonText,
    getCloseButtonVariant,
  };
};

export default useCloseProject;
