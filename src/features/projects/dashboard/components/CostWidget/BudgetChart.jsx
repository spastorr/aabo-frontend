/**
 * BudgetChart component
 * Bar chart showing budget execution
 * @module features/projects/dashboard/components/CostWidget/BudgetChart
 */

import { useEffect, useRef } from 'react';
import { DISCIPLINE_LABELS, DISCIPLINE_COLORS } from '../../../../../constants';
import { formatCurrency } from '../../../../../utils';
import styles from './BudgetChart.module.css';

const BudgetChart = ({ budgetData, overall }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !budgetData) return;
    drawChart();
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
    // Horizontal grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Value labels
      const value = maxValue - (maxValue / 5) * i;
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`$${(value / 1000).toFixed(0)}K`, padding.left - 10, y + 4);
    }

    // Draw axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Axis label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Presupuesto (USD)', padding.left - 50, padding.top + chartHeight / 2);
  };

  const drawBars = (ctx, data, padding, chartWidth, chartHeight, maxValue) => {
    const barWidth = chartWidth / (data.length * 2.5);
    const groupWidth = chartWidth / data.length;
    const gap = 8;

    data.forEach((item, index) => {
      const x = padding.left + index * groupWidth + groupWidth / 2 - barWidth - gap / 2;
      const color = DISCIPLINE_COLORS[item.discipline] || '#64748b';

      // Budgeted bar
      const budgetedHeight = (item.budgeted / maxValue) * chartHeight;
      const budgetedY = padding.top + chartHeight - budgetedHeight;

      ctx.fillStyle = color + '40'; // 25% opacity
      ctx.fillRect(x, budgetedY, barWidth, budgetedHeight);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, budgetedY, barWidth, budgetedHeight);

      // Spent bar
      const spentHeight = (item.spent / maxValue) * chartHeight;
      const spentY = padding.top + chartHeight - spentHeight;

      ctx.fillStyle = color;
      ctx.fillRect(x + barWidth + gap, spentY, barWidth, spentHeight);

      // Discipline label
      ctx.save();
      ctx.translate(x + barWidth + gap / 2, padding.top + chartHeight + 15);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(DISCIPLINE_LABELS[item.discipline], 0, 0);
      ctx.restore();

      // Value labels
      if (budgetedHeight > 20) {
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `$${(item.budgeted / 1000).toFixed(0)}K`,
          x + barWidth / 2,
          budgetedY - 5
        );
      }

      if (spentHeight > 20) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `$${(item.spent / 1000).toFixed(0)}K`,
          x + barWidth + gap + barWidth / 2,
          spentY + spentHeight / 2 + 4
        );
      }
    });
  };

  const drawLegend = (ctx, width, padding) => {
    const legendX = width - padding.right - 160;
    const legendY = padding.top + 10;

    // Budgeted
    ctx.fillStyle = '#64748b40';
    ctx.fillRect(legendX, legendY - 8, 20, 12);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(legendX, legendY - 8, 20, 12);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Presupuestado', legendX + 28, legendY);

    // Spent
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(legendX, legendY + 12, 20, 12);

    ctx.fillStyle = '#2563eb';
    ctx.fillText('Ejecutado', legendX + 28, legendY + 20);
  };

  return (
    <div className={styles.chartContainer}>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className={styles.canvas}
      />
      
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

