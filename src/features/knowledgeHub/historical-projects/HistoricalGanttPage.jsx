/**
 * HistoricalGanttPage - Gantt chart for historical projects (Read-Only)
 * Shows document timeline for archived projects
 * @module features/knowledgeHub/historical-projects/HistoricalGanttPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import PageHeader from '../../../components/shared/PageHeader';
import Button from '../../../components/shared/Button';
import Select from '../../../components/shared/Select';
import MultiSelect from '../../../components/shared/MultiSelect';
import GanttChart from '../../projects/gantt/components/GanttChart';
import GanttControls from '../../projects/gantt/components/GanttControls';
import useHistoricalGanttData from './hooks/useHistoricalGanttData';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../constants';
import { DOCUMENT_STATUS_DETAILED } from '../../../constants/documentLifecycle';
import { exportGanttChart } from '../../projects/gantt/utils/ganttExporter';
import { formatDate } from '../../../utils';
import styles from './HistoricalGanttPage.module.css';

const HistoricalGanttPage = () => {
  const { id: projectId } = useParams();
  const { setHeader, clearHeader } = useLayout();
  
  // Gantt data and controls
  const { 
    project,
    documents, 
    revisions, 
    loading, 
    error,
    filters,
    setFilters,
    viewMode,
    setViewMode,
    timeRange,
    setTimeRange
  } = useHistoricalGanttData(projectId);

  // Local state for controls
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);
  const [showRevisions, setShowRevisions] = useState(true);
  const [showMilestones, setShowMilestones] = useState(true);
  const [zoomLevel, setZoomLevel] = useState('month');

  // Available filter options
  const disciplineOptions = useMemo(() => 
    Object.entries(DISCIPLINE_LABELS).map(([key, label]) => ({
      value: key,
      label,
      color: DISCIPLINE_COLORS[key]
    })), []
  );

  const documentTypeOptions = useMemo(() => [
    { value: 'PFD', label: 'Diagrama de Flujo' },
    { value: 'PID', label: 'Diagrama P&ID' },
    { value: 'DRAWING', label: 'Planos' },
    { value: 'CALCULATION', label: 'Cálculos' },
    { value: 'SPECIFICATION', label: 'Especificaciones' },
    { value: 'REPORT', label: 'Reportes' },
    { value: 'MANUAL', label: 'Manuales' }
  ], []);

  // Header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📅 Cronograma Histórico"
      subtitle={`Proyecto: ${project?.name || 'Cargando...'} - Vista de solo lectura del timeline de documentos`}
      backButton={{
        path: `/knowledge-hub/historical-projects/${projectId}`,
        label: 'Detalle del Proyecto'
      }}
      actions={[
        {
          label: '📥 PNG',
          variant: 'outline',
          size: 'small',
          onClick: () => handleDownload('png')
        },
        {
          label: '📄 PDF',
          variant: 'outline',
          size: 'small',
          onClick: () => handleDownload('pdf')
        },
        {
          label: '📊 Excel',
          variant: 'outline',
          size: 'small',
          onClick: () => handleDownload('excel')
        }
      ]}
    />
  ), [project?.name, projectId]);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  // Handle download
  const handleDownload = (format = 'png') => {
    const chartElement = document.querySelector('[data-gantt-chart]');
    if (!chartElement) {
      alert('No se pudo encontrar el elemento del cronograma para exportar.');
      return;
    }

    const exportData = {
      chartElement,
      projectName: project?.name || 'Proyecto Histórico',
      documents: filteredDocuments,
      revisions,
      summary: {
        totalDocuments: filteredDocuments.length,
        completedDocuments: filteredDocuments.filter(doc => doc.status === 'IFC').length,
        inProgressDocuments: filteredDocuments.filter(doc => ['ELB', 'REV', 'CMN'].includes(doc.status)).length,
        overdueDocuments: 0 // Historical projects don't have overdue items
      },
      legend: {
        documentStatuses: DOCUMENT_STATUS_DETAILED,
        disciplines: DISCIPLINE_LABELS
      }
    };

    exportGanttChart(format, exportData);
  };

  // Filtered documents based on current filters
  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    if (selectedDisciplines.length > 0) {
      filtered = filtered.filter(doc => selectedDisciplines.includes(doc.discipline));
    }

    if (selectedDocumentTypes.length > 0) {
      filtered = filtered.filter(doc => selectedDocumentTypes.includes(doc.type));
    }

    return filtered;
  }, [documents, selectedDisciplines, selectedDocumentTypes]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando cronograma histórico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ Proyecto no encontrado</p>
          <Button onClick={() => window.history.back()}>Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Historical Project Notice */}
      <div className={styles.historicalNotice}>
        <div className={styles.noticeIcon}>🔒</div>
        <div className={styles.noticeContent}>
          <h4>Cronograma de Proyecto Histórico</h4>
          <p>Este es un cronograma de solo lectura de un proyecto archivado. Los datos no pueden ser modificados.</p>
        </div>
      </div>

      {/* Controls Panel */}
      <div className={styles.controlsPanel}>
        <div className={styles.controlGroup}>
          <label>Vista:</label>
          <Select
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'documents', label: 'Por Documento' },
              { value: 'disciplines', label: 'Por Disciplina' },
              { value: 'revisions', label: 'Por Revisión' }
            ]}
            size="small"
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Zoom:</label>
          <Select
            value={zoomLevel}
            onChange={setZoomLevel}
            options={[
              { value: 'week', label: 'Semana' },
              { value: 'month', label: 'Mes' },
              { value: 'quarter', label: 'Trimestre' }
            ]}
            size="small"
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Disciplinas:</label>
          <MultiSelect
            value={selectedDisciplines}
            onChange={setSelectedDisciplines}
            options={disciplineOptions}
            placeholder="Todas las disciplinas"
            size="small"
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Tipos de Documento:</label>
          <MultiSelect
            value={selectedDocumentTypes}
            onChange={setSelectedDocumentTypes}
            options={documentTypeOptions}
            placeholder="Todos los tipos"
            size="small"
          />
        </div>

        <div className={styles.controlGroup}>
          <label>
            <input
              type="checkbox"
              checked={showRevisions}
              onChange={(e) => setShowRevisions(e.target.checked)}
            />
            Mostrar Revisiones
          </label>
        </div>

        <div className={styles.controlGroup}>
          <label>
            <input
              type="checkbox"
              checked={showMilestones}
              onChange={(e) => setShowMilestones(e.target.checked)}
            />
            Mostrar Hitos
          </label>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className={styles.chartContainer} data-gantt-chart>
        <GanttChart
          documents={filteredDocuments}
          revisions={revisions}
          viewMode={viewMode}
          zoomLevel={zoomLevel}
          showRevisions={showRevisions}
          showMilestones={showMilestones}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </div>

      {/* Chart Controls */}
      <GanttControls
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        onDownload={handleDownload}
      />

      {/* Project Summary */}
      <div className={styles.projectSummary}>
        <h4>Resumen del Proyecto</h4>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Cliente:</span>
            <span className={styles.summaryValue}>{project.client}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Período:</span>
            <span className={styles.summaryValue}>
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Documentos:</span>
            <span className={styles.summaryValue}>{filteredDocuments.length}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Estado Final:</span>
            <span className={styles.summaryValue}>Completado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalGanttPage;
