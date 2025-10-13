/**
 * Centralized access to environment variables
 * @module config/env
 */

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  useMocks: import.meta.env.VITE_USE_MOCKS === 'true',
  appName: import.meta.env.VITE_APP_NAME || 'AABO Services',
  appVersion: import.meta.env.VITE_APP_VERSION || '2.0.0',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default env;

