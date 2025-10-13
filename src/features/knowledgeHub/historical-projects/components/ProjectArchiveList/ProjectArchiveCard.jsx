/**
 * ProjectArchiveCard - Card display for archived project
 * @module features/knowledgeHub/historical-projects/components/ProjectArchiveList
 */

import PropTypes from 'prop-types';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './ProjectArchiveCard.module.css';

const ProjectArchiveCard = ({ project, onClick }) => {
  const {
    code,
    name,
    client,
    type,
    completionDate,
    duration,
    documents,
    tags,
    disciplines,
    successRate
  } = project;

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.codeSection}>
          <div className={styles.code}>{code}</div>
          {successRate && successRate >= 90 && (
            <Badge variant="success" size="small">
              ⭐ Exitoso
            </Badge>
          )}
        </div>
        <div className={styles.typeTag}>{type}</div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.client}>Cliente: {client}</p>

        {/* Disciplines */}
        {disciplines && disciplines.length > 0 && (
          <div className={styles.disciplines}>
            {disciplines.slice(0, 3).map((discipline, index) => (
              <span key={index} className={styles.disciplinePill}>
                {discipline}
              </span>
            ))}
            {disciplines.length > 3 && (
              <span className={styles.moreDisciplines}>
                +{disciplines.length - 3} más
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>📄</span>
            <span className={styles.statValue}>{documents}</span>
            <span className={styles.statLabel}>docs</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>📅</span>
            <span className={styles.statValue}>{duration}</span>
            <span className={styles.statLabel}>meses</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>✓</span>
            <span className={styles.statValue}>{successRate}%</span>
            <span className={styles.statLabel}>éxito</span>
          </div>
        </div>

        <div className={styles.completionDate}>
          Completado: {formatDate(completionDate)}
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.slice(0, 4).map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className={styles.moreTags}>
              +{tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Hover overlay */}
      <div className={styles.hoverOverlay}>
        <span className={styles.viewButton}>Ver Detalles →</span>
      </div>
    </div>
  );
};

ProjectArchiveCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    completionDate: PropTypes.string.isRequired,
    duration: PropTypes.number,
    documents: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    disciplines: PropTypes.arrayOf(PropTypes.string),
    successRate: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProjectArchiveCard;

