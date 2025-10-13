/**
 * EmailVerificationPage - Email verification page component
 * @module features/auth/EmailVerificationPage
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Button from '../../components/shared/Button';
import styles from './EmailVerificationPage.module.css';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error', 'expired'
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userEmail = searchParams.get('email');

    if (userEmail) {
      setEmail(userEmail);
    }

    if (token) {
      verifyEmail(token);
    } else {
      setVerificationStatus('error');
    }
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      console.log('Verifying email with token:', token);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.2; // 80% success rate

      if (success) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('error');
      }
    } catch {
      setVerificationStatus('error');
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);

    try {
      console.log('Resending verification email to:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Verification email sent! Please check your inbox.');
    } catch {
      alert('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleContinueToLogin = () => {
    navigate('/login');
  };

  const handleBackToRegister = () => {
    navigate('/register');
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className={styles.verifyingContainer}>
            <div className={styles.spinner}></div>
            <h2 className={styles.title}>Verificando su correo electrónico</h2>
            <p className={styles.message}>
              Por favor espere mientras verificamos su dirección de correo electrónico...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.title}>¡Correo Electrónico Verificado!</h2>
            <p className={styles.message}>
              Su correo electrónico ha sido verificado exitosamente. Ahora puede iniciar sesión en su cuenta.
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={handleContinueToLogin}
              className={styles.continueButton}
            >
              Continuar para Iniciar Sesión
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.title}>Verificación Fallida</h2>
            <p className={styles.message}>
              No pudimos verificar su dirección de correo electrónico. El enlace de verificación puede ser inválido o haber expirado.
            </p>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                size="medium"
                onClick={handleResendVerification}
                loading={isResending}
                disabled={isResending}
                className={styles.resendButton}
              >
                {isResending ? 'Enviando...' : 'Reenviar Verificación'}
              </Button>
              <Button
                variant="outline"
                size="medium"
                onClick={handleBackToRegister}
                className={styles.registerButton}
              >
                Volver a Registrarse
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout title="Email Verification">
      {renderContent()}
    </AuthLayout>
  );
};

export default EmailVerificationPage;
