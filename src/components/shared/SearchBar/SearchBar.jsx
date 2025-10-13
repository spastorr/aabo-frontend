/**
 * SearchBar - Search input component
 * @module components/shared/SearchBar
 */

import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange, placeholder = 'Buscar...', ...props }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className={styles.clearButton}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;

