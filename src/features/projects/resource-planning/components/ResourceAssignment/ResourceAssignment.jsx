/**
 * ResourceAssignment - Manage resource assignments to documents
 * @module features/projects/resource-planning/components/ResourceAssignment
 */

import { useState } from 'react';
import Button from '../../../../../components/shared/Button';
import Modal from '../../../../../components/shared/Modal';
import Badge from '../../../../../components/shared/Badge';
import styles from './ResourceAssignment.module.css';

const ResourceAssignment = ({ assignments, availableMembers, onAssign, onUpdate, onRemove }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      assigned: { label: 'Asignado', variant: 'info' },
      in_progress: { label: 'En Progreso', variant: 'warning' },
      completed: { label: 'Completado', variant: 'success' },
    };
    
    const config = statusConfig[status] || statusConfig.assigned;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleRemove = async (assignmentId) => {
    if (!confirm('¿Está seguro que desea remover esta asignación?')) {
      return;
    }
    await onRemove(assignmentId);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>📋 Asignaciones del Proyecto</h3>
        <Button variant="primary" size="small" onClick={() => setShowAssignModal(true)}>
          + Asignar Recurso
        </Button>
      </div>

      {!assignments || assignments.length === 0 ? (
        <div className={styles.empty}>
          <p>📝 No hay asignaciones de recursos</p>
          <p className={styles.emptyHint}>Comience asignando recursos a los documentos del proyecto</p>
        </div>
      ) : (
        <div className={styles.list}>
          {assignments.map(assignment => (
            <div key={assignment.id} className={styles.assignmentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.member}>
                  <div className={styles.avatar}>
                    {assignment.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={styles.memberInfo}>
                    <div className={styles.memberName}>{assignment.userName}</div>
                    {getStatusBadge(assignment.status)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => handleRemove(assignment.id)}
                >
                  🗑️
                </Button>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.document}>
                  <span className={styles.documentCode}>{assignment.documentCode}</span>
                  <span className={styles.documentName}>{assignment.documentName}</span>
                </div>

                <div className={styles.timeline}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineLabel}>Inicio:</span>
                    <span className={styles.timelineValue}>{formatDate(assignment.startDate)}</span>
                  </div>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineLabel}>Entrega:</span>
                    <span className={styles.timelineValue}>{formatDate(assignment.dueDate)}</span>
                  </div>
                </div>

                <div className={styles.progress}>
                  <div className={styles.progressInfo}>
                    <span className={styles.progressLabel}>Progreso de Horas</span>
                    <span className={styles.progressValue}>
                      {assignment.actualHours}h / {assignment.estimatedHours}h
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: `${Math.min((assignment.actualHours / assignment.estimatedHours) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assign Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Asignar Recurso a Documento"
        size="medium"
      >
        <div className={styles.modalContent}>
          <p className={styles.modalInfo}>
            Esta funcionalidad permite asignar miembros del equipo a documentos específicos de la LMD.
            La asignación se sincronizará con el registro de horas en las planillas.
          </p>
          <p className={styles.modalHint}>
            💡 Esta funcionalidad estará completamente integrada con la LMD en la próxima versión.
          </p>
          <div className={styles.modalActions}>
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResourceAssignment;

