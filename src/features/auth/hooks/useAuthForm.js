/**
 * Custom hook for authentication form handling
 * @module features/auth/hooks/useAuthForm
 */

import { useState } from 'react';

/**
 * Custom hook for managing authentication form state and validation
 * @param {Object} initialData - Initial form data
 * @param {Function} validateFunction - Validation function
 * @param {Function} submitFunction - Submit function
 * @returns {Object} Form state and handlers
 */
export const useAuthForm = (initialData, validateFunction, submitFunction) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validate = () => {
    const validationErrors = validateFunction(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await submitFunction(formData);
      setIsSuccess(true);
      return result;
    } catch (error) {
      setErrors({
        general: error.message || 'An error occurred. Please try again.'
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setIsSuccess(false);
  };

  const setFieldError = (field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
    resetForm,
    setFieldError,
    setFormData,
    setErrors
  };
};

export default useAuthForm;
