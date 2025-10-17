/**
 * UnifiedSearchPage - Intelligent unified search across Knowledge Hub
 * @module features/knowledgeHub/search/UnifiedSearchPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import PageHeader from '../../../components/shared/PageHeader';
import Modal from '../../../components/shared/Modal';
import Button from '../../../components/shared/Button';
import SearchInput from './components/SearchInput';
import SearchFilters from './components/SearchFilters';
import ContextualResults from './components/ContextualResults';
import ExampleQuestions from './components/ExampleQuestions';
import useSearch from './hooks/useSearch';
import styles from './UnifiedSearchPage.module.css';

const RECENT_SEARCHES_KEY = 'knowledgeHub_recentSearches';
const MAX_RECENT_SEARCHES = 5;

const UnifiedSearchPage = () => {
  const navigate = useNavigate();
  const { setHeader, clearHeader } = useLayout();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    client: '',
    discipline: '',
    dateRange: ''
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const { results, loading, error } = useSearch({ query, filters, enabled: hasSearched });

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  // Save search to recent searches
  const saveRecentSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    setRecentSearches((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter(item => item.text !== searchQuery);
      // Add new search at the beginning
      const updated = [{ text: searchQuery, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      // Save to localStorage
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="🔍 Búsqueda Inteligente"
      subtitle="Motor de búsqueda semántica que encuentra información en todo el Knowledge Hub usando lenguaje natural"
      backButton={{
        path: '/knowledge-hub',
        label: 'Knowledge Hub'
      }}
      actions={[
        {
          label: 'ℹ️ Información',
          variant: 'outline',
          size: 'small',
          onClick: () => setShowInfoModal(true)
        }
      ]}
    />
  ), []);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setHasSearched(true);
    saveRecentSearch(searchQuery);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    if (hasSearched) {
      // Re-trigger search with new filters
      setHasSearched(true);
    }
  };

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles.searchSection}>
        <SearchInput
          onSearch={handleSearch}
          loading={loading}
        />
      </div>

      {/* Recent Searches */}
      {!hasSearched && recentSearches.length > 0 && (
        <div className={styles.examplesSection}>
          <div className={styles.recentSearchesHeader}>
            <h2 className={styles.examplesTitle}>Búsquedas Recientes</h2>
            <button 
              className={styles.clearButton}
              onClick={clearRecentSearches}
              title="Limpiar historial"
            >
              Limpiar
            </button>
          </div>
          <div className={styles.examplesList}>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className={styles.exampleButton}
                onClick={() => handleSearch(search.text)}
              >
                <span className={styles.exampleIcon}>🕒</span>
                <span className={styles.exampleText}>{search.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Example Questions */}
      {!hasSearched && recentSearches.length === 0 && (
        <ExampleQuestions onQuestionClick={handleSearch} />
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className={styles.resultsSection}>
          {/* Filters */}
          <div className={styles.filtersSection}>
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results */}
          <div className={styles.resultsContent}>
            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p>Buscando en todo el Knowledge Hub...</p>
              </div>
            ) : error ? (
              <div className={styles.errorState}>
                <p>❌ {error}</p>
              </div>
            ) : (
              <ContextualResults
                query={query}
                results={results}
              />
            )}
          </div>
        </div>
      )}

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="ℹ️ Información - Búsqueda Inteligente"
        size="medium"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🎯 Función</h3>
            <p className={styles.modalText}>
              Motor de búsqueda semántica que indexa proyectos históricos, estándares de clientes, 
              guías internas y normativas externas. Utiliza procesamiento de lenguaje natural para 
              entender contexto e intención de búsqueda.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>⚙️ Capacidades</h3>
            <ul className={styles.modalList}>
              <li><strong>Búsqueda natural:</strong> Consultas en lenguaje cotidiano sin sintaxis especial</li>
              <li><strong>Búsqueda 360°:</strong> Resultados simultáneos de todas las categorías del Knowledge Hub</li>
              <li><strong>Filtros técnicos:</strong> Por cliente, disciplina, tipo de documento y fecha</li>
              <li><strong>Contexto semántico:</strong> Entiende sinónimos y términos técnicos relacionados</li>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🔍 Tipos de Consulta</h3>
            <ul className={styles.modalList}>
              <li><strong>Procedimientos:</strong> "¿Cómo calcular caudal de PSV?"</li>
              <li><strong>Documentos específicos:</strong> "P&IDs de plantas de tratamiento de agua"</li>
              <li><strong>Estándares:</strong> "Especificaciones API 610 para bombas"</li>
              <li><strong>Proyectos de referencia:</strong> "Proyectos de gas para Petroamazonas"</li>
            </ul>
          </div>

          <div className={styles.modalActions}>
            <Button 
              variant="primary" 
              onClick={() => setShowInfoModal(false)}
            >
              Entendido
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UnifiedSearchPage;

