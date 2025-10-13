/**
 * Badge component for status labels
 * @module components/shared/Badge
 */

import styles from './Badge.module.css';

/**
 * @param {Object} props
 * @param {string} props.variant - Badge variant: 'success', 'warning', 'info', 'danger', 'default'
 * @param {string} props.size - Badge size: 'small', 'medium', 'large'
 * @param {React.ReactNode} props.children - Badge content
 */
const Badge = ({ 
  variant = 'default', 
  size = 'medium',
  className = '',
  children,
  ...props 
}) => {
  const badgeClass = `${styles.badge} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

export default Badge;

