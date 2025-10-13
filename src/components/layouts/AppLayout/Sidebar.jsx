/**
 * Application Sidebar
 * Context-aware navigation based on selected project
 * @module components/layouts/AppLayout/Sidebar
 */

import { Link, useLocation } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { portfolioNavigation, getProjectNavigation } from './navigation.config';
import styles from './AppLayout.module.css';
import logo from '../../../assets/images/LogoSinFondo.avif';

const Sidebar = () => {
  const location = useLocation();
  const { selectedProject } = useProject();

  // Use project-specific navigation if a project is selected
  const navigation = selectedProject 
    ? getProjectNavigation(selectedProject.id)
    : portfolioNavigation;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="AABO Services" className={styles.logoImage} />
      </div>
      
      {/* Show selected project info if in project workspace */}
      {selectedProject && (
        <div className={styles.projectBanner}>
          <div className={styles.projectBannerContent}>
            <span className={styles.projectBannerLabel}>Proyecto Actual</span>
            <span className={styles.projectBannerName}>{selectedProject.name}</span>
            <span className={styles.projectBannerCode}>{selectedProject.code}</span>
          </div>
        </div>
      )}

      <nav className={styles.nav}>
        {navigation.map((section, index) => (
          <div key={section.title || `section-${index}`} className={styles.navSection}>
            {section.title && <h3 className={styles.navSectionTitle}>{section.title}</h3>}
            <ul className={styles.navList}>
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${
                      location.pathname === item.path ? styles.active : ''
                    }`}
                  >
                    {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

