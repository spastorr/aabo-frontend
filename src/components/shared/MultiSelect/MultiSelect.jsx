/**
 * MultiSelect - Multi-selection dropdown component
 * @module components/shared/MultiSelect
 */

import { useState, useRef, useEffect } from 'react';
import styles from './MultiSelect.module.css';

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Seleccionar...',
  disabled = false,
  error = false,
  helperText,
  renderOption,
  renderSelectedItem,
  getOptionLabel,
  getOptionValue,
  maxHeight = '300px',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  // Default functions if not provided
  const getLabelFn = getOptionLabel || ((option) => option.label || option.name || option);
  const getValueFn = getOptionValue || ((option) => option.value || option.id || option);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter((option) => {
    const label = getLabelFn(option).toLowerCase();
    return label.includes(searchTerm.toLowerCase());
  });

  // Check if an option is selected
  const isSelected = (option) => {
    const optionValue = getValueFn(option);
    return value.some((v) => getValueFn(v) === optionValue);
  };

  // Toggle option selection
  const toggleOption = (option) => {
    if (disabled) return;

    const optionValue = getValueFn(option);
    const isCurrentlySelected = isSelected(option);

    if (isCurrentlySelected) {
      // Remove from selection
      onChange(value.filter((v) => getValueFn(v) !== optionValue));
    } else {
      // Add to selection
      onChange([...value, option]);
    }
  };

  // Remove selected item
  const removeItem = (option, e) => {
    e.stopPropagation();
    const optionValue = getValueFn(option);
    onChange(value.filter((v) => getValueFn(v) !== optionValue));
  };

  // Clear all selections
  const clearAll = (e) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={`${styles.control} ${isOpen ? styles.open : ''} ${
          error ? styles.error : ''
        } ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className={styles.valueContainer}>
          {value.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <div className={styles.selectedItems}>
              {value.map((item) => (
                <div key={getValueFn(item)} className={styles.selectedItem}>
                  {renderSelectedItem ? (
                    renderSelectedItem(item)
                  ) : (
                    <span>{getLabelFn(item)}</span>
                  )}
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={(e) => removeItem(item, e)}
                    disabled={disabled}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.indicators}>
          {value.length > 0 && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearAll}
              title="Limpiar selección"
            >
              ✕
            </button>
          )}
          <div className={styles.separator}></div>
          <div className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</div>
        </div>
      </div>

      {isOpen && (
        <div className={styles.menu} style={{ maxHeight }}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className={styles.options}>
            {filteredOptions.length === 0 ? (
              <div className={styles.noOptions}>No hay opciones disponibles</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={getValueFn(option)}
                  className={`${styles.option} ${
                    isSelected(option) ? styles.selected : ''
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => {}}
                    className={styles.checkbox}
                  />
                  {renderOption ? renderOption(option) : <span>{getLabelFn(option)}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {helperText && (
        <span className={`${styles.helperText} ${error ? styles.helperError : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;

