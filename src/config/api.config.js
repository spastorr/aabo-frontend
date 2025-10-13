/**
 * API configuration
 * @module config/api.config
 */

import { env } from './env';

export const apiConfig = {
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default apiConfig;

