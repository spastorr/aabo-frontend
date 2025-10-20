/**
 * RFIList Component
 * Displays RFIs in a card layout similar to transmittals
 * @module features/projects/rfi/components/RFIList
 */

import { useState, useEffect } from 'react';
import Badge from '../../../../../components/shared/Badge';
import { RFI_STATUS } from '../../../../../constants/statuses';
import { getTransmittalById } from '../../../../../services/mocks/transmittalMocks';
import styles from './RFIList.module.css';

const RFI_STATUS_CONFIG = {
  [RFI_STATUS.OPEN]: { label: 'Abierta', variant: 'info' },
  [RFI_STATUS.PENDING_RESPONSE]: { label: 'Pendiente', variant: 'warning' },
  [RFI_STATUS.ANSWERED]: { label: 'Respondida', variant: 'success' },
  [RFI_STATUS.CLOSED]: { label: 'Cerrada', variant: 'neutral' },
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

  const getStatusBadge = (status) => {
    const config = RFI_STATUS_CONFIG[status] || { label: status, variant: 'neutral' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getAlertBadge = (alertStatus, daysOverdue) => {
    if (alertStatus === 'OVERDUE') {
      return <Badge variant="error">🚨 {daysOverdue}d vencido</Badge>;
    } else if (alertStatus === 'APPROACHING_DUE') {
      return <Badge variant="warning">⚠️ Próximo</Badge>;
    } else if (alertStatus === 'RESPONDED') {
      return <Badge variant="success">✅ Respondido</Badge>;
    }
    return null;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH': return '🔴';
      case 'MEDIUM': return '🟡';
      case 'LOW': return '🟢';
      default: return '⚪';
    }
  };

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
    <div className={styles.container}>
      {rfis.map((rfi) => (
        <div 
          key={rfi.id} 
          className={styles.card}
          onClick={() => onRFIClick(rfi)}
        >
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div className={styles.codeSection}>
              <span className={styles.code}>{rfi.code}</span>
              {rfi.transmittalId && transmittals[rfi.transmittalId] && (
                <Badge variant="info" className={styles.transmittalBadge}>
                  📦 En Transmittal
                </Badge>
              )}
            </div>
            <div className={styles.statusSection}>
              {getStatusBadge(rfi.status)}
              {getAlertBadge(rfi.alertStatus, rfi.daysOverdue)}
            </div>
          </div>

           {/* Card Content - Horizontal Layout with Inline Action */}
           <div className={styles.cardContent}>
             <div className={styles.subjectSection}>
               <h3 className={styles.subject}>{rfi.subject}</h3>
               <div className={styles.priority}>
                 {getPriorityIcon(rfi.priority)} {rfi.priority}
               </div>
             </div>

             <div className={styles.detailsSection}>
               <div className={styles.detailItem}>
                 <span className={styles.detailLabel}>Creado por</span>
                 <span className={styles.detailValue}>{rfi.createdBy}</span>
               </div>
               <div className={styles.detailItem}>
                 <span className={styles.detailLabel}>Fecha</span>
                 <span className={styles.detailValue}>{formatDate(rfi.createdDate)}</span>
               </div>
               <div className={styles.detailItem}>
                 <span className={styles.detailLabel}>Para</span>
                 <span className={styles.detailValue}>{rfi.recipient || 'Cliente'}</span>
               </div>
               {rfi.estimatedResponseDate && (
                 <div className={styles.detailItem}>
                   <span className={styles.detailLabel}>Respuesta</span>
                   <span className={styles.detailValue}>{formatDate(rfi.estimatedResponseDate)}</span>
                 </div>
               )}
               
               {/* Transmittal Info - Inline */}
               {rfi.transmittalId && transmittals[rfi.transmittalId] && (
                 <div className={styles.transmittalInfo}>
                   <span className={styles.transmittalLabel}>📦</span>
                   <span className={styles.transmittalCode}>
                     {transmittals[rfi.transmittalId].code}
                   </span>
                 </div>
               )}

               {/* Documents Count - Inline */}
               {rfi.linkedDocuments?.length > 0 && (
                 <div className={styles.documentsInfo}>
                   <span className={styles.documentsCount}>
                     📄 {rfi.linkedDocuments.length}
                   </span>
                 </div>
               )}

               {/* Inline Action Button */}
               <div className={styles.detailItem}>
                 <button
                   className={styles.actionButton}
                   onClick={(e) => {
                     e.stopPropagation();
                     onRFIClick(rfi);
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