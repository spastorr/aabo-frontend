/**
 * GanttControls component
 * Time range controls and navigation for the Gantt chart
 * @module features/projects/gantt/components/GanttControls
 */

import { useState } from 'react';
import Button from '../../../../../components/shared/Button';
import { formatDate, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from '../../../../../utils/dateFormatter';
import styles from './GanttControls.module.css';

const GanttControls = ({
  timeRange,
  onTimeRangeChange,
  zoomLevel,
  onZoomChange,
  onDownload
}) => {
  const [isNavigating, setIsNavigating] = useState(false);

  // Navigation handlers
  const handlePrevious = () => {
    setIsNavigating(true);
    const { start, end } = timeRange;
    const duration = end - start;
    
    let newStart, newEnd;
    if (zoomLevel === 'week') {
      newStart = subWeeks(start, 1);
      newEnd = subWeeks(end, 1);
    } else if (zoomLevel === 'month') {
      newStart = subMonths(start, 1);
      newEnd = subMonths(end, 1);
    } else {
      newStart = subMonths(start, 3);
      newEnd = subMonths(end, 3);
    }
    
    onTimeRangeChange({ start: newStart, end: newEnd });
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleNext = () => {
    setIsNavigating(true);
    const { start, end } = timeRange;
    
    let newStart, newEnd;
    if (zoomLevel === 'week') {
      newStart = addWeeks(start, 1);
      newEnd = addWeeks(end, 1);
    } else if (zoomLevel === 'month') {
      newStart = addMonths(start, 1);
      newEnd = addMonths(end, 1);
    } else {
      newStart = addMonths(start, 3);
      newEnd = addMonths(end, 3);
    }
    
    onTimeRangeChange({ start: newStart, end: newEnd });
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleToday = () => {
    setIsNavigating(true);
    const now = new Date();
    const { start, end } = timeRange;
    const duration = end - start;
    
    let newStart, newEnd;
    if (zoomLevel === 'week') {
      newStart = subWeeks(now, 2);
      newEnd = addWeeks(now, 2);
    } else if (zoomLevel === 'month') {
      newStart = subMonths(now, 2);
      newEnd = addMonths(now, 2);
    } else {
      newStart = subMonths(now, 6);
      newEnd = addMonths(now, 6);
    }
    
    onTimeRangeChange({ start: newStart, end: newEnd });
    setTimeout(() => setIsNavigating(false), 300);
  };

  const handleZoomIn = () => {
    const zoomLevels = ['quarter', 'month', 'week'];
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const zoomLevels = ['quarter', 'month', 'week'];
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  const handleFitToData = () => {
    // This would be handled by the parent component
    // For now, just reset to a reasonable range
    handleToday();
  };

  return (
    <div className={styles.controls}>
      <div className={styles.navigation}>
        <Button
          variant="outline"
          size="small"
          onClick={handlePrevious}
          disabled={isNavigating}
          title="Período anterior"
        >
          ←
        </Button>
        
        <Button
          variant="outline"
          size="small"
          onClick={handleToday}
          disabled={isNavigating}
          title="Centrar en hoy"
        >
          Hoy
        </Button>
        
        <Button
          variant="outline"
          size="small"
          onClick={handleNext}
          disabled={isNavigating}
          title="Siguiente período"
        >
          →
        </Button>
      </div>

      <div className={styles.zoom}>
        <Button
          variant="outline"
          size="small"
          onClick={handleZoomOut}
          disabled={zoomLevel === 'quarter'}
          title="Alejar"
        >
          🔍−
        </Button>
        
        <span className={styles.zoomLabel}>
          {zoomLevel === 'week' && 'Semana'}
          {zoomLevel === 'month' && 'Mes'}
          {zoomLevel === 'quarter' && 'Trimestre'}
        </span>
        
        <Button
          variant="outline"
          size="small"
          onClick={handleZoomIn}
          disabled={zoomLevel === 'week'}
          title="Acercar"
        >
          🔍+
        </Button>
      </div>

      <div className={styles.range}>
        <span className={styles.rangeLabel}>
          {formatDate(timeRange.start, 'short')} - {formatDate(timeRange.end, 'short')}
        </span>
      </div>

      <div className={styles.actions}>
        <Button
          variant="outline"
          size="small"
          onClick={handleFitToData}
          title="Ajustar a datos"
        >
          📊 Ajustar
        </Button>
        
        <Button
          variant="primary"
          size="small"
          onClick={onDownload}
          title="Descargar cronograma"
        >
          📥 Descargar
        </Button>
      </div>
    </div>
  );
};

export default GanttControls;
