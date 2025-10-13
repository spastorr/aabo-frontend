/**
 * CreateProjectModal - Modal for creating new projects
 * @module features/projects/portfolio/components/CreateProjectModal
 */

import { useState, useEffect } from 'react';
import Modal from '../../../../../components/shared/Modal';
import Input from '../../../../../components/shared/Input';
import Select from '../../../../../components/shared/Select';
import Button from '../../../../../components/shared/Button';
import TeamSelectionModal from './TeamSelectionModal';
import { PROJECT_TYPES, PROJECT_TYPE_LABELS } from '../../../../../constants/projectTypes';
import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '../../../../../constants/statuses';
import { isRequired, minLength } from '../../../../../utils/validators';
import { getTeamWorkload } from '../../../../../services/resourcesApi';
import styles from './CreateProjectModal.module.css';

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    client: '',
    type: '',
    status: PROJECT_STATUS.ACTIVE,
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    teamMembers: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableResources, setAvailableResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Load available team members when modal opens
  useEffect(() => {
    if (isOpen) {
      loadAvailableResources();
    }
  }, [isOpen]);

  const loadAvailableResources = async () => {
    try {
      setLoadingResources(true);
      const response = await getTeamWorkload();
      if (response.success) {
        setAvailableResources(response.data);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoadingResources(false);
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!isRequired(formData.name)) {
      newErrors.name = 'El nombre del proyecto es requerido';
    } else if (!minLength(formData.name, 3)) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!isRequired(formData.code)) {
      newErrors.code = 'El código del proyecto es requerido';
    } else if (!minLength(formData.code, 3)) {
      newErrors.code = 'El código debe tener al menos 3 caracteres';
    }

    if (!isRequired(formData.client)) {
      newErrors.client = 'El cliente es requerido';
    }

    if (!isRequired(formData.type)) {
      newErrors.type = 'El tipo de proyecto es requerido';
    }

    if (!isRequired(formData.status)) {
      newErrors.status = 'El estado del proyecto es requerido';
    }

    if (!isRequired(formData.startDate)) {
      newErrors.startDate = 'La fecha de inicio es requerida';
    }

    if (!isRequired(formData.endDate)) {
      newErrors.endDate = 'La fecha de finalización es requerida';
    }

    // Validate date range
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end < start) {
        newErrors.endDate = 'La fecha de finalización debe ser posterior a la fecha de inicio';
      }
    }

    // Validate budget
    if (!isRequired(formData.budget)) {
      newErrors.budget = 'El presupuesto es requerido';
    } else if (isNaN(formData.budget) || Number(formData.budget) <= 0) {
      newErrors.budget = 'El presupuesto debe ser un número mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert budget to number and prepare team members data
      const projectData = {
        ...formData,
        budget: Number(formData.budget),
        teamMembers: formData.teamMembers.map(member => ({
          id: member.id,
          name: member.name,
          role: member.role,
          discipline: member.discipline,
        })),
      };

      await onSubmit(projectData);
      
      // Reset form
      setFormData({
        name: '',
        code: '',
        client: '',
        type: '',
        status: PROJECT_STATUS.ACTIVE,
        startDate: '',
        endDate: '',
        budget: '',
        description: '',
        teamMembers: [],
      });
      
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      setErrors({
        submit: error.message || 'Error al crear el proyecto. Intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: '',
      code: '',
      client: '',
      type: '',
      status: PROJECT_STATUS.ACTIVE,
      startDate: '',
      endDate: '',
      budget: '',
      description: '',
      teamMembers: [],
    });
    setErrors({});
    onClose();
  };

  // Handle team selection from modal
  const handleTeamSelection = (selected) => {
    handleChange('teamMembers', selected);
  };

  // Remove individual team member
  const removeMember = (memberId) => {
    const updated = formData.teamMembers.filter(m => m.id !== memberId);
    handleChange('teamMembers', updated);
  };

  // Prepare options for selects
  const typeOptions = Object.values(PROJECT_TYPES).map(type => ({
    value: type,
    label: PROJECT_TYPE_LABELS[type]
  }));

  const statusOptions = Object.values(PROJECT_STATUS).map(status => ({
    value: status,
    label: PROJECT_STATUS_LABELS[status]
  }));

  const modalFooter = (
    <div className={styles.footer}>
      <Button 
        variant="secondary" 
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button 
        variant="primary" 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creando...' : 'Crear Proyecto'}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Crear Nuevo Proyecto"
      size="large"
      footer={modalFooter}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {errors.submit && (
          <div className={styles.errorBanner}>
            {errors.submit}
          </div>
        )}

        <div className={styles.formGrid}>
          {/* Project Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Nombre del Proyecto <span className={styles.required}>*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Refinería La Libertad - Modernización"
              error={!!errors.name}
              helperText={errors.name}
              disabled={isSubmitting}
            />
          </div>

          {/* Project Code */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Código del Proyecto <span className={styles.required}>*</span>
            </label>
            <Input
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
              placeholder="Ej: RLL-MOD-2024"
              error={!!errors.code}
              helperText={errors.code}
              disabled={isSubmitting}
            />
          </div>

          {/* Client */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Cliente <span className={styles.required}>*</span>
            </label>
            <Input
              value={formData.client}
              onChange={(e) => handleChange('client', e.target.value)}
              placeholder="Ej: Petroecuador"
              error={!!errors.client}
              helperText={errors.client}
              disabled={isSubmitting}
            />
          </div>

          {/* Project Type */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Tipo de Proyecto <span className={styles.required}>*</span>
            </label>
            <Select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              options={typeOptions}
              placeholder="Seleccionar tipo..."
              error={!!errors.type}
              disabled={isSubmitting}
            />
            {errors.type && (
              <span className={styles.errorText}>{errors.type}</span>
            )}
          </div>

          {/* Project Status */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Estado <span className={styles.required}>*</span>
            </label>
            <Select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              options={statusOptions}
              error={!!errors.status}
              disabled={isSubmitting}
            />
            {errors.status && (
              <span className={styles.errorText}>{errors.status}</span>
            )}
          </div>

          {/* Team Members */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Miembros del Equipo
            </label>
            
            <div 
              className={styles.teamSelector}
              onClick={() => !isSubmitting && !loadingResources && setIsTeamModalOpen(true)}
            >
              <div className={styles.teamSelectorContent}>
                {formData.teamMembers.length === 0 ? (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderIcon}>👥</span>
                    <span>Haz clic para seleccionar miembros del equipo</span>
                  </div>
                ) : (
                  <div className={styles.selectedTeamPreview}>
                    <div className={styles.selectedBadges}>
                      {formData.teamMembers.slice(0, 3).map((member) => (
                        <div key={member.id} className={styles.memberBadge}>
                          <span className={styles.badgeName}>{member.name}</span>
                          <button
                            type="button"
                            className={styles.removeBadge}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMember(member.id);
                            }}
                            disabled={isSubmitting}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {formData.teamMembers.length > 3 && (
                        <div className={styles.moreBadge}>
                          +{formData.teamMembers.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.teamSelectorArrow}>▼</div>
            </div>

            {formData.teamMembers.length > 0 && (
              <div className={styles.teamSummary}>
                <span className={styles.summaryIcon}>✓</span>
                {formData.teamMembers.length} miembro{formData.teamMembers.length !== 1 ? 's' : ''} seleccionado{formData.teamMembers.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Start Date */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Fecha de Inicio <span className={styles.required}>*</span>
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              error={!!errors.startDate}
              helperText={errors.startDate}
              disabled={isSubmitting}
            />
          </div>

          {/* End Date */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Fecha de Finalización <span className={styles.required}>*</span>
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              error={!!errors.endDate}
              helperText={errors.endDate}
              disabled={isSubmitting}
            />
          </div>

          {/* Budget */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Presupuesto (USD) <span className={styles.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              error={!!errors.budget}
              helperText={errors.budget}
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>
              Descripción
            </label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descripción del proyecto..."
              rows="4"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>

      {/* Team Selection Modal */}
      <TeamSelectionModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        availableMembers={availableResources}
        selectedMembers={formData.teamMembers}
        onConfirm={handleTeamSelection}
        loading={loadingResources}
      />
    </Modal>
  );
};

export default CreateProjectModal;

