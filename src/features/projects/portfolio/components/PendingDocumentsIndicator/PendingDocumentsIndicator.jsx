/**
 * PendingDocumentsIndicator component
 * Shows a small indicator of pending documents for a project
 * @module features/projects/portfolio/components/PendingDocumentsIndicator
 */

import { useState, useEffect } from 'react';
import { 
  getPendingTransmissionDocuments, 
  getTransmissionStatistics,
  getTransmissionStatusIcon
} from '../../../../../utils/documentStatusUtils';
import { getLMDByProject } from '../../../../../services/mocks/documentMocks';
import styles from './PendingDocumentsIndicator.module.css';

const PendingDocumentsIndicator = ({ project, showDetails = false }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project?.id) {
      loadProjectDocuments();
    }
  }, [project?.id]);

  const loadProjectDocuments = async () => {
    setLoading(true);
    
    try {
      const response = await getLMDByProject(project.id);
      if (response.success) {
        setDocuments(response.data);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const pendingDocuments = getPendingTransmissionDocuments(documents);
  const stats = getTransmissionStatistics(documents);

  if (loading) {
    return (
      <div className={styles.indicator}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (pendingDocuments.length === 0) {
    return null; // Don't show anything if no pending documents
  }

  return (
    <div className={styles.indicator}>
      <div className={styles.icon}>
        {getTransmissionStatusIcon('pending')}
      </div>
      <div className={styles.content}>
        <div className={styles.count}>
          {pendingDocuments.length}
        </div>
        <div className={styles.label}>
          Pendiente{pendingDocuments.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {showDetails && (
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Total:</span>
            <span className={styles.detailValue}>{stats.total}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Enviados:</span>
            <span className={styles.detailValue}>{stats.transmitted}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDocumentsIndicator;
