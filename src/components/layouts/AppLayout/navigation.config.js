/**
 * Navigation configuration
 * Defines the structure of the main navigation menu
 * @module components/layouts/AppLayout/navigation.config
 */

// Navigation when NO project is selected (Portfolio level)
export const portfolioNavigation = [
  {
    title: 'CONTROL DE PROYECTOS',
    items: [
      {
        path: '/projects',
        label: 'Portafolio',
        icon: '📁',
      },
    ],
  },
  {
    title: 'Notificaciones',
    items: [
      {
        path: '/notifications',
        label: 'Todas las Notificaciones',
        icon: '🔔',
      },
    ],
  },
  {
    title: 'Biblioteca Técnica',
    items: [
      {
        path: '/knowledge-hub',
        label: 'Resumen',
        icon: '📚',
      },
      {
        path: '/knowledge-hub/search',
        label: 'Búsqueda',
        icon: '🔍',
      },
      {
        path: '/knowledge-hub/historical-projects',
        label: 'Proyectos Históricos',
        icon: '📖',
      },
      {
        path: '/knowledge-hub/standards',
        label: 'Estándares',
        icon: '📋',
      },
    ],
  },
  // {
  //   title: 'Administración',
  //   items: [
  //     {
  //       path: '/admin/users',
  //       label: 'Usuarios',
  //       icon: '👤',
  //     },
  //     {
  //       path: '/admin/clients',
  //       label: 'Clientes',
  //       icon: '🏢',
  //     },
  //     {
  //       path: '/admin/config',
  //       label: 'Configuración',
  //       icon: '⚙️',
  //     },
  //   ],
  // },
];

// Navigation when a project IS selected (Project workspace)
export const getProjectNavigation = (projectId) => [
  {
    title: null, // No section title since project banner shows "Proyecto Actual"
    items: [
      {
        path: '/projects',
        label: '← Volver al Portafolio',
        icon: '📁',
      },
      {
        path: `/projects/${projectId}/dashboard`,
        label: 'Dashboard',
        icon: '📊',
      },
      {
        path: `/projects/${projectId}/lmd`,
        label: 'Lista Maestra de Documentos',
        icon: '📄',
      },
      {
        path: `/projects/${projectId}/transmittals`,
        label: 'Transmittals',
        icon: '📤',
      },
      {
        path: `/projects/${projectId}/rfi`,
        label: 'RFI',
        icon: '❓',
      },
      {
        path: `/projects/${projectId}/timesheets`,
        label: 'Planillas',
        icon: '⏱️',
      },
      {
        path: `/projects/${projectId}/resources`,
        label: 'Recursos',
        icon: '👥',
      },
    ],
  },
  {
    title: 'Notificaciones',
    items: [
      {
        path: '/notifications',
        label: 'Todas las Notificaciones',
        icon: '🔔',
      },
    ],
  },
];

// For backward compatibility
export const navigationConfig = portfolioNavigation;

