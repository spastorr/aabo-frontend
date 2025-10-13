/**
 * SearchInput - Main search input with semantic search capabilities
 * @module features/knowledgeHub/search/components/SearchInput
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../components/shared/Button';
import styles from './SearchInput.module.css';

const SearchInput = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.icon}>🔍</div>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué estás buscando? Pregunta en lenguaje natural..."
          disabled={loading}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!query.trim() || loading}
          className={styles.button}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </form>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default SearchInput;

