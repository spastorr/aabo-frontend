/**
 * General application configuration
 * @module config/app.config
 */

export const appConfig = {
  name: 'AABO Services',
  version: '2.0.0',
  defaultLanguage: 'es',
  defaultCurrency: 'USD',
  dateFormat: 'DD/MM/YYYY',
  timeZone: 'America/Guayaquil',
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

export default appConfig;

