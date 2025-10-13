/**
 * ResetPasswordForm - Password reset form component
 * @module features/auth/components/ResetPasswordForm
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      // Validate token (mock validation)
      validateToken(resetToken);
    } else {
      setTokenValid(false);
      setErrors({ general: 'Token de restablecimiento inválido o faltante. Por favor solicite un nuevo restablecimiento de contraseña.' });
    }
  }, [searchParams]);

  const validateToken = async (resetToken) => {
    try {
      // Mock token validation
      console.log('Validating token:', resetToken);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // For demo purposes, accept any token
      setTokenValid(true);
    } catch {
      setTokenValid(false);
      setErrors({ general: 'Token de restablecimiento inválido o expirado. Por favor solicite un nuevo restablecimiento de contraseña.' });
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirme su contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !tokenValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock password reset for development
      console.log('Resetting password with token:', token);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
    } catch {
      setErrors({
        general: 'Error al restablecer la contraseña. Por favor inténtelo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (tokenValid === false) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>Enlace de Restablecimiento Inválido</h2>
        <p className={styles.errorMessage}>
          Este enlace de restablecimiento de contraseña es inválido o ha expirado.
        </p>
        <Button
          variant="primary"
          size="medium"
          onClick={() => navigate('/forgot-password')}
          className={styles.retryButton}
        >
          Solicitar Nuevo Enlace
        </Button>
        <Button
          variant="outline"
          size="medium"
          onClick={handleBackToLogin}
          className={styles.backButton}
        >
          Volver a Iniciar Sesión
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Contraseña Restablecida Exitosamente</h2>
        <p className={styles.successMessage}>
          Su contraseña ha sido restablecida exitosamente. Ahora puede iniciar sesión con su nueva contraseña.
        </p>
        <Button
          variant="primary"
          size="medium"
          onClick={handleBackToLogin}
          className={styles.loginButton}
        >
          Iniciar Sesión
        </Button>
      </div>
    );
  }

  if (tokenValid === null) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Validando enlace de restablecimiento...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.general && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      <div className={styles.instructions}>
        <h3 className={styles.title}>Restablezca su contraseña</h3>
        <p className={styles.description}>
          Ingrese su nueva contraseña a continuación. Asegúrese de que sea fuerte y segura.
        </p>
      </div>

      <div className={styles.field}>
        <Input
          type="password"
          placeholder="Nueva contraseña"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <Input
          type="password"
          placeholder="Confirmar nueva contraseña"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
        {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
      </Button>

      <div className={styles.loginLink}>
        <span>¿Recuerda su contraseña? </span>
        <button
          type="button"
          className={styles.linkButton}
          onClick={handleBackToLogin}
          disabled={isLoading}
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
