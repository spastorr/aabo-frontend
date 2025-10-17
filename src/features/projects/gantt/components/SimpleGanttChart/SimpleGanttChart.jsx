/**
 * SimpleGanttChart - Simplified Gantt chart for demonstration
 * @module features/projects/gantt/components/SimpleGanttChart
 */

import { DISCIPLINE_COLORS, DISCIPLINE_LABELS } from '../../../../../constants';
import { DOCUMENT_STATUS_DETAILED } from '../../../../../constants/documentLifecycle';
import { formatDate } from '../../../../../utils/dateFormatter';
import styles from './SimpleGanttChart.module.css';

const SimpleGanttChart = ({ documents = [], revisions = [] }) => {
  const getDocumentColor = (discipline) => {
    return DISCIPLINE_COLORS[discipline] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const statusInfo = DOCUMENT_STATUS_DETAILED[status] || DOCUMENT_STATUS_DETAILED.ELB;
    return statusInfo.color?.bg || '#f3f4f6';
  };

  return (
    <div className={styles.ganttContainer}>
      <div className={styles.header}>
        <h3>📅 Cronograma de Documentos</h3>
        <p>Vista simplificada del timeline de documentos del proyecto</p>
      </div>

      {/* Timeline Header */}
      <div className={styles.timelineHeader}>
        <div className={styles.documentColumn}>Documento</div>
        <div className={styles.disciplineColumn}>Disciplina</div>
        <div className={styles.statusColumn}>Estado</div>
        <div className={styles.datesColumn}>Período</div>
        <div className={styles.revisionColumn}>Revisión</div>
      </div>

      {/* Documents List */}
      <div className={styles.documentsList}>
        {documents.map((doc, index) => (
          <div key={doc.id} className={styles.documentRow}>
            <div className={styles.documentColumn}>
              <div className={styles.documentCode}>{doc.code}</div>
              <div className={styles.documentName}>{doc.name}</div>
            </div>
            
            <div className={styles.disciplineColumn}>
              <div 
                className={styles.disciplineBadge}
                style={{ backgroundColor: getDocumentColor(doc.discipline) }}
              >
                {DISCIPLINE_LABELS[doc.discipline]}
              </div>
            </div>
            
            <div className={styles.statusColumn}>
              <div 
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(doc.status) }}
              >
                {DOCUMENT_STATUS_DETAILED[doc.status]?.label || doc.status}
              </div>
            </div>
            
            <div className={styles.datesColumn}>
              <div className={styles.dateRange}>
                <div className={styles.startDate}>
                  Inicio: {formatDate(doc.startDate)}
                </div>
                <div className={styles.endDate}>
                  Fin: {formatDate(doc.endDate)}
                </div>
                {doc.dueDate && (
                  <div className={styles.dueDate}>
                    Vence: {formatDate(doc.dueDate)}
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.revisionColumn}>
              <div className={styles.revisionInfo}>
                <div className={styles.currentRevision}>
                  Rev. {doc.currentRevision}
                </div>
                {doc.sendDate && (
                  <div className={styles.sendDate}>
                    Enviado: {formatDate(doc.sendDate)}
                  </div>
                )}
                {doc.approvalDate && (
                  <div className={styles.approvalDate}>
                    Aprobado: {formatDate(doc.approvalDate)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revisions Section */}
      {revisions.length > 0 && (
        <div className={styles.revisionsSection}>
          <h4>📋 Revisiones del Proyecto</h4>
          <div className={styles.revisionsList}>
            {revisions.map((rev) => (
              <div key={rev.id} className={styles.revisionItem}>
                <div className={styles.revisionCode}>
                  {documents.find(d => d.id === rev.documentId)?.code} - Rev. {rev.revision}
                </div>
                <div className={styles.revisionDate}>
                  {formatDate(rev.date)}
                </div>
                <div className={styles.revisionStatus}>
                  {rev.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className={styles.summary}>
        <h4>📊 Resumen del Proyecto</h4>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryNumber}>{documents.length}</div>
            <div className={styles.summaryLabel}>Total Documentos</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryNumber}>
              {documents.filter(d => d.status === 'IFC').length}
            </div>
            <div className={styles.summaryLabel}>Completados</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryNumber}>
              {documents.filter(d => ['ELB', 'REV', 'CMN'].includes(d.status)).length}
            </div>
            <div className={styles.summaryLabel}>En Progreso</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryNumber}>{revisions.length}</div>
            <div className={styles.summaryLabel}>Total Revisiones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleGanttChart;
