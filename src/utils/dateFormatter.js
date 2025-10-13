/**
 * Date formatting utilities
 * @module utils/dateFormatter
 */

/**
 * Formats a date to DD/MM/YYYY or DD/MM/YYYY HH:mm if withTime is true
 * @param {Date|string} date - Date to format
 * @param {boolean} withTime - Include time in format
 * @returns {string} Formatted date
 */
export const formatDate = (date, withTime = false) => {
  if (!date) return '';
  if (withTime) return formatDateTime(date);
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formats a date to DD/MM/YYYY HH:mm
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const dateStr = formatDate(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}`;
};

/**
 * Converts a date to ISO string for API
 * @param {Date|string} date - Date to convert
 * @returns {string} ISO date string
 */
export const toISODate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

/**
 * Gets relative time string (e.g., "hace 2 horas")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'ahora mismo';
  if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays < 30) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  return formatDate(date);
};

