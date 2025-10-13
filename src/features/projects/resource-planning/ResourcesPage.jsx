/**
 * ResourcesPage - Main page for resource planning and management
 * @module features/projects/resource-planning/ResourcesPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import useResources from './hooks/useResources';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import CapacityView from './components/CapacityView';
import WorkloadChart from './components/WorkloadChart';
import ResourceAssignment from './components/ResourceAssignment';
import styles from './ResourcesPage.module.css';

const ResourcesPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { 
    teamWorkload, 
    assignments, 
    capacityData, 
    availableMembers,
    loading, 
    error, 
    actions 
  } = useResources(projectId);
  
  const [activeView, setActiveView] = useState('workload'); // 'workload' | 'capacity' | 'assignments'

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!selectedProject) return null;
    
    return (
      <PageHeader
        title="👥 Planificación de Recursos"
        subtitle={selectedProject.name}
        backButton={{
          path: `/projects/${projectId}/dashboard`,
          label: 'Dashboard'
        }}
        actions={[
          {
            label: '🔄 Actualizar',
            variant: 'outline',
            onClick: () => actions.refresh()
          }
        ]}
      />
    );
  }, [selectedProject, projectId, actions]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const handleAssign = async (assignmentData) => {
    const result = await actions.assign(assignmentData);
    if (!result.success) {
      alert(result.error || 'Error al asignar recurso');
    }
  };

  const handleUpdateAssignment = async (assignmentId, assignmentData) => {
    const result = await actions.updateAssignment(assignmentId, assignmentData);
    if (!result.success) {
      alert(result.error || 'Error al actualizar asignación');
    }
  };

  const handleRemoveAssignment = async (assignmentId) => {
    const result = await actions.removeAssignment(assignmentId);
    if (!result.success) {
      alert(result.error || 'Error al remover asignación');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando información de recursos...</p>
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
      {/* View Selector */}
      <div className={styles.viewSelector}>
        <button
          className={`${styles.viewButton} ${activeView === 'workload' ? styles.viewButtonActive : ''}`}
          onClick={() => setActiveView('workload')}
        >
          📊 Carga de Trabajo
        </button>
        <button
          className={`${styles.viewButton} ${activeView === 'capacity' ? styles.viewButtonActive : ''}`}
          onClick={() => setActiveView('capacity')}
        >
          ⚡ Capacidad del Equipo
        </button>
        <button
          className={`${styles.viewButton} ${activeView === 'assignments' ? styles.viewButtonActive : ''}`}
          onClick={() => setActiveView('assignments')}
        >
          📋 Asignaciones
          {assignments.length > 0 && (
            <span className={styles.badge}>{assignments.length}</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeView === 'workload' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Carga de Trabajo por Miembro</h2>
              <p className={styles.sectionDescription}>
                Visualización de la asignación de horas y utilización de cada miembro del equipo. 
                Use esta información para identificar recursos sobrecargados o subutilizados.
              </p>
            </div>
            <WorkloadChart teamWorkload={teamWorkload} />
          </div>
        )}

        {activeView === 'capacity' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Capacidad Global del Equipo</h2>
              <p className={styles.sectionDescription}>
                Análisis general de la capacidad del equipo de ingeniería, incluyendo utilización 
                promedio, horas disponibles y distribución por disciplina.
              </p>
            </div>
            <CapacityView capacityData={capacityData} />
          </div>
        )}

        {activeView === 'assignments' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Asignaciones de Recursos</h2>
              <p className={styles.sectionDescription}>
                Gestione la asignación de miembros del equipo a documentos específicos de la LMD. 
                Las horas registradas en las planillas se vincularán automáticamente a estas asignaciones.
              </p>
            </div>
            <ResourceAssignment
              assignments={assignments}
              availableMembers={availableMembers}
              onAssign={handleAssign}
              onUpdate={handleUpdateAssignment}
              onRemove={handleRemoveAssignment}
            />
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className={styles.helpSection}>
        <div className={styles.helpCard}>
          <div className={styles.helpIcon}>💡</div>
          <div className={styles.helpContent}>
            <h4 className={styles.helpTitle}>Gestión Proactiva de Recursos</h4>
            <p className={styles.helpText}>
              Esta herramienta le permite optimizar la asignación de recursos en tiempo real. 
              Identifique cuellos de botella, redistribuya la carga de trabajo y asegúrese de que 
              todos los miembros del equipo estén trabajando a niveles óptimos de productividad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

