/**
 * Notifications Page
 * Full page for managing all notifications
 * @module features/projects/notifications/NotificationsPage
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from './hooks';
import { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES } from '../../../services/mocks';
import PageHeader from '../../../components/shared/PageHeader';
import styles from './NotificationsPage.module.css';

/**
 * Get icon for notification type
 */
const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.DOCUMENT:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case NOTIFICATION_TYPES.TRANSMITTAL:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case NOTIFICATION_TYPES.RFI:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case NOTIFICATION_TYPES.COMMENT:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case NOTIFICATION_TYPES.MENTION:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
        </svg>
      );
    case NOTIFICATION_TYPES.APPROVAL:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case NOTIFICATION_TYPES.DEADLINE:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case NOTIFICATION_TYPES.SYSTEM:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        </svg>
      );
  }
};

/**
 * Format timestamp
 */
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

/**
 * Get priority badge color
 */
const getPriorityColor = (priority) => {
  switch (priority) {
    case NOTIFICATION_PRIORITIES.URGENT:
      return 'error';
    case NOTIFICATION_PRIORITIES.HIGH:
      return 'warning';
    case NOTIFICATION_PRIORITIES.MEDIUM:
      return 'info';
    default:
      return 'default';
  }
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications({
    autoRefresh: true,
  });

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleDelete = (e, notificationId) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
      deleteNotification(notificationId);
    }
  };

  const handleMarkAsRead = (e, notificationId) => {
    e.stopPropagation();
    markAsRead(notificationId);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (filterType !== 'all' && notification.type !== filterType) return false;
    if (filterRead === 'unread' && notification.read) return false;
    if (filterRead === 'read' && !notification.read) return false;
    return true;
  });

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey;
    if (date.toDateString() === today.toDateString()) {
      groupKey = 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = 'Ayer';
    } else if (date > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
      groupKey = 'Esta semana';
    } else {
      groupKey = 'Anteriores';
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(notification);
    return groups;
  }, {});

  const groupOrder = ['Hoy', 'Ayer', 'Esta semana', 'Anteriores'];

  return (
    <div className={styles.page}>
      <PageHeader
        title="Notificaciones"
        subtitle={`${unreadCount} notificaciones sin leer`}
      />

      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Estado</label>
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${filterRead === 'all' ? styles.active : ''}`}
                onClick={() => setFilterRead('all')}
              >
                Todas
              </button>
              <button
                className={`${styles.filterButton} ${filterRead === 'unread' ? styles.active : ''}`}
                onClick={() => setFilterRead('unread')}
              >
                Sin leer ({unreadCount})
              </button>
              <button
                className={`${styles.filterButton} ${filterRead === 'read' ? styles.active : ''}`}
                onClick={() => setFilterRead('read')}
              >
                Leídas
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Tipo</label>
            <select
              className={styles.filterSelect}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value={NOTIFICATION_TYPES.DOCUMENT}>Documentos</option>
              <option value={NOTIFICATION_TYPES.TRANSMITTAL}>Transmittals</option>
              <option value={NOTIFICATION_TYPES.RFI}>RFIs</option>
              <option value={NOTIFICATION_TYPES.COMMENT}>Comentarios</option>
              <option value={NOTIFICATION_TYPES.MENTION}>Menciones</option>
              <option value={NOTIFICATION_TYPES.APPROVAL}>Aprobaciones</option>
              <option value={NOTIFICATION_TYPES.DEADLINE}>Vencimientos</option>
              <option value={NOTIFICATION_TYPES.SYSTEM}>Sistema</option>
            </select>
          </div>

          {unreadCount > 0 && (
            <button className={styles.markAllButton} onClick={markAllAsRead}>
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Notifications Stats */}
        {!loading && notifications.length > 0 && (
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{notifications.length}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{unreadCount}</span>
              <span className={styles.statLabel}>Sin leer</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{notifications.length - unreadCount}</span>
              <span className={styles.statLabel}>Leídas</span>
            </div>
          </div>
        )}

        {/* Notifications */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando notificaciones...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <h3>No hay notificaciones</h3>
            <p>
              {notifications.length === 0
                ? 'No tienes notificaciones pendientes'
                : 'No hay notificaciones que coincidan con los filtros seleccionados'
              }
            </p>
            {notifications.length > 0 && (
              <button
                className={styles.clearFiltersButton}
                onClick={() => {
                  setFilterType('all');
                  setFilterRead('all');
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className={styles.notificationGroups}>
            {groupOrder.map((groupKey) => {
              const groupNotifications = groupedNotifications[groupKey];
              if (!groupNotifications || groupNotifications.length === 0) return null;

              return (
                <div key={groupKey} className={styles.notificationGroup}>
                  <h3 className={styles.groupTitle}>{groupKey}</h3>
                  <div className={styles.notificationList}>
                    {groupNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className={`${styles.notificationIcon} ${styles[`icon-${notification.type}`]}`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className={styles.notificationContent}>
                          <div className={styles.notificationHeader}>
                            <h4 className={styles.notificationTitle}>{notification.title}</h4>
                            <span className={`${styles.priorityBadge} ${styles[`priority-${notification.priority}`]}`}>
                              {notification.priority}
                            </span>
                          </div>

                          <p className={styles.notificationMessage}>{notification.message}</p>

                          <div className={styles.notificationFooter}>
                            {notification.author && (
                              <span className={styles.notificationAuthor}>
                                Por {notification.author.name}
                              </span>
                            )}
                            <span className={styles.notificationTime}>
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>

                        <div className={styles.notificationActions}>
                          {!notification.read && (
                            <button
                              className={styles.actionButton}
                              onClick={(e) => handleMarkAsRead(e, notification.id)}
                              title="Marcar como leída"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                          )}
                          <button
                            className={styles.actionButton}
                            onClick={(e) => handleDelete(e, notification.id)}
                            title="Eliminar"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>

                        {!notification.read && <div className={styles.unreadIndicator}></div>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

