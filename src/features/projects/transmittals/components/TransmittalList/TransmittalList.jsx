/**
 * TransmittalList - Card view of transmittals
 * @module features/projects/transmittals/components/TransmittalList
 */

import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './TransmittalList.module.css';

const TransmittalList = ({ transmittals, onTransmittalClick, type }) => {
  const isOutgoing = type === 'OUTGOING';
  const isAll = type === 'ALL';

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

  return (
    <div className={styles.container}>
      {transmittals.map((transmittal) => (
        <div
          key={transmittal.id}
          className={styles.card}
          onClick={() => onTransmittalClick(transmittal)}
        >
          {/* Header with Code and Type */}
          <div className={styles.cardHeader}>
            <div className={styles.codeSection}>
              <span className={styles.code}>{transmittal.code}</span>
              {isAll && (
                <Badge variant={transmittal.type === 'OUTGOING' ? 'info' : 'success'}>
                  {transmittal.type === 'OUTGOING' ? '📤' : '📥'}
                </Badge>
              )}
              {transmittal.relatedRFIs && transmittal.relatedRFIs.length > 0 && (
                <Badge variant="warning" className={styles.rfiBadge}>
                  📋 {transmittal.relatedRFIs.length}
                </Badge>
              )}
            </div>
            <div className={styles.statusSection}>
              {getStatusBadge(transmittal.status)}
            </div>
          </div>

          {/* Content - Horizontal Layout with Inline Action */}
          <div className={styles.cardContent}>
            <div className={styles.subjectSection}>
              <h3 className={styles.subject}>{transmittal.subject}</h3>
            </div>
            
            <div className={styles.detailsSection}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  {isAll 
                    ? (transmittal.type === 'OUTGOING' ? 'Para' : 'De')
                    : (isOutgoing ? 'Para' : 'De')
                  }
                </span>
                <span className={styles.detailValue}>
                  {isAll 
                    ? (transmittal.type === 'OUTGOING' ? transmittal.recipient : transmittal.sender || 'N/A')
                    : (isOutgoing ? transmittal.recipient : transmittal.sender || 'N/A')
                  }
                </span>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Fecha</span>
                <span className={styles.detailValue}>
                  {formatDate(transmittal.date)}
                </span>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Docs</span>
                <span className={styles.docCount}>
                  {transmittal.documentCount || 0}
                </span>
              </div>
              
              {/* Inline Action Button */}
              <div className={styles.detailItem}>
                <button
                  className={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTransmittalClick(transmittal);
                  }}
                  title="Ver detalles"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransmittalList;

