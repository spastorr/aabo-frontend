/**
 * WorkloadChart - Visual representation of team workload
 * @module features/projects/resource-planning/components/WorkloadChart
 */

import styles from './WorkloadChart.module.css';

const WorkloadChart = ({ teamWorkload }) => {
  if (!teamWorkload || teamWorkload.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay datos de carga de trabajo disponibles</p>
      </div>
    );
  }

  const getUtilizationColor = (utilization) => {
    if (utilization >= 95) return 'danger'; // Overloaded
    if (utilization >= 85) return 'warning'; // Near capacity
    if (utilization >= 70) return 'success'; // Optimal
    return 'info'; // Underutilized
  };

  const getUtilizationLabel = (utilization) => {
    if (utilization >= 95) return 'Sobrecargado';
    if (utilization >= 85) return 'Alta carga';
    if (utilization >= 70) return 'Óptimo';
    return 'Disponible';
  };

  return (
    <div className={styles.chart}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.danger}`}></div>
          <span>≥95% Sobrecargado</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.warning}`}></div>
          <span>85-94% Alta carga</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.success}`}></div>
          <span>70-84% Óptimo</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendDot} ${styles.info}`}></div>
          <span>&lt;70% Disponible</span>
        </div>
      </div>

      <div className={styles.barList}>
        {teamWorkload.map(member => {
          const utilizationColor = getUtilizationColor(member.utilization);
          const utilizationLabel = getUtilizationLabel(member.utilization);

          return (
            <div key={member.id} className={styles.barItem}>
              <div className={styles.memberInfo}>
                <div className={styles.avatar}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.memberDetails}>
                  <div className={styles.memberName}>{member.name}</div>
                  <div className={styles.memberRole}>{member.discipline}</div>
                </div>
              </div>

              <div className={styles.barContainer}>
                <div className={styles.barBackground}>
                  <div
                    className={`${styles.barFill} ${styles[utilizationColor]}`}
                    style={{ width: `${Math.min(member.utilization, 100)}%` }}
                  >
                    {member.utilization > 15 && (
                      <span className={styles.barLabel}>
                        {member.allocatedHours}h / {member.totalHours}h
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.percentage}>
                  <span className={styles.percentageValue}>{member.utilization.toFixed(1)}%</span>
                  <span className={`${styles.percentageStatus} ${styles[utilizationColor]}`}>
                    {utilizationLabel}
                  </span>
                </div>
              </div>

              <div className={styles.availableHours}>
                <span className={styles.availableValue}>{member.availableHours}h</span>
                <span className={styles.availableLabel}>disponibles</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkloadChart;

