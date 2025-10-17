/**
 * PendingDocumentsSummary component
 * Shows a summary of pending documents for the project dashboard
 * @module features/projects/dashboard/components/PendingDocumentsSummary
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../../components/shared/Card';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import { 
  getPendingTransmissionDocuments, 
  getTransmissionStatistics,
  getDocumentTransmissionPriority,
  getTransmissionStatusIcon
} from '../../../../../utils/documentStatusUtils';
import { getLMDByProject } from '../../../../../services/mocks/documentMocks';
import styles from './PendingDocumentsSummary.module.css';

const PendingDocumentsSummary = ({ projectId }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (projectId) {
      loadProjectDocuments();
    }
  }, [projectId]);

  const loadProjectDocuments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getLMDByProject(projectId);
      if (response.success) {
        setDocuments(response.data);
      } else {
        setError('Error al cargar documentos');
      }
    } catch (err) {
      console.error('Error loading documents:', err);
      setError('Error al cargar documentos');
    } finally {
      setLoading(false);
    }
  };

  const pendingDocuments = getPendingTransmissionDocuments(documents);
  const stats = getTransmissionStatistics(documents);

  const handleViewLMD = () => {
    navigate(`/projects/${projectId}/lmd`);
  };

  const handleCreateTransmittal = () => {
    navigate(`/projects/${projectId}/transmittals?create=true`);
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'URGENT':
        return 'danger';
      case 'HIGH':
        return 'warning';
      case 'NORMAL':
        return 'info';
      case 'LOW':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  if (loading) {
    return (
      <Card className={styles.card}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando documentos...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={styles.card}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={loadProjectDocuments} variant="outline" size="small">
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>
            📤 Documentos Pendientes de Envío
          </h3>
          <p className={styles.subtitle}>
            {pendingDocuments.length} documento{pendingDocuments.length !== 1 ? 's' : ''} listo{pendingDocuments.length !== 1 ? 's' : ''} para transmisión
          </p>
        </div>
        
        {pendingDocuments.length > 0 && (
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              size="small"
              onClick={handleCreateTransmittal}
            >
              Crear Transmittal
            </Button>
          </div>
        )}
      </div>

      {pendingDocuments.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✅</div>
          <p className={styles.emptyText}>
            Todos los documentos han sido enviados
          </p>
          <p className={styles.emptySubtext}>
            No hay documentos pendientes de transmisión
          </p>
        </div>
      ) : (
        <div className={styles.content}>
          {/* Statistics */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Total Documentos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.pending}</span>
              <span className={styles.statLabel}>Pendientes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.transmitted}</span>
              <span className={styles.statLabel}>Enviados</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.notReady}</span>
              <span className={styles.statLabel}>En Desarrollo</span>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className={styles.priorityBreakdown}>
            <h4 className={styles.breakdownTitle}>Por Prioridad:</h4>
            <div className={styles.priorityStats}>
              {['URGENT', 'HIGH', 'NORMAL', 'LOW'].map(priority => {
                const count = pendingDocuments.filter(doc => 
                  getDocumentTransmissionPriority(doc) === priority
                ).length;
                
                if (count === 0) return null;
                
                return (
                  <div key={priority} className={styles.priorityStat}>
                    <Badge variant={getPriorityVariant(priority)} size="small">
                      {priority}
                    </Badge>
                    <span className={styles.priorityCount}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Pending Documents */}
          <div className={styles.recentDocuments}>
            <h4 className={styles.recentTitle}>
              Documentos Pendientes Recientes:
            </h4>
            <div className={styles.documentsList}>
              {pendingDocuments.slice(0, 3).map((doc) => {
                const priority = getDocumentTransmissionPriority(doc);
                const statusIcon = getTransmissionStatusIcon('pending');
                
                return (
                  <div key={doc.id} className={styles.documentItem}>
                    <div className={styles.documentInfo}>
                      <div className={styles.documentHeader}>
                        <span className={styles.documentCode}>{doc.code}</span>
                        <div className={styles.documentBadges}>
                          <span className={styles.statusIcon}>{statusIcon}</span>
                          <Badge 
                            variant={getPriorityVariant(priority)}
                            size="small"
                          >
                            {priority}
                          </Badge>
                        </div>
                      </div>
                      <div className={styles.documentName}>{doc.name}</div>
                      <div className={styles.documentMeta}>
                        <span className={styles.revision}>Rev. {doc.currentRevision || doc.revision}</span>
                        <span className={styles.discipline}>{doc.discipline}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {pendingDocuments.length > 3 && (
                <div className={styles.moreDocuments}>
                  <p>... y {pendingDocuments.length - 3} documento{pendingDocuments.length - 3 !== 1 ? 's' : ''} más</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.footerActions}>
            <Button 
              variant="outline" 
              size="small"
              onClick={handleViewLMD}
            >
              Ver LMD Completa
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={handleCreateTransmittal}
            >
              Crear Transmittal
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PendingDocumentsSummary;
