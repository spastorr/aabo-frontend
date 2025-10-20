/**
 * DebugGanttChart - Enhanced version with dark/light mode support
 * @module features/projects/gantt/components/DebugGanttChart
 */

import styles from './DebugGanttChart.module.css';

const DebugGanttChart = ({ documents = [], revisions = [] }) => {
  console.log('DebugGanttChart rendered with:', { documents, revisions });
  
  // Get discipline colors
  const getDisciplineColor = (discipline) => {
    const colors = {
      'PROCESS': '#3b82f6',
      'PIPING': '#ef4444',
      'MECHANICAL': '#10b981',
      'ELECTRICAL': '#f59e0b',
      'CIVIL': '#8b5cf6',
      'INSTRUMENTATION': '#06b6d4'
    };
    return colors[discipline] || '#64748b';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'IFC': '#10b981',
      'REV': '#f59e0b',
      'CMN': '#ef4444',
      'ELB': '#06b6d4',
      'APR': '#10b981'
    };
    return colors[status] || '#64748b';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>📅 Cronograma de Documentos</h2>
        <p className={styles.subtitle}>Vista detallada del timeline de documentos y revisiones</p>
      </div>
      
      <div className={styles.statsSection}>
        <h3 className={styles.sectionTitle}>📊 Estadísticas del Proyecto</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{documents.length}</div>
            <div className={styles.statLabel}>Documentos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{revisions.length}</div>
            <div className={styles.statLabel}>Revisiones</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {documents.filter(doc => doc.status === 'APR' || doc.status === 'IFC').length}
            </div>
            <div className={styles.statLabel}>Aprobados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {documents.filter(doc => doc.status === 'REV' || doc.status === 'CMN').length}
            </div>
            <div className={styles.statLabel}>En Revisión</div>
          </div>
        </div>
      </div>

      <div className={styles.documentsSection}>
        <h3 className={styles.sectionTitle}>📄 Lista de Documentos</h3>
        {documents.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>❌ No hay documentos para mostrar</p>
          </div>
        ) : (
          <div className={styles.documentsGrid}>
            {documents.map((doc, index) => (
              <div key={doc.id} className={styles.documentCard}>
                <div className={styles.documentHeader}>
                  <h4 className={styles.documentCode}>{doc.code}</h4>
                  <div 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(doc.status) }}
                  >
                    {doc.status}
                  </div>
                </div>
                <p className={styles.documentName}>{doc.name}</p>
                <div className={styles.documentDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Disciplina:</span>
                    <span 
                      className={styles.disciplineBadge}
                      style={{ backgroundColor: getDisciplineColor(doc.discipline) }}
                    >
                      {doc.discipline}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Inicio:</span>
                    <span className={styles.detailValue}>{doc.startDate}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Fin:</span>
                    <span className={styles.detailValue}>{doc.endDate}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Responsable:</span>
                    <span className={styles.detailValue}>{doc.responsible}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Costo:</span>
                    <span className={styles.detailValue}>${doc.cost?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.revisionsSection}>
        <h3 className={styles.sectionTitle}>📋 Historial de Revisiones</h3>
        {revisions.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>❌ No hay revisiones para mostrar</p>
          </div>
        ) : (
          <div className={styles.revisionsList}>
            {revisions.map((rev, index) => (
              <div key={rev.id} className={styles.revisionCard}>
                <div className={styles.revisionHeader}>
                  <span className={styles.revisionDocument}>{rev.documentId}</span>
                  <span className={styles.revisionNumber}>Rev. {rev.revision}</span>
                </div>
                <div className={styles.revisionDetails}>
                  <span className={styles.revisionDate}>{rev.date}</span>
                  <span 
                    className={styles.revisionType}
                    style={{ 
                      backgroundColor: rev.type === 'FOR_CONSTRUCTION' ? '#10b981' : 
                                     rev.type === 'FOR_REVIEW' ? '#f59e0b' : '#64748b'
                    }}
                  >
                    {rev.type}
                  </span>
                  <span className={styles.revisionStatus}>{rev.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugGanttChart;
