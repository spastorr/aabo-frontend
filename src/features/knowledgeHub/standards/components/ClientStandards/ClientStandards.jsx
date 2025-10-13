/**
 * ClientStandards - Client specifications management
 * @module features/knowledgeHub/standards/components/ClientStandards
 */

import { useState, useMemo } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Button from '../../../../../components/shared/Button';
import Modal from '../../../../../components/shared/Modal';
import SearchBar from '../../../../../components/shared/SearchBar';
import Select from '../../../../../components/shared/Select';
import Badge from '../../../../../components/shared/Badge';
import UploadStandardModal from '../UploadStandardModal';
import useStandards from '../../hooks/useStandards';
import { formatDate } from '../../../../../utils';
import styles from './ClientStandards.module.css';

const ClientStandards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(null);

  const { clientStandards, loading } = useStandards('client');

  // Flatten all standards from all clients
  const allStandards = useMemo(() => {
    return clientStandards.flatMap(client =>
      (client.standards || []).map(standard => ({
        ...standard,
        clientName: client.name,
        clientCode: client.code,
        clientId: client.id
      }))
    );
  }, [clientStandards]);

  // Get unique clients for filter
  const clientOptions = useMemo(() => {
    return [
      { value: '', label: 'Todos los clientes' },
      ...clientStandards.map(client => ({
        value: client.id,
        label: client.name
      }))
    ];
  }, [clientStandards]);

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Diseño', label: 'Diseño' },
    { value: 'General', label: 'General' },
    { value: 'Construcción', label: 'Construcción' },
    { value: 'Operación', label: 'Operación' },
    { value: 'Seguridad', label: 'Seguridad' }
  ];

  const filteredStandards = allStandards.filter(standard => {
    const matchesSearch =
      standard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      standard.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      standard.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (standard.description && standard.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesClient = !clientFilter || standard.clientId === clientFilter;
    const matchesCategory = !categoryFilter || standard.category === categoryFilter;

    return matchesSearch && matchesClient && matchesCategory;
  });

  return (
    <div className={styles.container}>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Buscar especificaciones por título, código o cliente..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Cliente</label>
            <Select
              value={clientFilter}
              onChange={setClientFilter}
              options={clientOptions}
            />
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Categoría</label>
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categoryOptions}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando especificaciones...</p>
        </div>
      ) : (
        <>
          {filteredStandards.length > 0 ? (
            <div className={styles.standardsList}>
              {filteredStandards.map((standard) => (
                <div 
                  key={standard.id} 
                  className={styles.standardItem}
                  onClick={() => setSelectedStandard(standard)}
                >
                  <div className={styles.standardMain}>
                    <div className={styles.standardInfo}>
                      <h3 className={styles.standardTitle}>{standard.name}</h3>
                      <span className={styles.standardCode}>{standard.code}</span>
                    </div>
                    <div className={styles.standardRight}>
                      <div className={styles.standardBadges}>
                        <Badge variant="info">{standard.clientName}</Badge>
                        {standard.isActive && <Badge variant="success">Activo</Badge>}
                      </div>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement view document
                            console.log('Ver documento:', standard.id);
                          }}
                          title="Ver documento"
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </button>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement download PDF
                            console.log('Descargar PDF:', standard.id);
                          }}
                          title="Descargar PDF"
                        >
                          <DownloadOutlinedIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.standardMeta}>
                    <span className={styles.metaItem}>{standard.version}</span>
                    <span className={styles.metaDivider}>•</span>
                    {standard.category && (
                      <>
                        <span className={styles.metaItem}>{standard.category}</span>
                        <span className={styles.metaDivider}>•</span>
                      </>
                    )}
                    <span className={styles.metaItem}>{formatDate(standard.lastUpdate)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>📄 No se encontraron especificaciones con los filtros aplicados</p>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedStandard && (
        <Modal
          isOpen={!!selectedStandard}
          onClose={() => setSelectedStandard(null)}
          title="Detalle de Especificación"
          size="medium"
        >
          <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
              <h2 className={styles.detailTitle}>{selectedStandard.name}</h2>
              <div className={styles.detailBadges}>
                <Badge variant="info">{selectedStandard.clientName}</Badge>
                {selectedStandard.category && (
                  <Badge variant="default">{selectedStandard.category}</Badge>
                )}
                {selectedStandard.isActive && <Badge variant="success">Activo</Badge>}
              </div>
            </div>
            
            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Código</label>
              <p className={styles.detailValue}>{selectedStandard.code}</p>
            </div>

            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Versión</label>
              <p className={styles.detailValue}>{selectedStandard.version}</p>
            </div>

            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Última Actualización</label>
              <p className={styles.detailValue}>{formatDate(selectedStandard.lastUpdate)}</p>
            </div>

            {selectedStandard.description && (
              <div className={styles.detailSection}>
                <label className={styles.detailLabel}>Descripción</label>
                <p className={styles.detailValue}>{selectedStandard.description}</p>
              </div>
            )}

            <div className={styles.detailActions}>
              <Button variant="primary">📄 Descargar Documento</Button>
              <Button variant="outline">📋 Ver Historial de Versiones</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default ClientStandards;

