/**
 * ExampleQuestions - Displays categorized example questions for users
 * @module features/knowledgeHub/search/components/ExampleQuestions
 */

import PropTypes from 'prop-types';
import Card from '../../../../../components/shared/Card';
import Button from '../../../../../components/shared/Button';
import { EXAMPLE_QUESTIONS } from '../../data/exampleQuestions';
import styles from './ExampleQuestions.module.css';

const ExampleQuestions = ({ onQuestionClick }) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>💡 Ejemplos de Búsqueda</h2>
        <p className={styles.subtitle}>
          Prueba estas consultas para explorar el poder de la búsqueda semántica
        </p>
      </div>

      {/* Categories Grid */}
      <div className={styles.categoriesGrid}>
        {EXAMPLE_QUESTIONS.map((category) => (
          <Card key={category.category} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon} data-color={getCategoryColor(category.category)}>
                {category.icon}
              </div>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <p className={styles.categorySubtitle}>
                {category.examples.length} ejemplos disponibles
              </p>
            </div>

            <div className={styles.examplesList}>
              {category.examples.map((example, index) => (
                <div key={index} className={styles.exampleCard}>
                  <div className={styles.exampleContent}>
                    <p className={styles.questionText}>{example.question}</p>
                    <div className={styles.tags}>
                      {example.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => onQuestionClick(example.question)}
                    className={styles.searchButton}
                  >
                    🔍 Probar
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className={styles.infoCard}>
        <div className={styles.infoContent}>
          <div className={styles.infoIcon}>💡</div>
          <div className={styles.infoText}>
            <h4 className={styles.infoTitle}>Cómo funciona la búsqueda semántica</h4>
            <p className={styles.infoDescription}>
              No necesitas usar palabras clave exactas. Pregunta en lenguaje natural y el sistema encontrará 
              información relevante en proyectos históricos, estándares, guías y normativas. Prueba cualquiera 
              de los ejemplos anteriores para ver resultados reales.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper function to assign colors to categories
const getCategoryColor = (category) => {
  const colorMap = {
    'Procedimientos Técnicos': 'primary',
    'Documentos Específicos': 'info',
    'Estándares y Normativas': 'success',
    'Proyectos de Referencia': 'warning',
    'Consultas Generales': 'secondary'
  };
  return colorMap[category] || 'primary';
};

ExampleQuestions.propTypes = {
  onQuestionClick: PropTypes.func.isRequired
};

export default ExampleQuestions;

