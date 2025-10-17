/**
 * HistoricalProjectDetailPage - Detailed view of archived project (Read-Only)
 * Shows complete project information, metrics, and lessons learned
 * @module features/knowledgeHub/historical-projects/HistoricalProjectDetailPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import { getHistoricalProjectById } from '../../../services/knowledgeHubApi';
import Button from '../../../components/shared/Button';
import Modal from '../../../components/shared/Modal';
import PageHeader from '../../../components/shared/PageHeader';
import Tabs from '../../../components/shared/Tabs';
import Tooltip from '../../../components/shared/Tooltip';
import KPICard from '../../projects/dashboard/components/KPICard';
import ProgressChart from '../../projects/dashboard/components/ProgressChart';
import HistoricalProjectLMD from './components/HistoricalProjectDetail/HistoricalProjectLMD';
import HistoricalProjectMetrics from './components/HistoricalProjectDetail/HistoricalProjectMetrics';
import LessonsLearned from './components/HistoricalProjectDetail/LessonsLearned';
import { formatCurrency, formatPercentage, formatDate } from '../../../utils';
import styles from './HistoricalProjectDetailPage.module.css';

const HistoricalProjectDetailPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setHeader, clearHeader } = useLayout();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Initialize activeTab from location state or default to 'overview'
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  // Update activeTab when location state changes
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getHistoricalProjectById(projectId);
      
      if (response.success) {
        setProject(response.data);
      } else {
        setError('Proyecto no encontrado');
      }
    } catch (err) {
      setError('Error al cargar el proyecto');
      console.error('Error loading historical project:', err);
    } finally {
      setLoading(false);
    }
  };

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!project) return null;
    
    return (
      <PageHeader
        backButton={{
          path: '/knowledge-hub/historical-projects',
          label: 'Proyectos Históricos'
        }}
      />
    );
  }, [project]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando proyecto histórico...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error || 'Proyecto no encontrado'}</p>
          <Button onClick={() => navigate('/knowledge-hub/historical-projects')}>
            Volver a Proyectos Históricos
          </Button>
        </div>
      </div>
    );
  }

  const budgetPercentage = (project.spent / project.budget) * 100;
  const documentsApproved = project.lmd?.filter(doc => doc.status === 'APR').length || 0;
  const documentsTotal = project.lmd?.length || 0;
  const documentsPercentage = documentsTotal > 0 ? (documentsApproved / documentsTotal) * 100 : 0;

  // Calculate discipline progress from metrics
  const disciplineProgress = project.metrics?.budgetByDiscipline?.map(disc => ({
    name: disc.discipline,
    progress: Math.min(100, (disc.actual / disc.budgeted) * 100)
  })) || [];

  const tabs = [
    { id: 'overview', label: 'Resumen' },
    { id: 'lmd', label: 'LMD Final' },
    { id: 'metrics', label: 'Métricas de Cierre' },
    { id: 'lessons', label: 'Lecciones Aprendidas' }
  ];

  return (
    <div className={styles.container}>
      {/* Compact Read-Only Indicator */}
      <div className={styles.compactHeader}>
        <div className={styles.projectTitle}>
          <h1 className={styles.title}>{project.name}</h1>
          <span className={styles.code}>{project.code}</span>
        </div>
        <Tooltip 
          content={
            <div>
              <strong>Proyecto Archivado - Solo Lectura</strong><br/>
              Este proyecto está completado y archivado. La información se preserva para consulta y referencia.
            </div>
          }
          position="bottom"
          delay={200}
        >
          <div className={styles.lockIcon}>
            <span className={styles.lockSymbol}>🔒</span>
          </div>
        </Tooltip>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        <KPICard
          icon="💰"
          value={formatCurrency(project.spent)}
          title="Presupuesto Final"
          subtitle={`${formatPercentage(budgetPercentage, false)} ejecutado`}
          trend={budgetPercentage < 100 ? 'Bajo presupuesto' : 'Según lo planeado'}
          trendDirection={budgetPercentage < 100 ? 'up' : 'neutral'}
          color={budgetPercentage < 100 ? 'success' : 'info'}
        />
        
        <KPICard
          icon="📄"
          value={`${documentsApproved}/${documentsTotal}`}
          title="Documentos en LMD"
          subtitle={formatPercentage(documentsPercentage, false) + ' aprobados'}
          color="info"
        />
        
        <KPICard
          icon="👥"
          value={project.teamMembers}
          title="Miembros del Equipo"
          subtitle={`${project.disciplines?.length || 0} disciplinas`}
          color="info"
        />
      </div>

      {/* Tabs Content */}
      <div className={styles.tabsContainer}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        
        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div className={styles.overviewContent}>
              {/* Project Description */}
              <div className={styles.overviewSection}>
                <h3>📋 Información del Proyecto</h3>
                <div className={styles.projectDetails}>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Cliente</span>
                      <span className={styles.detailValue}>{project.client}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Tipo</span>
                      <span className={styles.detailValue}>{project.type}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Duración</span>
                      <span className={styles.detailValue}>{project.duration} meses</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Tasa de Éxito</span>
                      <span className={styles.detailValue}>{project.successRate}%</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Inicio</span>
                      <span className={styles.detailValue}>{formatDate(project.startDate)}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Cierre</span>
                      <span className={styles.detailValue}>{formatDate(project.completionDate)}</span>
                    </div>
                  </div>
                  <div className={styles.description}>
                    <p>{project.description}</p>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className={styles.tags}>
                      {project.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.overviewSection}>
                <h3>📊 Resumen Ejecutivo</h3>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryCard}>
                    <h4>Presupuesto</h4>
                    <p className={styles.summaryValue}>{formatCurrency(project.budget)}</p>
                    <p className={styles.summaryLabel}>Presupuestado</p>
                    <p className={styles.summaryValue}>{formatCurrency(project.spent)}</p>
                    <p className={styles.summaryLabel}>Ejecutado</p>
                    <p className={styles.summaryValue}>{formatCurrency(project.budget - project.spent)}</p>
                    <p className={styles.summaryLabel}>
                      {project.spent < project.budget ? 'Ahorro' : 'Sobrecosto'}
                    </p>
                  </div>
                  
                  <div className={styles.summaryCard}>
                    <h4>Cronograma</h4>
                    <p className={styles.summaryValue}>{project.duration} meses</p>
                    <p className={styles.summaryLabel}>Duración Real</p>
                    <p className={styles.summaryValue}>
                      {project.metrics?.schedulePerformance?.plannedDuration || project.duration} meses
                    </p>
                    <p className={styles.summaryLabel}>Duración Planeada</p>
                  </div>
                  
                  <div className={styles.summaryCard}>
                    <h4>Calidad</h4>
                    <p className={styles.summaryValue}>{project.successRate}%</p>
                    <p className={styles.summaryLabel}>Tasa de Éxito</p>
                    <p className={styles.summaryValue}>
                      {project.metrics?.qualityMetrics?.clientSatisfaction || 'N/A'}
                    </p>
                    <p className={styles.summaryLabel}>Satisfacción Cliente (de 5)</p>
                  </div>
                </div>
              </div>

              <div className={styles.overviewSection}>
                <h3>🔧 Disciplinas Involucradas</h3>
                <div className={styles.disciplinesList}>
                  {project.disciplines?.map((discipline, index) => (
                    <div key={index} className={styles.disciplineChip}>
                      {discipline}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.overviewSection}>
                <h3>📈 Métricas Clave</h3>
                <div className={styles.metricsQuickView}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricIcon}>📄</span>
                    <div>
                      <p className={styles.metricValue}>{project.documents}</p>
                      <p className={styles.metricLabel}>Documentos Generados</p>
                    </div>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricIcon}>📤</span>
                    <div>
                      <p className={styles.metricValue}>{project.transmittals}</p>
                      <p className={styles.metricLabel}>Transmittals Emitidos</p>
                    </div>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricIcon}>❓</span>
                    <div>
                      <p className={styles.metricValue}>{project.rfis}</p>
                      <p className={styles.metricLabel}>RFIs Gestionados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lmd' && (
            <HistoricalProjectLMD lmd={project.lmd || []} projectCode={project.code} />
          )}

          {activeTab === 'metrics' && (
            <HistoricalProjectMetrics 
              metrics={project.metrics}
              budget={project.budget}
              spent={project.spent}
            />
          )}

          {activeTab === 'lessons' && (
            <LessonsLearned 
              lessons={project.lessonsLearned || []}
              projectName={project.name}
            />
          )}
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
            overall={100} 
            disciplines={disciplineProgress}
          />
        </div>
      </Modal>
    </div>
  );
};

export default HistoricalProjectDetailPage;

