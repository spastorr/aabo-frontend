/**
 * LMDFilters component
 * Filter controls for the LMD table
 * @module features/projects/lmd/components/LMDFilters
 */

import { DOCUMENT_STATUS, DOCUMENT_STATUS_LABELS, DISCIPLINES, DISCIPLINE_LABELS } from '../../../../../constants';
import styles from './LMDFilters.module.css';

const LMDFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleDisciplineChange = (e) => {
    onFilterChange({ ...filters, discipline: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({ status: 'all', discipline: 'all', search: '' });
  };

  const hasActiveFilters = filters.status !== 'all' || filters.discipline !== 'all' || filters.search !== '';

  return (
    <div className={styles.filters}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por código, nombre o responsable..."
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
          <option value={DOCUMENT_STATUS.APR}>{DOCUMENT_STATUS_LABELS[DOCUMENT_STATUS.APR]}</option>
          <option value={DOCUMENT_STATUS.ACC}>{DOCUMENT_STATUS_LABELS[DOCUMENT_STATUS.ACC]}</option>
          <option value={DOCUMENT_STATUS.CMN}>{DOCUMENT_STATUS_LABELS[DOCUMENT_STATUS.CMN]}</option>
          <option value={DOCUMENT_STATUS.RCH}>{DOCUMENT_STATUS_LABELS[DOCUMENT_STATUS.RCH]}</option>
          <option value={DOCUMENT_STATUS.ELB}>{DOCUMENT_STATUS_LABELS[DOCUMENT_STATUS.ELB]}</option>
        </select>

        <select
          value={filters.discipline}
          onChange={handleDisciplineChange}
          className={styles.select}
        >
          <option value="all">Todas las disciplinas</option>
          {Object.keys(DISCIPLINES).map((key) => (
            <option key={key} value={DISCIPLINES[key]}>
              {DISCIPLINE_LABELS[DISCIPLINES[key]]}
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

export default LMDFilters;

