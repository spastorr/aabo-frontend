/**
 * GanttPage - Simplified version with mock data
 * @module features/projects/gantt/GanttPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import { useProject } from '../../../contexts/ProjectContext';
import PageHeader from '../../../components/shared/PageHeader';
import Button from '../../../components/shared/Button';
import DebugGanttChart from './components/DebugGanttChart';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../constants';
import { DOCUMENT_STATUS_DETAILED } from '../../../constants/documentLifecycle';
import { formatDate } from '../../../utils';
import styles from './GanttPage.module.css';

const GanttPage = () => {
  const { projectId } = useParams();
  const { setHeader, clearHeader } = useLayout();
  const { project } = useProject();

  // Mock data for demonstration
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

  // Header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📅 Cronograma de Documentos"
      subtitle={`Proyecto: ${project?.name || 'Demo'} - Vista del timeline de documentos y revisiones`}
      backButton={{
        path: `/projects/${projectId}/dashboard`,
        label: 'Dashboard'
      }}
      actions={[
        {
          label: '📥 PNG',
          variant: 'outline',
          size: 'small',
          onClick: () => console.log('Download PNG')
        },
        {
          label: '📄 PDF',
          variant: 'outline',
          size: 'small',
          onClick: () => console.log('Download PDF')
        },
        {
          label: '📊 Excel',
          variant: 'outline',
          size: 'small',
          onClick: () => console.log('Download Excel')
        }
      ]}
    />
  ), [project?.name, projectId]);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  return (
    <div className={styles.container}>
      {/* Debug Info */}
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem', borderRadius: '8px' }}>
        <h3>🔍 Debug Info</h3>
        <p><strong>Project ID:</strong> {projectId}</p>
        <p><strong>Project Name:</strong> {project?.name || 'No project loaded'}</p>
        <p><strong>Documents Count:</strong> {mockDocuments.length}</p>
        <p><strong>Revisions Count:</strong> {mockRevisions.length}</p>
      </div>

      {/* Gantt Chart */}
      <div className={styles.chartContainer} data-gantt-chart>
        <DebugGanttChart
          documents={mockDocuments}
          revisions={mockRevisions}
        />
      </div>

      {/* Download Section */}
      <div className={styles.downloadSection}>
        <h4>📥 Descargar Cronograma</h4>
        <div className={styles.downloadButtons}>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => console.log('Download PNG')}
          >
            📷 PNG
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => console.log('Download PDF')}
          >
            📄 PDF
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => console.log('Download Excel')}
          >
            📊 Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GanttPage;