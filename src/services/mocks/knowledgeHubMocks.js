/**
 * Knowledge Hub mock data
 * @module services/mocks/knowledgeHubMocks
 */

// Historical Projects Mock Data
const mockHistoricalProjects = [
  {
    id: 'proj-001',
    code: 'PTR-REF-2020',
    name: 'Refinería Esmeraldas - Expansión de Capacidad',
    client: 'EP Petroecuador',
    type: 'REFINERY',
    status: 'COMPLETED',
    description: 'Proyecto de expansión de capacidad de procesamiento de crudo de 110,000 a 175,000 barriles por día',
    startDate: '2020-01-15',
    endDate: '2021-12-20',
    completionDate: '2021-12-20',
    duration: 23,
    budget: 3500000,
    spent: 3450000,
    finalCost: 3450000,
    progress: 100,
    documents: 342,
    transmittals: 89,
    rfis: 45,
    disciplines: ['Procesos', 'Mecánica', 'Eléctrica', 'Instrumentación & Control', 'Civil'],
    teamMembers: 28,
    tags: ['refinería', 'expansión', 'alta presión', 'crudo pesado'],
    successRate: 95,
    lessonsLearned: [
      'La implementación temprana del sistema de control distribuido (DCS) en conjunto con el diseño de proceso mejoró significativamente los tiempos de comisionamiento, reduciendo el periodo de arranque en 3 semanas respecto al cronograma original',
      'La coordinación estrecha con el cliente durante la fase de ingeniería básica, con reuniones semanales de revisión técnica, redujo drásticamente los cambios tardíos en el proyecto. Solo se registraron 5 órdenes de cambio menores vs. las 15-20 típicas en proyectos similares',
      'El uso intensivo de modelado 3D con software Plant 3D permitió detectar y resolver 47 interferencias potenciales antes de la construcción, evitando retrabajos costosos en campo. La inversión en modelado se recuperó 3 veces durante la ejecución',
      'La estrategia de mantener un equipo core estable durante todo el proyecto (85% de retención) resultó en mejor continuidad técnica y menor tiempo de curva de aprendizaje, mejorando la calidad de los entregables',
      'Las sesiones de HAZOP realizadas en 3 fases (básica, detallada, pre-arranque) con participación del cliente identificaron 23 situaciones de riesgo críticas que fueron mitigadas en diseño, evitando modificaciones post-construcción',
      'La implementación de un sistema de gestión documental cloud desde el inicio facilitó la colaboración entre equipos multidisciplinarios distribuidos en 3 ciudades diferentes, mejorando los tiempos de revisión en un 40%'
    ],
    lmd: [
      { id: '1', code: 'PTR-REF-2020-PRO-001', name: 'Diagrama de Flujo de Proceso General (PFD)', discipline: 'PROCESSES', status: 'APR', revision: 'C', approvalDate: '2021-11-15', sendDate: '2021-10-20', responsible: 'Carlos Mendoza', type: 'Plano', cost: 8500, description: 'Diagrama de flujo de proceso general mostrando todas las unidades principales de la refinería', currentFiles: { pdf: { url: '/docs/PTR-REF-2020-PRO-001-C.pdf', name: 'PTR-REF-2020-PRO-001_Rev-C.pdf', size: '2.3 MB' }, editable: { url: '/docs/PTR-REF-2020-PRO-001-C.dwg', name: 'PTR-REF-2020-PRO-001_Rev-C.dwg', type: 'dwg', size: '1.8 MB' } } },
      { id: '2', code: 'PTR-REF-2020-PRO-002', name: 'Diagramas de Tuberías e Instrumentación (P&ID)', discipline: 'PROCESSES', status: 'APR', revision: 'D', approvalDate: '2021-11-20', sendDate: '2021-10-15', responsible: 'María González', type: 'Plano', cost: 12000, description: 'P&IDs completos de todas las áreas de proceso', currentFiles: { pdf: { url: '/docs/PTR-REF-2020-PRO-002-D.pdf', name: 'PTR-REF-2020-PRO-002_Rev-D.pdf', size: '8.5 MB' }, editable: { url: '/docs/PTR-REF-2020-PRO-002-D.dwg', name: 'PTR-REF-2020-PRO-002_Rev-D.dwg', type: 'dwg', size: '4.2 MB' } } },
      { id: '3', code: 'PTR-REF-2020-PRO-003', name: 'Balance de Masa y Energía', discipline: 'PROCESSES', status: 'APR', revision: 'B', approvalDate: '2021-10-30', sendDate: '2021-09-28', responsible: 'Carlos Mendoza', type: 'Cálculo', cost: 6500, description: 'Balance completo de masa y energía del proceso' },
      { id: '4', code: 'PTR-REF-2020-PRO-004', name: 'Memorias de Cálculo de PSV', discipline: 'PROCESSES', status: 'APR', revision: 'C', approvalDate: '2021-11-10', sendDate: '2021-10-05', responsible: 'Roberto Silva', type: 'Cálculo', cost: 7200, description: 'Cálculos de dimensionamiento de válvulas de seguridad y alivio', currentFiles: { pdf: { url: '/docs/PTR-REF-2020-PRO-004-C.pdf', name: 'PTR-REF-2020-PRO-004_Rev-C.pdf', size: '3.2 MB' }, editable: { url: '/docs/PTR-REF-2020-PRO-004-C.xlsx', name: 'PTR-REF-2020-PRO-004_Rev-C.xlsx', type: 'xlsx', size: '892 KB' } } },
      { id: '5', code: 'PTR-REF-2020-MEC-001', name: 'Especificación de Bombas Centrífugas', discipline: 'MECHANICAL', status: 'APR', revision: 'B', approvalDate: '2021-10-20', sendDate: '2021-09-22', responsible: 'Ana Rodríguez', type: 'Especificación', cost: 5800, description: 'Especificaciones técnicas de bombas centrífugas principales y auxiliares', currentFiles: { pdf: { url: '/docs/PTR-REF-2020-MEC-001-B.pdf', name: 'PTR-REF-2020-MEC-001_Rev-B.pdf', size: '1.5 MB' }, editable: { url: '/docs/PTR-REF-2020-MEC-001-B.docx', name: 'PTR-REF-2020-MEC-001_Rev-B.docx', type: 'docx', size: '720 KB' } } },
      { id: '6', code: 'PTR-REF-2020-MEC-002', name: 'Especificación de Compresores', discipline: 'MECHANICAL', status: 'APR', revision: 'A', approvalDate: '2021-09-15', sendDate: '2021-08-18', responsible: 'Luis Torres', type: 'Especificación', cost: 6200, description: 'Especificaciones de compresores de aire y gas' },
      { id: '7', code: 'PTR-REF-2020-MEC-003', name: 'Especificación de Intercambiadores de Calor', discipline: 'MECHANICAL', status: 'APR', revision: 'B', approvalDate: '2021-10-25', sendDate: '2021-09-28', responsible: 'Ana Rodríguez', type: 'Especificación', cost: 5500, description: 'Especificaciones de intercambiadores de casco y tubo' },
      { id: '8', code: 'PTR-REF-2020-MEC-004', name: 'Hojas de Datos de Tanques de Almacenamiento', discipline: 'MECHANICAL', status: 'APR', revision: 'A', approvalDate: '2021-09-20', sendDate: '2021-08-25', responsible: 'Luis Torres', type: 'Especificación', cost: 4800, description: 'Hojas de datos de tanques de almacenamiento de crudo y productos' },
      { id: '9', code: 'PTR-REF-2020-ELE-001', name: 'Diagrama Unifilar General', discipline: 'ELECTRICAL', status: 'APR', revision: 'C', approvalDate: '2021-11-05', sendDate: '2021-10-08', responsible: 'Pedro Jiménez', type: 'Plano', cost: 7800, description: 'Diagrama unifilar del sistema eléctrico completo' },
      { id: '10', code: 'PTR-REF-2020-ELE-002', name: 'Cálculo de Cortocircuito y Coordinación de Protecciones', discipline: 'ELECTRICAL', status: 'APR', revision: 'B', approvalDate: '2021-10-15', sendDate: '2021-09-18', responsible: 'Laura Martínez', type: 'Cálculo', cost: 6800, description: 'Análisis de cortocircuito y coordinación de protecciones eléctricas' },
      { id: '11', code: 'PTR-REF-2020-ELE-003', name: 'Dimensionamiento de Cables y Canalizaciones', discipline: 'ELECTRICAL', status: 'APR', revision: 'A', approvalDate: '2021-09-25', sendDate: '2021-08-30', responsible: 'Pedro Jiménez', type: 'Cálculo', cost: 5200, description: 'Dimensionamiento de cables de potencia y control' },
      { id: '12', code: 'PTR-REF-2020-ELE-004', name: 'Sistema de Puesta a Tierra', discipline: 'ELECTRICAL', status: 'APR', revision: 'B', approvalDate: '2021-10-10', sendDate: '2021-09-15', responsible: 'Laura Martínez', type: 'Cálculo', cost: 4500, description: 'Diseño del sistema de puesta a tierra y pararrayos' },
      { id: '13', code: 'PTR-REF-2020-INS-001', name: 'Arquitectura del Sistema de Control (DCS)', discipline: 'INSTRUMENTATION', status: 'APR', revision: 'D', approvalDate: '2021-11-18', sendDate: '2021-10-20', responsible: 'Fernando Ruiz', type: 'Documento Técnico', cost: 9500, description: 'Arquitectura completa del sistema de control distribuido', currentFiles: { pdf: { url: '/docs/PTR-REF-2020-INS-001-D.pdf', name: 'PTR-REF-2020-INS-001_Rev-D.pdf', size: '4.8 MB' }, editable: { url: '/docs/PTR-REF-2020-INS-001-D.docx', name: 'PTR-REF-2020-INS-001_Rev-D.docx', type: 'docx', size: '2.1 MB' } } },
      { id: '14', code: 'PTR-REF-2020-INS-002', name: 'Filosofía de Control y Estrategias', discipline: 'INSTRUMENTATION', status: 'APR', revision: 'C', approvalDate: '2021-11-12', sendDate: '2021-10-15', responsible: 'Sofia Vargas', type: 'Documento Técnico', cost: 8200, description: 'Filosofía de control y estrategias de automatización' },
      { id: '15', code: 'PTR-REF-2020-INS-003', name: 'Lista de Instrumentos e I/O', discipline: 'INSTRUMENTATION', status: 'APR', revision: 'B', approvalDate: '2021-10-28', sendDate: '2021-10-01', responsible: 'Fernando Ruiz', type: 'Lista', cost: 6500, description: 'Lista maestra de instrumentos y señales I/O' },
      { id: '16', code: 'PTR-REF-2020-INS-004', name: 'Hojas de Especificación de Instrumentos', discipline: 'INSTRUMENTATION', status: 'APR', revision: 'A', approvalDate: '2021-09-30', sendDate: '2021-09-05', responsible: 'Sofia Vargas', type: 'Especificación', cost: 5800, description: 'Hojas de especificación de instrumentos de campo' },
      { id: '17', code: 'PTR-REF-2020-CIV-001', name: 'Planos de Cimentaciones de Equipos', discipline: 'CIVIL', status: 'APR', revision: 'B', approvalDate: '2021-10-05', sendDate: '2021-09-10', responsible: 'Jorge Castro', type: 'Plano', cost: 7200, description: 'Planos de detalle de cimentaciones de equipos principales' },
      { id: '18', code: 'PTR-REF-2020-CIV-002', name: 'Diseño Estructural de Racks de Tuberías', discipline: 'CIVIL', status: 'APR', revision: 'A', approvalDate: '2021-09-18', sendDate: '2021-08-22', responsible: 'Elena Morales', type: 'Plano', cost: 6800, description: 'Diseño estructural de soportes y racks de tuberías' }
    ],
    metrics: {
      budgetByDiscipline: [
        { discipline: 'Procesos', budgeted: 1200000, actual: 1180000 },
        { discipline: 'Mecánica', budgeted: 1000000, actual: 1020000 },
        { discipline: 'Eléctrica', budgeted: 800000, actual: 790000 },
        { discipline: 'Instrumentación & Control', budgeted: 500000, actual: 460000 },
        { discipline: 'Civil', budgeted: 300000, actual: 290000 }
      ],
      schedulePerformance: { plannedDuration: 24, actualDuration: 23 },
      qualityMetrics: { approvedFirstTime: 78, avgRevisions: 2.3, rfisResolved: 91, clientSatisfaction: 4.5 },
      resourceUtilization: { plannedHours: 45000, actualHours: 43500, avgTeamSize: 28 }
    }
  },
  {
    id: 'proj-002',
    code: 'PTZ-UPS-2021',
    name: 'Campo Sacha - Optimización de Producción',
    client: 'Petroamazonas',
    type: 'UPSTREAM',
    status: 'COMPLETED',
    description: 'Proyecto de optimización de sistemas de producción en campo maduro',
    startDate: '2021-03-10',
    endDate: '2022-09-30',
    completionDate: '2022-09-30',
    duration: 18,
    budget: 1800000,
    spent: 1750000,
    finalCost: 1750000,
    progress: 100,
    documents: 187,
    transmittals: 52,
    rfis: 28,
    disciplines: ['Procesos', 'Mecánica', 'Instrumentación & Control', 'Eléctrica'],
    teamMembers: 15,
    tags: ['upstream', 'optimización', 'producción', 'campo maduro'],
    successRate: 92,
    lessonsLearned: [
      'El análisis de integridad de líneas existentes mediante inspección ultrasónica y pruebas hidrostáticas fue absolutamente crucial antes de aumentar las presiones operativas. Se identificaron 12 segmentos de tubería con corrosión severa que fueron reemplazados preventivamente, evitando potenciales fallas catastróficas',
      'El trabajo con operaciones en paralelo (mantener producción mientras se ejecutaban modificaciones) requirió una coordinación excepcional entre ingeniería, construcción y operaciones. Se implementó un sistema de permisos de trabajo digital que mejoró la seguridad y redujo los tiempos de parada no planificada en 60%',
      'El involucramiento temprano del personal de operaciones del campo desde la fase de ingeniería básica facilitó enormemente la transición post-comisionamiento. Los operadores aportaron conocimiento práctico del comportamiento del yacimiento que optimizó el diseño de las estrategias de producción',
      'La implementación de medidores multifásicos en tiempo real permitió ajustar dinámicamente las presiones de inyección de agua, logrando un incremento del 15% en la recuperación de petróleo respecto a las proyecciones iniciales',
      'Las simulaciones de red usando software Pipesim validadas con datos históricos del campo permitieron predecir con alta precisión el comportamiento del sistema optimizado, reduciendo riesgos operacionales durante el arranque'
    ],
    lmd: [
      { id: '1', code: 'PTZ-UPS-2021-PRO-001', name: 'Análisis de Integridad de Líneas Existentes', discipline: 'Procesos', status: 'APR', revision: 'B', approvalDate: '2022-08-15' },
      { id: '2', code: 'PTZ-UPS-2021-PRO-002', name: 'Estudio de Optimización de Producción', discipline: 'Procesos', status: 'APR', revision: 'A', approvalDate: '2022-06-20' },
      { id: '3', code: 'PTZ-UPS-2021-PRO-003', name: 'Simulación de Redes de Recolección', discipline: 'Procesos', status: 'APR', revision: 'C', approvalDate: '2022-08-25' },
      { id: '4', code: 'PTZ-UPS-2021-PRO-004', name: 'Balance de Presiones y Caudales', discipline: 'Procesos', status: 'APR', revision: 'B', approvalDate: '2022-07-30' },
      { id: '5', code: 'PTZ-UPS-2021-MEC-001', name: 'Especificación de Bombas de Inyección de Agua', discipline: 'Mecánica', status: 'APR', revision: 'A', approvalDate: '2022-07-20' },
      { id: '6', code: 'PTZ-UPS-2021-MEC-002', name: 'Especificación de Separadores Trifásicos', discipline: 'Mecánica', status: 'APR', revision: 'B', approvalDate: '2022-08-05' },
      { id: '7', code: 'PTZ-UPS-2021-MEC-003', name: 'Análisis de Vibraciones en Líneas de Producción', discipline: 'Mecánica', status: 'APR', revision: 'A', approvalDate: '2022-07-15' },
      { id: '8', code: 'PTZ-UPS-2021-INS-001', name: 'Arquitectura de Sistema SCADA Actualizado', discipline: 'Instrumentación & Control', status: 'APR', revision: 'C', approvalDate: '2022-09-10' },
      { id: '9', code: 'PTZ-UPS-2021-INS-002', name: 'Matriz de Causa y Efecto (C&E)', discipline: 'Instrumentación & Control', status: 'APR', revision: 'B', approvalDate: '2022-08-20' },
      { id: '10', code: 'PTZ-UPS-2021-INS-003', name: 'Sistema de Medición Fiscal Multifásica', discipline: 'Instrumentación & Control', status: 'APR', revision: 'A', approvalDate: '2022-07-25' },
      { id: '11', code: 'PTZ-UPS-2021-ELE-001', name: 'Estudio de Cargas Eléctricas Optimizado', discipline: 'Eléctrica', status: 'APR', revision: 'B', approvalDate: '2022-08-10' },
      { id: '12', code: 'PTZ-UPS-2021-ELE-002', name: 'Actualización de Sistema de Respaldo UPS', discipline: 'Eléctrica', status: 'APR', revision: 'A', approvalDate: '2022-07-10' }
    ],
    metrics: {
      budgetByDiscipline: [
        { discipline: 'Procesos', budgeted: 800000, actual: 780000 },
        { discipline: 'Mecánica', budgeted: 600000, actual: 600000 },
        { discipline: 'Instrumentación & Control', budgeted: 400000, actual: 370000 },
        { discipline: 'Eléctrica', budgeted: 200000, actual: 195000 }
      ],
      schedulePerformance: { plannedDuration: 18, actualDuration: 18 },
      qualityMetrics: { approvedFirstTime: 82, avgRevisions: 2.1, rfisResolved: 93, clientSatisfaction: 4.6 },
      resourceUtilization: { plannedHours: 28000, actualHours: 27500, avgTeamSize: 15 }
    }
  },
  {
    id: 'proj-003',
    code: 'SCH-MID-2022',
    name: 'Sistema de Transporte de Gas - Fase 3',
    client: 'Schlumberger',
    type: 'MIDSTREAM',
    status: 'COMPLETED',
    description: 'Diseño de sistema de gasoductos de alta presión para transporte de gas natural',
    startDate: '2022-05-01',
    endDate: '2023-11-20',
    completionDate: '2023-11-20',
    duration: 19,
    budget: 2200000,
    spent: 2180000,
    finalCost: 2180000,
    progress: 100,
    documents: 256,
    transmittals: 67,
    rfis: 34,
    disciplines: ['Procesos', 'Civil', 'Mecánica', 'Instrumentación & Control', 'Eléctrica'],
    teamMembers: 20,
    tags: ['gasoducto', 'alta presión', 'gas natural', 'offshore'],
    successRate: 94,
    lessonsLearned: [
      'Los estudios geotécnicos detallados ejecutados en fase temprana del proyecto, incluyendo 85 sondeos a lo largo del derecho de vía propuesto, identificaron 3 zonas con suelos expansivos y 2 áreas de potencial licuefacción. Esto permitió ajustar la ruta antes del diseño detallado, evitando cambios costosos que habrían representado $180,000 adicionales y 6 semanas de retraso',
      'Las simulaciones de flujo dinámico usando OLGA identificaron potencial de slugging severo en dos secciones del gasoducto. El análisis permitió optimizar el diámetro de tubería de 16" a 18" en esos tramos, eliminando el riesgo operacional. La inversión adicional en tubería se justificó ampliamente vs. el costo de instalación de slug catchers',
      'La coordinación proactiva con autoridades ambientales (Ministerio del Ambiente y gobiernos locales) desde la fase conceptual del proyecto agilizó dramáticamente la obtención de permisos. Las consultas previas y ajustes en diseño basados en feedback temprano redujeron el tiempo de licenciamiento de 8 meses (típico) a 5 meses',
      'La implementación de un sistema de protección catódica por corriente impresa con monitoreo remoto desde el día 1 ha demostrado ser fundamental. Los datos de polarización en tiempo real permiten ajustes predictivos que han mantenido la corrosión externa por debajo de 0.1 mm/año (objetivo: <0.15 mm/año)',
      'El uso de tecnología de inspección inline (ILI) con pigs instrumentados multisensor durante el comisionamiento estableció una línea base completa del estado de la tubería, facilitando la planificación de inspecciones futuras y validando la calidad de construcción (0 defectos críticos detectados)',
      'Las negociaciones tempranas de servidumbres con propietarios de tierras, con apoyo de equipos sociales especializados, fueron clave para evitar retrasos. Se logró acuerdos amistosos con el 95% de propietarios antes del inicio de construcción'
    ],
    lmd: [
      { 
        id: '1', 
        code: 'SCH-MID-2022-PRO-001', 
        name: 'Diagrama de Flujo de Proceso (PFD) - Gasoducto', 
        discipline: 'PRO', 
        status: 'APR', 
        revision: 'D', 
        responsible: 'Carlos Mendoza',
        sendDate: '2023-10-10',
        approvalDate: '2023-10-15',
        cost: 15000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-PRO-001-PFD.pdf', url: '/documents/sch-mid-2022-pro-001.pdf', size: '2.1 MB' },
          editable: { name: 'SCH-MID-2022-PRO-001-PFD.dwg', url: '/documents/sch-mid-2022-pro-001.dwg', type: 'dwg', size: '1.8 MB' }
        }
      },
      { 
        id: '2', 
        code: 'SCH-MID-2022-PRO-002', 
        name: 'Simulación Hidráulica de Gasoducto (PIPESIM)', 
        discipline: 'PRO', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'Ana García',
        sendDate: '2023-09-20',
        approvalDate: '2023-09-30',
        cost: 18000,
        type: 'Calculation',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-PRO-002-Simulation.pdf', url: '/documents/sch-mid-2022-pro-002.pdf', size: '2.3 MB' },
          editable: { name: 'SCH-MID-2022-PRO-002-Simulation.xlsx', url: '/documents/sch-mid-2022-pro-002.xlsx', type: 'xlsx', size: '0.8 MB' }
        }
      },
      { 
        id: '3', 
        code: 'SCH-MID-2022-PRO-003', 
        name: 'Análisis de Composición y Propiedades del Gas', 
        discipline: 'PRO', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Roberto Silva',
        sendDate: '2023-08-05',
        approvalDate: '2023-08-15',
        cost: 12000,
        type: 'Report',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-PRO-003-Analysis.pdf', url: '/documents/sch-mid-2022-pro-003.pdf', size: '1.9 MB' },
          editable: { name: 'SCH-MID-2022-PRO-003-Analysis.docx', url: '/documents/sch-mid-2022-pro-003.docx', type: 'docx', size: '0.9 MB' }
        }
      },
      { 
        id: '4', 
        code: 'SCH-MID-2022-PRO-004', 
        name: 'Estudio de Flujo Multifásico y Slugging', 
        discipline: 'PRO', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'María López',
        sendDate: '2023-09-25',
        approvalDate: '2023-10-05',
        cost: 22000,
        type: 'Study',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-PRO-004-Slugging.pdf', url: '/documents/sch-mid-2022-pro-004.pdf', size: '3.2 MB' },
          editable: { name: 'SCH-MID-2022-PRO-004-Slugging.docx', url: '/documents/sch-mid-2022-pro-004.docx', type: 'docx', size: '1.2 MB' }
        }
      },
      { 
        id: '5', 
        code: 'SCH-MID-2022-PRO-005', 
        name: 'Filosofía de Operación y Procedimientos de Arranque', 
        discipline: 'PRO', 
        status: 'APR', 
        revision: 'A', 
        responsible: 'Diego Herrera',
        sendDate: '2023-10-10',
        approvalDate: '2023-10-20',
        cost: 16000,
        type: 'Procedure',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-PRO-005-Procedures.pdf', url: '/documents/sch-mid-2022-pro-005.pdf', size: '2.8 MB' },
          editable: { name: 'SCH-MID-2022-PRO-005-Procedures.docx', url: '/documents/sch-mid-2022-pro-005.docx', type: 'docx', size: '1.5 MB' }
        }
      },
      { 
        id: '6', 
        code: 'SCH-MID-2022-MEC-001', 
        name: 'Especificación Técnica de Válvulas de Bloqueo', 
        discipline: 'MEC', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Patricia Vega',
        sendDate: '2023-10-20',
        approvalDate: '2023-10-30',
        cost: 14000,
        type: 'Specification',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-MEC-001-Valves.pdf', url: '/documents/sch-mid-2022-mec-001.pdf', size: '2.5 MB' },
          editable: { name: 'SCH-MID-2022-MEC-001-Valves.docx', url: '/documents/sch-mid-2022-mec-001.docx', type: 'docx', size: '1.1 MB' }
        }
      },
      { 
        id: '7', 
        code: 'SCH-MID-2022-MEC-002', 
        name: 'Especificación de Trampas de Scraper (Pig)', 
        discipline: 'MEC', 
        status: 'APR', 
        revision: 'A', 
        responsible: 'Fernando Ruiz',
        sendDate: '2023-09-05',
        approvalDate: '2023-09-15',
        cost: 19000,
        type: 'Specification',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-MEC-002-PigTraps.pdf', url: '/documents/sch-mid-2022-mec-002.pdf', size: '2.2 MB' },
          editable: { name: 'SCH-MID-2022-MEC-002-PigTraps.docx', url: '/documents/sch-mid-2022-mec-002.docx', type: 'docx', size: '1.0 MB' }
        }
      },
      { 
        id: '8', 
        code: 'SCH-MID-2022-MEC-003', 
        name: 'Memorias de Cálculo - Espesor de Tubería', 
        discipline: 'MEC', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'Carmen Torres',
        sendDate: '2023-10-15',
        approvalDate: '2023-10-25',
        cost: 17000,
        type: 'Calculation',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-MEC-003-Thickness.pdf', url: '/documents/sch-mid-2022-mec-003.pdf', size: '2.7 MB' },
          editable: { name: 'SCH-MID-2022-MEC-003-Thickness.xlsx', url: '/documents/sch-mid-2022-mec-003.xlsx', type: 'xlsx', size: '1.3 MB' }
        }
      },
      { 
        id: '9', 
        code: 'SCH-MID-2022-MEC-004', 
        name: 'Análisis de Esfuerzos en Tuberías (CAESAR II)', 
        discipline: 'MEC', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Luis Morales',
        sendDate: '2023-09-30',
        approvalDate: '2023-10-10',
        cost: 15000,
        type: 'Analysis',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-MEC-004-Stress.pdf', url: '/documents/sch-mid-2022-mec-004.pdf', size: '2.4 MB' },
          editable: { name: 'SCH-MID-2022-MEC-004-Stress.dwg', url: '/documents/sch-mid-2022-mec-004.dwg', type: 'dwg', size: '2.0 MB' }
        }
      },
      { 
        id: '10', 
        code: 'SCH-MID-2022-CIV-001', 
        name: 'Planos de Trazado de Ruta y Perfil Topográfico', 
        discipline: 'CIV', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'Isabel Moreno',
        sendDate: '2023-09-10',
        approvalDate: '2023-09-20',
        cost: 25000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-CIV-001-Route.pdf', url: '/documents/sch-mid-2022-civ-001.pdf', size: '3.5 MB' },
          editable: { name: 'SCH-MID-2022-CIV-001-Route.dwg', url: '/documents/sch-mid-2022-civ-001.dwg', type: 'dwg', size: '3.2 MB' }
        }
      },
      { 
        id: '11', 
        code: 'SCH-MID-2022-CIV-002', 
        name: 'Diseño Detallado de Cruces de Ríos', 
        discipline: 'CIV', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Andrés Castillo',
        sendDate: '2023-08-15',
        approvalDate: '2023-08-25',
        cost: 20000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-CIV-002-RiverCrossing.pdf', url: '/documents/sch-mid-2022-civ-002.pdf', size: '2.9 MB' },
          editable: { name: 'SCH-MID-2022-CIV-002-RiverCrossing.dwg', url: '/documents/sch-mid-2022-civ-002.dwg', type: 'dwg', size: '2.6 MB' }
        }
      },
      { 
        id: '12', 
        code: 'SCH-MID-2022-CIV-003', 
        name: 'Estudio Geotécnico del Derecho de Vía', 
        discipline: 'CIV', 
        status: 'APR', 
        revision: 'A', 
        responsible: 'Gabriela Sánchez',
        sendDate: '2023-07-20',
        approvalDate: '2023-07-30',
        cost: 30000,
        type: 'Report',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-CIV-003-Geotech.pdf', url: '/documents/sch-mid-2022-civ-003.pdf', size: '4.1 MB' },
          editable: { name: 'SCH-MID-2022-CIV-003-Geotech.docx', url: '/documents/sch-mid-2022-civ-003.docx', type: 'docx', size: '1.8 MB' }
        }
      },
      { 
        id: '13', 
        code: 'SCH-MID-2022-CIV-004', 
        name: 'Diseño de Cruces de Carreteras y Vías Férreas', 
        discipline: 'CIV', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Ricardo Jiménez',
        sendDate: '2023-08-25',
        approvalDate: '2023-09-05',
        cost: 22000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-CIV-004-Crossings.pdf', url: '/documents/sch-mid-2022-civ-004.pdf', size: '3.2 MB' },
          editable: { name: 'SCH-MID-2022-CIV-004-Crossings.dwg', url: '/documents/sch-mid-2022-civ-004.dwg', type: 'dwg', size: '2.9 MB' }
        }
      },
      { 
        id: '14', 
        code: 'SCH-MID-2022-CIV-005', 
        name: 'Plan de Manejo Ambiental y Social', 
        discipline: 'CIV', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'Valeria Espinoza',
        sendDate: '2023-10-08',
        approvalDate: '2023-10-18',
        cost: 18000,
        type: 'Report',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-CIV-005-Environmental.pdf', url: '/documents/sch-mid-2022-civ-005.pdf', size: '2.8 MB' },
          editable: { name: 'SCH-MID-2022-CIV-005-Environmental.docx', url: '/documents/sch-mid-2022-civ-005.docx', type: 'docx', size: '1.5 MB' }
        }
      },
      { 
        id: '15', 
        code: 'SCH-MID-2022-INS-001', 
        name: 'Sistema de Detección de Fugas (LDS)', 
        discipline: 'INS', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Héctor Vargas',
        sendDate: '2023-10-12',
        approvalDate: '2023-10-22',
        cost: 16000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-INS-001-LDS.pdf', url: '/documents/sch-mid-2022-ins-001.pdf', size: '2.3 MB' },
          editable: { name: 'SCH-MID-2022-INS-001-LDS.dwg', url: '/documents/sch-mid-2022-ins-001.dwg', type: 'dwg', size: '2.0 MB' }
        }
      },
      { 
        id: '16', 
        code: 'SCH-MID-2022-INS-002', 
        name: 'Sistema SCADA de Supervisión de Gasoducto', 
        discipline: 'INS', 
        status: 'APR', 
        revision: 'C', 
        responsible: 'Natalia Ramírez',
        sendDate: '2023-10-25',
        approvalDate: '2023-11-05',
        cost: 28000,
        type: 'Specification',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-INS-002-SCADA.pdf', url: '/documents/sch-mid-2022-ins-002.pdf', size: '3.8 MB' },
          editable: { name: 'SCH-MID-2022-INS-002-SCADA.docx', url: '/documents/sch-mid-2022-ins-002.docx', type: 'docx', size: '1.7 MB' }
        }
      },
      { 
        id: '17', 
        code: 'SCH-MID-2022-ELE-001', 
        name: 'Sistema de Protección Catódica', 
        discipline: 'ELE', 
        status: 'APR', 
        revision: 'B', 
        responsible: 'Fernando Ruiz',
        sendDate: '2023-10-02',
        approvalDate: '2023-10-12',
        cost: 19000,
        type: 'Drawing',
        currentFiles: {
          pdf: { name: 'SCH-MID-2022-ELE-001-CP.pdf', url: '/documents/sch-mid-2022-ele-001.pdf', size: '2.2 MB' },
          editable: { name: 'SCH-MID-2022-ELE-001-CP.dwg', url: '/documents/sch-mid-2022-ele-001.dwg', type: 'dwg', size: '1.9 MB' }
        }
      }
    ],
    metrics: {
      budgetByDiscipline: [
        { discipline: 'Procesos', budgeted: 900000, actual: 890000 },
        { discipline: 'Civil', budgeted: 800000, actual: 790000 },
        { discipline: 'Mecánica', budgeted: 500000, actual: 500000 },
        { discipline: 'Instrumentación & Control', budgeted: 300000, actual: 295000 },
        { discipline: 'Eléctrica', budgeted: 200000, actual: 195000 }
      ],
      schedulePerformance: { plannedDuration: 20, actualDuration: 19 },
      qualityMetrics: { approvedFirstTime: 85, avgRevisions: 1.9, rfisResolved: 95, clientSatisfaction: 4.7 },
      resourceUtilization: { plannedHours: 35000, actualHours: 34200, avgTeamSize: 20 }
    }
  }
];

