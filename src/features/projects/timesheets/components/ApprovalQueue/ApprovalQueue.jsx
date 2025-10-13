/**
 * ApprovalQueue - Display and manage pending timesheet approvals
 * @module features/projects/timesheets/components/ApprovalQueue
 */

import { useState } from 'react';
import Button from '../../../../../components/shared/Button';
import Modal from '../../../../../components/shared/Modal';
import styles from './ApprovalQueue.module.css';

const ApprovalQueue = ({ pendingTimesheets, onApprove, onReject }) => {
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!pendingTimesheets || pendingTimesheets.length === 0) {
    return (
      <div className={styles.empty}>
        <p>✅ No hay planillas pendientes de aprobación</p>
      </div>
    );
  }

  const handleApprove = async (timesheet) => {
    setLoading(true);
    await onApprove(timesheet.id);
    setLoading(false);
  };

  const handleRejectClick = (timesheet) => {
    setSelectedTimesheet(timesheet);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      alert('Debe proporcionar una razón para el rechazo');
      return;
    }

    setLoading(true);
    await onReject(selectedTimesheet.id, rejectReason);
    setLoading(false);
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedTimesheet(null);
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedTimesheet(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.queue}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          ⏳ Cola de Aprobación
          <span className={styles.badge}>{pendingTimesheets.length}</span>
        </h3>
      </div>

      <div className={styles.list}>
        {pendingTimesheets.map(timesheet => (
          <div key={timesheet.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  {timesheet.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className={styles.userName}>{timesheet.userName}</div>
                  <div className={styles.date}>📅 {formatDate(timesheet.date)}</div>
                </div>
              </div>
              <div className={styles.hours}>
                <span className={styles.hoursValue}>{timesheet.hours}</span>
                <span className={styles.hoursLabel}>horas</span>
              </div>
            </div>

            <div className={styles.itemBody}>
              <div className={styles.document}>
                <span className={styles.documentCode}>{timesheet.documentCode}</span>
                <span className={styles.documentName}>{timesheet.documentName}</span>
              </div>
              <div className={styles.description}>
                <strong>Descripción:</strong>
                <p>{timesheet.description}</p>
              </div>
            </div>

            <div className={styles.itemActions}>
              <Button
                variant="outline"
                size="small"
                onClick={() => handleRejectClick(timesheet)}
                disabled={loading}
              >
                ❌ Rechazar
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => handleApprove(timesheet)}
                disabled={loading}
                loading={loading}
              >
                ✅ Aprobar
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showRejectModal}
        onClose={handleRejectCancel}
        title="Rechazar Planilla"
        size="medium"
      >
        <div className={styles.rejectModal}>
          <p className={styles.rejectInfo}>
            ¿Está seguro que desea rechazar esta planilla de <strong>{selectedTimesheet?.userName}</strong>?
          </p>
          
          <div className={styles.formGroup}>
            <label htmlFor="rejectReason" className={styles.label}>
              Razón del rechazo <span className={styles.required}>*</span>
            </label>
            <textarea
              id="rejectReason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className={styles.textarea}
              rows="4"
              placeholder="Explique por qué rechaza esta planilla..."
              disabled={loading}
            />
          </div>

          <div className={styles.modalActions}>
            <Button
              variant="outline"
              onClick={handleRejectCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleRejectConfirm}
              disabled={loading}
              loading={loading}
            >
              Rechazar Planilla
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApprovalQueue;

