/**
 * TraceabilitySummary - Component to show traceability overview
 * @module components/shared/TraceabilitySummary
 */

import { useState, useEffect } from 'react';
import Card from '../Card';
import Badge from '../Badge';
import { getTransmittalsByProject } from '../../../services/mocks/transmittalMocks';
import { getRFIsByProject } from '../../../services/mocks/rfiMocks';
import styles from './TraceabilitySummary.module.css';

const TraceabilitySummary = ({ projectId }) => {
  const [summary, setSummary] = useState({
    totalTransmittals: 0,
    totalRFIs: 0,
    transmittalsWithRFI: 0,
    rfisInTransmittals: 0,
    pendingResponses: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadSummary();
    }
  }, [projectId]);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const [transmittalsResponse, rfisResponse] = await Promise.all([
        getTransmittalsByProject(projectId),
        getRFIsByProject(projectId)
      ]);

      if (transmittalsResponse.success && rfisResponse.success) {
        const transmittals = transmittalsResponse.data;
        const rfis = rfisResponse.data;

        const transmittalsWithRFI = transmittals.filter(t => t.relatedRFIs && t.relatedRFIs.length > 0);
        const rfisInTransmittals = rfis.filter(r => r.transmittalId);
        const pendingResponses = transmittals.filter(t => t.status === 'PENDING_RESPONSE').length;

        // Recent activity (last 5 items)
        const recentActivity = [
          ...transmittals.map(t => ({ ...t, type: 'transmittal', date: t.date })),
          ...rfis.map(r => ({ ...r, type: 'rfi', date: r.createdDate }))
        ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

        setSummary({
          totalTransmittals: transmittals.length,
          totalRFIs: rfis.length,
          transmittalsWithRFI: transmittalsWithRFI.length,
          rfisInTransmittals: rfisInTransmittals.length,
          pendingResponses,
          recentActivity
        });
      }
    } catch (error) {
      console.error('Error loading traceability summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className={styles.card}>
        <div className={styles.loading}>Cargando resumen de trazabilidad...</div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>🔗 Resumen de Trazabilidad</h3>
        <Badge variant="info">RFI ↔ Transmittals</Badge>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalTransmittals}</div>
          <div className={styles.statLabel}>Total Transmittals</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.totalRFIs}</div>
          <div className={styles.statLabel}>Total RFIs</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.transmittalsWithRFI}</div>
          <div className={styles.statLabel}>Con RFI</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.rfisInTransmittals}</div>
          <div className={styles.statLabel}>En Transmittals</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{summary.pendingResponses}</div>
          <div className={styles.statLabel}>Pendientes</div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h4 className={styles.activityTitle}>Actividad Reciente</h4>
        <div className={styles.activityList}>
          {summary.recentActivity.map((item, index) => (
            <div key={`${item.type}-${item.id}`} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {item.type === 'transmittal' ? '📦' : '📋'}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityCode}>{item.code}</div>
                <div className={styles.activitySubject}>
                  {item.subject || item.description?.substring(0, 50) + '...'}
                </div>
                <div className={styles.activityDate}>
                  {new Date(item.date).toLocaleDateString('es-ES')}
                </div>
              </div>
              <div className={styles.activityStatus}>
                <Badge 
                  variant={
                    item.type === 'transmittal' 
                      ? (item.status === 'PENDING_RESPONSE' ? 'warning' : 'info')
                      : (item.status === 'ANSWERED' ? 'success' : 'warning')
                  }
                >
                  {item.type === 'transmittal' 
                    ? (item.status === 'PENDING_RESPONSE' ? 'Pendiente' : 'Enviado')
                    : (item.status === 'ANSWERED' ? 'Respondido' : 'Abierto')
                  }
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TraceabilitySummary;
