/**
 * Avatar component
 * Displays user initials or image
 * @module components/shared/Avatar
 */

import styles from './Avatar.module.css';

/**
 * Gets initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

/**
 * Generates a color based on name
 * @param {string} name - Name to generate color for
 * @returns {string} Hex color
 */
const getColorForName = (name) => {
  if (!name) return '#64748b';
  
  const colors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#6366f1', '#ef4444',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const Avatar = ({ name, src, size = 'medium', showTooltip = true }) => {
  const initials = getInitials(name);
  const bgColor = getColorForName(name);

  return (
    <div className={styles.avatarWrapper} title={showTooltip ? name : ''}>
      {src ? (
        <img src={src} alt={name} className={`${styles.avatar} ${styles[size]}`} />
      ) : (
        <div 
          className={`${styles.avatar} ${styles[size]}`}
          style={{ backgroundColor: bgColor }}
        >
          <span className={styles.initials}>{initials}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;

