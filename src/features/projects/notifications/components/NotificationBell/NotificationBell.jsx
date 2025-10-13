/**
 * Notification Bell Component
 * Displays notification icon with badge and quick preview modal
 * @module features/projects/notifications/components/NotificationBell
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks';
import NotificationModal from '../NotificationModal/NotificationModal';
import styles from './NotificationBell.module.css';

const NotificationBell = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bellRef = useRef(null);
  const { unreadCount, notifications, markAsRead, markAllAsRead, loading } = useNotifications({
    autoRefresh: true,
    refreshInterval: 30000,
  });

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setIsModalOpen(false);
  };

  const handleViewAll = () => {
    setIsModalOpen(false);
    navigate('/notifications');
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div className={styles.notificationBell} ref={bellRef}>
      <button
        className={`${styles.bellButton} ${isModalOpen ? styles.active : ''} ${unreadCount > 0 ? styles.hasNotifications : ''}`}
        onClick={handleToggleModal}
        title="Notificaciones"
        aria-label="Notificaciones"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isModalOpen && (
        <NotificationModal
          notifications={notifications.slice(0, 5)}
          loading={loading}
          onNotificationClick={handleNotificationClick}
          onViewAll={handleViewAll}
          onMarkAllAsRead={handleMarkAllAsRead}
          unreadCount={unreadCount}
        />
      )}
    </div>
  );
};

export default NotificationBell;