// Client Standards Mock Data
const mockClientStandards = [
  {
    id: 'client-001',
    name: 'EP Petroecuador',
    code: 'EP-PTR',
    description: 'Empresa Pública de Hidrocarburos del Ecuador',
    standardsCount: 45,
    activeProjects: 3,
    lastUpdate: '2024-02',
    contactInfo: {
      email: 'ingenieria@eppetroecuador.ec',
      phone: '+593 2 1234567',
      address: 'Quito, Ecuador'
    },
    standards: [
      {
        id: 'std-001',
        code: 'PEC-EXP--UIO-00-INS-01',
        name: 'Instrucciones para Elaboración de Entregables',
        version: 'Rev. 3',
        lastUpdate: '2024-01-15',
        isActive: true,
        category: 'Diseño',
        description: 'Especificaciones para la elaboración y presentación de documentos de ingeniería'
      },
      {
        id: 'std-002',
        code: 'PEC-DES-UIO-001',
        name: 'Estándar de Diseño de Tuberías',
        version: 'Rev. 2',
        lastUpdate: '2023-11-20',
        isActive: true,
        category: 'Diseño'
      }
    ]
  },
  {
    id: 'client-002',
    name: 'Petroamazonas',
    code: 'PTZ',
    description: 'Empresa de exploración y producción de hidrocarburos',
    standardsCount: 38,
    activeProjects: 2,
    lastUpdate: '2024-01',
    contactInfo: {
      email: 'proyectos@petroamazonas.ec',
      phone: '+593 6 7891234'
    },
    standards: [
      {
        id: 'std-003',
        code: 'PTZ-EST-001',
        name: 'Especificaciones Técnicas Generales',
        version: 'Rev. 4',
        lastUpdate: '2024-01-10',
        isActive: true,
        category: 'General'
      }
    ]
  },
  {
    id: 'client-003',
    name: 'Schlumberger',
    code: 'SLB',
    description: 'Empresa de servicios petroleros',
    standardsCount: 52,
    activeProjects: 1,
    lastUpdate: '2023-12',
    standards: []
  },
  {
    id: 'client-004',
    name: 'PetroChina',
    code: 'PC',
    description: 'Compañía petrolera internacional',
    standardsCount: 67,
    activeProjects: 0,
    lastUpdate: '2023-10',
    standards: []
  }
];

