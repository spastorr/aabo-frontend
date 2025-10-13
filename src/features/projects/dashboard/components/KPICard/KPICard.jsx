/**
 * KPICard component
 * Displays a key performance indicator with icon and trend
 * @module features/projects/dashboard/components/KPICard
 */

import Card from '../../../../../components/shared/Card';
import styles from './KPICard.module.css';

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendDirection = 'neutral',
  color = 'primary' 
}) => {
  const getTrendIcon = () => {
    if (trendDirection === 'up') return '↗️';
    if (trendDirection === 'down') return '↘️';
    return '→';
  };

  return (
    <Card className={styles.kpiCard}>
      <div className={styles.header}>
        <div className={styles.iconWrapper} data-color={color}>
          <span className={styles.icon}>{icon}</span>
        </div>
        {trend && (
          <div className={`${styles.trend} ${styles[trendDirection]}`}>
            <span className={styles.trendIcon}>{getTrendIcon()}</span>
            <span className={styles.trendValue}>{trend}</span>
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.value}>{value}</h3>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </Card>
  );
};

export default KPICard;

