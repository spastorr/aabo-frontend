/**
 * PortfolioPage - Main entry point for project management
 * Displays all projects in a grid with filtering capabilities
 * @module features/projects/portfolio/PortfolioPage
 */

import { useEffect, useMemo, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import CreateProjectModal from './components/CreateProjectModal';
import usePortfolio from './hooks/usePortfolio';
import styles from './PortfolioPage.module.css';

const PortfolioPage = () => {
  const { projects, loading, error, filters, setFilters, createNewProject } = usePortfolio();
  const { clearProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Clear selected project when entering portfolio
  useEffect(() => {
    clearProject();
  }, [clearProject]);

  // Handle create project
  const handleCreateProject = async (projectData) => {
    await createNewProject(projectData);
  };

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="Portafolio de Proyectos"
      subtitle={`${projects.length} proyecto${projects.length !== 1 ? 's' : ''} encontrado${projects.length !== 1 ? 's' : ''}`}
      actions={[
        {
          label: '+ Nuevo Proyecto',
          variant: 'primary',
          onClick: () => setIsModalOpen(true)
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
          <p>Cargando proyectos...</p>
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
      <ProjectFilters filters={filters} onFilterChange={setFilters} />

      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📁</div>
          <h3>No se encontraron proyectos</h3>
          <p>Intenta ajustar los filtros o crea un nuevo proyecto</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default PortfolioPage;

