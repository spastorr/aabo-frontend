/**
 * Tabs - Tab navigation component
 * @module components/shared/Tabs
 */

import styles from './Tabs.module.css';

const Tabs = ({ tabs = [], activeTab, onChange }) => {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

