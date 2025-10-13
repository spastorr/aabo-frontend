/**
 * Settings Page
 * @module features/settings/SettingsPage
 */

import { useTheme } from '../../contexts/ThemeContext';
import PageHeader from '../../components/shared/PageHeader';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.settingsPage}>
      <PageHeader
        title="Configuración"
        subtitle="Personaliza tu experiencia en AABO Engineering"
      />

      <div className={styles.settingsContainer}>
        {/* Appearance Section */}
        <section className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Apariencia</h2>
            <p className={styles.sectionDescription}>
              Personaliza cómo se ve la aplicación
            </p>
          </div>

          <div className={styles.settingCard}>
            <div className={styles.settingInfo}>
              <div className={styles.settingLabel}>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={styles.settingIcon}
                >
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                <div>
                  <h3 className={styles.settingName}>Modo de Color</h3>
                  <p className={styles.settingDescription}>
                    Alterna entre tema claro y oscuro
                  </p>
                </div>
              </div>
              <div className={styles.currentTheme}>
                {theme === 'dark' ? (
                  <span className={styles.themeBadge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    Oscuro
                  </span>
                ) : (
                  <span className={styles.themeBadge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                    Claro
                  </span>
                )}
              </div>
            </div>

            <div className={styles.settingControl}>
              <button 
                onClick={toggleTheme}
                className={styles.toggleButton}
                aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
              >
                <div className={`${styles.toggleTrack} ${theme === 'dark' ? styles.toggleTrackActive : ''}`}>
                  <div className={styles.toggleThumb}>
                    {theme === 'dark' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="5"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className={styles.toggleLabel}>
                  {theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Placeholder for future settings */}
        <section className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notificaciones</h2>
            <p className={styles.sectionDescription}>
              Administra tus preferencias de notificación
            </p>
          </div>

          <div className={styles.settingCard}>
            <div className={styles.comingSoon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <p>Próximamente</p>
            </div>
          </div>
        </section>

        <section className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Preferencias</h2>
            <p className={styles.sectionDescription}>
              Configura tus preferencias personales
            </p>
          </div>

          <div className={styles.settingCard}>
            <div className={styles.comingSoon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <p>Próximamente</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;

