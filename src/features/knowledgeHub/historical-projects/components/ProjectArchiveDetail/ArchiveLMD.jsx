/**
 * ArchiveLMD - Display archived project's final LMD
 * @module features/knowledgeHub/historical-projects/components/ProjectArchiveDetail
 */

import PropTypes from 'prop-types';
import Table from '../../../../../components/shared/Table';
import StatusBadge from '../../../../../features/projects/lmd/components/StatusBadge';
import { formatDate } from '../../../../../utils';
import styles from './ArchiveLMD.module.css';

const ArchiveLMD = ({ lmd, projectCode }) => {
  if (!lmd || lmd.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📄 No hay documentos disponibles en el archivo</p>
      </div>
    );
  }

  const columns = [
    {
      key: 'index',
      label: '#',
      width: '60px',
      render: (_, index) => index + 1
    },
    {
      key: 'code',
      label: 'Código',
      width: '180px',
      render: (doc) => (
        <code className={styles.code}>{doc.code}</code>
      )
    },
    {
      key: 'name',
      label: 'Nombre del Documento',
      render: (doc) => doc.name
    },
    {
      key: 'discipline',
      label: 'Disciplina',
      width: '140px'
    },
    {
      key: 'status',
      label: 'Estado Final',
      width: '120px',
      render: (doc) => <StatusBadge status={doc.status} />
    },
    {
      key: 'revision',
      label: 'Rev.',
      width: '80px',
      render: (doc) => (
        <span className={styles.revision}>{doc.revision}</span>
      )
    },
    {
      key: 'approvalDate',
      label: 'Fecha Aprobación',
      width: '140px',
      render: (doc) => formatDate(doc.approvalDate)
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span className={styles.infoLabel}>Proyecto:</span>
          <span className={styles.infoValue}>{projectCode}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoLabel}>Total Documentos:</span>
          <span className={styles.infoValue}>{lmd.length}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoLabel}>Estado:</span>
          <span className={styles.infoValue}>Archivo Final</span>
        </div>
      </div>

      <Table
        data={lmd}
        columns={columns}
        className={styles.table}
      />

      <div className={styles.footer}>
        <p className={styles.footerText}>
          📌 Esta es la Lista Maestra de Documentos final del proyecto archivado.
          Todos los documentos están en su última revisión aprobada.
        </p>
      </div>
    </div>
  );
};

ArchiveLMD.propTypes = {
  lmd: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      discipline: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      revision: PropTypes.string.isRequired,
      approvalDate: PropTypes.string.isRequired
    })
  ).isRequired,
  projectCode: PropTypes.string.isRequired
};

export default ArchiveLMD;

