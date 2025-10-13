# Sistema de Notificaciones

Sistema completo de notificaciones para la aplicación AABO Frontend.

## 📋 Características

- **Campanita en el Topbar**: Icono de campana con badge que muestra el número de notificaciones sin leer
- **Modal Rápido**: Vista previa de las últimas 5 notificaciones al hacer clic en la campanita
- **Página Completa**: Sección dedicada para ver y gestionar todas las notificaciones
- **Auto-refresh**: Actualización automática de notificaciones cada 30 segundos
- **Filtros**: Filtrar por estado (leídas/sin leer) y tipo de notificación
- **Prioridades**: Sistema de prioridades (baja, media, alta, urgente)
- **Acciones**: Marcar como leída, eliminar, navegar a la acción relacionada

## 🏗️ Estructura

```
notifications/
├── components/
│   ├── NotificationBell/         # Campanita para el Topbar
│   │   ├── NotificationBell.jsx
│   │   ├── NotificationBell.module.css
│   │   └── index.js
│   ├── NotificationModal/        # Modal de vista rápida
│   │   ├── NotificationModal.jsx
│   │   ├── NotificationModal.module.css
│   │   └── index.js
│   ├── NotificationList/         # Lista de notificaciones reutilizable
│   │   ├── NotificationList.jsx
│   │   ├── NotificationList.module.css
│   │   └── index.js
│   ├── NotificationSettings/     # Configuración de notificaciones
│   │   ├── NotificationSettings.jsx
│   │   ├── NotificationSettings.module.css
│   │   └── index.js
│   └── index.js
├── hooks/
│   ├── useNotifications.js       # Hook principal para gestionar notificaciones
│   └── index.js
├── NotificationsPage.jsx         # Página completa de notificaciones
├── NotificationsPage.module.css
├── index.js
└── README.md
```

## 🎯 Tipos de Notificaciones

- **DOCUMENT**: Actualizaciones de documentos
- **TRANSMITTAL**: Transmittals recibidos/enviados
- **RFI**: Solicitudes de información
- **COMMENT**: Nuevos comentarios
- **MENTION**: Menciones del usuario
- **APPROVAL**: Solicitudes de aprobación
- **DEADLINE**: Recordatorios de vencimiento
- **SYSTEM**: Notificaciones del sistema

## 🔔 Niveles de Prioridad

- **LOW**: Baja prioridad (color gris)
- **MEDIUM**: Prioridad media (color azul)
- **HIGH**: Alta prioridad (color naranja)
- **URGENT**: Urgente (color rojo)

## 🚀 Uso

### Componente NotificationBell

```jsx
import NotificationBell from '../features/projects/notifications/components/NotificationBell';

// En el Topbar
<NotificationBell />
```

### Hook useNotifications

```jsx
import { useNotifications } from '../features/projects/notifications/hooks';

const MyComponent = () => {
  const {
    notifications,
    unreadCount,
    total,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh,
    fetchNotifications,
  } = useNotifications({
    autoRefresh: true,        // Opcional: auto-refresh
    refreshInterval: 30000,   // Opcional: intervalo en ms
  });

  return (
    <div>
      <p>Notificaciones sin leer: {unreadCount}</p>
      {notifications.map(notif => (
        <div key={notif.id}>{notif.title}</div>
      ))}
    </div>
  );
};
```

### Página de Notificaciones

Accesible en la ruta: `/notifications`

## 🔧 API Mock

El sistema utiliza datos mock mientras se desarrolla la API real:

```javascript
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationById,
} from '../services/mocks';

// Obtener notificaciones con filtros
const data = await getNotifications({
  unreadOnly: true,
  type: 'document',
  priority: 'high',
  limit: 10,
});

// Marcar como leída
await markNotificationAsRead(notificationId);

// Marcar todas como leídas
await markAllNotificationsAsRead();

// Eliminar notificación
await deleteNotification(notificationId);
```

## 🎨 Personalización

### Estilos

Los componentes utilizan CSS Modules y variables CSS para facilitar la personalización:

```css
/* Variables principales */
--color-primary
--color-error
--color-warning
--color-success
--color-info
--color-bg-primary
--color-bg-secondary
--color-border
--color-text-primary
--color-text-secondary
--color-text-tertiary
```

### Configuración del Auto-refresh

```jsx
// Desactivar auto-refresh
useNotifications({ autoRefresh: false });

// Cambiar intervalo a 60 segundos
useNotifications({ autoRefresh: true, refreshInterval: 60000 });
```

## 📱 Responsive

El sistema es completamente responsive:

- Desktop: Modal flotante desde la campanita
- Tablet: Modal adaptado con menos elementos
- Mobile: Modal en pantalla completa

## 🔄 Integración con la API Real

Para integrar con la API real, actualiza los archivos en `src/services/`:

1. Crea `notificationsApi.js` con las funciones reales
2. Actualiza `useNotifications.js` para usar la API real en lugar de los mocks
3. Implementa WebSockets para notificaciones en tiempo real (opcional)

Ejemplo:

```javascript
// src/services/notificationsApi.js
import apiClient from './apiClient';

export const getNotifications = async (filters) => {
  const response = await apiClient.get('/notifications', { params: filters });
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await apiClient.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

// ... más funciones
```

## 🧪 Testing

Para testear los componentes:

```jsx
import { render, screen } from '@testing-library/react';
import NotificationBell from './NotificationBell';

test('renders notification bell with badge', () => {
  render(<NotificationBell />);
  const badge = screen.getByText(/3/);
  expect(badge).toBeInTheDocument();
});
```

## 📝 TODO

- [ ] Implementar WebSockets para notificaciones en tiempo real
- [ ] Añadir sonido para nuevas notificaciones
- [ ] Implementar preferencias de notificación por usuario
- [ ] Añadir notificaciones push del navegador
- [ ] Implementar paginación en la página de notificaciones
- [ ] Añadir búsqueda de notificaciones
- [ ] Exportar notificaciones a CSV/PDF

## 🤝 Contribuir

Para añadir un nuevo tipo de notificación:

1. Añade el tipo en `NOTIFICATION_TYPES` en `notificationMocks.js`
2. Añade el icono correspondiente en las funciones `getNotificationIcon`
3. Añade los estilos específicos si es necesario
4. Actualiza los filtros en la página de notificaciones

## 📄 Licencia

Este módulo es parte del proyecto AABO Frontend.

