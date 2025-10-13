/**
 * InboxOutbox - Component to display incoming or outgoing transmittals
 * @module features/projects/transmittals/components/InboxOutbox
 */

import { useState } from 'react';
import TransmittalList from '../TransmittalList';
import SearchBar from '../../../../../components/shared/SearchBar';
import Select from '../../../../../components/shared/Select';
import EmptyState from '../../../../../components/shared/EmptyState';
import styles from './InboxOutbox.module.css';

const InboxOutbox = ({ type, transmittals, onTransmittalClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const statusOptions = [
    { value: 'ALL', label: 'Todos los estados' },
    { value: 'DRAFT', label: 'Borrador' },
    { value: 'SENT', label: 'Enviado' },
    { value: 'RECEIVED', label: 'Recibido' },
    { value: 'PENDING_RESPONSE', label: 'Pendiente Respuesta' },
    { value: 'RESPONDED', label: 'Respondido' },
    { value: 'CLOSED', label: 'Cerrado' }
  ];

  // Filter transmittals
  const filteredTransmittals = transmittals.filter(t => {
    const matchesSearch = 
      t.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sender?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const isOutgoing = type === 'OUTGOING';

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Buscar en ${isOutgoing ? 'enviados' : 'recibidos'}...`}
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Transmittal List or Empty State */}
      {filteredTransmittals.length > 0 ? (
        <TransmittalList
          transmittals={filteredTransmittals}
          onTransmittalClick={onTransmittalClick}
          type={type}
        />
      ) : (
        <EmptyState
          icon={isOutgoing ? '📤' : '📥'}
          title={
            searchTerm || statusFilter !== 'ALL' 
              ? 'No se encontraron transmittals'
              : `No hay transmittals ${isOutgoing ? 'enviados' : 'recibidos'}`
          }
          description={
            searchTerm || statusFilter !== 'ALL'
              ? 'Intenta ajustar los filtros de búsqueda'
              : `Los transmittals ${isOutgoing ? 'enviados' : 'recibidos'} aparecerán aquí`
          }
        />
      )}
    </div>
  );
};

export default InboxOutbox;

