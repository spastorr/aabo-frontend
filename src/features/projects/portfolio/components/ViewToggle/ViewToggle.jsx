/**
 * ViewToggle component
 * Toggle between grid (cards) and list view for projects
 * @module features/projects/portfolio/components/ViewToggle
 */

import styles from './ViewToggle.module.css';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className={styles.viewToggle}>
      <button
        className={`${styles.toggleButton} ${view === 'grid' ? styles.active : ''}`}
        onClick={() => onViewChange('grid')}
        aria-label="Vista de cartas"
        title="Vista de cartas"
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
      <button
        className={`${styles.toggleButton} ${view === 'list' ? styles.active : ''}`}
        onClick={() => onViewChange('list')}
        aria-label="Vista de lista"
        title="Vista de lista"
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default ViewToggle;

