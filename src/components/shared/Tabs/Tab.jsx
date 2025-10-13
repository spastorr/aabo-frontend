/**
 * Tab - Individual tab component (used internally by Tabs)
 * @module components/shared/Tabs/Tab
 */

import React from 'react';

const Tab = ({ children, active, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`tab ${active ? 'active' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tab;
