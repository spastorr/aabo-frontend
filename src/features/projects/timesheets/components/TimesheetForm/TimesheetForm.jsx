/**
 * TimesheetForm - Form for creating/editing timesheet entries
 * @module features/projects/timesheets/components/TimesheetForm
 */

import { useState, useEffect } from 'react';
import { getDocumentsByProject } from '../../../../../services/documentsApi';
import Button from '../../../../../components/shared/Button';
import styles from './TimesheetForm.module.css';

const TimesheetForm = ({ projectId, timesheet = null, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    date: timesheet?.date || new Date().toISOString().split('T')[0],
    documentId: timesheet?.documentId || '',
    hours: timesheet?.hours || '',
    description: timesheet?.description || '',
  });
  
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadDocuments();
  }, [projectId]);

  const loadDocuments = async () => {
    try {
      setLoadingDocuments(true);
      const response = await getDocumentsByProject(projectId);
      if (response.success) {
        setDocuments(response.data);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }
    
    if (!formData.documentId) {
      newErrors.documentId = 'Debe seleccionar un documento';
    }
    
    if (!formData.hours || formData.hours <= 0) {
      newErrors.hours = 'Las horas deben ser mayor a 0';
    } else if (formData.hours > 24) {
      newErrors.hours = 'Las horas no pueden ser mayor a 24';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const selectedDoc = documents.find(d => d.id === formData.documentId);
    
    const submitData = {
      ...formData,
      projectId,
      documentCode: selectedDoc?.code || '',
      documentName: selectedDoc?.name || '',
      hours: parseFloat(formData.hours),
    };
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>
          Fecha <span className={styles.required}>*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="documentId" className={styles.label}>
          Documento Asociado <span className={styles.required}>*</span>
        </label>
        <select
          id="documentId"
          name="documentId"
          value={formData.documentId}
          onChange={handleChange}
          className={`${styles.select} ${errors.documentId ? styles.inputError : ''}`}
          disabled={loadingDocuments}
        >
          <option value="">Seleccione un documento...</option>
          {documents.map(doc => (
            <option key={doc.id} value={doc.id}>
              {doc.code} - {doc.name}
            </option>
          ))}
        </select>
        {errors.documentId && <span className={styles.error}>{errors.documentId}</span>}
        {loadingDocuments && <span className={styles.hint}>Cargando documentos...</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="hours" className={styles.label}>
          Horas Trabajadas <span className={styles.required}>*</span>
        </label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={formData.hours}
          onChange={handleChange}
          className={`${styles.input} ${errors.hours ? styles.inputError : ''}`}
          min="0.5"
          max="24"
          step="0.5"
          placeholder="8"
        />
        {errors.hours && <span className={styles.error}>{errors.hours}</span>}
        <span className={styles.hint}>Ingrese las horas en incrementos de 0.5</span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Descripción del Trabajo <span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          rows="4"
          placeholder="Describa el trabajo realizado en este documento..."
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {timesheet ? 'Actualizar' : 'Registrar'} Horas
        </Button>
      </div>
    </form>
  );
};

export default TimesheetForm;

