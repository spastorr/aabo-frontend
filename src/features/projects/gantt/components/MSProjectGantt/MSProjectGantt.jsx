/**
 * MSProjectGantt - Cronograma similar a MS Project con listado maestro y Gantt
 * @module features/projects/gantt/components/MSProjectGantt
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { DISCIPLINE_COLORS, DISCIPLINE_LABELS } from '../../../../../constants';
import { DOCUMENT_STATUS_DETAILED, REVISION_STAGES } from '../../../../../constants/documentLifecycle';
import { formatDate, addDays, differenceInDays } from '../../../../../utils/dateFormatter';
import styles from './MSProjectGantt.module.css';

const MSProjectGantt = ({ 
  documents = [], 
  revisions = [],
  milestones = [],
  dependencies = [],
  onDocumentSelect,
  selectedDocumentId 
}) => {
  const CELL_WIDTH = 100; // ancho de celda del timeline en px (aumentado para mejor visibilidad)
  const ROW_HEIGHT = 60; // alto de fila gantt en px (aumentado significativamente para mejor espaciado)
  const [scrollPosition, setScrollPosition] = useState({ left: 0, top: 0 });
  const [timeScale, setTimeScale] = useState('day'); // day, week, month
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // Porcentaje de zoom
  const [listWidth, setListWidth] = useState(50); // Porcentaje de ancho para la lista
  const [isResizing, setIsResizing] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [responsibleFilter, setResponsibleFilter] = useState('ALL');
  const [workCalendar, setWorkCalendar] = useState('WEEKDAYS'); // WEEKDAYS | ALL_DAYS
  const [hoveredDocumentId, setHoveredDocumentId] = useState(null);
  const [showCritical, setShowCritical] = useState(false);
  const [expandedDisciplines, setExpandedDisciplines] = useState(new Set());
  
  // Estados para drag & drop
  const [draggedDocument, setDraggedDocument] = useState(null);
  const [dragType, setDragType] = useState(null); // 'move', 'resize-left', 'resize-right', 'dependency'
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [dragCurrentPosition, setDragCurrentPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dependencyDrag, setDependencyDrag] = useState({ from: null, to: null });
  
  // Estados para edición en línea
  const [editingCell, setEditingCell] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  
  // Estados para columnas redimensionables
  const [columnWidths, setColumnWidths] = useState({
    document: 50,
    status: 25,
    start: 12.5,
    end: 12.5
  });
  const [resizingColumn, setResizingColumn] = useState(null);
  
  const listRef = useRef(null);
  const ganttRef = useRef(null);
  const timelineRef = useRef(null);

  // Funciones de utilidad
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(0, differenceInDays(end, start));
  };

  // Función para ajustar brillo de colores (inspirada en Google Charts)
  const adjustColorBrightness = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const calculateProgress = (status) => {
    const statusProgress = {
      'ELB': 25,
      'REV': 50,
      'CMN': 60,
      'ACC': 75,
      'APR': 90,
      'IFC': 100,
      'RCH': 0
    };
    return statusProgress[status] || 0;
  };

  // Calcular transiciones de estado basadas en revisiones
  const calculateStatusTransitions = (doc, allRevisions) => {
    const docRevisions = allRevisions
      .filter(rev => rev.documentId === doc.id)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const transitions = [];
    let currentStatus = 'ELB';
    let currentDate = new Date(doc.startDate || doc.createdDate);

    // Estado inicial: En elaboración
    transitions.push({
      status: 'ELB',
      statusInfo: DOCUMENT_STATUS_DETAILED.ELB,
      startDate: currentDate,
      endDate: null,
      revision: null,
      isActive: doc.status === 'ELB'
    });

    // Procesar cada revisión y sus cambios de estado
    docRevisions.forEach((rev, index) => {
      const revDate = new Date(rev.date);
      
      // Cerrar estado anterior
      if (transitions.length > 0) {
        transitions[transitions.length - 1].endDate = revDate;
      }

      // Determinar nuevo estado basado en el tipo de revisión
      let newStatus = currentStatus;
      if (rev.type === 'FOR_REVIEW') {
        newStatus = 'REV';
      } else if (rev.type === 'WITH_COMMENTS') {
        newStatus = 'CMN';
      } else if (rev.type === 'FOR_CONSTRUCTION') {
        newStatus = 'IFC';
      }

      // Agregar nueva transición
      transitions.push({
        status: newStatus,
        statusInfo: DOCUMENT_STATUS_DETAILED[newStatus],
        startDate: revDate,
        endDate: null,
        revision: rev.revision,
        isActive: doc.status === newStatus
      });

      currentStatus = newStatus;
    });

    // Cerrar último estado si no tiene fecha de fin
    if (transitions.length > 0 && !transitions[transitions.length - 1].endDate) {
      transitions[transitions.length - 1].endDate = new Date(doc.endDate || doc.dueDate || new Date());
    }

    return transitions;
  };

  // Procesar documentos con información de estados y fechas
  const processedDocuments = useMemo(() => {
    return documents.map(doc => {
      const statusInfo = DOCUMENT_STATUS_DETAILED[doc.status] || DOCUMENT_STATUS_DETAILED.ELB;
      const disciplineColor = DISCIPLINE_COLORS[doc.discipline] || '#64748b';
      
      // Calcular fechas de transición de estados
      const statusTransitions = calculateStatusTransitions(doc, revisions);
      
      return {
        ...doc,
        statusInfo,
        disciplineColor,
        statusTransitions,
        // Asegurar que tenemos fechas válidas
        startDate: doc.startDate || doc.createdDate || new Date().toISOString(),
        endDate: doc.endDate || doc.dueDate || doc.startDate || doc.createdDate || new Date().toISOString(),
        duration: calculateDuration(doc.startDate || doc.createdDate, doc.endDate || doc.dueDate),
        progress: calculateProgress(doc.status),
      };
    });
  }, [documents, revisions]);

  // Opciones de filtros
  const disciplineOptions = useMemo(() => {
    const set = new Set(documents.map(d => d.discipline).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [documents]);

  const statusOptions = useMemo(() => {
    const set = new Set(documents.map(d => d.status).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [documents]);

  const responsibleOptions = useMemo(() => {
    const set = new Set(documents.map(d => d.responsible).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [documents]);

  // Filtrar documentos
  const filteredDocuments = useMemo(() => {
    return processedDocuments.filter(doc => {
      const matchesText = textQuery
        ? `${doc.code} ${doc.name}`.toLowerCase().includes(textQuery.toLowerCase())
        : true;
      const matchesDiscipline = disciplineFilter === 'ALL' || doc.discipline === disciplineFilter;
      const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;
      const matchesResponsible = responsibleFilter === 'ALL' || doc.responsible === responsibleFilter;
      return matchesText && matchesDiscipline && matchesStatus && matchesResponsible;
    });
  }, [processedDocuments, textQuery, disciplineFilter, statusFilter, responsibleFilter]);

  // Agrupar documentos por disciplina
  const documentsByDiscipline = useMemo(() => {
    const groups = {};
    filteredDocuments.forEach(doc => {
      if (!groups[doc.discipline]) {
        groups[doc.discipline] = [];
      }
      groups[doc.discipline].push(doc);
    });
    return groups;
  }, [filteredDocuments]);

  // Calcular altura dinámica para cada disciplina
  const calculateDisciplineHeight = (discipline, docs) => {
    const isExpanded = expandedDisciplines.has(discipline);
    const headerHeight = 60; // Altura del header de disciplina
    
    if (isExpanded) {
      return headerHeight + (docs.length * 60); // Header + documentos individuales
    } else {
      return headerHeight; // Solo el header cuando está colapsado
    }
  };

  // Calcular posición vertical de cada elemento
  const calculateVerticalPosition = (targetDiscipline, targetDocId = null) => {
    let currentY = 0;
    
    for (const [discipline, docs] of Object.entries(documentsByDiscipline)) {
      const isExpanded = expandedDisciplines.has(discipline);
      const headerHeight = 60;
      
      if (discipline === targetDiscipline) {
        if (targetDocId && isExpanded) {
          // Buscar la posición del documento específico
          const docIndex = docs.findIndex(doc => doc.id === targetDocId);
          if (docIndex !== -1) {
            return currentY + headerHeight + (docIndex * 60);
          }
        }
        // Retornar posición del header de la disciplina
        return currentY;
      }
      
      // Agregar altura de esta disciplina
      currentY += calculateDisciplineHeight(discipline, docs);
    }
    
    return currentY;
  };

  // Calcular altura total del timeline
  const totalTimelineHeight = useMemo(() => {
    return Object.entries(documentsByDiscipline).reduce((total, [discipline, docs]) => {
      return total + calculateDisciplineHeight(discipline, docs);
    }, 0);
  }, [documentsByDiscipline, expandedDisciplines]);

  // Calcular estadísticas por disciplina
  const disciplineStats = useMemo(() => {
    const stats = {};
    Object.entries(documentsByDiscipline).forEach(([discipline, docs]) => {
      const totalDocs = docs.length;
      const completedDocs = docs.filter(doc => doc.status === 'IFC').length;
      const avgProgress = docs.reduce((sum, doc) => sum + doc.progress, 0) / totalDocs;
      
      // Calcular fechas de inicio y fin de la disciplina
      const startDates = docs.map(doc => new Date(doc.startDate));
      const endDates = docs.map(doc => new Date(doc.endDate));
      const disciplineStart = new Date(Math.min(...startDates));
      const disciplineEnd = new Date(Math.max(...endDates));
      
      stats[discipline] = {
        totalDocs,
        completedDocs,
        avgProgress: Math.round(avgProgress),
        startDate: disciplineStart,
        endDate: disciplineEnd,
        color: DISCIPLINE_COLORS[discipline] || '#64748b'
      };
    });
    return stats;
  }, [documentsByDiscipline]);

  // Generar fechas para la línea de tiempo
  const timelineDates = useMemo(() => {
    if (filteredDocuments.length === 0) {
      // Si no hay documentos, mostrar fechas alrededor de la fecha actual
      const today = new Date();
      const startDate = addDays(today, -30);
      const endDate = addDays(today, 30);
      
      const dates = [];
      const current = new Date(startDate);
      
      while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      
      return dates;
    }

    // Obtener todas las fechas relevantes de los documentos filtrados
    const allDates = filteredDocuments.flatMap(doc => [
      doc.startDate,
      doc.endDate,
      ...doc.statusTransitions.map(t => t.startDate),
      ...doc.statusTransitions.map(t => t.endDate).filter(Boolean)
    ])
    .concat(milestones.map(m => m.date))
    .filter(Boolean)
    .map(date => new Date(date));

    if (allDates.length === 0) {
      const today = new Date();
      const startDate = addDays(today, -30);
      const endDate = addDays(today, 30);
      
      const dates = [];
      const current = new Date(startDate);
      
      while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      
      return dates;
    }

    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));

    // Agregar margen más generoso
    const startDate = addDays(minDate, -14);
    const endDate = addDays(maxDate, 14);

    const dates = [];
    const current = new Date(startDate);
    
    // Calcular intervalo basado en zoom y escala de tiempo
    const zoomFactor = zoomLevel / 100;
    let baseInterval;
    
    if (timeScale === 'day') {
      baseInterval = 1;
    } else if (timeScale === 'week') {
      baseInterval = 7;
    } else {
      baseInterval = 30;
    }
    
    // Asegurar que el intervalo no sea demasiado grande para perder fechas importantes
    const interval = Math.max(1, Math.min(Math.round(baseInterval / zoomFactor), 7));
    
    // Crear un conjunto de fechas importantes para verificación rápida
    const importantDates = new Set(
      allDates.map(date => {
        const d = new Date(date);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );
    
    // También incluir fechas intermedias importantes para asegurar continuidad
    const allImportantDates = new Set();
    filteredDocuments.forEach(doc => {
      const start = new Date(doc.startDate);
      const end = new Date(doc.endDate);
      const current = new Date(start);
      
      while (current <= end) {
        const dateKey = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
        allImportantDates.add(dateKey);
        current.setDate(current.getDate() + 1);
      }
    });
    
    while (current <= endDate) {
      const d = new Date(current);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      
      // Verificar si es una fecha importante
      const dateKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const isImportantDate = importantDates.has(dateKey) || allImportantDates.has(dateKey);
      
      // Incluir fecha si:
      // 1. Calendario de todos los días está activo, O
      // 2. No es fin de semana, O  
      // 3. Es una fecha importante (incluso si es fin de semana)
      if (workCalendar === 'ALL_DAYS' || !isWeekend || isImportantDate) {
        dates.push(new Date(d));
      }
      
      current.setDate(current.getDate() + interval);
    }

    return dates;
  }, [filteredDocuments, timeScale, zoomLevel, workCalendar, milestones]);

  // Obtener fecha actual para la línea de tiempo
  const currentDate = new Date();

  // Cálculo de ruta crítica (FS simplificado): longest path en DAG
  const criticalInfo = useMemo(() => {
    if (!timelineDates || timelineDates.length === 0) {
      return { criticalTaskIds: new Set(), criticalEdges: new Set() };
    }
    if (!Array.isArray(dependencies) || dependencies.length === 0 || filteredDocuments.length === 0) {
      return { criticalTaskIds: new Set(), criticalEdges: new Set() };
    }

    const docById = new Map(filteredDocuments.map(d => [d.id, d]));
    const adj = new Map();
    const indeg = new Map();
    filteredDocuments.forEach(d => { adj.set(d.id, []); indeg.set(d.id, 0); });
    dependencies.forEach(dep => {
      if (dep.type !== 'FS') return;
      if (!docById.has(dep.fromId) || !docById.has(dep.toId)) return;
      adj.get(dep.fromId).push(dep);
      indeg.set(dep.toId, (indeg.get(dep.toId) || 0) + 1);
    });

    const topOrder = [];
    const queue = [];
    indeg.forEach((v, k) => { if (v === 0) queue.push(k); });
    while (queue.length) {
      const u = queue.shift();
      topOrder.push(u);
      (adj.get(u) || []).forEach(dep => {
        const v = dep.toId;
        indeg.set(v, indeg.get(v) - 1);
        if (indeg.get(v) === 0) queue.push(v);
      });
    }

    const startIndexOf = (d) => timelineDates.findIndex(date => date >= new Date(d.startDate));
    const endIndexOf = (d) => timelineDates.findIndex(date => date >= new Date(d.endDate));
    const durationOf = (d) => {
      const s = startIndexOf(d);
      const e = endIndexOf(d);
      if (s < 0 || e < 0) return 0;
      return Math.max(0, e - s);
    };

    const dist = new Map();
    const prev = new Map();
    filteredDocuments.forEach(d => { dist.set(d.id, durationOf(d)); prev.set(d.id, null); });

    topOrder.forEach(u => {
      const uDoc = docById.get(u);
      (adj.get(u) || []).forEach(dep => {
        const v = dep.toId;
        const vDoc = docById.get(v);
        const candidate = dist.get(u) + Math.max(0, startIndexOf(vDoc) - endIndexOf(uDoc)) + durationOf(vDoc);
        if (candidate > (dist.get(v) || 0)) {
          dist.set(v, candidate);
          prev.set(v, u);
        }
      });
    });

    let endNode = null, best = -1;
    dist.forEach((val, key) => { if (val > best) { best = val; endNode = key; } });
    const criticalTaskIds = new Set();
    const criticalEdges = new Set();
    while (endNode) {
      criticalTaskIds.add(endNode);
      const p = prev.get(endNode);
      if (p) {
        criticalEdges.add(`${p}->${endNode}`);
      }
      endNode = p;
    }

    return { criticalTaskIds, criticalEdges };
  }, [dependencies, filteredDocuments, timelineDates]);

  // Manejar scroll sincronizado
  const handleScroll = (source) => (e) => {
    const { scrollLeft, scrollTop } = e.target;
    
    if (source === 'list' && listRef.current) {
      ganttRef.current.scrollTop = scrollTop;
    } else if (source === 'gantt' && ganttRef.current) {
      listRef.current.scrollTop = scrollTop;
      // Sincronizar scroll horizontal con timeline
      const timelineContainer = timelineRef.current?.querySelector(`.${styles.timelineCellsContainer}`);
      if (timelineContainer) {
        timelineContainer.scrollLeft = scrollLeft;
      }
    }
  };

  // Desplazar vista al documento seleccionado (horizontal y vertical)
  const scrollToDocument = (docId) => {
    const docIndex = filteredDocuments.findIndex(d => d.id === docId);
    if (docIndex === -1) return;

    const doc = filteredDocuments[docIndex];
    const startDate = new Date(doc.startDate);

    // Scroll vertical a la fila correspondiente en ambos paneles
    const targetTop = Math.max(0, docIndex * ROW_HEIGHT);
    if (listRef.current) {
      listRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
    if (ganttRef.current) {
      ganttRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }

    // Scroll horizontal usando cálculo preciso
    if (timelineDates.length > 0) {
      const timelineStart = timelineDates[0];
      const timelineEnd = timelineDates[timelineDates.length - 1];
      const totalTimelineDuration = timelineEnd - timelineStart;
      
      const startPosition = ((startDate - timelineStart) / totalTimelineDuration) * 100;
      const containerWidth = timelineDates.length * CELL_WIDTH;
      const targetLeft = Math.max(0, (startPosition / 100) * containerWidth - 200); // margen previo para contexto
      
      if (ganttRef.current) {
        ganttRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
      const timelineContainer = timelineRef.current?.querySelector(`.${styles.timelineCellsContainer}`);
      if (timelineContainer) {
        timelineContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  };

  const handleDocumentClick = (docId) => {
    onDocumentSelect?.(docId);
    scrollToDocument(docId);
  };

  // Funciones para manejar el acordeón por disciplina
  const toggleDiscipline = (discipline) => {
    setExpandedDisciplines(prev => {
      const newSet = new Set(prev);
      if (newSet.has(discipline)) {
        newSet.delete(discipline);
      } else {
        newSet.add(discipline);
      }
      return newSet;
    });
  };

  const expandAllDisciplines = () => {
    const allDisciplines = new Set(filteredDocuments.map(doc => doc.discipline));
    setExpandedDisciplines(allDisciplines);
  };

  const collapseAllDisciplines = () => {
    setExpandedDisciplines(new Set());
  };

  // Funciones para drag & drop
  const handleBarMouseDown = (e, docId, type = 'move') => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDraggedDocument(docId);
    setDragType(type);
    setDragStartPosition({ x: e.clientX, y: e.clientY });
    setDragCurrentPosition({ x: e.clientX, y: e.clientY });
    
    document.body.style.cursor = type === 'move' ? 'grabbing' : 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  const handleDragMouseMove = (e) => {
    if (!isDragging || !draggedDocument) return;
    
    setDragCurrentPosition({ x: e.clientX, y: e.clientY });
    
    if (dragType === 'dependency') {
      // Lógica para crear dependencias
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const targetBar = element?.closest(`[data-document-id]`);
      if (targetBar) {
        const targetDocId = targetBar.getAttribute('data-document-id');
        setDependencyDrag(prev => ({ ...prev, to: targetDocId }));
      }
    }
  };

  const handleDragMouseUp = (e) => {
    if (!isDragging || !draggedDocument) return;
    
    const deltaX = dragCurrentPosition.x - dragStartPosition.x;
    const deltaY = dragCurrentPosition.y - dragStartPosition.y;
    
    if (dragType === 'move' && Math.abs(deltaX) > 5) {
      // Mover documento
      const doc = filteredDocuments.find(d => d.id === draggedDocument);
      if (doc) {
        const timelineStart = timelineDates[0];
        const timelineEnd = timelineDates[timelineDates.length - 1];
        const totalTimelineDuration = timelineEnd - timelineStart;
        const containerWidth = timelineDates.length * CELL_WIDTH;
        
        const currentPosition = ((new Date(doc.startDate) - timelineStart) / totalTimelineDuration) * containerWidth;
        const newPosition = currentPosition + deltaX;
        const newDate = new Date(timelineStart.getTime() + (newPosition / containerWidth) * totalTimelineDuration);
        
        // Actualizar fechas del documento
        const duration = new Date(doc.endDate) - new Date(doc.startDate);
        const newEndDate = new Date(newDate.getTime() + duration);
        
        // Aquí deberías actualizar el documento en tu estado/API
        console.log('Moving document:', {
          id: doc.id,
          newStartDate: newDate.toISOString().split('T')[0],
          newEndDate: newEndDate.toISOString().split('T')[0]
        });
      }
    } else if (dragType.startsWith('resize-') && Math.abs(deltaX) > 5) {
      // Redimensionar documento
      const doc = filteredDocuments.find(d => d.id === draggedDocument);
      if (doc) {
        const timelineStart = timelineDates[0];
        const timelineEnd = timelineDates[timelineDates.length - 1];
        const totalTimelineDuration = timelineEnd - timelineStart;
        const containerWidth = timelineDates.length * CELL_WIDTH;
        
        const currentStartPosition = ((new Date(doc.startDate) - timelineStart) / totalTimelineDuration) * containerWidth;
        const currentEndPosition = ((new Date(doc.endDate) - timelineStart) / totalTimelineDuration) * containerWidth;
        
        let newStartDate = new Date(doc.startDate);
        let newEndDate = new Date(doc.endDate);
        
        if (dragType === 'resize-left') {
          const newStartPosition = currentStartPosition + deltaX;
          newStartDate = new Date(timelineStart.getTime() + (newStartPosition / containerWidth) * totalTimelineDuration);
        } else if (dragType === 'resize-right') {
          const newEndPosition = currentEndPosition + deltaX;
          newEndDate = new Date(timelineStart.getTime() + (newEndPosition / containerWidth) * totalTimelineDuration);
        }
        
        // Aquí deberías actualizar el documento en tu estado/API
        console.log('Resizing document:', {
          id: doc.id,
          newStartDate: newStartDate.toISOString().split('T')[0],
          newEndDate: newEndDate.toISOString().split('T')[0]
        });
      }
    } else if (dragType === 'dependency' && dependencyDrag.to) {
      // Crear dependencia
      console.log('Creating dependency:', {
        from: dependencyDrag.from,
        to: dependencyDrag.to
      });
    }
    
    // Reset drag state
    setIsDragging(false);
    setDraggedDocument(null);
    setDragType(null);
    setDependencyDrag({ from: null, to: null });
    
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  // Funciones para edición en línea
  const handleCellDoubleClick = (docId, field, currentValue) => {
    setEditingCell({ docId, field });
    setEditingValue(currentValue || '');
  };

  const handleCellEdit = (value) => {
    setEditingValue(value);
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    
    const { docId, field } = editingCell;
    console.log('Saving cell:', { docId, field, value: editingValue });
    
    // Aquí deberías actualizar el documento en tu estado/API
    setEditingCell(null);
    setEditingValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditingValue('');
  };

  // Funciones para redimensionamiento de columnas
  const handleColumnResize = (columnName, deltaX) => {
    setColumnWidths(prev => {
      const newWidths = { ...prev };
      const currentWidth = newWidths[columnName];
      const newWidth = Math.max(10, Math.min(50, currentWidth + deltaX));
      newWidths[columnName] = newWidth;
      return newWidths;
    });
  };

  const handleColumnMouseDown = (e, columnName) => {
    e.preventDefault();
    setResizingColumn(columnName);
    
    const startX = e.clientX;
    const startWidth = columnWidths[columnName];
    
    const handleMouseMove = (e) => {
      const deltaX = (e.clientX - startX) / 10; // Escalar para hacer el redimensionamiento más suave
      handleColumnResize(columnName, deltaX);
    };
    
    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Manejar pantalla completa
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Manejar zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 400));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 25));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const handleWidthReset = () => {
    setListWidth(50);
  };

  // Manejar redimensionamiento
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    const container = document.querySelector(`.${styles.mainLayout}`);
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newListWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Limitar el ancho entre 20% y 80%
    const clampedWidth = Math.max(20, Math.min(80, newListWidth));
    setListWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Agregar event listeners para el redimensionamiento
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing]);

  // Agregar event listeners para drag & drop
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMouseMove);
      document.addEventListener('mouseup', handleDragMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMouseMove);
      document.removeEventListener('mouseup', handleDragMouseUp);
    };
  }, [isDragging, draggedDocument, dragType]);

  // Sincronizar scroll del timeline con gantt content
  useEffect(() => {
    const timelineContainer = timelineRef.current?.querySelector(`.${styles.timelineCellsContainer}`);
    const ganttContainer = ganttRef.current;

    const handleTimelineScroll = (e) => {
      if (ganttContainer) {
        ganttContainer.scrollLeft = e.target.scrollLeft;
      }
    };

    if (timelineContainer) {
      timelineContainer.addEventListener('scroll', handleTimelineScroll);
    }

    return () => {
      if (timelineContainer) {
        timelineContainer.removeEventListener('scroll', handleTimelineScroll);
      }
    };
  }, []);

  // Manejar tecla ESC para salir de pantalla completa
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Calcular posición de la línea de fecha actual
  const getCurrentDatePosition = () => {
    if (timelineDates.length === 0) return null;
    
    const timelineStart = timelineDates[0];
    const timelineEnd = timelineDates[timelineDates.length - 1];
    
    // Extender el rango para incluir la fecha actual si está cerca
    const extendedStart = addDays(timelineStart, -1);
    const extendedEnd = addDays(timelineEnd, 1);
    
    if (currentDate < extendedStart || currentDate > extendedEnd) return null;
    
    // Calcular la posición exacta de la fecha actual
    const totalDuration = timelineEnd - timelineStart;
    const currentPosition = currentDate - timelineStart;
    const percentage = (currentPosition / totalDuration) * 100;
    
    return Math.max(0, Math.min(100, percentage));
  };

  // Función para formatear fechas según la escala de tiempo
  const formatTimelineDate = (date) => {
    if (timeScale === 'day') {
      return `${date.getDate()}/${date.getMonth() + 1}`;
    } else if (timeScale === 'week') {
      const weekNumber = Math.ceil(date.getDate() / 7);
      return `Sem ${weekNumber}`;
    } else {
      return `${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  };

  // Renderizar barra global de disciplina
  const renderDisciplineBar = (discipline, stats) => {
    const startDate = stats.startDate;
    const endDate = stats.endDate;
    const totalDays = timelineDates.length;
    
    if (totalDays === 0) return null;

    const timelineStart = timelineDates[0];
    const timelineEnd = timelineDates[timelineDates.length - 1];
    const totalTimelineDuration = timelineEnd - timelineStart;
    
    const startPosition = ((startDate - timelineStart) / totalTimelineDuration) * 100;
    const endPosition = ((endDate - timelineStart) / totalTimelineDuration) * 100;
    const width = Math.max(1, endPosition - startPosition);

    const clampedStartPosition = Math.max(0, Math.min(100, startPosition));
    const clampedEndPosition = Math.max(0, Math.min(100, endPosition));
    const clampedWidth = Math.max(1, clampedEndPosition - clampedStartPosition);

    const verticalPosition = calculateVerticalPosition(discipline);

    return (
      <div 
        className={styles.disciplineBarContainer}
        style={{
          position: 'absolute',
          top: `${verticalPosition}px`,
          left: 0,
          right: 0,
          height: '60px'
        }}
      >
        <div 
          className={styles.disciplineBar}
          style={{
            left: `${clampedStartPosition}%`,
            width: `${clampedWidth}%`,
            backgroundColor: stats.color,
            opacity: 0.7
          }}
          title={`${DISCIPLINE_LABELS[discipline] || discipline}\n${stats.totalDocs} documentos\nProgreso promedio: ${stats.avgProgress}%`}
        >
          <div className={styles.disciplineBarLabel}>
            <div className={styles.disciplineBarName}>
              {DISCIPLINE_LABELS[discipline] || discipline}
            </div>
            <div className={styles.disciplineBarProgress}>
              {stats.avgProgress}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar barra de Gantt para un documento
  const renderGanttBar = (doc) => {
    const startDate = new Date(doc.startDate);
    const endDate = new Date(doc.endDate);
    const totalDays = timelineDates.length;
    
    if (totalDays === 0) return null;

    // Calcular posición más precisa basada en fechas reales
    const timelineStart = timelineDates[0];
    const timelineEnd = timelineDates[timelineDates.length - 1];
    const totalTimelineDuration = timelineEnd - timelineStart;
    
    // Calcular posición exacta basada en fechas reales
    const startPosition = ((startDate - timelineStart) / totalTimelineDuration) * 100;
    const endPosition = ((endDate - timelineStart) / totalTimelineDuration) * 100;
    const width = Math.max(1, endPosition - startPosition); // Mínimo 1% de ancho

    // Asegurar que las posiciones estén dentro del rango visible
    const clampedStartPosition = Math.max(0, Math.min(100, startPosition));
    const clampedEndPosition = Math.max(0, Math.min(100, endPosition));
    const clampedWidth = Math.max(1, clampedEndPosition - clampedStartPosition);

    const isCritical = showCritical && criticalInfo.criticalTaskIds.has(doc.id);
    // Revisions for this document
    const docRevisions = Array.isArray(revisions)
      ? revisions.filter(r => r.documentId === doc.id).sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];

    const verticalPosition = calculateVerticalPosition(doc.discipline, doc.id);

    return (
      <div 
        className={styles.ganttBarContainer} 
        data-document-id={doc.id}
        style={{
          position: 'absolute',
          top: `${verticalPosition}px`,
          left: 0,
          right: 0,
          height: '60px'
        }}
      >
        <div 
          className={`${styles.ganttBar} ${isCritical ? styles.criticalBar : ''} ${isDragging && draggedDocument === doc.id ? styles.dragging : ''} ${hoveredDocumentId === doc.id ? styles.hovered : ''}`}
          style={{
            left: `${clampedStartPosition}%`,
            width: `${clampedWidth}%`,
            backgroundColor: doc.statusInfo.color.bg,
            opacity: doc.status === 'IFC' ? 1 : 0.8,
            '--status-color': doc.statusInfo.color.bg,
            '--status-color-dark': adjustColorBrightness(doc.statusInfo.color.bg, -20)
          }}
          title={`📄 ${doc.code}\n📋 ${doc.name}\n🏷️ Estado: ${doc.statusInfo.label}\n👤 Responsable: ${doc.responsible || 'No asignado'}\n📅 Inicio: ${formatDate(doc.startDate)}\n📅 Fin: ${formatDate(doc.endDate)}\n📊 Progreso: ${doc.progress}%`}
          onMouseDown={(e) => handleBarMouseDown(e, doc.id, 'move')}
          onMouseEnter={() => setHoveredDocumentId(doc.id)}
          onMouseLeave={() => setHoveredDocumentId(null)}
        >
          {/* Manijas de redimensionamiento */}
          <div 
            className={`${styles.resizeHandle} ${styles.left}`}
            onMouseDown={(e) => handleBarMouseDown(e, doc.id, 'resize-left')}
          />
          <div 
            className={`${styles.resizeHandle} ${styles.right}`}
            onMouseDown={(e) => handleBarMouseDown(e, doc.id, 'resize-right')}
          />
          
          {/* Círculos de dependencias */}
          <div 
            className={`${styles.dependencyCircle} ${styles.left}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              setDependencyDrag({ from: doc.id, to: null });
              handleBarMouseDown(e, doc.id, 'dependency');
            }}
          />
          <div 
            className={`${styles.dependencyCircle} ${styles.right}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              setDependencyDrag({ from: doc.id, to: null });
              handleBarMouseDown(e, doc.id, 'dependency');
            }}
          />
          
          <div className={styles.ganttBarProgress}>
            <div 
              className={styles.ganttBarFill}
              style={{
                width: `${doc.progress}%`,
                backgroundColor: doc.statusInfo.color.bg
              }}
            />
          </div>
          <div className={styles.ganttBarLabel}>
            <div className={styles.ganttBarCode}>{doc.code.split('-').pop()}</div>
          </div>
          <div className={styles.ganttBarProgressLabel}>
            {doc.progress}%
          </div>
        </div>
        
        {/* Renderizar transiciones de estado */}
        {doc.statusTransitions.map((transition, index) => {
          const transitionDate = new Date(transition.startDate);
          const transitionPosition = ((transitionDate - timelineStart) / totalTimelineDuration) * 100;
          const clampedTransitionPosition = Math.max(0, Math.min(100, transitionPosition));
          
          return (
            <div
              key={index}
              className={`${styles.statusTransition} ${transition.isActive ? styles.active : ''}`}
              style={{
                left: `${clampedTransitionPosition}%`,
                backgroundColor: transition.statusInfo.color.bg,
                borderColor: transition.statusInfo.color.border
              }}
              title={`${transition.statusInfo.label}${transition.revision ? ` - Rev. ${transition.revision}` : ''}`}
            />
          );
        })}

        {/* Marcadores de revisiones (A, B, C, D, 0, 1, 2) */}
        {docRevisions.map((rev, idx) => {
          const revDate = new Date(rev.date);
          const revPosition = ((revDate - timelineStart) / totalTimelineDuration) * 100;
          const clampedRevPosition = Math.max(0, Math.min(100, revPosition));
          
          return (
            <div
              key={`rev-${rev.id}`}
              className={styles.revisionMarker}
              style={{ left: `${clampedRevPosition}%` }}
              title={`🎯 HITO ${rev.revision}\n📅 Fecha: ${formatDate(revDate)}\n📝 Tipo: ${rev.type || 'Revisión'}\n📄 Documento: ${doc.code}\n👤 Responsable: ${doc.responsible || 'No asignado'}`}
            >
              <div className={styles.revisionDiamond} />
              <div className={styles.revisionLabel}>{rev.revision}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Calcular coordenadas de barras para dependencias
  const getBarRect = (docId) => {
    const doc = filteredDocuments.find(d => d.id === docId);
    if (!doc || timelineDates.length === 0) return null;
    
    // Calcular posición vertical usando el nuevo sistema de acordeón
    const verticalPosition = calculateVerticalPosition(doc.discipline, docId);
    
    // Usar el mismo cálculo preciso que en renderGanttBar
    const timelineStart = timelineDates[0];
    const timelineEnd = timelineDates[timelineDates.length - 1];
    const totalTimelineDuration = timelineEnd - timelineStart;
    
    const startDate = new Date(doc.startDate);
    const endDate = new Date(doc.endDate);
    
    const startPosition = ((startDate - timelineStart) / totalTimelineDuration) * 100;
    const endPosition = ((endDate - timelineStart) / totalTimelineDuration) * 100;
    
    const containerWidth = timelineDates.length * 100; // 100px por celda (coincide con CSS)
    const clampedStartPosition = Math.max(0, Math.min(100, startPosition));
    const clampedEndPosition = Math.max(0, Math.min(100, endPosition));
    
    const x1 = (clampedStartPosition / 100) * containerWidth;
    const x2 = (clampedEndPosition / 100) * containerWidth;
    const y = verticalPosition + 12; // Centrado en la barra
    
    return { x1, x2, y };
  };

  const renderDependencies = () => {
    if (!Array.isArray(dependencies) || dependencies.length === 0) return null;

    const containerWidth = timelineDates.length * 100;
    const containerHeight = totalTimelineHeight; // Usar altura dinámica del acordeón

    const paths = [];
    dependencies.forEach((dep, idx) => {
      if (dep.type !== 'FS') return; // soporte inicial FS
      const from = getBarRect(dep.fromId);
      const to = getBarRect(dep.toId);
      if (!from || !to) return;
      const startX = from.x2;
      const startY = from.y + 12;
      const endX = to.x1;
      const endY = to.y + 12;
      const midX = (startX + endX) / 2;
      const d = `M ${startX},${startY} C ${midX},${startY} ${midX},${endY} ${endX},${endY}`;
      const isCritical = showCritical && criticalInfo.criticalEdges.has(`${dep.fromId}->${dep.toId}`);
      paths.push(
        <path 
          key={idx} 
          d={d} 
          className={`${styles.dependencyPath} ${isCritical ? styles.criticalPath : ''}`} 
          markerEnd={isCritical ? "url(#criticalArrowhead)" : "url(#arrowhead)"}
        />
      );
    });

    return (
      <svg className={styles.dependencySvg} width={containerWidth} height={containerHeight}>
        <defs>
          <marker 
            id="arrowhead" 
            markerWidth="6" 
            markerHeight="6" 
            refX="5" 
            refY="2" 
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path 
              d="M0,0 L0,4 L5,2 z" 
              fill="#64748b"
              stroke="none"
            />
          </marker>
          <marker 
            id="criticalArrowhead" 
            markerWidth="8" 
            markerHeight="8" 
            refX="7" 
            refY="2" 
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path 
              d="M0,0 L0,4 L7,2 z" 
              fill="var(--color-danger)"
              stroke="none"
            />
          </marker>
        </defs>
        {paths}
      </svg>
    );
  };

  // Milestones eliminados a solicitud: no se renderizan

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}>
      {/* Header con controles */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>📅 Cronograma de Documentos</h2>
          <div className={styles.controls}>
            <select 
              value={timeScale} 
              onChange={(e) => setTimeScale(e.target.value)}
              className={styles.timeScaleSelect}
            >
              <option value="day">Día</option>
              <option value="week">Semana</option>
              <option value="month">Mes</option>
            </select>
            
            {/* Controles de Zoom */}
            <div className={styles.zoomControls}>
              <button
                onClick={handleZoomOut}
                className={styles.zoomButton}
                title="Alejar (Zoom Out)"
                disabled={zoomLevel <= 25}
              >
                −
              </button>
              <span className={styles.zoomLevel}>
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                className={styles.zoomButton}
                title="Acercar (Zoom In)"
                disabled={zoomLevel >= 400}
              >
                +
              </button>
              <button
                onClick={handleZoomReset}
                className={styles.zoomResetButton}
                title="Resetear Zoom"
              >
                ⌂
              </button>
            </div>
            
            <button
              onClick={handleWidthReset}
              className={styles.widthResetButton}
              title="Resetear ancho de paneles"
            >
              ⚏
            </button>
            
            <button
              onClick={expandAllDisciplines}
              className={styles.expandAllButton}
              title="Expandir todas las disciplinas"
            >
              ▼▼
            </button>
            
            <button
              onClick={collapseAllDisciplines}
              className={styles.collapseAllButton}
              title="Colapsar todas las disciplinas"
            >
              ▶▶
            </button>
            
            <button
              onClick={toggleFullscreen}
              className={styles.fullscreenButton}
              title={isFullscreen ? 'Salir de pantalla completa (ESC)' : 'Pantalla completa'}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerControlsRight}>
            <button
              className={styles.toggleButton}
              title={showCritical ? 'Ocultar ruta crítica' : 'Mostrar ruta crítica'}
              onClick={() => setShowCritical(v => !v)}
            >
              {showCritical ? 'Ruta crítica: ON' : 'Ruta crítica: OFF'}
            </button>
            <select
              className={styles.filterSelect}
              value={workCalendar}
              onChange={(e) => setWorkCalendar(e.target.value)}
              title="Calendario de trabajo"
            >
              <option value="WEEKDAYS">L-V</option>
              <option value="ALL_DAYS">Todos los días</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout principal */}
      <div className={styles.mainLayout}>
        {/* Panel izquierdo - Lista de documentos */}
        <div 
          className={styles.documentList}
          style={{ width: `${listWidth}%` }}
        >
          <div className={styles.docFilters}>
            <input
              className={styles.searchInput}
              placeholder="Buscar (código o nombre)"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
            />
            <select
              className={styles.filterSelect}
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              title="Filtrar por disciplina"
            >
              {disciplineOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'ALL' ? 'Todas las disciplinas' : (DISCIPLINE_LABELS[opt] || opt)}</option>
              ))}
            </select>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Filtrar por estado"
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'ALL' ? 'Todos los estados' : (DOCUMENT_STATUS_DETAILED[opt]?.label || opt)}</option>
              ))}
            </select>
            <select
              className={styles.filterSelect}
              value={responsibleFilter}
              onChange={(e) => setResponsibleFilter(e.target.value)}
              title="Filtrar por responsable"
            >
              {responsibleOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'ALL' ? 'Todos los responsables' : opt}</option>
              ))}
            </select>
          </div>

          <div className={styles.listHeader}>
            <div 
              className={`${styles.listColumn} ${styles.resizable}`} 
              style={{ width: `${columnWidths.document}%` }}
            >
              Documento
              <div 
                className={styles.columnResizer}
                onMouseDown={(e) => handleColumnMouseDown(e, 'document')}
              />
            </div>
            <div 
              className={`${styles.listColumn} ${styles.resizable}`} 
              style={{ width: `${columnWidths.status}%` }}
            >
              Estado
              <div 
                className={styles.columnResizer}
                onMouseDown={(e) => handleColumnMouseDown(e, 'status')}
              />
            </div>
            <div 
              className={`${styles.listColumn} ${styles.resizable}`} 
              style={{ width: `${columnWidths.start}%` }}
            >
              Inicio
              <div 
                className={styles.columnResizer}
                onMouseDown={(e) => handleColumnMouseDown(e, 'start')}
              />
            </div>
            <div 
              className={`${styles.listColumn} ${styles.resizable}`} 
              style={{ width: `${columnWidths.end}%` }}
            >
              Fin
              <div 
                className={styles.columnResizer}
                onMouseDown={(e) => handleColumnMouseDown(e, 'end')}
              />
            </div>
          </div>
          
          <div className={styles.listOuterScroll}>
            <div 
              className={styles.listContent}
              ref={listRef}
              onScroll={handleScroll('list')}
            >
                <div className={styles.listInnerWidth}> 
                {Object.entries(documentsByDiscipline).map(([discipline, docs]) => {
                  const isExpanded = expandedDisciplines.has(discipline);
                  const stats = disciplineStats[discipline];
                  
                  return (
                    <div key={discipline} className={styles.disciplineGroup}>
                      {/* Header de disciplina */}
                      <div 
                        className={styles.disciplineHeader}
                        onClick={() => toggleDiscipline(discipline)}
                      >
                        <div className={styles.disciplineHeaderLeft}>
                          <div className={styles.disciplineIcon}>
                            {isExpanded ? '▼' : '▶'}
                          </div>
                          <div className={styles.disciplineInfo}>
                            <div className={styles.disciplineName}>
                              {DISCIPLINE_LABELS[discipline] || discipline}
                            </div>
                            <div className={styles.disciplineStats}>
                              {stats.totalDocs} docs • {stats.avgProgress}% promedio
                            </div>
                          </div>
                        </div>
                        <div className={styles.disciplineHeaderRight}>
                          <span 
                            className={styles.disciplineBadge}
                            style={{ backgroundColor: stats.color }}
                          >
                            {stats.completedDocs}/{stats.totalDocs}
                          </span>
                        </div>
                      </div>
                      
                      {/* Documentos de la disciplina */}
                      {isExpanded && docs.map((doc) => (
                        <div 
                          key={doc.id}
                          className={`${styles.documentRow} ${selectedDocumentId === doc.id ? styles.selected : ''} ${hoveredDocumentId === doc.id ? styles.hovered : ''}`}
                          onClick={() => handleDocumentClick(doc.id)}
                          onMouseEnter={() => setHoveredDocumentId(doc.id)}
                          onMouseLeave={() => setHoveredDocumentId(null)}
                        >
                          <div className={styles.listColumn} style={{ width: `${columnWidths.document}%` }}>
                            <div className={styles.documentInfo}>
                              <div className={styles.documentCode}>{doc.code}</div>
                              <div className={styles.documentName}>{doc.name}</div>
                            </div>
                          </div>
                          <div className={styles.listColumn} style={{ width: `${columnWidths.status}%` }}>
                            <span 
                              className={styles.statusBadge}
                              style={{ 
                                backgroundColor: doc.statusInfo.color.bg,
                                color: doc.statusInfo.color.text,
                                borderColor: doc.statusInfo.color.border
                              }}
                            >
                              {doc.statusInfo.label}
                            </span>
                          </div>
                          <div 
                            className={`${styles.listColumn} ${styles.editableCell} ${editingCell?.docId === doc.id && editingCell?.field === 'startDate' ? styles.editing : ''}`}
                            style={{ width: `${columnWidths.start}%` }}
                            onDoubleClick={() => handleCellDoubleClick(doc.id, 'startDate', formatDate(doc.startDate))}
                          >
                            {editingCell?.docId === doc.id && editingCell?.field === 'startDate' ? (
                              <input
                                type="date"
                                className={styles.inlineInput}
                                value={editingValue}
                                onChange={(e) => handleCellEdit(e.target.value)}
                                onBlur={handleCellSave}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleCellSave();
                                  if (e.key === 'Escape') handleCellCancel();
                                }}
                                autoFocus
                              />
                            ) : (
                              formatDate(doc.startDate)
                            )}
                          </div>
                          <div 
                            className={`${styles.listColumn} ${styles.editableCell} ${editingCell?.docId === doc.id && editingCell?.field === 'endDate' ? styles.editing : ''}`}
                            style={{ width: `${columnWidths.end}%` }}
                            onDoubleClick={() => handleCellDoubleClick(doc.id, 'endDate', formatDate(doc.endDate))}
                          >
                            {editingCell?.docId === doc.id && editingCell?.field === 'endDate' ? (
                              <input
                                type="date"
                                className={styles.inlineInput}
                                value={editingValue}
                                onChange={(e) => handleCellEdit(e.target.value)}
                                onBlur={handleCellSave}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleCellSave();
                                  if (e.key === 'Escape') handleCellCancel();
                                }}
                                autoFocus
                              />
                            ) : (
                              formatDate(doc.endDate)
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divisor redimensionable */}
        <div 
          className={`${styles.resizer} ${isResizing ? styles.resizing : ''}`}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.resizerHandle}></div>
        </div>

        {/* Panel derecho - Gantt Chart */}
        <div 
          className={styles.ganttChart}
          style={{ width: `${100 - listWidth}%` }}
        >
          {/* Timeline Header */}
          <div className={styles.timelineHeader} ref={timelineRef}>
            {/* Área de filtros simulada para mantener alineación */}
            <div className={styles.timelineFiltersArea}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                Cronograma de Documentos
              </div>
            </div>
            
            <div className={styles.timelineCellsContainer}>
              {timelineDates.map((date, index) => {
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <div 
                    key={index} 
                    className={`${styles.timelineCell} ${workCalendar === 'WEEKDAYS' && isWeekend ? styles.nonWorking : ''}`}
                  >
                    <div className={styles.timelineCellContent}>
                      {formatTimelineDate(date)}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Línea de fecha actual */}
            {getCurrentDatePosition() !== null && (
              <div 
                className={styles.currentDateLine}
                style={{
                  left: `${getCurrentDatePosition()}%`
                }}
                title={`Hoy: ${formatDate(currentDate)}`}
              >
                <div className={styles.currentDateLabel}>
                  {formatDate(currentDate)}
                </div>
              </div>
            )}

          {/* Milestones deshabilitados */}
          </div>

          {/* Gantt Content */}
          <div 
            className={styles.ganttContent}
            ref={ganttRef}
            onScroll={handleScroll('gantt')}
            style={{
              height: `${totalTimelineHeight}px`,
              position: 'relative'
            }}
          >
            {/* Línea de fecha actual en todo el contenido */}
            {getCurrentDatePosition() !== null && (
              <div 
                className={styles.currentDateLine}
                style={{ left: `${getCurrentDatePosition()}%` }}
              />
            )}
            {renderDependencies()}
            {Object.entries(documentsByDiscipline).map(([discipline, docs]) => {
              const isExpanded = expandedDisciplines.has(discipline);
              const stats = disciplineStats[discipline];
              
              if (isExpanded) {
                // Mostrar barras individuales cuando está expandido
                return docs.map((doc) => (
                  <div key={doc.id}>
                    {renderGanttBar(doc)}
                  </div>
                ));
              } else {
                // Mostrar barra global cuando está colapsado
                return (
                  <div key={discipline}>
                    {renderDisciplineBar(discipline, stats)}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSProjectGantt;
