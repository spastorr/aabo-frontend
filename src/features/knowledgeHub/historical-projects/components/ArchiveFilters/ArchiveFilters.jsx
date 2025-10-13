/**
 * ArchiveFilters - Advanced filters for historical projects
 * @module features/knowledgeHub/historical-projects/components/ArchiveFilters
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../../components/shared/Select';
import Button from '../../../../../components/shared/Button';
import TagManager from '../TagManager';
import styles from './ArchiveFilters.module.css';

const ArchiveFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);

  const clientOptions = [
    { value: '', label: 'Todos los clientes' },
    { value: 'petroamazonas', label: 'Petroamazonas' },
    { value: 'ep-petroecuador', label: 'EP Petroecuador' },
    { value: 'schlumberger', label: 'Schlumberger' },
    { value: 'petrochina', label: 'PetroChina' }
  ];

  const projectTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'refineria', label: 'Refinería' },
    { value: 'upstream', label: 'Upstream' },
    { value: 'midstream', label: 'Midstream' },
    { value: 'downstream', label: 'Downstream' },
    { value: 'petroquimica', label: 'Petroquímica' }
  ];

  const disciplineOptions = [
    { value: '', label: 'Todas las disciplinas' },
    { value: 'procesos', label: 'Procesos' },
    { value: 'mecanica', label: 'Mecánica' },
    { value: 'electrica', label: 'Eléctrica' },
    { value: 'civil', label: 'Civil' },
    { value: 'instrumentacion', label: 'Instrumentación & Control' }
  ];

  const yearOptions = [
    { value: '', label: 'Todos los años' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' }
  ];

  const handleChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const handleTagsChange = (tags) => {
    onFilterChange({ tags });
    setShowTagManager(false);
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  return (
    <div className={styles.container}>
      {/* Toggle Button */}
      <div className={styles.header}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={styles.toggleIcon}>🔍</span>
          <span className={styles.toggleText}>
            Filtros Avanzados
            {activeFiltersCount > 0 && (
              <span className={styles.badge}>{activeFiltersCount}</span>
            )}
          </span>
          <span className={styles.arrow}>{isExpanded ? '▲' : '▼'}</span>
        </button>

        {activeFiltersCount > 0 && (
          <Button
            variant="text"
            size="small"
            onClick={onClearFilters}
            className={styles.clearButton}
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {isExpanded && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterItem}>
              <label className={styles.label}>Cliente</label>
              <Select
                value={filters.client}
                onChange={(value) => handleChange('client', value)}
                options={clientOptions}
                placeholder="Seleccionar cliente"
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>Tipo de Proyecto</label>
              <Select
                value={filters.projectType}
                onChange={(value) => handleChange('projectType', value)}
                options={projectTypeOptions}
                placeholder="Seleccionar tipo"
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>Disciplina</label>
              <Select
                value={filters.discipline}
                onChange={(value) => handleChange('discipline', value)}
                options={disciplineOptions}
                placeholder="Seleccionar disciplina"
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>Año de Finalización</label>
              <Select
                value={filters.year}
                onChange={(value) => handleChange('year', value)}
                options={yearOptions}
                placeholder="Seleccionar año"
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className={styles.tagsSection}>
            <div className={styles.tagsHeader}>
              <label className={styles.label}>Etiquetas</label>
              <Button
                variant="outline"
                size="small"
                onClick={() => setShowTagManager(true)}
              >
                {filters.tags && filters.tags.length > 0
                  ? `Editar (${filters.tags.length})`
                  : 'Agregar etiquetas'}
              </Button>
            </div>

            {filters.tags && filters.tags.length > 0 && (
              <div className={styles.selectedTags}>
                {filters.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                    <button
                      className={styles.removeTag}
                      onClick={() => {
                        const newTags = filters.tags.filter((_, i) => i !== index);
                        handleChange('tags', newTags);
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tag Manager Modal */}
      {showTagManager && (
        <TagManager
          selectedTags={filters.tags || []}
          onSave={handleTagsChange}
          onClose={() => setShowTagManager(false)}
        />
      )}
    </div>
  );
};

ArchiveFilters.propTypes = {
  filters: PropTypes.shape({
    client: PropTypes.string,
    projectType: PropTypes.string,
    discipline: PropTypes.string,
    year: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default ArchiveFilters;

