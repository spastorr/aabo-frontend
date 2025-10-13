/**
 * TimesheetsPage - Main page for timesheet management
 * @module features/projects/timesheets/TimesheetsPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import { getProjectById } from '../../../services/projectsApi';
import useTimesheets from './hooks/useTimesheets';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import Modal from '../../../components/shared/Modal';
import TimesheetForm from './components/TimesheetForm';
import TimesheetList from './components/TimesheetList';
import TimesheetSummary from './components/TimesheetSummary';
import ApprovalQueue from './components/ApprovalQueue';
import styles from './TimesheetsPage.module.css';

const TimesheetsPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { timesheets, pendingTimesheets, summary, loading, error, actions: timesheetActions } = useTimesheets(projectId);
  
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingTimesheet, setEditingTimesheet] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('my-timesheets'); // 'my-timesheets' | 'approvals'

  // Mock current user - in production this would come from auth context
  const currentUserId = 'USR-002';
  const isManager = true; // Mock - would come from permissions

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

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

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!selectedProject) return null;
    
    return (
      <PageHeader
        title="⏱️ Planillas de Horas"
        subtitle={selectedProject.name}
        backButton={{
          path: `/projects/${projectId}/dashboard`,
          label: 'Dashboard'
        }}
        actions={[
          {
            label: '+ Registrar Horas',
            variant: 'primary',
            onClick: () => setShowNewModal(true)
          }
        ]}
      />
    );
  }, [selectedProject, projectId]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const handleSubmit = async (timesheetData) => {
    setSubmitting(true);
    
    try {
      let result;
      if (editingTimesheet) {
        result = await timesheetActions.update(editingTimesheet.id, timesheetData);
      } else {
        result = await timesheetActions.create({
          ...timesheetData,
          userId: currentUserId,
          userName: 'Usuario Actual', // Would come from auth context
          projectId,
        });
      }
      
      if (result.success) {
        setShowNewModal(false);
        setEditingTimesheet(null);
      } else {
        alert(result.error || 'Error al guardar la planilla');
      }
    } catch (err) {
      alert('Error al guardar la planilla');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (timesheet) => {
    setEditingTimesheet(timesheet);
    setShowNewModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Está seguro que desea eliminar este registro de horas?')) {
      return;
    }
    
    const result = await timesheetActions.delete(id);
    if (!result.success) {
      alert(result.error || 'Error al eliminar la planilla');
    }
  };

  const handleApprove = async (id) => {
    const result = await timesheetActions.approve(id);
    if (!result.success) {
      alert(result.error || 'Error al aprobar la planilla');
    }
  };

  const handleReject = async (id, reason) => {
    const result = await timesheetActions.reject(id, reason);
    if (!result.success) {
      alert(result.error || 'Error al rechazar la planilla');
    }
  };

  const handleCloseModal = () => {
    setShowNewModal(false);
    setEditingTimesheet(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando planillas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => navigate(`/projects/${projectId}/dashboard`)}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const myTimesheets = timesheets.filter(t => t.userId === currentUserId);

  return (
    <div className={styles.container}>
      {/* Summary Section */}
      <div className={styles.summarySection}>
        <TimesheetSummary summary={summary} />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'my-timesheets' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('my-timesheets')}
        >
          📝 Mis Planillas
          <span className={styles.tabBadge}>{myTimesheets.length}</span>
        </button>
        {isManager && (
          <button
            className={`${styles.tab} ${activeTab === 'approvals' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('approvals')}
          >
            ✅ Aprobaciones
            {pendingTimesheets.length > 0 && (
              <span className={`${styles.tabBadge} ${styles.tabBadgeWarning}`}>
                {pendingTimesheets.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {activeTab === 'my-timesheets' && (
          <div className={styles.timesheetsSection}>
            <TimesheetList
              timesheets={myTimesheets}
              onEdit={handleEdit}
              onDelete={handleDelete}
              currentUserId={currentUserId}
            />
          </div>
        )}

        {activeTab === 'approvals' && isManager && (
          <div className={styles.approvalsSection}>
            <ApprovalQueue
              pendingTimesheets={pendingTimesheets}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        )}
      </div>

      {/* New/Edit Timesheet Modal */}
      <Modal
        isOpen={showNewModal}
        onClose={handleCloseModal}
        title={editingTimesheet ? 'Editar Registro de Horas' : 'Registrar Horas'}
        size="medium"
      >
        <TimesheetForm
          projectId={projectId}
          timesheet={editingTimesheet}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};

export default TimesheetsPage;

