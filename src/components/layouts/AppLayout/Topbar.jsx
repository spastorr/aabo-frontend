/**
 * Application Topbar
 * @module components/layouts/AppLayout/Topbar
 */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useLayout } from '../../../contexts/LayoutContext';
import styles from './AppLayout.module.css';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { headerContent } = useLayout();

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        {headerContent || (
          <div className={styles.defaultHeader}>
            <span className={styles.appName}>AABO Engineering</span>
          </div>
        )}
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.userInfo}>
          <button className={styles.userBtn} title={user?.name || 'Usuario'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button 
            onClick={() => navigate('/settings')} 
            className={styles.settingsBtn} 
            title="Configuración"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
              <path d="m20.49 15.21-3.9-3.9m-9.19 0-3.9 3.9m0-6.42 3.9 3.9m9.19 0 3.9-3.9"/>
            </svg>
          </button>
          <button onClick={logout} className={styles.logoutBtn} title="Cerrar Sesión">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

