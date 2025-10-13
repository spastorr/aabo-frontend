/**
 * NormsList - List of external norms
 * @module features/knowledgeHub/standards/components/ExternalNorms
 */

import PropTypes from 'prop-types';
import Badge from '../../../../../components/shared/Badge';
import Button from '../../../../../components/shared/Button';
import { formatDate } from '../../../../../utils';
import styles from './NormsList.module.css';

const NormsList = ({ norms }) => {
  const getOrgColor = (org) => {
    const colors = {
      'API': '#0066cc',
      'ASME': '#cc0000',
      'ISO': '#009900',
      'ASTM': '#ff6600',
      'IEEE': '#0099cc',
      'NFPA': '#cc0033',
      'ANSI': '#666666'
    };
    return colors[org] || '#666666';
  };

  return (
    <div className={styles.list}>
      {norms.map((norm) => (
        <div key={norm.id} className={styles.normCard}>
          <div className={styles.cardHeader}>
            <div className={styles.orgBadge} style={{ backgroundColor: getOrgColor(norm.organization) }}>
              {norm.organization}
            </div>
            <Badge variant="info" size="small">
              {norm.accessType === 'local' ? '📄 Archivo Local' : '🔗 Enlace Externo'}
            </Badge>
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{norm.title}</h3>
            <code className={styles.code}>{norm.code}</code>

            {norm.description && (
              <p className={styles.description}>{norm.description}</p>
            )}

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <strong>Edición:</strong> {norm.edition}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <strong>Año:</strong> {norm.year}
              </span>
              {norm.lastUpdate && (
                <>
                  <span className={styles.metaDivider}>•</span>
                  <span className={styles.metaItem}>
                    <strong>Última Actualización:</strong> {formatDate(norm.lastUpdate)}
                  </span>
                </>
              )}
              {norm.reaffirmed && (
                <>
                  <span className={styles.metaDivider}>•</span>
                  <span className={styles.metaItem} style={{ color: 'var(--color-success)' }}>
                    ✓ Reafirmado {norm.reaffirmed}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {norm.accessType === 'local' ? (
              <Button variant="primary" size="small">
                📥 Descargar PDF
              </Button>
            ) : (
              <Button variant="primary" size="small">
                🔗 Acceder Online
              </Button>
            )}
            <Button variant="outline" size="small">
              👁️ Ver Detalles
            </Button>
            {norm.hasUpdates && (
              <Badge variant="warning" size="small">
                🔔 Nueva versión disponible
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

NormsList.propTypes = {
  norms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
      edition: PropTypes.string.isRequired,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string,
      accessType: PropTypes.oneOf(['local', 'external']).isRequired,
      lastUpdate: PropTypes.string,
      reaffirmed: PropTypes.string,
      hasUpdates: PropTypes.bool
    })
  ).isRequired
};

export default NormsList;

