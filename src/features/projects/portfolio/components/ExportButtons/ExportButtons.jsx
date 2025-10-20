/**
 * ExportButtons component
 * Provides export functionality for portfolio data
 * @module features/projects/portfolio/components/ExportButtons
 */

import { useState } from 'react';
import Button from '@components/shared/Button';
import { exportToPDF, exportToExcel, getExportOptions } from '@utils/exportUtils';
import styles from './ExportButtons.module.css';

const ExportButtons = ({ projects, filters, disabled = false }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format) => {
    if (!projects || projects.length === 0) {
      alert('No hay proyectos para exportar');
      return;
    }

    setIsExporting(true);
    
    try {
      if (format === 'pdf') {
        exportToPDF(projects, filters);
      } else if (format === 'excel') {
        exportToExcel(projects, filters);
      }
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = getExportOptions();

  return (
    <div className={styles.exportButtons}>
      <div className={styles.dropdown}>
        <Button
          variant="secondary"
          disabled={disabled || isExporting || projects.length === 0}
          className={styles.exportButton}
        >
          {isExporting ? '⏳ Exportando...' : '📤 Exportar'}
        </Button>
        
        <div className={styles.dropdownContent}>
          {exportOptions.map((option) => (
            <button
              key={option.id}
              className={styles.dropdownItem}
              onClick={() => handleExport(option.id)}
              disabled={disabled || isExporting || projects.length === 0}
              title={option.description}
            >
              <span className={styles.icon}>{option.icon}</span>
              <span className={styles.label}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {projects.length === 0 && (
        <span className={styles.noDataMessage}>
          No hay datos para exportar
        </span>
      )}
    </div>
  );
};

export default ExportButtons;
