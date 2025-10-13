/**
 * RegisterForm - User registration form component
 * @module features/auth/components/RegisterForm
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/shared/Input';
import Button from '../../../../components/shared/Button';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Los apellidos son obligatorios';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un correo electrónico válido';
    }

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

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration for development
      console.log('Registration data:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message and redirect to login
      alert('¡Registro exitoso! Por favor revise su correo electrónico para verificar su cuenta.');
      navigate('/login');
    } catch {
      setErrors({
        general: 'El registro falló. Por favor inténtelo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.general && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      <div className={styles.nameFields}>
        <div className={styles.field}>
          <Input
            type="text"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
            disabled={isLoading}
          />
        </div>
        <div className={styles.field}>
          <Input
            type="text"
            placeholder="Apellidos"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName}
            disabled={isLoading}
          />
        </div>
      </div>

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
          placeholder="Crear una contraseña"
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
          placeholder="Confirmar contraseña"
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
        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </Button>

      <div className={styles.loginLink}>
        <span>¿Ya tiene una cuenta? </span>
        <button
          type="button"
          className={styles.linkButton}
          onClick={handleLoginRedirect}
          disabled={isLoading}
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
