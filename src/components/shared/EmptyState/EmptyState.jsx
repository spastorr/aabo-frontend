/**
 * EmptyState - Component for displaying empty states
 * @module components/shared/EmptyState
 */

import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ 
  icon = '📄', 
  title = 'No hay datos', 
  description = 'No se encontraron elementos para mostrar.',
  action = null 
}) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && (
        <div className={styles.action}>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;