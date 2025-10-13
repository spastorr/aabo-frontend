/**
 * BudgetOverTimeChart component
 * Shows budget execution over project timeline
 * @module features/projects/dashboard/components/CostWidget/BudgetOverTimeChart
 */

import { useEffect, useRef } from 'react';
import { formatCurrency } from '../../../../../utils';
import styles from './BudgetChart.module.css';

const BudgetOverTimeChart = ({ plannedBudget, actualBudget, currentWeek, totalBudget }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    drawChart();
  }, [plannedBudget, actualBudget, currentWeek]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Draw grid and axes
    drawGrid(ctx, padding, chartWidth, chartHeight, totalBudget, plannedBudget.length);

    // Draw planned budget curve
    drawCurve(ctx, plannedBudget, padding, chartWidth, chartHeight, totalBudget, '#94a3b8', 'Planificado');

    // Draw actual budget curve
    drawCurve(ctx, actualBudget, padding, chartWidth, chartHeight, totalBudget, '#10b981', 'Ejecutado');

    // Draw current week marker
    if (currentWeek !== undefined) {
      drawCurrentWeekMarker(ctx, currentWeek, plannedBudget.length, padding, chartWidth, chartHeight);
    }

    // Draw legend
    drawLegend(ctx, width, padding);
  };

  const drawGrid = (ctx, padding, chartWidth, chartHeight, maxBudget, totalWeeks) => {
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Vertical grid lines (weeks)
    for (let i = 0; i <= 10; i++) {
      const x = padding.left + (chartWidth / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();

      // Week labels
      if (i % 2 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        const weekNumber = Math.round((totalWeeks / 10) * i);
        ctx.fillText(`Sem ${weekNumber}`, x, padding.top + chartHeight + 20);
      }
    }

    // Horizontal grid lines (budget)
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Budget labels
      const value = maxBudget - (maxBudget / 5) * i;
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

    // Axis labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(padding.left - 55, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Presupuesto Acumulado (USD)', 0, 0);
    ctx.restore();
    ctx.fillText('Semanas del Proyecto', padding.left + chartWidth / 2, padding.top + chartHeight + 45);
  };

  const drawCurve = (ctx, data, padding, chartWidth, chartHeight, maxBudget, color, label) => {
    if (!data || data.length === 0) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const y = padding.top + chartHeight - (chartHeight * value / maxBudget);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points at key intervals
    ctx.fillStyle = color;
    data.forEach((value, index) => {
      if (index % Math.floor(data.length / 10) === 0 || index === data.length - 1) {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - (chartHeight * value / maxBudget);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const drawCurrentWeekMarker = (ctx, currentWeek, totalWeeks, padding, chartWidth, chartHeight) => {
    const x = padding.left + (chartWidth / (totalWeeks - 1)) * currentWeek;

    // Draw vertical line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, padding.top + chartHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw label
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HOY', x, padding.top - 10);
  };

  const drawLegend = (ctx, width, padding) => {
    const legendX = width - padding.right - 150;
    const legendY = padding.top + 10;

    // Planned
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 30, legendY);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Planificado', legendX + 40, legendY + 4);

    // Actual
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(legendX, legendY + 20);
    ctx.lineTo(legendX + 30, legendY + 20);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.fillText('Ejecutado', legendX + 40, legendY + 24);
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
          <span className={styles.summaryLabel}>Presupuesto Total:</span>
          <span className={styles.summaryValue}>{formatCurrency(totalBudget)}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Ejecutado a la Fecha:</span>
          <span className={styles.summaryValue} style={{ color: 'var(--color-success)' }}>
            {formatCurrency(actualBudget[currentWeek] || actualBudget[actualBudget.length - 1])}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Planificado a la Fecha:</span>
          <span className={styles.summaryValue} style={{ color: 'var(--color-text-secondary)' }}>
            {formatCurrency(plannedBudget[currentWeek] || plannedBudget[plannedBudget.length - 1])}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Variación:</span>
          <span className={styles.summaryValue} style={{ 
            color: (actualBudget[currentWeek] || 0) > (plannedBudget[currentWeek] || 0) ? 'var(--color-danger)' : 'var(--color-success)' 
          }}>
            {formatCurrency(Math.abs((actualBudget[currentWeek] || 0) - (plannedBudget[currentWeek] || 0)))}
            {(actualBudget[currentWeek] || 0) > (plannedBudget[currentWeek] || 0) ? ' ↑' : ' ↓'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverTimeChart;

