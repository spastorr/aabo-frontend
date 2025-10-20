/**
 * GuideList - List of internal guides
 * @module features/knowledgeHub/standards/components/InternalGuides
 */

import PropTypes from 'prop-types';
import Badge from '../../../../../components/shared/Badge';
import Button from '../../../../../components/shared/Button';
import { formatDate } from '../../../../../utils';
import styles from './GuideList.module.css';

const GuideList = ({ guides }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'in-review':
        return 'warning';
      case 'draft':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'in-review':
        return 'En Revisión';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  return (
    <div className={styles.list}>
      {guides.map((guide) => (
        <div key={guide.id} className={styles.guideCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <div className={styles.titleRow}>
                <h3 className={styles.title}>{guide.title}</h3>
                <Badge variant={getStatusVariant(guide.status)} size="small">
                  {getStatusLabel(guide.status)}
                </Badge>
              </div>
              <code className={styles.code}>{guide.code}</code>
            </div>
          </div>

          {guide.description && (
            <p className={styles.description}>{guide.description}</p>
          )}

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <strong>Categoría:</strong> {guide.category}
            </span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaItem}>
              <strong>Versión:</strong> {guide.version}
            </span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaItem}>
              <strong>Actualizado:</strong> {formatDate(guide.lastUpdate)}
            </span>
            {guide.author && (
              <>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaItem}>
                  <strong>Autor:</strong> {guide.author}
                </span>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <Button variant="primary" size="small">
              📥 Descargar
            </Button>
            <Button variant="outline" size="small">
              → Ver Detalles
            </Button>
            <Button variant="text" size="small">
              📜 Historial
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

GuideList.propTypes = {
  guides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['approved', 'in-review', 'draft']).isRequired,
      lastUpdate: PropTypes.string.isRequired,
      author: PropTypes.string
    })
  ).isRequired
};

export default GuideList;

