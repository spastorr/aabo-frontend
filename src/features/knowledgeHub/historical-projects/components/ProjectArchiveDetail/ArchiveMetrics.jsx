/**
 * ArchiveMetrics - Display detailed project metrics
 * @module features/knowledgeHub/historical-projects/components/ProjectArchiveDetail
 */

import PropTypes from 'prop-types';
import { formatCurrency } from '../../../../../utils';
import styles from './ArchiveMetrics.module.css';

const ArchiveMetrics = ({ metrics }) => {
  const {
    budgetByDiscipline = [],
    schedulePerformance = {},
    qualityMetrics = {},
    resourceUtilization = {}
  } = metrics;

  return (
    <div className={styles.container}>
      {/* Budget by Discipline */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>💰 Presupuesto por Disciplina</h3>
        {budgetByDiscipline.length > 0 ? (
          <div className={styles.budgetTable}>
            <div className={styles.budgetHeader}>
              <div className={styles.budgetCell}>Disciplina</div>
              <div className={styles.budgetCell}>Presupuestado</div>
              <div className={styles.budgetCell}>Real</div>
              <div className={styles.budgetCell}>Variación</div>
            </div>
            {budgetByDiscipline.map((item, index) => {
              const variance = ((item.actual - item.budgeted) / item.budgeted) * 100;
              return (
                <div key={index} className={styles.budgetRow}>
                  <div className={styles.budgetCell}>{item.discipline}</div>
                  <div className={styles.budgetCell}>{formatCurrency(item.budgeted)}</div>
                  <div className={styles.budgetCell}>{formatCurrency(item.actual)}</div>
                  <div
                    className={styles.budgetCell}
                    style={{ color: variance > 0 ? 'var(--color-error)' : 'var(--color-success)' }}
                  >
                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.emptyMessage}>No hay datos de presupuesto disponibles</p>
        )}
      </div>

      {/* Schedule Performance */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📅 Desempeño de Cronograma</h3>
        {Object.keys(schedulePerformance).length > 0 ? (
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Duración Planificada</div>
              <div className={styles.metricValue}>{schedulePerformance.plannedDuration} meses</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Duración Real</div>
              <div className={styles.metricValue}>{schedulePerformance.actualDuration} meses</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Variación</div>
              <div
                className={styles.metricValue}
                style={{
                  color: schedulePerformance.actualDuration > schedulePerformance.plannedDuration
                    ? 'var(--color-error)'
                    : 'var(--color-success)'
                }}
              >
                {schedulePerformance.actualDuration - schedulePerformance.plannedDuration} meses
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Índice de Desempeño</div>
              <div className={styles.metricValue}>
                {((schedulePerformance.plannedDuration / schedulePerformance.actualDuration) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>No hay datos de cronograma disponibles</p>
        )}
      </div>

      {/* Quality Metrics */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>✅ Métricas de Calidad</h3>
        {Object.keys(qualityMetrics).length > 0 ? (
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Documentos Aprobados</div>
              <div className={styles.metricValue}>
                {qualityMetrics.approvedFirstTime}%
              </div>
              <div className={styles.metricSubtext}>Primera revisión</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Promedio Revisiones</div>
              <div className={styles.metricValue}>
                {qualityMetrics.avgRevisions}
              </div>
              <div className={styles.metricSubtext}>Por documento</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>RFIs Resueltos</div>
              <div className={styles.metricValue}>
                {qualityMetrics.rfisResolved}%
              </div>
              <div className={styles.metricSubtext}>Dentro del plazo</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Satisfacción Cliente</div>
              <div className={styles.metricValue}>
                {qualityMetrics.clientSatisfaction}/5
              </div>
              <div className={styles.metricSubtext}>Rating final</div>
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>No hay datos de calidad disponibles</p>
        )}
      </div>

      {/* Resource Utilization */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>👥 Utilización de Recursos</h3>
        {Object.keys(resourceUtilization).length > 0 ? (
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Horas Planificadas</div>
              <div className={styles.metricValue}>
                {resourceUtilization.plannedHours?.toLocaleString()} hrs
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Horas Reales</div>
              <div className={styles.metricValue}>
                {resourceUtilization.actualHours?.toLocaleString()} hrs
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Eficiencia</div>
              <div className={styles.metricValue}>
                {((resourceUtilization.plannedHours / resourceUtilization.actualHours) * 100).toFixed(1)}%
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Tamaño Promedio Equipo</div>
              <div className={styles.metricValue}>
                {resourceUtilization.avgTeamSize} personas
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.emptyMessage}>No hay datos de recursos disponibles</p>
        )}
      </div>
    </div>
  );
};

ArchiveMetrics.propTypes = {
  metrics: PropTypes.shape({
    budgetByDiscipline: PropTypes.arrayOf(
      PropTypes.shape({
        discipline: PropTypes.string,
        budgeted: PropTypes.number,
        actual: PropTypes.number
      })
    ),
    schedulePerformance: PropTypes.shape({
      plannedDuration: PropTypes.number,
      actualDuration: PropTypes.number
    }),
    qualityMetrics: PropTypes.shape({
      approvedFirstTime: PropTypes.number,
      avgRevisions: PropTypes.number,
      rfisResolved: PropTypes.number,
      clientSatisfaction: PropTypes.number
    }),
    resourceUtilization: PropTypes.shape({
      plannedHours: PropTypes.number,
      actualHours: PropTypes.number,
      avgTeamSize: PropTypes.number
    })
  })
};

export default ArchiveMetrics;

