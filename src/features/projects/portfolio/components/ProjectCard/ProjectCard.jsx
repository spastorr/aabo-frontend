/**
 * ProjectCard component
 * Displays a project summary card in the portfolio
 * @module features/projects/portfolio/components/ProjectCard
 */

import { useNavigate } from 'react-router-dom';
import Card from '../../../../../components/shared/Card';
import Badge from '../../../../../components/shared/Badge';
import { PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS } from '../../../../../constants';
import { formatDate, formatCurrency, formatPercentage } from '../../../../../utils';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
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

  const handleCardClick = () => {
    navigate(`/projects/${project.id}/dashboard`);
  };

  const progressPercentage = project.progress || 0;
  const budgetUsed = (project.spent / project.budget) * 100;

  return (
    <Card className={styles.projectCard} onClick={handleCardClick}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectCode}>{project.code}</p>
        </div>
        <Badge variant={getStatusVariant(project.status)}>
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
      </div>

      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Cliente:</span>
          <span className={styles.value}>{project.client}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Tipo:</span>
          <span className={styles.value}>{PROJECT_TYPE_LABELS[project.type] || project.type}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Período:</span>
          <span className={styles.value}>
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>

        <div className={styles.description}>
          {project.description}
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Avance</span>
            <span className={styles.metricValue}>{formatPercentage(progressPercentage, false)}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Presupuesto</span>
            <span className={styles.metricValue}>
              {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={`${styles.progressFill} ${budgetUsed > 90 ? styles.warning : ''}`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.team}>
          <span className={styles.teamIcon}>👥</span>
          <span>{project.teamMembers} miembros</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;

