/**
 * TimesheetSummary - Display summary statistics for timesheets
 * @module features/projects/timesheets/components/TimesheetSummary
 */

import { formatCurrency } from '../../../../../utils';
import styles from './TimesheetSummary.module.css';

const TimesheetSummary = ({ summary }) => {
  if (!summary) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando resumen...</p>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total de Horas',
      value: summary.totalHours,
      suffix: 'hrs',
      icon: '⏱️',
      color: 'primary',
    },
    {
      label: 'Horas Aprobadas',
      value: summary.approvedHours,
      suffix: 'hrs',
      icon: '✅',
      color: 'success',
    },
    {
      label: 'Horas Pendientes',
      value: summary.pendingHours,
      suffix: 'hrs',
      icon: '⏳',
      color: 'warning',
    },
    {
      label: 'Costo Total',
      value: formatCurrency(summary.totalCost),
      suffix: '',
      icon: '💰',
      color: 'info',
    },
  ];

  const counts = [
    {
      label: 'Total Registros',
      value: summary.entriesCount,
      color: 'gray',
    },
    {
      label: 'Aprobados',
      value: summary.approvedCount,
      color: 'success',
    },
    {
      label: 'Pendientes',
      value: summary.pendingCount,
      color: 'warning',
    },
    {
      label: 'Rechazados',
      value: summary.rejectedCount,
      color: 'danger',
    },
  ];

  return (
    <div className={styles.summary}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stat.value}{stat.suffix && <span className={styles.suffix}> {stat.suffix}</span>}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.countsSection}>
        <h4 className={styles.countsTitle}>Distribución de Registros</h4>
        <div className={styles.countsGrid}>
          {counts.map((count, index) => (
            <div key={index} className={styles.countItem}>
              <div className={`${styles.countDot} ${styles[count.color]}`}></div>
              <span className={styles.countLabel}>{count.label}:</span>
              <span className={styles.countValue}>{count.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetSummary;

