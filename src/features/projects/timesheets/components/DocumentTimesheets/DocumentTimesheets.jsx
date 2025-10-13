/**
 * DocumentTimesheets - Displays timesheets organized by documents
 * Shows traceability and resource usage per document
 * @module features/projects/timesheets/components/DocumentTimesheets
 */

import { useState, useEffect, useMemo } from 'react';
import { getDocumentsByProject } from '../../../../../services/documentsApi';
import { getTimesheetsByProject } from '../../../../../services/timesheetsApi';
import { getResourceAssignments } from '../../../../../services/resourcesApi';
import Button from '../../../../../components/shared/Button';
import Card from '../../../../../components/shared/Card';
import Badge from '../../../../../components/shared/Badge';
import styles from './DocumentTimesheets.module.css';

const DocumentTimesheets = ({ projectId, currentUserId, isManager, onEditTimesheet }) => {
  const [documents, setDocuments] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDocs, setExpandedDocs] = useState(new Set());

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [docsResponse, timesheetsResponse, assignmentsResponse] = await Promise.all([
        getDocumentsByProject(projectId),
        getTimesheetsByProject(projectId),
        getResourceAssignments(projectId)
      ]);

      if (docsResponse.success && timesheetsResponse.success && assignmentsResponse.success) {
        setDocuments(docsResponse.data);
        setTimesheets(timesheetsResponse.data);
        setAssignments(assignmentsResponse.data || []);
      } else {
        setError('Error al cargar datos');
      }
    } catch (err) {
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const documentsWithTimesheets = useMemo(() => {
    return documents.map(doc => {
      const docTimesheets = timesheets.filter(ts => ts.documentId === doc.id);
      const totalHours = docTimesheets.reduce((sum, ts) => sum + ts.hours, 0);
      const approvedHours = docTimesheets
        .filter(ts => ts.status === 'approved')
        .reduce((sum, ts) => sum + ts.hours, 0);

      // Get resource assignments for this document
      const docAssignments = assignments.filter(assignment =>
        assignment.documentId === doc.id
      );

      // Calculate estimated hours from assignments or revision history
      const assignmentHours = docAssignments.reduce((sum, assignment) =>
        sum + (assignment.estimatedHours || 0), 0
      );
      const revisionHours = doc.revisionHistory?.reduce((sum, rev) => {
        return sum + (rev.costBreakdown?.hours || 0);
      }, 0) || 0;
      const estimatedHours = Math.max(assignmentHours, revisionHours);

      // Calculate actual hours from assignments
      const actualAssignmentHours = docAssignments.reduce((sum, assignment) =>
        sum + (assignment.actualHours || 0), 0
      );

      return {
        ...doc,
        timesheets: docTimesheets,
        assignments: docAssignments,
        totalHours,
        approvedHours,
        estimatedHours,
        actualAssignmentHours,
        progress: estimatedHours > 0 ? (approvedHours / estimatedHours) * 100 : 0
      };
    }).sort((a, b) => {
      // Sort by status priority and then by code
      const statusPriority = { 'ELB': 1, 'ACC': 2, 'CMN': 3, 'APR': 4, 'IFC': 5 };
      const aPriority = statusPriority[a.status] || 99;
      const bPriority = statusPriority[b.status] || 99;

      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.code.localeCompare(b.code);
    });
  }, [documents, timesheets, assignments]);

  // Calculate overall traceability metrics
  const overallMetrics = useMemo(() => {
    const totalDocuments = documentsWithTimesheets.length;
    const documentsWithHours = documentsWithTimesheets.filter(doc => doc.totalHours > 0).length;
    const documentsCompleted = documentsWithTimesheets.filter(doc => doc.progress >= 100).length;
    const totalEstimatedHours = documentsWithTimesheets.reduce((sum, doc) => sum + doc.estimatedHours, 0);
    const totalActualHours = documentsWithTimesheets.reduce((sum, doc) => sum + doc.approvedHours, 0);
    const avgProgress = totalDocuments > 0 ?
      documentsWithTimesheets.reduce((sum, doc) => sum + doc.progress, 0) / totalDocuments : 0;

    return {
      totalDocuments,
      documentsWithHours,
      documentsCompleted,
      totalEstimatedHours,
      totalActualHours,
      avgProgress,
      efficiency: totalEstimatedHours > 0 ? (totalActualHours / totalEstimatedHours) * 100 : 0
    };
  }, [documentsWithTimesheets]);

  const toggleExpanded = (docId) => {
    const newExpanded = new Set(expandedDocs);
    if (newExpanded.has(docId)) {
      newExpanded.delete(docId);
    } else {
      newExpanded.add(docId);
    }
    setExpandedDocs(newExpanded);
  };

  const getStatusColor = (status) => {
    const colors = {
      'ELB': 'secondary',
      'ACC': 'warning',
      'CMN': 'warning',
      'APR': 'success',
      'IFC': 'success',
      'ASB': 'info'
    };
    return colors[status] || 'default';
  };

  const formatHours = (hours) => {
    return hours ? `${hours.toFixed(1)}h` : '0.0h';
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando planillas por documento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>❌ {error}</p>
        <Button onClick={loadData} variant="outline" size="small">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>📊 Trazabilidad de Recursos</h3>
        <p className={styles.description}>
          Seguimiento completo del progreso real vs estimado por documento y asignación de recursos.
        </p>
      </div>

      {/* Project Overview */}
      <div className={styles.projectOverview}>
        <div className={styles.overviewStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{overallMetrics.totalDocuments}</span>
            <span className={styles.statLabel}>Documentos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{overallMetrics.avgProgress.toFixed(0)}%</span>
            <span className={styles.statLabel}>Progreso</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {formatHours(overallMetrics.totalActualHours)}
            </span>
            <span className={styles.statLabel}>Horas Aprobadas</span>
          </div>
        </div>
      </div>

      <div className={styles.documentsList}>
        {documentsWithTimesheets.map(doc => (
          <Card key={doc.id} className={styles.documentCard}>
            <div className={styles.documentRow}>
              <div className={styles.documentMain}>
                <div className={styles.documentInfo}>
                  <Badge variant={getStatusColor(doc.status)} size="small">
                    {doc.status}
                  </Badge>
                  <div className={styles.documentDetails}>
                    <span className={styles.documentCode}>{doc.code}</span>
                    <span className={styles.documentName}>{doc.name}</span>
                  </div>
                </div>

                <div className={styles.documentProgress}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${Math.min(doc.progress, 100)}%` }}
                    />
                  </div>
                  <span className={styles.progressPercent}>{doc.progress.toFixed(0)}%</span>
                </div>

                <div className={styles.hoursInfo}>
                  <span className={styles.hoursValue}>
                    {formatHours(doc.approvedHours)} / {formatHours(doc.estimatedHours)}
                  </span>
                  <span className={styles.hoursLabel}>horas</span>
                </div>

                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => toggleExpanded(doc.id)}
                  className={styles.expandButton}
                >
                  {expandedDocs.has(doc.id) ? '−' : '+'}
                </Button>
              </div>
            </div>

            {expandedDocs.has(doc.id) && (
              <div className={styles.documentDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Responsable:</span>
                  <span className={styles.detailValue}>{doc.responsible}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Disciplina:</span>
                  <span className={styles.detailValue}>{doc.discipline}</span>
                </div>

                {/* Combined Activity Section */}
                <div className={styles.activitySection}>
                  {doc.assignments.length > 0 && (
                    <div className={styles.activityGroup}>
                      <h6 className={styles.activityTitle}>👥 Recursos Asignados</h6>
                      <div className={styles.activityList}>
                        {doc.assignments.map(assignment => (
                          <div key={assignment.id} className={styles.activityItem}>
                            <span className={styles.activityUser}>{assignment.userName}</span>
                            <span className={styles.activityHours}>
                              {formatHours(assignment.actualHours || 0)}/{formatHours(assignment.estimatedHours)}h
                            </span>
                            <Badge
                              variant={
                                assignment.status === 'completed' ? 'success' :
                                assignment.status === 'in_progress' ? 'warning' : 'info'
                              }
                              size="small"
                            >
                              {assignment.status === 'completed' ? '✓' :
                               assignment.status === 'in_progress' ? '⏳' : '○'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.activityGroup}>
                    <h6 className={styles.activityTitle}>⏱️ Registros de Tiempo</h6>
                    {doc.timesheets.length === 0 ? (
                      <div className={styles.noActivity}>
                        Sin registros de tiempo
                        {isManager && (
                          <Button variant="outline" size="small">
                            + Registrar
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className={styles.activityList}>
                        {doc.timesheets.map(timesheet => (
                          <div key={timesheet.id} className={styles.activityItem}>
                            <span className={styles.activityDate}>
                              {new Date(timesheet.date).toLocaleDateString('es-ES', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            <span className={styles.activityUser}>{timesheet.userName}</span>
                            <span className={styles.activityHours}>{formatHours(timesheet.hours)}</span>
                            <Badge
                              variant={
                                timesheet.status === 'approved' ? 'success' :
                                timesheet.status === 'pending' ? 'warning' :
                                timesheet.status === 'rejected' ? 'danger' : 'default'
                              }
                              size="small"
                            >
                              {timesheet.status === 'approved' ? '✓' :
                               timesheet.status === 'pending' ? '⏳' :
                               timesheet.status === 'rejected' ? '✗' : '?'}
                            </Badge>
                            {timesheet.userId === currentUserId && (
                              <Button
                                variant="ghost"
                                size="small"
                                onClick={() => onEditTimesheet(timesheet)}
                                className={styles.editBtn}
                              >
                                ✏️
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {documentsWithTimesheets.length === 0 && (
        <div className={styles.emptyState}>
          <p>No hay documentos en este proyecto</p>
        </div>
      )}
    </div>
  );
};

export default DocumentTimesheets;
