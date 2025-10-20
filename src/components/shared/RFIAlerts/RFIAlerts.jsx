/**
 * RFIAlerts - Component to show RFI alerts and overdue items
 * @module components/shared/RFIAlerts
 */

import { useState, useEffect } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import Button from '../Button';
import { getOverdueRFIs, calculateAlertStatus } from '../../../services/mocks/rfiMocks';
import { formatDate } from '../../../utils';
import styles from './RFIAlerts.module.css';

const RFIAlerts = ({ projectId, onRFIClick }) => {
  const [overdueRFIs, setOverdueRFIs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadOverdueRFIs();
    }
  }, [projectId]);

  const loadOverdueRFIs = async () => {
    setLoading(true);
    try {
      const response = await getOverdueRFIs(projectId);
      if (response.success) {
        setOverdueRFIs(response.data);
      }
    } catch (error) {
      console.error('Error loading overdue RFIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (alertStatus) => {
    switch (alertStatus) {
      case 'OVERDUE':
        return '🚨';
      case 'APPROACHING_DUE':
        return '⚠️';
      case 'ON_TIME':
        return '✅';
      default:
        return '📋';
    }
  };

  const getAlertVariant = (alertStatus) => {
    switch (alertStatus) {
      case 'OVERDUE':
        return 'error';
      case 'APPROACHING_DUE':
        return 'warning';
      case 'ON_TIME':
        return 'success';
      default:
        return 'neutral';
    }
  };

  if (loading) {
    return (
      <Card className={styles.card}>
        <div className={styles.loading}>Cargando alertas...</div>
      </Card>
    );
  }

  if (overdueRFIs.length === 0) {
    return (
      <Card className={styles.card}>
        <div className={styles.noAlerts}>
          <div className={styles.noAlertsIcon}>✅</div>
          <h3>Sin Alertas</h3>
          <p>Todas las RFI están al día</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h3 className={styles.title}>🚨 Alertas de RFI</h3>
          <Badge variant="error" className={styles.countBadge}>
            {overdueRFIs.length} vencida{overdueRFIs.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="small"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Ocultar' : 'Ver Todas'}
        </Button>
      </div>

      <div className={styles.alertsList}>
        {overdueRFIs.slice(0, expanded ? overdueRFIs.length : 3).map((rfi) => {
          const alertInfo = calculateAlertStatus(rfi);
          return (
            <div
              key={rfi.id}
              className={styles.alertItem}
              onClick={() => onRFIClick && onRFIClick(rfi)}
            >
              <div className={styles.alertHeader}>
                <div className={styles.alertIcon}>
                  {getAlertIcon(alertInfo.alertStatus)}
                </div>
                <div className={styles.alertInfo}>
                  <div className={styles.rfiCode}>{rfi.code}</div>
                  <div className={styles.rfiSubject}>{rfi.subject}</div>
                </div>
                <Badge variant={getAlertVariant(alertInfo.alertStatus)}>
                  {alertInfo.message}
                </Badge>
              </div>
              
              <div className={styles.alertDetails}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Fecha Estimada:</span>
                  <span className={styles.detailValue}>
                    {formatDate(rfi.estimatedResponseDate)}
                  </span>
                </div>
                {alertInfo.daysOverdue > 0 && (
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>Días de Retraso:</span>
                    <span className={styles.detailValue}>
                      {alertInfo.daysOverdue} día{alertInfo.daysOverdue !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Destinatario:</span>
                  <span className={styles.detailValue}>{rfi.recipient}</span>
                </div>
                {rfi.transmittalId && (
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>Transmittal:</span>
                    <span className={styles.detailValue}>{rfi.transmittalId}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {overdueRFIs.length > 3 && !expanded && (
        <div className={styles.showMore}>
          <Button
            variant="outline"
            size="small"
            onClick={() => setExpanded(true)}
          >
            Ver {overdueRFIs.length - 3} más
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RFIAlerts;
