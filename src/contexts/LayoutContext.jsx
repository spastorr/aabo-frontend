/**
 * LayoutContext - Manages dynamic content for the application layout
 * Allows pages to set custom header content in the Topbar
 * @module contexts/LayoutContext
 */

import { createContext, useContext, useState, useCallback } from 'react';

const LayoutContext = createContext();

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider = ({ children }) => {
  const [headerContent, setHeaderContent] = useState(null);

  const setHeader = useCallback((content) => {
    setHeaderContent(content);
  }, []);

  const clearHeader = useCallback(() => {
    setHeaderContent(null);
  }, []);

  return (
    <LayoutContext.Provider value={{ headerContent, setHeader, clearHeader }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;

