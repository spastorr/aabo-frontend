/**
 * StandardsPage - Repository of standards and specifications
 * @module features/knowledgeHub/standards/StandardsPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../../../contexts/LayoutContext';
import PageHeader from '../../../components/shared/PageHeader';
import Modal from '../../../components/shared/Modal';
import Button from '../../../components/shared/Button';
import Tabs from '../../../components/shared/Tabs';
import ClientStandards from './components/ClientStandards';
import InternalGuides from './components/InternalGuides';
import ExternalNorms from './components/ExternalNorms';
import UploadStandardModal from './components/UploadStandardModal';
import styles from './StandardsPage.module.css';

const StandardsPage = () => {
  const navigate = useNavigate();
  const { setHeader, clearHeader } = useLayout();
  const [activeTab, setActiveTab] = useState('client');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Memoize header content
  const headerContent = useMemo(() => (
    <PageHeader
      title="📋 Estándares y Especificaciones"
      subtitle="Repositorio centralizado de especificaciones de clientes, guías internas y normativas de la industria"
      backButton={{
        path: '/knowledge-hub',
        label: 'Knowledge Hub'
      }}
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

  // Get upload button text based on active tab
  const getUploadButtonText = () => {
    switch (activeTab) {
      case 'client':
        return '➕ Subir Especificación';
      case 'internal':
        return '➕ Crear Guía';
      case 'external':
        return '➕ Agregar Normativa';
      default:
        return '➕ Subir Documento';
    }
  };

  return (
    <div className={styles.container}>
      {/* Main Content - Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsHeader}>
          <Tabs
            tabs={[
              { id: 'client', label: '📄 Especificaciones de Clientes' },
              { id: 'internal', label: '📚 Guías Internas' },
              { id: 'external', label: '🌐 Normativas Externas' }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <Button
            variant="primary"
            onClick={() => setShowUploadModal(true)}
          >
            {getUploadButtonText()}
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'client' && <ClientStandards />}
        {activeTab === 'internal' && <InternalGuides />}
        {activeTab === 'external' && <ExternalNorms />}
      </div>

      {/* Info Modal */}
      <Modal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title="ℹ️ Información - Estándares y Especificaciones"
        size="medium"
      >
        <div className={styles.modalContent}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🎯 Función</h3>
            <p className={styles.modalText}>
              Repositorio centralizado de especificaciones de clientes, guías internas de procedimientos 
              y normativas de la industria (API, ASME, ISO, etc.). Sistema de control de versiones crítico 
              que garantiza acceso a documentación actualizada y elimina uso de información obsoleta.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>🔒 Acceso a la Última Versión Siempre</h3>
            <p className={styles.modalText}>
              El sistema gestiona automáticamente las versiones de cada documento. Cuando se recibe una actualización, 
              la nueva versión se marca como "Activa" y se notifica a los equipos pertinentes. Las versiones anteriores 
              se archivan con acceso de solo lectura, eliminando el riesgo de usar información obsoleta.
            </p>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>📋 Categorías del Repositorio</h3>
            <ul className={styles.modalList}>
              <li><strong>Especificaciones de Clientes:</strong> Estándares específicos por cliente organizados por tipo de proyecto</li>
              <li><strong>Guías Internas:</strong> Procedimientos de diseño, cálculo, modelado y gestión documental de AABO</li>
              <li><strong>Normativas Externas:</strong> Estándares de la industria (API, ASME, ISO) con control de versión activa</li>
            </ul>
          </div>

          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>⚙️ Capacidades del Sistema</h3>
            <ul className={styles.modalList}>
              <li><strong>Control de versiones crítico:</strong> Garantiza que todos trabajen con las especificaciones más recientes</li>
              <li><strong>Búsqueda inteligente:</strong> Encuentra cualquier estándar o especificación en segundos</li>
              <li><strong>Vinculación automática:</strong> Proyectos se vinculan a versiones activas de estándares aplicables</li>
              <li><strong>Trazabilidad completa:</strong> Historial de cambios y notificaciones de actualizaciones</li>
              <li><strong>Archivo de versiones:</strong> Acceso de solo lectura a versiones anteriores para referencia</li>
            </ul>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadStandardModal
          type={activeTab}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default StandardsPage;

