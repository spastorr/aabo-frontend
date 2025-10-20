/**
 * ResultDetailsModal - Modal to display detailed information about a search result
 * @module features/knowledgeHub/search/components/ResultDetailsModal
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import DocumentDetailModal from '../../../../projects/lmd/components/DocumentDetailModal';
import { formatDate } from '../../../../../utils';
import styles from './ResultDetailsModal.module.css';

const ResultDetailsModal = ({ isOpen, onClose, item, type }) => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  
  if (!item) return null;

  const handleAccessProject = () => {
    // Navigate to historical project details page
    navigate(`/knowledge-hub/historical-projects/${item.id}`);
  };

  const handleAccessGuide = () => {
    // Navigate to internal guides section with this guide highlighted
    navigate('/knowledge-hub/standards', {
      state: {
        activeTab: 'internal',
        highlightedItem: {
          id: item.id,
          code: item.code,
          title: item.title
        }
      }
    });
  };

  const handleAccessNorm = () => {
    if (item.accessType === 'external') {
      // For external norms, open the official website
      const organizationUrls = {
        'API': 'https://www.api.org/',
        'ASME': 'https://www.asme.org/',
        'ISO': 'https://www.iso.org/',
        'ASTM': 'https://www.astm.org/',
        'NFPA': 'https://www.nfpa.org/',
        'ISA': 'https://www.isa.org/'
      };
      
      const url = organizationUrls[item.organization] || '#';
      if (url !== '#') {
        window.open(url, '_blank');
      } else {
        alert(`Redirigiendo a ${item.organization}\n\nEn producción, esto abriría el sitio oficial de ${item.organization}.`);
      }
    } else {
      // Navigate to external norms section with this norm highlighted
      navigate('/knowledge-hub/standards', {
        state: {
          activeTab: 'external',
          highlightedItem: {
            id: item.id,
            code: item.code,
            title: item.title
          }
        }
      });
    }
  };

  const handleAccessStandard = () => {
    // Navigate to client standards section with this standard highlighted
    navigate('/knowledge-hub/standards', {
      state: {
        activeTab: 'client',
        highlightedItem: {
          id: item.id,
          code: item.code,
          name: item.name,
          client: item.client
        }
      }
    });
  };

  const handleViewDocument = () => {
    // For projects, navigate to project with LMD tab active
    if (type === 'project') {
      navigate(`/knowledge-hub/historical-projects/${item.id}`, {
        state: { activeTab: 'lmd' }
      });
      return;
    }
    
    // For other types, open document viewer or download
    console.log('Viewing document:', item.code);
    alert(`Vista previa del documento\n\nEn producción, esto abriría un visor de documentos o iniciaría la descarga.`);
  };

  const handleOpenDocument = (document) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  const renderProjectDetails = () => (
    <div className={styles.detailsContent}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{item.name}</h2>
          <code className={styles.code}>{item.code}</code>
        </div>
        <Badge variant="success">{item.status}</Badge>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📋 Información General</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Cliente:</span>
            <span className={styles.value}>{item.client}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Tipo:</span>
            <span className={styles.value}>{item.type}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Duración:</span>
            <span className={styles.value}>{item.duration} meses</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Tasa de Éxito:</span>
            <span className={styles.value}>{item.successRate}%</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📝 Descripción</h3>
        <p className={styles.description}>{item.description}</p>
      </div>

      {item.disciplines && item.disciplines.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>🔧 Disciplinas</h3>
          <div className={styles.tags}>
            {item.disciplines.map((disc, index) => (
              <span key={index} className={styles.tag}>{disc}</span>
            ))}
          </div>
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>🏷️ Tags</h3>
          <div className={styles.tags}>
            {item.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📊 Métricas del Proyecto</h3>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{item.documents || 0}</div>
            <div className={styles.metricLabel}>Documentos</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{item.transmittals || 0}</div>
            <div className={styles.metricLabel}>Transmittals</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{item.rfis || 0}</div>
            <div className={styles.metricLabel}>RFIs</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>{item.teamMembers || 0}</div>
            <div className={styles.metricLabel}>Miembros</div>
          </div>
        </div>
      </div>

      {item.lmd && item.lmd.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📄 Documentos Principales</h3>
          <div className={styles.documentsList}>
            {item.lmd.slice(0, 5).map((doc, index) => (
              <div key={index} className={styles.documentItem}>
                <div className={styles.documentInfo}>
                  <span className={styles.documentCode}>{doc.code}</span>
                  <span className={styles.documentName}>{doc.name}</span>
                </div>
                <div className={styles.documentActions}>
                  <Badge variant="outline" size="small">
                    {doc.discipline}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => handleOpenDocument(doc)}
                    title="Ver detalles del documento"
                  >
                    📄
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {item.lmd.length > 5 && (
            <p className={styles.moreInfo}>
              Y {item.lmd.length - 5} documentos más...
            </p>
          )}
        </div>
      )}

      {item.lessonsLearned && item.lessonsLearned.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>💡 Lecciones Aprendidas</h3>
          <ul className={styles.lessonsList}>
            {item.lessonsLearned.map((lesson, index) => (
              <li key={index} className={styles.lessonItem}>{lesson}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderGuideDetails = () => (
    <div className={styles.detailsContent}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{item.title}</h2>
          <code className={styles.code}>{item.code}</code>
        </div>
        <Badge variant="success">{item.version}</Badge>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📋 Información</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Categoría:</span>
            <span className={styles.value}>{item.category}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Estado:</span>
            <span className={styles.value}>
              {item.status === 'approved' ? 'Aprobado' : 'En revisión'}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Última actualización:</span>
            <span className={styles.value}>{formatDate(item.lastUpdate)}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Autor:</span>
            <span className={styles.value}>{item.author}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📝 Descripción</h3>
        <p className={styles.description}>{item.description || item.excerpt}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>📄</div>
          <div>
            <h4 className={styles.infoBoxTitle}>Documento Interno</h4>
            <p className={styles.infoBoxText}>
              Esta guía es parte de la biblioteca interna de conocimiento de AABO. 
              Contiene procedimientos, mejores prácticas y lecciones aprendidas del equipo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNormDetails = () => (
    <div className={styles.detailsContent}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{item.title}</h2>
          <code className={styles.code}>{item.code}</code>
        </div>
        <Badge variant="info">{item.organization}</Badge>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📋 Información</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Organización:</span>
            <span className={styles.value}>{item.organization}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Edición:</span>
            <span className={styles.value}>{item.edition}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Año:</span>
            <span className={styles.value}>{item.year}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Acceso:</span>
            <span className={styles.value}>
              {item.accessType === 'local' ? 'Disponible localmente' : 'Referencia externa'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📝 Descripción</h3>
        <p className={styles.description}>{item.description || item.excerpt}</p>
      </div>

      {item.reaffirmed && (
        <div className={styles.section}>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>✓</div>
            <div>
              <h4 className={styles.infoBoxTitle}>Reafirmado en {item.reaffirmed}</h4>
              <p className={styles.infoBoxText}>
                Este estándar fue revisado y reafirmado, mantiene su vigencia.
              </p>
            </div>
          </div>
        </div>
      )}

      {item.hasUpdates && (
        <div className={styles.section}>
          <div className={styles.infoBox} data-type="warning">
            <div className={styles.infoIcon}>⚠️</div>
            <div>
              <h4 className={styles.infoBoxTitle}>Nueva Versión Disponible</h4>
              <p className={styles.infoBoxText}>
                Existe una actualización de este estándar. Revisa la nueva versión.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStandardDetails = () => (
    <div className={styles.detailsContent}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{item.name}</h2>
          <code className={styles.code}>{item.code}</code>
        </div>
        <Badge variant="primary">{item.client}</Badge>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📋 Información</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Cliente:</span>
            <span className={styles.value}>{item.client}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Categoría:</span>
            <span className={styles.value}>{item.category}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Versión:</span>
            <span className={styles.value}>{item.version}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Estado:</span>
            <span className={styles.value}>
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📝 Descripción</h3>
        <p className={styles.description}>{item.description}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>🏢</div>
          <div>
            <h4 className={styles.infoBoxTitle}>Especificación de Cliente</h4>
            <p className={styles.infoBoxText}>
              Este documento es una especificación particular del cliente {item.client}. 
              Debe cumplirse en todos los proyectos para este cliente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const getModalTitle = () => {
    switch (type) {
      case 'project':
        return '📚 Detalles del Proyecto Histórico';
      case 'guide':
        return '📄 Detalles de la Guía Interna';
      case 'norm':
        return '🌐 Detalles de la Normativa Externa';
      case 'standard':
        return '📋 Detalles del Estándar de Cliente';
      default:
        return 'Detalles';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'project':
        return renderProjectDetails();
      case 'guide':
        return renderGuideDetails();
      case 'norm':
        return renderNormDetails();
      case 'standard':
        return renderStandardDetails();
      default:
        return <p>Tipo de contenido no reconocido</p>;
    }
  };

  const renderActions = () => {
    switch (type) {
      case 'project':
        return (
          <>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="secondary" onClick={handleViewDocument}>
              📄 Ver LMD
            </Button>
            <Button variant="primary" onClick={handleAccessProject}>
              🏭 Acceder al Proyecto
            </Button>
          </>
        );
      case 'guide':
        return (
          <>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="secondary" onClick={handleViewDocument}>
              → Vista Previa
            </Button>
            <Button variant="primary" onClick={handleAccessGuide}>
              📄 Abrir Guía
            </Button>
          </>
        );
      case 'norm':
        return (
          <>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            {item.accessType === 'local' && (
              <Button variant="secondary" onClick={handleViewDocument}>
                → Vista Previa
              </Button>
            )}
            <Button variant="primary" onClick={handleAccessNorm}>
              {item.accessType === 'local' ? '📄 Abrir Normativa' : '🔗 Ir al Sitio Oficial'}
            </Button>
          </>
        );
      case 'standard':
        return (
          <>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="secondary" onClick={handleViewDocument}>
              → Vista Previa
            </Button>
            <Button variant="primary" onClick={handleAccessStandard}>
              📋 Ver en Estándares
            </Button>
          </>
        );
      default:
        return (
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getModalTitle()}
        size="large"
      >
        {renderContent()}
        
        <div className={styles.actions}>
          {renderActions()}
        </div>
      </Modal>

      {/* Document Detail Modal */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDocumentModalOpen}
        onClose={handleCloseDocumentModal}
        isHistorical={true}
        projectId={selectedDocument?.projectId}
        onDocumentUpdate={() => {}} // No updates allowed for search results
      />
    </>
  );
};

ResultDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  type: PropTypes.string.isRequired
};

export default ResultDetailsModal;

