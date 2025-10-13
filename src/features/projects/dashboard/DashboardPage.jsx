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
import useDashboardData from './hooks/useDashboardData';
import { formatCurrency, formatPercentage } from '../../../utils';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { data: dashboardData, loading, error } = useDashboardData(projectId);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

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
            label: 'Configuración',
            variant: 'primary',
            onClick: () => alert('Configuración - Por implementar')
          }
        ]}
      />
    );
  }, [selectedProject, projectId, navigate]);

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

  return (
    <div className={styles.container}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
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
        
        <KPICard
          icon="📄"
          value={`${kpis.documentsApproved}/${kpis.documentsTotal}`}
          title="Documentos Aprobados"
          subtitle={formatPercentage(documentsPercentage, false)}
          trend={`${kpis.documentsTotal - kpis.documentsApproved} pendientes`}
          trendDirection="neutral"
          color="info"
        />
        
        <KPICard
          icon="💰"
          value={formatCurrency(kpis.budgetSpent)}
          title="Presupuesto Ejecutado"
          subtitle={`${formatPercentage(budgetPercentage, false)} del total`}
          trend={budgetPercentage > 90 ? 'Atención' : 'Normal'}
          trendDirection={budgetPercentage > 90 ? 'down' : 'neutral'}
          color={budgetPercentage > 90 ? 'warning' : 'success'}
        />
        
        <KPICard
          icon="👥"
          value={kpis.teamMembers}
          title="Miembros del Equipo"
          subtitle={kpis.daysRemaining > 0 ? `${kpis.daysRemaining} días restantes` : 'Completado'}
          color="info"
        />
      </div>

      {/* Charts and Activity */}
      <div className={styles.contentGrid}>
        <div className={styles.chartSection}>
          <ChartTabs 
            sCurveData={sCurve}
            budgetData={budgetByDiscipline}
            budgetOverTime={budgetOverTime}
          />
        </div>
        
        <div className={styles.activitySection}>
          <RecentActivity activities={recentActivity} />
        </div>
      </div>

      {/* Quick Actions */}
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
            onClick={() => navigate(`/projects/${projectId}/timesheets`)}
          >
            ⏱️ Registrar Horas
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default DashboardPage;

