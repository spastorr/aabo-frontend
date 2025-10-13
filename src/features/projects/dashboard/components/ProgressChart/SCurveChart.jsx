/**
 * SCurveChart component
 * Displays S-curve comparing planned vs actual progress
 * @module features/projects/dashboard/components/ProgressChart/SCurveChart
 */

import { useEffect, useRef } from 'react';
import Card from '../../../../../components/shared/Card';
import styles from './SCurveChart.module.css';

const SCurveChart = ({ plannedData, actualData, currentWeek }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    drawChart();
  }, [plannedData, actualData, currentWeek]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Draw grid and axes
    drawGrid(ctx, padding, chartWidth, chartHeight);

    // Draw planned curve
    drawCurve(ctx, plannedData, padding, chartWidth, chartHeight, '#94a3b8', 'Planificado');

    // Draw actual curve
    drawCurve(ctx, actualData, padding, chartWidth, chartHeight, '#2563eb', 'Real');

    // Draw current week marker
    if (currentWeek !== undefined) {
      drawCurrentWeekMarker(ctx, currentWeek, plannedData.length, padding, chartWidth, chartHeight);
    }

    // Draw legend
    drawLegend(ctx, width, padding);
  };

  const drawGrid = (ctx, padding, chartWidth, chartHeight) => {
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
        ctx.fillText(`Sem ${i * (plannedData.length / 10)}`, x, padding.top + chartHeight + 20);
      }
    }

    // Horizontal grid lines (progress %)
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Percentage labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${100 - (i * 20)}%`, padding.left - 10, y + 4);
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
    ctx.fillText('Avance (%)', padding.left - 35, padding.top + chartHeight / 2);
    ctx.fillText('Semanas del Proyecto', padding.left + chartWidth / 2, padding.top + chartHeight + 45);
  };

  const drawCurve = (ctx, data, padding, chartWidth, chartHeight, color, label) => {
    if (!data || data.length === 0) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const y = padding.top + chartHeight - (chartHeight * point / 100);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      if (index % Math.floor(data.length / 10) === 0 || index === data.length - 1) {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        const y = padding.top + chartHeight - (chartHeight * point / 100);
        
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
    ctx.strokeStyle = '#2563eb';
    ctx.beginPath();
    ctx.moveTo(legendX, legendY + 20);
    ctx.lineTo(legendX + 30, legendY + 20);
    ctx.stroke();

    ctx.fillStyle = '#2563eb';
    ctx.fillText('Real', legendX + 40, legendY + 24);
  };

  return (
    <div className={styles.chartContainer}>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className={styles.canvas}
      />
    </div>
  );
};

export default SCurveChart;

