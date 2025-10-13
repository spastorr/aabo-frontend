/**
 * Input - Text input component
 * @module components/shared/Input
 */

import styles from './Input.module.css';

const Input = ({ 
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  helperText,
  ...props 
}) => {
  return (
    <div className={styles.container}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
        {...props}
      />
      {helperText && (
        <span className={`${styles.helperText} ${error ? styles.helperError : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
