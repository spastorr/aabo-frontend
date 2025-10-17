/**
 * DashboardSettings - Simple widget visibility configuration
 * @module features/projects/dashboard/components/DashboardSettings
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import styles from './DashboardSettings.module.css';

const DashboardSettings = ({ isOpen, onClose, projectId, onSave }) => {
  const [widgets, setWidgets] = useState({
    showProgress: true,
    showDocuments: true,
    showBudget: true,
    showTeam: true,
    showSCurve: true,
    showBudgetChart: true,
    showRecentActivity: true,
    showQuickActions: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    if (isOpen && projectId) {
      const savedSettings = localStorage.getItem(`dashboard_settings_${projectId}`);
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.widgets) {
            setWidgets(parsed.widgets);
          }
        } catch (err) {
          console.error('Error loading settings:', err);
        }
      }
    }
  }, [isOpen, projectId]);

  const handleToggle = (widgetKey) => {
    setWidgets(prev => ({
      ...prev,
      [widgetKey]: !prev[widgetKey],
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    const settings = { widgets };
    localStorage.setItem(`dashboard_settings_${projectId}`, JSON.stringify(settings));
    
    if (onSave) {
      onSave(settings);
    }
    
    setHasChanges(false);
    onClose();
  };

  const handleSelectAll = () => {
    setWidgets({
      showProgress: true,
      showDocuments: true,
      showBudget: true,
      showTeam: true,
      showSCurve: true,
      showBudgetChart: true,
      showRecentActivity: true,
      showQuickActions: true,
    });
    setHasChanges(true);
  };

  const handleDeselectAll = () => {
    setWidgets({
      showProgress: false,
      showDocuments: false,
      showBudget: false,
      showTeam: false,
      showSCurve: false,
      showBudgetChart: false,
      showRecentActivity: false,
      showQuickActions: false,
    });
    setHasChanges(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="⚙️ Personalizar Dashboard"
      size="medium"
      footer={
        <div className={styles.footer}>
          <div className={styles.footerActions}>
            <Button variant="outline" size="small" onClick={handleSelectAll}>
              Mostrar Todos
            </Button>
            <Button variant="outline" size="small" onClick={handleDeselectAll}>
              Ocultar Todos
            </Button>
          </div>
          <div className={styles.footerButtons}>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Guardar
            </Button>
          </div>
        </div>
      }
    >
      <div className={styles.content}>
        <p className={styles.description}>
          Selecciona qué elementos deseas mostrar en tu dashboard
        </p>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>KPIs</h3>
          <div className={styles.widgetList}>
            <WidgetToggle
              label="Avance General"
              icon="📊"
              checked={widgets.showProgress}
              onChange={() => handleToggle('showProgress')}
            />
            <WidgetToggle
              label="Documentos Aprobados"
              icon="📄"
              checked={widgets.showDocuments}
              onChange={() => handleToggle('showDocuments')}
            />
            <WidgetToggle
              label="Presupuesto Ejecutado"
              icon="💰"
              checked={widgets.showBudget}
              onChange={() => handleToggle('showBudget')}
            />
            <WidgetToggle
              label="Miembros del Equipo"
              icon="👥"
              checked={widgets.showTeam}
              onChange={() => handleToggle('showTeam')}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Gráficos</h3>
          <div className={styles.widgetList}>
            <WidgetToggle
              label="Curva S"
              icon="📈"
              checked={widgets.showSCurve}
              onChange={() => handleToggle('showSCurve')}
            />
            <WidgetToggle
              label="Análisis de Presupuesto"
              icon="💹"
              checked={widgets.showBudgetChart}
              onChange={() => handleToggle('showBudgetChart')}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Secciones</h3>
          <div className={styles.widgetList}>
            <WidgetToggle
              label="Actividad Reciente"
              icon="🕐"
              checked={widgets.showRecentActivity}
              onChange={() => handleToggle('showRecentActivity')}
            />
            <WidgetToggle
              label="Acciones Rápidas"
              icon="⚡"
              checked={widgets.showQuickActions}
              onChange={() => handleToggle('showQuickActions')}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Widget toggle component
const WidgetToggle = ({ label, icon, checked, onChange }) => {
  return (
    <div className={styles.widgetItem}>
      <div className={styles.widgetInfo}>
        <span className={styles.widgetIcon}>{icon}</span>
        <label className={styles.widgetLabel}>{label}</label>
      </div>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
};

DashboardSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectId: PropTypes.string,
  onSave: PropTypes.func,
};

export default DashboardSettings;
