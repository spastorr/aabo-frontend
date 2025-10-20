/**
 * LessonsLearnedWidget - Compact widget for dashboard showing recent lessons learned
 * @module features/projects/dashboard/components/LessonsLearnedWidget
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../../components/shared/Card';
import Button from '../../../../../components/shared/Button';
import Badge from '../../../../../components/shared/Badge';
import { getProjectLessonsLearned } from '../../../../../services/projectsApi';
import { formatDate } from '../../../../../utils';
import styles from './LessonsLearnedWidget.module.css';

const LessonsLearnedWidget = ({ projectId }) => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLessons();
  }, [projectId]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjectLessonsLearned(projectId);
      
      if (response.success) {
        // Get only the 3 most recent lessons
        const recentLessons = (response.data || []).slice(0, 3);
        setLessons(recentLessons);
      } else {
        setError('Error al cargar lecciones');
      }
    } catch (err) {
      setError('Error al cargar lecciones');
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
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
      case 'HIGH': return 'Alto';
      case 'MEDIUM': return 'Medio';
      case 'LOW': return 'Bajo';
      default: return 'Sin Impacto';
    }
  };

  if (loading) {
    return (
      <Card className={styles.widget}>
        <div className={styles.header}>
          <h3 className={styles.title}>💡 Lecciones Aprendidas</h3>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={styles.widget}>
        <div className={styles.header}>
          <h3 className={styles.title}>💡 Lecciones Aprendidas</h3>
        </div>
        <div className={styles.error}>
          <p>Error al cargar lecciones</p>
          <Button size="small" onClick={loadLessons}>Reintentar</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.widget}>
      <div className={styles.header}>
        <h3 className={styles.title}>💡 Lecciones Aprendidas</h3>
        <Button 
          size="small" 
          variant="outline"
          onClick={() => navigate(`/projects/${projectId}/lessons-learned`)}
        >
          Ver Todas
        </Button>
      </div>

      {lessons.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💡</div>
          <p>No hay lecciones aprendidas registradas</p>
          <Button 
            size="small" 
            variant="primary"
            onClick={() => navigate(`/projects/${projectId}/lessons-learned`)}
          >
            Agregar Primera Lección
          </Button>
        </div>
      ) : (
        <div className={styles.lessonsList}>
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className={styles.lessonItem}>
              <div className={styles.lessonHeader}>
                <h4 className={styles.lessonTitle}>{lesson.title}</h4>
                <Badge 
                  variant={getImpactVariant(lesson.impact)} 
                  size="small"
                >
                  {getImpactLabel(lesson.impact)}
                </Badge>
              </div>
              
              <p className={styles.lessonDescription}>
                {lesson.description.length > 120 
                  ? `${lesson.description.substring(0, 120)}...`
                  : lesson.description
                }
              </p>
              
              <div className={styles.lessonFooter}>
                <span className={styles.lessonDate}>
                  {formatDate(lesson.createdAt)}
                </span>
                {lesson.category && (
                  <span className={styles.lessonCategory}>
                    {lesson.category}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {lessons.length > 0 && (
            <div className={styles.footer}>
              <Button 
                size="small" 
                variant="ghost"
                onClick={() => navigate(`/projects/${projectId}/lessons-learned`)}
              >
                Ver todas las lecciones →
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default LessonsLearnedWidget;
