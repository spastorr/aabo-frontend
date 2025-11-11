# AABO Services - Complete Project Structure

## 📋 Overview
This document defines the complete folder structure for AABO Services v2.0, a comprehensive platform for engineering project management with three main modules:
- **Module I**: Project Management
- **Module II**: Knowledge Hub
- **Module III**: Global Administration

## 🏗️ Technology Stack
- **Framework**: React 18+ with Vite
- **Language**: JavaScript (ES6+) with JSDoc for type hints
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **Testing**: Vitest + React Testing Library
- **API**: REST with axios

---

## 📁 Complete Directory Structure

**Legend:**
- ✅ = Fully implemented
- 🚧 = Folder exists, implementation in progress or pending
- No symbol = Documented but not yet created

```
aabo-frontend/
├── .gitignore
├── eslint.config.js
├── vite.config.js
├── package.json
├── package-lock.json
├── README.md
├── index.html                    # Main app entry
├── landing.html                  # Public landing page
│
├── PROJECT_STRUCTURE.md          # This file - Complete architecture
├── PROJECT_SUMMARY.md            # Project overview and summary
├── CURSOR_GUIDELINES.md          # Development guidelines
├── APP_Concept.txt               # Original app concept
├── SETUP_GUIDE.md                # Setup instructions
├── QUICK_START.md                # Quick start guide
├── PROGRESS_REPORT.md            # Development progress tracking
│
├── DOCUMENT_LIFECYCLE_GUIDE.md   # Document lifecycle documentation
├── KNOWLEDGE_HUB_IMPLEMENTATION.md # Knowledge Hub feature docs
├── LANDING_PAGE_GUIDE.md         # Landing page documentation
├── PORTFOLIO_FEATURE.md          # Portfolio feature specs
├── TRANSMITTALS_IMPLEMENTATION.md # Transmittals feature docs
├── CSS_THEME_UPDATE_SUMMARY.md   # Theme updates documentation
├── MODERN_DESIGN_UPDATE.md       # Design system updates
├── UI_IMPROVEMENTS.md            # UI enhancement tracking
├── DIRECTORY_TREE.txt            # Directory structure reference
│
├── public/
│   └── vite.svg
│
└── src/
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # Root component with routing
    ├── App.css                   # Global styles
    ├── index.css                 # Main CSS entry
    │
    ├── assets/                   # Static assets
    │   ├── images/
    │   │   ├── LogoSinFondo.avif # AABO logo
    │   │   └── empty-states/     # Empty state illustrations
    │   ├── icons/                # Icon library
    │   └── react.svg
    │
    ├── components/               # Shared/reusable components
    │   ├── shared/
    │   │   ├── Avatar/           # ✅ Implemented
    │   │   │   ├── Avatar.jsx
    │   │   │   ├── Avatar.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Badge/            # ✅ Implemented
    │   │   │   ├── Badge.jsx
    │   │   │   ├── Badge.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Breadcrumb/       # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── Button/           # ✅ Implemented with tests
    │   │   │   ├── __tests__/
    │   │   │   │   └── Button.test.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── Button.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Card/             # ✅ Implemented
    │   │   │   ├── Card.jsx
    │   │   │   ├── Card.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── DatePicker/       # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── Dropdown/         # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── EmptyState/       # ✅ Implemented
    │   │   │   ├── EmptyState.jsx
    │   │   │   ├── EmptyState.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── ErrorBoundary/    # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── FileUpload/       # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── Input/            # ✅ Implemented
    │   │   │   ├── Input.jsx
    │   │   │   ├── Input.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Modal/            # ✅ Implemented with tests
    │   │   │   ├── __tests__/
    │   │   │   │   └── Modal.test.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   ├── Modal.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Pagination/       # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   ├── SearchBar/        # ✅ Implemented
    │   │   │   ├── SearchBar.jsx
    │   │   │   ├── SearchBar.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Select/           # ✅ Implemented
    │   │   │   ├── Select.jsx
    │   │   │   ├── Select.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Spinner/          # ✅ Implemented
    │   │   │   ├── Spinner.jsx
    │   │   │   ├── Spinner.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Table/            # ✅ Implemented
    │   │   │   ├── Table.jsx
    │   │   │   ├── Table.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Tabs/             # ✅ Implemented
    │   │   │   ├── Tabs.jsx
    │   │   │   ├── Tab.jsx
    │   │   │   ├── Tabs.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── Tooltip/          # 🚧 Folder exists, implementation pending
    │   │   │
    │   │   └── index.js          # Re-exports all shared components
    │   │
    │   └── layouts/              # Layout components
    │       ├── AppLayout/        # ✅ Implemented with tests
    │       │   ├── __tests__/
    │       │   │   └── AppLayout.test.jsx
    │       │   ├── navigation.config.js    # Main navigation structure
    │       │   ├── AppLayout.jsx
    │       │   ├── Sidebar.jsx
    │       │   ├── Topbar.jsx
    │       │   ├── AppLayout.module.css
    │       │   └── index.js
    │       │
    │       ├── AuthLayout/       # 🚧 Folder exists, implementation pending
    │       │
    │       ├── ProjectWorkspaceLayout/  # 🚧 Folder exists, implementation pending
    │       │
    │       └── AdminLayout/      # 🚧 Folder exists, implementation pending
    │
    ├── features/                 # Feature-based modules
    │   │
    │   ├── auth/                 # 🚧 Authentication module (in progress)
    │   │   ├── components/
    │   │   │   ├── LoginForm/    # 🚧 Folder exists
    │   │   │   └── RegisterForm/ # 🚧 Folder exists
    │   │   │
    │   │   └── hooks/            # 🚧 Folder exists (empty)
    │   │
    │   ├── projects/             # --- MÓDULO I: GESTIÓN DE PROYECTOS ---
    │   │   │
    │   │   ├── portfolio/        # ✅ Punto de entrada: Vista de portafolio
    │   │   │   ├── __tests__/
    │   │   │   │   └── PortfolioPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── CreateProjectModal/  # 🚧 Folder exists
    │   │   │   │   │
    │   │   │   │   ├── ProjectCard/     # ✅ Implemented
    │   │   │   │   │   ├── ProjectCard.jsx
    │   │   │   │   │   ├── ProjectCard.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── ProjectFilters/  # ✅ Implemented
    │   │   │   │       ├── ProjectFilters.jsx
    │   │   │   │       ├── ProjectFilters.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   ├── __tests__/
    │   │   │   │   │   └── usePortfolio.test.js
    │   │   │   │   └── usePortfolio.js
    │   │   │   │
    │   │   │   ├── PortfolioPage.jsx
    │   │   │   ├── PortfolioPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── dashboard/        # ✅ Dashboard del proyecto seleccionado
    │   │   │   ├── __tests__/
    │   │   │   │   └── DashboardPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── ChartTabs/        # ✅ Chart tabs component
    │   │   │   │   │   ├── ChartTabs.jsx
    │   │   │   │   │   ├── ChartTabs.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── CostWidget/       # ✅ Cost tracking widget
    │   │   │   │   │   ├── CostWidget.jsx
    │   │   │   │   │   ├── CostBreakdown.jsx
    │   │   │   │   │   ├── CostWidget.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── DisciplineProgress/  # 🚧 Folder exists
    │   │   │   │   │
    │   │   │   │   ├── KPICard/          # ✅ KPI display card
    │   │   │   │   │   ├── KPICard.jsx
    │   │   │   │   │   ├── KPICard.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── ProgressChart/    # ✅ Progress visualizations
    │   │   │   │   │   ├── ProgressChart.jsx
    │   │   │   │   │   ├── ProgressChart.module.css
    │   │   │   │   │   ├── SCurveChart.jsx
    │   │   │   │   │   ├── SCurveChart.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── RecentActivity/   # ✅ Activity feed
    │   │   │   │       ├── RecentActivity.jsx
    │   │   │   │       ├── RecentActivity.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useDashboardData.js
    │   │   │   │
    │   │   │   ├── DashboardPage.jsx
    │   │   │   ├── DashboardPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── lmd/              # ✅ Lista Maestra de Documentos
    │   │   │   ├── __tests__/
    │   │   │   │   └── LMDPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── AddDocumentModal/  # 🚧 Folder exists
    │   │   │   │   │
    │   │   │   │   ├── DocumentDetailModal/  # ✅ Implemented
    │   │   │   │   │   ├── DocumentDetailModal.jsx
    │   │   │   │   │   ├── DocumentDetailModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── LMDFilters/     # ✅ Implemented
    │   │   │   │   │   ├── LMDFilters.jsx
    │   │   │   │   │   ├── LMDFilters.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── LMDTable/       # ✅ Implemented
    │   │   │   │   │   ├── LMDTable.jsx
    │   │   │   │   │   ├── LMDTable.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── StatusBadge/    # ✅ Implemented
    │   │   │   │       ├── StatusBadge.jsx
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useLMD.js
    │   │   │   │
    │   │   │   ├── LMDPage.jsx
    │   │   │   ├── LMDPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── transmittals/     # ✅ Sistema de comunicación
    │   │   │   ├── __tests__/
    │   │   │   │   └── TransmittalsPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── CreateTransmittalModal/  # ✅ Implemented
    │   │   │   │   │   ├── CreateTransmittalModal.jsx
    │   │   │   │   │   ├── CreateTransmittalModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── InboxOutbox/    # ✅ Implemented
    │   │   │   │   │   ├── InboxOutbox.jsx
    │   │   │   │   │   ├── InboxOutbox.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── TransmittalDetailModal/  # ✅ Implemented
    │   │   │   │   │   ├── TransmittalDetailModal.jsx
    │   │   │   │   │   ├── TransmittalDetailModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── TransmittalList/  # ✅ Implemented
    │   │   │   │       ├── TransmittalList.jsx
    │   │   │   │       ├── TransmittalList.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useTransmittals.js
    │   │   │   │
    │   │   │   ├── TransmittalsPage.jsx
    │   │   │   ├── TransmittalsPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── rfi/              # ✅ Request for Information
    │   │   │   ├── __tests__/
    │   │   │   │   └── RFIPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── CreateRFIModal/  # ✅ Implemented
    │   │   │   │   │   ├── CreateRFIModal.jsx
    │   │   │   │   │   ├── CreateRFIModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── RFIDetailModal/  # ✅ Implemented
    │   │   │   │   │   ├── RFIDetailModal.jsx
    │   │   │   │   │   ├── RFIDetailModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── RFIList/        # ✅ Implemented
    │   │   │   │   │   ├── RFIList.jsx
    │   │   │   │   │   ├── RFIList.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── RFIStatusTracker/  # ✅ Implemented
    │   │   │   │       ├── RFIStatusTracker.jsx
    │   │   │   │       ├── RFIStatusTracker.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useRFI.js
    │   │   │   │
    │   │   │   ├── RFIPage.jsx
    │   │   │   ├── RFIPage.module.css
    │   │   │   ├── README.md
    │   │   │   └── index.js
    │   │   │
    │   │   ├── timesheets/       # ✅ Control de horas y costos
    │   │   │   ├── __tests__/
    │   │   │   │   └── TimesheetsPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── ApprovalQueue/  # ✅ Implemented
    │   │   │   │   │   ├── ApprovalQueue.jsx
    │   │   │   │   │   ├── ApprovalQueue.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── TimesheetForm/  # ✅ Implemented
    │   │   │   │   │   ├── TimesheetForm.jsx
    │   │   │   │   │   ├── TimesheetForm.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── TimesheetList/  # ✅ Implemented
    │   │   │   │   │   ├── TimesheetList.jsx
    │   │   │   │   │   ├── TimesheetList.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── TimesheetSummary/  # ✅ Implemented
    │   │   │   │       ├── TimesheetSummary.jsx
    │   │   │   │       ├── TimesheetSummary.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useTimesheets.js
    │   │   │   │
    │   │   │   ├── TimesheetsPage.jsx
    │   │   │   ├── TimesheetsPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── resource-planning/ # ✅ Planificación y asignación de recursos
    │   │   │   ├── __tests__/
    │   │   │   │   └── ResourcesPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── CapacityView/   # ✅ Implemented
    │   │   │   │   │   ├── CapacityView.jsx
    │   │   │   │   │   ├── CapacityView.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── ResourceAssignment/  # ✅ Implemented
    │   │   │   │   │   ├── ResourceAssignment.jsx
    │   │   │   │   │   ├── ResourceAssignment.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── TeamMemberCard/  # 🚧 Folder exists
    │   │   │   │   │
    │   │   │   │   └── WorkloadChart/   # ✅ Implemented
    │   │   │   │       ├── WorkloadChart.jsx
    │   │   │   │       ├── WorkloadChart.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useResources.js
    │   │   │   │
    │   │   │   ├── ResourcesPage.jsx
    │   │   │   ├── ResourcesPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   └── notifications/    # 🚧 Notificaciones del proyecto
    │   │       ├── components/
    │   │       │   ├── NotificationBell/    # 🚧 Folder exists
    │   │       │   ├── NotificationList/    # 🚧 Folder exists
    │   │       │   └── NotificationSettings/  # 🚧 Folder exists
    │   │       │
    │   │       └── hooks/                   # 🚧 Folder exists
    │   │
    │   ├── knowledgeHub/         # --- MÓDULO II: KNOWLEDGE HUB ---
    │   │   ├── KnowledgeHubPage.jsx     # ✅ Main hub page
    │   │   ├── KnowledgeHubPage.module.css
    │   │   ├── index.js
    │   │   │
    │   │   ├── historical-projects/ # ✅ Biblioteca de proyectos históricos
    │   │   │   ├── __tests__/
    │   │   │   │   └── HistoricalProjectsPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── ArchiveFilters/  # ✅ Implemented
    │   │   │   │   │   ├── ArchiveFilters.jsx
    │   │   │   │   │   ├── ArchiveFilters.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── ProjectArchiveDetail/  # ✅ Implemented
    │   │   │   │   │   ├── ProjectArchiveDetail.jsx
    │   │   │   │   │   ├── ProjectArchiveDetail.module.css
    │   │   │   │   │   ├── ArchiveLMD.jsx
    │   │   │   │   │   ├── ArchiveLMD.module.css
    │   │   │   │   │   ├── ArchiveMetrics.jsx
    │   │   │   │   │   ├── ArchiveMetrics.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── ProjectArchiveList/  # ✅ Implemented
    │   │   │   │   │   ├── ProjectArchiveList.jsx
    │   │   │   │   │   ├── ProjectArchiveCard.jsx
    │   │   │   │   │   ├── ProjectArchiveList.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── TagManager/      # ✅ Implemented
    │   │   │   │       ├── TagManager.jsx
    │   │   │   │       ├── TagManager.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useHistoricalProjects.js
    │   │   │   │
    │   │   │   ├── HistoricalProjectsPage.jsx
    │   │   │   ├── HistoricalProjectsPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   ├── standards/        # ✅ Repositorio de estándares
    │   │   │   ├── __tests__/
    │   │   │   │   └── StandardsPage.test.jsx
    │   │   │   │
    │   │   │   ├── components/
    │   │   │   │   ├── ClientStandards/  # ✅ Implemented
    │   │   │   │   │   ├── ClientStandards.jsx
    │   │   │   │   │   ├── ClientProfile.jsx
    │   │   │   │   │   ├── ClientStandards.module.css
    │   │   │   │   │   ├── ClientProfile.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── ExternalNorms/    # ✅ Implemented
    │   │   │   │   │   ├── ExternalNorms.jsx
    │   │   │   │   │   ├── NormsList.jsx
    │   │   │   │   │   ├── ExternalNorms.module.css
    │   │   │   │   │   ├── NormsList.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── InternalGuides/   # ✅ Implemented
    │   │   │   │   │   ├── InternalGuides.jsx
    │   │   │   │   │   ├── GuideList.jsx
    │   │   │   │   │   ├── InternalGuides.module.css
    │   │   │   │   │   ├── GuideList.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   ├── UploadStandardModal/  # ✅ Implemented
    │   │   │   │   │   ├── UploadStandardModal.jsx
    │   │   │   │   │   ├── UploadStandardModal.module.css
    │   │   │   │   │   └── index.js
    │   │   │   │   │
    │   │   │   │   └── VersionControl/   # ✅ Implemented
    │   │   │   │       ├── VersionControl.jsx
    │   │   │   │       ├── VersionControl.module.css
    │   │   │   │       └── index.js
    │   │   │   │
    │   │   │   ├── hooks/
    │   │   │   │   └── useStandards.js
    │   │   │   │
    │   │   │   ├── StandardsPage.jsx
    │   │   │   ├── StandardsPage.module.css
    │   │   │   └── index.js
    │   │   │
    │   │   └── search/           # ✅ Búsqueda inteligente unificada
    │   │       ├── __tests__/
    │   │       │   └── UnifiedSearchPage.test.jsx
    │   │       │
    │   │       ├── components/
    │   │       │   ├── ContextualResults/  # ✅ Implemented
    │   │       │   │   ├── ContextualResults.jsx
    │   │       │   │   ├── ResultsByCategory.jsx
    │   │       │   │   ├── ContextualResults.module.css
    │   │       │   │   ├── ResultsByCategory.module.css
    │   │       │   │   └── index.js
    │   │       │   │
    │   │       │   ├── SearchFilters/    # ✅ Implemented
    │   │       │   │   ├── SearchFilters.jsx
    │   │       │   │   ├── SearchFilters.module.css
    │   │       │   │   └── index.js
    │   │       │   │
    │   │       │   ├── SearchInput/      # ✅ Implemented
    │   │       │   │   ├── SearchInput.jsx
    │   │       │   │   ├── SearchInput.module.css
    │   │       │   │   └── index.js
    │   │       │   │
    │   │       │   └── SearchResults/    # 🚧 Folder exists
    │   │       │
    │   │       ├── hooks/
    │   │       │   └── useSearch.js
    │   │       │
    │   │       ├── UnifiedSearchPage.jsx
    │   │       ├── UnifiedSearchPage.module.css
    │   │       └── index.js
    │   │
    │   └── admin/                # --- MÓDULO III: ADMINISTRACIÓN GLOBAL ---
    │       │
    │       ├── audit-logs/       # 🚧 Auditoría y registros
    │       │   ├── __tests__/
    │       │   ├── components/
    │       │   │   ├── AuditDetailModal/    # 🚧 Folder exists
    │       │   │   ├── AuditFilters/        # 🚧 Folder exists
    │       │   │   └── AuditLogTable/       # 🚧 Folder exists
    │       │   └── hooks/
    │       │
    │       ├── clients/          # 🚧 Administración de clientes
    │       │   ├── __tests__/
    │       │   ├── components/
    │       │   │   ├── ClientList/          # 🚧 Folder exists
    │       │   │   ├── ClientProfile/       # 🚧 Folder exists
    │       │   │   └── CreateClientModal/   # 🚧 Folder exists
    │       │   └── hooks/
    │       │
    │       ├── nomenclature/     # 🚧 Gestor de nomenclatura
    │       │   ├── __tests__/
    │       │   ├── components/
    │       │   │   ├── CodePreview/         # 🚧 Folder exists
    │       │   │   └── NomenclatureRules/   # 🚧 Folder exists
    │       │   └── hooks/
    │       │
    │       ├── system-config/    # 🚧 Configuración del sistema
    │       │   ├── __tests__/
    │       │   ├── components/
    │       │   │   ├── BrandingConfig/      # 🚧 Folder exists
    │       │   │   ├── GeneralSettings/     # 🚧 Folder exists
    │       │   │   └── NotificationConfig/  # 🚧 Folder exists
    │       │   └── hooks/
    │       │
    │       ├── templates/        # 🚧 Biblioteca de plantillas
    │       │   ├── __tests__/
    │       │   ├── components/
    │       │   │   ├── TemplateEditor/      # 🚧 Folder exists
    │       │   │   ├── TemplateList/        # 🚧 Folder exists
    │       │   │   └── UploadTemplateModal/ # 🚧 Folder exists
    │       │   └── hooks/
    │       │
    │       └── users/            # 🚧 Gestión de usuarios, roles y permisos
    │           ├── __tests__/
    │           ├── components/
    │           │   ├── CreateUserModal/     # 🚧 Folder exists
    │           │   ├── EditUserModal/       # 🚧 Folder exists
    │           │   ├── PermissionsMatrix/   # 🚧 Folder exists
    │           │   ├── RoleManager/         # 🚧 Folder exists
    │           │   └── UserList/            # 🚧 Folder exists
    │           └── hooks/
    │
    ├── contexts/                 # ✅ React Context providers
    │   ├── AuthContext.jsx       # ✅ Autenticación global
    │   ├── NotificationContext.jsx # ✅ Notificaciones globales
    │   ├── PermissionsContext.jsx # ✅ Sistema RBAC/ABAC
    │   ├── ProjectContext.jsx    # ✅ Proyecto seleccionado actualmente
    │   └── ThemeContext.jsx      # ✅ Tema (light/dark)
    │
    ├── hooks/                    # Custom hooks globales
    │   ├── useDebounce.js        # ✅ Implemented
    │   └── useLocalStorage.js    # ✅ Implemented
    │
    ├── services/                 # API services y lógica de datos
    │   ├── apiClient.js          # ✅ Configuración base de axios
    │   ├── documentsApi.js       # ✅ Documents API
    │   ├── knowledgeHubApi.js    # ✅ Knowledge Hub API
    │   ├── projectsApi.js        # ✅ Projects API
    │   ├── resourcesApi.js       # ✅ Resources API
    │   ├── timesheetsApi.js      # ✅ Timesheets API
    │   │
    │   └── mocks/                # ✅ Mock data para desarrollo
    │       ├── index.js          # ✅ Mock orchestration
    │       ├── dashboardMocks.js # ✅ Dashboard mock data
    │       ├── documentMocks.js  # ✅ Documents mock data
    │       ├── knowledgeHubMocks.js # ✅ KH mock data
    │       ├── projectMocks.js   # ✅ Projects mock data
    │       ├── resourceMocks.js  # ✅ Resources mock data
    │       ├── rfiMocks.js       # ✅ RFI mock data
    │       ├── timesheetMocks.js # ✅ Timesheets mock data
    │       ├── transmittalMocks.js # ✅ Transmittals mock data
    │       └── userMocks.js      # ✅ Users mock data
    │
    ├── store/                    # Redux store
    │   ├── slices/
    │   │   ├── authSlice.js      # ✅ Auth state management
    │   │   └── projectSlice.js   # ✅ Projects state management
    │   │
    │   └── store.js              # ✅ Store configuration
    │
    ├── routes/                   # ✅ Routing configuration
    │   ├── AdminRoute.jsx        # ✅ HOC para rutas de admin
    │   ├── index.jsx             # ✅ Configuración central de rutas
    │   ├── ProjectRoute.jsx      # ✅ HOC para rutas dentro de proyecto
    │   └── ProtectedRoute.jsx    # ✅ HOC para rutas protegidas
    │
    ├── constants/                # ✅ Constantes de la aplicación
    │   ├── index.js              # ✅ Re-export central
    │   ├── colors.js             # ✅ Mapeo de colores por estado
    │   ├── disciplines.js        # ✅ Procesos, Mecánica, Eléctrica, etc.
    │   ├── documentLifecycle.js  # ✅ Document lifecycle states
    │   ├── documentTypes.js      # ✅ Tipos de documentos
    │   ├── permissions.js        # ✅ Permisos del sistema
    │   ├── projectTypes.js       # ✅ Refinería, Upstream, etc.
    │   ├── roles.js              # ✅ Roles de usuario
    │   ├── statuses.js           # ✅ APR, ACC, CMN, RCH, ELB, etc.
    │   └── timesheetStatuses.js  # ✅ Timesheet status constants
    │
    ├── config/                   # ✅ Configuraciones generales
    │   ├── api.config.js         # ✅ Configuración de API
    │   ├── app.config.js         # ✅ Configuración general de la app
    │   └── env.js                # ✅ Centraliza acceso a variables de entorno
    │
    ├── utils/                    # ✅ Utilidades y helpers
    │   ├── index.js              # ✅ Re-export central
    │   ├── chartHelpers.js       # ✅ Helpers para gráficos
    │   ├── codeGenerator.js      # ✅ Generación de códigos de documentos
    │   ├── currencyFormatter.js  # ✅ Formateo de moneda
    │   ├── dateFormatter.js      # ✅ Formateo de fechas
    │   ├── errorHandlers.js      # ✅ Manejo de errores
    │   ├── fileHandlers.js       # ✅ Manejo de archivos
    │   ├── permissions.js        # ✅ Helpers para verificar permisos
    │   └── validators.js         # ✅ Validadores de formularios
    │
    └── styles/                   # Estilos globales
        ├── index.css             # ✅ Entry point de estilos
        ├── reset.css             # ✅ Reset/normalize
        └── variables.css         # ✅ CSS custom properties (colores, fuentes)
```

