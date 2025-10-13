/**
 * Chart and data visualization helpers
 * @module utils/chartHelpers
 */

/**
 * Generates color palette for charts
 * @param {number} count - Number of colors needed
 * @returns {string[]} Array of hex colors
 */
export const generateColorPalette = (count) => {
  const baseColors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#6366f1', '#ef4444',
  ];
  
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Generate more colors if needed
  const colors = [...baseColors];
  while (colors.length < count) {
    const hue = (colors.length * 360 / count) % 360;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  
  return colors;
};

/**
 * Calculates S-curve data points for project progress
 * @param {number} totalDuration - Total project duration
 * @param {number} currentProgress - Current progress (0-100)
 * @returns {Object[]} Array of {x, y} points
 */
export const generateSCurveData = (totalDuration, currentProgress) => {
  const points = [];
  const steps = totalDuration;
  
  for (let i = 0; i <= steps; i++) {
    const x = i;
    // S-curve formula: y = 100 / (1 + e^(-k(x - x0)))
    const k = 0.1;
    const x0 = steps / 2;
    const y = 100 / (1 + Math.exp(-k * (x - x0)));
    points.push({ x, y: Math.round(y * 10) / 10 });
  }
  
  return points;
};

/**
 * Aggregates data by key
 * @param {Object[]} data - Array of objects
 * @param {string} key - Key to group by
 * @param {string} valueKey - Key to sum
 * @returns {Object} Aggregated data
 */
export const aggregateByKey = (data, key, valueKey) => {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = (acc[groupKey] || 0) + (item[valueKey] || 0);
    return acc;
  }, {});
};

