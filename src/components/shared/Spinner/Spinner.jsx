/**
 * Spinner - Loading spinner component
 * @module components/shared/Spinner
 */

import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
};

export default Spinner;
