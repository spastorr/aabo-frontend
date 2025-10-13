/**
 * TransmittalDetailModal - Detailed view of a transmittal
 * Consolidates information as a legal record
 * @module features/projects/transmittals/components/TransmittalDetailModal
 */

import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './TransmittalDetailModal.module.css';

const TransmittalDetailModal = ({ transmittal, isOpen, onClose }) => {
  if (!transmittal) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      DRAFT: { variant: 'neutral', label: 'Borrador' },
      SENT: { variant: 'info', label: 'Enviado' },
      RECEIVED: { variant: 'info', label: 'Recibido' },
      PENDING_RESPONSE: { variant: 'warning', label: 'Pendiente Respuesta' },
      RESPONDED: { variant: 'success', label: 'Respondido' },
      CLOSED: { variant: 'neutral', label: 'Cerrado' }
    };

    const config = statusConfig[status] || { variant: 'neutral', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      LOW: { variant: 'neutral', label: 'Baja' },
      NORMAL: { variant: 'info', label: 'Normal' },
      HIGH: { variant: 'warning', label: 'Alta' },
      URGENT: { variant: 'error', label: 'Urgente' }
    };

    const config = priorityConfig[priority] || { variant: 'neutral', label: priority };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const isOutgoing = transmittal.type === 'OUTGOING';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del Transmittal"
      size="large"
    >
      <div className={styles.container}>
        {/* Header Information */}
        <div className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.codeSection}>
              <span className={styles.label}>Código</span>
              <span className={styles.code}>{transmittal.code}</span>
            </div>
            <div className={styles.statusSection}>
              {getStatusBadge(transmittal.status)}
              {transmittal.priority && getPriorityBadge(transmittal.priority)}
              <Badge variant={isOutgoing ? 'info' : 'success'}>
                {isOutgoing ? '📤 Salida' : '📥 Entrada'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Información General</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>
                {isOutgoing ? 'Destinatario' : 'Remitente'}
              </span>
              <span className={styles.infoValue}>
                {isOutgoing ? transmittal.recipient : (transmittal.sender || 'N/A')}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Fecha</span>
              <span className={styles.infoValue}>
                {formatDate(transmittal.date)}
              </span>
            </div>

            {transmittal.dueDate && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Fecha de Respuesta Esperada</span>
                <span className={styles.infoValue}>
                  {formatDate(transmittal.dueDate)}
                </span>
              </div>
            )}

            {transmittal.responseDate && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Fecha de Respuesta</span>
                <span className={styles.infoValue}>
                  {formatDate(transmittal.responseDate)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subject and Description */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Asunto</h3>
          <p className={styles.subject}>{transmittal.subject}</p>

          {transmittal.description && (
            <>
              <h3 className={styles.sectionTitle}>Descripción / Comentarios</h3>
              <p className={styles.description}>{transmittal.description}</p>
            </>
          )}
        </div>

        {/* Attached Documents */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Documentos Adjuntos ({transmittal.documentCount || 0})
          </h3>

          {transmittal.documents && transmittal.documents.length > 0 ? (
            <div className={styles.documentList}>
              {transmittal.documents.map((doc, index) => (
                <div key={index} className={styles.documentItem}>
                  <div className={styles.docIcon}>📄</div>
                  <div className={styles.docInfo}>
                    <div className={styles.docCode}>{doc.code}</div>
                    <div className={styles.docName}>{doc.name}</div>
                    <div className={styles.docMeta}>
                      <Badge variant="neutral">Rev. {doc.revision}</Badge>
                      <span className={styles.docDiscipline}>{doc.discipline}</span>
                    </div>
                  </div>
                  <button className={styles.downloadButton} title="Descargar">
                    ⬇️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyDocuments}>
              <p>No hay documentos adjuntos</p>
            </div>
          )}
        </div>

        {/* Response Information (if applicable) */}
        {transmittal.response && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Respuesta</h3>
            <div className={styles.responseBox}>
              <p className={styles.responseText}>{transmittal.response}</p>
              {transmittal.responseBy && (
                <div className={styles.responseMeta}>
                  <span>Por: {transmittal.responseBy}</span>
                  {transmittal.responseDate && (
                    <span> · {formatDate(transmittal.responseDate)}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Audit Trail */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Registro de Actividad</h3>
          <div className={styles.timeline}>
            {transmittal.history && transmittal.history.length > 0 ? (
              transmittal.history.map((event, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineEvent}>{event.action}</div>
                    <div className={styles.timelineMeta}>
                      {event.user} · {formatDate(event.date, true)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineEvent}>Transmittal creado</div>
                  <div className={styles.timelineMeta}>
                    {formatDate(transmittal.date, true)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {transmittal.status === 'PENDING_RESPONSE' && !isOutgoing && (
            <Button variant="primary">
              Responder
            </Button>
          )}
          <Button variant="outline">
            📄 Exportar PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TransmittalDetailModal;

