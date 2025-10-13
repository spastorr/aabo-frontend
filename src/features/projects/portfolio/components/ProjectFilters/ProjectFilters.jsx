/**
 * ProjectFilters component
 * Filter controls for the portfolio page
 * @module features/projects/portfolio/components/ProjectFilters
 */

import { PROJECT_STATUS, PROJECT_STATUS_LABELS, PROJECT_TYPES, PROJECT_TYPE_LABELS } from '../../../../../constants';
import styles from './ProjectFilters.module.css';

const ProjectFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ status: 'all', type: 'all', search: '' });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.type !== 'all' || filters.search !== '';

  return (
    <div className={styles.filters}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre, código o cliente..."
          value={filters.search}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.selectGroup}>
        <select
          value={filters.status}
          onChange={handleStatusChange}
          className={styles.select}
        >
          <option value="all">Todos los estados</option>
          <option value={PROJECT_STATUS.ACTIVE}>{PROJECT_STATUS_LABELS[PROJECT_STATUS.ACTIVE]}</option>
          <option value={PROJECT_STATUS.ON_HOLD}>{PROJECT_STATUS_LABELS[PROJECT_STATUS.ON_HOLD]}</option>
          <option value={PROJECT_STATUS.COMPLETED}>{PROJECT_STATUS_LABELS[PROJECT_STATUS.COMPLETED]}</option>
          <option value={PROJECT_STATUS.CANCELLED}>{PROJECT_STATUS_LABELS[PROJECT_STATUS.CANCELLED]}</option>
        </select>

        <select
          value={filters.type}
          onChange={handleTypeChange}
          className={styles.select}
        >
          <option value="all">Todos los tipos</option>
          {Object.keys(PROJECT_TYPES).map((key) => (
            <option key={key} value={PROJECT_TYPES[key]}>
              {PROJECT_TYPE_LABELS[PROJECT_TYPES[key]]}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button onClick={handleClearFilters} className={styles.clearButton}>
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;

