/**
 * GanttPage - Interactive Gantt chart for project documents and revisions
 * Shows document timeline with revision schedules and milestones
 * @module features/projects/gantt/GanttPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import { useProject } from '../../../contexts/ProjectContext';
import PageHeader from '../../../components/shared/PageHeader';
import Button from '../../../components/shared/Button';
import Select from '../../../components/shared/Select';
import MultiSelect from '../../../components/shared/MultiSelect';
import SimpleGanttChart from './components/SimpleGanttChart';
import GanttControls from './components/GanttControls';
import useGanttData from './hooks/useGanttData';
import { exportGanttChart } from './utils/ganttExporter';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../constants';
import { DOCUMENT_STATUS_DETAILED } from '../../../constants/documentLifecycle';
import { formatDate } from '../../../utils';
import styles from './GanttPage.module.css';

const GanttPage = () => {
  const { projectId } = useParams();
  const { setHeader, clearHeader } = useLayout();
  const { project } = useProject();
  
  // Gantt data and controls
  const { 
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
  } = useGanttData(projectId);

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
      title="📅 Cronograma de Documentos"
      subtitle={`Proyecto: ${project?.name || 'Cargando...'} - Vista interactiva del timeline de documentos y revisiones`}
      backButton={{
        path: `/projects/${projectId}/dashboard`,
        label: 'Dashboard'
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
      projectName: project?.name || 'Proyecto Demo',
      documents: displayDocuments,
      revisions: displayRevisions,
      summary: {
        totalDocuments: displayDocuments.length,
        completedDocuments: displayDocuments.filter(doc => doc.status === 'IFC').length,
        inProgressDocuments: displayDocuments.filter(doc => ['ELB', 'REV', 'CMN'].includes(doc.status)).length,
        overdueDocuments: displayDocuments.filter(doc => {
          if (!doc.dueDate) return false;
          return new Date(doc.dueDate) < new Date() && !['IFC', 'APR'].includes(doc.status);
        }).length
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

  // Use mock data for demonstration
  const mockDocuments = [
    {
      id: 'DOC-001',
      code: 'B43ITT298-SHY-TPT-10-PFD-001',
      name: 'Diagrama de Flujo de Proceso',
      type: 'PFD',
      discipline: 'PROCESS',
      status: 'IFC',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      sendDate: '2024-02-10',
      approvalDate: '2024-02-15',
      dueDate: '2024-02-20',
      responsible: 'Ing. Juan Pérez',
      cost: 15000,
      currentRevision: '0'
    },
    {
      id: 'DOC-002',
      code: 'B43ITT298-SHY-TPT-50-PID-001',
      name: 'Diagrama P&ID - Línea Principal',
      type: 'PID',
      discipline: 'PIPING',
      status: 'REV',
      startDate: '2024-01-20',
      endDate: '2024-03-10',
      sendDate: '2024-03-05',
      dueDate: '2024-03-15',
      responsible: 'Ing. María García',
      cost: 25000,
      currentRevision: 'C'
    },
    {
      id: 'DOC-003',
      code: 'B43ITT298-SHY-TPT-80-GA-001',
      name: 'Arreglo General - Unidad de Proceso',
      type: 'DRAWING',
      discipline: 'MECHANICAL',
      status: 'CMN',
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      sendDate: '2024-04-10',
      dueDate: '2024-04-20',
      responsible: 'Ing. Carlos López',
      cost: 18000,
      currentRevision: 'D'
    },
    {
      id: 'DOC-004',
      code: 'B43ITT298-SHY-TPT-70-SLD-001',
      name: 'Diagrama Unifilar - Alimentación Principal',
      type: 'SLD',
      discipline: 'ELECTRICAL',
      status: 'ELB',
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      dueDate: '2024-05-10',
      responsible: 'Ing. Ana Martínez',
      cost: 12000,
      currentRevision: 'B'
    },
    {
      id: 'DOC-005',
      code: 'B43ITT298-SHY-TPT-30-FND-001',
      name: 'Plano de Fundaciones - Estructura Principal',
      type: 'DRAWING',
      discipline: 'CIVIL',
      status: 'APR',
      startDate: '2024-01-30',
      endDate: '2024-03-20',
      sendDate: '2024-03-15',
      approvalDate: '2024-03-20',
      dueDate: '2024-03-25',
      responsible: 'Ing. Roberto Silva',
      cost: 20000,
      currentRevision: '0'
    },
    {
      id: 'DOC-006',
      code: 'B43ITT298-SHY-TPT-60-ITB-001',
      name: 'Lista de Instrumentos - Control de Proceso',
      type: 'DATASHEET',
      discipline: 'INSTRUMENTATION',
      status: 'REV',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      sendDate: '2024-05-10',
      dueDate: '2024-05-20',
      responsible: 'Ing. Luis Fernández',
      cost: 16000,
      currentRevision: 'C'
    }
  ];

  const mockRevisions = [
    { id: 'REV-001', documentId: 'DOC-001', revision: 'A', date: '2024-01-20', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-002', documentId: 'DOC-001', revision: 'B', date: '2024-01-25', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-003', documentId: 'DOC-001', revision: 'C', date: '2024-02-10', type: 'FOR_REVIEW', status: 'COMPLETED' },
    { id: 'REV-004', documentId: 'DOC-001', revision: '0', date: '2024-02-15', type: 'FOR_CONSTRUCTION', status: 'COMPLETED' },
    { id: 'REV-005', documentId: 'DOC-002', revision: 'A', date: '2024-01-25', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-006', documentId: 'DOC-002', revision: 'B', date: '2024-02-05', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-007', documentId: 'DOC-002', revision: 'C', date: '2024-03-05', type: 'FOR_REVIEW', status: 'PENDING' },
    { id: 'REV-008', documentId: 'DOC-003', revision: 'A', date: '2024-02-10', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-009', documentId: 'DOC-003', revision: 'B', date: '2024-02-20', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-010', documentId: 'DOC-003', revision: 'C', date: '2024-04-10', type: 'FOR_REVIEW', status: 'COMPLETED' },
    { id: 'REV-011', documentId: 'DOC-003', revision: 'D', date: '2024-04-15', type: 'WITH_COMMENTS', status: 'IN_PROGRESS' },
    { id: 'REV-012', documentId: 'DOC-004', revision: 'A', date: '2024-02-25', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-013', documentId: 'DOC-004', revision: 'B', date: '2024-03-15', type: 'INTERNAL', status: 'IN_PROGRESS' },
    { id: 'REV-014', documentId: 'DOC-005', revision: 'A', date: '2024-02-10', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-015', documentId: 'DOC-005', revision: 'B', date: '2024-02-25', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-016', documentId: 'DOC-005', revision: 'C', date: '2024-03-15', type: 'FOR_REVIEW', status: 'COMPLETED' },
    { id: 'REV-017', documentId: 'DOC-005', revision: '0', date: '2024-03-20', type: 'FOR_CONSTRUCTION', status: 'COMPLETED' },
    { id: 'REV-018', documentId: 'DOC-006', revision: 'A', date: '2024-03-15', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-019', documentId: 'DOC-006', revision: 'B', date: '2024-04-05', type: 'INTERNAL', status: 'COMPLETED' },
    { id: 'REV-020', documentId: 'DOC-006', revision: 'C', date: '2024-05-10', type: 'FOR_REVIEW', status: 'PENDING' }
  ];

  // Override with mock data
  const displayDocuments = mockDocuments;
  const displayRevisions = mockRevisions;

  return (
    <div className={styles.container}>
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
        <SimpleGanttChart
          documents={displayDocuments}
          revisions={displayRevisions}
        />
      </div>

      {/* Download Section */}
      <div className={styles.downloadSection}>
        <h4>📥 Descargar Cronograma</h4>
        <div className={styles.downloadButtons}>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => handleDownload('png')}
          >
            📷 PNG
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => handleDownload('pdf')}
          >
            📄 PDF
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => handleDownload('excel')}
          >
            📊 Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GanttPage;
