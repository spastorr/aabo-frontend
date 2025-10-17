/**
 * BudgetChart component
 * Bar chart showing budget execution
 * @module features/projects/dashboard/components/CostWidget/BudgetChart
 */

import { useEffect, useRef, useState } from 'react';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../../../constants';
import { formatCurrency } from '../../../../../utils';
import styles from './BudgetChart.module.css';

const BudgetChart = ({ budgetData, overall }) => {
  const canvasRef = useRef(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !budgetData) return;
    drawChart();
  }, [budgetData, hoveredBar]);

  // Redraw chart when theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      if (canvasRef.current && budgetData) {
        drawChart();
      }
    };

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, [budgetData]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = { top: 40, right: 40, bottom: 120, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find max value for scaling
    const maxValue = Math.max(...budgetData.map(d => Math.max(d.budgeted, d.spent)));

    // Draw axes and grid
    drawGrid(ctx, padding, chartWidth, chartHeight, maxValue);

    // Draw bars
    drawBars(ctx, budgetData, padding, chartWidth, chartHeight, maxValue);

    // Draw legend
    drawLegend(ctx, width, padding);
  };

  const drawGrid = (ctx, padding, chartWidth, chartHeight, maxValue) => {
    // Get computed styles for theme-aware colors
    const computedStyle = getComputedStyle(document.documentElement);
    const gridColor = computedStyle.getPropertyValue('--color-border').trim();
    const textSecondary = computedStyle.getPropertyValue('--color-text-secondary').trim();
    const textPrimary = computedStyle.getPropertyValue('--color-text-primary').trim();
    const axisColor = computedStyle.getPropertyValue('--color-text-secondary').trim();

    // Horizontal grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Value labels
      const value = maxValue - (maxValue / 5) * i;
      ctx.fillStyle = textSecondary;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`$${(value / 1000).toFixed(0)}K`, padding.left - 10, y + 4);
    }

    // Draw axes
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Axis label
    ctx.fillStyle = textPrimary;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Presupuesto (USD)', padding.left - 50, padding.top + chartHeight / 2);
  };

  const drawBars = (ctx, data, padding, chartWidth, chartHeight, maxValue) => {
    const barWidth = chartWidth / (data.length * 2.5);
    const groupWidth = chartWidth / data.length;
    const gap = 8;

    // Get computed styles for theme-aware colors
    const computedStyle = getComputedStyle(document.documentElement);
    const textSecondary = computedStyle.getPropertyValue('--color-text-secondary').trim();
    const textPrimary = computedStyle.getPropertyValue('--color-text-primary').trim();
    const background = computedStyle.getPropertyValue('--color-background').trim();

    data.forEach((item, index) => {
      const x = padding.left + index * groupWidth + groupWidth / 2 - barWidth - gap / 2;
      const color = DISCIPLINE_COLORS[item.discipline] || '#64748b';
      const executionPercentage = (item.spent / item.budgeted) * 100;

      // Budgeted bar
      const budgetedHeight = (item.budgeted / maxValue) * chartHeight;
      const budgetedY = padding.top + chartHeight - budgetedHeight;

      // Highlight hovered bar
      const isHovered = hoveredBar === index;
      const barOpacity = isHovered ? '80' : '40';
      const strokeWidth = isHovered ? 3 : 2;

      ctx.fillStyle = color + barOpacity;
      ctx.fillRect(x, budgetedY, barWidth, budgetedHeight);
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.strokeRect(x, budgetedY, barWidth, budgetedHeight);

      // Spent bar
      const spentHeight = (item.spent / maxValue) * chartHeight;
      const spentY = padding.top + chartHeight - spentHeight;

      ctx.fillStyle = color;
      ctx.fillRect(x + barWidth + gap, spentY, barWidth, spentHeight);

      // Discipline label (improved readability)
      ctx.fillStyle = textSecondary;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        DISCIPLINE_LABELS[item.discipline],
        x + barWidth + gap / 2,
        padding.top + chartHeight + 20
      );

      // Execution percentage label on spent bar
      if (spentHeight > 25) {
        // Use contrasting color based on theme
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${executionPercentage.toFixed(1)}%`,
          x + barWidth + gap + barWidth / 2,
          spentY + spentHeight / 2 + 4
        );
      }

      // Value labels (only show on hover or if bars are tall enough)
      if (isHovered || budgetedHeight > 30) {
        ctx.fillStyle = textPrimary;
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `$${(item.budgeted / 1000).toFixed(0)}K`,
          x + barWidth / 2,
          budgetedY - 5
        );
      }

      if (isHovered || spentHeight > 30) {
        ctx.fillStyle = textPrimary;
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `$${(item.spent / 1000).toFixed(0)}K`,
          x + barWidth + gap + barWidth / 2,
          spentY - 5
        );
      }
    });
  };

  const drawLegend = (ctx, width, padding) => {
    const legendX = width - padding.right - 160;
    const legendY = padding.top + 10;

    // Get computed styles for theme-aware colors
    const computedStyle = getComputedStyle(document.documentElement);
    const textSecondary = computedStyle.getPropertyValue('--color-text-secondary').trim();
    const borderColor = computedStyle.getPropertyValue('--color-border').trim();
    const primaryColor = computedStyle.getPropertyValue('--color-primary').trim();

    // Budgeted
    ctx.fillStyle = textSecondary + '40';
    ctx.fillRect(legendX, legendY - 8, 20, 12);
    ctx.strokeStyle = textSecondary;
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX, legendY - 8, 20, 12);

    ctx.fillStyle = textSecondary;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Presupuestado', legendX + 28, legendY);

    // Spent
    ctx.fillStyle = primaryColor;
    ctx.fillRect(legendX, legendY + 12, 20, 12);

    ctx.fillStyle = primaryColor;
    ctx.fillText('Ejecutado', legendX + 28, legendY + 20);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePosition({ x: event.clientX, y: event.clientY });
    
    // Check if mouse is over any bar
    const padding = { top: 40, right: 40, bottom: 120, left: 80 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    const barWidth = chartWidth / (budgetData.length * 2.5);
    const groupWidth = chartWidth / budgetData.length;
    const gap = 8;

    let foundBar = null;
    budgetData.forEach((item, index) => {
      const barX = padding.left + index * groupWidth + groupWidth / 2 - barWidth - gap / 2;
      const barY = padding.top;
      const barHeight = chartHeight;

      // Check if mouse is over budgeted bar
      if (x >= barX && x <= barX + barWidth && y >= barY && y <= barY + barHeight) {
        foundBar = index;
      }
      // Check if mouse is over spent bar
      else if (x >= barX + barWidth + gap && x <= barX + barWidth + gap + barWidth && y >= barY && y <= barY + barHeight) {
        foundBar = index;
      }
    });

    setHoveredBar(foundBar);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className={styles.chartContainer}>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className={styles.canvas}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: hoveredBar !== null ? 'pointer' : 'default' }}
      />
      
      {/* Tooltip */}
      {hoveredBar !== null && budgetData[hoveredBar] && (
        <div 
          className={styles.tooltip}
          style={{
            position: 'fixed',
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            zIndex: 1000
          }}
        >
          <div className={styles.tooltipContent}>
            <div className={styles.tooltipTitle}>
              {DISCIPLINE_LABELS[budgetData[hoveredBar].discipline]}
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>Presupuestado:</span>
              <span className={styles.tooltipValue}>
                {formatCurrency(budgetData[hoveredBar].budgeted)}
              </span>
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>Ejecutado:</span>
              <span className={styles.tooltipValue}>
                {formatCurrency(budgetData[hoveredBar].spent)}
              </span>
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>Restante:</span>
              <span className={styles.tooltipValue}>
                {formatCurrency(budgetData[hoveredBar].budgeted - budgetData[hoveredBar].spent)}
              </span>
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipLabel}>Ejecución:</span>
              <span className={styles.tooltipValue}>
                {((budgetData[hoveredBar].spent / budgetData[hoveredBar].budgeted) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Total Presupuestado:</span>
          <span className={styles.summaryValue}>{formatCurrency(overall.budgeted)}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Total Ejecutado:</span>
          <span className={styles.summaryValue} style={{ color: 'var(--color-primary)' }}>
            {formatCurrency(overall.spent)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Restante:</span>
          <span className={styles.summaryValue} style={{ color: overall.remaining < 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>
            {formatCurrency(overall.remaining)}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Porcentaje Ejecutado:</span>
          <span className={styles.summaryValue} style={{ 
            color: overall.percentage > 90 ? 'var(--color-warning)' : 'var(--color-success)' 
          }}>
            {overall.percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;