// Internal Guides Mock Data
const mockInternalGuides = [
  {
    id: 'guide-001',
    title: 'Procedimiento para Cálculo de PSV (Válvulas de Seguridad)',
    code: 'AABO-PROC-PSV-001',
    description: 'Metodología detallada para dimensionamiento y selección de válvulas de seguridad y alivio de presión',
    category: 'procedimientos',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2024-01-20',
    author: 'Ing. Carlos Mendoza'
  },
  {
    id: 'guide-002',
    title: 'Hoja de Cálculo: Espesor de Tuberías ASME B31.3',
    code: 'AABO-CALC-TUB-001',
    description: 'Plantilla Excel para cálculo de espesores de tubería según código ASME B31.3',
    category: 'calculos',
    version: 'Rev. 3',
    status: 'approved',
    lastUpdate: '2023-12-15',
    author: 'Ing. María González'
  },
  {
    id: 'guide-003',
    title: 'Mejores Prácticas: Diseño de P&IDs',
    code: 'AABO-BP-PID-001',
    description: 'Guía de mejores prácticas para la elaboración de Diagramas de Tuberías e Instrumentación',
    category: 'mejores-practicas',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2024-02-10',
    author: 'Ing. Roberto Silva'
  },
  {
    id: 'guide-004',
    title: 'Checklist de Revisión de Documentos de Ingeniería',
    code: 'AABO-CHK-REV-001',
    description: 'Lista de verificación para asegurar la calidad de entregables antes de emisión',
    category: 'checklists',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2023-11-30',
    author: 'Ing. Ana Rodríguez'
  },
  {
    id: 'guide-005',
    title: 'Plantilla: Memoria de Cálculo Estructural',
    code: 'AABO-TPL-EST-001',
    description: 'Plantilla estandarizada para presentación de memorias de cálculo estructural',
    category: 'plantillas',
    version: 'Rev. 1',
    status: 'in-review',
    lastUpdate: '2024-03-01',
    author: 'Ing. Luis Torres'
  },
  {
    id: 'guide-006',
    title: 'Lecciones Aprendidas: Manejo de Vibraciones en Tuberías',
    code: 'AABO-LL-VIB-001',
    description: 'Compilación de soluciones efectivas para problemas de vibración en sistemas de tubería',
    category: 'lecciones-aprendidas',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2023-10-15',
    author: 'Equipo de Ingeniería'
  }
];

