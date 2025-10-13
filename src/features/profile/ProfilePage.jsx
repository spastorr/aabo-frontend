/**
 * Profile Page
 * @module features/profile/ProfilePage
 */

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/shared/PageHeader';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: '',
    position: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Saving profile data:', formData);
    setIsEditMode(false);
    // TODO: Implementar API call para actualizar perfil
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      department: '',
      position: '',
    });
    setIsEditMode(false);
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getRoleLabel = (role) => {
    const roleLabels = {
      'ADMIN': 'Administrador',
      'MANAGER': 'Gerente',
      'USER': 'Usuario',
    };
    return roleLabels[role] || role;
  };

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No se pudo cargar la información del perfil.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <PageHeader
        title="Mi Perfil"
        subtitle="Información personal y configuración"
      />

      <div className={styles.profileContainer}>
        {/* Profile Header */}
        <section className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            {getUserInitials(user.name)}
          </div>
          <h1 className={styles.profileName}>{user.name}</h1>
          <p className={styles.profileEmail}>{user.email}</p>
          <span className={styles.profileRole}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {getRoleLabel(user.role)}
          </span>
        </section>

        {/* Personal Information */}
        <section className={styles.profileSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Información Personal</h2>
            <p className={styles.sectionDescription}>
              Actualiza tu información personal y de contacto
            </p>
          </div>

          <div className={styles.editMode}>
            <button
              className={styles.editToggle}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              {isEditMode ? 'Cancelar Edición' : 'Editar Perfil'}
            </button>
          </div>

          {isEditMode ? (
            <form className={styles.editProfileForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Nombre Completo</label>
                <input
                  id="name"
                  type="text"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  className={styles.formInput}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Ingresa tu número de teléfono"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="department">Departamento</label>
                <input
                  id="department"
                  type="text"
                  className={styles.formInput}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Ingresa tu departamento"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="position">Cargo</label>
                <input
                  id="position"
                  type="text"
                  className={styles.formInput}
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Ingresa tu cargo"
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleSave}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.profileInfo}>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Nombre Completo</div>
                <div className={styles.infoValue}>{user.name}</div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Correo Electrónico</div>
                <div className={styles.infoValue}>{user.email}</div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>ID de Usuario</div>
                <div className={styles.infoValue}>{user.id}</div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Rol</div>
                <div className={styles.infoValue}>{getRoleLabel(user.role)}</div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Teléfono</div>
                <div className={styles.infoValue}>
                  {formData.phone || 'No especificado'}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Departamento</div>
                <div className={styles.infoValue}>
                  {formData.department || 'No especificado'}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Cargo</div>
                <div className={styles.infoValue}>
                  {formData.position || 'No especificado'}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Proyectos Asignados</div>
                <div className={styles.infoValue}>
                  {user.projectIds?.length || 0} proyecto(s)
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Account Information */}
        <section className={styles.profileSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Información de Cuenta</h2>
            <p className={styles.sectionDescription}>
              Detalles técnicos de tu cuenta
            </p>
          </div>

          <div className={styles.profileInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Estado de Cuenta</div>
              <div className={styles.infoValue}>
                <span style={{ color: 'var(--color-success)' }}>● Activa</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Último Acceso</div>
              <div className={styles.infoValue}>
                {new Date().toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>Permisos</div>
              <div className={styles.infoValue}>
                {user.permissions?.length || 0} permiso(s) asignado(s)
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
