/**
 * UploadStandardModal - Modal for uploading new standards
 * @module features/knowledgeHub/standards/components/UploadStandardModal
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Input from '../../../../../components/shared/Input';
import Select from '../../../../../components/shared/Select';
// import FileUpload from '../../../../../components/shared/FileUpload'; // TODO: Implement FileUpload component
import styles from './UploadStandardModal.module.css';

const UploadStandardModal = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    version: '',
    category: '',
    description: '',
    file: null
  });

  const getTypeLabel = () => {
    switch (type) {
      case 'client':
        return 'Especificación de Cliente';
      case 'internal':
        return 'Guía Interna';
      case 'external':
        return 'Normativa Externa';
      default:
        return 'Estándar';
    }
  };

  const categoryOptions = type === 'client'
    ? [
        { value: 'design', label: 'Diseño' },
        { value: 'construction', label: 'Construcción' },
        { value: 'quality', label: 'Calidad' },
        { value: 'safety', label: 'Seguridad' },
        { value: 'environmental', label: 'Ambiental' }
      ]
    : type === 'internal'
    ? [
        { value: 'procedimientos', label: 'Procedimientos' },
        { value: 'calculos', label: 'Hojas de Cálculo' },
        { value: 'mejores-practicas', label: 'Mejores Prácticas' },
        { value: 'checklists', label: 'Checklists' },
        { value: 'plantillas', label: 'Plantillas' }
      ]
    : [
        { value: 'API', label: 'API' },
        { value: 'ASME', label: 'ASME' },
        { value: 'ISO', label: 'ISO' },
        { value: 'ASTM', label: 'ASTM' }
      ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading standard:', formData);
    // Here would be the API call
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Subir ${getTypeLabel()}`}
      size="medium"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Título *</label>
          <Input
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="Título del estándar"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Código *</label>
          <Input
            value={formData.code}
            onChange={(value) => setFormData({ ...formData, code: value })}
            placeholder="Código de identificación"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Versión *</label>
          <Input
            value={formData.version}
            onChange={(value) => setFormData({ ...formData, version: value })}
            placeholder="ej. 1.0, Rev. A"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {type === 'external' ? 'Organización *' : 'Categoría *'}
          </label>
          <Select
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            options={categoryOptions}
            placeholder="Seleccionar..."
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Descripción</label>
          <textarea
            className={styles.textarea}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descripción del estándar"
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Archivo PDF *</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            className={styles.fileInput}
            required
          />
          <small className={styles.helpText}>Tamaño máximo: 50 MB</small>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Subir Estándar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

UploadStandardModal.propTypes = {
  type: PropTypes.oneOf(['client', 'internal', 'external']).isRequired,
  onClose: PropTypes.func.isRequired
};

export default UploadStandardModal;

