/**
 * Select - Dropdown select component
 * @module components/shared/Select
 */

import styles from './Select.module.css';

const Select = ({ 
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  disabled = false,
  error = false,
  ...props 
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${styles.select} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

