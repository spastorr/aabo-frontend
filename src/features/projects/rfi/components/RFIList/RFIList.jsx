/**
 * RFIList Component
 * Displays a table of RFIs with status indicators
 * @module features/projects/rfi/components/RFIList
 */

import { useState, useEffect } from 'react';
import Badge from '../../../../../components/shared/Badge';
import { RFI_STATUS } from '../../../../../constants/statuses';
import { getTransmittalById } from '../../../../../services/mocks/transmittalMocks';
import styles from './RFIList.module.css';

const RFI_STATUS_CONFIG = {
  [RFI_STATUS.OPEN]: { label: 'Abierta', variant: 'info' },
  [RFI_STATUS.PENDING_RESPONSE]: { label: 'Pendiente Respuesta', variant: 'warning' },
  [RFI_STATUS.ANSWERED]: { label: 'Respondida', variant: 'success' },
  [RFI_STATUS.CLOSED]: { label: 'Cerrada', variant: 'default' },
};

const RFIList = ({ rfis, onRFIClick }) => {
  const [transmittals, setTransmittals] = useState({});

  // Load transmittals for RFIs that have them
  useEffect(() => {
    const loadTransmittals = async () => {
      const transmittalIds = rfis
        .filter(rfi => rfi.transmittalId)
        .map(rfi => rfi.transmittalId)
        .filter((id, index, arr) => arr.indexOf(id) === index); // Remove duplicates

      const transmittalPromises = transmittalIds.map(async (id) => {
        try {
          const response = await getTransmittalById(id);
          return response.success ? { id, data: response.data } : null;
        } catch (error) {
          console.error(`Error loading transmittal ${id}:`, error);
          return null;
        }
      });

      const results = await Promise.all(transmittalPromises);
      const transmittalMap = {};
      results.forEach(result => {
        if (result) {
          transmittalMap[result.id] = result.data;
        }
      });

      setTransmittals(transmittalMap);
    };

    if (rfis && rfis.length > 0) {
      loadTransmittals();
    }
  }, [rfis]);

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
            <th>Transmittal</th>
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
                {rfi.transmittalId && transmittals[rfi.transmittalId] ? (
                  <div className={styles.transmittalCell}>
                    <span className={styles.transmittalCode}>
                      {transmittals[rfi.transmittalId].code}
                    </span>
                    <span className={styles.transmittalDate}>
                      {formatDate(transmittals[rfi.transmittalId].date)}
                    </span>
                  </div>
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

