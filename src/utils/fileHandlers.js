/**
 * File handling utilities
 * @module utils/fileHandlers
 */

/**
 * Gets file extension from filename
 * @param {string} filename - Filename
 * @returns {string} File extension (lowercase)
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

/**
 * Formats file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validates file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types or extensions
 * @returns {boolean} True if valid file type
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes || allowedTypes.length === 0) return false;
  
  const fileType = file.type.toLowerCase();
  const fileExt = getFileExtension(file.name);
  
  return allowedTypes.some(type => {
    if (type.startsWith('.')) {
      // Extension check
      return fileExt === type.substring(1).toLowerCase();
    }
    // MIME type check
    return fileType === type.toLowerCase();
  });
};

/**
 * Validates file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} True if valid file size
 */
export const isValidFileSize = (file, maxSizeMB) => {
  if (!file) return false;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Downloads a file from URL
 * @param {string} url - File URL
 * @param {string} filename - Filename for download
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

