/**
 * RecentActivity component
 * Shows recent project activities and updates
 * @module features/projects/dashboard/components/RecentActivity
 */

import Card from '../../../../../components/shared/Card';
import { formatDateTime, getRelativeTime } from '../../../../../utils';
import styles from './RecentActivity.module.css';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const icons = {
      document: '📄',
      approval: '✅',
      transmittal: '📤',
      rfi: '❓',
      comment: '💬',
      update: '🔄',
    };
    return icons[type] || '📋';
  };

  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>
        {getActivityIcon(activity.type)}
      </div>
      <div className={styles.activityContent}>
        <p className={styles.activityMessage}>{activity.message}</p>
        <div className={styles.activityMeta}>
          <span className={styles.activityUser}>{activity.user}</span>
          <span className={styles.activityDot}>•</span>
          <span className={styles.activityTime} title={formatDateTime(activity.timestamp)}>
            {getRelativeTime(activity.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ activities }) => {
  return (
    <Card className={styles.activityCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Actividad Reciente</h3>
        <button className={styles.viewAllButton}>Ver todo</button>
      </div>

      <div className={styles.activityList}>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📭</span>
            <p>No hay actividad reciente</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;

