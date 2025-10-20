import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import ForgotPasswordPage from './features/auth/ForgotPasswordPage';
import ResetPasswordPage from './features/auth/ResetPasswordPage';
import EmailVerificationPage from './features/auth/EmailVerificationPage';
import PortfolioPage from './features/projects/portfolio';
import DashboardPage from './features/projects/dashboard';
import LMDPage from './features/projects/lmd';
import TransmittalsPage from './features/projects/transmittals';
import RFIPage from './features/projects/rfi';
import TimesheetsPage from './features/projects/timesheets';
import ResourcesPage from './features/projects/resource-planning';
import GanttPage from './features/projects/gantt';
import ReportsPage from './features/projects/reports';
// PASO 5: Habilitando todo el KnowledgeHub completo
import {
  KnowledgeHubPage,
  HistoricalProjectsPage,
  UnifiedSearchPage,
  StandardsPage
} from './features/knowledgeHub';
import HistoricalProjectDetailPage from './features/knowledgeHub/historical-projects/HistoricalProjectDetailPage';
import { NotificationsPage } from './features/projects/notifications';
import { SettingsPage } from './features/settings';
import { ProfilePage } from './features/profile';
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

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
          <Route path="projects/:id/gantt" element={<GanttPage />} />
          <Route path="projects/:id/reports" element={<ReportsPage />} />

          {/* Notifications Route */}
          <Route path="notifications" element={<NotificationsPage />} />

          {/* Knowledge Hub Routes - ✅ COMPLETAMENTE HABILITADO */}
          <Route path="knowledge-hub">
            <Route index element={<KnowledgeHubPage />} />
            <Route path="search" element={<UnifiedSearchPage />} />
            <Route path="historical-projects" element={<HistoricalProjectsPage />} />
            <Route path="historical-projects/:id" element={<HistoricalProjectDetailPage />} />
            <Route path="standards" element={<StandardsPage />} />
          </Route>

          {/* Profile Route */}
          <Route path="profile" element={<ProfilePage />} />

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
