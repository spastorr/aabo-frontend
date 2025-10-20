/**
 * Export utilities for PDF and Excel
 * @module utils/exportUtils
 */

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS } from '../constants';

/**
 * Formats currency values for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('es-EC');
};

/**
 * Gets filter description for export filename
 * @param {Object} filters - Current filters
 * @returns {string} Filter description
 */
const getFilterDescription = (filters) => {
  const parts = [];
  
  if (filters.status !== 'all') {
    parts.push(`Estado: ${PROJECT_STATUS_LABELS[filters.status]}`);
  }
  
  if (filters.type !== 'all') {
    parts.push(`Tipo: ${PROJECT_TYPE_LABELS[filters.type]}`);
  }
  
  if (filters.search) {
    parts.push(`Búsqueda: "${filters.search}"`);
  }
  
  return parts.length > 0 ? ` (${parts.join(', ')})` : '';
};

/**
 * Exports projects to PDF
 * @param {Array} projects - Array of projects to export
 * @param {Object} filters - Current filters applied
 */
export const exportToPDF = (projects, filters) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin;
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Portafolio de Proyectos', margin, yPosition);
  yPosition += 15;
  
  // Subtitle with filters
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const filterDesc = getFilterDescription(filters);
  doc.text(`${projects.length} proyecto${projects.length !== 1 ? 's' : ''} encontrado${projects.length !== 1 ? 's' : ''}${filterDesc}`, margin, yPosition);
  yPosition += 20;
  
  // Date
  doc.setFontSize(10);
  doc.text(`Generado el: ${new Date().toLocaleDateString('es-EC')}`, margin, yPosition);
  yPosition += 15;
  
  // Table headers
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const headers = ['Código', 'Nombre', 'Cliente', 'Tipo', 'Estado', 'Progreso', 'Presupuesto', 'Gastado'];
  const colWidths = [25, 50, 30, 25, 20, 15, 25, 25];
  
  // Draw header background
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPosition - 5, contentWidth, 10, 'F');
  
  // Draw header text
  let xPosition = margin;
  headers.forEach((header, index) => {
    doc.text(header, xPosition + 2, yPosition + 2);
    xPosition += colWidths[index];
  });
  
  yPosition += 10;
  
  // Table rows
  doc.setFont('helvetica', 'normal');
  projects.forEach((project, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPosition - 2, contentWidth, 8, 'F');
    }
    
    // Draw row data
    xPosition = margin;
    const rowData = [
      project.code,
      project.name.length > 30 ? project.name.substring(0, 30) + '...' : project.name,
      project.client.length > 15 ? project.client.substring(0, 15) + '...' : project.client,
      PROJECT_TYPE_LABELS[project.type] || project.type,
      PROJECT_STATUS_LABELS[project.status] || project.status,
      `${project.progress}%`,
      formatCurrency(project.budget),
      formatCurrency(project.spent)
    ];
    
    rowData.forEach((data, colIndex) => {
      doc.text(data, xPosition + 2, yPosition + 2);
      xPosition += colWidths[colIndex];
    });
    
    yPosition += 8;
  });
  
  // Footer
  const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
  const totalSpent = projects.reduce((sum, project) => sum + (project.spent || 0), 0);
  
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Presupuesto: ${formatCurrency(totalBudget)}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Total Gastado: ${formatCurrency(totalSpent)}`, margin, yPosition);
  yPosition += 5;
  doc.text(`Diferencia: ${formatCurrency(totalBudget - totalSpent)}`, margin, yPosition);
  
  // Save the PDF
  const fileName = `portafolio_proyectos${getFilterDescription(filters).replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Exports projects to Excel
 * @param {Array} projects - Array of projects to export
 * @param {Object} filters - Current filters applied
 */
export const exportToExcel = (projects, filters) => {
  // Prepare data for Excel
  const excelData = projects.map(project => ({
    'Código': project.code,
    'Nombre': project.name,
    'Cliente': project.client,
    'Tipo': PROJECT_TYPE_LABELS[project.type] || project.type,
    'Estado': PROJECT_STATUS_LABELS[project.status] || project.status,
    'Fecha Inicio': formatDate(project.startDate),
    'Fecha Fin': formatDate(project.endDate),
    'Progreso (%)': project.progress,
    'Presupuesto (USD)': project.budget,
    'Gastado (USD)': project.spent,
    'Diferencia (USD)': (project.budget || 0) - (project.spent || 0),
    'Miembros del Equipo': project.teamMembers,
    'Descripción': project.description
  }));
  
  // Add summary row
  const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
  const totalSpent = projects.reduce((sum, project) => sum + (project.spent || 0), 0);
  const totalTeamMembers = projects.reduce((sum, project) => sum + (project.teamMembers || 0), 0);
  
  excelData.push({
    'Código': '',
    'Nombre': 'TOTALES',
    'Cliente': '',
    'Tipo': '',
    'Estado': '',
    'Fecha Inicio': '',
    'Fecha Fin': '',
    'Progreso (%)': '',
    'Presupuesto (USD)': totalBudget,
    'Gastado (USD)': totalSpent,
    'Diferencia (USD)': totalBudget - totalSpent,
    'Miembros del Equipo': totalTeamMembers,
    'Descripción': ''
  });
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);
  
  // Set column widths
  const colWidths = [
    { wch: 15 }, // Código
    { wch: 40 }, // Nombre
    { wch: 20 }, // Cliente
    { wch: 15 }, // Tipo
    { wch: 15 }, // Estado
    { wch: 12 }, // Fecha Inicio
    { wch: 12 }, // Fecha Fin
    { wch: 12 }, // Progreso
    { wch: 15 }, // Presupuesto
    { wch: 15 }, // Gastado
    { wch: 15 }, // Diferencia
    { wch: 15 }, // Miembros del Equipo
    { wch: 50 }  // Descripción
  ];
  ws['!cols'] = colWidths;
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Portafolio de Proyectos');
  
  // Add metadata sheet
  const metadata = [
    { 'Campo': 'Título', 'Valor': 'Portafolio de Proyectos' },
    { 'Campo': 'Fecha de Generación', 'Valor': new Date().toLocaleDateString('es-EC') },
    { 'Campo': 'Total de Proyectos', 'Valor': projects.length },
    { 'Campo': 'Filtros Aplicados', 'Valor': getFilterDescription(filters) || 'Ninguno' },
    { 'Campo': 'Presupuesto Total', 'Valor': formatCurrency(totalBudget) },
    { 'Campo': 'Gastado Total', 'Valor': formatCurrency(totalSpent) },
    { 'Campo': 'Diferencia Total', 'Valor': formatCurrency(totalBudget - totalSpent) }
  ];
  
  const metadataWs = XLSX.utils.json_to_sheet(metadata);
  XLSX.utils.book_append_sheet(wb, metadataWs, 'Información');
  
  // Save the Excel file
  const fileName = `portafolio_proyectos${getFilterDescription(filters).replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

/**
 * Gets available export options
 * @returns {Array} Array of export options
 */
export const getExportOptions = () => [
  {
    id: 'pdf',
    label: 'Exportar a PDF',
    icon: '📄',
    description: 'Genera un documento PDF con el listado de proyectos'
  },
  {
    id: 'excel',
    label: 'Exportar a Excel',
    icon: '📊',
    description: 'Genera una hoja de cálculo Excel con datos detallados'
  }
];
