/**
 * RFIPage - Request for Information Management
 * Formal channel for information requests with centralized tracking
 * @module features/projects/rfi/RFIPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import { getProjectById } from '../../../services/projectsApi';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import RFIList from './components/RFIList';
import CreateRFIModal from './components/CreateRFIModal';
import RFIDetailModal from './components/RFIDetailModal';
import useRFI from './hooks/useRFI';
import styles from './RFIPage.module.css';

const RFIPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { rfis, loading, error, filters, setFilters, createRFI, updateRFI } = useRFI(projectId);
  const [selectedRFI, setSelectedRFI] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!selectedProject || !rfis) return null;
    
    return (
      <PageHeader
        title="Gestión de RFI"
        subtitle={`${selectedProject.name} · ${rfis.length} RFI${rfis.length !== 1 ? 's' : ''}`}
        backButton={{
          path: `/projects/${projectId}/dashboard`,
          label: 'Dashboard'
        }}
        actions={[
          {
            label: 'Ver Dashboard',
            variant: 'outline',
            onClick: () => navigate(`/projects/${projectId}/dashboard`)
          },
          {
            label: '+ Crear RFI',
            variant: 'primary',
            onClick: () => setIsCreateModalOpen(true)
          }
        ]}
      />
    );
  }, [selectedProject, rfis, projectId, navigate]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const loadProject = async () => {
    try {
      const response = await getProjectById(projectId);
      if (response.success) {
        selectProject(response.data);
      }
    } catch (err) {
      console.error('Error loading project:', err);
    }
  };

  const handleRFIClick = (rfi) => {
    setSelectedRFI(rfi);
    setIsDetailModalOpen(true);
  };

  const handleCreateRFI = async (rfiData) => {
    await createRFI(rfiData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateRFI = async (rfiId, updates) => {
    await updateRFI(rfiId, updates);
    setIsDetailModalOpen(false);
    setSelectedRFI(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRFI(null);
  };

  // Calculate statistics
  const stats = {
    total: rfis.length,
    open: rfis.filter(r => r.status === 'OPEN').length,
    pendingResponse: rfis.filter(r => r.status === 'PENDING_RESPONSE').length,
    answered: rfis.filter(r => r.status === 'ANSWERED').length,
    closed: rfis.filter(r => r.status === 'CLOSED').length,
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando RFIs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => navigate(`/projects/${projectId}/dashboard`)}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Statistics */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>Total RFIs</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.statOpen}`}>{stats.open}</span>
          <span className={styles.statLabel}>Abiertas</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.statPending}`}>{stats.pendingResponse}</span>
          <span className={styles.statLabel}>Pendiente Respuesta</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.statAnswered}`}>{stats.answered}</span>
          <span className={styles.statLabel}>Respondidas</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.statClosed}`}>{stats.closed}</span>
          <span className={styles.statLabel}>Cerradas</span>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Estado:</label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className={styles.filterSelect}
          >
            <option value="">Todos</option>
            <option value="OPEN">Abiertas</option>
            <option value="PENDING_RESPONSE">Pendiente Respuesta</option>
            <option value="ANSWERED">Respondidas</option>
            <option value="CLOSED">Cerradas</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <input
            type="text"
            placeholder="Buscar por código o asunto..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className={styles.filterSearch}
          />
        </div>
      </div>

      {/* RFI List */}
      <RFIList rfis={rfis} onRFIClick={handleRFIClick} />

      {/* Create RFI Modal */}
      <CreateRFIModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRFI}
        projectId={projectId}
      />

      {/* RFI Detail Modal */}
      <RFIDetailModal
        rfi={selectedRFI}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onUpdate={handleUpdateRFI}
      />
    </div>
  );
};

export default RFIPage;

