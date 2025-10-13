/**
 * DocumentTraceability component
 * Shows the complete traceability of document revisions with transmittals
 * @module features/projects/lmd/components/DocumentTraceability
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import CostBreakdownModal from '../CostBreakdownModal';
import DocumentDownloadButtons from '../DocumentDownloadButtons';
import { formatDate, formatCurrency } from '../../../../../utils';
import styles from './DocumentTraceability.module.css';

const DocumentTraceability = ({ document }) => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const [selectedCost, setSelectedCost] = useState(null);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);

  if (!document) return null;

  const handleTransmittalClick = (transmittalId) => {
    // Navigate to transmittals page with the specific transmittal ID
    navigate(`/projects/${projectId}/transmittals?open=${transmittalId}`);
  };

  const handleCostInfoClick = (costBreakdown, cost, revision) => {
    setSelectedCost({ costBreakdown, cost, revision });
    setIsCostModalOpen(true);
  };

  const handleCloseCostModal = () => {
    setIsCostModalOpen(false);
    setSelectedCost(null);
  };

  const getClientResponseLabel = (response) => {
    const labels = {
      'APR': 'Aprobado',
      'ACC': 'Aprobado con Comentarios',
      'CMN': 'Comentarios',
      'RCH': 'Rechazado'
    };
    return labels[response] || response;
  };

  const getClientResponseIcon = (response) => {
    const icons = {
      'APR': '✅',
      'ACC': '⚠️',
      'CMN': '💬',
      'RCH': '❌'
    };
    return icons[response] || '📝';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>Trazabilidad Completa</h4>
        <p className={styles.description}>
          Seguimiento del ciclo de vida del documento con transmittals de entrada y salida
        </p>
      </div>

      <div className={styles.currentInfo}>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Documento</span>
          <span className={styles.infoValue}>{document.code}</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Revisión Actual</span>
          <span className={styles.infoValue}>{document.revision}</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Estado</span>
          <StatusBadge status={document.status} />
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Responsable</span>
          <span className={styles.infoValue}>{document.responsible}</span>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {document.revisionHistory && document.revisionHistory.length > 0 ? (
          document.revisionHistory.map((rev, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                {/* Revision Header */}
                <div className={styles.revisionHeader}>
                  <div className={styles.revisionBadge}>
                    <span className={styles.revisionLabel}>Rev. {rev.revision}</span>
                    <StatusBadge status={rev.status} size="small" />
                  </div>
                  <span className={styles.revisionDate}>{formatDate(rev.date)}</span>
                </div>

                {/* Revision Body */}
                <div className={styles.revisionBody}>
                  <p className={styles.revisionComments}>{rev.comments}</p>
                  <p className={styles.revisionReviewer}>
                    <strong>Revisor:</strong> {rev.reviewer}
                  </p>
                </div>

                {/* Cost Info (for all revisions) */}
                {rev.cost && rev.costBreakdown && (
                  <div className={styles.costInfo}>
                    <span className={styles.costText}>
                      Costo de elaboración: {formatCurrency(rev.cost)}
                    </span>
                    <button 
                      className={styles.infoIcon}
                      onClick={() => handleCostInfoClick(rev.costBreakdown, rev.cost, rev.revision)}
                      title="Ver desglose de costos"
                    >
                      ℹ️
                    </button>
                  </div>
                )}

                {/* Download Buttons */}
                {rev.files && (
                  <div className={styles.downloadSection}>
                    <span className={styles.downloadLabel}>Descargar:</span>
                    <DocumentDownloadButtons files={rev.files} variant="compact" />
                  </div>
                )}

                {/* Transmittal Links */}
                {(rev.outgoingTransmittal || rev.incomingTransmittal) && (
                  <div className={styles.transmittals}>
                    <div className={styles.transmittalsHeader}>
                      <span className={styles.transmittalsIcon}>📋</span>
                      <span className={styles.transmittalsLabel}>Transmittals Asociados</span>
                    </div>

                    <div className={styles.transmittalsList}>
                      {/* Outgoing Transmittal */}
                      {rev.outgoingTransmittal && (
                        <div className={styles.transmittalCard}>
                          <div className={styles.transmittalType}>
                            <span className={styles.transmittalIcon}>📤</span>
                            <span className={styles.transmittalTypeLabel}>Salida</span>
                          </div>
                          <button
                            className={styles.transmittalLink}
                            onClick={() => handleTransmittalClick(rev.outgoingTransmittal.id)}
                            title="Click para ver transmittal"
                          >
                            {rev.outgoingTransmittal.code}
                          </button>
                          <span className={styles.transmittalDate}>
                            {formatDate(rev.outgoingTransmittal.date)}
                          </span>
                        </div>
                      )}

                      {/* Incoming Transmittal */}
                      {rev.incomingTransmittal && (
                        <div className={styles.transmittalCard}>
                          <div className={styles.transmittalType}>
                            <span className={styles.transmittalIcon}>📥</span>
                            <span className={styles.transmittalTypeLabel}>Entrada</span>
                          </div>
                          <button
                            className={styles.transmittalLink}
                            onClick={() => handleTransmittalClick(rev.incomingTransmittal.id)}
                            title="Click para ver transmittal"
                          >
                            {rev.incomingTransmittal.code}
                          </button>
                          <span className={styles.transmittalDate}>
                            {formatDate(rev.incomingTransmittal.date)}
                          </span>
                          {rev.incomingTransmittal.clientResponse && (
                            <div className={styles.clientResponse}>
                              <span className={styles.responseIcon}>
                                {getClientResponseIcon(rev.incomingTransmittal.clientResponse)}
                              </span>
                              <span className={styles.responseLabel}>
                                {getClientResponseLabel(rev.incomingTransmittal.clientResponse)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Divider between revisions */}
                {index < document.revisionHistory.length - 1 && (
                  <div className={styles.revisionDivider}></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noHistory}>
            <p>No hay historial de revisiones disponible</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <h5 className={styles.legendTitle}>Guía de Trazabilidad:</h5>
        <ul className={styles.legendList}>
          <li>
            <strong>📤 Transmittals de Salida:</strong> Documentos enviados al cliente para revisión
          </li>
          <li>
            <strong>📥 Transmittals de Entrada:</strong> Respuesta del cliente con comentarios o aprobación
          </li>
          <li>
            <strong>💰 Costos:</strong> Costo de elaboración de cada revisión (horas × tarifa del recurso)
          </li>
          <li>
            <strong>Revisiones A, B:</strong> Elaboración interna (no enviadas al cliente)
          </li>
          <li>
            <strong>Revisiones C, D, E:</strong> Enviadas al cliente para revisión
          </li>
          <li>
            <strong>Revisión 0:</strong> Aprobada para construcción
          </li>
          <li>
            <strong>Revisiones 1, 2, 3:</strong> As Built (como se construyó)
          </li>
        </ul>
      </div>

      {/* Cost Breakdown Modal */}
      {selectedCost && (
        <CostBreakdownModal
          isOpen={isCostModalOpen}
          onClose={handleCloseCostModal}
          costBreakdown={selectedCost.costBreakdown}
          cost={selectedCost.cost}
          documentCode={document.code}
          revision={selectedCost.revision}
        />
      )}
    </div>
  );
};

export default DocumentTraceability;

