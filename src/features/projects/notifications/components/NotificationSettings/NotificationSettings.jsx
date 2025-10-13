/**
 * Notification Settings Component
 * Component for managing notification preferences
 * @module features/projects/notifications/components/NotificationSettings
 */

import { useState } from 'react';
import { NOTIFICATION_TYPES } from '../../../../../services/mocks';
import styles from './NotificationSettings.module.css';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    [NOTIFICATION_TYPES.DOCUMENT]: { email: true, push: true },
    [NOTIFICATION_TYPES.TRANSMITTAL]: { email: true, push: true },
    [NOTIFICATION_TYPES.RFI]: { email: true, push: true },
    [NOTIFICATION_TYPES.COMMENT]: { email: true, push: false },
    [NOTIFICATION_TYPES.MENTION]: { email: true, push: true },
    [NOTIFICATION_TYPES.APPROVAL]: { email: true, push: true },
    [NOTIFICATION_TYPES.DEADLINE]: { email: true, push: true },
    [NOTIFICATION_TYPES.SYSTEM]: { email: false, push: false },
  });

  const handleToggle = (type, channel) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: !prev[type][channel],
      },
    }));
  };

  const getTypeLabel = (type) => {
    const labels = {
      [NOTIFICATION_TYPES.DOCUMENT]: 'Documentos',
      [NOTIFICATION_TYPES.TRANSMITTAL]: 'Transmittals',
      [NOTIFICATION_TYPES.RFI]: 'RFIs',
      [NOTIFICATION_TYPES.COMMENT]: 'Comentarios',
      [NOTIFICATION_TYPES.MENTION]: 'Menciones',
      [NOTIFICATION_TYPES.APPROVAL]: 'Aprobaciones',
      [NOTIFICATION_TYPES.DEADLINE]: 'Vencimientos',
      [NOTIFICATION_TYPES.SYSTEM]: 'Sistema',
    };
    return labels[type] || type;
  };

  return (
    <div className={styles.settings}>
      <h3 className={styles.title}>Preferencias de Notificaciones</h3>
      <p className={styles.subtitle}>
        Configura cómo quieres recibir notificaciones para cada tipo de evento
      </p>

      <div className={styles.settingsList}>
        {Object.keys(settings).map((type) => (
          <div key={type} className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4 className={styles.settingTitle}>{getTypeLabel(type)}</h4>
            </div>
            <div className={styles.settingToggles}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings[type].email}
                  onChange={() => handleToggle(type, 'email')}
                />
                <span className={styles.toggleLabel}>Email</span>
              </label>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings[type].push}
                  onChange={() => handleToggle(type, 'push')}
                />
                <span className={styles.toggleLabel}>Push</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.saveButton}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default NotificationSettings;

