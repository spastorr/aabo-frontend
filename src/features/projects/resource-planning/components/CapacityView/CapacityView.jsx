/**
 * CapacityView - Overall team capacity overview
 * @module features/projects/resource-planning/components/CapacityView
 */

import styles from './CapacityView.module.css';

const CapacityView = ({ capacityData }) => {
  if (!capacityData) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando datos de capacidad...</p>
      </div>
    );
  }

  const utilizationPercentage = (capacityData.totalAllocated / capacityData.totalTeamCapacity) * 100;

  return (
    <div className={styles.capacity}>
      {/* Overall Stats */}
      <div className={styles.overallStats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚡</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{utilizationPercentage.toFixed(1)}%</div>
            <div className={styles.statLabel}>Utilización Promedio</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{capacityData.totalAllocated}h</div>
            <div className={styles.statLabel}>Horas Asignadas</div>
            <div className={styles.statSubtext}>
              de {capacityData.totalTeamCapacity}h totales
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{capacityData.totalAvailable}h</div>
            <div className={styles.statLabel}>Horas Disponibles</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{capacityData.overloadedMembers}</div>
            <div className={styles.statLabel}>Miembros Sobrecargados</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🟢</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{capacityData.availableMembers}</div>
            <div className={styles.statLabel}>Miembros Disponibles</div>
          </div>
        </div>
      </div>

      {/* Capacity by Discipline */}
      <div className={styles.disciplineSection}>
        <h3 className={styles.sectionTitle}>Capacidad por Disciplina</h3>
        <div className={styles.disciplineGrid}>
          {capacityData.byDiscipline.map((disc, index) => {
            const percentage = disc.utilization;
            const getColor = () => {
              if (percentage >= 95) return 'danger';
              if (percentage >= 85) return 'warning';
              if (percentage >= 70) return 'success';
              return 'info';
            };
            const color = getColor();

            return (
              <div key={index} className={styles.disciplineCard}>
                <div className={styles.disciplineHeader}>
                  <div className={styles.disciplineName}>{disc.discipline}</div>
                  <div className={`${styles.disciplineStatus} ${styles[color]}`}>
                    {percentage.toFixed(1)}%
                  </div>
                </div>

                <div className={styles.disciplineBar}>
                  <div
                    className={`${styles.disciplineBarFill} ${styles[color]}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                <div className={styles.disciplineStats}>
                  <span className={styles.disciplineStat}>
                    {disc.allocated}h / {disc.capacity}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {(capacityData.overloadedMembers > 0 || capacityData.availableMembers > 2) && (
        <div className={styles.recommendations}>
          <h4 className={styles.recommendationsTitle}>💡 Recomendaciones</h4>
          <div className={styles.recommendationsList}>
            {capacityData.overloadedMembers > 0 && (
              <div className={styles.recommendation}>
                <span className={styles.recommendationIcon}>⚠️</span>
                <p>
                  Hay <strong>{capacityData.overloadedMembers}</strong> miembro(s) sobrecargado(s). 
                  Considere redistribuir la carga de trabajo o contratar personal adicional.
                </p>
              </div>
            )}
            {capacityData.availableMembers > 2 && (
              <div className={styles.recommendation}>
                <span className={styles.recommendationIcon}>🟢</span>
                <p>
                  Hay <strong>{capacityData.availableMembers}</strong> miembro(s) con capacidad disponible. 
                  Puede asignar nuevas tareas o adelantar trabajo de proyectos futuros.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CapacityView;

