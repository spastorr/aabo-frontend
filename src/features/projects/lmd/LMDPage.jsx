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
import ExportDropdown from '../../../components/shared/ExportDropdown';
import { exportToPDF as exportProjectsPDF, exportToExcel as exportProjectsExcel } from '../../../utils/exportUtils';
import LMDTable from './components/LMDTable';
import LMDFilters from './components/LMDFilters';
import DocumentDetailModal from './components/DocumentDetailModal';
import { getTransmissionStatistics } from '../../../utils/documentStatusUtils';
import QuickAddDocumentModal from './components/QuickAddDocumentModal/QuickAddDocumentModal';
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calculate transmission statistics
  const transmissionStats = useMemo(() => {
    return documents ? getTransmissionStatistics(documents) : null;
  }, [documents]);

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
          ...(transmissionStats && transmissionStats.pending > 0 ? [{
            label: `📤 Crear Transmittal (${transmissionStats.pending})`,
            variant: 'warning',
            onClick: () => navigate(`/projects/${projectId}/transmittals?create=true`)
          }] : []),
          {
            label: '+ Agregar Documento',
            variant: 'primary',
            onClick: () => setIsAddModalOpen(true)
          }
        ]}
        actionsComponent={
          <ExportDropdown
            onExportPDF={() => exportProjectsPDF(documents, { search: filters.search || '' })}
            onExportExcel={() => exportProjectsExcel(documents, { search: filters.search || '' })}
          />
        }
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
    setIsAddModalOpen(true);
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
        {transmissionStats && (
          <>
            <div className={`${styles.stat} ${styles.pendingStat}`}>
              <span className={styles.statValue}>{transmissionStats.pending}</span>
              <span className={styles.statLabel}>Pendientes Envío</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{transmissionStats.transmitted}</span>
              <span className={styles.statLabel}>Ya Enviados</span>
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <LMDTable documents={documents} onDocumentClick={handleDocumentClick} />

      {/* Document Detail Modal */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        projectId={projectId}
        onDocumentUpdate={() => {
          // Refresh documents when a document is updated
          window.location.reload(); // Simple refresh for now
        }}
      />

      <QuickAddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => window.location.reload()}
        projectId={projectId}
        projectCode={selectedProject?.code}
      />
    </div>
  );
};

export default LMDPage;

