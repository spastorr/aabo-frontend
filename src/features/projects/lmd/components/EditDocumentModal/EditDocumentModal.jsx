/**
 * EditDocumentModal component
 * Allows editing document details
 * @module features/projects/lmd/components/EditDocumentModal
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Input from '../../../../../components/shared/Input';
import Select from '../../../../../components/shared/Select';
import { DISCIPLINE_LABELS, DOCUMENT_STATUS } from '../../../../../constants';
import { saveDocumentChanges } from '../../../../../utils/documentTraceabilityUtils';
import styles from './EditDocumentModal.module.css';

const EditDocumentModal = ({ document, isOpen, onClose, onSave, projectId }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discipline: '',
    responsible: '',
    revision: '',
    type: '',
    status: '',
    cost: '',
    description: '',
    comments: '',
    reviewDeadline: '',
    stamp: '',
    redLineReference: '',
    originalDocumentCode: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (document && isOpen) {
      setFormData({
        name: document.name || '',
        code: document.code || '',
        discipline: document.discipline || '',
        responsible: document.responsible || '',
        revision: document.revision || '',
        type: document.type || '',
        status: document.status || '',
        cost: document.cost || '',
        description: document.description || '',
        comments: document.comments || '',
        reviewDeadline: document.reviewDeadline || '',
        stamp: document.stamp || '',
        redLineReference: document.redLineReference || '',
        originalDocumentCode: document.originalDocumentCode || ''
      });
      setErrors({});
    }
  }, [document, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'El código es requerido';
    }

    if (!formData.discipline) {
      newErrors.discipline = 'La disciplina es requerida';
    }

    if (!formData.responsible.trim()) {
      newErrors.responsible = 'El responsable es requerido';
    }

    if (!formData.revision.trim()) {
      newErrors.revision = 'La revisión es requerida';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'El tipo es requerido';
    }

    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
    }

    if (formData.cost && isNaN(parseFloat(formData.cost))) {
      newErrors.cost = 'El costo debe ser un número válido';
    }

    if (formData.reviewDeadline && isNaN(Date.parse(formData.reviewDeadline))) {
      newErrors.reviewDeadline = 'La fecha debe ser válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updatedDocument = {
        ...document,
        ...formData,
        cost: formData.cost ? parseFloat(formData.cost) : 0,
        reviewDeadline: formData.reviewDeadline || null
      };

      // Save document changes
      const result = await saveDocumentChanges(updatedDocument);
      
      if (result.success) {
        await onSave(updatedDocument);
        onClose();
      } else {
        setErrors({ general: result.message || 'Error al guardar el documento' });
      }
    } catch (error) {
      console.error('Error saving document:', error);
      setErrors({ general: 'Error al guardar el documento' });
    } finally {
      setLoading(false);
    }
  };

  const disciplineOptions = Object.entries(DISCIPLINE_LABELS).map(([key, label]) => ({
    value: key,
    label: label
  }));

  const statusOptions = Object.entries(DOCUMENT_STATUS).map(([key, value]) => ({
    value: key,
    label: value
  }));

  const documentTypes = [
    { value: 'DRAWING', label: 'Dibujo' },
    { value: 'SPECIFICATION', label: 'Especificación' },
    { value: 'CALCULATION', label: 'Cálculo' },
    { value: 'DATA_SHEET', label: 'Hoja de Datos' },
    { value: 'PROCEDURE', label: 'Procedimiento' },
    { value: 'MANUAL', label: 'Manual' },
    { value: 'REPORT', label: 'Reporte' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Documento"
      size="large"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre del Documento *</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ingrese el nombre del documento"
              error={errors.name}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Código *</label>
            <Input
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value)}
              placeholder="Ej: B43ITT298-TPT-70-315"
              error={errors.code}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Disciplina *</label>
            <Select
              value={formData.discipline}
              onChange={(value) => handleInputChange('discipline', value)}
              options={disciplineOptions}
              placeholder="Seleccione una disciplina"
              error={errors.discipline}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Responsable *</label>
            <Input
              value={formData.responsible}
              onChange={(e) => handleInputChange('responsible', e.target.value)}
              placeholder="Ingrese el responsable"
              error={errors.responsible}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Revisión *</label>
            <Input
              value={formData.revision}
              onChange={(e) => handleInputChange('revision', e.target.value)}
              placeholder="Ej: A, B, C, 0, 1"
              error={errors.revision}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo *</label>
            <Select
              value={formData.type}
              onChange={(value) => handleInputChange('type', value)}
              options={documentTypes}
              placeholder="Seleccione el tipo"
              error={errors.type}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Estado *</label>
            <Select
              value={formData.status}
              onChange={(value) => handleInputChange('status', value)}
              options={statusOptions}
              placeholder="Seleccione el estado"
              error={errors.status}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Costo</label>
            <Input
              type="number"
              value={formData.cost}
              onChange={(e) => handleInputChange('cost', e.target.value)}
              placeholder="0.00"
              error={errors.cost}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Plazo de Revisión</label>
            <Input
              type="date"
              value={formData.reviewDeadline}
              onChange={(e) => handleInputChange('reviewDeadline', e.target.value)}
              error={errors.reviewDeadline}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sello</label>
            <Input
              value={formData.stamp}
              onChange={(e) => handleInputChange('stamp', e.target.value)}
              placeholder="Ej: FOR CONSTRUCTION"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Red Line Asociado</label>
            <Input
              value={formData.redLineReference}
              onChange={(e) => handleInputChange('redLineReference', e.target.value)}
              placeholder="Código del red line"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Documento Original</label>
            <Input
              value={formData.originalDocumentCode}
              onChange={(e) => handleInputChange('originalDocumentCode', e.target.value)}
              placeholder="Código del documento original"
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label className={styles.label}>Descripción</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descripción del documento"
              rows={3}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label className={styles.label}>Comentarios</label>
            <textarea
              className={styles.textarea}
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder="Comentarios adicionales"
              rows={3}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

EditDocumentModal.propTypes = {
  document: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  projectId: PropTypes.string,
};

export default EditDocumentModal;