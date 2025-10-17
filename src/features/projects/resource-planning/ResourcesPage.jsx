/**
 * ResourcesPage - Main page for resource planning and management
 * @module features/projects/resource-planning/ResourcesPage
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import useResources from './hooks/useResources';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import Modal from '../../../components/shared/Modal';
import ResourceAssignment from './components/ResourceAssignment';
import styles from './ResourcesPage.module.css';

const ResourcesPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { 
    assignments, 
    availableMembers,
    loading, 
    error, 
    actions 
  } = useResources(projectId);
  
  const [activeTab, setActiveTab] = useState('assignments'); // 'assignments' | 'capacity'
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);

  // Mock current user - in production this would come from auth context
  const currentUserId = 'USR-002';
  const isManager = true; // Mock - would come from permissions

  // Memoize header content
  const headerContent = (
    <PageHeader
      title="👥 Planificación de Recursos"
      subtitle={selectedProject?.name}
      backButton={{
        path: `/projects/${projectId}/dashboard`,
        label: 'Dashboard'
      }}
      actions={[]}
    />
  );

  useEffect(() => {
    if (selectedProject) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [selectedProject, projectId, setHeader, clearHeader]);

  const handleAssign = async (assignmentData) => {
    const result = await actions.assign(assignmentData);
    if (!result.success) {
      alert(result.error || 'Error al asignar recurso');
    } else {
      setShowNewAssignmentModal(false);
    }
  };

  const handleUpdateAssignment = async (assignmentId, assignmentData) => {
    const result = await actions.updateAssignment(assignmentId, assignmentData);
    if (!result.success) {
      alert(result.error || 'Error al actualizar asignación');
    }
  };

  const handleRemoveAssignment = async (assignmentId) => {
    if (!confirm('¿Está seguro que desea eliminar esta asignación?')) {
      return;
    }
    const result = await actions.removeAssignment(assignmentId);
    if (!result.success) {
      alert(result.error || 'Error al eliminar asignación');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando recursos...</p>
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
      {/* Action Bar */}
      <div className={styles.actionBar}>
        <div>
          <h2>👥 Gestión de Recursos</h2>
          <p>Asigna y gestiona recursos del equipo en documentos del proyecto</p>
        </div>
        <div className={styles.actionButtons}>
          <Button
            variant="outline"
            onClick={() => setShowInfoModal(true)}
            size="medium"
            title="Información sobre gestión de recursos"
          >
            ℹ️ Información
          </Button>
          {isManager && (
            <Button
              variant="primary"
              onClick={() => setShowNewAssignmentModal(true)}
              size="large"
            >
              ➕ Asignar Recurso
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'assignments' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('assignments')}
        >
          👥 Asignaciones
          <span className={styles.tabBadge}>{assignments.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'capacity' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('capacity')}
        >
          📊 Capacidad del Equipo
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {activeTab === 'assignments' && (
          <div className={styles.assignmentsSection}>
            <ResourceAssignment
              assignments={assignments}
              availableMembers={availableMembers}
              onAssign={handleAssign}
              onUpdate={handleUpdateAssignment}
              onRemove={handleRemoveAssignment}
              currentUserId={currentUserId}
              isManager={isManager}
            />
          </div>
        )}

        {activeTab === 'capacity' && (
          <div className={styles.capacitySection}>
            <div className={styles.capacityInfo}>
              <h3>📊 Capacidad del Equipo</h3>
              <p>
                Visualización de la capacidad y disponibilidad del equipo para este proyecto.
                Las asignaciones se reflejan automáticamente en la capacidad total.
              </p>
            </div>
            {/* Aquí iría el componente de capacidad cuando esté listo */}
            <div className={styles.placeholder}>
              <p>🚧 Vista de capacidad en desarrollo</p>
            </div>
          </div>
        )}
      </div>

      {/* New Assignment Modal */}
      <Modal
        isOpen={showNewAssignmentModal}
        onClose={() => setShowNewAssignmentModal(false)}
        title="Asignar Recurso"
        size="medium"
      >
        <div className={styles.assignmentForm}>
          <p>Formulario de asignación de recursos en desarrollo...</p>
          <div className={styles.modalActions}>
            <Button
              variant="outline"
              onClick={() => setShowNewAssignmentModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowNewAssignmentModal(false)}
            >
              Asignar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="ℹ️ Información - Gestión de Recursos"
        size="large"
      >
        <div className={styles.infoModalContent}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🎯 Función</h3>
            <p className={styles.modalText}>
              Sistema de gestión de recursos que permite asignar miembros del equipo 
              a documentos específicos del proyecto, facilitando el seguimiento del trabajo 
              y la planificación de recursos.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>⚙️ Capacidades</h3>
            <ul className={styles.modalList}>
              <li><strong>Asignación de recursos:</strong> Vincular miembros del equipo con documentos específicos</li>
              <li><strong>Seguimiento de horas:</strong> Las planillas se vinculan automáticamente a las asignaciones</li>
              <li><strong>Gestión de disponibilidad:</strong> Visualizar la carga de trabajo del equipo</li>
              <li><strong>Control de capacidad:</strong> Monitorear la utilización de recursos</li>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>👥 Roles y Permisos</h3>
            <ul className={styles.modalList}>
              <li><strong>Usuarios regulares:</strong> Ver sus asignaciones y horas registradas</li>
              <li><strong>Managers:</strong> Crear, editar y eliminar asignaciones de recursos</li>
              <li><strong>Administradores:</strong> Gestión completa del equipo y capacidades</li>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>📋 Proceso de Asignación</h3>
            <div className={styles.workflowSteps}>
              <div className={styles.step}>
                <div className={styles.stepIcon}>1️⃣</div>
                <div className={styles.stepContent}>
                  <strong>Planificación:</strong> Manager asigna miembro del equipo a documento específico
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepIcon}>2️⃣</div>
                <div className={styles.stepContent}>
                  <strong>Estimación:</strong> Se definen las horas estimadas para la tarea
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepIcon}>3️⃣</div>
                <div className={styles.stepContent}>
                  <strong>Ejecución:</strong> Usuario registra horas trabajadas en planillas
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepIcon}>4️⃣</div>
                <div className={styles.stepContent}>
                  <strong>Seguimiento:</strong> Sistema vincula automáticamente horas reales vs estimadas
                </div>
              </div>
            </div>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>💡 Consejos de Uso</h3>
            <ul className={styles.modalList}>
              <li>Asigna recursos considerando su disponibilidad y especialización</li>
              <li>Estima horas realistas basándote en la complejidad del documento</li>
              <li>Revisa regularmente el progreso de las asignaciones</li>
              <li>Las horas registradas en planillas se vinculan automáticamente</li>
              <li>Usa la vista de capacidad para identificar sobrecargas</li>
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

export default ResourcesPage;