/**
 * Error handling utilities
 * @module utils/errorHandlers
 */

/**
 * Extracts user-friendly error message from API error
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // API error with response
  if (error.response) {
    const { data, status } = error.response;
    
    if (data?.message) return data.message;
    
    // HTTP status messages
    const statusMessages = {
      400: 'Solicitud inválida',
      401: 'No autorizado. Por favor, inicie sesión nuevamente',
      403: 'No tiene permisos para realizar esta acción',
      404: 'Recurso no encontrado',
      500: 'Error en el servidor. Por favor, intente más tarde',
      503: 'Servicio no disponible. Por favor, intente más tarde',
    };
    
    return statusMessages[status] || `Error del servidor (${status})`;
  }
  
  // Network error
  if (error.request) {
    return 'Error de conexión. Por favor, verifique su internet';
  }
  
  // Other errors
  return error.message || 'Ha ocurrido un error inesperado';
};

/**
 * Logs error to console (or external service in production)
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
  if (import.meta.env.DEV) {
    console.error('Error:', error);
    console.error('Context:', context);
  } else {
    // In production, send to error tracking service (e.g., Sentry)
    // sendToErrorTracking(error, context);
  }
};

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {Object} details - Additional error details
 * @returns {Object} Standardized error object
 */
export const createError = (message, code = 'UNKNOWN_ERROR', details = {}) => {
  return {
    success: false,
    error: {
      message,
      code,
      details,
      timestamp: new Date().toISOString(),
    },
  };
};

