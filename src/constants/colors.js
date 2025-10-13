/**
 * Color mappings for status badges and UI elements
 * @module constants/colors
 */

import { DOCUMENT_STATUS, PROJECT_STATUS } from './statuses';

export const STATUS_COLORS = {
  // Document status colors
  [DOCUMENT_STATUS.APR]: {
    bg: '#dcfce7',
    text: '#166534',
    border: '#86efac',
  },
  [DOCUMENT_STATUS.ACC]: {
    bg: '#fef3c7',
    text: '#854d0e',
    border: '#fde047',
  },
  [DOCUMENT_STATUS.CMN]: {
    bg: '#dbeafe',
    text: '#1e40af',
    border: '#93c5fd',
  },
  [DOCUMENT_STATUS.RCH]: {
    bg: '#fee2e2',
    text: '#991b1b',
    border: '#fca5a5',
  },
  [DOCUMENT_STATUS.ELB]: {
    bg: '#f3f4f6',
    text: '#374151',
    border: '#d1d5db',
  },
  
  // Project status colors
  [PROJECT_STATUS.ACTIVE]: {
    bg: '#dcfce7',
    text: '#166534',
    border: '#86efac',
  },
  [PROJECT_STATUS.ON_HOLD]: {
    bg: '#fef3c7',
    text: '#854d0e',
    border: '#fde047',
  },
  [PROJECT_STATUS.COMPLETED]: {
    bg: '#e0e7ff',
    text: '#3730a3',
    border: '#a5b4fc',
  },
  [PROJECT_STATUS.CANCELLED]: {
    bg: '#f3f4f6',
    text: '#374151',
    border: '#d1d5db',
  },
};

export const THEME_COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
};

