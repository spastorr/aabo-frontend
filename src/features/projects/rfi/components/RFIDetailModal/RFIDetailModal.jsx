/**
 * RFIDetailModal Component
 * Displays full RFI details and allows response management
 * @module features/projects/rfi/components/RFIDetailModal
 */

import { useState } from 'react';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import RFIStatusTracker from '../RFIStatusTracker';
import { RFI_STATUS } from '../../../../../constants/statuses';
import styles from './RFIDetailModal.module.css';

const RFI_STATUS_CONFIG = {
  [RFI_STATUS.OPEN]: { label: 'Abierta', variant: 'info' },
  [RFI_STATUS.PENDING_RESPONSE]: { label: 'Pendiente Respuesta', variant: 'warning' },
  [RFI_STATUS.ANSWERED]: { label: 'Respondida', variant: 'success' },
  [RFI_STATUS.CLOSED]: { label: 'Cerrada', variant: 'default' },
};

const PRIORITY_CONFIG = {
  LOW: { label: 'Baja', color: '#10b981' },
  MEDIUM: { label: 'Media', color: '#f59e0b' },
  HIGH: { label: 'Alta', color: '#ef4444' },
};

const RFIDetailModal = ({ rfi, isOpen, onClose, onUpdate }) => {
  const [isResponding, setIsResponding] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!rfi) return null;

  const handleSendResponse = async () => {
    if (!responseText.trim()) {
      alert('Por favor ingresa una respuesta');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(rfi.id, {
        response: responseText,
        responseDate: new Date().toISOString().split('T')[0],
        status: RFI_STATUS.ANSWERED,
      });
      setResponseText('');
      setIsResponding(false);
    } catch (error) {
      console.error('Error sending response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseRFI = async () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar esta RFI?')) {
      await onUpdate(rfi.id, { status: RFI_STATUS.CLOSED });
    }
  };

  const handleReopenRFI = async () => {
    if (window.confirm('¿Deseas reabrir esta RFI?')) {
      await onUpdate(rfi.id, { status: RFI_STATUS.OPEN });
    }
  };

  const priority = rfi.priority || 'MEDIUM';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`RFI: ${rfi.code}`}
      size="large"
    >
      <div className={styles.content}>
        {/* Header Info */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.statusBadge}>
              <Badge variant={RFI_STATUS_CONFIG[rfi.status]?.variant || 'default'}>
                {RFI_STATUS_CONFIG[rfi.status]?.label || rfi.status}
              </Badge>
            </div>
            <div className={styles.priority} style={{ color: PRIORITY_CONFIG[priority].color }}>
              🔔 Prioridad: {PRIORITY_CONFIG[priority].label}
            </div>
          </div>
          <div className={styles.actions}>
            {rfi.status === RFI_STATUS.CLOSED ? (
              <Button variant="outline" size="small" onClick={handleReopenRFI}>
                Reabrir
              </Button>
            ) : (
              <>
                {!isResponding && rfi.status !== RFI_STATUS.ANSWERED && (
                  <Button variant="primary" size="small" onClick={() => setIsResponding(true)}>
                    Responder
                  </Button>
                )}
                {rfi.status === RFI_STATUS.ANSWERED && (
                  <Button variant="outline" size="small" onClick={handleCloseRFI}>
                    Cerrar RFI
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Status Tracker */}
        <RFIStatusTracker currentStatus={rfi.status} />

        {/* Subject */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Asunto</h3>
          <p className={styles.subject}>{rfi.subject}</p>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Creado por:</span>
            <span className={styles.detailValue}>{rfi.createdBy}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Fecha de creación:</span>
            <span className={styles.detailValue}>{formatDate(rfi.createdDate)}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Destinatario:</span>
            <span className={styles.detailValue}>{rfi.recipient || 'Cliente'}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Fecha límite:</span>
            <span className={styles.detailValue}>
              {rfi.dueDate ? formatDate(rfi.dueDate) : 'No especificada'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Descripción / Pregunta</h3>
          <div className={styles.description}>
            {rfi.description}
          </div>
        </div>

        {/* Linked Documents */}
        {rfi.linkedDocuments && rfi.linkedDocuments.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Documentos Relacionados</h3>
            <div className={styles.linkedDocuments}>
              {rfi.linkedDocuments.map((doc, index) => (
                <div key={index} className={styles.linkedDocument}>
                  <span>📄 {doc}</span>
                  <button className={styles.viewButton}>Ver</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Response Section */}
        {rfi.response && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Respuesta</h3>
            <div className={styles.responseInfo}>
              <span className={styles.detailLabel}>
                Fecha de respuesta: {formatDate(rfi.responseDate)}
              </span>
            </div>
            <div className={styles.response}>
              {rfi.response}
            </div>
          </div>
        )}

        {/* Response Form */}
        {isResponding && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Enviar Respuesta</h3>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className={styles.responseTextarea}
              rows="6"
              placeholder="Escribe tu respuesta detallada aquí..."
            />
            <div className={styles.responseActions}>
              <Button variant="outline" onClick={() => setIsResponding(false)}>
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSendResponse}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Respuesta'}
              </Button>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Comentarios Internos</h3>
          <div className={styles.comments}>
            <p className={styles.noComments}>No hay comentarios aún</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default RFIDetailModal;

