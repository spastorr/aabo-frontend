/**
 * CostProgressChart component
 * Displays cost progress chart for reports
 * @module features/projects/reports/components/CostProgressChart
 */

import { useEffect, useRef } from 'react';
import styles from './CostProgressChart.module.css';

const CostProgressChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Chart dimensions
    const margin = { top: 20, right: 40, bottom: 40, left: 60 };
    const width = canvas.width - margin.left - margin.right;
    const height = canvas.height - margin.top - margin.bottom;

    // Find max value for scaling
    const maxValue = Math.max(
      ...data.projected.map(d => d.value),
      ...data.actual.map(d => d.value)
    );

    // Scale functions
    const xScale = (index) => margin.left + (index / (data.projected.length - 1)) * width;
    const yScale = (value) => margin.top + height - (value / maxValue) * height;

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = margin.top + (i / 5) * height;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + width, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= data.projected.length - 1; i++) {
      const x = xScale(i);
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + height);
      ctx.stroke();
    }

    // Draw projected line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.projected.forEach((point, index) => {
      const x = xScale(index);
      const y = yScale(point.value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw actual line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.actual.forEach((point, index) => {
      const x = xScale(index);
      const y = yScale(point.value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#3b82f6';
    data.projected.forEach((point, index) => {
      const x = xScale(index);
      const y = yScale(point.value);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = '#ef4444';
    data.actual.forEach((point, index) => {
      const x = xScale(index);
      const y = yScale(point.value);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    data.projected.forEach((point, index) => {
      const x = xScale(index);
      ctx.fillText(point.month, x, margin.top + height + 20);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (i / 5) * maxValue;
      const y = margin.top + height - (i / 5) * height;
      ctx.fillText(`$${(value / 1000).toFixed(0)}K`, margin.left - 10, y + 4);
    }

    // Chart title
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Avance de Costos - Proyectado vs Real', canvas.width / 2, 20);

  }, [data]);

  if (!data) {
    return (
      <div className={styles.placeholder}>
        <p>No hay datos disponibles para mostrar el gráfico</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.blue}`}></div>
          <span>Proyectado Acumulado</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.red}`}></div>
          <span>Real Acumulado</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        className={styles.chart}
        width={800}
        height={400}
      />
    </div>
  );
};

export default CostProgressChart;
