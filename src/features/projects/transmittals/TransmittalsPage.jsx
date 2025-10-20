/**
 * TransmittalsPage - Sistema de Comunicación Formal
 * Canal formal para el envío y recepción de documentación
 * @module features/projects/transmittals/TransmittalsPage
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useLayout } from '../../../contexts/LayoutContext';
import { getProjectById } from '../../../services/projectsApi';
import Button from '../../../components/shared/Button';
import PageHeader from '../../../components/shared/PageHeader';
import ExportDropdown from '../../../components/shared/ExportDropdown';
import Tabs from '../../../components/shared/Tabs';
import InboxOutbox from './components/InboxOutbox';
import AllTransmittals from './components/AllTransmittals';
import CreateTransmittalModal from './components/CreateTransmittalModal';
import TransmittalDetailModal from './components/TransmittalDetailModal';
import useTransmittals from './hooks/useTransmittals';
import styles from './TransmittalsPage.module.css';

const TransmittalsPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProject, selectProject } = useProject();
  const { setHeader, clearHeader } = useLayout();
  const { transmittals, loading, error, refreshTransmittals } = useTransmittals(projectId);
  
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTransmittal, setSelectedTransmittal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // Load project info if not already loaded
    if (!selectedProject || selectedProject.id !== projectId) {
      loadProject();
    }
  }, [projectId]);

  // Handle opening a specific transmittal from URL parameter
  useEffect(() => {
    if (!loading && transmittals.length > 0) {
      const searchParams = new URLSearchParams(location.search);
      const transmittalIdToOpen = searchParams.get('open');
      
      if (transmittalIdToOpen) {
        const transmittal = transmittals.find(t => t.id === transmittalIdToOpen);
        if (transmittal) {
          // Set the correct tab based on transmittal type
          setActiveTab(transmittal.type === 'OUTGOING' ? 'outbox' : 'inbox');
          // Open the transmittal detail modal
          setSelectedTransmittal(transmittal);
          setIsDetailModalOpen(true);
          // Clean up the URL parameter
          navigate(`/projects/${projectId}/transmittals`, { replace: true });
        }
      }
    }
  }, [loading, transmittals, location.search, projectId, navigate]);

  // Memoize header content
  const headerContent = useMemo(() => {
    if (!selectedProject) return null;
    
    return (
      <PageHeader
        title="Transmittals"
        subtitle={`${selectedProject.name} · Comunicación Formal de Documentos`}
        backButton={{
          path: `/projects/${projectId}/dashboard`,
          label: 'Dashboard'
        }}
        actions={[
          {
            label: '📄 Ver LMD',
            variant: 'outline',
            onClick: () => navigate(`/projects/${projectId}/lmd`)
          },
          {
            label: '+ Nuevo Transmittal',
            variant: 'primary',
            onClick: () => setIsCreateModalOpen(true)
          }
        ]}
        actionsComponent={
          <ExportDropdown
            onExportPDF={() => console.log('Export Transmittals PDF')}
            onExportExcel={() => console.log('Export Transmittals Excel')}
          />
        }
      />
    );
  }, [selectedProject, projectId, navigate]);

  useEffect(() => {
    if (headerContent) {
      setHeader(headerContent);
    }
    return () => clearHeader();
  }, [headerContent, setHeader, clearHeader]);

  const loadProject = async () => {
    try {
      const response = await getProjectById(projectId);
      if (response.success) {
        selectProject(response.data);
      }
    } catch (err) {
      console.error('Error loading project:', err);
    }
  };

  const handleTransmittalClick = (transmittal) => {
    setSelectedTransmittal(transmittal);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTransmittal(null);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    refreshTransmittals();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando transmittals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>❌ {error}</p>
          <Button onClick={() => navigate(`/projects/${projectId}/dashboard`)}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const outgoingTransmittals = transmittals.filter(t => t.type === 'OUTGOING');
  const incomingTransmittals = transmittals.filter(t => t.type === 'INCOMING');

  return (
    <div className={styles.container}>
      {/* Inbox/Outbox Tabs */}
      <div className={styles.tabsContainer}>
        <Tabs
          tabs={[
            { 
              id: 'all', 
              label: `📋 Todos los Transmittals (${transmittals.length})` 
            },
            { 
              id: 'outbox', 
              label: `📤 Bandeja de Salida (${outgoingTransmittals.length})` 
            },
            { 
              id: 'inbox', 
              label: `📥 Bandeja de Entrada (${incomingTransmittals.length})` 
            }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'all' ? (
          <AllTransmittals
            transmittals={transmittals}
            onTransmittalClick={handleTransmittalClick}
          />
        ) : (
          <InboxOutbox
            type={activeTab === 'outbox' ? 'OUTGOING' : 'INCOMING'}
            transmittals={activeTab === 'outbox' ? outgoingTransmittals : incomingTransmittals}
            onTransmittalClick={handleTransmittalClick}
          />
        )}
      </div>

      {/* Create Transmittal Modal */}
      <CreateTransmittalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        projectId={projectId}
      />

      {/* Transmittal Detail Modal */}
      <TransmittalDetailModal
        transmittal={selectedTransmittal}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default TransmittalsPage;

