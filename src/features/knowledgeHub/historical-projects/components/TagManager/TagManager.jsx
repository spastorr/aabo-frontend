/**
 * TagManager - Modal for managing project tags
 * @module features/knowledgeHub/historical-projects/components/TagManager
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Input from '../../../../../components/shared/Input';
import styles from './TagManager.module.css';

const TagManager = ({ selectedTags = [], onSave, onClose }) => {
  const [tags, setTags] = useState(selectedTags);
  const [newTag, setNewTag] = useState('');

  // Common tags suggestions
  const commonTags = [
    'Alta presión',
    'Bomba centrífuga',
    'Diseño innovador',
    'Optimización energética',
    'Seguridad crítica',
    'Vibración en tuberías',
    'Control avanzado',
    'Instrumentación digital',
    'Mantenimiento predictivo',
    'Proyecto fast-track',
    'Offshore',
    'Normativa API',
    'Sistema redundante',
    'Tratamiento de agua',
    'Gas natural'
  ];

  const availableTags = commonTags.filter(tag => !tags.includes(tag));

  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTag();
    }
  };

  const handleSave = () => {
    onSave(tags);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Gestionar Etiquetas"
      size="medium"
    >
      <div className={styles.container}>
        {/* Selected Tags */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Etiquetas Seleccionadas ({tags.length})
          </h3>
          {tags.length > 0 ? (
            <div className={styles.tagsList}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.selectedTag}>
                  #{tag}
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>
              No hay etiquetas seleccionadas
            </p>
          )}
        </div>

        {/* Add Custom Tag */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Agregar Etiqueta Personalizada</h3>
          <div className={styles.inputGroup}>
            <Input
              value={newTag}
              onChange={setNewTag}
              onKeyPress={handleKeyPress}
              placeholder="Escribe una etiqueta..."
              className={styles.input}
            />
            <Button
              onClick={handleAddCustomTag}
              disabled={!newTag.trim()}
              variant="primary"
            >
              Agregar
            </Button>
          </div>
        </div>

        {/* Common Tags */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Etiquetas Sugeridas</h3>
          {availableTags.length > 0 ? (
            <div className={styles.tagsList}>
              {availableTags.map((tag, index) => (
                <button
                  key={index}
                  className={styles.availableTag}
                  onClick={() => handleAddTag(tag)}
                >
                  + {tag}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.emptyMessage}>
              Todas las etiquetas sugeridas han sido seleccionadas
            </p>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Aplicar Filtros ({tags.length})
          </Button>
        </div>
      </div>
    </Modal>
  );
};

TagManager.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TagManager;

