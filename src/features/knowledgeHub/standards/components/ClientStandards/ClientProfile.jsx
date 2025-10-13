/**
 * ClientProfile - Detailed view of client standards
 * @module features/knowledgeHub/standards/components/ClientStandards
 */

import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import VersionControl from '../VersionControl';
import { formatDate } from '../../../../../utils';
import styles from './ClientProfile.module.css';

const ClientProfile = ({ client, onClose }) => {
  const {
    name,
    code,
    description,
    standards = [],
    activeProjects,
    contactInfo
  } = client;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${name} - Perfil del Cliente`}
      size="large"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.clientIcon}>🏢</div>
          <div className={styles.headerInfo}>
            <h2 className={styles.clientName}>{name}</h2>
            <code className={styles.clientCode}>{code}</code>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{standards.length}</span>
            <span className={styles.statLabel}>Estándares Disponibles</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{activeProjects}</span>
            <span className={styles.statLabel}>Proyectos Activos</span>
          </div>
        </div>

        {/* Contact Info */}
        {contactInfo && (
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>📞 Información de Contacto</h3>
            <div className={styles.contactGrid}>
              {contactInfo.email && (
                <div className={styles.contactItem}>
                  <strong>Email:</strong> {contactInfo.email}
                </div>
              )}
              {contactInfo.phone && (
                <div className={styles.contactItem}>
                  <strong>Teléfono:</strong> {contactInfo.phone}
                </div>
              )}
              {contactInfo.address && (
                <div className={styles.contactItem}>
                  <strong>Dirección:</strong> {contactInfo.address}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Standards List */}
        <div className={styles.standardsSection}>
          <h3 className={styles.sectionTitle}>📄 Estándares y Especificaciones</h3>
          {standards.length > 0 ? (
            <div className={styles.standardsList}>
              {standards.map((standard) => (
                <div key={standard.id} className={styles.standardCard}>
                  <div className={styles.standardHeader}>
                    <div className={styles.standardInfo}>
                      <h4 className={styles.standardName}>{standard.name}</h4>
                      <code className={styles.standardCode}>{standard.code}</code>
                    </div>
                    <Badge
                      variant={standard.isActive ? 'success' : 'neutral'}
                      size="small"
                    >
                      {standard.isActive ? 'Activo' : 'Archivado'}
                    </Badge>
                  </div>

                  <div className={styles.standardMeta}>
                    <span className={styles.metaItem}>
                      <strong>Versión:</strong> {standard.version}
                    </span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaItem}>
                      <strong>Actualizado:</strong> {formatDate(standard.lastUpdate)}
                    </span>
                    {standard.category && (
                      <>
                        <span className={styles.metaDivider}>•</span>
                        <span className={styles.metaItem}>
                          <strong>Categoría:</strong> {standard.category}
                        </span>
                      </>
                    )}
                  </div>

                  <div className={styles.standardActions}>
                    <Button variant="outline" size="small">
                      📥 Descargar
                    </Button>
                    <Button variant="text" size="small">
                      📜 Ver Historial
                    </Button>
                  </div>

                  {standard.description && (
                    <p className={styles.standardDescription}>{standard.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No hay estándares disponibles para este cliente</p>
            </div>
          )}
        </div>

        {/* Version Control Info */}
        <div className={styles.versionSection}>
          <h3 className={styles.sectionTitle}>🔄 Control de Versiones</h3>
          <VersionControl type="client" entityId={client.id} />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary">
            ➕ Subir Nueva Especificación
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ClientProfile.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    description: PropTypes.string,
    standards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        isActive: PropTypes.bool,
        category: PropTypes.string,
        description: PropTypes.string
      })
    ),
    activeProjects: PropTypes.number,
    contactInfo: PropTypes.shape({
      email: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string
    })
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ClientProfile;

