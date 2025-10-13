/**
 * ForgotPasswordForm - Password reset request form component
 * @module features/auth/components/ForgotPasswordForm
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import styles from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor ingrese un correo electrónico válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock password reset request for development
      console.log('Password reset requested for:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
    } catch {
      setErrors({
        general: 'Error al enviar el correo de restablecimiento. Por favor inténtelo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Revise su correo</h2>
        <p className={styles.successMessage}>
          Hemos enviado un enlace para restablecer su contraseña a <strong>{email}</strong>
        </p>
        <p className={styles.successSubtext}>
          Si no ve el correo en su bandeja de entrada, revise su carpeta de spam.
        </p>
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

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.general && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      <div className={styles.instructions}>
        <h3 className={styles.title}>¿Olvidó su contraseña?</h3>
        <p className={styles.description}>
          Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.
        </p>
      </div>

      <div className={styles.field}>
        <Input
          type="email"
          placeholder="Ingrese su dirección de correo electrónico"
          value={email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
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
        {isLoading ? 'Enviando...' : 'Enviar Enlace de Restablecimiento'}
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

export default ForgotPasswordForm;
