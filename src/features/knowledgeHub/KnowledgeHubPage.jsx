/**
 * KnowledgeHubPage - Main hub page with access to all Knowledge Hub sections
 * @module features/knowledgeHub/KnowledgeHubPage
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../../contexts/LayoutContext';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import PageHeader from '../../components/shared/PageHeader';
import Modal from '../../components/shared/Modal';
import styles from './KnowledgeHubPage.module.css';

const KnowledgeHubPage = () => {
  const navigate = useNavigate();
  const { setHeader, clearHeader } = useLayout();
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📚 Biblioteca Técnica"
      subtitle="Centralizamos y organizamos toda la información técnica y documentación histórica"
      actions={[
        {
          label: 'ℹ️ Información',
          variant: 'outline',
          size: 'small',
          onClick: () => setShowInfoModal(true)
        }
      ]}
    />
  ), []);

  useEffect(() => {
    setHeader(headerContent);
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const sections = [
    {
      id: 'search',
      title: 'Búsqueda Inteligente',
      description: 'Motor de búsqueda semántica que encuentra información en todo el Knowledge Hub usando lenguaje natural.',
      icon: '🔍',
      color: 'primary',
      path: '/knowledge-hub/search',
      features: [
        'Búsqueda por lenguaje natural',
        'Resultados contextuales 360°',
        'Filtros avanzados por categoría',
        'Encuentra proyectos, estándares y guías'
      ]
    },
    {
      id: 'historical',
      title: 'Proyectos Históricos',
      description: 'Biblioteca estructurada de proyectos finalizados con toda su documentación, métricas y lecciones aprendidas.',
      icon: '📚',
      color: 'info',
      path: '/knowledge-hub/historical-projects',
      features: [
        'Archivo inmutable de proyectos',
        'LMD y entregables finales',
        'Métricas de cierre del proyecto',
        'Sistema de etiquetas avanzado'
      ]
    },
    {
      id: 'standards',
      title: 'Estándares y Especificaciones',
      description: 'Repositorio centralizado de especificaciones de clientes, guías internas y normativas de la industria.',
      icon: '📋',
      color: 'success',
      path: '/knowledge-hub/standards',
      features: [
        'Especificaciones de clientes',
        'Guías y procedimientos internos',
        'Normativas externas (API, ASME, ISO)',
        'Control de versiones crítico'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      {/* Sections Grid */}
      <div className={styles.sectionsGrid}>
        {sections.map((section) => (
          <Card key={section.id} className={styles.sectionCard}>
            <div className={styles.sectionIcon} data-color={section.color}>
              {section.icon}
            </div>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <p className={styles.sectionDescription}>{section.description}</p>
            
            <ul className={styles.featureList}>
              {section.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              onClick={() => navigate(section.path)}
              className={styles.sectionButton}
            >
              Acceder a {section.title}
            </Button>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={styles.statsSection}>
        <h2 className={styles.statsTitle}>Estadísticas del Knowledge Hub</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>127</div>
            <div className={styles.statLabel}>Proyectos Archivados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>342</div>
            <div className={styles.statLabel}>Estándares de Clientes</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>89</div>
            <div className={styles.statLabel}>Guías Internas</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>156</div>
            <div className={styles.statLabel}>Normativas Externas</div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="ℹ️ Información de la Biblioteca Técnica"
        size="medium"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🎯 Propósito</h3>
            <p className={styles.modalText}>
              Esta herramienta centraliza y organiza toda la información técnica y documentación histórica 
              de proyectos para facilitar el acceso y consulta del equipo de trabajo.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>💡 Valor Estratégico</h3>
            <ul className={styles.modalList}>
              <li>Acceso rápido a documentación de proyectos anteriores</li>
              <li>Consulta de estándares y especificaciones técnicas</li>
              <li>Búsqueda inteligente en toda la base de conocimiento</li>
              <li>Preservación del conocimiento institucional</li>
              <li>Aceleración en el desarrollo de nuevos proyectos</li>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>⚙️ Funcionalidad</h3>
            <p className={styles.modalText}>
              La Biblioteca Técnica es una herramienta operativa diseñada para optimizar 
              el trabajo diario del equipo técnico, proporcionando acceso eficiente a 
              información histórica y estándares técnicos.
            </p>
          </div>

          <div className={styles.modalActions}>
            <Button 
              variant="primary" 
              onClick={() => setShowInfoModal(false)}
            >
              Entendido
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KnowledgeHubPage;

