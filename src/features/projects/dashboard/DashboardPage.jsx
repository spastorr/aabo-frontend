/**
 * DashboardPage - Project dashboard with KPIs and charts
 * @module features/projects/dashboard/DashboardPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import { getProjectById } from '../../../services/projectsApi';
import Button from '../../../components/shared/Button';
import Modal from '../../../components/shared/Modal';
import PageHeader from '../../../components/shared/PageHeader';
import KPICard from './components/KPICard';
import ProgressChart from './components/ProgressChart';
import ChartTabs from './components/ChartTabs';
import RecentActivity from './components/RecentActivity';
import DashboardSettings from './components/DashboardSettings';
import CloseProjectModal from './components/CloseProjectModal';
import ProjectStatusBanner from './components/ProjectStatusBanner';
import useDashboardData from './hooks/useDashboardData';
import useCloseProject from './hooks/useCloseProject';
import { formatCurrency, formatPercentage } from '../../../utils';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { data: dashboardData, loading, error } = useDashboardData(projectId);
  const { 
    loading: closeLoading, 
    closeProject, 
    canCloseProject, 
    getCloseButtonText, 
    getCloseButtonVariant 
  } = useCloseProject();
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [dashboardSettings, setDashboardSettings] = useState(null);

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
    // Load dashboard settings
    loadDashboardSettings();
  }, [projectId]);

  const loadDashboardSettings = () => {
    const savedSettings = localStorage.getItem(`dashboard_settings_${projectId}`);
    if (savedSettings) {
      try {
        setDashboardSettings(JSON.parse(savedSettings));
      } catch (err) {
        console.error('Error loading dashboard settings:', err);
      }
    }
  };

  const handleSaveSettings = (newSettings) => {
    setDashboardSettings(newSettings);
    // Optionally reload data or update UI based on new settings
  };

  const handleCloseProject = async (closeData) => {
    try {
      await closeProject(projectId, closeData);
      setIsCloseModalOpen(false);
    } catch (error) {
      console.error('Error closing project:', error);
    }
  };

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!selectedProject) return null;
    
    return (
      <PageHeader
        showProjectInfo
        projectName={selectedProject.name}
        projectCode={selectedProject.code}
        backButton={{
          path: '/projects',
          label: 'Portafolio'
        }}
        actions={[
          {
            label: 'Ver LMD',
            variant: 'outline',
            onClick: () => navigate(`/projects/${projectId}/lmd`)
          },
          {
            label: getCloseButtonText(selectedProject),
            variant: getCloseButtonVariant(selectedProject),
            onClick: () => setIsCloseModalOpen(true),
            disabled: !canCloseProject(selectedProject) || closeLoading
          },
          {
            label: 'Configuración',
            variant: 'primary',
            onClick: () => setIsSettingsOpen(true)
          }
        ]}
      />
    );
  }, [selectedProject, projectId, navigate, getCloseButtonText, getCloseButtonVariant, canCloseProject, closeLoading]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const loadProject = async () => {
    try {
      const response = await getProjectById(projectId);
      if (response.success) {
        selectProject(response.data);
      }
    } catch (err) {
      console.error('Error loading project:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => navigate('/projects')}>Volver al Portafolio</Button>
        </div>
      </div>
    );
  }

  if (!selectedProject || !dashboardData) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Proyecto no encontrado</p>
          <Button onClick={() => navigate('/projects')}>Volver al Portafolio</Button>
        </div>
      </div>
    );
  }

  const { kpis, disciplineProgress, recentActivity, sCurve, budgetByDiscipline, budgetOverTime } = dashboardData;
  const budgetPercentage = (kpis.budgetSpent / kpis.budgetTotal) * 100;
  const documentsPercentage = (kpis.documentsApproved / kpis.documentsTotal) * 100;

  // Check widget visibility settings
  const showWidget = (widgetKey) => {
    if (!dashboardSettings?.widgets) return true;
    return dashboardSettings.widgets[widgetKey] !== false;
  };

  return (
    <div className={styles.container}>
      {/* Project Status Banner */}
      <ProjectStatusBanner project={selectedProject} />

      {/* KPI Cards */}
      {showWidget('showProgress') || showWidget('showDocuments') || 
       showWidget('showBudget') || showWidget('showTeam') ? (
      <div className={styles.kpiGrid}>
        {showWidget('showProgress') && (
          <div onClick={() => setIsProgressModalOpen(true)} style={{ cursor: 'pointer' }}>
            <KPICard
              icon="📊"
              value={`${kpis.progress}%`}
              title="Avance General"
              subtitle="Del proyecto (click para detalles)"
              trend={kpis.progress > 50 ? '+5%' : '+2%'}
              trendDirection="up"
              color="primary"
            />
          </div>
        )}
        
        {showWidget('showDocuments') && (
          <KPICard
            icon="📄"
            value={`${kpis.documentsApproved}/${kpis.documentsTotal}`}
            title="Documentos Aprobados"
            subtitle={formatPercentage(documentsPercentage, false)}
            trend={`${kpis.documentsTotal - kpis.documentsApproved} pendientes`}
            trendDirection="neutral"
            color="info"
          />
        )}
        
        {showWidget('showBudget') && (
          <KPICard
            icon="💰"
            value={formatCurrency(kpis.budgetSpent)}
            title="Presupuesto Ejecutado"
            subtitle={`${formatPercentage(budgetPercentage, false)} del total`}
            trend={budgetPercentage > 90 ? 'Atención' : 'Normal'}
            trendDirection={budgetPercentage > 90 ? 'down' : 'neutral'}
            color={budgetPercentage > 90 ? 'warning' : 'success'}
          />
        )}
        
        {showWidget('showTeam') && (
          <KPICard
            icon="👥"
            value={kpis.teamMembers}
            title="Miembros del Equipo"
            subtitle={kpis.daysRemaining > 0 ? `${kpis.daysRemaining} días restantes` : 'Completado'}
            color="info"
          />
        )}
      </div>
      ) : null}

      {/* Charts and Activity */}
      {(showWidget('showSCurve') || showWidget('showBudgetChart') || showWidget('showRecentActivity')) && (
      <div className={styles.contentGrid}>
        {(showWidget('showSCurve') || showWidget('showBudgetChart')) && (
          <div className={styles.chartSection}>
            <ChartTabs 
              sCurveData={sCurve}
              budgetData={budgetByDiscipline}
              budgetOverTime={budgetOverTime}
            />
          </div>
        )}
        
        {showWidget('showRecentActivity') && (
          <div className={styles.activitySection}>
            <RecentActivity activities={recentActivity} />
          </div>
        )}
      </div>
      )}

      {/* Quick Actions */}
      {showWidget('showQuickActions') && (
        <div className={styles.quickActions}>
          <h3 className={styles.sectionTitle}>Acciones Rápidas</h3>
          <div className={styles.actionsGrid}>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/projects/${projectId}/lmd`)}
            >
              📄 Gestionar Documentos
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}/transmittals`)}
            >
              📤 Ver Transmittals
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}/rfi`)}
            >
              ❓ Gestionar RFIs
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/projects/${projectId}/reports`)}
            >
              📊 Ver Reportes
            </Button>
          </div>
        </div>
      )}

      {/* Progress Detail Modal */}
      <Modal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        title="Avance por Disciplina"
        size="large"
      >
        <div style={{ padding: '1rem 0' }}>
          <ProgressChart 
            overall={kpis.progress} 
            disciplines={disciplineProgress}
          />
        </div>
      </Modal>

      {/* Dashboard Settings Modal */}
      <DashboardSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        projectId={projectId}
        onSave={handleSaveSettings}
      />

      {/* Close Project Modal */}
      <CloseProjectModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        project={selectedProject}
        onConfirmClose={handleCloseProject}
        loading={closeLoading}
      />
    </div>
  );
};

export default DashboardPage;

