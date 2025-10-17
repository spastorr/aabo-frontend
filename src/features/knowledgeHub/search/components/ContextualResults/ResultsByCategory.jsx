/**
 * ResultsByCategory - Display results grouped by category
 * @module features/knowledgeHub/search/components/ContextualResults
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import ResultDetailsModal from '../ResultDetailsModal';
import styles from './ResultsByCategory.module.css';

const ResultsByCategory = ({ title, items, type }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleQuickAccess = (item, e) => {
    e.stopPropagation();
    
    switch (type) {
      case 'guide':
        // Navigate to internal guides section
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
        break;
      case 'norm':
        if (item.accessType === 'external') {
          // Open external organization website
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
          // Navigate to external norms section
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
        break;
      case 'standard':
        // Navigate to client standards section
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
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title} ({items.length})</h3>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemHeader}>
              <div className={styles.itemTitleSection}>
                <h4 className={styles.itemTitle}>{item.title || item.name}</h4>
                {item.code && (
                  <code className={styles.itemCode}>{item.code}</code>
                )}
              </div>
              {item.relevanceScore && (
                <Badge variant="info" size="small">
                  {Math.round(item.relevanceScore * 100)}%
                </Badge>
              )}
            </div>

            <div className={styles.itemFooter}>
              <div className={styles.itemMeta}>
                {item.client && (
                  <span className={styles.metaItem}>{item.client}</span>
                )}
                {item.category && (
                  <span className={styles.metaItem}>{item.category}</span>
                )}
                {item.organization && (
                  <span className={styles.metaItem}>{item.organization}</span>
                )}
              </div>
              
              <div className={styles.itemActions}>
                {(type === 'guide' || type === 'norm' || type === 'standard') && (
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={(e) => handleQuickAccess(item, e)}
                    title={type === 'norm' && item.accessType === 'external' ? 'Ir al sitio oficial' : 'Abrir documento'}
                  >
                    {type === 'norm' && item.accessType === 'external' ? '🔗' : '📄'}
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => handleViewDetails(item)}
                >
                  Ver Detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <ResultDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
        type={type}
      />
    </div>
  );
};

ResultsByCategory.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired
};

export default ResultsByCategory;