---

## 🎯 Key Architectural Decisions

### 1. **Module Separation**
- **Projects Module**: Active project management
- **Knowledge Hub Module**: Historical data and standards
- **Admin Module**: System configuration and user management

### 2. **Mock Data Strategy**
All API services check `import.meta.env.VITE_USE_MOCKS`:
```javascript
// services/projectsApi.js
export const getProjects = async () => {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return mockProjects.getProjects();
  }
  return apiClient.get('/projects');
};
```

### 3. **Project Context Pattern**
When a user selects a project from the portfolio, the entire workspace updates:
- `ProjectContext` stores the selected project
- `ProjectWorkspaceLayout` wraps all project pages
- All project pages automatically filter by selected project

### 4. **Component Organization**
- **Shared components** (`components/shared/`): Reusable across all modules
- **Layout components** (`components/layouts/`): Structural layouts
- **Feature components** (`features/*/components/`): Module-specific

### 5. **Testing Strategy**
- Unit tests alongside components (`__tests__/` folders)
- Integration tests at page level
- Mock data isolated in `services/mocks/`

### 6. **State Management**
- **Redux Toolkit** for complex global state (projects, documents)
- **Context API** for simpler cross-cutting concerns (theme, auth)
- **Local state** for component-specific UI state

### 7. **Routing Structure**
```javascript
// Simplified routing example
/                           → Landing/Dashboard
/login                      → Auth
/projects                   → Portfolio
/projects/:id/dashboard     → Project Dashboard
/projects/:id/lmd           → Project LMD
/knowledge-hub/search       → Knowledge Hub Search
/admin/users                → Admin Users
```

