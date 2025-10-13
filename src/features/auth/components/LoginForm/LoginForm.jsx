/**
 * LoginForm - Authentication form component
 * @module features/auth/components/LoginForm
 */

import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../hooks';
import Input from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Por favor ingrese un correo electrónico válido';
    }

    if (!data.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (data.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
  };

  const submitForm = async (data) => {
    // Mock login for development
    await login({
      email: data.email,
      password: data.password,
      user: {
        id: 'USR-001',
        email: data.email,
        name: 'Juan Pérez',
        role: 'ADMIN',
        permissions: ['project:view', 'project:create', 'document:approve', 'admin:access'],
        projectIds: ['PROJ-001', 'PROJ-002', 'PROJ-003'],
      },
      token: 'mock-jwt-token'
    });

    navigate('/');
  };

  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useAuthForm(
    { email: '', password: '' },
    validateForm,
    submitForm
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.general && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      <div className={styles.field}>
        <Input
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <Input
          type="password"
          placeholder="Ingrese su contraseña"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>

      <div className={styles.links}>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => navigate('/forgot-password')}
          disabled={isLoading}
        >
          ¿Olvidó su contraseña?
        </button>

        <div className={styles.signupLink}>
          <span>¿No tiene una cuenta? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => navigate('/register')}
            disabled={isLoading}
          >
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
