/**
 * VersionControl - Display version history of standards
 * @module features/knowledgeHub/standards/components/VersionControl
 */

import PropTypes from 'prop-types';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './VersionControl.module.css';

const VersionControl = ({ type, entityId }) => {
  // Mock version history
  const versions = [
    {
      id: 1,
      version: '3.0',
      date: '2024-01-15',
      status: 'active',
      changes: 'Actualización mayor con nuevos requisitos de seguridad',
      author: 'Cliente / Sistema'
    },
    {
      id: 2,
      version: '2.5',
      date: '2023-06-10',
      status: 'archived',
      changes: 'Correcciones menores y actualizaciones de formato',
      author: 'Cliente / Sistema'
    },
    {
      id: 3,
      version: '2.0',
      date: '2022-11-20',
      status: 'archived',
      changes: 'Revisión completa de procedimientos de inspección',
      author: 'Cliente / Sistema'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        {versions.map((version, index) => (
          <div key={version.id} className={styles.versionItem}>
            <div className={styles.indicator}>
              <div className={`${styles.dot} ${version.status === 'active' ? styles.active : ''}`}></div>
              {index < versions.length - 1 && <div className={styles.line}></div>}
            </div>

            <div className={styles.versionCard}>
              <div className={styles.versionHeader}>
                <div className={styles.versionInfo}>
                  <span className={styles.versionNumber}>v{version.version}</span>
                  <span className={styles.versionDate}>{formatDate(version.date)}</span>
                </div>
                <Badge
                  variant={version.status === 'active' ? 'success' : 'neutral'}
                  size="small"
                >
                  {version.status === 'active' ? '✓ Activa' : 'Archivada'}
                </Badge>
              </div>

              <p className={styles.changes}>{version.changes}</p>
              <p className={styles.author}>Por: {version.author}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          💡 Las versiones anteriores se archivan con acceso de solo lectura, eliminando el riesgo de usar información obsoleta.
        </p>
      </div>
    </div>
  );
};

VersionControl.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired
};

export default VersionControl;

