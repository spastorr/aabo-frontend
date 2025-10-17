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

/**
 * Adds days to a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds weeks to a date
 * @param {Date|string} date - Base date
 * @param {number} weeks - Number of weeks to add
 * @returns {Date} New date with weeks added
 */
export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

/**
 * Adds months to a date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} New date with months added
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Subtracts days from a date
 * @param {Date|string} date - Base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date with days subtracted
 */
export const subDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Subtracts weeks from a date
 * @param {Date|string} date - Base date
 * @param {number} weeks - Number of weeks to subtract
 * @returns {Date} New date with weeks subtracted
 */
export const subWeeks = (date, weeks) => {
  return addWeeks(date, -weeks);
};

/**
 * Subtracts months from a date
 * @param {Date|string} date - Base date
 * @param {number} months - Number of months to subtract
 * @returns {Date} New date with months subtracted
 */
export const subMonths = (date, months) => {
  return addMonths(date, -months);
};

/**
 * Calculates the difference in days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in days
 */
export const differenceInDays = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formats date for timeline display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export const formatDateForTimeline = (date, format = 'medium') => {
  if (!date) return '';
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return `${d.getDate()}/${d.getMonth() + 1}`;
    case 'medium':
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`;
    case 'long':
      return formatDate(date);
    default:
      return formatDate(date);
  }
};

