/**
 * ProjectArchiveDetail - Detailed view of archived project
 * @module features/knowledgeHub/historical-projects/components/ProjectArchiveDetail
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Tabs from '../../../../../components/shared/Tabs';
import Badge from '../../../../../components/shared/Badge';
import Button from '../../../../../components/shared/Button';
import ArchiveLMD from './ArchiveLMD';
import ArchiveMetrics from './ArchiveMetrics';
import { formatDate, formatCurrency } from '../../../../../utils';
import styles from './ProjectArchiveDetail.module.css';

const ProjectArchiveDetail = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const {
    code,
    name,
    client,
    type,
    description,
    startDate,
    completionDate,
    duration,
    budget,
    finalCost,
    documents,
    transmittals,
    rfis,
    disciplines,
    teamMembers,
    tags,
    successRate,
    lessonsLearned,
    lmd,
    metrics
  } = project;

  const budgetVariance = budget && finalCost ? ((finalCost - budget) / budget) * 100 : 0;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`${code} - Archivo del Proyecto`}
      size="large"
      className={styles.modal}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.projectName}>{name}</h2>
            <div className={styles.metadata}>
              <span className={styles.metaItem}>
                <strong>Cliente:</strong> {client}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <strong>Tipo:</strong> {type}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <strong>Completado:</strong> {formatDate(completionDate)}
              </span>
            </div>
            {successRate && successRate >= 90 && (
              <Badge variant="success" size="medium" className={styles.successBadge}>
                ⭐ Proyecto Exitoso ({successRate}%)
              </Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Vista General' },
            { id: 'lmd', label: 'Lista Maestra de Documentos' },
            { id: 'metrics', label: 'Métricas Detalladas' },
            { id: 'files', label: 'Archivos' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <div>
              {/* Description */}
              {description && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Descripción</h3>
                  <p className={styles.description}>{description}</p>
                </div>
              )}

              {/* Key Metrics */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Métricas Clave</h3>
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>⏱️</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>Duración</div>
                      <div className={styles.metricValue}>{duration} meses</div>
                      <div className={styles.metricDetail}>
                        {formatDate(startDate)} - {formatDate(completionDate)}
                      </div>
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>💰</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>Presupuesto</div>
                      <div className={styles.metricValue}>{formatCurrency(budget)}</div>
                      <div className={styles.metricDetail}>Presupuesto inicial</div>
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>📊</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>Costo Final</div>
                      <div className={styles.metricValue}>{formatCurrency(finalCost)}</div>
                      <div
                        className={styles.metricDetail}
                        style={{ color: budgetVariance > 0 ? 'var(--color-error)' : 'var(--color-success)' }}
                      >
                        {budgetVariance > 0 ? '+' : ''}{budgetVariance.toFixed(1)}% del presupuesto
                      </div>
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>📄</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>Documentos</div>
                      <div className={styles.metricValue}>{documents}</div>
                      <div className={styles.metricDetail}>Entregables finales</div>
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>📤</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>Transmittals</div>
                      <div className={styles.metricValue}>{transmittals}</div>
                      <div className={styles.metricDetail}>Comunicaciones oficiales</div>
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>❓</div>
                    <div className={styles.metricContent}>
                      <div className={styles.metricLabel}>RFIs</div>
                      <div className={styles.metricValue}>{rfis}</div>
                      <div className={styles.metricDetail}>Solicitudes de información</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team & Disciplines */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Equipo y Disciplinas</h3>
                <div className={styles.teamInfo}>
                  <div className={styles.infoGroup}>
                    <strong>Miembros del Equipo:</strong>
                    <span className={styles.teamCount}>{teamMembers} personas</span>
                  </div>
                  <div className={styles.infoGroup}>
                    <strong>Disciplinas Involucradas:</strong>
                    <div className={styles.disciplines}>
                      {disciplines.map((discipline, index) => (
                        <Badge key={index} variant="info">
                          {discipline}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Etiquetas</h3>
                  <div className={styles.tags}>
                    {tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons Learned */}
              {lessonsLearned && lessonsLearned.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>💡 Lecciones Aprendidas</h3>
                  <ul className={styles.lessonsList}>
                    {lessonsLearned.map((lesson, index) => (
                      <li key={index} className={styles.lessonItem}>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'lmd' && (
            <div>
              <ArchiveLMD lmd={lmd || []} projectCode={code} />
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              <ArchiveMetrics metrics={metrics || {}} />
            </div>
          )}

          {activeTab === 'files' && (
            <div className={styles.filesSection}>
              <p className={styles.infoMessage}>
                📦 Esta sección contendrá acceso a los archivos finales del proyecto:
                PDFs, DWGs, modelos 3D, y otros entregables.
              </p>
              <Button variant="primary">Descargar Archivo Completo (.zip)</Button>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary">
            📥 Exportar Reporte
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ProjectArchiveDetail.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    completionDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    budget: PropTypes.number,
    finalCost: PropTypes.number,
    documents: PropTypes.number,
    transmittals: PropTypes.number,
    rfis: PropTypes.number,
    disciplines: PropTypes.arrayOf(PropTypes.string),
    teamMembers: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    successRate: PropTypes.number,
    lessonsLearned: PropTypes.arrayOf(PropTypes.string),
    lmd: PropTypes.array,
    metrics: PropTypes.object
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectArchiveDetail;

