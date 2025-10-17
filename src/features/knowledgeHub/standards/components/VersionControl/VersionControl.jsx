/**
 * VersionControl - Display version history of standards
 * @module features/knowledgeHub/standards/components/VersionControl
 */

import PropTypes from 'prop-types';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './VersionControl.module.css';

const VersionControl = ({ type, entityId }) => {
  // Mock version history - Different examples based on type
  const getVersionHistory = () => {
    // Client Standards typical version history
    if (type === 'client') {
      return [
        {
          id: 1,
          version: '4.0',
          date: '2024-02-20',
          status: 'active',
          changes: 'Actualización mayor: Incorporación de nuevos requisitos de seguridad funcional según IEC 61508/61511. Actualización de criterios de espaciamiento entre equipos. Inclusión de requisitos para sistemas de detección de gas H2S.',
          author: 'Cliente - Depto. de Ingeniería',
          downloadUrl: '#',
          fileSize: '2.4 MB'
        },
        {
          id: 2,
          version: '3.2',
          date: '2023-09-15',
          status: 'archived',
          changes: 'Actualización menor: Correcciones en plantillas de memorias de cálculo. Actualización de logos corporativos y formato de carátulas. Clarificación en procedimiento de emisión de documentos.',
          author: 'Cliente - Control de Documentos',
          downloadUrl: '#',
          fileSize: '2.3 MB'
        },
        {
          id: 3,
          version: '3.1',
          date: '2023-04-10',
          status: 'archived',
          changes: 'Corrección de errores tipográficos en sección 5.3. Actualización de referencias a código ASME B31.3 edición 2020. Ajuste de factores de diseño para tuberías en servicio cíclico.',
          author: 'Cliente - Depto. de Ingeniería',
          downloadUrl: '#',
          fileSize: '2.2 MB'
        },
        {
          id: 4,
          version: '3.0',
          date: '2022-11-30',
          status: 'archived',
          changes: 'Revisión mayor: Integración de especificaciones de materiales resistentes a H2S según NACE MR0175. Nuevos requisitos para análisis de integridad mecánica. Actualización completa de procedimientos de inspección y pruebas.',
          author: 'Cliente - Comité Técnico',
          downloadUrl: '#',
          fileSize: '2.1 MB'
        },
        {
          id: 5,
          version: '2.5',
          date: '2022-05-18',
          status: 'archived',
          changes: 'Actualización de criterios de diseño sísmico según código ecuatoriano NEC-2015. Inclusión de requisitos para protección catódica en tanques de almacenamiento. Actualización de factores de corrosión admisibles.',
          author: 'Cliente - Ingeniería Estructural',
          downloadUrl: '#',
          fileSize: '1.9 MB'
        },
        {
          id: 6,
          version: '2.0',
          date: '2021-08-25',
          status: 'archived',
          changes: 'Revisión completa del documento. Consolidación de especificaciones anteriores dispersas. Adopción de formato estandarizado corporativo. Inclusión de apéndices con tablas de referencia y ejemplos de cálculo.',
          author: 'Cliente - Gerencia de Proyectos',
          downloadUrl: '#',
          fileSize: '1.8 MB'
        },
        {
          id: 7,
          version: '1.0',
          date: '2020-01-10',
          status: 'archived',
          changes: 'Emisión inicial del documento. Establecimiento de lineamientos base para proyectos de ingeniería. Definición de procedimientos de diseño, cálculo y documentación.',
          author: 'Cliente - Comité de Estandarización',
          downloadUrl: '#',
          fileSize: '1.5 MB'
        }
      ];
    }
    
    // Internal Guides typical version history
    if (type === 'internal') {
      return [
        {
          id: 1,
          version: '3.0',
          date: '2024-03-10',
          status: 'active',
          changes: 'Actualización mayor: Incorporación de metodología de cálculo para escenarios de incendio en tanques según API 2000. Inclusión de nuevos ejemplos de cálculo para servicios bifásicos. Actualización de software recomendado (DNV Tuffp vs. Excel).',
          author: 'Ing. Carlos Mendoza - Líder de Procesos',
          approvedBy: 'Ing. Roberto Gómez - Director Técnico',
          downloadUrl: '#',
          fileSize: '3.2 MB'
        },
        {
          id: 2,
          version: '2.3',
          date: '2023-11-20',
          status: 'archived',
          changes: 'Actualización menor: Corrección de fórmulas en sección 4.2 (cálculo de área efectiva). Adición de factor de corrección por contrapresión. Actualización de ejemplo 3 con datos reales de proyecto PTR-REF-2020.',
          author: 'Ing. María González - Especialista Senior',
          approvedBy: 'Ing. Carlos Mendoza - Líder de Procesos',
          downloadUrl: '#',
          fileSize: '2.8 MB'
        },
        {
          id: 3,
          version: '2.2',
          date: '2023-06-15',
          status: 'archived',
          changes: 'Incorporación de lecciones aprendidas del proyecto SCH-MID-2022. Clarificación de criterios de selección entre válvulas convencionales vs. balanceadas. Actualización de tabla de coeficientes Kd según API 520 Part I 10th edition.',
          author: 'Ing. Roberto Silva - Ingeniero de Procesos',
          approvedBy: 'Ing. Carlos Mendoza - Líder de Procesos',
          downloadUrl: '#',
          fileSize: '2.6 MB'
        },
        {
          id: 4,
          version: '2.1',
          date: '2023-02-08',
          status: 'archived',
          changes: 'Actualización de referencias normativas a API 520 edición 2020. Corrección de errores tipográficos en ecuaciones 5.4 y 5.7. Mejora de formato y legibilidad de diagramas de flujo de decisión.',
          author: 'Ing. Ana Rodríguez - Ingeniero de Procesos',
          approvedBy: 'Ing. Carlos Mendoza - Líder de Procesos',
          downloadUrl: '#',
          fileSize: '2.5 MB'
        },
        {
          id: 5,
          version: '2.0',
          date: '2022-09-30',
          status: 'archived',
          changes: 'Revisión completa del procedimiento. Reorganización de contenido para mayor claridad. Incorporación de sección de troubleshooting con casos problemáticos frecuentes. Adición de 5 ejemplos resueltos paso a paso.',
          author: 'Ing. Carlos Mendoza - Líder de Procesos',
          approvedBy: 'Gerencia de Ingeniería',
          downloadUrl: '#',
          fileSize: '2.3 MB'
        },
        {
          id: 6,
          version: '1.5',
          date: '2022-03-15',
          status: 'archived',
          changes: 'Incorporación de metodología para servicios criogénicos. Actualización de factores de compresibilidad para gases no ideales. Inclusión de nomogramas y gráficas de referencia rápida.',
          author: 'Ing. María González - Especialista Senior',
          approvedBy: 'Ing. Carlos Mendoza - Líder de Procesos',
          downloadUrl: '#',
          fileSize: '2.0 MB'
        },
        {
          id: 7,
          version: '1.0',
          date: '2021-05-20',
          status: 'archived',
          changes: 'Emisión inicial del procedimiento interno. Consolidación de mejores prácticas utilizadas en proyectos anteriores. Establecimiento de metodología estándar AABO para cálculo de PSV.',
          author: 'Equipo de Procesos - AABO',
          approvedBy: 'Gerencia de Ingeniería',
          downloadUrl: '#',
          fileSize: '1.6 MB'
        }
      ];
    }
    
    // External Norms typical version history
    if (type === 'external') {
      return [
        {
          id: 1,
          version: '2023',
          date: '2023-07-01',
          status: 'active',
          changes: 'Edición 2023: Actualización de requisitos de diseño para recipientes de alta presión. Nuevas consideraciones para análisis de fatiga en servicios cíclicos. Actualización de factores de soldadura y eficiencia de juntas. Inclusión de nuevos materiales permitidos según ASME Section II.',
          author: 'ASME Standards Committee',
          purchaseDate: '2023-08-15',
          downloadUrl: '#',
          fileSize: '45.2 MB',
          standard: true
        },
        {
          id: 2,
          version: '2021',
          date: '2021-07-01',
          status: 'archived',
          changes: 'Edición 2021: Revisión de criterios de inspección no destructiva. Actualización de requisitos de PWHT (Post-Weld Heat Treatment). Clarificación de procedimientos de prueba hidrostática. Incorporación de métodos alternativos de análisis de esfuerzos.',
          author: 'ASME Standards Committee',
          purchaseDate: '2021-09-10',
          downloadUrl: '#',
          fileSize: '42.8 MB',
          standard: true
        },
        {
          id: 3,
          version: '2019',
          date: '2019-07-01',
          status: 'archived',
          changes: 'Edición 2019: Actualización de código de construcción soldada. Nuevos requisitos para análisis sísmico de recipientes. Actualización de métodos de cálculo de espesores por presión externa. Revisión de criterios de alivio de presión.',
          author: 'ASME Standards Committee',
          purchaseDate: '2019-10-05',
          downloadUrl: '#',
          fileSize: '40.5 MB',
          standard: true
        },
        {
          id: 4,
          version: '2017',
          date: '2017-07-01',
          status: 'archived',
          changes: 'Edición 2017: Introducción de nuevos criterios de diseño basados en análisis de elementos finitos (FEA). Actualización de procedimientos de calificación de soldadores. Revisión de métodos de inspección radiográfica digital.',
          author: 'ASME Standards Committee',
          purchaseDate: '2018-02-20',
          downloadUrl: '#',
          fileSize: '38.9 MB',
          standard: true
        }
      ];
    }
    
    // Default version history
    return [
    {
      id: 1,
      version: '3.0',
      date: '2024-01-15',
      status: 'active',
        changes: 'Actualización mayor con nuevos requisitos de seguridad y mejores prácticas actualizadas',
        author: 'Sistema'
    },
    {
      id: 2,
      version: '2.5',
      date: '2023-06-10',
      status: 'archived',
      changes: 'Correcciones menores y actualizaciones de formato',
        author: 'Sistema'
      }
    ];
  };

  const versions = getVersionHistory();

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        {versions.map((version, index) => (
          <div key={version.id} className={styles.versionItem}>
            <div className={styles.indicator}>
              <div className={`${styles.dot} ${version.status === 'active' ? styles.active : ''}`}></div>
              {index < versions.length - 1 && <div className={styles.line}></div>}
            </div>

            <div className={styles.versionCard}>
              <div className={styles.versionHeader}>
                <div className={styles.versionInfo}>
                  <span className={styles.versionNumber}>v{version.version}</span>
                  <span className={styles.versionDate}>{formatDate(version.date)}</span>
                  {version.fileSize && (
                    <span className={styles.fileSize}>• {version.fileSize}</span>
                  )}
                </div>
                <Badge
                  variant={version.status === 'active' ? 'success' : 'neutral'}
                  size="small"
                >
                  {version.status === 'active' ? '✓ Activa' : 'Archivada'}
                </Badge>
              </div>

              <p className={styles.changes}>{version.changes}</p>
              
              <div className={styles.metadata}>
                <p className={styles.author}>Autor: {version.author}</p>
                {version.approvedBy && (
                  <p className={styles.approver}>Aprobado por: {version.approvedBy}</p>
                )}
                {version.purchaseDate && (
                  <p className={styles.purchaseDate}>Fecha de adquisición: {formatDate(version.purchaseDate)}</p>
                )}
              </div>

              {version.downloadUrl && version.status === 'active' && (
                <button className={styles.downloadButton}>
                  📄 Descargar esta versión
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          💡 Las versiones anteriores se archivan con acceso de solo lectura, eliminando el riesgo de usar información obsoleta.
        </p>
      </div>
    </div>
  );
};

VersionControl.propTypes = {
  type: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired
};

export default VersionControl;

