/**
 * Timesheet status constants
 * @module constants/timesheetStatuses
 */

export const TIMESHEET_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const TIMESHEET_STATUS_LABELS = {
  [TIMESHEET_STATUS.DRAFT]: 'Borrador',
  [TIMESHEET_STATUS.PENDING]: 'Pendiente Aprobación',
  [TIMESHEET_STATUS.APPROVED]: 'Aprobado',
  [TIMESHEET_STATUS.REJECTED]: 'Rechazado',
};

export const TIMESHEET_STATUS_COLORS = {
  [TIMESHEET_STATUS.DRAFT]: 'gray',
  [TIMESHEET_STATUS.PENDING]: 'warning',
  [TIMESHEET_STATUS.APPROVED]: 'success',
  [TIMESHEET_STATUS.REJECTED]: 'danger',
};

