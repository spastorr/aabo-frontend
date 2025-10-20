/**
 * CloseProjectModal component
 * Modal for closing/finalizing a project
 * @module features/projects/dashboard/components/CloseProjectModal
 */

import { useState } from 'react';
import Modal from '@components/shared/Modal';
import Button from '@components/shared/Button';
import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '@constants';
import styles from './CloseProjectModal.module.css';

const CloseProjectModal = ({ 
  isOpen, 
  onClose, 
  project, 
  onConfirmClose,
  loading = false 
}) => {
  const [closeReason, setCloseReason] = useState('');
  const [finalNotes, setFinalNotes] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (confirmText !== 'CERRAR PROYECTO') {
      alert('Debe escribir exactamente "CERRAR PROYECTO" para confirmar');
      return;
    }

    onConfirmClose({
      reason: closeReason,
      notes: finalNotes,
      closedAt: new Date().toISOString()
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setCloseReason('');
    setFinalNotes('');
    setConfirmText('');
    onClose();
  };

  if (!project) return null;

  const isProjectActive = project.status === PROJECT_STATUS.ACTIVE;
  const canClose = isProjectActive && !loading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Cerrar/Finalizar Proyecto"
      size="medium"
    >
      <div className={styles.container}>
        <div className={styles.warning}>
          <div className={styles.warningIcon}>⚠️</div>
          <div className={styles.warningContent}>
            <h3>¿Está seguro de cerrar este proyecto?</h3>
            <p>
              Esta acción cambiará el estado del proyecto de <strong>Activo</strong> a <strong>Completado</strong>.
              Una vez cerrado, no se podrán realizar más modificaciones al proyecto.
            </p>
          </div>
        </div>

        <div className={styles.projectInfo}>
          <h4>Información del Proyecto</h4>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Código:</span>
              <span className={styles.value}>{project.code}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{project.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Cliente:</span>
              <span className={styles.value}>{project.client}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Estado Actual:</span>
              <span className={`${styles.value} ${styles.status} ${styles[project.status.toLowerCase()]}`}>
                {PROJECT_STATUS_LABELS[project.status]}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Progreso:</span>
              <span className={styles.value}>{project.progress || 0}%</span>
            </div>
          </div>
        </div>

        {!canClose && (
          <div className={styles.error}>
            <p>❌ Este proyecto no puede ser cerrado porque no está en estado Activo.</p>
          </div>
        )}

        {canClose && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="closeReason" className={styles.label}>
                Motivo del cierre *
              </label>
              <select
                id="closeReason"
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Seleccione un motivo</option>
                <option value="completed">Proyecto completado exitosamente</option>
                <option value="delivered">Entregado al cliente</option>
                <option value="contract_end">Fin del contrato</option>
                <option value="budget_exhausted">Presupuesto agotado</option>
                <option value="client_request">Solicitud del cliente</option>
                <option value="other">Otro motivo</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="finalNotes" className={styles.label}>
                Notas finales
              </label>
              <textarea
                id="finalNotes"
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
                className={styles.textarea}
                placeholder="Agregue cualquier información adicional sobre el cierre del proyecto..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmText" className={styles.label}>
                Confirmación *
              </label>
              <input
                type="text"
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className={styles.input}
                placeholder="Escriba: CERRAR PROYECTO"
                required
              />
              <small className={styles.helpText}>
                Debe escribir exactamente "CERRAR PROYECTO" para confirmar
              </small>
            </div>

            <div className={styles.actions}>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="danger"
                disabled={loading || !closeReason || confirmText !== 'CERRAR PROYECTO'}
              >
                {loading ? '⏳ Cerrando...' : '🔒 Cerrar Proyecto'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default CloseProjectModal;
