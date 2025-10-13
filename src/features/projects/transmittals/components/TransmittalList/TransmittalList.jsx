/**
 * TransmittalList - Table view of transmittals
 * @module features/projects/transmittals/components/TransmittalList
 */

import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../../../../components/shared/Table';
import Badge from '../../../../../components/shared/Badge';
import { formatDate } from '../../../../../utils';
import styles from './TransmittalList.module.css';

const TransmittalList = ({ transmittals, onTransmittalClick, type }) => {
  const isOutgoing = type === 'OUTGOING';

  const getStatusBadge = (status) => {
    const statusConfig = {
      DRAFT: { variant: 'neutral', label: 'Borrador' },
      SENT: { variant: 'info', label: 'Enviado' },
      RECEIVED: { variant: 'info', label: 'Recibido' },
      PENDING_RESPONSE: { variant: 'warning', label: 'Pendiente Respuesta' },
      RESPONDED: { variant: 'success', label: 'Respondido' },
      CLOSED: { variant: 'neutral', label: 'Cerrado' }
    };

    const config = statusConfig[status] || { variant: 'neutral', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className={styles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>{isOutgoing ? 'Destinatario' : 'Remitente'}</TableHeader>
            <TableHeader>Asunto</TableHeader>
            <TableHeader>Fecha</TableHeader>
            <TableHeader>Docs</TableHeader>
            <TableHeader>Estado</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {transmittals.map((transmittal) => (
            <TableRow
              key={transmittal.id}
              onClick={() => onTransmittalClick(transmittal)}
            >
              <TableCell>
                <span className={styles.code}>{transmittal.code}</span>
              </TableCell>
              <TableCell>
                <span className={styles.party}>
                  {isOutgoing ? transmittal.recipient : transmittal.sender || 'N/A'}
                </span>
              </TableCell>
              <TableCell>
                <span className={styles.subject}>{transmittal.subject}</span>
              </TableCell>
              <TableCell>
                <span className={styles.date}>
                  {formatDate(transmittal.date)}
                </span>
              </TableCell>
              <TableCell>
                <span className={styles.docCount}>
                  {transmittal.documentCount || 0}
                </span>
              </TableCell>
              <TableCell>
                {getStatusBadge(transmittal.status)}
              </TableCell>
              <TableCell>
                <button
                  className={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTransmittalClick(transmittal);
                  }}
                  title="Ver detalles"
                >
                  👁️
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransmittalList;

