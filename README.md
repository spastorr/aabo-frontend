# 📊 AABO Frontend - Sistema de Control de Documentos

![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646cff?logo=vite)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5.0-764abc?logo=redux)
![License](https://img.shields.io/badge/License-Proprietary-red)
![Status](https://img.shields.io/badge/Status-Active-success)

Sistema de gestión integral de documentos de ingeniería desarrollado con React + Vite. Proporciona un entorno completo para el control y seguimiento de proyectos de ingeniería, gestión documental, recursos, y conocimiento organizacional.

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

### 📁 Gestión de Proyectos
- **Dashboard Interactivo**: Visualización en tiempo real de KPIs y métricas del proyecto
- **Portfolio de Proyectos**: Gestión completa del ciclo de vida de proyectos
- **Gráficos de Progreso**: Curvas S, análisis de costos y presupuestos
- **Actividad Reciente**: Seguimiento de cambios y actualizaciones

### 📄 Control Documental (LMD)
- **Lista Maestra de Documentos**: Control centralizado de toda la documentación
- **Trazabilidad Completa**: Seguimiento de revisiones y versiones
- **Descargas en Lote**: Exportación de documentos en múltiples formatos
- **Desglose de Costos**: Análisis detallado por disciplina y fase
- **Filtros Avanzados**: Búsqueda por estado, disciplina, tipo y más

### 🔄 RFI (Request for Information)
- **Gestión de Consultas**: Creación y seguimiento de RFIs
- **Seguimiento de Estado**: Workflow completo desde solicitud hasta cierre
- **Historial de Comunicaciones**: Registro de todas las interacciones
- **Notificaciones**: Alertas automáticas de cambios de estado

### 📮 Transmittals
- **Bandeja de Entrada/Salida**: Gestión de transmitales internos y externos
- **Generación Automática**: Creación de documentos de transmital
- **Tracking**: Seguimiento de entrega y acuse de recibo
- **Documentos Asociados**: Vinculación con LMD

### ⏱️ Control de Horas (Timesheets)
- **Registro de Horas**: Control de tiempo por proyecto y actividad
- **Cola de Aprobación**: Sistema de aprobación jerárquico
- **Resumen y Reportes**: Análisis de horas trabajadas
- **Estados**: Pendiente, Aprobado, Rechazado, Facturado

### 👥 Planificación de Recursos
- **Asignación de Personal**: Gestión de recursos por proyecto
- **Vista de Capacidad**: Análisis de carga de trabajo
- **Gráficos de Workload**: Visualización de distribución de horas
- **Optimización**: Balanceo de recursos entre proyectos

### 📚 Knowledge Hub
- **Búsqueda Unificada**: Motor de búsqueda contextual en toda la plataforma
- **Proyectos Históricos**: Archivo de proyectos completados
  - Filtros por cliente, tipo, año
  - Etiquetas y categorización
  - Métricas y lecciones aprendidas
- **Estándares y Normativas**:
  - Guías internas de la organización
  - Normas externas (ISO, ASME, API, etc.)
  - Control de versiones de estándares
  - Estándares por cliente
- **Gestión de Conocimiento**: Reutilización de información de proyectos pasados

## 🛠️ Stack Tecnológico

### Core
- **React 18.3.1**: Biblioteca principal para UI
- **Vite 6.0.3**: Build tool y dev server ultrarrápido
- **React Router DOM 7.1.1**: Navegación y routing

### Estado y Datos
- **Redux Toolkit 2.5.0**: Gestión de estado global
- **Axios 1.7.9**: Cliente HTTP para API calls

### UI y Estilos
- **CSS Modules**: Estilos con scope local
- **CSS Variables**: Sistema de diseño con temas
- **Recharts 2.15.0**: Gráficos y visualizaciones
- **Lucide React 0.469.0**: Sistema de iconos moderno

### Calidad de Código
- **ESLint 9.17.0**: Linting de código JavaScript/React
- **Globals 15.14.0**: Variables globales para entornos

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
│   ├── components/          # Componentes reutilizables
│   │   ├── layouts/        # Layouts principales (App, Auth, Admin)
│   │   └── shared/         # Componentes compartidos (Button, Modal, etc.)
│   ├── features/           # Módulos por funcionalidad
│   │   ├── projects/       # Dashboard, LMD, RFI, Transmittals, Timesheets
│   │   ├── knowledgeHub/   # Búsqueda, Históricos, Estándares
│   │   ├── admin/          # Administración del sistema
│   │   ├── auth/           # Autenticación
│   │   └── settings/       # Configuraciones
│   ├── contexts/           # React Contexts (Auth, Theme, Project)
│   ├── hooks/              # Custom hooks
│   ├── routes/             # Configuración de rutas
│   ├── services/           # APIs y servicios
│   │   └── mocks/          # Datos de prueba
│   ├── store/              # Redux store y slices
│   ├── styles/             # Estilos globales y variables
│   ├── utils/              # Utilidades y helpers
│   └── constants/          # Constantes de la aplicación
├── public/                 # Archivos estáticos
└── dist/                   # Build de producción

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

### Opciones de Deploy

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
# netlify.toml ya configurado
npm run build
# Arrastra la carpeta dist/ a Netlify
```

#### GitHub Pages
```bash
# Actualiza vite.config.js con base: '/aabo-frontend/'
npm run build
# Usa gh-pages branch
```

#### Variables de Entorno
Recuerda configurar las variables de entorno en tu plataforma:
- `VITE_API_URL`: URL de tu backend API
- `VITE_ENV`: production | development

## 📚 Documentación Adicional

El proyecto incluye documentación detallada en markdown:

- `PROJECT_STRUCTURE.md`: Arquitectura y organización del código
- `SETUP_GUIDE.md`: Guía detallada de configuración
- `DOCUMENT_LIFECYCLE_GUIDE.md`: Ciclo de vida de documentos
- `KNOWLEDGE_HUB_IMPLEMENTATION.md`: Implementación del Knowledge Hub
- `LANDING_PAGE_GUIDE.md`: Documentación de landing page
- `PORTFOLIO_FEATURE.md`: Feature de portfolio
- `TRANSMITTALS_IMPLEMENTATION.md`: Sistema de transmitales
- `CURSOR_GUIDELINES.md`: Guías de desarrollo

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
