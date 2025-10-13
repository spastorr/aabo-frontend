/**
 * RFIList Component
 * Displays a table of RFIs with status indicators
 * @module features/projects/rfi/components/RFIList
 */

import Badge from '../../../../../components/shared/Badge';
import { RFI_STATUS } from '../../../../../constants/statuses';
import styles from './RFIList.module.css';

const RFI_STATUS_CONFIG = {
  [RFI_STATUS.OPEN]: { label: 'Abierta', variant: 'info' },
  [RFI_STATUS.PENDING_RESPONSE]: { label: 'Pendiente Respuesta', variant: 'warning' },
  [RFI_STATUS.ANSWERED]: { label: 'Respondida', variant: 'success' },
  [RFI_STATUS.CLOSED]: { label: 'Cerrada', variant: 'default' },
};

const RFIList = ({ rfis, onRFIClick }) => {
  if (!rfis || rfis.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3>No hay RFIs registradas</h3>
        <p>Crea tu primera solicitud de información usando el botón "+ Crear RFI"</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Asunto</th>
            <th>Estado</th>
            <th>Creado Por</th>
            <th>Fecha Creación</th>
            <th>Fecha Respuesta</th>
            <th>Documentos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rfis.map((rfi) => (
            <tr key={rfi.id} onClick={() => onRFIClick(rfi)} className={styles.tableRow}>
              <td className={styles.codeCell}>
                <span className={styles.code}>{rfi.code}</span>
              </td>
              <td className={styles.subjectCell}>
                <span className={styles.subject}>{rfi.subject}</span>
                {rfi.priority === 'HIGH' && (
                  <span className={styles.priorityBadge}>🔴 Alta</span>
                )}
              </td>
              <td>
                <Badge 
                  variant={RFI_STATUS_CONFIG[rfi.status]?.variant || 'default'}
                >
                  {RFI_STATUS_CONFIG[rfi.status]?.label || rfi.status}
                </Badge>
              </td>
              <td>{rfi.createdBy}</td>
              <td>{formatDate(rfi.createdDate)}</td>
              <td>
                {rfi.responseDate ? (
                  formatDate(rfi.responseDate)
                ) : (
                  <span className={styles.noData}>—</span>
                )}
              </td>
              <td>
                {rfi.linkedDocuments?.length > 0 ? (
                  <span className={styles.documentCount}>
                    📄 {rfi.linkedDocuments.length}
                  </span>
                ) : (
                  <span className={styles.noData}>—</span>
                )}
              </td>
              <td>
                <button
                  className={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRFIClick(rfi);
                  }}
                  title="Ver detalles"
                >
                  👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default RFIList;

