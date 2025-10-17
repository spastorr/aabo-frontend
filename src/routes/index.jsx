/**
 * Main routing configuration
 * @module routes
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import layouts (to be created)
// import AppLayout from '../components/layouts/AppLayout';
// import AuthLayout from '../components/layouts/AuthLayout';

// Import pages
import DashboardPage from '../features/projects/dashboard/DashboardPage';
import LMDPage from '../features/projects/lmd/LMDPage';
import TransmittalsPage from '../features/projects/transmittals/TransmittalsPage';
import RFIPage from '../features/projects/rfi/RFIPage';
import EconomicControlPage from '../features/projects/economic-control/EconomicControlPage';
import GanttPage from '../features/projects/gantt/GanttPage';
import NotificationsPage from '../features/projects/notifications/NotificationsPage';
import KnowledgeHubPage from '../features/knowledgeHub/KnowledgeHubPage';
import UnifiedSearchPage from '../features/knowledgeHub/search/UnifiedSearchPage';
import HistoricalProjectsPage from '../features/knowledgeHub/historical-projects/HistoricalProjectsPage';
import HistoricalProjectDetailPage from '../features/knowledgeHub/historical-projects/HistoricalProjectDetailPage';
import HistoricalGanttPage from '../features/knowledgeHub/historical-projects/HistoricalGanttPage';
import StandardsPage from '../features/knowledgeHub/standards/StandardsPage';
import LoginPage from '../features/auth/LoginPage';
// import PortfolioPage from '../features/projects/portfolio/PortfolioPage';

const AppRoutes = () => {
  // const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route path="/" element={<div>Home</div>} />
      <Route path="/projects" element={<div>Portfolio</div>} />
      <Route path="/projects/:id/dashboard" element={<DashboardPage />} />
      <Route path="/projects/:id/lmd" element={<LMDPage />} />
      <Route path="/projects/:id/transmittals" element={<TransmittalsPage />} />
      <Route path="/projects/:id/rfi" element={<RFIPage />} />
      <Route path="/projects/:id/gantt" element={<GanttPage />} />
      
      {/* Notifications */}
      <Route path="/notifications" element={<NotificationsPage />} />
      
      {/* Knowledge Hub routes */}
      <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
      <Route path="/knowledge-hub/search" element={<UnifiedSearchPage />} />
      <Route path="/knowledge-hub/historical-projects" element={<HistoricalProjectsPage />} />
      <Route path="/knowledge-hub/historical-projects/:id" element={<HistoricalProjectDetailPage />} />
      <Route path="/knowledge-hub/historical-projects/:id/gantt" element={<HistoricalGanttPage />} />
      <Route path="/knowledge-hub/standards" element={<StandardsPage />} />
      
      <Route path="/admin" element={<div>Admin</div>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