### 8. **Permission System**
Uses Context + Redux to implement RBAC/ABAC:
- `PermissionsContext` provides permission checking functions
- `ProtectedRoute` and `AdminRoute` enforce access control
- Components conditionally render based on permissions

### 9. **CSS Strategy**
- **CSS Modules** for component-level styles (`.module.css`)
- **Global CSS** for variables, resets, and utilities
- **No CSS-in-JS** to keep bundle size small

### 10. **File Naming Conventions**
- **Components**: PascalCase (e.g., `ProjectCard.jsx`)
- **Utilities/Hooks**: camelCase (e.g., `useAuth.js`)
- **Constants**: camelCase files, UPPER_CASE exports
- **CSS Modules**: `ComponentName.module.css`

---

## 🚀 Getting Started

### Initial Setup Checklist
1. ✅ Create folder structure
2. ✅ Setup shared components (Button, Modal, Table, etc.)
3. ✅ Configure Redux store with essential slices
4. ✅ Create Context providers (Auth, Project, Theme)
5. ✅ Setup routing with ProtectedRoute
6. ✅ Create mock data for development
7. ✅ Build authentication flow
8. ✅ Implement portfolio page (entry point)
9. ✅ Create project workspace layout
10. ✅ Build LMD as first core feature

### Development Workflow
1. Work with `VITE_USE_MOCKS=true` for independent frontend development
2. Each feature has its own mock data in `services/mocks/`
3. API services abstract the mock/real API logic
4. When backend is ready, flip to `VITE_USE_MOCKS=false`

