/**
 * Application Topbar
 * @module components/layouts/AppLayout/Topbar
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useLayout } from '../../../contexts/LayoutContext';
import NotificationBell from '../../../features/projects/notifications/components/NotificationBell';
import styles from './AppLayout.module.css';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { headerContent } = useLayout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  const handleNavigate = (path) => {
    setIsUserMenuOpen(false);
    navigate(path);
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

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
        <NotificationBell />
        <div className={styles.userInfo} ref={userMenuRef}>
          <button 
            className={`${styles.userBtn} ${isUserMenuOpen ? styles.userBtnActive : ''}`}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            title={user?.name || 'Usuario'}
          >
            <div className={styles.userAvatar}>
              {getUserInitials(user?.name || 'Usuario')}
            </div>
          </button>

          {isUserMenuOpen && (
            <div className={styles.userMenu}>
              <div className={styles.userMenuHeader}>
                <div className={styles.userMenuAvatar}>
                  {getUserInitials(user?.name || 'Usuario')}
                </div>
                <div className={styles.userMenuInfo}>
                  <div className={styles.userMenuName}>{user?.name || 'Usuario'}</div>
                  <div className={styles.userMenuEmail}>{user?.email || 'No email'}</div>
                  <div className={styles.userMenuRole}>
                    <span className={styles.roleBadge}>{user?.role || 'USER'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.userMenuDivider}></div>

              <div className={styles.userMenuActions}>
                <button
                  className={styles.userMenuItem}
                  onClick={() => handleNavigate('/profile')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Mi Perfil</span>
                </button>

                <button 
                  className={styles.userMenuItem}
                  onClick={() => handleNavigate('/settings')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
                    <path d="m20.49 15.21-3.9-3.9m-9.19 0-3.9 3.9m0-6.42 3.9 3.9m9.19 0 3.9-3.9"/>
                  </svg>
                  <span>Configuración</span>
                </button>

                <button 
                  className={styles.userMenuItem}
                  onClick={() => handleNavigate('/app')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>Inicio</span>
                </button>
              </div>

              <div className={styles.userMenuDivider}></div>

              <div className={styles.userMenuFooter}>
                <button 
                  className={styles.userMenuLogout}
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

