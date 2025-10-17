/**
 * GanttChart component
 * Interactive Gantt chart for document timeline visualization
 * @module features/projects/gantt/components/GanttChart
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { DISCIPLINE_COLORS, DISCIPLINE_LABELS } from '../../../../../constants';
import { REVISION_STAGES, DOCUMENT_STATUS_DETAILED } from '../../../../../constants/documentLifecycle';
import { formatDate, formatDateForTimeline, addDays, addWeeks, addMonths, differenceInDays } from '../../../../../utils/dateFormatter';
import styles from './GanttChart.module.css';

const GanttChart = ({
  documents = [],
  revisions = [],
  viewMode = 'documents',
  zoomLevel = 'month',
  showRevisions = true,
  showMilestones = true,
  timeRange,
  onTimeRangeChange
}) => {
  const chartRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [panOffset, setPanOffset] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState(0);

  // Calculate time range based on documents and zoom level
  const calculatedTimeRange = useMemo(() => {
    if (timeRange) return timeRange;
    
    if (documents.length === 0) {
      const now = new Date();
      return {
        start: addMonths(now, -3),
        end: addMonths(now, 3)
      };
    }

    const allDates = documents.flatMap(doc => [
      doc.startDate,
      doc.endDate,
      doc.sendDate,
      doc.approvalDate,
      ...(doc.revisions || []).map(rev => rev.date)
    ]).filter(Boolean).map(date => new Date(date));

    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));

    // Add padding based on zoom level
    const padding = zoomLevel === 'week' ? 7 : zoomLevel === 'month' ? 30 : 90;
    
    return {
      start: addDays(minDate, -padding),
      end: addDays(maxDate, padding)
    };
  }, [documents, timeRange, zoomLevel]);

  // Calculate timeline metrics
  const timelineMetrics = useMemo(() => {
    const { start, end } = calculatedTimeRange;
    const totalDays = differenceInDays(end, start);
    const pixelsPerDay = 2; // Base pixels per day
    const headerHeight = 60;
    const rowHeight = 40;
    
    return {
      totalDays,
      pixelsPerDay,
      headerHeight,
      rowHeight,
      chartWidth: Math.max(800, totalDays * pixelsPerDay)
    };
  }, [calculatedTimeRange]);

  // Generate timeline headers
  const timelineHeaders = useMemo(() => {
    const { start, end } = calculatedTimeRange;
    const headers = [];
    let current = new Date(start);

    while (current <= end) {
      headers.push({
        date: new Date(current),
        label: formatDateForTimeline(current, zoomLevel === 'week' ? 'short' : 'medium'),
        isWeekend: current.getDay() === 0 || current.getDay() === 6
      });

      if (zoomLevel === 'week') {
        current = addDays(current, 1);
      } else if (zoomLevel === 'month') {
        current = addWeeks(current, 1);
      } else {
        current = addMonths(current, 1);
      }
    }

    return headers;
  }, [calculatedTimeRange, zoomLevel]);

  // Process documents for display
  const processedDocuments = useMemo(() => {
    return documents.map((doc, index) => {
      const disciplineColor = DISCIPLINE_COLORS[doc.discipline] || '#6b7280';
      const statusInfo = DOCUMENT_STATUS_DETAILED[doc.status] || DOCUMENT_STATUS_DETAILED.ELB;
      
      return {
        ...doc,
        id: `doc-${doc.id}`,
        index,
        color: disciplineColor,
        statusColor: statusInfo.color,
        displayName: doc.name || doc.code,
        disciplineLabel: DISCIPLINE_LABELS[doc.discipline] || doc.discipline,
        startX: getDatePosition(doc.startDate),
        endX: getDatePosition(doc.endDate || doc.startDate),
        width: getDatePosition(doc.endDate || doc.startDate) - getDatePosition(doc.startDate)
      };
    });
  }, [documents]);

  // Process revisions for display
  const processedRevisions = useMemo(() => {
    if (!showRevisions) return [];
    
    return revisions.map((rev, index) => ({
      ...rev,
      id: `rev-${rev.id}`,
      index,
      color: getRevisionColor(rev.type),
      displayName: `Rev. ${rev.revision}`,
      x: getDatePosition(rev.date),
      label: rev.revision
    }));
  }, [revisions, showRevisions]);

  // Get position for a date on the timeline
  const getDatePosition = (date) => {
    if (!date) return 0;
    const { start } = calculatedTimeRange;
    const daysDiff = differenceInDays(new Date(date), start);
    return daysDiff * timelineMetrics.pixelsPerDay;
  };

  // Get revision color based on type
  const getRevisionColor = (type) => {
    const colors = {
      'INTERNAL': '#6b7280',
      'FOR_REVIEW': '#3b82f6',
      'WITH_COMMENTS': '#f59e0b',
      'FOR_CONSTRUCTION': '#10b981',
      'AS_BUILT': '#8b5cf6',
      'RED_LINE': '#ef4444'
    };
    return colors[type] || '#6b7280';
  };

  // Handle panning
  const handleMouseDown = (e) => {
    setIsPanning(true);
    setPanStart(e.clientX - panOffset);
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanOffset(e.clientX - panStart);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isPanning]);

  // Render timeline header
  const renderTimelineHeader = () => (
    <div className={styles.timelineHeader}>
      <div className={styles.leftPanel}>
        <div className={styles.panelHeader}>
          {viewMode === 'documents' && 'Documento'}
          {viewMode === 'disciplines' && 'Disciplina'}
          {viewMode === 'revisions' && 'Revisión'}
        </div>
      </div>
      <div className={styles.timelineArea} style={{ width: timelineMetrics.chartWidth }}>
        <div className={styles.timelineGrid}>
          {timelineHeaders.map((header, index) => (
            <div
              key={index}
              className={`${styles.timelineColumn} ${header.isWeekend ? styles.weekend : ''}`}
              style={{ left: getDatePosition(header.date) }}
            >
              <div className={styles.timelineLabel}>
                {header.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render document rows
  const renderDocumentRows = () => {
    if (viewMode === 'disciplines') {
      const disciplines = [...new Set(documents.map(doc => doc.discipline))];
      return disciplines.map((discipline, index) => {
        const disciplineDocs = processedDocuments.filter(doc => doc.discipline === discipline);
        const color = DISCIPLINE_COLORS[discipline] || '#6b7280';
        
        return (
          <div key={discipline} className={styles.row}>
            <div className={styles.rowLabel}>
              <div className={styles.disciplineLabel} style={{ color }}>
                {DISCIPLINE_LABELS[discipline]}
              </div>
            </div>
            <div className={styles.rowContent}>
              {disciplineDocs.map(doc => renderDocumentBar(doc, index))}
            </div>
          </div>
        );
      });
    }

    return processedDocuments.map((doc, index) => (
      <div key={doc.id} className={styles.row}>
        <div className={styles.rowLabel}>
          <div className={styles.documentLabel}>
            <span className={styles.documentCode}>{doc.code}</span>
            <span className={styles.documentName}>{doc.displayName}</span>
          </div>
          <div className={styles.disciplineBadge} style={{ backgroundColor: doc.color }}>
            {doc.disciplineLabel}
          </div>
        </div>
        <div className={styles.rowContent}>
          {renderDocumentBar(doc, index)}
          {showRevisions && renderRevisionMarkers(doc)}
        </div>
      </div>
    ));
  };

  // Render document bar
  const renderDocumentBar = (doc, index) => {
    const isSelected = selectedItem?.id === doc.id;
    const isHovered = hoveredItem?.id === doc.id;
    
    return (
      <div
        key={doc.id}
        className={`${styles.documentBar} ${isSelected ? styles.selected : ''} ${isHovered ? styles.hovered : ''}`}
        style={{
          left: doc.startX,
          width: Math.max(doc.width, 20),
          backgroundColor: doc.color,
          top: index * 20
        }}
        onClick={() => setSelectedItem(doc)}
        onMouseEnter={() => setHoveredItem(doc)}
        onMouseLeave={() => setHoveredItem(null)}
        title={`${doc.displayName} (${doc.disciplineLabel})`}
      >
        <div className={styles.barContent}>
          <span className={styles.barLabel}>{doc.code}</span>
          <span className={styles.barStatus}>{doc.status}</span>
        </div>
      </div>
    );
  };

  // Render revision markers
  const renderRevisionMarkers = (doc) => {
    const docRevisions = processedRevisions.filter(rev => rev.documentId === doc.id);
    
    return docRevisions.map((rev, index) => (
      <div
        key={rev.id}
        className={styles.revisionMarker}
        style={{
          left: rev.x,
          backgroundColor: rev.color,
          top: 15 + index * 8
        }}
        title={`Rev. ${rev.revision} - ${formatDate(rev.date)}`}
      />
    ));
  };

  // Render milestones
  const renderMilestones = () => {
    if (!showMilestones) return null;
    
    const milestones = [
      { date: calculatedTimeRange.start, label: 'Inicio', color: '#10b981' },
      { date: calculatedTimeRange.end, label: 'Fin', color: '#ef4444' }
    ];

    return milestones.map((milestone, index) => (
      <div
        key={index}
        className={styles.milestone}
        style={{
          left: getDatePosition(milestone.date),
          backgroundColor: milestone.color
        }}
        title={`${milestone.label}: ${formatDate(milestone.date)}`}
      />
    ));
  };

  return (
    <div className={styles.ganttChart}>
      {renderTimelineHeader()}
      
      <div 
        className={styles.chartBody}
        ref={chartRef}
        onMouseDown={handleMouseDown}
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        <div 
          className={styles.chartContent}
          style={{ 
            transform: `translateX(${panOffset}px)`,
            width: timelineMetrics.chartWidth
          }}
        >
          {renderDocumentRows()}
          {renderMilestones()}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendSection}>
          <h4>Estados de Documento:</h4>
          {Object.entries(DOCUMENT_STATUS_DETAILED).slice(0, 4).map(([key, status]) => (
            <div key={key} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: status.color.bg }}
              />
              <span>{status.label}</span>
            </div>
          ))}
        </div>
        
        <div className={styles.legendSection}>
          <h4>Disciplinas:</h4>
          {Object.entries(DISCIPLINE_LABELS).slice(0, 4).map(([key, label]) => (
            <div key={key} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: DISCIPLINE_COLORS[key] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
