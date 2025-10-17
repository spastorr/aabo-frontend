/**
 * LMDTable component
 * Main table displaying documents
 * @module features/projects/lmd/components/LMDTable
 */

import { useState, useEffect, useRef } from 'react';
import StatusBadge from '../StatusBadge';
import Avatar from '../../../../../components/shared/Avatar';
import { DISCIPLINE_LABELS } from '../../../../../constants';
import { formatDate, formatCurrency } from '../../../../../utils';
import { 
  isDocumentPendingTransmission, 
  getDocumentTransmissionPriority,
  getTransmissionStatusIcon 
} from '../../../../../utils/documentStatusUtils';
import styles from './LMDTable.module.css';

const LMDTable = ({ documents, onDocumentClick }) => {
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

  if (!documents || documents.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📄</span>
        <h3>No se encontraron documentos</h3>
        <p>Intenta ajustar los filtros o agrega un nuevo documento</p>
      </div>
    );
  }

  const handleMenuClick = (e, docId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === docId ? null : docId);
  };

  const handleMenuAction = (e, action, doc) => {
    e.stopPropagation();
    setActiveMenu(null);
    
    if (action === 'details') {
      onDocumentClick(doc);
    } else {
      alert(`${action} - Por implementar`);
    }
  };

  // Get status color indicator
  const getStatusColor = (status) => {
    const colors = {
      'IFC': '#10b981',  // Green
      'ASB': '#3b82f6',  // Blue
      'APR': '#10b981',  // Green
      'ACC': '#f59e0b',  // Yellow
      'CMN': '#f59e0b',  // Yellow
      'RCH': '#ef4444',  // Red
      'ELB': '#64748b',  // Gray
      'RDL': '#ec4899',  // Pink
    };
    return colors[status] || '#64748b';
  };

  // Get transmission priority color
  const getPriorityColor = (priority) => {
    const colors = {
      'URGENT': '#ef4444',  // Red
      'HIGH': '#f59e0b',    // Orange
      'NORMAL': '#3b82f6',  // Blue
      'LOW': '#64748b',     // Gray
    };
    return colors[priority] || '#64748b';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th style={{ width: '200px' }}>Código</th>
            <th>Nombre</th>
            <th style={{ width: '120px' }}>Disciplina</th>
            <th style={{ width: '180px' }}>Estado</th>
            <th style={{ width: '60px', textAlign: 'center' }}>Rev.</th>
            <th style={{ width: '100px' }}>Resp.</th>
            <th style={{ width: '110px' }}>F. Envío</th>
            <th style={{ width: '110px' }}>F. Aprobación</th>
            <th style={{ width: '120px', textAlign: 'right' }}>Costo</th>
            <th style={{ width: '50px' }}></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => {
            const isPending = isDocumentPendingTransmission(doc);
            const priority = getDocumentTransmissionPriority(doc);
            const statusIcon = getTransmissionStatusIcon(isPending ? 'pending' : 'transmitted');
            
            return (
              <tr 
                key={doc.id} 
                className={`${styles.row} ${isPending ? styles.pendingRow : ''}`}
                onClick={() => onDocumentClick(doc)}
              >
                <td style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                  {index + 1}
                </td>
                <td>
                  <div className={styles.codeCell}>
                    <span className={styles.code}>{doc.code}</span>
                    {isPending && (
                      <span 
                        className={styles.pendingIcon}
                        title={`Documento pendiente de envío - Prioridad: ${priority}`}
                      >
                        {statusIcon}
                      </span>
                    )}
                  </div>
                </td>
                <td className={styles.nameCell}>
                  <span className={styles.name} title={doc.name}>{doc.name}</span>
                </td>
                <td>
                  <span className={styles.discipline}>
                    {DISCIPLINE_LABELS[doc.discipline]}
                  </span>
                </td>
                <td>
                  <div className={styles.statusCell}>
                    <span 
                      className={styles.statusDot}
                      style={{ backgroundColor: getStatusColor(doc.status) }}
                    />
                    <StatusBadge status={doc.status} />
                    {isPending && (
                      <span 
                        className={styles.priorityIndicator}
                        style={{ backgroundColor: getPriorityColor(priority) }}
                        title={`Prioridad: ${priority}`}
                      />
                    )}
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={styles.revision}>{doc.revision}</span>
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
                      <button onClick={(e) => handleMenuAction(e, 'edit', doc)}>
                        ✏️ Editar
                      </button>
                      <button onClick={(e) => handleMenuAction(e, 'download', doc)}>
                        ⬇️ Descargar
                      </button>
                      <button onClick={(e) => handleMenuAction(e, 'history', doc)}>
                        📜 Historial
                      </button>
                      {isPending && (
                        <button onClick={(e) => handleMenuAction(e, 'transmittal', doc)}>
                          📤 Crear Transmittal
                        </button>
                      )}
                      <button 
                        onClick={(e) => handleMenuAction(e, 'delete', doc)}
                        className={styles.deleteAction}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LMDTable;