// External Norms Mock Data
const mockExternalNorms = [
  {
    id: 'norm-001',
    title: 'Process Piping',
    code: 'ASME B31.3',
    organization: 'ASME',
    edition: '2020',
    year: 2020,
    description: 'Código para diseño, materiales, fabricación, montaje, inspección y pruebas de tuberías de proceso',
    accessType: 'local',
    lastUpdate: '2020-07-01',
    reaffirmed: '2021'
  },
  {
    id: 'norm-002',
    title: 'Specification for Line Pipe',
    code: 'API 5L',
    organization: 'API',
    edition: '46th Edition',
    year: 2018,
    description: 'Especificación para tubería de línea de acero para transporte de gas, agua y petróleo',
    accessType: 'local',
    lastUpdate: '2018-03-01'
  },
  {
    id: 'norm-003',
    title: 'Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries',
    code: 'API 610',
    organization: 'API',
    edition: '12th Edition',
    year: 2023,
    description: 'Estándar para bombas centrífugas en la industria del petróleo y gas',
    accessType: 'local',
    lastUpdate: '2023-01-15',
    hasUpdates: true
  },
  {
    id: 'norm-004',
    title: 'Quality management systems — Requirements',
    code: 'ISO 9001:2015',
    organization: 'ISO',
    edition: '2015',
    year: 2015,
    description: 'Estándar internacional de sistemas de gestión de calidad',
    accessType: 'external',
    lastUpdate: '2015-09-15'
  },
  {
    id: 'norm-005',
    title: 'Boiler and Pressure Vessel Code',
    code: 'ASME BPVC Section VIII',
    organization: 'ASME',
    edition: '2023',
    year: 2023,
    description: 'Código para diseño y fabricación de recipientes a presión',
    accessType: 'local',
    lastUpdate: '2023-07-01'
  },
  {
    id: 'norm-006',
    title: 'Standard Test Method for Tension Testing of Metallic Materials',
    code: 'ASTM E8/E8M',
    organization: 'ASTM',
    edition: '2023',
    year: 2023,
    description: 'Método estándar de prueba de tensión para materiales metálicos',
    accessType: 'external',
    lastUpdate: '2023-02-01'
  }
];

