import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import PortfolioPage from './features/projects/portfolio';
import DashboardPage from './features/projects/dashboard';
import LMDPage from './features/projects/lmd';
import TransmittalsPage from './features/projects/transmittals';
import RFIPage from './features/projects/rfi';
import TimesheetsPage from './features/projects/timesheets';
import ResourcesPage from './features/projects/resource-planning';
// PASO 5: Habilitando todo el KnowledgeHub completo
import { 
  KnowledgeHubPage,
  HistoricalProjectsPage,
  UnifiedSearchPage,
  StandardsPage
} from './features/knowledgeHub';
import { SettingsPage } from './features/settings';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Partículas flotantes decorativas */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<div style={{padding: '2rem', textAlign: 'center'}}>Login Page - To be built</div>} />

        {/* Protected routes with layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/projects" replace />} />
          <Route path="projects" element={<PortfolioPage />} />
          <Route path="projects/:id/dashboard" element={<DashboardPage />} />
          <Route path="projects/:id/lmd" element={<LMDPage />} />
          <Route path="projects/:id/transmittals" element={<TransmittalsPage />} />
          <Route path="projects/:id/rfi" element={<RFIPage />} />
          <Route path="projects/:id/timesheets" element={<TimesheetsPage />} />
          <Route path="projects/:id/resources" element={<ResourcesPage />} />
          
          {/* Knowledge Hub Routes - ✅ COMPLETAMENTE HABILITADO */}
          <Route path="knowledge-hub">
            <Route index element={<KnowledgeHubPage />} />
            <Route path="search" element={<UnifiedSearchPage />} />
            <Route path="historical-projects" element={<HistoricalProjectsPage />} />
            <Route path="historical-projects/:id" element={<div>Project Detail - To be implemented</div>} />
            <Route path="standards" element={<StandardsPage />} />
          </Route>
          
          {/* Settings Route */}
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Admin Routes */}
          <Route path="admin/*" element={<div>Admin - To be built</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
