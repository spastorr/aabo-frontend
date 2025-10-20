/**
 * DocumentTraceability - Simplified document traceability component
 * Shows only revision history in a clean, user-friendly format
 * Compatible with both dark and light modes
 * @module features/projects/lmd/components/DocumentTraceability
 */

import { useState, useMemo } from 'react';
import { 
  generateTraceabilityReport, 
  formatDocumentStatus
} from '../../../../../utils/documentTraceabilityUtils';
import styles from './DocumentTraceability.module.css';

const DocumentTraceability = ({ document }) => {
  const traceabilityReport = useMemo(() => {
    return document ? generateTraceabilityReport(document) : null;
  }, [document]);

  if (!document || !traceabilityReport) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <p>Selecciona un documento para ver su trazabilidad</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.documentInfo}>
          <h2>{document.name}</h2>
          <div className={styles.documentMeta}>
            <span className={styles.documentCode}>{document.code}</span>
            <span className={styles.documentDiscipline}>{document.discipline}</span>
            <span className={styles.documentResponsible}>{document.responsible}</span>
          </div>
        </div>
        
        <div className={styles.currentStatus}>
          {(() => {
            const statusConfig = formatDocumentStatus(document.status);
            return (
              <div 
                className={styles.statusBadge}
                style={{ 
                  backgroundColor: statusConfig.color.bg,
                  color: statusConfig.color.text,
                  borderColor: statusConfig.color.border
                }}
              >
                {statusConfig.icon} {statusConfig.label}
              </div>
            );
          })()}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Historial de Revisiones</h3>
          
          <div className={styles.revisionCards}>
            {traceabilityReport.revisionHistory.map((revision, index) => {
              const statusConfig = formatDocumentStatus(revision.status);
              const isLatest = index === 0;
              
              return (
                <div key={revision.revision} className={`${styles.revisionCard} ${isLatest ? styles.latest : ''}`}>
                  {/* Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.revisionInfo}>
                      <span className={styles.revisionCode}>Rev. {revision.revision}</span>
                      <div 
                        className={styles.statusBadge}
                        style={{ 
                          backgroundColor: statusConfig.color.bg,
                          color: statusConfig.color.text,
                          borderColor: statusConfig.color.border
                        }}
                      >
                        {statusConfig.label}
                      </div>
                    </div>
                    <span className={styles.revisionDate}>
                      {new Date(revision.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className={styles.cardContent}>
                    <p className={styles.revisionComments}>{revision.comments}</p>
                    
                    <div className={styles.revisionMeta}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Revisor:</span>
                        <span className={styles.metaValue}>{revision.reviewer}</span>
                      </div>
                      
                      {revision.cost && (
                        <div className={styles.metaRow}>
                          <span className={styles.metaLabel}>Costo de elaboración:</span>
                          <span className={styles.costValue}>${revision.cost.toLocaleString()}</span>
                          <span className={styles.infoIcon} title="Información adicional del costo">ℹ️</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Transmittals Section */}
                    {(revision.outgoingTransmittal || revision.incomingTransmittal) && (
                      <div className={styles.transmittalsSection}>
                        <div className={styles.sectionTitle}>
                          <span className={styles.sectionIcon}>📄</span>
                          <span>TRANSMITTALS ASOCIADOS</span>
                        </div>
                        
                        <div className={styles.transmittalsList}>
                          {revision.outgoingTransmittal && (
                            <div className={styles.transmittalRow}>
                              <div className={styles.transmittalInfo}>
                                <span className={styles.transmittalIcon}>📤</span>
                                <span className={styles.transmittalType}>SALIDA</span>
                                <span className={styles.transmittalCode}>{revision.outgoingTransmittal.code}</span>
                              </div>
                              <span className={styles.transmittalDate}>
                                {new Date(revision.outgoingTransmittal.date).toLocaleDateString('es-ES')}
                              </span>
                            </div>
                          )}
                          
                          {revision.incomingTransmittal && (
                            <div className={styles.transmittalRow}>
                              <div className={styles.transmittalInfo}>
                                <span className={styles.transmittalIcon}>📥</span>
                                <span className={styles.transmittalType}>ENTRADA</span>
                                <span className={styles.transmittalCode}>{revision.incomingTransmittal.code}</span>
                              </div>
                              <div className={styles.transmittalRight}>
                                <span className={styles.transmittalDate}>
                                  {new Date(revision.incomingTransmittal.date).toLocaleDateString('es-ES')}
                                </span>
                                {revision.incomingTransmittal.clientResponse && (
                                  <div className={styles.responseBadge}>
                                    <span className={styles.warningIcon}>⚠️</span>
                                    {revision.incomingTransmittal.clientResponse}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Files Section */}
                    {revision.files && (
                      <div className={styles.filesSection}>
                        <div className={styles.sectionTitle}>
                          <span className={styles.sectionIcon}>📁</span>
                          <span>ARCHIVOS DE LA REVISIÓN</span>
                        </div>
                        
                        <div className={styles.filesList}>
                          {revision.files.pdf && (
                            <div className={styles.fileItem}>
                              <div className={styles.fileInfo}>
                                <span className={styles.fileIcon}>📄</span>
                                <div className={styles.fileDetails}>
                                  <span className={styles.fileName}>{revision.files.pdf.name}</span>
                                  <span className={styles.fileType}>PDF</span>
                                </div>
                              </div>
                              <div className={styles.fileActions}>
                                <button 
                                  className={styles.viewBtn}
                                  onClick={() => window.open(revision.files.pdf.url, '_blank')}
                                  title="Ver documento"
                                >
                                  → Ver
                                </button>
                                <button 
                                  className={styles.downloadBtn}
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = revision.files.pdf.url;
                                    link.download = revision.files.pdf.name;
                                    link.click();
                                  }}
                                  title="Descargar documento"
                                >
                                  ⬇️ Descargar
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {revision.files.editable && (
                            <div className={styles.fileItem}>
                              <div className={styles.fileInfo}>
                                <span className={styles.fileIcon}>📝</span>
                                <div className={styles.fileDetails}>
                                  <span className={styles.fileName}>{revision.files.editable.name}</span>
                                  <span className={styles.fileType}>{revision.files.editable.type?.toUpperCase() || 'EDITABLE'}</span>
                                </div>
                              </div>
                              <div className={styles.fileActions}>
                                <button 
                                  className={styles.viewBtn}
                                  onClick={() => window.open(revision.files.editable.url, '_blank')}
                                  title="Ver documento editable"
                                >
                                  → Ver
                                </button>
                                <button 
                                  className={styles.downloadBtn}
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = revision.files.editable.url;
                                    link.download = revision.files.editable.name;
                                    link.click();
                                  }}
                                  title="Descargar documento editable"
                                >
                                  ⬇️ Descargar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTraceability;