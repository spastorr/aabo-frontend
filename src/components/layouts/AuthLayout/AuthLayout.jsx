/**
 * AuthLayout - Layout component for authentication pages
 * @module components/layouts/AuthLayout
 */

import styles from './AuthLayout.module.css';
import logo from '../../../assets/images/LogoSinFondo.avif';

const AuthLayout = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img
            src={logo}
            alt="AABO Logo"
            className={styles.logo}
          />
          {title && <h1 className={styles.title}>{title}</h1>}
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
