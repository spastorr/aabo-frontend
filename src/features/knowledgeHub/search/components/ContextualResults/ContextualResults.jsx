/**
 * ContextualResults - Display 360° contextual search results
 * @module features/knowledgeHub/search/components/ContextualResults
 */

import PropTypes from 'prop-types';
import ResultsByCategory from './ResultsByCategory';
import EmptyState from '../../../../../components/shared/EmptyState';
import styles from './ContextualResults.module.css';

const ContextualResults = ({ query, results }) => {
  const {
    historicalProjects = [],
    clientStandards = [],
    internalGuides = [],
    externalNorms = []
  } = results;

  const totalResults =
    historicalProjects.length +
    clientStandards.length +
    internalGuides.length +
    externalNorms.length;

  if (totalResults === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No se encontraron resultados"
        description={`No encontramos resultados para "${query}". Intenta con diferentes términos o ajusta los filtros.`}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* Summary */}
      <div className={styles.summary}>
        <h2 className={styles.summaryTitle}>
          Se encontraron <strong>{totalResults}</strong> resultados para "{query}"
        </h2>
        <div className={styles.categoryBreakdown}>
          {historicalProjects.length > 0 && (
            <span className={styles.categoryPill}>
              📚 {historicalProjects.length} Proyectos
            </span>
          )}
          {clientStandards.length > 0 && (
            <span className={styles.categoryPill}>
              📄 {clientStandards.length} Especificaciones
            </span>
          )}
          {internalGuides.length > 0 && (
            <span className={styles.categoryPill}>
              📚 {internalGuides.length} Guías
            </span>
          )}
          {externalNorms.length > 0 && (
            <span className={styles.categoryPill}>
              🌐 {externalNorms.length} Normativas
            </span>
          )}
        </div>
      </div>

      {/* Results by Category */}
      <div className={styles.results}>
        {historicalProjects.length > 0 && (
          <ResultsByCategory
            title="📚 Proyectos Históricos"
            items={historicalProjects}
            type="project"
          />
        )}

        {clientStandards.length > 0 && (
          <ResultsByCategory
            title="📄 Especificaciones de Clientes"
            items={clientStandards}
            type="standard"
          />
        )}

        {internalGuides.length > 0 && (
          <ResultsByCategory
            title="📚 Guías Internas"
            items={internalGuides}
            type="guide"
          />
        )}

        {externalNorms.length > 0 && (
          <ResultsByCategory
            title="🌐 Normativas Externas"
            items={externalNorms}
            type="norm"
          />
        )}
      </div>
    </div>
  );
};

ContextualResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.shape({
    historicalProjects: PropTypes.array,
    clientStandards: PropTypes.array,
    internalGuides: PropTypes.array,
    externalNorms: PropTypes.array
  }).isRequired
};

export default ContextualResults;

