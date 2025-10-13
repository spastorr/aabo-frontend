/**
 * ResultsByCategory - Display results grouped by category
 * @module features/knowledgeHub/search/components/ContextualResults
 */

import PropTypes from 'prop-types';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './ResultsByCategory.module.css';

const ResultsByCategory = ({ title, items, type }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title} ({items.length})</h3>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <h4 className={styles.itemTitle}>{item.title || item.name}</h4>
              {item.relevanceScore && (
                <Badge variant="info" size="small">
                  {Math.round(item.relevanceScore * 100)}% relevante
                </Badge>
              )}
            </div>

            {item.code && (
              <code className={styles.itemCode}>{item.code}</code>
            )}

            {item.description && (
              <p className={styles.itemDescription}>{item.description}</p>
            )}

            {item.excerpt && (
              <div className={styles.excerpt}>
                <span className={styles.excerptLabel}>Coincidencia:</span>
                <span className={styles.excerptText} dangerouslySetInnerHTML={{ __html: item.excerpt }} />
              </div>
            )}

            <div className={styles.itemMeta}>
              {item.client && (
                <span className={styles.metaItem}>
                  Cliente: <strong>{item.client}</strong>
                </span>
              )}
              {item.date && (
                <span className={styles.metaItem}>
                  {formatDate(item.date)}
                </span>
              )}
              {item.category && (
                <span className={styles.metaItem}>
                  {item.category}
                </span>
              )}
            </div>

            <div className={styles.itemActions}>
              <Button variant="primary" size="small">
                Ver Detalles
              </Button>
              {type === 'project' && (
                <Button variant="outline" size="small">
                  Ver Documentos
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ResultsByCategory.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired
};

export default ResultsByCategory;

