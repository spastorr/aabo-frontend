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
        <p>No hay registros personales de horas</p>
        <p className={styles.emptyHint}>Los registros se crean automáticamente al trabajar en documentos</p>
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
            <div className={styles.itemContent}>
              <div className={styles.itemMain}>
                <div className={styles.dateColumn}>
                  {formatDate(timesheet.date)}
                </div>
                <div className={styles.documentColumn}>
                  <div className={styles.documentCode}>{timesheet.documentCode}</div>
                  <div className={styles.documentName}>{timesheet.documentName}</div>
                </div>
                <div className={styles.hoursColumn}>
                  {timesheet.hours}h
                </div>
                <div className={styles.statusColumn}>
                  <Badge variant={TIMESHEET_STATUS_COLORS[timesheet.status]}>
                    {TIMESHEET_STATUS_LABELS[timesheet.status]}
                  </Badge>
                </div>
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.description}>
                  {timesheet.description}
                </div>
                {timesheet.status === TIMESHEET_STATUS.APPROVED && timesheet.approvedBy && (
                  <div className={styles.approvalInfo}>
                    Aprobado por {timesheet.approvedBy}
                  </div>
                )}
                {timesheet.status === TIMESHEET_STATUS.REJECTED && timesheet.rejectedBy && (
                  <div className={styles.rejectionInfo}>
                    Rechazado por {timesheet.rejectedBy}: {timesheet.rejectionReason}
                  </div>
                )}
              </div>

              {(canEdit || canDelete) && (
                <div className={styles.itemActions}>
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onEdit(timesheet)}
                    >
                      ✏️
                    </Button>
                  )}
                  {canDelete && (
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => onDelete(timesheet.id)}
                      className={styles.dangerBtn}
                    >
                      🗑️
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimesheetList;

