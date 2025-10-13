/**
 * StatusBadge component for document status
 * @module features/projects/lmd/components/StatusBadge
 */

import Badge from '../../../../../components/shared/Badge';
import { DOCUMENT_STATUS_LABELS, DOCUMENT_STATUS_DETAILED } from '../../../../../constants';

const StatusBadge = ({ status, size = 'small' }) => {
  const getVariant = (status) => {
    switch (status) {
      case 'APR':
      case 'IFC':  // Para Construcción
        return 'success';
      case 'ACC':
      case 'CMN':
        return 'warning';
      case 'RCH':
        return 'danger';
      case 'ASB':  // As Built
        return 'info';
      case 'RDL':  // Red Line
        return 'warning';
      case 'ELB':
      case 'REV':
        return 'default';
      default:
        return 'default';
    }
  };

  const getLabel = (status) => {
    // Check if it's a detailed status
    if (DOCUMENT_STATUS_DETAILED[status]) {
      return DOCUMENT_STATUS_DETAILED[status].label;
    }
    // Fall back to basic labels
    return DOCUMENT_STATUS_LABELS[status] || status;
  };

  return (
    <Badge variant={getVariant(status)} size={size}>
      {getLabel(status)}
    </Badge>
  );
};

export default StatusBadge;

