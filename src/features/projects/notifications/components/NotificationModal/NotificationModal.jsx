/**
 * Notification Modal Component
 * Quick preview modal for recent notifications
 * @module features/projects/notifications/components/NotificationModal
 */

import { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES } from '../../../../../services/mocks';
import styles from './NotificationModal.module.css';

/**
 * Get icon for notification type
 */
const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.DOCUMENT:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case NOTIFICATION_TYPES.TRANSMITTAL:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case NOTIFICATION_TYPES.RFI:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case NOTIFICATION_TYPES.COMMENT:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case NOTIFICATION_TYPES.MENTION:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
        </svg>
      );
    case NOTIFICATION_TYPES.APPROVAL:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case NOTIFICATION_TYPES.DEADLINE:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case NOTIFICATION_TYPES.SYSTEM:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        </svg>
      );
  }
};

/**
 * Get time ago string
 */
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const notifTime = new Date(timestamp);
  const diffMs = now - notifTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return notifTime.toLocaleDateString('es-ES');
};

const NotificationModal = ({
  notifications = [],
  loading = false,
  onNotificationClick,
  onViewAll,
  onMarkAllAsRead,
  unreadCount = 0,
}) => {
  if (loading) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Notificaciones</h3>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando notificaciones...</p>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Notificaciones</h3>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <p>No hay notificaciones</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3 className={styles.modalTitle}>
          Notificaciones
          {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
        </h3>
        {unreadCount > 0 && (
          <button className={styles.markAllButton} onClick={onMarkAllAsRead}>
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className={styles.modalBody}>
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''} ${
                styles[`priority-${notification.priority}`]
              }`}
              onClick={() => onNotificationClick(notification)}
            >
              <div className={`${styles.notificationIcon} ${styles[`icon-${notification.type}`]}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <h4 className={styles.notificationTitle}>{notification.title}</h4>
                  <span className={styles.notificationTime}>{getTimeAgo(notification.timestamp)}</span>
                </div>
                <p className={styles.notificationMessage}>{notification.message}</p>
                {notification.author && (
                  <span className={styles.notificationAuthor}>Por {notification.author.name}</span>
                )}
              </div>
              {!notification.read && <div className={styles.unreadDot}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.modalFooter}>
        <button className={styles.viewAllButton} onClick={onViewAll}>
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;

