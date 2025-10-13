/**
 * HistoricalProjectsPage - Library of completed projects with full documentation
 * @module features/knowledgeHub/historical-projects/HistoricalProjectsPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import Button from '../../../components/shared/Button';
import Modal from '../../../components/shared/Modal';
import PageHeader from '../../../components/shared/PageHeader';
import SearchBar from '../../../components/shared/SearchBar';
import EmptyState from '../../../components/shared/EmptyState';
import ProjectArchiveList from './components/ProjectArchiveList';
import ArchiveFilters from './components/ArchiveFilters';
import ProjectArchiveDetail from './components/ProjectArchiveDetail';
import useHistoricalProjects from './hooks/useHistoricalProjects';
import styles from './HistoricalProjectsPage.module.css';

const HistoricalProjectsPage = () => {
  const navigate = useNavigate();
  const { setHeader, clearHeader } = useLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    client: '',
    projectType: '',
    discipline: '',
    year: '',
    tags: []
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const {
    projects,
    loading,
    error,
    stats
  } = useHistoricalProjects({ searchQuery, filters });

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📚 Proyectos Históricos"
      subtitle="Biblioteca estructurada de proyectos finalizados con documentación completa y métricas de cierre"
      backButton={{
        path: '/knowledge-hub',
        label: 'Knowledge Hub'
      }}
      actions={[
        {
          label: 'ℹ️ Información',
          variant: 'outline',
          size: 'small',
          onClick: () => setShowInfoModal(true)
        }
      ]}
    />
  ), []);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setFilters({
      client: '',
      projectType: '',
      discipline: '',
      year: '',
      tags: []
    });
    setSearchQuery('');
  };

  return (
    <div className={styles.container}>
      {/* Search and Filters */}
      <div className={styles.controlsSection}>
        <div className={styles.searchWrapper}>
          <SearchBar
            placeholder="Buscar proyectos por nombre, código, cliente o etiquetas..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <ArchiveFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Info */}
      {(searchQuery || Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true))) && (
        <div className={styles.resultsInfo}>
          <p className={styles.resultsText}>
            Mostrando <strong>{projects.length}</strong> proyectos
          </p>
          {(searchQuery || Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true))) && (
            <Button
              variant="text"
              onClick={handleClearFilters}
              className={styles.clearButton}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Cargando proyectos históricos...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>❌ {error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No se encontraron proyectos"
            description={
              searchQuery || Object.values(filters).some(f => f && (Array.isArray(f) ? f.length > 0 : true))
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no hay proyectos archivados en la biblioteca'
            }
          />
        ) : (
          <ProjectArchiveList
            projects={projects}
            onProjectClick={handleProjectClick}
          />
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectArchiveDetail
          project={selectedProject}
          onClose={handleCloseDetail}
        />
      )}

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="ℹ️ Información - Proyectos Históricos"
        size="medium"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🎯 Propósito</h3>
            <p className={styles.modalText}>
              Biblioteca inmutable de proyectos finalizados que preserva documentación completa, 
              LMD final, entregables aprobados, historial de Transmittals/RFIs y métricas de cierre. 
              Sistema indexado con etiquetas para reutilización en proyectos futuros.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>📊 Estadísticas del Archivo</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.totalProjects}</div>
                <div className={styles.statLabel}>Proyectos Archivados</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.totalDocuments}</div>
                <div className={styles.statLabel}>Documentos Disponibles</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.totalClients}</div>
                <div className={styles.statLabel}>Clientes</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.avgSuccess}%</div>
                <div className={styles.statLabel}>Tasa de Éxito</div>
              </div>
            </div>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>📋 Contenido del Archivo</h3>
            <ul className={styles.modalList}>
              <li><strong>LMD Final:</strong> Lista maestra de documentos con todos los entregables aprobados</li>
              <li><strong>Documentación:</strong> Conjunto completo de planos, cálculos, especificaciones y manuales</li>
              <li><strong>Historial:</strong> Transmittals, RFIs, revisiones y comunicaciones del proyecto</li>
              <li><strong>Métricas:</strong> KPIs de cierre, lecciones aprendidas y análisis de desempeño</li>
              <li><strong>Etiquetas:</strong> Sistema de indexación por cliente, tipo, disciplina y tecnología</li>
            </ul>
          </div>

          <div className={styles.modalActions}>
            <Button 
              variant="primary" 
              onClick={() => setShowInfoModal(false)}
            >
              Entendido
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HistoricalProjectsPage;

