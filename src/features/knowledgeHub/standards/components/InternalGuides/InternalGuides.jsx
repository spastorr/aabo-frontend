/**
 * InternalGuides - Internal company guides and procedures
 * @module features/knowledgeHub/standards/components/InternalGuides
 */

import { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Button from '../../../../../components/shared/Button';
import Modal from '../../../../../components/shared/Modal';
import SearchBar from '../../../../../components/shared/SearchBar';
import Badge from '../../../../../components/shared/Badge';
import Select from '../../../../../components/shared/Select';
import UploadStandardModal from '../UploadStandardModal';
import VersionControl from '../VersionControl';
import useStandards from '../../hooks/useStandards';
import { formatDate } from '../../../../../utils';
import styles from './InternalGuides.module.css';

const InternalGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const { internalGuides, loading } = useStandards('internal');

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'approved', label: 'Aprobado' },
    { value: 'in-review', label: 'En Revisión' },
    { value: 'draft', label: 'Borrador' }
  ];

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'procedimientos', label: 'Procedimientos' },
    { value: 'calculos', label: 'Hojas de Cálculo' },
    { value: 'mejores-practicas', label: 'Mejores Prácticas' },
    { value: 'checklists', label: 'Checklists de Calidad' },
    { value: 'plantillas', label: 'Plantillas' },
    { value: 'lecciones-aprendidas', label: 'Lecciones Aprendidas' }
  ];

  const filteredGuides = internalGuides.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.description && guide.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = !statusFilter || guide.status === statusFilter;
    const matchesCategory = !categoryFilter || guide.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className={styles.container}>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <SearchBar
              placeholder="Buscar guías por título, código o descripción..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Estado</label>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
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
          <p>Cargando guías internas...</p>
        </div>
      ) : (
        <>
          {filteredGuides.length > 0 ? (
            <div className={styles.guidesList}>
              {filteredGuides.map((guide) => (
                <div 
                  key={guide.id} 
                  className={styles.guideItem}
                  onClick={() => setSelectedGuide(guide)}
                >
                  <div className={styles.guideMain}>
                    <div className={styles.guideInfo}>
                      <h3 className={styles.guideTitle}>{guide.title}</h3>
                      <span className={styles.guideCode}>{guide.code}</span>
                    </div>
                    <div className={styles.guideRight}>
                      <div className={styles.guideBadges}>
                        {guide.status === 'approved' && <Badge variant="success">Aprobado</Badge>}
                        {guide.status === 'in-review' && <Badge variant="warning">En Revisión</Badge>}
                        {guide.status === 'draft' && <Badge variant="default">Borrador</Badge>}
                        {guide.category && <Badge variant="info">{guide.category}</Badge>}
                      </div>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement view document
                            console.log('Ver documento:', guide.id);
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
                            console.log('Descargar PDF:', guide.id);
                          }}
                          title="Descargar PDF"
                        >
                          <DownloadOutlinedIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.guideMeta}>
                    <span className={styles.metaItem}>{guide.version}</span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaItem}>{formatDate(guide.lastUpdate)}</span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaItem}>{guide.author}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>📚 No se encontraron guías con los filtros aplicados</p>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedGuide && (
        <Modal
          isOpen={!!selectedGuide}
          onClose={() => setSelectedGuide(null)}
          title="Detalle de Guía Interna"
          size="medium"
        >
          <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
              <h2 className={styles.detailTitle}>{selectedGuide.title}</h2>
              <div className={styles.detailBadges}>
                {selectedGuide.status === 'approved' && <Badge variant="success">Aprobado</Badge>}
                {selectedGuide.status === 'in-review' && <Badge variant="warning">En Revisión</Badge>}
                {selectedGuide.status === 'draft' && <Badge variant="default">Borrador</Badge>}
                {selectedGuide.category && <Badge variant="info">{selectedGuide.category}</Badge>}
              </div>
            </div>
            
            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Código</label>
              <p className={styles.detailValue}>{selectedGuide.code}</p>
            </div>

            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Versión</label>
              <p className={styles.detailValue}>{selectedGuide.version}</p>
            </div>

            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Autor</label>
              <p className={styles.detailValue}>{selectedGuide.author}</p>
            </div>

            <div className={styles.detailSection}>
              <label className={styles.detailLabel}>Última Actualización</label>
              <p className={styles.detailValue}>{formatDate(selectedGuide.lastUpdate)}</p>
            </div>

            {selectedGuide.description && (
              <div className={styles.detailSection}>
                <label className={styles.detailLabel}>Descripción</label>
                <p className={styles.detailValue}>{selectedGuide.description}</p>
              </div>
            )}

            <div className={styles.detailActions}>
              <Button variant="primary">📄 Descargar Documento</Button>
              <Button 
                variant="outline"
                onClick={() => setShowVersionHistory(true)}
              >
                📋 Ver Historial de Versiones
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Version History Modal */}
      {selectedGuide && showVersionHistory && (
        <Modal
          isOpen={showVersionHistory}
          onClose={() => setShowVersionHistory(false)}
          title="📋 Historial de Versiones"
          size="large"
        >
          <VersionControl type="internal" entityId={selectedGuide.id} />
        </Modal>
      )}

    </div>
  );
};

export default InternalGuides;

