/**
 * SearchFilters - Advanced filters for search results
 * @module features/knowledgeHub/search/components/SearchFilters
 */

import PropTypes from 'prop-types';
import Select from '../../../../../components/shared/Select';
import Badge from '../../../../../components/shared/Badge';
import styles from './SearchFilters.module.css';

const SearchFilters = ({ filters, onFilterChange }) => {
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'historical-projects', label: '📚 Proyectos Históricos' },
    { value: 'client-standards', label: '📄 Especificaciones de Clientes' },
    { value: 'internal-guides', label: '📚 Guías Internas' },
    { value: 'external-norms', label: '🌐 Normativas Externas' }
  ];

  const clientOptions = [
    { value: '', label: 'Todos los clientes' },
    { value: 'petroamazonas', label: 'Petroamazonas' },
    { value: 'ep-petroecuador', label: 'EP Petroecuador' },
    { value: 'schlumberger', label: 'Schlumberger' }
  ];

  const disciplineOptions = [
    { value: '', label: 'Todas las disciplinas' },
    { value: 'procesos', label: 'Procesos' },
    { value: 'mecanica', label: 'Mecánica' },
    { value: 'electrica', label: 'Eléctrica' },
    { value: 'civil', label: 'Civil' },
    { value: 'instrumentacion', label: 'Instrumentación & Control' }
  ];

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filtros</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="primary" size="small">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Categoría</label>
          <Select
            value={filters.category}
            onChange={(value) => onFilterChange({ category: value })}
            options={categoryOptions}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Cliente</label>
          <Select
            value={filters.client}
            onChange={(value) => onFilterChange({ client: value })}
            options={clientOptions}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Disciplina</label>
          <Select
            value={filters.discipline}
            onChange={(value) => onFilterChange({ discipline: value })}
            options={disciplineOptions}
          />
        </div>
      </div>
    </div>
  );
};

SearchFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    client: PropTypes.string,
    discipline: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default SearchFilters;

