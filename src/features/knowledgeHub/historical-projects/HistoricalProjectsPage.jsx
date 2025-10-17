/**
 * HistoricalProjectsPage - Library of completed projects with full documentation
 * Read-only portfolio view for archived projects
 * @module features/knowledgeHub/historical-projects/HistoricalProjectsPage
 */

import { useEffect, useMemo, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import Button from '../../../components/shared/Button';
import Modal from '../../../components/shared/Modal';
import PageHeader from '../../../components/shared/PageHeader';
import ProjectCard from '../../projects/portfolio/components/ProjectCard';
import ProjectListItem from '../../projects/portfolio/components/ProjectListItem';
import ProjectListHeader from '../../projects/portfolio/components/ProjectListHeader';
import ProjectFilters from '../../projects/portfolio/components/ProjectFilters';
import ViewToggle from '../../projects/portfolio/components/ViewToggle';
import useHistoricalProjects from './hooks/useHistoricalProjects';
import styles from './HistoricalProjectsPage.module.css';

const HistoricalProjectsPage = () => {
  const { projects, loading, error, filters, setFilters, stats } = useHistoricalProjects();
  const { clearProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Get view preference from localStorage, default to 'grid'
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem('historicalProjectsView');
    return savedView || 'grid';
  });

  // Save view preference to localStorage when it changes
  const handleViewChange = (newView) => {
    setView(newView);
    localStorage.setItem('historicalProjectsView', newView);
  };

  // Clear selected project when entering historical projects
  useEffect(() => {
    clearProject();
  }, [clearProject]);

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📚 Proyectos Históricos"
      subtitle={`${projects.length} proyecto${projects.length !== 1 ? 's' : ''} archivado${projects.length !== 1 ? 's' : ''} - Solo lectura`}
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
  ), [projects.length]);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando proyectos históricos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <ProjectFilters filters={filters} onFilterChange={setFilters} />
        <ViewToggle view={view} onViewChange={handleViewChange} />
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3>No se encontraron proyectos</h3>
          <p>Intenta ajustar los filtros o revisa los proyectos disponibles</p>
        </div>
      ) : (
        <>
          {view === 'list' && <ProjectListHeader />}
          <div className={view === 'grid' ? styles.grid : styles.list}>
            {projects.map((project) => (
              view === 'grid' ? (
                <ProjectCard key={project.id} project={project} isReadOnly />
              ) : (
                <ProjectListItem key={project.id} project={project} isReadOnly />
              )
            ))}
          </div>
        </>
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

