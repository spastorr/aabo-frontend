/**
 * HistoricalProjectLMD - Shows final master document list (Read-only)
 * Uses the same structure as the portfolio LMD
 * @module features/knowledgeHub/historical-projects/components/HistoricalProjectDetail
 */

import { useState, useEffect, useRef } from 'react';
import DocumentDetailModal from '../../../../projects/lmd/components/DocumentDetailModal';
import Avatar from '../../../../../components/shared/Avatar';
import { DISCIPLINE_LABELS } from '../../../../../constants';
import { formatDate, formatCurrency } from '../../../../../utils';
import styles from './HistoricalProjectLMD.module.css';

const HistoricalProjectLMD = ({ lmd, projectCode }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeMenu]);

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDocument(null);
  };

  const handleMenuClick = (e, docId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === docId ? null : docId);
  };

  const handleMenuAction = (e, action, doc) => {
    e.stopPropagation();
    setActiveMenu(null);
    
    if (action === 'details') {
      handleDocumentClick(doc);
    } else if (action === 'download') {
      // For historical projects, show download options
      alert(`Descargar ${doc.name} - Por implementar`);
    } else {
      alert(`${action} - No disponible en proyectos archivados`);
    }
  };
  if (!lmd || lmd.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📄</span>
        <h3>No se encontraron documentos</h3>
        <p>Este proyecto no tiene documentos en la LMD final.</p>
      </div>
    );
  }


  return (
    <div className={styles.container}>
      {/* Header with Stats */}
      <div className={styles.headerSection}>
        <div>
          <h3 className={styles.title}>Lista Maestra de Documentos (LMD) Final</h3>
          <p className={styles.subtitle}>
            Todos los entregables aprobados del proyecto {projectCode}
          </p>
        </div>
      </div>


      {/* LMD Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Código</th>
              <th>Nombre</th>
              <th style={{ width: '120px' }}>Disciplina</th>
              <th style={{ width: '100px' }}>Resp.</th>
              <th style={{ width: '110px' }}>F. Envío</th>
              <th style={{ width: '110px' }}>F. Aprobación</th>
              <th style={{ width: '120px', textAlign: 'right' }}>Costo</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {lmd.map((doc, index) => (
              <tr 
                key={doc.id} 
                className={styles.row}
                onClick={() => handleDocumentClick(doc)}
              >
                <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                  {index + 1}
                </td>
                <td>
                  <span className={styles.code}>{doc.code}</span>
                </td>
                <td className={styles.nameCell}>
                  <span className={styles.name} title={doc.name}>{doc.name}</span>
                </td>
                <td>
                  <span className={styles.discipline}>
                    {DISCIPLINE_LABELS[doc.discipline] || doc.discipline}
                  </span>
                </td>
                <td>
                  <Avatar name={doc.responsible} size="small" />
                </td>
                <td style={{ fontSize: '0.8125rem' }}>
                  {doc.sendDate ? formatDate(doc.sendDate) : '-'}
                </td>
                <td style={{ fontSize: '0.8125rem' }}>
                  {doc.approvalDate ? formatDate(doc.approvalDate) : '-'}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span className={styles.cost}>
                    {formatCurrency(doc.cost)}
                  </span>
                </td>
                <td style={{ position: 'relative' }}>
                  <button 
                    className={styles.actionButton}
                    onClick={(e) => handleMenuClick(e, doc.id)}
                    ref={activeMenu === doc.id ? menuRef : null}
                  >
                    ⋮
                  </button>
                  
                  {activeMenu === doc.id && (
                    <div className={styles.actionMenu} ref={menuRef}>
                      <button onClick={(e) => handleMenuAction(e, 'details', doc)}>
                        👁️ Ver Detalles
                      </button>
                      <button onClick={(e) => handleMenuAction(e, 'download', doc)}>
                        ⬇️ Descargar
                      </button>
                      <button onClick={(e) => handleMenuAction(e, 'history', doc)}>
                        📜 Historial
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Read-Only Notice */}
      <div className={styles.readOnlyNotice}>
        <span className={styles.noticeIcon}>🔒</span>
        <p>Esta es una vista de solo lectura de la LMD final. Los documentos no pueden ser modificados en proyectos archivados.</p>
      </div>

      {/* Document Detail Modal */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        isHistorical={true}
      />
    </div>
  );
};

export default HistoricalProjectLMD;

