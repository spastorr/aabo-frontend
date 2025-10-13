/**
 * DocumentDownloadButtons component
 * Shows download buttons for PDF and editable files
 * @module features/projects/lmd/components/DocumentDownloadButtons
 */

import styles from './DocumentDownloadButtons.module.css';

const DocumentDownloadButtons = ({ files, variant = 'default' }) => {
  if (!files) return null;

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

  const handleDownload = (url, name) => {
    // In a real app, this would trigger actual download
    console.log(`Downloading: ${name} from ${url}`);
    alert(`Descargando: ${name}\n\nEn producción, esto iniciaría la descarga del archivo.`);
  };

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      {files.pdf && (
        <button
          className={styles.downloadButton}
          onClick={() => handleDownload(files.pdf.url, files.pdf.name)}
          title={`Descargar ${files.pdf.name}`}
        >
          <span className={styles.icon}>📄</span>
          <span className={styles.label}>PDF</span>
        </button>
      )}
      {files.editable && (
        <button
          className={styles.downloadButton}
          onClick={() => handleDownload(files.editable.url, files.editable.name)}
          title={`Descargar ${files.editable.name}`}
        >
          <span className={styles.icon}>{getFileIcon(files.editable.type)}</span>
          <span className={styles.label}>{getFileLabel(files.editable.type)}</span>
        </button>
      )}
    </div>
  );
};

export default DocumentDownloadButtons;

