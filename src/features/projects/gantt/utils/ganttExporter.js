/**
 * Gantt chart export utilities
 * @module features/projects/gantt/utils/ganttExporter
 */

import { formatDate } from '../../../../utils/dateFormatter';

/**
 * Export Gantt chart as PNG image
 * @param {HTMLElement} chartElement - The chart DOM element
 * @param {string} filename - Output filename
 */
export const exportAsPNG = (chartElement, filename = 'gantt-chart.png') => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match chart
  const rect = chartElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  // Create image from chart element
  html2canvas(chartElement, {
    backgroundColor: '#ffffff',
    scale: 2, // Higher resolution
    useCORS: true,
    allowTaint: true
  }).then(canvas => {
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(error => {
    console.error('Error exporting PNG:', error);
    alert('Error al exportar la imagen. Por favor, inténtalo de nuevo.');
  });
};

/**
 * Export Gantt chart as PDF
 * @param {Object} data - Chart data
 * @param {string} filename - Output filename
 */
export const exportAsPDF = (data, filename = 'gantt-chart.pdf') => {
  // Import jsPDF dynamically
  import('jspdf').then(jsPDF => {
    const { jsPDF } = jsPDF;
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // Add title
    doc.setFontSize(16);
    doc.text('Cronograma de Documentos', 20, 20);
    
    // Add project info
    doc.setFontSize(12);
    doc.text(`Proyecto: ${data.projectName}`, 20, 30);
    doc.text(`Fecha de exportación: ${formatDate(new Date())}`, 20, 35);
    
    // Add legend
    let yPosition = 50;
    doc.setFontSize(10);
    doc.text('Leyenda:', 20, yPosition);
    yPosition += 10;
    
    // Document status legend
    doc.text('Estados de Documento:', 20, yPosition);
    yPosition += 5;
    Object.entries(data.legend?.documentStatuses || {}).forEach(([key, status]) => {
      doc.text(`• ${status.label}: ${status.description}`, 25, yPosition);
      yPosition += 5;
    });
    
    yPosition += 5;
    // Discipline legend
    doc.text('Disciplinas:', 20, yPosition);
    yPosition += 5;
    Object.entries(data.legend?.disciplines || {}).forEach(([key, discipline]) => {
      doc.text(`• ${discipline.label}`, 25, yPosition);
      yPosition += 5;
    });
    
    // Add timeline summary
    yPosition += 10;
    doc.text('Resumen del Timeline:', 20, yPosition);
    yPosition += 5;
    doc.text(`• Total de documentos: ${data.summary?.totalDocuments || 0}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Documentos completados: ${data.summary?.completedDocuments || 0}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Documentos en progreso: ${data.summary?.inProgressDocuments || 0}`, 25, yPosition);
    yPosition += 5;
    doc.text(`• Documentos vencidos: ${data.summary?.overdueDocuments || 0}`, 25, yPosition);
    
    // Add note
    yPosition += 15;
    doc.setFontSize(8);
    doc.text('Nota: Este es un resumen del cronograma. Para detalles completos, consulte la aplicación web.', 20, yPosition);
    
    // Save the PDF
    doc.save(filename);
  }).catch(error => {
    console.error('Error exporting PDF:', error);
    alert('Error al exportar el PDF. Por favor, inténtalo de nuevo.');
  });
};

/**
 * Export Gantt chart as Excel/CSV
 * @param {Array} documents - Document data
 * @param {Array} revisions - Revision data
 * @param {string} filename - Output filename
 */
export const exportAsExcel = (documents, revisions, filename = 'gantt-data.xlsx') => {
  // Import xlsx dynamically
  import('xlsx').then(XLSX => {
    // Prepare documents data
    const documentsData = documents.map(doc => ({
      'Código': doc.code,
      'Nombre': doc.name,
      'Tipo': doc.type,
      'Disciplina': doc.discipline,
      'Estado': doc.status,
      'Fecha Inicio': doc.startDate ? formatDate(new Date(doc.startDate)) : '',
      'Fecha Fin': doc.endDate ? formatDate(new Date(doc.endDate)) : '',
      'Fecha Envío': doc.sendDate ? formatDate(new Date(doc.sendDate)) : '',
      'Fecha Aprobación': doc.approvalDate ? formatDate(new Date(doc.approvalDate)) : '',
      'Responsable': doc.responsible,
      'Costo': doc.cost || 0,
      'Revisión Actual': doc.currentRevision || '',
      'Progreso (%)': doc.progress || 0
    }));
    
    // Prepare revisions data
    const revisionsData = revisions.map(rev => ({
      'Documento': rev.documentId,
      'Revisión': rev.revision,
      'Fecha': rev.date ? formatDate(new Date(rev.date)) : '',
      'Tipo': rev.type,
      'Estado': rev.status,
      'Comentarios': rev.comments || '',
      'Revisor': rev.reviewer || ''
    }));
    
    // Create workbook with multiple sheets
    const workbook = XLSX.utils.book_new();
    
    // Documents sheet
    const documentsSheet = XLSX.utils.json_to_sheet(documentsData);
    XLSX.utils.book_append_sheet(workbook, documentsSheet, 'Documentos');
    
    // Revisions sheet
    const revisionsSheet = XLSX.utils.json_to_sheet(revisionsData);
    XLSX.utils.book_append_sheet(workbook, revisionsSheet, 'Revisiones');
    
    // Summary sheet
    const summaryData = [
      ['Resumen del Cronograma'],
      [''],
      ['Total de Documentos', documents.length],
      ['Documentos Completados', documents.filter(d => d.status === 'IFC').length],
      ['Documentos en Progreso', documents.filter(d => ['ELB', 'REV', 'CMN'].includes(d.status)).length],
      ['Documentos Vencidos', documents.filter(d => {
        if (!d.dueDate) return false;
        return new Date(d.dueDate) < new Date() && !['IFC', 'APR'].includes(d.status);
      }).length],
      ['Total de Revisiones', revisions.length],
      ['Revisiones Pendientes', revisions.filter(r => r.status === 'PENDING').length],
      [''],
      ['Fecha de Exportación', formatDate(new Date())]
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');
    
    // Save the file
    XLSX.writeFile(workbook, filename);
  }).catch(error => {
    console.error('Error exporting Excel:', error);
    alert('Error al exportar el archivo Excel. Por favor, inténtalo de nuevo.');
  });
};

/**
 * Export as CSV (simpler alternative)
 * @param {Array} documents - Document data
 * @param {string} filename - Output filename
 */
export const exportAsCSV = (documents, filename = 'gantt-data.csv') => {
  const headers = [
    'Código', 'Nombre', 'Tipo', 'Disciplina', 'Estado', 
    'Fecha Inicio', 'Fecha Fin', 'Responsable', 'Costo', 'Progreso (%)'
  ];
  
  const csvContent = [
    headers.join(','),
    ...documents.map(doc => [
      `"${doc.code}"`,
      `"${doc.name}"`,
      `"${doc.type}"`,
      `"${doc.discipline}"`,
      `"${doc.status}"`,
      `"${doc.startDate ? formatDate(new Date(doc.startDate)) : ''}"`,
      `"${doc.endDate ? formatDate(new Date(doc.endDate)) : ''}"`,
      `"${doc.responsible}"`,
      doc.cost || 0,
      doc.progress || 0
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Main export function with format selection
 * @param {string} format - Export format ('png', 'pdf', 'excel', 'csv')
 * @param {Object} data - Chart data and elements
 */
export const exportGanttChart = (format, data) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const projectName = data.projectName || 'Proyecto';
  
  switch (format) {
    case 'png':
      exportAsPNG(data.chartElement, `cronograma-${projectName}-${timestamp}.png`);
      break;
    case 'pdf':
      exportAsPDF(data, `cronograma-${projectName}-${timestamp}.pdf`);
      break;
    case 'excel':
      exportAsExcel(data.documents, data.revisions, `cronograma-${projectName}-${timestamp}.xlsx`);
      break;
    case 'csv':
      exportAsCSV(data.documents, `cronograma-${projectName}-${timestamp}.csv`);
      break;
    default:
      console.warn('Unknown export format:', format);
  }
};
