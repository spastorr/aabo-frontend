/**
 * Transmittal Code Generator
 * Generates sequential transmittal codes based on project and year
 * @module utils/transmittalCodeGenerator
 */

/**
 * Generate sequential transmittal code
 * @param {string} projectCode - Project code (e.g., 'RLL-MOD-2024')
 * @param {string} projectId - Project ID for uniqueness
 * @param {Array} existingTransmittals - Array of existing transmittals to get next number
 * @returns {string} Generated transmittal code
 */
export const generateTransmittalCode = (projectCode, projectId, existingTransmittals = []) => {
  const currentYear = new Date().getFullYear();
  
  // Extract project prefix from project code
  const projectPrefix = projectCode ? projectCode.split('-')[0] : 'PROJ';
  
  // Get the next sequential number for this project and year
  const nextNumber = getNextSequentialNumber(projectId, currentYear, existingTransmittals);
  
  // Format: TRN-{PROJECT_PREFIX}-{YEAR}-{SEQUENTIAL_NUMBER}
  return `TRN-${projectPrefix}-${currentYear}-${String(nextNumber).padStart(4, '0')}`;
};

/**
 * Get next sequential number for transmittals
 * @param {string} projectId - Project ID
 * @param {number} year - Current year
 * @param {Array} existingTransmittals - Existing transmittals
 * @returns {number} Next sequential number
 */
const getNextSequentialNumber = (projectId, year, existingTransmittals) => {
  // Filter transmittals for this project and year
  const projectTransmittals = existingTransmittals.filter(t => 
    t.projectId === projectId && 
    t.code && 
    t.code.includes(`-${year}-`)
  );
  
  if (projectTransmittals.length === 0) {
    return 1; // First transmittal of the year
  }
  
  // Extract numbers from existing codes and find the highest
  const numbers = projectTransmittals.map(t => {
    const match = t.code.match(/-(\d{4})$/);
    return match ? parseInt(match[1], 10) : 0;
  });
  
  const maxNumber = Math.max(...numbers);
  return maxNumber + 1;
};

/**
 * Validate transmittal code format
 * @param {string} code - Transmittal code to validate
 * @returns {boolean} True if valid format
 */
export const validateTransmittalCode = (code) => {
  const pattern = /^TRN-[A-Z0-9]+-\d{4}-\d{4}$/;
  return pattern.test(code);
};

/**
 * Parse transmittal code to extract components
 * @param {string} code - Transmittal code
 * @returns {Object} Parsed components
 */
export const parseTransmittalCode = (code) => {
  const match = code.match(/^TRN-([A-Z0-9]+)-(\d{4})-(\d{4})$/);
  
  if (!match) {
    return null;
  }
  
  return {
    prefix: 'TRN',
    projectPrefix: match[1],
    year: parseInt(match[2], 10),
    sequentialNumber: parseInt(match[3], 10)
  };
};

/**
 * Generate response due date (5 days from now by default)
 * @param {number} days - Number of days to add (default: 5)
 * @returns {string} ISO date string
 */
export const generateResponseDueDate = (days = 5) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate.toISOString().split('T')[0];
};

/**
 * Check if response due date is overdue
 * @param {string} dueDate - Response due date (ISO string)
 * @returns {boolean} True if overdue
 */
export const isResponseOverdue = (dueDate) => {
  if (!dueDate) return false;
  
  const today = new Date().toISOString().split('T')[0];
  return dueDate < today;
};

/**
 * Get days until response due date
 * @param {string} dueDate - Response due date (ISO string)
 * @returns {number} Days until due (negative if overdue)
 */
export const getDaysUntilResponse = (dueDate) => {
  if (!dueDate) return null;
  
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};
