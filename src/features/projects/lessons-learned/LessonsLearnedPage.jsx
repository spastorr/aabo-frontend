/**
 * LessonsLearnedPage - Management of lessons learned for active projects
 * @module features/projects/lessons-learned/LessonsLearnedPage
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import Button from '../../../components/shared/Button';
import Modal from '../../../components/shared/Modal';
import PageHeader from '../../../components/shared/PageHeader';
import Card from '../../../components/shared/Card';
import Input from '../../../components/shared/Input';
import Badge from '../../../components/shared/Badge';
import { getProjectLessonsLearned, addLessonLearned, updateLessonLearned, deleteLessonLearned } from '../../../services/projectsApi';
import { formatDate } from '../../../utils';
import styles from './LessonsLearnedPage.module.css';

const LessonsLearnedPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const { selectedProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    category: '',
    impact: 'MEDIUM',
    tags: [],
    tagsInput: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Clean up any existing duplicates first
    const cleanupDuplicates = async () => {
      try {
        const response = await getProjectLessonsLearned(projectId);
        if (response.success) {
          // This will trigger the deduplication in the mock service
          await loadLessons();
        }
      } catch (error) {
        console.error('Error cleaning duplicates:', error);
        loadLessons();
      }
    };
    
    cleanupDuplicates();
    
    // Create header JSX element
    const headerElement = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            💡 Lecciones Aprendidas
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            {selectedProject ? `${selectedProject.name} (${selectedProject.code})` : `Proyecto ${projectId}`}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ➕ Agregar Lección
        </button>
      </div>
    );
    
    setHeader(headerElement);

    return () => clearHeader();
  }, [projectId, selectedProject]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjectLessonsLearned(projectId);
      
      if (response.success) {
        // Additional frontend deduplication as safety measure
        const uniqueLessons = (response.data || []).filter((lesson, index, self) => 
          index === self.findIndex(l => l.id === lesson.id)
        );
        setLessons(uniqueLessons);
      } else {
        setError('Error al cargar lecciones aprendidas');
      }
    } catch (err) {
      setError('Error al cargar lecciones aprendidas');
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLesson = async () => {
    try {
      const response = await addLessonLearned(projectId, {
        ...newLesson,
        projectId,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user' // TODO: Get from auth context
      });

      if (response.success) {
        setLessons(prev => [...prev, response.data]);
        setIsAddModalOpen(false);
        setNewLesson({
          title: '',
          description: '',
          category: '',
          impact: 'MEDIUM',
          tags: [],
          tagsInput: ''
        });
      } else {
        setError('Error al agregar lección aprendida');
      }
    } catch (err) {
      setError('Error al agregar lección aprendida');
      console.error('Error adding lesson:', err);
    }
  };

  const handleEditLesson = async () => {
    try {
      const response = await updateLessonLearned(projectId, editingLesson.id, {
        ...editingLesson,
        updatedAt: new Date().toISOString(),
        updatedBy: 'current-user' // TODO: Get from auth context
      });

      if (response.success) {
        setLessons(prev => 
          prev.map(lesson => 
            lesson.id === editingLesson.id ? response.data : lesson
          )
        );
        setIsEditModalOpen(false);
        setEditingLesson(null);
      } else {
        setError('Error al actualizar lección aprendida');
      }
    } catch (err) {
      setError('Error al actualizar lección aprendida');
      console.error('Error updating lesson:', err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta lección aprendida?')) {
      return;
    }

    try {
      const response = await deleteLessonLearned(projectId, lessonId);

      if (response.success) {
        setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
      } else {
        setError('Error al eliminar lección aprendida');
      }
    } catch (err) {
      setError('Error al eliminar lección aprendida');
      console.error('Error deleting lesson:', err);
    }
  };

  const openEditModal = (lesson) => {
    setEditingLesson({
      ...lesson,
      tagsInput: lesson.tags ? lesson.tags.join(', ') : ''
    });
    setIsEditModalOpen(true);
  };

  const getImpactVariant = (impact) => {
    switch (impact) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'default';
    }
  };

  const getImpactLabel = (impact) => {
    switch (impact) {
      case 'HIGH': return 'Alto Impacto';
      case 'MEDIUM': return 'Medio Impacto';
      case 'LOW': return 'Bajo Impacto';
      default: return 'Sin Impacto';
    }
  };

  const categories = ['all', 'Técnico', 'Proceso', 'Gestión', 'Calidad', 'Seguridad', 'Comunicación'];
  
  // Helper function to handle tags conversion
  const handleTagsChange = (value, setter) => {
    // Store the raw input value for display
    setter(prev => ({ ...prev, tagsInput: value }));
  };

  const handleTagsBlur = (value, setter) => {
    // Process tags only when user finishes typing (on blur)
    const tagsArray = value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    setter(prev => ({ ...prev, tags: tagsArray, tagsInput: value }));
  };
  
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lesson.tags && lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando lecciones aprendidas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={loadLessons}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Filters and Search */}
      <div className={styles.filters}>
        <div className={styles.searchSection}>
          <Input
            type="text"
            placeholder="Buscar lecciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="🔍"
          />
        </div>
        
        <div className={styles.categoryFilter}>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{lessons.length}</span>
          <span className={styles.statLabel}>Total Lecciones</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {lessons.filter(l => l.impact === 'HIGH').length}
          </span>
          <span className={styles.statLabel}>Alto Impacto</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {new Set(lessons.map(l => l.category)).size}
          </span>
          <span className={styles.statLabel}>Categorías</span>
        </div>
      </div>

      {/* Lessons List */}
      <div className={styles.lessonsList}>
        {filteredLessons.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💡</div>
            <h3>No hay lecciones aprendidas</h3>
            <p>
              {lessons.length === 0 
                ? 'Comienza agregando lecciones aprendidas durante el desarrollo del proyecto.'
                : 'No se encontraron lecciones que coincidan con los filtros aplicados.'
              }
            </p>
            {lessons.length === 0 && (
              <Button 
                variant="primary" 
                onClick={() => setIsAddModalOpen(true)}
              >
                Agregar Primera Lección
              </Button>
            )}
          </div>
        ) : (
          filteredLessons.map((lesson, index) => (
            <Card key={lesson.id} className={styles.lessonCard}>
              <div className={styles.lessonHeader}>
                <div className={styles.lessonTitle}>
                  <h3>{lesson.title}</h3>
                  <div className={styles.lessonMeta}>
                    <Badge variant={getImpactVariant(lesson.impact)}>
                      {getImpactLabel(lesson.impact)}
                    </Badge>
                    {lesson.category && (
                      <Badge variant="outline">{lesson.category}</Badge>
                    )}
                  </div>
                </div>
                <div className={styles.lessonActions}>
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={() => openEditModal(lesson)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="small"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </div>
              </div>
              
              <div className={styles.lessonContent}>
                <p>{lesson.description}</p>
              </div>
              
              {lesson.tags && lesson.tags.length > 0 && (
                <div className={styles.lessonTags}>
                  {lesson.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className={styles.lessonFooter}>
                <span className={styles.lessonDate}>
                  Creada: {formatDate(lesson.createdAt)}
                </span>
                {lesson.updatedAt && lesson.updatedAt !== lesson.createdAt && (
                  <span className={styles.lessonDate}>
                    Actualizada: {formatDate(lesson.updatedAt)}
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Lesson Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Lección Aprendida"
        size="large"
      >
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label>Título *</label>
            <Input
              type="text"
              value={newLesson.title}
              onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título descriptivo de la lección"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Descripción *</label>
            <textarea
              value={newLesson.description}
              onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe detalladamente la lección aprendida, incluyendo contexto, problema encontrado y solución aplicada..."
              className={styles.textarea}
              rows={6}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Categoría</label>
              <select
                value={newLesson.category}
                onChange={(e) => setNewLesson(prev => ({ ...prev, category: e.target.value }))}
                className={styles.select}
              >
                <option value="">Seleccionar categoría</option>
                <option value="Técnico">Técnico</option>
                <option value="Proceso">Proceso</option>
                <option value="Gestión">Gestión</option>
                <option value="Calidad">Calidad</option>
                <option value="Seguridad">Seguridad</option>
                <option value="Comunicación">Comunicación</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Impacto</label>
              <select
                value={newLesson.impact}
                onChange={(e) => setNewLesson(prev => ({ ...prev, impact: e.target.value }))}
                className={styles.select}
              >
                <option value="LOW">Bajo Impacto</option>
                <option value="MEDIUM">Medio Impacto</option>
                <option value="HIGH">Alto Impacto</option>
              </select>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Tags (separados por comas)</label>
            <Input
              type="text"
              value={newLesson.tagsInput || ''}
              onChange={(e) => handleTagsChange(e.target.value, setNewLesson)}
              onBlur={(e) => handleTagsBlur(e.target.value, setNewLesson)}
              placeholder="ej: diseño, revisión, cliente, cronograma"
            />
          </div>
        </div>
        
        <div className={styles.modalActions}>
          <Button 
            variant="outline" 
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddLesson}
            disabled={!newLesson.title || !newLesson.description}
          >
            Agregar Lección
          </Button>
        </div>
      </Modal>

      {/* Edit Lesson Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Lección Aprendida"
        size="large"
      >
        {editingLesson && (
          <>
            <div className={styles.modalContent}>
              <div className={styles.formGroup}>
                <label>Título *</label>
                <Input
                  type="text"
                  value={editingLesson.title}
                  onChange={(e) => setEditingLesson(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título descriptivo de la lección"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Descripción *</label>
                <textarea
                  value={editingLesson.description}
                  onChange={(e) => setEditingLesson(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe detalladamente la lección aprendida..."
                  className={styles.textarea}
                  rows={6}
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Categoría</label>
                  <select
                    value={editingLesson.category}
                    onChange={(e) => setEditingLesson(prev => ({ ...prev, category: e.target.value }))}
                    className={styles.select}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Proceso">Proceso</option>
                    <option value="Gestión">Gestión</option>
                    <option value="Calidad">Calidad</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Comunicación">Comunicación</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Impacto</label>
                  <select
                    value={editingLesson.impact}
                    onChange={(e) => setEditingLesson(prev => ({ ...prev, impact: e.target.value }))}
                    className={styles.select}
                  >
                    <option value="LOW">Bajo Impacto</option>
                    <option value="MEDIUM">Medio Impacto</option>
                    <option value="HIGH">Alto Impacto</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Tags (separados por comas)</label>
                <Input
                  type="text"
                  value={editingLesson.tagsInput || ''}
                  onChange={(e) => handleTagsChange(e.target.value, setEditingLesson)}
                  onBlur={(e) => handleTagsBlur(e.target.value, setEditingLesson)}
                  placeholder="ej: diseño, revisión, cliente, cronograma"
                />
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleEditLesson}
                disabled={!editingLesson.title || !editingLesson.description}
              >
                Guardar Cambios
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default LessonsLearnedPage;