/**
 * useHistoricalGanttData hook
 * Manages historical project Gantt chart data (Read-Only)
 * @module features/knowledgeHub/historical-projects/hooks/useHistoricalGanttData
 */

import { useState, useEffect, useMemo } from 'react';
import { getHistoricalProjectById } from '../../../../services/knowledgeHubApi';

const useHistoricalGanttData = (projectId) => {
  const [project, setProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and view state
  const [filters, setFilters] = useState({
    disciplines: [],
    documentTypes: [],
    statuses: [],
    dateRange: null
  });
  
  const [viewMode, setViewMode] = useState('documents');
  const [timeRange, setTimeRange] = useState(null);

  // Load historical project data
  useEffect(() => {
    if (!projectId) return;
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getHistoricalProjectById(projectId);
        
        if (response.success && response.data) {
          const projectData = response.data;
          setProject(projectData);
          
          // Extract documents and revisions from project data
          setDocuments(projectData.documents || []);
          setRevisions(projectData.revisions || []);
        } else {
          setError('Proyecto histórico no encontrado');
        }
        
      } catch (err) {
        console.error('Error loading historical Gantt data:', err);
        setError('Error al cargar los datos del cronograma histórico');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [projectId]);

  // Process documents for Gantt display
  const processedDocuments = useMemo(() => {
    return documents.map(doc => {
      return {
        ...doc,
        // Ensure we have timeline data
        startDate: doc.startDate || doc.createdDate || project?.startDate || new Date().toISOString(),
        endDate: doc.endDate || doc.dueDate || doc.startDate || doc.createdDate || project?.endDate || new Date().toISOString(),
        sendDate: doc.sendDate,
        approvalDate: doc.approvalDate,
        // Add calculated fields
        duration: calculateDuration(doc.startDate || doc.createdDate, doc.endDate || doc.dueDate),
        progress: calculateProgress(doc),
        // Timeline positioning
        timelinePosition: calculateTimelinePosition(doc)
      };
    });
  }, [documents, project]);

  // Process revisions for Gantt display
  const processedRevisions = useMemo(() => {
    return revisions.map(rev => ({
      ...rev,
      // Timeline positioning
      timelinePosition: calculateRevisionPosition(rev)
    }));
  }, [revisions]);

  // Calculate document duration in days
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // Calculate document progress percentage
  const calculateProgress = (doc) => {
    const statusProgress = {
      'ELB': 25,    // En elaboración
      'REV': 50,    // En revisión
      'CMN': 60,    // Comentado
      'APR': 90,    // Aprobado
      'IFC': 100    // Para construcción
    };
    
    return statusProgress[doc.status] || 100; // Historical projects are mostly completed
  };

  // Calculate timeline position for documents
  const calculateTimelinePosition = (doc) => {
    const startDate = doc.startDate || doc.createdDate;
    const endDate = doc.endDate || doc.dueDate || startDate;
    
    return {
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
      center: startDate && endDate ? 
        new Date((new Date(startDate).getTime() + new Date(endDate).getTime()) / 2) : null
    };
  };

  // Calculate timeline position for revisions
  const calculateRevisionPosition = (rev) => {
    const date = rev.date || rev.submissionDate;
    return {
      date: date ? new Date(date) : null,
      milestone: rev.type === 'FOR_CONSTRUCTION' || rev.revision === '0'
    };
  };

  // Get filtered documents based on current filters
  const filteredDocuments = useMemo(() => {
    let filtered = processedDocuments;

    if (filters.disciplines.length > 0) {
      filtered = filtered.filter(doc => filters.disciplines.includes(doc.discipline));
    }

    if (filters.documentTypes.length > 0) {
      filtered = filtered.filter(doc => filters.documentTypes.includes(doc.type));
    }

    if (filters.statuses.length > 0) {
      filtered = filtered.filter(doc => filters.statuses.includes(doc.status));
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(doc => {
        const docStart = new Date(doc.startDate || doc.createdDate);
        const docEnd = new Date(doc.endDate || doc.dueDate || doc.startDate || doc.createdDate);
        
        return (docStart >= start && docStart <= end) || 
               (docEnd >= start && docEnd <= end) ||
               (docStart <= start && docEnd >= end);
      });
    }

    return filtered;
  }, [processedDocuments, filters]);

  // Get timeline statistics
  const timelineStats = useMemo(() => {
    const totalDocuments = filteredDocuments.length;
    const completedDocuments = filteredDocuments.filter(doc => doc.status === 'IFC').length;
    const inProgressDocuments = filteredDocuments.filter(doc => ['ELB', 'REV', 'CMN'].includes(doc.status)).length;
    const overdueDocuments = 0; // Historical projects don't have overdue items

    const totalRevisions = processedRevisions.length;
    const pendingRevisions = 0; // Historical projects don't have pending revisions

    return {
      totalDocuments,
      completedDocuments,
      inProgressDocuments,
      overdueDocuments,
      totalRevisions,
      pendingRevisions,
      completionRate: totalDocuments > 0 ? (completedDocuments / totalDocuments) * 100 : 100
    };
  }, [filteredDocuments, processedRevisions]);

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      disciplines: [],
      documentTypes: [],
      statuses: [],
      dateRange: null
    });
  };

  // Get milestone dates
  const milestones = useMemo(() => {
    const dates = [
      ...filteredDocuments.map(doc => doc.startDate || doc.createdDate),
      ...filteredDocuments.map(doc => doc.endDate || doc.dueDate),
      ...processedRevisions.map(rev => rev.date || rev.submissionDate)
    ].filter(Boolean).map(date => new Date(date));

    if (dates.length === 0) return [];

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return [
      { date: minDate, label: 'Inicio', type: 'start' },
      { date: maxDate, label: 'Fin', type: 'end' }
    ];
  }, [filteredDocuments, processedRevisions]);

  return {
    // Data
    project,
    documents: filteredDocuments,
    revisions: processedRevisions,
    loading,
    error,
    
    // State
    filters,
    viewMode,
    setViewMode,
    timeRange,
    setTimeRange,
    
    // Statistics
    timelineStats,
    milestones,
    
    // Actions
    setFilters: updateFilters,
    resetFilters,
    
    // Refetch function
    refetch: () => {
      if (projectId) {
        // Trigger reload
        setLoading(true);
        // The useEffect will handle the actual loading
      }
    }
  };
};

export default useHistoricalGanttData;
