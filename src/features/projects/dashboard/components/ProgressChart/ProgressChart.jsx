/**
 * ProgressChart component
 * Shows project progress with discipline breakdown
 * @module features/projects/dashboard/components/ProgressChart
 */

import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../../../constants';
import Card from '../../../../../components/shared/Card';
import styles from './ProgressChart.module.css';

const ProgressChart = ({ overall, disciplines }) => {
  return (
    <Card className={styles.chartCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Avance por Disciplina</h3>
        <div className={styles.overallProgress}>
          <span className={styles.overallLabel}>Total:</span>
          <span className={styles.overallValue}>{overall}%</span>
        </div>
      </div>

      <div className={styles.chart}>
        {disciplines.map((discipline) => (
          <div key={discipline.name} className={styles.disciplineRow}>
            <div className={styles.disciplineInfo}>
              <div 
                className={styles.disciplineColor}
                style={{ backgroundColor: DISCIPLINE_COLORS[discipline.name] }}
              />
              <span className={styles.disciplineName}>
                {DISCIPLINE_LABELS[discipline.name]}
              </span>
            </div>
            
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${discipline.progress}%`,
                    backgroundColor: DISCIPLINE_COLORS[discipline.name],
                  }}
                />
              </div>
              <span className={styles.progressValue}>{discipline.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressChart;

