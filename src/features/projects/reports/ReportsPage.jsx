/**
 * ReportsPage - Reports and Analytics page
 * @module features/projects/reports/ReportsPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import Card from '../../../components/shared/Card';
import CostProgressChart from './components/CostProgressChart';
import useReportsData from './hooks/useReportsData';
import styles from './ReportsPage.module.css';

const ReportsPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { data: reportsData, loading, error } = useReportsData(projectId);
  const [selectedReport, setSelectedReport] = useState(null);
  const [customReportFilters, setCustomReportFilters] = useState({
    project: projectId,
    startDate: '',
    endDate: '',
    discipline: 'all',
    status: 'all'
  });

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      // This would normally fetch project data
      // For now, we'll use mock data
    } catch (err) {
      console.error('Error loading project:', err);
    }
  };

  // Set header content directly in useEffect to avoid infinite loops
  useEffect(() => {
    if (!selectedProject) {
      clearHeader();
      return;
    }
    
    const headerContent = (
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
            label: '📊 Generar Reporte Personalizado',
            variant: 'primary',
            onClick: () => setSelectedReport('custom')
          }
        ]}
      />
    );
    
    setHeader(headerContent);
    return () => clearHeader();
  }, [selectedProject?.name, selectedProject?.code, setHeader, clearHeader]);

  const predefinedReports = [
    {
      id: 'cost-progress',
      title: 'Gráfico de Avance en Costo',
      description: 'Visualiza el avance de costos proyectados vs reales acumulados por mes.',
      icon: '📈',
      onClick: () => setSelectedReport('cost-progress')
    },
    {
      id: 'master-document-list',
      title: 'Lista Maestra de Documentos',
      description: 'Exporta el MDL completo del proyecto seleccionado en formato Excel.',
      icon: '📋',
      onClick: () => setSelectedReport('master-document-list')
    },
    {
      id: 'overdue-documents',
      title: 'Reporte de Documentos Atrasados',
      description: 'Genera una lista de todos los entregables que no cumplieron su fecha planificada.',
      icon: '⚠️',
      onClick: () => setSelectedReport('overdue-documents')
    },
    {
      id: 's-curve',
      title: 'Curva S de Avance',
      description: 'Visualiza el avance documental planificado vs. el real a lo largo del tiempo.',
      icon: '📊',
      onClick: () => setSelectedReport('s-curve')
    },
    {
      id: 'monthly-progress',
      title: 'Reporte Mensual de Avance',
      description: 'Genera un reporte detallado del progreso mensual del proyecto con métricas de avance.',
      icon: '📅',
      onClick: () => setSelectedReport('monthly-progress')
    },
    {
      id: 'weekly-progress',
      title: 'Reporte Semanal de Avance',
      description: 'Reporte semanal con estadísticas de avance, tareas completadas y pendientes.',
      icon: '📆',
      onClick: () => setSelectedReport('weekly-progress')
    }
  ];

  const handleCustomReportGenerate = () => {
    // Generate custom report based on filters
    console.log('Generating custom report with filters:', customReportFilters);
    // This would normally call an API to generate the report
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando reportes...</p>
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

  return (
    <div className={styles.container}>
      {/* Predefined Reports Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Reportes Predefinidos</h3>
        <div className={styles.reportsGrid}>
          {predefinedReports.map((report) => (
            <Card
              key={report.id}
              className={styles.reportCard}
              onClick={report.onClick}
            >
              <div className={styles.reportIcon}>{report.icon}</div>
              <h4 className={styles.reportTitle}>{report.title}</h4>
              <p className={styles.reportDescription}>{report.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Selected Report Display */}
      {selectedReport && (
        <section className={styles.section}>
          <div className={styles.reportDisplay}>
            <div className={styles.reportHeader}>
              <h3 className={styles.reportDisplayTitle}>
                {predefinedReports.find(r => r.id === selectedReport)?.title || 'Reporte Personalizado'}
              </h3>
              <Button
                variant="outline"
                onClick={() => setSelectedReport(null)}
                className={styles.closeButton}
              >
                ✕ Cerrar
              </Button>
            </div>
            
            <div className={styles.reportContent}>
              {selectedReport === 'cost-progress' && (
                <div className={styles.chartContainer}>
                  <CostProgressChart data={reportsData?.costProgress} />
                </div>
              )}

              {selectedReport === 'custom' && (
                <div className={styles.customReportForm}>
                  <h4 className={styles.formTitle}>Generador de Reportes Personalizados</h4>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Proyecto</label>
                      <select 
                        className={styles.formSelect}
                        value={customReportFilters.project}
                        onChange={(e) => setCustomReportFilters({...customReportFilters, project: e.target.value})}
                      >
                        <option value={projectId}>{selectedProject?.name || 'Proyecto Actual'}</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Fecha Inicio</label>
                      <input 
                        type="date" 
                        className={styles.formInput}
                        value={customReportFilters.startDate}
                        onChange={(e) => setCustomReportFilters({...customReportFilters, startDate: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Fecha Fin</label>
                      <input 
                        type="date" 
                        className={styles.formInput}
                        value={customReportFilters.endDate}
                        onChange={(e) => setCustomReportFilters({...customReportFilters, endDate: e.target.value})}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Disciplina</label>
                      <select 
                        className={styles.formSelect}
                        value={customReportFilters.discipline}
                        onChange={(e) => setCustomReportFilters({...customReportFilters, discipline: e.target.value})}
                      >
                        <option value="all">Todas las Disciplinas</option>
                        <option value="process">Procesos</option>
                        <option value="mechanical">Mecánica</option>
                        <option value="electrical">Eléctrica</option>
                        <option value="civil">Civil</option>
                        <option value="instrumentation">Instrumentación & Control</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Estado</label>
                      <select 
                        className={styles.formSelect}
                        value={customReportFilters.status}
                        onChange={(e) => setCustomReportFilters({...customReportFilters, status: e.target.value})}
                      >
                        <option value="all">Todos los Estados</option>
                        <option value="approved">Aprobado</option>
                        <option value="pending">Pendiente</option>
                        <option value="rejected">Rechazado</option>
                        <option value="in-review">En Revisión</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <Button 
                        onClick={handleCustomReportGenerate}
                        className={styles.generateButton}
                      >
                        🚀 Generar Reporte
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport !== 'cost-progress' && selectedReport !== 'custom' && (
                <div className={styles.reportPlaceholder}>
                  <div className={styles.placeholderIcon}>
                    {predefinedReports.find(r => r.id === selectedReport)?.icon}
                  </div>
                  <h4 className={styles.placeholderTitle}>
                    {predefinedReports.find(r => r.id === selectedReport)?.title}
                  </h4>
                  <p className={styles.placeholderDescription}>
                    Este reporte se generará con los datos del proyecto actual.
                    La funcionalidad específica se implementará según los requerimientos.
                  </p>
                  <Button className={styles.generateButton}>
                    📊 Generar Reporte
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReportsPage;
