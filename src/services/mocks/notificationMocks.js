/**
 * Mock data for notifications
 * @module services/mocks/notificationMocks
 */

export const NOTIFICATION_TYPES = {
  DOCUMENT: 'document',
  TRANSMITTAL: 'transmittal',
  RFI: 'rfi',
  COMMENT: 'comment',
  MENTION: 'mention',
  APPROVAL: 'approval',
  DEADLINE: 'deadline',
  SYSTEM: 'system',
};

export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

const mockNotifications = [
  {
    id: 'notif-1',
    type: NOTIFICATION_TYPES.RFI,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    title: 'Nuevo RFI Asignado',
    message: 'Te han asignado el RFI-2024-003 sobre especificaciones de tubería',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
    actionUrl: '/projects/1/rfi',
    actionText: 'Ver RFI',
    author: {
      name: 'Carlos Méndez',
      avatar: null,
    },
  },
  {
    id: 'notif-2',
    type: NOTIFICATION_TYPES.APPROVAL,
    priority: NOTIFICATION_PRIORITIES.URGENT,
    title: 'Documento pendiente de aprobación',
    message: 'El documento P&ID-001-Rev.B requiere tu aprobación urgente',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    actionUrl: '/projects/1/lmd',
    actionText: 'Revisar documento',
    author: {
      name: 'Ana García',
      avatar: null,
    },
  },
  {
    id: 'notif-3',
    type: NOTIFICATION_TYPES.COMMENT,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    title: 'Nuevo comentario',
    message: 'Juan Pérez ha comentado en el documento que estás siguiendo',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
    actionUrl: '/projects/1/lmd',
    actionText: 'Ver comentario',
    author: {
      name: 'Juan Pérez',
      avatar: null,
    },
  },
  {
    id: 'notif-4',
    type: NOTIFICATION_TYPES.TRANSMITTAL,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    title: 'Transmittal recibido',
    message: 'Nuevo transmittal TR-2024-015 recibido del cliente',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    actionUrl: '/projects/1/transmittals',
    actionText: 'Ver transmittal',
    author: {
      name: 'Sistema',
      avatar: null,
    },
  },
  {
    id: 'notif-5',
    type: NOTIFICATION_TYPES.DEADLINE,
    priority: NOTIFICATION_PRIORITIES.URGENT,
    title: 'Vencimiento próximo',
    message: 'El documento MEC-005-Rev.A vence en 2 días',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    actionUrl: '/projects/1/lmd',
    actionText: 'Ver documento',
    author: {
      name: 'Sistema',
      avatar: null,
    },
  },
  {
    id: 'notif-6',
    type: NOTIFICATION_TYPES.MENTION,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    title: 'Te mencionaron',
    message: 'María López te mencionó en un comentario del proyecto',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    actionUrl: '/projects/1/dashboard',
    actionText: 'Ver mención',
    author: {
      name: 'María López',
      avatar: null,
    },
  },
  {
    id: 'notif-7',
    type: NOTIFICATION_TYPES.DOCUMENT,
    priority: NOTIFICATION_PRIORITIES.LOW,
    title: 'Documento actualizado',
    message: 'El documento ELE-003-Rev.C ha sido actualizado',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    actionUrl: '/projects/1/lmd',
    actionText: 'Ver documento',
    author: {
      name: 'Pedro Ramírez',
      avatar: null,
    },
  },
  {
    id: 'notif-8',
    type: NOTIFICATION_TYPES.SYSTEM,
    priority: NOTIFICATION_PRIORITIES.LOW,
    title: 'Actualización del sistema',
    message: 'Nueva versión disponible con mejoras de rendimiento',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    actionUrl: null,
    actionText: null,
    author: {
      name: 'Sistema AABO',
      avatar: null,
    },
  },
];

/**
 * Get all notifications
 */
export const getNotifications = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockNotifications];

      // Filter by read status
      if (filters.unreadOnly) {
        filtered = filtered.filter((n) => !n.read);
      }

      // Filter by type
      if (filters.type) {
        filtered = filtered.filter((n) => n.type === filters.type);
      }

      // Filter by priority
      if (filters.priority) {
        filtered = filtered.filter((n) => n.priority === filters.priority);
      }

      // Limit results
      if (filters.limit) {
        filtered = filtered.slice(0, filters.limit);
      }

      resolve({
        notifications: filtered,
        total: mockNotifications.length,
        unread: mockNotifications.filter((n) => !n.read).length,
      });
    }, 300);
  });
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = (notificationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notification = mockNotifications.find((n) => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
      resolve({ success: true });
    }, 200);
  });
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockNotifications.forEach((n) => {
        n.read = true;
      });
      resolve({ success: true });
    }, 300);
  });
};

/**
 * Delete notification
 */
export const deleteNotification = (notificationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockNotifications.findIndex((n) => n.id === notificationId);
      if (index !== -1) {
        mockNotifications.splice(index, 1);
      }
      resolve({ success: true });
    }, 200);
  });
};

/**
 * Get notification by ID
 */
export const getNotificationById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notification = mockNotifications.find((n) => n.id === id);
      resolve(notification || null);
    }, 100);
  });
};

