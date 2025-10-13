/**
 * RecentActivity component
 * Shows recent project activities and updates
 * @module features/projects/dashboard/components/RecentActivity
 */

import { useState } from 'react';
import Card from '../../../../../components/shared/Card';
import Modal from '../../../../../components/shared/Modal';
import { formatDateTime, getRelativeTime } from '../../../../../utils';
import styles from './RecentActivity.module.css';

const ActivityItem = ({ activity, isInModal = false }) => {
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
    <div className={`${styles.activityItem} ${isInModal ? styles.modalActivityItem : ''}`}>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mostrar solo las primeras 5 actividades en la tarjeta
  const displayedActivities = activities?.slice(0, 5) || [];
  const hasMore = activities && activities.length > 5;

  return (
    <>
      <Card className={styles.activityCard}>
        <div className={styles.header}>
          <h3 className={styles.title}>Actividad Reciente</h3>
          {hasMore && (
            <button 
              className={styles.viewAllButton}
              onClick={() => setIsModalOpen(true)}
            >
              Ver todo ({activities.length})
            </button>
          )}
        </div>

        <div className={styles.activityList}>
          {displayedActivities.length > 0 ? (
            displayedActivities.map((activity) => (
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

      {/* Modal para mostrar todas las actividades */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Historial de Actividad"
        size="large"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalActivityList}>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} isInModal={true} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📭</span>
                <p>No hay actividad registrada</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecentActivity;

