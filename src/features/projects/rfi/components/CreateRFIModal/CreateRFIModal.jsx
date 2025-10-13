/**
 * CreateRFIModal Component
 * Modal for creating new RFI requests
 * @module features/projects/rfi/components/CreateRFIModal
 */

import { useState } from 'react';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import styles from './CreateRFIModal.module.css';

const CreateRFIModal = ({ isOpen, onClose, onSubmit, projectId }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'MEDIUM',
    recipient: '',
    linkedDocuments: [],
    dueDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.recipient.trim()) {
      newErrors.recipient = 'El destinatario es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        createdBy: 'Usuario Actual', // In real app, get from auth context
      });
      
      // Reset form
      setFormData({
        subject: '',
        description: '',
        priority: 'MEDIUM',
        recipient: '',
        linkedDocuments: [],
        dueDate: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating RFI:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      subject: '',
      description: '',
      priority: 'MEDIUM',
      recipient: '',
      linkedDocuments: [],
      dueDate: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Nueva RFI"
      size="large"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Subject */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Asunto <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
            placeholder="Ej: Aclaración sobre presión de diseño"
          />
          {errors.subject && <span className={styles.error}>{errors.subject}</span>}
        </div>

        {/* Priority and Recipient Row */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Prioridad</label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className={styles.select}
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Destinatario <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => handleChange('recipient', e.target.value)}
              className={`${styles.input} ${errors.recipient ? styles.inputError : ''}`}
              placeholder="Nombre del cliente o contacto"
            />
            {errors.recipient && <span className={styles.error}>{errors.recipient}</span>}
          </div>
        </div>

        {/* Due Date */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Fecha Límite de Respuesta</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Descripción / Pregunta <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            rows="6"
            placeholder="Describe detalladamente la información que necesitas..."
          />
          {errors.description && <span className={styles.error}>{errors.description}</span>}
        </div>

        {/* Linked Documents */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Documentos Relacionados</label>
          <div className={styles.documentSelector}>
            <p className={styles.helperText}>
              📎 Selecciona documentos de la LMD relacionados con esta consulta
            </p>
            <Button type="button" variant="outline" size="small">
              + Vincular Documentos
            </Button>
          </div>
          {formData.linkedDocuments.length > 0 && (
            <div className={styles.linkedDocuments}>
              {formData.linkedDocuments.map((doc, index) => (
                <div key={index} className={styles.linkedDocument}>
                  <span>{doc}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newDocs = [...formData.linkedDocuments];
                      newDocs.splice(index, 1);
                      handleChange('linkedDocuments', newDocs);
                    }}
                    className={styles.removeButton}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creando...' : 'Crear RFI'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRFIModal;