---

## 📝 Notes

- This structure supports **incremental development**: start with core features (auth, portfolio, LMD) and expand
- Each feature is **self-contained** with its own components, hooks, and tests
- **Scalability**: Easy to add new features or split into microfrontends later
- **Maintainability**: Clear separation of concerns and consistent patterns
- **Team-friendly**: Different developers can work on different modules without conflicts

---

## 🔄 Version History

- **v1.0** (2024-10-12): Initial complete structure based on APP_Concept.txt
- **v1.1** (2024-10-13): Updated to reflect actual implementation status with ✅ and 🚧 indicators

---

**Last Updated**: October 13, 2024

## 📊 Implementation Status Summary

### Fully Implemented (✅)
- **Core Infrastructure**: Contexts, Routing, Config, Utils, Styles
- **Shared Components**: Avatar, Badge, Button, Card, EmptyState, Input, Modal, SearchBar, Select, Spinner, Table, Tabs
- **Project Features**: Portfolio, Dashboard, LMD, Transmittals, RFI, Timesheets, Resource Planning
- **Knowledge Hub**: Historical Projects, Standards, Unified Search
- **Services & State**: API Client, Mock Data, Redux Store (Auth & Projects)

### In Progress (🚧)
- **Shared Components**: Breadcrumb, DatePicker, Dropdown, ErrorBoundary, FileUpload, Pagination, Tooltip
- **Layouts**: AuthLayout, ProjectWorkspaceLayout, AdminLayout
- **Auth Module**: Login/Register forms
- **Project Features**: Notifications
- **Admin Module**: All submodules (Users, Clients, Nomenclature, Templates, System Config, Audit Logs)

### Pending
- Additional Redux slices for specific features
- Missing API service files (auth, transmittals, RFI, admin)
- Complete implementation of pending shared components

