import { useState, useRef, useEffect } from 'react';
import Button from '../Button';
import styles from './ExportDropdown.module.css';

const ExportDropdown = ({ onExportPDF, onExportExcel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className={styles.exportButtons} ref={ref}>
      <div className={styles.dropdown}>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          className={styles.exportButton}
          onClick={() => setOpen((v) => !v)}
        >
          📤 Exportar
        </Button>
        {open && (
          <div className={styles.dropdownContent}>
            <button
              className={styles.dropdownItem}
              title="Genera un documento PDF con el listado de proyectos"
              onClick={() => {
                setOpen(false);
                onExportPDF && onExportPDF();
              }}
            >
              <span className={styles.icon}>📄</span>
              <span className={styles.label}>Exportar a PDF</span>
            </button>
            <button
              className={styles.dropdownItem}
              title="Genera una hoja de cálculo Excel con datos detallados"
              onClick={() => {
                setOpen(false);
                onExportExcel && onExportExcel();
              }}
            >
              <span className={styles.icon}>📊</span>
              <span className={styles.label}>Exportar a Excel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportDropdown;