// Enhanced mock data for specific searches
const additionalMockProjects = [
  {
    id: 'proj-004',
    code: 'MIN-WTR-2023',
    name: 'Sistema de Tratamiento de Agua - Proyecto Minero',
    client: 'Compañía Minera ABC',
    type: 'MINING',
    status: 'COMPLETED',
    description: 'Diseño de planta de tratamiento de agua para industria minera con sistemas de osmosis inversa y neutralización de efluentes',
    startDate: '2023-01-10',
    endDate: '2023-12-15',
    completionDate: '2023-12-15',
    duration: 11,
    budget: 1500000,
    spent: 1480000,
    finalCost: 1480000,
    progress: 100,
    documents: 165,
    transmittals: 42,
    rfis: 19,
    disciplines: ['Procesos', 'Civil', 'Eléctrica'],
    teamMembers: 12,
    tags: ['minería', 'tratamiento de agua', 'osmosis inversa', 'efluentes'],
    successRate: 93
  },
  {
    id: 'proj-005',
    code: 'PTZ-GAS-2022',
    name: 'Estación de Procesamiento de Gas Natural',
    client: 'Petroamazonas',
    type: 'MIDSTREAM',
    status: 'COMPLETED',
    description: 'Ingeniería de detalle para estación de separación, endulzamiento y compresión de gas natural',
    startDate: '2022-02-01',
    endDate: '2023-06-30',
    completionDate: '2023-06-30',
    duration: 17,
    budget: 2800000,
    spent: 2750000,
    finalCost: 2750000,
    progress: 100,
    documents: 298,
    transmittals: 78,
    rfis: 41,
    disciplines: ['Procesos', 'Mecánica', 'Instrumentación & Control', 'Civil'],
    teamMembers: 24,
    tags: ['gas', 'petroamazonas', 'separación', 'compresión', 'endulzamiento'],
    successRate: 96
  }
];

