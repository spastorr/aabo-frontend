/**
 * Code generation utilities for documents, projects, transmittals
 * @module utils/codeGenerator
 */

/**
 * Generates a document code based on project, discipline, and type
 * @param {Object} params - Parameters for code generation
 * @param {string} params.projectCode - Project code
 * @param {string} params.discipline - Discipline code
 * @param {string} params.documentType - Document type
 * @param {number} params.sequential - Sequential number
 * @returns {string} Generated document code
 */
export const generateDocumentCode = ({ projectCode, discipline, documentType, sequential }) => {
  const seqPadded = String(sequential).padStart(4, '0');
  return `${projectCode}-${discipline}-${documentType}-${seqPadded}`;
};

/**
 * Generates a transmittal code
 * @param {Object} params - Parameters for code generation
 * @param {string} params.projectCode - Project code
 * @param {string} params.year - Year (YYYY)
 * @param {number} params.sequential - Sequential number
 * @returns {string} Generated transmittal code
 */
export const generateTransmittalCode = ({ projectCode, year, sequential }) => {
  const seqPadded = String(sequential).padStart(4, '0');
  return `TRN-${projectCode}-${year}-${seqPadded}`;
};

/**
 * Generates an RFI code
 * @param {Object} params - Parameters for code generation
 * @param {string} params.projectCode - Project code
 * @param {number} params.sequential - Sequential number
 * @returns {string} Generated RFI code
 */
export const generateRFICode = ({ projectCode, sequential }) => {
  const seqPadded = String(sequential).padStart(4, '0');
  return `RFI-${projectCode}-${seqPadded}`;
};

/**
 * Parses a document code into its components
 * @param {string} code - Document code to parse
 * @returns {Object} Parsed components
 */
export const parseDocumentCode = (code) => {
  const parts = code.split('-');
  if (parts.length < 4) return null;
  
  return {
    projectCode: parts[0],
    discipline: parts[1],
    documentType: parts[2],
    sequential: parts[3],
  };
};

