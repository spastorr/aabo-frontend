/**
 * CreateTransmittalModal - Modal for creating new transmittals
 * Integrates with LMD to attach correct document versions
 * @module features/projects/transmittals/components/CreateTransmittalModal
 */

import { useState, useEffect } from 'react';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Input from '../../../../../components/shared/Input';
import Select from '../../../../../components/shared/Select';
import Badge from '../../../../../components/shared/Badge';
import { useProject } from '../../../../../contexts/ProjectContext';
import { getLMDByProject } from '../../../../../services/mocks/documentMocks';
import { 
  getPendingTransmissionDocuments, 
  getTransmissionStatistics,
  getDocumentTransmissionPriority,
  getTransmissionStatusIcon
} from '../../../../../utils/documentStatusUtils';
import { 
  generateTransmittalCode, 
  generateResponseDueDate 
} from '../../../../../utils/transmittalCodeGenerator';
import styles from './CreateTransmittalModal.module.css';

const CreateTransmittalModal = ({ isOpen, onClose, onSuccess, projectId }) => {
  const { selectedProject } = useProject();
  
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    description: '',
    dueDate: '',
    priority: 'NORMAL'
  });
  
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(true);
  const [transmittalCode, setTransmittalCode] = useState('');

  // Load LMD documents when modal opens
  useEffect(() => {
    if (isOpen && projectId) {
      loadDocuments();
      initializeFormData();
    }
  }, [isOpen, projectId]);

  // Initialize form with project data and generate transmittal code
  const initializeFormData = () => {
    if (selectedProject) {
      // Generate sequential transmittal code
      const generatedCode = generateTransmittalCode(
        selectedProject.code, 
        projectId, 
        [] // In real implementation, pass existing transmittals
      );
      
      // Calculate due date (5 days from now)
      const dueDate = generateResponseDueDate(5);
      
      setFormData(prev => ({
        ...prev,
        recipient: selectedProject.client || '',
        subject: `Envío de Documentos - ${selectedProject.name}`,
        description: `Se envían los siguientes documentos del proyecto ${selectedProject.name} para revisión y aprobación del cliente.`,
        dueDate: dueDate
      }));
      
      setTransmittalCode(generatedCode);
    }
  };

  const loadDocuments = async () => {
    try {
      const response = await getLMDByProject(projectId);
      if (response.success) {
        // Only show documents that are ready to be sent (not in draft)
        const readyDocs = response.data.filter(
          doc => doc.status !== 'ELB' && doc.currentRevision
        );
        setDocuments(readyDocs);
        
        // Auto-select pending documents
        const pendingDocs = getPendingTransmissionDocuments(readyDocs);
        setSelectedDocuments(pendingDocs);
      }
    } catch (err) {
      console.error('Error loading documents:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentToggle = (document) => {
    setSelectedDocuments(prev => {
      const isSelected = prev.some(d => d.id === document.id);
      if (isSelected) {
        return prev.filter(d => d.id !== document.id);
      } else {
        return [...prev, document];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.recipient || !formData.subject) {
      setError('Por favor completa los campos requeridos');
      return;
    }

    if (selectedDocuments.length === 0) {
      setError('Debes seleccionar al menos un documento');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update documents with response due date
      const responseDueDate = formData.dueDate;
      const updatedDocuments = selectedDocuments.map(doc => ({
        ...doc,
        responseDueDate: responseDueDate,
        transmittalCode: transmittalCode,
        transmittalStatus: 'SENT'
      }));
      
      console.log('Creating transmittal:', {
        ...formData,
        code: transmittalCode,
        documents: updatedDocuments,
        projectId,
        projectName: selectedProject?.name,
        projectCode: selectedProject?.code
      });

      // Reset form
      handleReset();
      onSuccess();
    } catch (err) {
      console.error('Error creating transmittal:', err);
      setError('Error al crear el transmittal');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      recipient: '',
      subject: '',
      description: '',
      dueDate: '',
      priority: 'NORMAL'
    });
    setSelectedDocuments([]);
    setSearchTerm('');
    setError(null);
    setTransmittalCode('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Filter documents by search term and pending status
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showOnlyPending) {
      const isPending = getPendingTransmissionDocuments([doc]).length > 0;
      return matchesSearch && isPending;
    }
    
    return matchesSearch;
  });

  const pendingDocuments = getPendingTransmissionDocuments(documents);
  const stats = getTransmissionStatistics(documents);

  const priorityOptions = [
    { value: 'LOW', label: 'Baja' },
    { value: 'NORMAL', label: 'Normal' },
    { value: 'HIGH', label: 'Alta' },
    { value: 'URGENT', label: 'Urgente' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nuevo Transmittal"
      size="large"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Información Básica</h3>
          
          {/* Generated Transmittal Code */}
          {transmittalCode && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Código del Transmittal</label>
              <div className={styles.codeDisplay}>
                <span className={styles.codeValue}>{transmittalCode}</span>
                <Badge variant="info" size="small">Generado automáticamente</Badge>
              </div>
            </div>
          )}
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Destinatario <span className={styles.required}>*</span>
              </label>
              <Input
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                placeholder="Ej: Petroecuador, Cliente XYZ"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Prioridad</label>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                options={priorityOptions}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Asunto <span className={styles.required}>*</span>
            </label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Breve descripción del envío"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción / Comentarios</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Información adicional sobre el envío..."
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de Respuesta Esperada</label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Document Selection */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              Documentos Adjuntos 
              <span className={styles.count}>
                ({selectedDocuments.length} seleccionado{selectedDocuments.length !== 1 ? 's' : ''})
              </span>
            </h3>
            
            {/* Statistics */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.total}</span>
                <span className={styles.statLabel}>Total</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.pending}</span>
                <span className={styles.statLabel}>Pendientes</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.transmitted}</span>
                <span className={styles.statLabel}>Enviados</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className={styles.filterControls}>
            <div className={styles.formGroup}>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar documentos en la LMD..."
              />
            </div>
            
            <div className={styles.toggleContainer}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={showOnlyPending}
                  onChange={(e) => setShowOnlyPending(e.target.checked)}
                />
                <span className={styles.toggleText}>
                  Solo mostrar documentos pendientes ({pendingDocuments.length})
                </span>
              </label>
            </div>
          </div>

          <div className={styles.documentList}>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map(doc => {
                const isSelected = selectedDocuments.some(d => d.id === doc.id);
                const isPending = getPendingTransmissionDocuments([doc]).length > 0;
                const priority = getDocumentTransmissionPriority(doc);
                const statusIcon = getTransmissionStatusIcon(isPending ? 'pending' : 'transmitted');
                
                return (
                  <div
                    key={doc.id}
                    className={`${styles.documentItem} ${isSelected ? styles.selected : ''} ${isPending ? styles.pending : ''}`}
                    onClick={() => handleDocumentToggle(doc)}
                  >
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className={styles.documentInfo}>
                      <div className={styles.documentHeader}>
                        <div className={styles.documentCode}>{doc.code}</div>
                        <div className={styles.documentStatus}>
                          <span className={styles.statusIcon}>{statusIcon}</span>
                          <Badge 
                            variant={isPending ? 'warning' : 'neutral'}
                            size="small"
                          >
                            {isPending ? 'Pendiente' : 'Enviado'}
                          </Badge>
                        </div>
                      </div>
                      <div className={styles.documentName}>{doc.name}</div>
                      <div className={styles.documentMeta}>
                        <Badge variant="neutral">Rev. {doc.currentRevision || doc.revision}</Badge>
                        <span className={styles.discipline}>{doc.discipline}</span>
                        {isPending && (
                          <Badge 
                            variant={priority === 'URGENT' ? 'danger' : priority === 'HIGH' ? 'warning' : 'info'}
                            size="small"
                          >
                            {priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyDocs}>
                <p>No hay documentos disponibles para enviar</p>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Transmittal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTransmittalModal;

