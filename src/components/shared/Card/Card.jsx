/**
 * Card component
 * @module components/shared/Card
 */

import styles from './Card.module.css';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (makes card clickable)
 */
const Card = ({ children, className = '', onClick, ...props }) => {
  const cardClass = `${styles.card} ${onClick ? styles.clickable : ''} ${className}`;

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;

