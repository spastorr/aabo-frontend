/**
 * DocumentActions component
 * Shows view/download buttons with permission control
 * @module features/projects/lmd/components/DocumentActions
 */

import { usePermissions } from '../../../../../contexts/PermissionsContext';
import { PERMISSIONS } from '../../../../../constants/permissions';
import styles from './DocumentActions.module.css';

const DocumentActions = ({ document, variant = 'default', isHistorical = false }) => {
  const { checkPermission } = usePermissions();
  
  if (!document?.currentFiles) return null;

  const canView = checkPermission(PERMISSIONS.DOCUMENT_VIEW_CONTENT);
  const canDownload = checkPermission(PERMISSIONS.DOCUMENT_DOWNLOAD);

  const getFileIcon = (type) => {
    const icons = {
      'xlsx': '📊',
      'docx': '📝',
      'dwg': '📐',
      'pdf': '📄',
      'pptx': '📽️',
      'mpp': '📅',
    };
    return icons[type] || '📎';
  };

  const getFileLabel = (type) => {
    const labels = {
      'xlsx': 'Excel',
      'docx': 'Word',
      'dwg': 'AutoCAD',
      'pdf': 'PDF',
      'pptx': 'PowerPoint',
      'mpp': 'MS Project',
    };
    return labels[type] || 'Archivo';
  };

  const handleViewPDF = (url, name) => {
    if (!canView) {
      alert('No tienes permisos para ver documentos. Contacta al administrador del proyecto.');
      return;
    }
    console.log(`Opening PDF: ${name} from ${url}`);
    // In production, this would open PDF in a viewer
    window.open(url, '_blank');
  };

  const handleDownload = (url, name, type) => {
    if (!canDownload) {
      alert('No tienes permisos para descargar documentos. Contacta al administrador del proyecto.');
      return;
    }
    console.log(`Downloading: ${name} from ${url}`);
    alert(`Descargando: ${name}\n\nEn producción, esto iniciaría la descarga del archivo ${type}.`);
  };

  const { pdf, editable } = document.currentFiles;

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      {isHistorical && (
        <div className={styles.historicalNote}>
          <span className={styles.noteIcon}>🔒</span>
          <span className={styles.noteText}>Documentos archivados - Solo lectura</span>
        </div>
      )}

      <div className={styles.actions}>
        {/* PDF Actions */}
        {pdf && (
          <div className={styles.fileGroup}>
            <div className={styles.fileHeader}>
              <span className={styles.fileIcon}>📄</span>
              <span className={styles.fileName}>{pdf.name}</span>
              <span className={styles.fileSize}>{pdf.size || '2.5 MB'}</span>
            </div>
            <div className={styles.buttons}>
              <button
                className={`${styles.actionButton} ${styles.viewButton}`}
                onClick={() => handleViewPDF(pdf.url, pdf.name)}
                disabled={!canView}
                title={canView ? 'Ver documento PDF' : 'Sin permisos para ver documentos'}
              >
                <span className={styles.buttonIcon}>👁️</span>
                <span className={styles.buttonLabel}>Ver</span>
              </button>
              <button
                className={`${styles.actionButton} ${styles.downloadButton}`}
                onClick={() => handleDownload(pdf.url, pdf.name, 'PDF')}
                disabled={!canDownload}
                title={canDownload ? 'Descargar PDF' : 'Sin permisos para descargar documentos'}
              >
                <span className={styles.buttonIcon}>⬇️</span>
                <span className={styles.buttonLabel}>Descargar</span>
              </button>
            </div>
          </div>
        )}

        {/* Editable File Actions */}
        {editable && (
          <div className={styles.fileGroup}>
            <div className={styles.fileHeader}>
              <span className={styles.fileIcon}>{getFileIcon(editable.type)}</span>
              <span className={styles.fileName}>{editable.name}</span>
              <span className={styles.fileSize}>{editable.size || '1.8 MB'}</span>
            </div>
            <div className={styles.buttons}>
              <button
                className={`${styles.actionButton} ${styles.downloadButton}`}
                onClick={() => handleDownload(editable.url, editable.name, getFileLabel(editable.type))}
                disabled={!canDownload}
                title={canDownload ? `Descargar ${getFileLabel(editable.type)}` : 'Sin permisos para descargar documentos'}
              >
                <span className={styles.buttonIcon}>⬇️</span>
                <span className={styles.buttonLabel}>
                  Descargar {getFileLabel(editable.type)}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Permissions Info */}
      {(!canView || !canDownload) && (
        <div className={styles.permissionsInfo}>
          <span className={styles.warningIcon}>⚠️</span>
          <div className={styles.permissionsText}>
            {!canView && !canDownload && (
              <p>No tienes permisos para ver ni descargar documentos.</p>
            )}
            {!canView && canDownload && (
              <p>Puedes descargar pero no ver documentos en línea.</p>
            )}
            {canView && !canDownload && (
              <p>Puedes ver pero no descargar documentos.</p>
            )}
            <p className={styles.permissionsHint}>
              Contacta al administrador del proyecto para solicitar permisos adicionales.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentActions;

