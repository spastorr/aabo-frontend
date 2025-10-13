/**
 * Notification List Component
 * Reusable component for displaying a list of notifications
 * @module features/projects/notifications/components/NotificationList
 */

import { NOTIFICATION_TYPES } from '../../../../../services/mocks';
import styles from './NotificationList.module.css';

/**
 * Get icon for notification type
 */
const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.DOCUMENT:
      return '📄';
    case NOTIFICATION_TYPES.TRANSMITTAL:
      return '📦';
    case NOTIFICATION_TYPES.RFI:
      return '❓';
    case NOTIFICATION_TYPES.COMMENT:
      return '💬';
    case NOTIFICATION_TYPES.MENTION:
      return '@';
    case NOTIFICATION_TYPES.APPROVAL:
      return '✓';
    case NOTIFICATION_TYPES.DEADLINE:
      return '⏰';
    case NOTIFICATION_TYPES.SYSTEM:
      return 'ℹ️';
    default:
      return '🔔';
  }
};

const NotificationList = ({ notifications = [], onNotificationClick, loading = false }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando notificaciones...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay notificaciones</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
          onClick={() => onNotificationClick?.(notification)}
        >
          <div className={styles.icon}>{getNotificationIcon(notification.type)}</div>
          <div className={styles.content}>
            <h4 className={styles.title}>{notification.title}</h4>
            <p className={styles.message}>{notification.message}</p>
          </div>
          {!notification.read && <div className={styles.badge}></div>}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;

