/**
 * ProjectListHeader component
 * Header for the project list view showing column titles
 * @module features/projects/portfolio/components/ProjectListHeader
 */

import styles from './ProjectListHeader.module.css';

const ProjectListHeader = () => {
  return (
    <div className={styles.listHeader}>
      <div className={styles.column}>Proyecto</div>
      <div className={styles.column}>Cliente</div>
      <div className={styles.column}>Fecha Inicio</div>
      <div className={styles.column}>Fecha Fin</div>
      <div className={styles.column}>Avance</div>
      <div className={styles.column}>Presupuesto</div>
      <div className={styles.column}>Estado</div>
    </div>
  );
};

export default ProjectListHeader;

