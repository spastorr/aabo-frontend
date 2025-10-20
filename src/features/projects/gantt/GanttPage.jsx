/**
 * GanttPage - Simplified version with mock data
 * @module features/projects/gantt/GanttPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import { useProject } from '../../../contexts/ProjectContext';
import PageHeader from '../../../components/shared/PageHeader';
import ExportDropdown from '../../../components/shared/ExportDropdown';
import Button from '../../../components/shared/Button';
import MSProjectGantt from './components/MSProjectGantt';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../constants';
import { DOCUMENT_STATUS_DETAILED } from '../../../constants/documentLifecycle';
import { formatDate, differenceInDays } from '../../../utils';
import Modal from '../../../components/shared/Modal';
import styles from './GanttPage.module.css';

const GanttPage = () => {
  const { projectId } = useParams();
  const { setHeader, clearHeader } = useLayout();
  const { project } = useProject();
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

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
      currentRevision: '0',
      createdDate: '2024-01-10'
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
      currentRevision: 'C',
      createdDate: '2024-01-15'
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
      currentRevision: 'D',
      createdDate: '2024-01-28'
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
      currentRevision: 'B',
      createdDate: '2024-02-10'
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
      currentRevision: '0',
      createdDate: '2024-01-25'
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
      currentRevision: 'C',
      createdDate: '2024-02-28'
    },
    // Más documentos por disciplina - PROCESS
    {
      id: 'DOC-007',
      code: 'B43ITT298-SHY-TPT-10-PFD-002',
      name: 'Diagrama de Flujo - Sistema de Refrigeración',
      type: 'PFD',
      discipline: 'PROCESS',
      status: 'ELB',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      dueDate: '2024-03-20',
      responsible: 'Ing. Juan Pérez',
      cost: 12000,
      currentRevision: 'B',
      createdDate: '2024-01-25'
    },
    {
      id: 'DOC-008',
      code: 'B43ITT298-SHY-TPT-10-PFD-003',
      name: 'Diagrama de Flujo - Sistema de Purga',
      type: 'PFD',
      discipline: 'PROCESS',
      status: 'APR',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      sendDate: '2024-04-10',
      approvalDate: '2024-04-15',
      dueDate: '2024-04-20',
      responsible: 'Ing. Juan Pérez',
      cost: 10000,
      currentRevision: '0',
      createdDate: '2024-02-25'
    },
    // Más documentos por disciplina - PIPING
    {
      id: 'DOC-009',
      code: 'B43ITT298-SHY-TPT-50-PID-002',
      name: 'Diagrama P&ID - Sistema de Agua',
      type: 'PID',
      discipline: 'PIPING',
      status: 'CMN',
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      sendDate: '2024-04-25',
      dueDate: '2024-05-05',
      responsible: 'Ing. María García',
      cost: 22000,
      currentRevision: 'D',
      createdDate: '2024-02-10'
    },
    {
      id: 'DOC-010',
      code: 'B43ITT298-SHY-TPT-50-PID-003',
      name: 'Diagrama P&ID - Sistema de Vapor',
      type: 'PID',
      discipline: 'PIPING',
      status: 'REV',
      startDate: '2024-03-15',
      endDate: '2024-05-30',
      sendDate: '2024-05-25',
      dueDate: '2024-06-05',
      responsible: 'Ing. María García',
      cost: 28000,
      currentRevision: 'C',
      createdDate: '2024-03-10'
    },
    // Más documentos por disciplina - MECHANICAL
    {
      id: 'DOC-011',
      code: 'B43ITT298-SHY-TPT-80-GA-002',
      name: 'Arreglo General - Área de Tanques',
      type: 'DRAWING',
      discipline: 'MECHANICAL',
      status: 'ELB',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      dueDate: '2024-05-20',
      responsible: 'Ing. Carlos López',
      cost: 20000,
      currentRevision: 'B',
      createdDate: '2024-02-25'
    },
    {
      id: 'DOC-012',
      code: 'B43ITT298-SHY-TPT-80-GA-003',
      name: 'Arreglo General - Área de Bombas',
      type: 'DRAWING',
      discipline: 'MECHANICAL',
      status: 'APR',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      sendDate: '2024-06-10',
      approvalDate: '2024-06-15',
      dueDate: '2024-06-20',
      responsible: 'Ing. Carlos López',
      cost: 18000,
      currentRevision: '0',
      createdDate: '2024-03-25'
    },
    // Más documentos por disciplina - ELECTRICAL
    {
      id: 'DOC-013',
      code: 'B43ITT298-SHY-TPT-70-SLD-002',
      name: 'Diagrama Unifilar - Sistema de Iluminación',
      type: 'SLD',
      discipline: 'ELECTRICAL',
      status: 'CMN',
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      sendDate: '2024-05-10',
      dueDate: '2024-05-20',
      responsible: 'Ing. Ana Martínez',
      cost: 15000,
      currentRevision: 'D',
      createdDate: '2024-02-25'
    },
    {
      id: 'DOC-014',
      code: 'B43ITT298-SHY-TPT-70-SLD-003',
      name: 'Diagrama Unifilar - Sistema de Emergencia',
      type: 'SLD',
      discipline: 'ELECTRICAL',
      status: 'REV',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      sendDate: '2024-06-10',
      dueDate: '2024-06-20',
      responsible: 'Ing. Ana Martínez',
      cost: 18000,
      currentRevision: 'C',
      createdDate: '2024-03-25'
    },
    // Más documentos por disciplina - CIVIL
    {
      id: 'DOC-015',
      code: 'B43ITT298-SHY-TPT-30-FND-002',
      name: 'Plano de Fundaciones - Área de Tanques',
      type: 'DRAWING',
      discipline: 'CIVIL',
      status: 'ELB',
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      dueDate: '2024-05-05',
      responsible: 'Ing. Roberto Silva',
      cost: 25000,
      currentRevision: 'B',
      createdDate: '2024-02-10'
    },
    {
      id: 'DOC-016',
      code: 'B43ITT298-SHY-TPT-30-FND-003',
      name: 'Plano de Fundaciones - Edificio de Control',
      type: 'DRAWING',
      discipline: 'CIVIL',
      status: 'APR',
      startDate: '2024-03-15',
      endDate: '2024-05-30',
      sendDate: '2024-05-25',
      approvalDate: '2024-05-30',
      dueDate: '2024-06-05',
      responsible: 'Ing. Roberto Silva',
      cost: 30000,
      currentRevision: '0',
      createdDate: '2024-03-10'
    },
    // Más documentos por disciplina - INSTRUMENTATION
    {
      id: 'DOC-017',
      code: 'B43ITT298-SHY-TPT-60-ITB-002',
      name: 'Lista de Instrumentos - Sistema de Presión',
      type: 'DATASHEET',
      discipline: 'INSTRUMENTATION',
      status: 'CMN',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      sendDate: '2024-06-10',
      dueDate: '2024-06-20',
      responsible: 'Ing. Luis Fernández',
      cost: 14000,
      currentRevision: 'D',
      createdDate: '2024-03-25'
    },
    {
      id: 'DOC-018',
      code: 'B43ITT298-SHY-TPT-60-ITB-003',
      name: 'Lista de Instrumentos - Sistema de Temperatura',
      type: 'DATASHEET',
      discipline: 'INSTRUMENTATION',
      status: 'REV',
      startDate: '2024-05-01',
      endDate: '2024-07-15',
      sendDate: '2024-07-10',
      dueDate: '2024-07-20',
      responsible: 'Ing. Luis Fernández',
      cost: 16000,
      currentRevision: 'C',
      createdDate: '2024-04-25'
    }
  ];

  const initialRevisions = [
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

  const [revisionsState, setRevisionsState] = useState(initialRevisions);
  const [editingRevisions, setEditingRevisions] = useState([]);

  // Mock milestones for the Gantt view
  const mockMilestones = [
    { id: 'MIL-001', name: 'Inicio de Proyecto', date: '2024-01-15', type: 'PROJECT_START' },
    { id: 'MIL-002', name: 'Primera Entrega', date: '2024-03-15', type: 'DELIVERY' },
    { id: 'MIL-003', name: 'Revisión de Cliente', date: '2024-04-30', type: 'REVIEW' },
    { id: 'MIL-004', name: 'Documentos para Construcción', date: '2024-06-15', type: 'FOR_CONSTRUCTION' }
  ];

  // Mock dependencies (Finish-to-Start)
  const mockDependencies = [
    { fromId: 'DOC-001', toId: 'DOC-002', type: 'FS' },
    { fromId: 'DOC-002', toId: 'DOC-003', type: 'FS' },
    { fromId: 'DOC-003', toId: 'DOC-004', type: 'FS' },
    { fromId: 'DOC-005', toId: 'DOC-006', type: 'FS' }
  ];

  // Set header content directly in useEffect to avoid infinite loops
  useEffect(() => {
    const headerContent = (
      <PageHeader
        title="📅 Cronograma de Documentos"
        subtitle={`Proyecto: ${project?.name || 'Demo'} - Vista del timeline de documentos y revisiones`}
        backButton={{
          path: `/projects/${projectId}/dashboard`,
          label: 'Dashboard'
        }}
        actionsComponent={
          <ExportDropdown
            onExportPDF={() => console.log('Export Gantt PDF')}
            onExportExcel={() => console.log('Export Gantt Excel')}
          />
        }
      />
    );
    
    setHeader(headerContent);
    return () => clearHeader();
  }, [project?.name, projectId, setHeader, clearHeader]);

  return (
    <div className={styles.container}>
      {/* MS Project Style Gantt */}
      <div className={styles.ganttContainer}>
        <MSProjectGantt
          documents={mockDocuments}
          revisions={revisionsState}
          milestones={mockMilestones}
          dependencies={mockDependencies}
          selectedDocumentId={selectedDocumentId}
          onDocumentSelect={(id) => {
            setSelectedDocumentId(id);
            const revs = revisionsState
              .filter(r => r.documentId === id)
              .sort((a, b) => new Date(a.date) - new Date(b.date));
            // clone for editing
            setEditingRevisions(revs.map(r => ({ ...r })));
            setIsRevisionModalOpen(true);
          }}
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

      {/* Modal de Ciclo de Vida / Revisiones del Documento */}
      {isRevisionModalOpen && selectedDocumentId && (
        <Modal
          title={`Ciclo de vida - ${mockDocuments.find(d => d.id === selectedDocumentId)?.code || selectedDocumentId}`}
          isOpen={isRevisionModalOpen}
          onClose={() => setIsRevisionModalOpen(false)}
          size="large"
        >
          {(() => {
            const doc = mockDocuments.find(d => d.id === selectedDocumentId);
            const allowedLabels = ['A', 'B', 'C', 'D', '0', '1', '2'];

            const computeRows = () => {
              const revs = [...editingRevisions].sort((a, b) => new Date(a.date) - new Date(b.date));
              const rows = [];
              let prevStart = new Date(doc?.startDate || doc?.createdDate || new Date());
              revs.forEach((rev, idx) => {
                const end = new Date(rev.date);
                const duration = Math.max(0, differenceInDays(end, prevStart));
                const dependencia = idx === 0 ? '—' : `Rev ${revs[idx - 1].revision}`;
                const fechaRevisionCliente = rev.type === 'FOR_REVIEW' || rev.reviewer === 'PETROECUADOR' ? formatDate(rev.clientDate || rev.date) : '—';
                rows.push({
                  id: rev.id,
                  revision: rev.revision,
                  inicio: formatDate(prevStart),
                  duracion: `${duration} días`,
                  dependencia,
                  fin: formatDate(end),
                  revisionCliente: fechaRevisionCliente
                });
                prevStart = end;
              });
              return rows;
            };

            const updateRev = (index, patch) => {
              setEditingRevisions(prev => {
                const next = [...prev];
                next[index] = { ...next[index], ...patch };
                return next;
              });
            };

            const addRevision = () => {
              // propose next label
              const existing = new Set(editingRevisions.map(r => String(r.revision)));
              const nextLabel = allowedLabels.find(l => !existing.has(l)) || '2';
              setEditingRevisions(prev => ([
                ...prev,
                {
                  id: `REV-${Math.random().toString(36).slice(2,8)}`,
                  documentId: selectedDocumentId,
                  revision: nextLabel,
                  date: new Date().toISOString().slice(0,10),
                  type: nextLabel === '0' ? 'FOR_CONSTRUCTION' : (nextLabel.match(/^\d+$/) ? 'FOR_CONSTRUCTION' : 'FOR_REVIEW'),
                  status: 'PENDING',
                  reviewer: nextLabel === '0' || nextLabel.match(/^\d+$/) ? 'PETROECUADOR' : 'Ing. Supervisor',
                  clientDate: undefined
                }
              ]));
            };

            const removeRevision = (index) => {
              setEditingRevisions(prev => prev.filter((_, i) => i !== index));
            };

            const saveRevisions = () => {
              const sanitized = [...editingRevisions]
                .map(r => ({ ...r, date: new Date(r.date).toISOString().slice(0,10) }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));
              setRevisionsState(prev => ([
                ...prev.filter(r => r.documentId !== selectedDocumentId),
                ...sanitized
              ]));
              setIsRevisionModalOpen(false);
            };

            const rows = computeRows();

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontWeight: 600 }}>
                  Documento: {doc?.name} · Disciplina: {doc?.discipline} · Estado actual: {doc?.status}
                </div>
                <div>
                  <button onClick={addRevision} style={{ padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'var(--color-background)' }}>Añadir revisión</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Revisión</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Fecha fin revisión</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Tipo</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Revisor</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Inicio</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Duración</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Dependencia</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Fin</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}>Fecha revisión cliente</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--color-border)' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingRevisions
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((rev, i, arr) => {
                          const prevStart = i === 0 ? new Date(doc?.startDate || doc?.createdDate || new Date()) : new Date(arr[i - 1].date);
                          const end = new Date(rev.date);
                          const duration = Math.max(0, differenceInDays(end, prevStart));
                          const dependencia = i === 0 ? '—' : `Rev ${arr[i - 1].revision}`;
                          return (
                            <tr key={rev.id}>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <select value={rev.revision} onChange={(e) => updateRev(i, { revision: e.target.value })}>
                                  {allowedLabels.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <input type="date" value={rev.date?.slice(0,10) || ''} onChange={(e) => updateRev(i, { date: e.target.value })} />
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <select value={rev.type || ''} onChange={(e) => updateRev(i, { type: e.target.value })}>
                                  <option value="INTERNAL">INTERNAL</option>
                                  <option value="FOR_REVIEW">FOR_REVIEW</option>
                                  <option value="WITH_COMMENTS">WITH_COMMENTS</option>
                                  <option value="FOR_CONSTRUCTION">FOR_CONSTRUCTION</option>
                                </select>
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <input type="text" value={rev.reviewer || ''} onChange={(e) => updateRev(i, { reviewer: e.target.value })} placeholder="Revisor" />
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>{formatDate(prevStart)}</td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>{duration} días</td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>{dependencia}</td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>{formatDate(end)}</td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <input type="date" value={rev.clientDate?.slice(0,10) || ''} onChange={(e) => updateRev(i, { clientDate: e.target.value })} />
                              </td>
                              <td style={{ padding: '8px', borderBottom: '1px solid var(--color-border)' }}>
                                <button onClick={() => removeRevision(i)} style={{ padding: '4px 8px' }}>Eliminar</button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setIsRevisionModalOpen(false)} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'var(--color-background)' }}>Cancelar</button>
                  <button onClick={saveRevisions} style={{ padding: '8px 12px', border: '1px solid var(--color-primary)', borderRadius: '6px', background: 'var(--color-primary)', color: '#fff' }}>Guardar</button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
};

export default GanttPage;