const allMockProjects = [...mockHistoricalProjects, ...additionalMockProjects];

const additionalInternalGuides = [
  {
    id: 'guide-007',
    title: 'Guía de Dimensionamiento de Válvulas PSV según API 520',
    code: 'AABO-PROC-PSV-002',
    description: 'Procedimiento paso a paso para calcular el caudal de alivio y dimensionar válvulas de seguridad para diferentes escenarios de sobrepresión. Incluye ejemplos para servicio de gas, líquido y bifásico.',
    category: 'procedimientos',
    version: 'Rev. 4',
    status: 'approved',
    lastUpdate: '2024-02-15',
    author: 'Ing. Carlos Mendoza'
  },
  {
    id: 'guide-008',
    title: 'Procedimiento de Selección de Bombas Centrífugas API 610',
    code: 'AABO-PROC-BOM-001',
    description: 'Metodología completa para sizing y selección de bombas centrífugas según estándar API 610. Incluye criterios de NPSH, curvas características y selección de materiales.',
    category: 'procedimientos',
    version: 'Rev. 3',
    status: 'approved',
    lastUpdate: '2024-01-28',
    author: 'Ing. María González'
  },
  {
    id: 'guide-009',
    title: 'Criterios de Diseño de Sistemas Contra Incendio',
    code: 'AABO-DES-FP-001',
    description: 'Guía técnica para diseño de sistemas de protección contra incendio según NFPA 15, 20 y 24. Incluye cálculo de demanda de agua, sizing de bombas y diseño de redes.',
    category: 'diseño',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2023-12-20',
    author: 'Ing. Roberto Silva'
  },
  {
    id: 'guide-010',
    title: 'Plantilla de P&ID para Tratamiento de Agua',
    code: 'AABO-TPL-PID-002',
    description: 'Plantilla estándar de diagramas P&ID para sistemas de tratamiento de agua industrial, incluyendo simbología ISA y mejores prácticas.',
    category: 'plantillas',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2024-03-05',
    author: 'Equipo de Procesos'
  },
  {
    id: 'guide-011',
    title: 'Especificación de Intercambiadores de Calor TEMA',
    code: 'AABO-SPEC-HX-001',
    description: 'Guía para elaboración de datasheets de intercambiadores de calor según estándares TEMA. Incluye consideraciones para servicios criogénicos y alta temperatura.',
    category: 'especificaciones',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2024-01-15',
    author: 'Ing. Ana Rodríguez'
  },
  {
    id: 'guide-012',
    title: 'Criterios de Layout para Estaciones de Gas',
    code: 'AABO-DES-LAY-001',
    description: 'Lineamientos para distribución de equipos en estaciones de gas, incluyendo criterios de espaciamiento según API, consideraciones de seguridad y accesibilidad.',
    category: 'diseño',
    version: 'Rev. 1',
    status: 'approved',
    lastUpdate: '2023-11-10',
    author: 'Ing. Luis Torres'
  },
  {
    id: 'guide-013',
    title: 'Guía de Selección de Materiales para Servicio H2S',
    code: 'AABO-MAT-H2S-001',
    description: 'Criterios de selección de materiales para servicios con H2S húmedo según NACE MR0175/ISO 15156. Incluye requisitos de pruebas HIC y SSC.',
    category: 'materiales',
    version: 'Rev. 3',
    status: 'approved',
    lastUpdate: '2024-02-01',
    author: 'Ing. Pedro Ramírez'
  },
  {
    id: 'guide-014',
    title: 'Especificación de Aislamiento Térmico para Servicios Criogénicos',
    code: 'AABO-SPEC-INS-001',
    description: 'Criterios técnicos para selección y especificación de aislamiento térmico en líneas y equipos criogénicos. Incluye cálculos de espesor y consideraciones de vapor barrier.',
    category: 'especificaciones',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2023-10-25',
    author: 'Ing. Laura Sánchez'
  },
  {
    id: 'guide-015',
    title: 'Procedimiento de Cálculo Hidráulico - Sistemas Contra Incendio',
    code: 'AABO-CALC-FP-001',
    description: 'Metodología de balance hidráulico para redes de sistemas contra incendio. Incluye criterios de simultaneidad, software recomendado (PIPENET, AFT Fathom) y verificación de presiones.',
    category: 'calculos',
    version: 'Rev. 2',
    status: 'approved',
    lastUpdate: '2024-01-10',
    author: 'Ing. Miguel Ángel Flores'
  }
];

