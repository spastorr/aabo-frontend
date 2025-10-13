/**
 * RegisterPage - User registration page component
 * @module features/auth/RegisterPage
 */

import AuthLayout from '../../components/layouts/AuthLayout';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout title="Crear Cuenta">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
