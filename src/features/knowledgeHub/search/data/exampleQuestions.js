/**
 * Example questions for Knowledge Hub search
 * @module features/knowledgeHub/search/data/exampleQuestions
 */

export const EXAMPLE_QUESTIONS = [
  {
    category: 'Procedimientos Técnicos',
    icon: '⚙️',
    examples: [
      {
        question: '¿Cómo calcular el caudal de una válvula de seguridad PSV?',
        tags: ['PSV', 'API 520', 'Cálculos']
      },
      {
        question: '¿Cuál es el procedimiento para sizing de bombas centrífugas?',
        tags: ['Bombas', 'API 610', 'Sizing']
      },
      {
        question: '¿Qué normativa aplica para diseño de sistemas contra incendio?',
        tags: ['NFPA', 'Safety', 'Fire Protection']
      }
    ]
  },
  {
    category: 'Documentos Específicos',
    icon: '📄',
    examples: [
      {
        question: 'P&IDs de plantas de tratamiento de agua industrial',
        tags: ['P&ID', 'Tratamiento Agua', 'Proceso']
      },
      {
        question: 'Datasheets de intercambiadores de calor para servicios criogénicos',
        tags: ['Heat Exchangers', 'Criogénico', 'Datasheet']
      },
      {
        question: 'Planos de arreglo general de estaciones de gas',
        tags: ['Plot Plan', 'Gas', 'Layout']
      }
    ]
  },
  {
    category: 'Estándares y Normativas',
    icon: '📚',
    examples: [
      {
        question: 'Especificaciones API 610 para bombas centrífugas',
        tags: ['API 610', 'Bombas', 'Estándares']
      },
      {
        question: 'Requisitos de ASME B31.3 para tuberías de proceso',
        tags: ['ASME B31.3', 'Piping', 'Código']
      },
      {
        question: 'Estándar ISA-5.1 para símbolos de instrumentación',
        tags: ['ISA-5.1', 'Simbología', 'P&ID']
      }
    ]
  },
  {
    category: 'Proyectos de Referencia',
    icon: '🏭',
    examples: [
      {
        question: 'Proyectos de procesamiento de gas para Petroamazonas',
        tags: ['Petroamazonas', 'Gas', 'Oil & Gas']
      },
      {
        question: 'Plantas de tratamiento de agua para industria minera',
        tags: ['Minería', 'Tratamiento Agua', 'Mining']
      },
      {
        question: 'Proyectos de modernización de refinerías',
        tags: ['Refinería', 'Revamp', 'Upgrade']
      }
    ]
  },
  {
    category: 'Consultas Generales',
    icon: '💡',
    examples: [
      {
        question: '¿Qué materiales se usan para servicio de H2S húmedo?',
        tags: ['Materiales', 'H2S', 'NACE']
      },
      {
        question: '¿Cuáles son los requisitos de aislamiento térmico para líneas criogénicas?',
        tags: ['Aislamiento', 'Criogénico', 'Térmico']
      },
      {
        question: '¿Cómo se realiza el balance hidráulico de un sistema contra incendio?',
        tags: ['Hidráulico', 'Fire Protection', 'Cálculos']
      }
    ]
  }
];

/**
 * Get all questions as flat array
 */
export const getAllQuestions = () => {
  return EXAMPLE_QUESTIONS.flatMap(category => 
    category.examples.map(example => ({
      ...example,
      category: category.category,
      categoryIcon: category.icon
    }))
  );
};

/**
 * Get questions by category
 */
export const getQuestionsByCategory = (categoryName) => {
  const category = EXAMPLE_QUESTIONS.find(c => c.category === categoryName);
  return category ? category.examples : [];
};

/**
 * Search questions by tag
 */
export const getQuestionsByTag = (tag) => {
  return getAllQuestions().filter(q => 
    q.tags && q.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

/**
 * Get random question
 */
export const getRandomQuestion = () => {
  const allQuestions = getAllQuestions();
  return allQuestions[Math.floor(Math.random() * allQuestions.length)];
};

