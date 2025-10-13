/**
 * TimesheetList - Display list of timesheet entries
 * @module features/projects/timesheets/components/TimesheetList
 */

import { useState } from 'react';
import { TIMESHEET_STATUS, TIMESHEET_STATUS_LABELS, TIMESHEET_STATUS_COLORS } from '../../../../../constants';
import Badge from '../../../../../components/shared/Badge';
import Button from '../../../../../components/shared/Button';
import styles from './TimesheetList.module.css';

const TimesheetList = ({ timesheets, onEdit, onDelete, currentUserId }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!timesheets || timesheets.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📝 No hay registros de horas para mostrar</p>
        <p className={styles.emptyHint}>Registra tus primeras horas usando el formulario arriba</p>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.list}>
      {timesheets.map(timesheet => {
        const isExpanded = expandedId === timesheet.id;
        const canEdit = timesheet.status === TIMESHEET_STATUS.DRAFT || 
                       timesheet.status === TIMESHEET_STATUS.REJECTED;
        const canDelete = timesheet.status !== TIMESHEET_STATUS.APPROVED;

        return (
          <div key={timesheet.id} className={styles.item}>
            <div className={styles.header} onClick={() => toggleExpand(timesheet.id)}>
              <div className={styles.mainInfo}>
                <div className={styles.date}>
                  📅 {formatDate(timesheet.date)}
                </div>
                <div className={styles.document}>
                  <span className={styles.documentCode}>{timesheet.documentCode}</span>
                  <span className={styles.documentName}>{timesheet.documentName}</span>
                </div>
              </div>
              
              <div className={styles.metaInfo}>
                <div className={styles.hours}>
                  <span className={styles.hoursValue}>{timesheet.hours}</span>
                  <span className={styles.hoursLabel}>horas</span>
                </div>
                <Badge variant={TIMESHEET_STATUS_COLORS[timesheet.status]}>
                  {TIMESHEET_STATUS_LABELS[timesheet.status]}
                </Badge>
                <button className={styles.expandBtn}>
                  {isExpanded ? '▼' : '▶'}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className={styles.details}>
                <div className={styles.description}>
                  <strong>Descripción:</strong>
                  <p>{timesheet.description}</p>
                </div>

                {timesheet.status === TIMESHEET_STATUS.APPROVED && (
                  <div className={styles.approval}>
                    <p>✅ Aprobado por <strong>{timesheet.approvedBy}</strong> el {formatDate(timesheet.approvedDate)}</p>
                    {timesheet.approvalComments && (
                      <p className={styles.comments}>Comentarios: {timesheet.approvalComments}</p>
                    )}
                  </div>
                )}

                {timesheet.status === TIMESHEET_STATUS.REJECTED && (
                  <div className={styles.rejection}>
                    <p>❌ Rechazado por <strong>{timesheet.rejectedBy}</strong> el {formatDate(timesheet.rejectedDate)}</p>
                    <p className={styles.reason}>Razón: {timesheet.rejectionReason}</p>
                  </div>
                )}

                {(canEdit || canDelete) && (
                  <div className={styles.actions}>
                    {canEdit && (
                      <Button 
                        variant="outline" 
                        size="small" 
                        onClick={() => onEdit(timesheet)}
                      >
                        ✏️ Editar
                      </Button>
                    )}
                    {canDelete && (
                      <Button 
                        variant="danger" 
                        size="small" 
                        onClick={() => onDelete(timesheet.id)}
                      >
                        🗑️ Eliminar
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TimesheetList;

