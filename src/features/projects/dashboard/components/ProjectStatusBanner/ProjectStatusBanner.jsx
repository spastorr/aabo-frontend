/**
 * ProjectStatusBanner component
 * Shows project status prominently in the dashboard
 * @module features/projects/dashboard/components/ProjectStatusBanner
 */

import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '@constants';
import styles from './ProjectStatusBanner.module.css';

const ProjectStatusBanner = ({ project }) => {
  if (!project) return null;

  const getStatusInfo = (status) => {
    switch (status) {
      case PROJECT_STATUS.ACTIVE:
        return {
          icon: '🟢',
          message: 'Proyecto activo - Se pueden realizar modificaciones',
          className: 'active'
        };
      case PROJECT_STATUS.COMPLETED:
        return {
          icon: '✅',
          message: 'Proyecto completado - Solo lectura disponible',
          className: 'completed'
        };
      case PROJECT_STATUS.ON_HOLD:
        return {
          icon: '⏸️',
          message: 'Proyecto en pausa - Modificaciones limitadas',
          className: 'onHold'
        };
      case PROJECT_STATUS.CANCELLED:
        return {
          icon: '❌',
          message: 'Proyecto cancelado - Solo lectura disponible',
          className: 'cancelled'
        };
      default:
        return {
          icon: '❓',
          message: 'Estado desconocido',
          className: 'unknown'
        };
    }
  };

  const statusInfo = getStatusInfo(project.status);

  return (
    <div className={`${styles.notification} ${styles[statusInfo.className]}`}>
      <span className={styles.icon}>{statusInfo.icon}</span>
      <span className={styles.statusText}>
        {PROJECT_STATUS_LABELS[project.status]}
      </span>
      {project.closedAt && (
        <span className={styles.closedDate}>
          • Cerrado: {new Date(project.closedAt).toLocaleDateString('es-EC')}
        </span>
      )}
    </div>
  );
};

export default ProjectStatusBanner;
