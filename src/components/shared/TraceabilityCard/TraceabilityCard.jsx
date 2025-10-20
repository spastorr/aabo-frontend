/**
 * TraceabilityCard - Component to show traceability between Transmittals and RFI
 * @module components/shared/TraceabilityCard
 */

import { useState, useEffect } from 'react';
import Badge from '../Badge';
import { formatDate } from '../../../utils';
import { getRFIsByTransmittal, getTransmittalsByRFI } from '../../../services/mocks/transmittalMocks';
import styles from './TraceabilityCard.module.css';

const TraceabilityCard = ({ 
  type, // 'transmittal' or 'rfi'
  itemId, 
  itemData,
  onItemClick 
}) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId) {
      loadRelatedItems();
    }
  }, [itemId, type]);

  const loadRelatedItems = async () => {
    setLoading(true);
    try {
      let response;
      if (type === 'transmittal') {
        response = await getRFIsByTransmittal(itemId);
      } else {
        response = await getTransmittalsByRFI(itemId);
      }
      
      if (response.success) {
        setRelatedItems(response.data);
      }
    } catch (error) {
      console.error('Error loading related items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status, itemType) => {
    if (itemType === 'rfi') {
      const statusConfig = {
        OPEN: { variant: 'info', label: 'Abierta' },
        PENDING_RESPONSE: { variant: 'warning', label: 'Pendiente' },
        ANSWERED: { variant: 'success', label: 'Respondida' },
        CLOSED: { variant: 'neutral', label: 'Cerrada' },
      };
      const config = statusConfig[status] || { variant: 'neutral', label: status };
      return <Badge variant={config.variant}>{config.label}</Badge>;
    } else {
      const statusConfig = {
        DRAFT: { variant: 'neutral', label: 'Borrador' },
        SENT: { variant: 'info', label: 'Enviado' },
        RECEIVED: { variant: 'info', label: 'Recibido' },
        PENDING_RESPONSE: { variant: 'warning', label: 'Pendiente' },
        RESPONDED: { variant: 'success', label: 'Respondido' },
        CLOSED: { variant: 'neutral', label: 'Cerrado' },
      };
      const config = statusConfig[status] || { variant: 'neutral', label: status };
      return <Badge variant={config.variant}>{config.label}</Badge>;
    }
  };

  const getItemIcon = (itemType) => {
    return itemType === 'rfi' ? '📋' : '📦';
  };

  const getItemTypeLabel = (itemType) => {
    return itemType === 'rfi' ? 'RFI' : 'Transmittal';
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando trazabilidad...</div>
      </div>
    );
  }

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          🔗 Trazabilidad - {type === 'transmittal' ? 'RFIs Relacionados' : 'Transmittals Relacionados'}
        </h3>
        <span className={styles.count}>({relatedItems.length})</span>
      </div>
      
      <div className={styles.itemsList}>
        {relatedItems.map((item) => (
          <div 
            key={item.id} 
            className={styles.itemCard}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <div className={styles.itemHeader}>
              <div className={styles.itemCode}>
                {getItemIcon(type === 'transmittal' ? 'rfi' : 'transmittal')} 
                {item.code || item.id}
              </div>
              {getStatusBadge(item.status, type === 'transmittal' ? 'rfi' : 'transmittal')}
            </div>
            
            <div className={styles.itemContent}>
              <div className={styles.itemSubject}>
                {item.subject || item.description?.substring(0, 100) + '...'}
              </div>
              
              <div className={styles.itemMeta}>
                <span className={styles.itemDate}>
                  {formatDate(item.createdDate || item.date)}
                </span>
                {item.responseDate && (
                  <span className={styles.responseDate}>
                    · Respondido: {formatDate(item.responseDate)}
                  </span>
                )}
              </div>
              
              {type === 'transmittal' && item.type && (
                <div className={styles.transmittalType}>
                  <Badge variant={item.type === 'OUTGOING' ? 'info' : 'success'}>
                    {item.type === 'OUTGOING' ? '📤 Salida' : '📥 Entrada'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraceabilityCard;
