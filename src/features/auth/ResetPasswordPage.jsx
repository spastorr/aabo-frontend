/**
 * ResetPasswordPage - Password reset page component
 * @module features/auth/ResetPasswordPage
 */

import AuthLayout from '../../components/layouts/AuthLayout';
import ResetPasswordForm from './components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <AuthLayout title="Nueva Contraseña">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
