# 📊 AABO Frontend - Sistema de Control de Documentos

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764abc?logo=redux)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.4-007fff?logo=mui)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-ff6384?logo=chartdotjs)
![License](https://img.shields.io/badge/License-Proprietary-red)
![Status](https://img.shields.io/badge/Status-Active-success)
![Last Updated](https://img.shields.io/badge/Last%20Updated-January%202025-blue)

Sistema de gestión integral de documentos de ingeniería desarrollado con React + Vite. Proporciona un entorno completo para el control y seguimiento de proyectos de ingeniería, gestión documental, recursos, y conocimiento organizacional con más de **8,000 líneas de código** y **180+ componentes** implementados.

## 📊 Estado Actual del Proyecto

### ✅ Funcionalidades Completamente Implementadas
- **📁 Gestión de Proyectos**: Portfolio, Dashboard, Gantt Charts, Cierre de proyectos
- **📄 Control Documental (LMD)**: Lista maestra, trazabilidad, exportación, filtros avanzados
- **🔄 RFI Management**: Sistema completo de Request for Information con workflow
- **📮 Transmittals**: Gestión de transmitales con tracking y estados
- **⏱️ Timesheets**: Control de horas con sistema de aprobaciones
- **👥 Resource Planning**: Planificación y asignación de recursos
- **📚 Knowledge Hub**: Proyectos históricos, estándares, búsqueda unificada
- **🔔 Notificaciones**: Sistema en tiempo real con centro de notificaciones
- **📈 Lecciones Aprendidas**: Captura y reutilización de conocimiento

### 🏗️ Infraestructura Técnica
- **180+ Directorios** estructurados por funcionalidad
- **150+ Archivos** de código organizados
- **15+ Módulos** de funcionalidades principales
- **18+ Componentes** compartidos reutilizables
- **5 Contexts** para gestión de estado
- **8 Módulos** de constantes y configuraciones
- **30+ Utilidades** y helpers
- **50+ Entidades** de datos mock para desarrollo

## 📸 Vista Previa

🚀 **Repositorio**: [github.com/spastorr/aabo-frontend](https://github.com/spastorr/aabo-frontend)

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Deployment](#-deployment)
- [Contribución](#-contribución)
- [Autor](#-autor)

## 🚀 Características Principales

### 📁 Gestión de Proyectos ✅
- **Dashboard Interactivo**: Visualización en tiempo real de KPIs y métricas del proyecto
- **Portfolio de Proyectos**: Gestión completa del ciclo de vida de proyectos con grid responsivo
- **Gráficos de Progreso**: Curvas S, análisis de costos y presupuestos
- **Actividad Reciente**: Seguimiento de cambios y actualizaciones
- **Gantt Charts**: Visualización de cronogramas con Chart.js
- **Cierre de Proyectos**: Modal para archivar proyectos completados

### 📄 Control Documental (LMD) ✅
- **Lista Maestra de Documentos**: Control centralizado de toda la documentación
- **Trazabilidad Completa**: Sistema completo de seguimiento de revisiones y versiones
- **Descargas en Lote**: Exportación de documentos en múltiples formatos (PDF, Excel)
- **Desglose de Costos**: Análisis detallado por disciplina y fase
- **Filtros Avanzados**: Búsqueda por estado, disciplina, tipo y más
- **Quick Add**: Modal rápido para agregar documentos
- **Edit Document**: Modal para edición de documentos existentes
- **Document Traceability**: Sistema completo de trazabilidad documental

### 🔄 RFI (Request for Information) ✅
- **Gestión de Consultas**: Creación y seguimiento de RFIs
- **Seguimiento de Estado**: Workflow completo desde solicitud hasta cierre
- **Historial de Comunicaciones**: Registro de todas las interacciones
- **Notificaciones**: Alertas automáticas de cambios de estado
- **Estados**: OPEN → PENDING_RESPONSE → ANSWERED → CLOSED
- **Prioridades**: HIGH, MEDIUM, LOW con indicadores visuales

### 📮 Transmittals ✅
- **Bandeja de Entrada/Salida**: Gestión de transmitales internos y externos
- **Generación Automática**: Creación de documentos de transmital
- **Tracking**: Seguimiento de entrega y acuse de recibo
- **Documentos Asociados**: Vinculación con LMD
- **Estados**: DRAFT, SENT, RECEIVED, ACKNOWLEDGED

### ⏱️ Control de Horas (Timesheets) ✅
- **Registro de Horas**: Control de tiempo por proyecto y actividad
- **Cola de Aprobación**: Sistema de aprobación jerárquico
- **Resumen y Reportes**: Análisis de horas trabajadas
- **Estados**: PENDING, APPROVED, REJECTED, BILLED
- **Filtros por Usuario**: Vista personalizada por empleado

### 👥 Planificación de Recursos ✅
- **Asignación de Personal**: Gestión de recursos por proyecto
- **Vista de Capacidad**: Análisis de carga de trabajo
- **Gráficos de Workload**: Visualización de distribución de horas
- **Optimización**: Balanceo de recursos entre proyectos

### 📚 Knowledge Hub ✅
- **Búsqueda Unificada**: Motor de búsqueda contextual en toda la plataforma
- **Proyectos Históricos**: Archivo de proyectos completados
  - Filtros por cliente, tipo, año
  - Etiquetas y categorización
  - Métricas y lecciones aprendidas
  - Vista Gantt histórica para análisis temporal
- **Estándares y Normativas**:
  - Guías internas de la organización
  - Normas externas (ISO, ASME, API, etc.)
  - Control de versiones de estándares
  - Estándares por cliente
- **Gestión de Conocimiento**: Reutilización de información de proyectos pasados

### 🔔 Sistema de Notificaciones ✅
- **Notificaciones en Tiempo Real**: Alertas instantáneas de cambios importantes
- **Centro de Notificaciones**: Panel centralizado para gestión de alertas
- **Configuración Personalizada**: Preferencias de notificación por usuario
- **Historial de Notificaciones**: Registro completo de todas las alertas
- **Campanita en Topbar**: Badge con contador de notificaciones sin leer
- **Modal Rápido**: Vista previa de las últimas 5 notificaciones

### 📊 Dashboard Avanzado ✅
- **Widgets Personalizables**: Configuración flexible de métricas
- **Resumen de Documentos Pendientes**: Vista rápida de tareas urgentes
- **Gráficos Interactivos**: Visualizaciones dinámicas con Chart.js
- **Filtros Dinámicos**: Análisis granular de datos del proyecto
- **Lessons Learned Widget**: Widget para capturar lecciones aprendidas

### 📈 Lecciones Aprendidas ✅
- **Captura de Lecciones**: Sistema para documentar experiencias del proyecto
- **Categorización**: Organización por tipo de lección
- **Impacto y Severidad**: Clasificación de la importancia
- **Reutilización**: Aplicación en futuros proyectos

## 🛠️ Stack Tecnológico

### Core
- **React 19.2.0**: Biblioteca principal para UI con las últimas características
- **React DOM 19.2.0**: Renderizado del DOM
- **Vite 7.1.7**: Build tool y dev server ultrarrápido
- **React Router DOM 7.9.4**: Navegación y routing avanzado

### Estado y Datos
- **Redux Toolkit 2.9.0**: Gestión de estado global optimizada
- **React Redux 9.2.0**: Integración Redux con React
- **Axios 1.12.2**: Cliente HTTP para API calls con interceptores

### UI y Estilos
- **Material-UI 7.3.4**: Sistema de componentes moderno
- **@mui/material 7.3.4**: Componentes Material Design
- **@mui/icons-material 7.3.4**: Iconografía Material Design
- **@emotion/react 11.14.0**: CSS-in-JS para Material-UI
- **@emotion/styled 11.14.1**: Styled components
- **Chart.js 4.5.0**: Gráficos y visualizaciones avanzadas
- **React Chart.js 2 5.3.0**: Integración React para Chart.js
- **CSS Modules**: Estilos con scope local
- **CSS Variables**: Sistema de diseño con temas

### Exportación y Utilidades
- **jsPDF 3.0.3**: Generación de documentos PDF
- **xlsx 0.18.5**: Exportación a Excel

### Desarrollo
- **TypeScript Support**: Preparado para migración a TypeScript
- **@types/react 19.1.16**: Tipos TypeScript para React
- **@types/react-dom 19.1.9**: Tipos TypeScript para React DOM

### Calidad de Código
- **ESLint 9.36.0**: Linting de código JavaScript/React
- **ESLint Plugin React Hooks 5.2.0**: Reglas específicas para hooks
- **ESLint Plugin React Refresh 0.4.22**: Hot reloading
- **Globals 16.4.0**: Variables globales para entornos

### Deployment
- **gh-pages 6.3.0**: Deploy automático a GitHub Pages

## 📦 Instalación

### Prerrequisitos
- Node.js 16.x o superior
- npm 8.x o superior

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/spastorr/aabo-frontend.git
cd aabo-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` basado en los archivos de ejemplo:
```bash
# Copia el archivo de desarrollo
cp .env.development .env.local
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Genera build de producción
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

## 📂 Estructura del Proyecto

```
aabo-frontend/
├── src/
│   ├── components/          # Componentes reutilizables ✅
│   │   ├── layouts/        # Layouts principales ✅
│   │   │   ├── AppLayout/  # Layout principal con sidebar contextual
│   │   │   └── AuthLayout/ # Layout para autenticación
│   │   └── shared/         # Componentes compartidos ✅
│   │       ├── Avatar/     # Avatar de usuario
│   │       ├── Badge/      # Indicadores de estado
│   │       ├── Button/     # Botones con variantes
│   │       ├── Card/       # Tarjetas base
│   │       ├── EmptyState/ # Estados vacíos
│   │       ├── ExportDropdown/ # Dropdown de exportación
│   │       ├── Input/      # Campos de entrada
│   │       ├── Modal/      # Modales reutilizables
│   │       ├── MultiSelect/ # Selección múltiple
│   │       ├── PageHeader/ # Headers de página
│   │       ├── SearchBar/  # Barra de búsqueda
│   │       ├── Select/     # Selectores
│   │       ├── Spinner/    # Indicadores de carga
│   │       ├── Table/      # Tablas de datos
│   │       ├── Tabs/       # Sistema de pestañas
│   │       └── Tooltip/    # Tooltips informativos
│   ├── features/           # Módulos por funcionalidad ✅
│   │   ├── projects/       # Gestión de proyectos ✅
│   │   │   ├── dashboard/  # Dashboard con KPIs y gráficos
│   │   │   ├── gantt/      # Cronogramas y Gantt charts
│   │   │   ├── lmd/        # Lista Maestra de Documentos
│   │   │   ├── lessons-learned/ # Lecciones aprendidas
│   │   │   ├── notifications/ # Sistema de notificaciones
│   │   │   ├── portfolio/  # Portfolio de proyectos
│   │   │   ├── reports/    # Reportes y análisis
│   │   │   ├── resource-planning/ # Planificación de recursos
│   │   │   ├── rfi/        # Request for Information
│   │   │   ├── timesheets/ # Control de horas
│   │   │   └── transmittals/ # Transmitales
│   │   ├── knowledgeHub/   # Centro de conocimiento ✅
│   │   │   ├── historical-projects/ # Proyectos históricos
│   │   │   ├── search/     # Búsqueda unificada
│   │   │   └── standards/  # Estándares y normativas
│   │   ├── auth/           # Autenticación ✅
│   │   ├── profile/        # Perfil de usuario ✅
│   │   └── settings/       # Configuraciones ✅
│   ├── contexts/           # React Contexts ✅
│   │   ├── AuthContext.jsx # Estado de autenticación
│   │   ├── LayoutContext.jsx # Estado del layout
│   │   ├── NotificationContext.jsx # Sistema de notificaciones
│   │   ├── PermissionsContext.jsx # Sistema de permisos
│   │   ├── ProjectContext.jsx # Estado del proyecto
│   │   └── ThemeContext.jsx # Temas claro/oscuro
│   ├── hooks/              # Custom hooks ✅
│   │   ├── useDebounce.js  # Hook para debounce
│   │   └── useLocalStorage.js # Hook para localStorage
│   ├── routes/             # Configuración de rutas ✅
│   │   ├── AdminRoute.jsx  # Rutas administrativas
│   │   ├── ProjectRoute.jsx # Rutas de proyecto
│   │   └── ProtectedRoute.jsx # Rutas protegidas
│   ├── services/           # APIs y servicios ✅
│   │   ├── apiClient.js    # Cliente HTTP centralizado
│   │   ├── documentsApi.js # API de documentos
│   │   ├── knowledgeHubApi.js # API del Knowledge Hub
│   │   ├── projectsApi.js  # API de proyectos
│   │   ├── resourcesApi.js # API de recursos
│   │   ├── timesheetsApi.js # API de timesheets
│   │   └── mocks/          # Datos de prueba ✅
│   │       ├── dashboardMocks.js
│   │       ├── documentMocks.js
│   │       ├── ganttMocks.js
│   │       ├── knowledgeHubMocks.js
│   │       ├── notificationMocks.js
│   │       ├── projectMocks.js
│   │       ├── reportsMocks.js
│   │       ├── resourceMocks.js
│   │       ├── rfiMocks.js
│   │       ├── timesheetMocks.js
│   │       ├── transmittalMocks.js
│   │       └── userMocks.js
│   ├── store/              # Redux store y slices ✅
│   │   ├── authSlice.js    # Slice de autenticación
│   │   ├── projectSlice.js # Slice de proyectos
│   │   └── store.js        # Configuración del store
│   ├── styles/             # Estilos globales ✅
│   │   ├── reset.css       # Reset de estilos
│   │   └── variables.css   # Variables CSS globales
│   ├── utils/              # Utilidades y helpers ✅
│   │   ├── chartHelpers.js # Helpers para gráficos
│   │   ├── codeGenerator.js # Generadores de códigos
│   │   ├── currencyFormatter.js # Formateo de moneda
│   │   ├── dateFormatter.js # Formateo de fechas
│   │   ├── documentStatusUtils.js # Utilidades de estado
│   │   ├── documentTraceabilityUtils.js # Trazabilidad
│   │   ├── errorHandlers.js # Manejo de errores
│   │   ├── exportUtils.js  # Utilidades de exportación
│   │   ├── fileHandlers.js # Manejo de archivos
│   │   ├── permissions.js  # Utilidades de permisos
│   │   └── validators.js   # Validadores
│   ├── constants/          # Constantes de la aplicación ✅
│   │   ├── colors.js       # Paleta de colores
│   │   ├── disciplines.js  # Disciplinas de ingeniería
│   │   ├── documentLifecycle.js # Ciclo de vida de documentos
│   │   ├── documentTypes.js # Tipos de documentos
│   │   ├── permissions.js  # Permisos del sistema
│   │   ├── petroCodes.js   # Códigos Petro
│   │   ├── projectTypes.js # Tipos de proyectos
│   │   ├── roles.js        # Roles de usuario
│   │   ├── statuses.js     # Estados del sistema
│   │   └── timesheetStatuses.js # Estados de timesheets
│   ├── config/             # Configuración ✅
│   │   ├── api.config.js   # Configuración de API
│   │   ├── app.config.js   # Configuración de la app
│   │   └── env.js          # Variables de entorno
│   ├── App.jsx             # Componente principal ✅
│   ├── App.css             # Estilos principales ✅
│   ├── main.jsx            # Punto de entrada ✅
│   └── index.css           # Estilos globales ✅
├── public/                 # Archivos estáticos ✅
├── dist/                   # Build de producción
└── assets/                 # Assets compilados ✅

```

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño moderno basado en:

- **CSS Variables**: Sistema de tokens para colores, espaciado y tipografía
- **CSS Modules**: Estilos con scope local para evitar colisiones
- **Temas**: Soporte para tema claro y oscuro
- **Responsive Design**: Mobile-first approach
- **Iconografía**: Lucide React para iconos consistentes

### Paleta de Colores Principal
- **Primary**: Sistema de azules para acciones principales
- **Success**: Verde para estados positivos
- **Warning**: Naranja para advertencias
- **Error**: Rojo para errores y acciones destructivas
- **Neutral**: Escala de grises para backgrounds y texto

## 🔐 Autenticación y Permisos

- Sistema de roles: Admin, Project Manager, Engineer, Viewer
- Rutas protegidas basadas en permisos
- Context API para gestión de sesión
- Persistencia de estado con localStorage

## 📡 Integración con Backend

El proyecto está preparado para integrarse con un backend REST API:

- **API Client**: Cliente HTTP centralizado con Axios
- **Interceptores**: Manejo automático de tokens y errores
- **Mock Data**: Datos de prueba para desarrollo sin backend
- **Configuración por Entorno**: URLs diferentes para dev/prod

### Endpoints Principales
```
/api/projects          # Gestión de proyectos
/api/documents         # Control documental (LMD)
/api/rfi               # Consultas técnicas
/api/transmittals      # Transmitales
/api/timesheets        # Control de horas
/api/resources         # Planificación de recursos
/api/knowledge-hub     # Knowledge Hub
```

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

El build genera archivos optimizados en la carpeta `dist/`:
- HTML, CSS y JS minificados
- Code splitting automático
- Asset optimization
- Source maps
- Tree shaking para bundles más pequeños

### Opciones de Deploy

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```
- Deploy automático desde GitHub
- Preview deployments para PRs
- Variables de entorno integradas

#### Netlify
```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```
- Deploy continuo desde GitHub
- Formularios y funciones serverless
- CDN global incluido

#### GitHub Pages
```bash
# Configura vite.config.js con base: '/aabo-frontend/'
npm run build
# Usa GitHub Actions para deploy automático
```

#### Docker (Nuevo)
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Variables de Entorno
Configura estas variables en tu plataforma de deploy:
- `VITE_API_URL`: URL de tu backend API
- `VITE_ENV`: production | development
- `VITE_APP_NAME`: Nombre de la aplicación
- `VITE_VERSION`: Versión de la aplicación

## 🆕 Últimas Actualizaciones

### v2.2.0 (Enero 2025) - ACTUALIZACIÓN MAYOR

#### 🆕 Nuevas Funcionalidades
- **📋 Sistema de Trazabilidad Avanzado**: Seguimiento completo de documentos con historial de cambios detallado
- **🔔 RFI Alerts & Traceability**: Sistema de alertas RFI con trazabilidad completa y notificaciones inteligentes
- **📮 Transmittal Traceability**: Trazabilidad de transmitales con estados avanzados y seguimiento en tiempo real
- **📚 Lecciones Aprendidas Widget**: Widget integrado en dashboard para capturar conocimiento del proyecto
- **📊 Exportación Mejorada**: Dropdown de exportación con múltiples formatos (PDF, Excel, CSV)
- **📅 MS Project Gantt Integration**: Soporte completo para importar/exportar cronogramas MS Project
- **⚡ Quick Add Document**: Modal rápido para agregar documentos al LMD sin interrumpir el flujo de trabajo
- **✏️ Edit Document Modal**: Modal mejorado para edición de documentos con validaciones avanzadas
- **🏭 Petro Codes Integration**: Códigos Petro integrados en el sistema para proyectos petroleros
- **🔧 Debug Gantt Chart**: Herramientas de debug para cronogramas con análisis detallado
- **📋 Enhanced Transmittals**: Vista completa de transmitales con filtros avanzados y búsqueda inteligente

#### 🛠️ Mejoras Técnicas
- **Performance Optimizations**: Optimizaciones de rendimiento en componentes críticos
- **Enhanced Error Handling**: Manejo de errores mejorado con mensajes más descriptivos
- **Better UX/UI**: Mejoras en la experiencia de usuario y interfaz
- **Code Quality**: Refactoring de código para mejor mantenibilidad
- **Documentation**: Documentación técnica actualizada y mejorada

#### 📈 Funcionalidades Base (v2.1.0)
- **✅ Sistema Completo Implementado**: Más de 8,000 líneas de código y 180+ componentes
- **✅ Knowledge Hub Completo**: Proyectos históricos, estándares y búsqueda unificada
- **✅ Sistema de Trazabilidad Documental**: Seguimiento completo de documentos
- **✅ Sistema de Notificaciones Avanzado**: Centro de notificaciones en tiempo real
- **✅ Lecciones Aprendidas**: Sistema para capturar y reutilizar conocimiento
- **✅ Exportación Avanzada**: PDF y Excel con jsPDF y xlsx
- **✅ Gantt Charts**: Visualización de cronogramas con Chart.js
- **✅ RFI Management**: Sistema completo de Request for Information
- **✅ Transmittals System**: Gestión de transmitales con tracking
- **✅ Timesheets**: Control de horas con aprobaciones
- **✅ Resource Planning**: Planificación y asignación de recursos

### v2.0.0 (Enero 2025) - Base Sólida
- **React 19.2.0**: Migración a la última versión de React
- **Material-UI 7.3.4**: Integración completa del sistema de componentes
- **Chart.js 4.5.0**: Nuevos gráficos interactivos y visualizaciones
- **Sistema de Notificaciones**: Centro de notificaciones en tiempo real
- **Dashboard Personalizable**: Widgets configurables por usuario
- **Mejoras de Performance**: Optimizaciones de bundle y carga
- **Docker Support**: Containerización para deployment

### Características Destacadas
- **Responsive Design Mejorado**: Mejor experiencia en dispositivos móviles
- **Accesibilidad**: Cumplimiento con estándares WCAG 2.1
- **PWA Ready**: Preparado para Progressive Web App
- **TypeScript Support**: Preparado para migración a TypeScript
- **CSS Modules**: Estilos encapsulados y mantenibles
- **Mock Data Completo**: Datos de prueba para desarrollo sin backend

## 📚 Documentación Adicional

El proyecto incluye documentación detallada en markdown:

- `PROJECT_STRUCTURE.md`: Arquitectura completa y organización del código
- `PROJECT_SUMMARY.md`: Resumen ejecutivo del proyecto y setup
- `PROGRESS_REPORT.md`: Reporte de progreso y funcionalidades implementadas
- `SETUP_GUIDE.md`: Guía detallada de configuración y desarrollo
- `QUICK_START.md`: Guía de inicio rápido
- `DOCUMENT_LIFECYCLE_GUIDE.md`: Ciclo de vida de documentos
- `DOCUMENT_TRACEABILITY_SYSTEM.md`: Sistema de trazabilidad documental
- `KNOWLEDGE_HUB_IMPLEMENTATION.md`: Implementación completa del Knowledge Hub
- `LANDING_PAGE_GUIDE.md`: Documentación de landing page
- `PORTFOLIO_FEATURE.md`: Especificaciones del feature de portfolio
- `TRANSMITTALS_IMPLEMENTATION.md`: Sistema de transmitales
- `CURSOR_GUIDELINES.md`: Guías de desarrollo y mejores prácticas
- `NOTIFICATIONS_SYSTEM_SUMMARY.md`: Sistema de notificaciones en tiempo real
- `UI_IMPROVEMENTS.md`: Mejoras de interfaz de usuario
- `CSS_THEME_UPDATE_SUMMARY.md`: Actualizaciones del sistema de temas
- `MODERN_DESIGN_UPDATE.md`: Actualizaciones del diseño moderno
- `DASHBOARD_CONFIG_MVP.md`: Configuración del dashboard MVP

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Código
- Usa CSS Modules para estilos
- Sigue la estructura de carpetas establecida
- Documenta componentes complejos
- Escribe commits descriptivos en español

## 📝 Licencia

Este proyecto es propietario de AABO Engineering.

## 👨‍💻 Autor

**Santiago Pastor**
- Email: spastorr@gmail.com
- GitHub: [@spastorr](https://github.com/spastorr)

## 📞 Soporte

Para soporte o consultas sobre el proyecto, contacta a través de:
- Email: spastorr@gmail.com
- Issues en GitHub

---

Desarrollado con ❤️ para AABO Engineering
