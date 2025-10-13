/**
 * LoginPage - Main login page component
 * @module features/auth/LoginPage
 */

import AuthLayout from '../../components/layouts/AuthLayout';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout title="Bienvenido de Vuelta">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