const allInternalGuides = [...mockInternalGuides, ...additionalInternalGuides];

const additionalExternalNorms = [
  {
    id: 'norm-007',
    title: 'Sizing, Selection, and Installation of Pressure-Relieving Devices',
    code: 'API 520',
    organization: 'API',
    edition: 'Part I - 10th Edition',
    year: 2020,
    description: 'Estándar para dimensionamiento y selección de dispositivos de alivio de presión en refinerías y plantas químicas',
    accessType: 'local',
    lastUpdate: '2020-10-01'
  },
  {
    id: 'norm-008',
    title: 'Guide for Pressure-Relieving and Depressuring Systems',
    code: 'API 521',
    organization: 'API',
    edition: '7th Edition',
    year: 2020,
    description: 'Guía para diseño de sistemas de alivio de presión y despresurización en instalaciones petroleras',
    accessType: 'local',
    lastUpdate: '2020-06-01'
  },
  {
    id: 'norm-009',
    title: 'Power Piping',
    code: 'ASME B31.1',
    organization: 'ASME',
    edition: '2020',
    year: 2020,
    description: 'Código para tuberías de potencia en plantas de generación',
    accessType: 'local',
    lastUpdate: '2020-07-01'
  },
  {
    id: 'norm-010',
    title: 'Instrumentation Symbols and Identification',
    code: 'ISA-5.1',
    organization: 'ISA',
    edition: '2022',
    year: 2022,
    description: 'Estándar internacional para símbolos de instrumentación y sistemas de identificación en P&IDs',
    accessType: 'local',
    lastUpdate: '2022-01-15'
  },
  {
    id: 'norm-011',
    title: 'Standards of the Tubular Exchanger Manufacturers Association',
    code: 'TEMA',
    organization: 'TEMA',
    edition: '10th Edition',
    year: 2019,
    description: 'Estándares para diseño mecánico de intercambiadores de calor de coraza y tubos',
    accessType: 'local',
    lastUpdate: '2019-01-01'
  },
  {
    id: 'norm-012',
    title: 'Petroleum and Natural Gas Industries — Materials for use in H2S-containing Environments',
    code: 'ISO 15156 / NACE MR0175',
    organization: 'ISO/NACE',
    edition: '2020',
    year: 2020,
    description: 'Estándar para selección de materiales resistentes a ambientes con H2S y prevención de SSC y HIC',
    accessType: 'local',
    lastUpdate: '2020-12-01'
  },
  {
    id: 'norm-013',
    title: 'Standard for Water-Based Fire Protection Systems',
    code: 'NFPA 15',
    organization: 'NFPA',
    edition: '2022',
    year: 2022,
    description: 'Estándar para sistemas de protección contra incendio a base de agua, incluyendo sistemas de diluvio y spray',
    accessType: 'local',
    lastUpdate: '2022-01-01'
  },
  {
    id: 'norm-014',
    title: 'Standard for the Installation of Stationary Pumps for Fire Protection',
    code: 'NFPA 20',
    organization: 'NFPA',
    edition: '2022',
    year: 2022,
    description: 'Estándar para instalación de bombas estacionarias de protección contra incendios',
    accessType: 'local',
    lastUpdate: '2022-01-01'
  },
  {
    id: 'norm-015',
    title: 'National Electrical Code',
    code: 'NFPA 70',
    organization: 'NFPA',
    edition: '2023',
    year: 2023,
    description: 'Código eléctrico nacional, incluyendo requisitos para instalaciones en áreas clasificadas',
    accessType: 'local',
    lastUpdate: '2023-01-01'
  }
];

