/**
 * PageHeader - Reusable header component for Topbar
 * @module components/shared/PageHeader
 */

import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import styles from './PageHeader.module.css';

const PageHeader = ({
  title,
  subtitle,
  backButton,
  actions = [],
  showProjectInfo = false,
  projectName,
  projectCode
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageHeader}>
      {/* Left section with navigation and title */}
      <div className={styles.leftSection}>
        {backButton && (
          <button
            onClick={() => navigate(backButton.path)}
            className={styles.backButton}
            title={backButton.label || 'Volver'}
          >
            ← {backButton.label || 'Volver'}
          </button>
        )}
        
        <div className={styles.titleSection}>
          {showProjectInfo && projectName && (
            <div className={styles.projectInfo}>
              <span className={styles.projectName}>{projectName}</span>
              {projectCode && <span className={styles.projectCode}>{projectCode}</span>}
            </div>
          )}
          
          {!showProjectInfo && (
            <>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            </>
          )}
        </div>
      </div>

      {/* Right section with actions */}
      {actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size={action.size || 'small'}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;

