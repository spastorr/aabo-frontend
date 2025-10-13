/**
 * ForgotPasswordPage - Password reset request page component
 * @module features/auth/ForgotPasswordPage
 */

import AuthLayout from '../../components/layouts/AuthLayout';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Restablecer Contraseña">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
