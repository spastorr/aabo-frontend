/**
 * Main Application Layout
 * @module components/layouts/AppLayout
 */

import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '../../../contexts/LayoutContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  return (
    <LayoutProvider>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.mainContainer}>
          <Topbar />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default AppLayout;

