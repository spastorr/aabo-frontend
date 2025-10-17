/**
 * ProjectListItem component
 * Displays a project as a compact list item
 * @module features/projects/portfolio/components/ProjectListItem
 */

import { useNavigate } from 'react-router-dom';
import Badge from '../../../../../components/shared/Badge';
import { PROJECT_STATUS_LABELS } from '../../../../../constants';
import { formatDate, formatCurrency, formatPercentage } from '../../../../../utils';
import styles from './ProjectListItem.module.css';

const ProjectListItem = ({ project, isReadOnly = false }) => {
  const navigate = useNavigate();

  const getStatusVariant = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'ON_HOLD':
        return 'warning';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleClick = () => {
    if (isReadOnly) {
      navigate(`/knowledge-hub/historical-projects/${project.id}`);
    } else {
      navigate(`/projects/${project.id}/dashboard`);
    }
  };

  const progressPercentage = project.progress || 0;
  const budgetUsed = (project.spent / project.budget) * 100;

  return (
    <div className={styles.listItem} onClick={handleClick}>
      {/* Project Name & Code */}
      <div className={styles.nameSection}>
        <h3 className={styles.projectName}>{project.name}</h3>
        <p className={styles.projectCode}>{project.code}</p>
      </div>

      {/* Client */}
      <div className={styles.infoSection}>
        <span className={styles.value}>{project.client}</span>
      </div>

      {/* Start Date */}
      <div className={styles.infoSection}>
        <span className={styles.value}>{formatDate(project.startDate)}</span>
      </div>

      {/* End Date */}
      <div className={styles.infoSection}>
        <span className={styles.value}>{formatDate(project.endDate)}</span>
      </div>

      {/* Progress */}
      <div className={styles.progressSection}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {formatPercentage(progressPercentage, false)}
        </span>
      </div>

      {/* Budget */}
      <div className={styles.budgetSection}>
        <span className={styles.budgetValue}>
          {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
        </span>
      </div>

      {/* Status Badge */}
      <div className={styles.statusSection}>
        <Badge variant={getStatusVariant(project.status)}>
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
      </div>
    </div>
  );
};

export default ProjectListItem;

