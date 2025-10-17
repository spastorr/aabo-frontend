/**
 * LessonsLearned - Displays lessons learned from completed project
 * @module features/knowledgeHub/historical-projects/components/HistoricalProjectDetail
 */

import styles from './LessonsLearned.module.css';

const LessonsLearned = ({ lessons, projectName }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📝</div>
        <h3>No hay lecciones aprendidas registradas</h3>
        <p>Este proyecto no tiene lecciones aprendidas documentadas.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>💡</div>
        <div>
          <h3>Lecciones Aprendidas</h3>
          <p className={styles.subtitle}>
            Conocimientos clave obtenidos durante el desarrollo de {projectName}
          </p>
        </div>
      </div>

      <div className={styles.intro}>
        <p>
          Las lecciones aprendidas son experiencias y conocimientos valiosos obtenidos durante la 
          ejecución del proyecto que pueden ser aplicados en proyectos futuros para mejorar resultados, 
          evitar errores recurrentes y optimizar procesos.
        </p>
      </div>

      <div className={styles.lessonsList}>
        {lessons.map((lesson, index) => (
          <div key={index} className={styles.lessonCard}>
            <div className={styles.lessonNumber}>{index + 1}</div>
            <div className={styles.lessonContent}>
              <p className={styles.lessonText}>{lesson}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerIcon}>ℹ️</span>
          <p>
            Estas lecciones aprendidas están disponibles para consulta en proyectos futuros similares.
            Considera aplicar estos conocimientos en la planificación y ejecución de nuevos proyectos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonsLearned;

