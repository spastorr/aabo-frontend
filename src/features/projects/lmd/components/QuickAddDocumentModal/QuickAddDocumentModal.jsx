/**
 * QuickAddDocumentModal - Minimal modal to add an item to LMD (no uploads)
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import Input from '../../../../../components/shared/Input';
import Select from '../../../../../components/shared/Select';
import { createDocument, getDocumentsByProject } from '../../../../../services/documentsApi';
// PETRO constants provide discipline/type catalogs for code generation
import { PETRO_DISCIPLINE_OPTIONS, PETRO_DISCIPLINE_TO_TYPES } from '../../../../../constants/petroCodes';
import { getAvailableTeamMembers } from '../../../../../services/resourcesApi';
import styles from './QuickAddDocumentModal.module.css';
import { getProjects } from '../../../../../services/projectsApi';

const QuickAddDocumentModal = ({ isOpen, onClose, onSuccess, projectId, projectCode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    code: '',
    name: '',
    responsible: '',
    description: '',
    cost: '',
  });
  const [existingDocs, setExistingDocs] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');
  // PETROECUADOR assistant fields
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');
  const [discipline, setDiscipline] = useState(''); // numeric string code like '70'
  const [typeCode, setTypeCode] = useState(''); // numeric string code like '79' or two-digit codes per discipline
  const [sequence, setSequence] = useState('1');
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('manual');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [hoursWorked, setHoursWorked] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [estimatedStartDate, setEstimatedStartDate] = useState('');
  const [estimatedFinishDate, setEstimatedFinishDate] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [userEditedDuration, setUserEditedDuration] = useState(false);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedSourceProject, setSelectedSourceProject] = useState('');
  const [sourceProjectDocs, setSourceProjectDocs] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [isProjectSearchOpen, setIsProjectSearchOpen] = useState(false);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [projectSearchType, setProjectSearchType] = useState('');
  const [dependsOnDocument, setDependsOnDocument] = useState('');
  const [availableDocuments, setAvailableDocuments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setForm({ code: '', name: '', responsible: '', description: '', cost: '' });
      setGeneratedCode('');
      setProject(String(projectCode || '').split('-')[0] || '');
      setLocation('');
      setDiscipline('');
      setTypeCode('');
      setSequence('1');
      setSelectedSourceProject('');
      setSourceProjectDocs([]);
      setSelectedDocs([]);
      setProjectSearchTerm('');
      setProjectSearchType('');
      setDependsOnDocument('');
      setAvailableDocuments([]);
      // Load existing documents for sequence calculation
      if (projectId) {
        getDocumentsByProject(projectId)
          .then(res => { 
            if (res?.success) {
              const docs = res.data || [];
              setExistingDocs(docs);
              // Set available documents for dependency selection
              setAvailableDocuments(docs.filter(doc => doc.status !== 'CANCELADO' && doc.status !== 'FINALIZADO'));
            }
          })
          .catch(() => {
            setExistingDocs([]);
            setAvailableDocuments([]);
          });
        // Load available team members for Responsable select
        getAvailableTeamMembers(projectId)
          .then(res => { if (res?.success) setTeamMembers(res.data || []); })
          .catch(() => setTeamMembers([]));
      }
      // Load available projects for import
      getProjects()
        .then(res => { if (res?.success) setAvailableProjects(res.data || []); })
        .catch(() => setAvailableProjects([]));
    }
  }, [isOpen, projectCode, projectId]);

  // Extract last numeric group from a document code, e.g. ...-001 -> 1
  const extractSequence = (code) => {
    if (!code) return null;
    const parts = String(code).split('-');
    for (let i = parts.length - 1; i >= 0; i--) {
      const part = parts[i];
      if (/^\d{1,4}$/.test(part)) {
        return parseInt(part, 10);
      }
    }
    return null;
  };

  // Dependent Tipo options by Disciplina (subset aligned to Diseño.html)
  const getTypeOptions = () => PETRO_DISCIPLINE_TO_TYPES[discipline] || [];

  const computeNextSequenceByCode = (disciplineCode) => {
    if (!disciplineCode) return 1;
    const sequences = (existingDocs || [])
      .map(d => String(d.code || ''))
      .filter(code => code.split('-')[2] === disciplineCode)
      .map(code => extractSequence(code))
      .filter(n => Number.isFinite(n));
    if (sequences.length === 0) return 1;
    return Math.max(...sequences) + 1;
  };

  const handleGenerate = () => {
    if (!project || !location || !discipline || !typeCode) {
      setError('Completa: Proyecto, Locación, Disciplina y Tipo');
      return;
    }
    const seqNum = Math.max(1, parseInt(sequence, 10) || 1);
    const seqStr = String(seqNum).padStart(3, '0');
    const code = `${project}-${location}-${discipline}-${seqStr}-A`;
    setGeneratedCode(code);
    setForm(prev => ({ ...prev, code }));
    setError(null);
  };

  const handleAuto = () => {
    if (!project || !location || !discipline || !typeCode) {
      setError('Completa: Proyecto, Locación, Disciplina y Tipo');
      return;
    }
    const nextSeq = computeNextSequenceByCode(discipline);
    setSequence(String(nextSeq));
    const seqStr = String(nextSeq).padStart(3, '0');
    const code = `${project}-${location}-${discipline}-${seqStr}-A`;
    setGeneratedCode(code);
    setForm(prev => ({ ...prev, code }));
    setError(null);
  };

  // Update rate when responsible changes (if we know the member)
  useEffect(() => {
    if (!form.responsible) return;
    const member = (teamMembers || []).find(m => m.name === form.responsible);
    if (member && Number.isFinite(Number(member.costRate))) {
      setHourlyRate(String(member.costRate));
    }
  }, [form.responsible, teamMembers]);

  const computedCost = (() => {
    const h = parseFloat(hoursWorked);
    const r = parseFloat(hourlyRate);
    if (!Number.isFinite(h) || !Number.isFinite(r)) return 0;
    return Math.max(0, h * r);
  })();

  const handleProjectChange = (projectId) => {
    setSelectedSourceProject(projectId);
    if (projectId) {
      getDocumentsByProject(projectId)
        .then(res => { if (res?.success) setSourceProjectDocs(res.data || []); })
        .catch(() => setSourceProjectDocs([]));
    } else {
      setSourceProjectDocs([]);
    }
    setSelectedDocs([]);
  };

  const handleDependencyChange = (documentId) => {
    setDependsOnDocument(documentId);
    
    if (documentId) {
      // Find the dependent document
      const dependentDoc = availableDocuments.find(doc => doc.id === documentId);
      if (dependentDoc && dependentDoc.estimatedFinishDate) {
        // Set start date to the day after the dependent document's finish date
        const finishDate = new Date(dependentDoc.estimatedFinishDate);
        finishDate.setDate(finishDate.getDate() + 1);
        const startDate = finishDate.toISOString().split('T')[0];
        setEstimatedStartDate(startDate);
        
        // Recalculate finish date if duration is set
        if (durationDays && !userEditedDuration) {
          const duration = parseInt(durationDays, 10);
          if (duration > 0) {
            const newFinishDate = new Date(finishDate);
            newFinishDate.setDate(newFinishDate.getDate() + duration - 1);
            const finishDateStr = newFinishDate.toISOString().split('T')[0];
            setEstimatedFinishDate(finishDateStr);
          }
        }
      } else if (dependentDoc && !dependentDoc.estimatedFinishDate) {
        // Show warning if dependent document doesn't have finish date
        setError('El documento seleccionado no tiene fecha de finalización estimada. Las fechas no se ajustarán automáticamente.');
      }
    } else {
      // Clear error when no dependency is selected
      setError(null);
    }
  };

  const handleDocToggle = (docId) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleProjectSelect = (projectId) => {
    setSelectedSourceProject(projectId);
    setIsProjectSearchOpen(false);
    handleProjectChange(projectId);
  };

  const filteredProjects = (availableProjects || [])
    .filter(p => p.id !== projectId)
    .filter(p => {
      const matchesSearch = !projectSearchTerm || 
        p.name.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(projectSearchTerm.toLowerCase());
      const matchesType = !projectSearchType || p.status === projectSearchType;
      return matchesSearch && matchesType;
    });

  // Default suggested durations by tipo (fallbacks by disciplina)
  const DEFAULT_DURATIONS_DAYS = {
    // Tipo codes
    '79': 10, // Diagramas Unifilares
    '75': 8,  // Cableado
    '53': 12, // Isométricos
    '54': 7,  // Detalle de Tubería
    '55': 10, // Arreglo de Tubería
    '11': 7,  // Diagrama de Flujo
    '12': 10, // Balance de Masas
    '60': 8,  // I&C General
    // Disciplina fallbacks (when no tipo match)
    '70*': 10, // Eléctrica
    '50*': 10, // Tubería
    '01*': 8,  // Procesos
    '60*': 9,  // I&C
    '30*': 12, // Civil
    '05*': 5,  // Gestión / LMD
  };

  // Suggest duration when tipo or disciplina changes (unless user edited)
  useEffect(() => {
    if (!typeCode && !discipline) return;
    if (userEditedDuration) return;
    let suggested = null;
    if (typeCode && DEFAULT_DURATIONS_DAYS[typeCode]) {
      suggested = DEFAULT_DURATIONS_DAYS[typeCode];
    } else if (discipline && DEFAULT_DURATIONS_DAYS[`${discipline}*`]) {
      suggested = DEFAULT_DURATIONS_DAYS[`${discipline}*`];
    }
    if (suggested != null) {
      setDurationDays(String(suggested));
    }
  }, [typeCode, discipline, userEditedDuration]);

  // Recalculate finish date when start or duration changes
  useEffect(() => {
    const d = parseInt(durationDays, 10);
    if (!estimatedStartDate || !Number.isFinite(d) || d <= 0) return;
    const start = new Date(estimatedStartDate);
    const finish = new Date(start);
    // duration in days; if duration=1, finish=start
    finish.setDate(start.getDate() + (d - 1));
    const yyyy = finish.getFullYear();
    const mm = String(finish.getMonth() + 1).padStart(2, '0');
    const dd = String(finish.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;
    setEstimatedFinishDate(iso);
  }, [estimatedStartDate, durationDays]);

  const validate = () => {
    // Only validate manual form fields when in manual tab
    if (activeTab === 'manual') {
      if (!generatedCode || !form.name) {
        return 'Completa: Código y Nombre';
      }
      if (!/^[A-Za-z0-9-_.]+$/.test(generatedCode)) {
        return 'Código inválido';
      }
    }
    
    // Validate import selections
    if (activeTab === 'fromProject') {
      if (selectedDocs.length === 0) {
        return 'Selecciona al menos un documento para importar';
      }
    }
    
    // Only validate dates for manual tab
    if (activeTab === 'manual') {
      if (!estimatedStartDate || !estimatedFinishDate) {
        return 'Completa: Fechas estimadas de elaboración e inicio/fin';
      }
      if (new Date(estimatedFinishDate) < new Date(estimatedStartDate)) {
        return 'La fecha de finalización debe ser posterior a la fecha de elaboración';
      }
    }
    return null;
  };

  const handleCreate = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      if (activeTab === 'manual') {
        // Create single document manually
        await createDocument(projectId, {
          code: String(generatedCode).trim(),
          name: String(form.name).trim(),
          discipline: discipline || '',
          type: typeCode || '',
          responsible: String(form.responsible || ''),
          description: String(form.description || ''),
          cost: Number.isFinite(computedCost) ? Number(computedCost) : 0,
          plannedStartDate: estimatedStartDate,
          plannedFinishDate: estimatedFinishDate,
          currentRevision: 'A',
          revision: 'A',
          status: 'ELB',
        });
      } else if (activeTab === 'fromProject') {
        // Import multiple documents from selected project
        const documentsToImport = sourceProjectDocs.filter(doc => selectedDocs.includes(doc.id));
        
        for (const doc of documentsToImport) {
          await createDocument(projectId, {
            code: doc.code,
            name: doc.name,
            discipline: doc.discipline || '',
            type: doc.type || '',
            responsible: doc.responsible || '',
            description: doc.description || '',
            cost: doc.cost || 0,
            plannedStartDate: doc.plannedStartDate || estimatedStartDate,
            plannedFinishDate: doc.plannedFinishDate || estimatedFinishDate,
            currentRevision: 'A',
            revision: 'A',
            status: 'ELB',
          });
        }
      }
      
      onSuccess?.();
      onClose();
    } catch (e) {
      setError('Error al procesar los documentos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar Documento al Listado Maestro"
      size="large"
      headerActions={
        <button
          type="button"
          onClick={() => setIsHelpOpen(true)}
          title="Información de ayuda"
          style={{
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-background)',
            color: 'var(--color-primary)',
            cursor: 'pointer',
            fontSize: 16
          }}
          aria-label="Información de ayuda"
        >
          i
        </button>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="primary" onClick={handleCreate} disabled={loading}>Agregar al listado</Button>
        </>
      }
    >
      <div style={{ marginBottom: 12, fontSize: 12, color: '#666' }}>
        Esta sección permite registrar rápidamente un documento en la LMD. No realiza carga de archivos ni gestiona versiones.
      </div>
      {error && <div style={{ marginBottom: 12, color: '#b00020' }}>{error}</div>}
      <div style={{ display: 'grid', gap: 12 }}>
        {/* Tabs for add/import */}
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`${styles.tabButton} ${((typeof activeTab !== 'undefined' ? activeTab : 'manual') === 'manual') ? styles.tabActive : ''}`}
          >
            Agregar manualmente
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('excel')}
            className={`${styles.tabButton} ${activeTab === 'excel' ? styles.tabActive : ''}`}
          >
            Importar desde Excel
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fromProject')}
            className={`${styles.tabButton} ${activeTab === 'fromProject' ? styles.tabActive : ''}`}
          >
            Importar desde proyecto existente
          </button>
        </div>

        {/* Manual tab content */}
        {((typeof activeTab === 'undefined') || activeTab === 'manual') && (
          <>
            <div className={styles.sectionTitle}>Generador de Código Estandarizado (PETROECUADOR)</div>
            <div className={styles.grid2}>
              <Input label="Proyecto *" value={project} onChange={(e) => setProject(e.target.value)} placeholder="B18PA003A" />
              <div className={styles.helperText}>Identificador oficial del proyecto.</div>
              <Input label="Ubicación *" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="ZPF" />
              <div className={styles.helperText}>Área o ubicación del proyecto.</div>
            </div>
            <div className={styles.grid2}>
        <Select
          label="Disciplina *"
                name="discipline_code"
                value={discipline}
                onChange={(e) => { setDiscipline(e.target.value); setTypeCode(''); setUserEditedDuration(false); }}
                options={[{ value: '', label: 'Selecciona' }].concat(PETRO_DISCIPLINE_OPTIONS
                  .filter(opt => opt.value.length === 2)
                )}
              />
              <div className={styles.helperText}>Departamento responsable (código de 2 dígitos).</div>
              <Select
                label="Tipo de documento *"
                name="type_code"
                value={typeCode}
                onChange={(e) => { setTypeCode(e.target.value); setUserEditedDuration(false); }}
                options={[{ value: '', label: 'Selecciona' }].concat(getTypeOptions().map(t => ({ value: t.code, label: `${t.code} - ${t.label}` })))}
              />
              <div className={styles.helperText}>Tipo específico dentro de la disciplina.</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <Input label="Número de Secuencia" type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
              <Button variant="secondary" onClick={handleGenerate}>Generar</Button>
              <Button variant="primary" onClick={handleAuto}>Auto</Button>
            </div>
            <div className={styles.helperText}>Secuencia de 3 dígitos (Auto sugiere la siguiente disponible).</div>
            <Input label="Código generado *" value={generatedCode} onChange={() => {}} placeholder="Se generará con Generar/Auto" disabled />
            <div className={styles.helperText}>Formato: [Proyecto]-[Locación]-[CódigoDisciplina]-[Secuencial de 3 dígitos]-[Revisión].</div>

            <div className={styles.sectionTitle}>Datos del documento</div>
            <Input label="Descripción / Nombre *" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} placeholder="Nombre del documento" />
            <div className={styles.helperText}>Título descriptivo del documento.</div>
        <Select
              label="Responsable"
              name="responsible"
              value={form.responsible}
              onChange={(e) => setForm(prev => ({ ...prev, responsible: e.target.value }))}
              options={[{ value: '', label: 'Selecciona' }].concat(
                (teamMembers || []).map(m => ({ value: m.name, label: `${m.name} (${m.discipline})` }))
              )}
            />
            <div className={styles.helperText}>Selecciona de los recursos disponibles asignados al proyecto.</div>
        <Input label="Descripción" value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} />
            <div className={styles.helperText}>Resumen breve del contenido o alcance.</div>
            <div className={styles.sectionTitle}>Dependencias del documento</div>
            <div className={styles.formGroup}>
              <Select
                label="Depende de otro documento"
                value={dependsOnDocument}
                onChange={(value) => handleDependencyChange(value)}
                options={[
                  { value: '', label: 'Sin dependencias' },
                  ...availableDocuments.map(doc => ({
                    value: doc.id,
                    label: `${doc.code} - ${doc.name} (Fin: ${doc.estimatedFinishDate ? new Date(doc.estimatedFinishDate).toLocaleDateString() : 'Sin fecha'})`
                  }))
                ]}
                placeholder="Selecciona un documento"
              />
              <div className={styles.helperText}>
                {dependsOnDocument 
                  ? 'La fecha de inicio se ajustará automáticamente al día siguiente de la finalización del documento dependiente.'
                  : 'Opcional: Selecciona un documento del cual depende este documento para que las fechas se ajusten automáticamente.'
                }
              </div>
            </div>
            <div className={styles.sectionTitle}>Fechas para el cronograma</div>
            <div className={styles.grid3}>
              <Input type="date" label="Inicio (estimado) *" value={estimatedStartDate} onChange={(e) => setEstimatedStartDate(e.target.value)} />
              <Input type="number" label="Duración estimada (días)" value={durationDays} onChange={(e) => { setDurationDays(e.target.value); setUserEditedDuration(true); }} placeholder="10" />
              <Input type="date" label="Fin (estimado) *" value={estimatedFinishDate} onChange={(e) => setEstimatedFinishDate(e.target.value)} />
            </div>
            <div className={styles.helperText}>La duración se sugiere según el tipo, pero puedes editarla. Fin se recalcula desde Inicio + Duración.</div>
            <div className={styles.sectionTitle}>Costo estimado</div>
            <div className={styles.grid2}>
              <div>
                <Input type="number" label="Horas trabajadas" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} placeholder="7" />
                <div className={styles.fieldLabel}>Tiempo estimado de trabajo</div>
              </div>
              <div>
                <Input type="number" label="Costo por hora (USD)" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="70" />
                <div className={styles.fieldLabel}>Tarifa del recurso asignado</div>
              </div>
            </div>
            <div className={styles.costSummary}>
              <div className={styles.costCalculation}>
                <span className={styles.costLabel}>Cálculo:</span>
                <span className={styles.costFormula}>
                  {Number(hoursWorked || 0)} horas × ${(Number(hourlyRate || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por hora
                </span>
              </div>
              <div className={styles.costTotal}>
                <span className={styles.costLabel}>Costo total:</span>
                <span className={styles.costAmount}>
                  ${(Number((parseFloat(hoursWorked)||0) * (parseFloat(hourlyRate)||0)) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className={styles.helperText}>Valores por defecto: Revisión A, Estado En Elaboración (ELB), Costo $0, Fechas sin especificar.</div>
          </>
        )}

        {/* Import from Excel tab */}
        {activeTab === 'excel' && (
          <div style={{ display: 'grid', gap: 12 }}>
            <div className={styles.sectionTitle}>Importar desde Excel</div>
            <div className={styles.helperText}>Carga una plantilla con columnas: Código, Nombre, Disciplina, Tipo de documento, Responsable, Inicio, Fin, Duración (días), Horas, Tarifa, Descripción.</div>
            <Input type="file" label="Archivo Excel (.xlsx)" onChange={() => {}} />
            <div className={styles.fileActions}>
              <Button variant="secondary">Descargar plantilla</Button>
              <Button variant="primary">Procesar archivo</Button>
            </div>
          </div>
        )}

        {/* Import from existing project tab */}
        {activeTab === 'fromProject' && (
          <div style={{ display: 'grid', gap: 12 }}>
            <div className={styles.sectionTitle}>Importar desde proyecto existente</div>
            <div className={styles.helperText}>Selecciona un proyecto y documentos para copiar su información al LMD actual.</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Select
                  label="Proyecto origen"
                  value={selectedSourceProject}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  options={[{ value: '', label: 'Selecciona un proyecto' }].concat(
                    (availableProjects || []).filter(p => p.id !== projectId).map(p => ({ 
                      value: p.id, 
                      label: `${p.code} - ${p.name}` 
                    }))
                  )}
                />
              </div>
              <Button variant="outline" onClick={() => setIsProjectSearchOpen(true)}>
                🔍 Buscar
              </Button>
            </div>
            <div className={styles.fileActions}>
              <Button variant="primary" disabled={selectedDocs.length === 0}>Importar seleccionados ({selectedDocs.length})</Button>
            </div>
            
            {/* Show project documents when project is selected */}
            {selectedSourceProject && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Documentos de {availableProjects.find(p => p.id === selectedSourceProject)?.name || 'proyecto seleccionado'}:
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: 8 }}>
                  {sourceProjectDocs.length === 0 ? (
                    <div style={{ padding: 16, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                      No hay documentos en este proyecto
                    </div>
                  ) : (
                    sourceProjectDocs.map(doc => (
                      <div key={doc.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '8px 0', 
                        borderBottom: '1px solid var(--color-border)' 
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedDocs.includes(doc.id)}
                          onChange={() => handleDocToggle(doc.id)}
                          style={{ marginRight: 8 }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{doc.code}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{doc.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                            {doc.discipline} • {doc.type} • Rev. {doc.revision}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Removed duplicate manual section below tabs */}
      </div>

      {/* Help small modal */}
      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="📋 Ayuda: Agregar documento"
        size="large"
      >
        <div style={{ fontSize: 14, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
          <div style={{ 
            fontWeight: 700, 
            marginBottom: 12, 
            fontSize: 16,
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            🎯 Objetivo
          </div>
          <div style={{ 
            marginBottom: 20, 
            padding: 12,
            backgroundColor: 'var(--color-background-alt)',
            borderRadius: 8,
            border: '1px solid var(--color-border)'
          }}>
            Registrar un documento en la LMD sin subir archivos ni gestionar revisiones.
          </div>
          
          <div style={{ 
            fontWeight: 700, 
            marginBottom: 10, 
            fontSize: 16,
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            📝 Pasos
          </div>
          <div style={{ 
            display: 'grid', 
            gap: 8, 
            marginBottom: 20,
            padding: 16,
            backgroundColor: 'var(--color-background-alt)',
            borderRadius: 8,
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>1.</span>
              <span>Complete <strong>Proyecto</strong>, <strong>Locación</strong>, <strong>Disciplina</strong> y luego el <strong>Tipo</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>2.</span>
              <span>Defina <strong>Secuencia</strong> y use "Generar", o presione "Auto" para sugerir la siguiente.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>3.</span>
              <span>Revise el código generado: <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: 4 }}>[Proyecto]-[Locación]-[CódigoDisciplina]-[Secuencial]-A</code></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>4.</span>
              <span>Complete <strong>Nombre</strong> y, opcionalmente, <strong>Responsable</strong> y <strong>Descripción</strong>.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>5.</span>
              <span><strong>🔗 Dependencias:</strong> Seleccione un documento del cual depende este documento para que las fechas se ajusten automáticamente.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>6.</span>
              <span><strong>📅 Fechas:</strong> Establezca fechas de inicio y fin, o deje que se calculen automáticamente según las dependencias.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>7.</span>
              <span><strong>💰 Costo:</strong> Ingrese las horas trabajadas y el costo por hora para calcular el costo total automáticamente.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)', minWidth: '20px' }}>8.</span>
              <span><strong>💾 Guarde</strong> para crear el ítem en la LMD (Revisión A, Estado ELB).</span>
            </div>
          </div>
          
          <div style={{ 
            fontWeight: 700, 
            marginBottom: 10, 
            fontSize: 16,
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            ⚡ Funcionalidades
          </div>
          <div style={{ 
            display: 'grid', 
            gap: 10, 
            marginBottom: 20,
            padding: 16,
            backgroundColor: 'var(--color-background-alt)',
            borderRadius: 8,
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🔗</span>
              <div>
                <strong>Dependencias:</strong> Vincula automáticamente la fecha de inicio con la finalización del documento dependiente.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🧮</span>
              <div>
                <strong>Cálculo de costos:</strong> Multiplica horas trabajadas × costo por hora para obtener el total.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 16 }}>📅</span>
              <div>
                <strong>Fechas automáticas:</strong> Si hay dependencia, la fecha de inicio se ajusta al día siguiente de la finalización del documento dependiente.
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 16 }}>⏱️</span>
              <div>
                <strong>Recálculo de duración:</strong> Si hay duración establecida, la fecha de fin se recalcula automáticamente.
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: 16, 
            padding: 12,
            backgroundColor: 'var(--color-background-alt)',
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            fontSize: 12, 
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic'
          }}>
            📁 La carga de archivos y control de versiones se realiza en la sección de gestión de documentos.
          </div>
        </div>
      </Modal>

      {/* Project documents modal */}
      <Modal
        isOpen={isProjectSelectorOpen}
        onClose={() => setIsProjectSelectorOpen(false)}
        title={`Documentos de ${availableProjects.find(p => p.id === selectedSourceProject)?.name || 'proyecto seleccionado'}`}
        size="large"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsProjectSelectorOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => setIsProjectSelectorOpen(false)} disabled={selectedDocs.length === 0}>
              Confirmar selección ({selectedDocs.length})
            </Button>
          </>
        }
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Documentos disponibles:</div>
          <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: 8 }}>
            {sourceProjectDocs.length === 0 ? (
              <div style={{ padding: 16, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No hay documentos en este proyecto
              </div>
            ) : (
              sourceProjectDocs.map(doc => (
                <div key={doc.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 0', 
                  borderBottom: '1px solid var(--color-border)' 
                }}>
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => handleDocToggle(doc.id)}
                    style={{ marginRight: 8 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{doc.code}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{doc.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                      {doc.discipline} • {doc.type} • Rev. {doc.revision}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      {/* Project search modal */}
      <Modal
        isOpen={isProjectSearchOpen}
        onClose={() => setIsProjectSearchOpen(false)}
        title="Buscar proyectos"
        size="large"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsProjectSearchOpen(false)}>Cancelar</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input
              label="Buscar por nombre o código"
              value={projectSearchTerm}
              onChange={(e) => setProjectSearchTerm(e.target.value)}
              placeholder="Ej: Refinería, B43..."
            />
            <Select
              label="Tipo de proyecto"
              value={projectSearchType}
              onChange={(e) => setProjectSearchType(e.target.value)}
              options={[
                { value: '', label: 'Todos los proyectos' },
                { value: 'ACTIVE', label: 'Proyectos activos' },
                { value: 'COMPLETED', label: 'Proyectos históricos' },
                { value: 'ON_HOLD', label: 'Proyectos en pausa' }
              ]}
            />
          </div>
          
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Proyectos encontrados ({filteredProjects.length}):
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: 8 }}>
            {filteredProjects.length === 0 ? (
              <div style={{ padding: 16, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No se encontraron proyectos
              </div>
            ) : (
              filteredProjects.map(project => (
                <div key={project.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '12px 0', 
                  borderBottom: '1px solid var(--color-border)' 
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{project.code}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{project.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                      {project.status === 'ACTIVE' ? 'Proyecto activo' : 
                       project.status === 'COMPLETED' ? 'Proyecto histórico' : 
                       project.status === 'ON_HOLD' ? 'Proyecto en pausa' : project.status}
                    </div>
                  </div>
                  <Button variant="primary" onClick={() => handleProjectSelect(project.id)}>
                    Seleccionar
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

QuickAddDocumentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  projectId: PropTypes.string,
  projectCode: PropTypes.string,
};

export default QuickAddDocumentModal;



