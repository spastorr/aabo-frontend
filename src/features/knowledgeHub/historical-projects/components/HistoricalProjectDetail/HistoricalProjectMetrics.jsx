/**
 * HistoricalProjectMetrics - Shows project closure metrics and KPIs
 * @module features/knowledgeHub/historical-projects/components/HistoricalProjectDetail
 */

import { formatCurrency, formatPercentage } from '../../../../../utils';
import styles from './HistoricalProjectMetrics.module.css';

const HistoricalProjectMetrics = ({ metrics, budget, spent }) => {
  if (!metrics) {
    return (
      <div className={styles.empty}>
        <p>No hay métricas disponibles para este proyecto.</p>
      </div>
    );
  }

  const { budgetByDiscipline, schedulePerformance, qualityMetrics, resourceUtilization } = metrics;

  return (
    <div className={styles.container}>
      {/* Budget by Discipline */}
      {budgetByDiscipline && budgetByDiscipline.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>💰 Presupuesto por Disciplina</h3>
          <div className={styles.budgetTable}>
            <div className={styles.tableHeader}>
              <span>Disciplina</span>
              <span>Presupuestado</span>
              <span>Ejecutado</span>
              <span>Variación</span>
              <span>% Ejecutado</span>
            </div>
            {budgetByDiscipline.map((item, index) => {
              const variance = item.actual - item.budgeted;
              const percentage = (item.actual / item.budgeted) * 100;
              const isOverBudget = variance > 0;
              
              return (
                <div key={index} className={styles.tableRow}>
                  <span className={styles.disciplineName}>{item.discipline}</span>
                  <span>{formatCurrency(item.budgeted)}</span>
                  <span>{formatCurrency(item.actual)}</span>
                  <span className={isOverBudget ? styles.negative : styles.positive}>
                    {isOverBudget ? '+' : ''}{formatCurrency(variance)}
                  </span>
                  <span>
                    <div className={styles.progressBar}>
                      <div 
                        className={`${styles.progressFill} ${percentage > 100 ? styles.overBudget : ''}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    {formatPercentage(percentage / 100, false)}
                  </span>
                </div>
              );
            })}
            <div className={styles.tableFooter}>
              <span><strong>Total</strong></span>
              <span><strong>{formatCurrency(budget)}</strong></span>
              <span><strong>{formatCurrency(spent)}</strong></span>
              <span className={spent > budget ? styles.negative : styles.positive}>
                <strong>
                  {spent > budget ? '+' : ''}{formatCurrency(spent - budget)}
                </strong>
              </span>
              <span><strong>{formatPercentage(spent / budget, false)}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Performance */}
      {schedulePerformance && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📅 Desempeño del Cronograma</h3>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Duración Planeada</p>
              <p className={styles.metricValue}>{schedulePerformance.plannedDuration} meses</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Duración Real</p>
              <p className={styles.metricValue}>{schedulePerformance.actualDuration} meses</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Variación</p>
              <p className={`${styles.metricValue} ${
                schedulePerformance.actualDuration <= schedulePerformance.plannedDuration 
                  ? styles.positive 
                  : styles.negative
              }`}>
                {schedulePerformance.actualDuration - schedulePerformance.plannedDuration} meses
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quality Metrics */}
      {qualityMetrics && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>✨ Métricas de Calidad</h3>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Aprobados Primera Vez</p>
              <p className={styles.metricValue}>{qualityMetrics.approvedFirstTime}%</p>
              <p className={styles.metricSubtext}>De documentos aprobados sin revisión</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Promedio de Revisiones</p>
              <p className={styles.metricValue}>{qualityMetrics.avgRevisions}</p>
              <p className={styles.metricSubtext}>Revisiones por documento</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>RFIs Resueltos</p>
              <p className={styles.metricValue}>{qualityMetrics.rfisResolved}%</p>
              <p className={styles.metricSubtext}>De RFIs cerrados</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Satisfacción del Cliente</p>
              <p className={styles.metricValue}>{qualityMetrics.clientSatisfaction}/5</p>
              <p className={styles.metricSubtext}>Evaluación final</p>
            </div>
          </div>
        </div>
      )}

      {/* Resource Utilization */}
      {resourceUtilization && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>👥 Utilización de Recursos</h3>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Horas Planeadas</p>
              <p className={styles.metricValue}>
                {resourceUtilization.plannedHours.toLocaleString()}
              </p>
              <p className={styles.metricSubtext}>Horas de ingeniería</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Horas Reales</p>
              <p className={styles.metricValue}>
                {resourceUtilization.actualHours.toLocaleString()}
              </p>
              <p className={styles.metricSubtext}>Horas ejecutadas</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Variación</p>
              <p className={`${styles.metricValue} ${
                resourceUtilization.actualHours <= resourceUtilization.plannedHours 
                  ? styles.positive 
                  : styles.negative
              }`}>
                {((resourceUtilization.actualHours - resourceUtilization.plannedHours) / resourceUtilization.plannedHours * 100).toFixed(1)}%
              </p>
              <p className={styles.metricSubtext}>vs. planeado</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>Tamaño Promedio del Equipo</p>
              <p className={styles.metricValue}>{resourceUtilization.avgTeamSize}</p>
              <p className={styles.metricSubtext}>Personas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalProjectMetrics;

