/**
 * DocumentDetailModal component
 * Shows document details and history
 * @module features/projects/lmd/components/DocumentDetailModal
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import StatusBadge from '../StatusBadge';
import DocumentTraceability from '../DocumentTraceability';
import DocumentActions from '../DocumentActions';
import EditDocumentModal from '../EditDocumentModal';
import { DISCIPLINE_LABELS } from '../../../../../constants';
import { formatDate, formatCurrency } from '../../../../../utils';
import styles from './DocumentDetailModal.module.css';

const DocumentDetailModal = ({ document, isOpen, onClose, isHistorical = false, projectId, onDocumentUpdate }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    onDocumentUpdate?.();
  };

  if (!document) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del Documento"
      size="large"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleEditClick} disabled={isHistorical}>
            Editar
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Detalles
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'traceability' ? styles.active : ''}`}
            onClick={() => setActiveTab('traceability')}
          >
            📋 Trazabilidad
          </button>
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className={styles.detailsSection}>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <label>Código</label>
                <span className={styles.code}>{document.code}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Estado</label>
                <StatusBadge status={document.status} />
              </div>

              <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                <label>Nombre</label>
                <span>{document.name}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Disciplina</label>
                <span>{DISCIPLINE_LABELS[document.discipline]}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Responsable</label>
                <span>{document.responsible}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Revisión</label>
                <span className={styles.revision}>{document.revision}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Tipo</label>
                <span>{document.type}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Fecha de Envío</label>
                <span>{document.sendDate ? formatDate(document.sendDate) : '-'}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Fecha de Aprobación</label>
                <span>{document.approvalDate ? formatDate(document.approvalDate) : '-'}</span>
              </div>

              <div className={styles.detailItem}>
                <label>Costo</label>
                <span className={styles.cost}>{formatCurrency(document.cost)}</span>
              </div>

              {document.reviewDeadline && (
                <div className={styles.detailItem}>
                  <label>Plazo de Revisión</label>
                  <span className={styles.deadline}>
                    {formatDate(document.reviewDeadline)}
                    {new Date(document.reviewDeadline) < new Date() && (
                      <span className={styles.overdue}> ⚠️ Vencido</span>
                    )}
                  </span>
                </div>
              )}

              {document.stamp && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Sello</label>
                  <div className={styles.stampInline}>
                    🏷️ {document.stamp}
                  </div>
                </div>
              )}

              {document.redLineReference && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Red Line Asociado</label>
                  <span className={styles.code}>{document.redLineReference}</span>
                </div>
              )}

              {document.originalDocumentCode && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Documento Original</label>
                  <span className={styles.code}>{document.originalDocumentCode}</span>
                </div>
              )}

              {document.description && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Descripción</label>
                  <span>{document.description}</span>
                </div>
              )}

              {document.comments && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Comentarios</label>
                  <span className={styles.comments}>{document.comments}</span>
                </div>
              )}

              {/* Document Actions (View/Download) */}
              {document.currentFiles && (
                <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Acciones del Documento</label>
                  <DocumentActions document={document} variant="large" isHistorical={isHistorical} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traceability Tab */}
        {activeTab === 'traceability' && (
          <div className={styles.traceabilitySection}>
            <DocumentTraceability document={document} />
          </div>
        )}
      </div>
      
      {/* Edit Document Modal */}
      <EditDocumentModal
        document={document}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSuccess}
        projectId={projectId}
      />
    </Modal>
  );
};

DocumentDetailModal.propTypes = {
  document: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isHistorical: PropTypes.bool,
  projectId: PropTypes.string,
  onDocumentUpdate: PropTypes.func,
};

export default DocumentDetailModal;