const allExternalNorms = [...mockExternalNorms, ...additionalExternalNorms];

// Search Results Mock Data with intelligent matching
const generateSearchResults = (query) => {
  const queryLower = query.toLowerCase();
  
  // Keywords mapping for better search results
  const searchKeywords = {
    psv: ['psv', 'válvula', 'seguridad', 'alivio', 'api 520', 'api 521'],
    bombas: ['bomba', 'centrifuga', 'api 610', 'sizing'],
    contraincendio: ['contra incendio', 'fire protection', 'nfpa', 'diluvio', 'sprinkler'],
    agua: ['agua', 'water', 'tratamiento', 'osmosis'],
    intercambiador: ['intercambiador', 'heat exchanger', 'tema', 'criogenic'],
    gas: ['gas', 'estacion', 'separacion', 'compresion'],
    api610: ['api 610', 'bomba', 'centrifuga'],
    asmeb313: ['asme b31.3', 'tuberia', 'piping'],
    isa: ['isa', 'simbolo', 'instrumentacion', 'p&id'],
    petroamazonas: ['petroamazonas', 'gas'],
    mineria: ['mineria', 'mining', 'agua'],
    h2s: ['h2s', 'nace', 'material', 'sour'],
    criogenico: ['criogenic', 'aislamiento', 'thermal'],
    hidraulico: ['hidraulico', 'hydraulic', 'balance']
  };

  // Determine relevant categories based on query
  const relevantCategories = [];
  for (const [category, keywords] of Object.entries(searchKeywords)) {
    if (keywords.some(kw => queryLower.includes(kw))) {
      relevantCategories.push(category);
    }
  }

  // Smart filtering with relevance scoring
  const filterWithRelevance = (items, searchFields) => {
    return items
      .map(item => {
        let score = 0;
        let matches = false;

        searchFields.forEach(field => {
          const fieldValue = field.split('.').reduce((obj, key) => obj?.[key], item);
          if (fieldValue && typeof fieldValue === 'string') {
            const fieldLower = fieldValue.toLowerCase();
            
            // Exact match
            if (fieldLower.includes(queryLower)) {
              score += 1.0;
              matches = true;
            }
            
            // Keyword matches
            relevantCategories.forEach(category => {
              if (searchKeywords[category].some(kw => fieldLower.includes(kw))) {
                score += 0.5;
                matches = true;
              }
            });
          } else if (Array.isArray(fieldValue)) {
            fieldValue.forEach(val => {
              if (val.toLowerCase && val.toLowerCase().includes(queryLower)) {
                score += 0.8;
                matches = true;
              }
            });
          }
        });

        return matches ? { ...item, relevanceScore: Math.min(score, 1.0) } : null;
      })
      .filter(item => item !== null)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  };

  const historicalProjects = filterWithRelevance(
    allMockProjects,
    ['name', 'description', 'tags', 'client']
  ).map(p => ({
        ...p,
    excerpt: p.description?.substring(0, 180) + '...'
  }));

  const clientStandards = mockClientStandards.flatMap(client =>
    filterWithRelevance(
      client.standards,
      ['name', 'code', 'description']
    ).map(s => ({
          ...s,
          client: client.name,
      clientCode: client.code
    }))
  );

  const internalGuides = filterWithRelevance(
    allInternalGuides,
    ['title', 'description', 'category', 'code']
  ).map(g => ({
        ...g,
    excerpt: g.description?.substring(0, 180) + '...'
  }));

  const externalNorms = filterWithRelevance(
    allExternalNorms,
    ['title', 'code', 'description', 'organization']
  ).map(n => ({
        ...n,
    excerpt: n.description?.substring(0, 180) + '...'
  }));

  return {
    historicalProjects,
    clientStandards,
    internalGuides,
    externalNorms
  };
};

// Mock API functions
export const getKnowledgeHubMocks = () => ({
  getHistoricalProjects: (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
        let filtered = [...allMockProjects];

        // Apply filters
        if (params.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.code.toLowerCase().includes(search) ||
            p.client.toLowerCase().includes(search)
          );
        }

        if (params.client) {
          filtered = filtered.filter(p => p.client === params.client);
        }

        if (params.projectType) {
          filtered = filtered.filter(p => p.type === params.projectType);
        }

        if (params.year) {
          filtered = filtered.filter(p =>
            p.completionDate.startsWith(params.year)
          );
        }

        if (params.tags && params.tags.length > 0) {
          filtered = filtered.filter(p =>
            params.tags.some(tag => p.tags?.includes(tag))
          );
        }

        const stats = {
          totalProjects: allMockProjects.length,
          totalDocuments: allMockProjects.reduce((sum, p) => sum + p.documents, 0),
          totalClients: new Set(allMockProjects.map(p => p.client)).size,
          avgSuccess: Math.round(
            allMockProjects.reduce((sum, p) => sum + (p.successRate || 0), 0) /
            allMockProjects.length
          )
        };

        resolve({
          success: true,
          data: {
            projects: filtered,
            stats
          }
        });
    }, 500);
  });
  },

  getHistoricalProjectById: (projectId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = allMockProjects.find(p => p.id === projectId);
        
        if (project) {
          resolve({ success: true, data: project });
        } else {
          resolve({ success: false, message: 'Proyecto no encontrado' });
        }
      }, 300);
  });
  },

  getStandards: (type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
        let data;
        if (type === 'client') {
          data = mockClientStandards;
        } else if (type === 'internal') {
          data = mockInternalGuides;
        } else if (type === 'external') {
          data = mockExternalNorms;
        }

        resolve({
          success: true,
          data: data || []
        });
    }, 500);
  });
  },

  searchKnowledgeHub: (params = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = generateSearchResults(params.query || '');

        resolve({
          success: true,
          data: results
        });
      }, 800);
    });
  },

  getClientProfile: (clientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const client = mockClientStandards.find(c => c.id === clientId);

        if (client) {
          resolve({ success: true, data: client });
        } else {
          resolve({ success: false, message: 'Cliente no encontrado' });
        }
      }, 300);
    });
  },

  uploadStandard: (type, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock: Uploading standard', type, data);
        resolve({
          success: true,
          message: 'Estándar subido exitosamente',
          data: { id: `new-${Date.now()}`, ...data }
        });
      }, 1000);
    });
  }
});
