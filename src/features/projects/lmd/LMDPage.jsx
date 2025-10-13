/**
 * LMDPage - Lista Maestra de Documentos
 * The core document management feature
 * @module features/projects/lmd/LMDPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import { getProjectById } from '../../../services/projectsApi';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import LMDTable from './components/LMDTable';
import LMDFilters from './components/LMDFilters';
import DocumentDetailModal from './components/DocumentDetailModal';
import useLMD from './hooks/useLMD';
import styles from './LMDPage.module.css';

const LMDPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { documents, loading, error, filters, setFilters } = useLMD(projectId);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

  // Memoize header content to prevent re-renders
  const headerContent = useMemo(() => {
    if (!selectedProject || !documents) return null;

    return (
      <PageHeader
        title="Lista Maestra de Documentos"
        subtitle={`${selectedProject.name} · ${documents.length} documento${documents.length !== 1 ? 's' : ''}`}
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
            label: '+ Agregar Documento',
            variant: 'primary',
            onClick: () => alert('Agregar documento - Por implementar')
          }
        ]}
      />
    );
  }, [selectedProject, documents, projectId]);

  // Set header content in Topbar
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

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDocument(null);
  };

  const handleAddDocument = () => {
    alert('Agregar documento - Por implementar');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando documentos...</p>
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
      {/* Filters */}
      <LMDFilters filters={filters} onFilterChange={setFilters} />

      {/* Statistics */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{documents.length}</span>
          <span className={styles.statLabel}>Total Documentos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {documents.filter(d => d.status === 'APR').length}
          </span>
          <span className={styles.statLabel}>Aprobados</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {documents.filter(d => d.status === 'ELB').length}
          </span>
          <span className={styles.statLabel}>En Elaboración</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {documents.filter(d => d.status === 'ACC' || d.status === 'CMN').length}
          </span>
          <span className={styles.statLabel}>Pendientes</span>
        </div>
      </div>

      {/* Table */}
      <LMDTable documents={documents} onDocumentClick={handleDocumentClick} />

      {/* Document Detail Modal */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default LMDPage;

