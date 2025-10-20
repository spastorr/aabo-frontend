/**
 * AllTransmittals - Component to display all transmittals (incoming and outgoing) in a unified view
 * @module features/projects/transmittals/components/AllTransmittals
 */

import { useState } from 'react';
import TransmittalList from '../TransmittalList';
import SearchBar from '../../../../../components/shared/SearchBar';
import Select from '../../../../../components/shared/Select';
import EmptyState from '../../../../../components/shared/EmptyState';
import styles from './AllTransmittals.module.css';

const AllTransmittals = ({ transmittals, onTransmittalClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const statusOptions = [
    { value: 'ALL', label: 'Todos los estados' },
    { value: 'DRAFT', label: 'Borrador' },
    { value: 'SENT', label: 'Enviado' },
    { value: 'RECEIVED', label: 'Recibido' },
    { value: 'PENDING_RESPONSE', label: 'Pendiente Respuesta' },
    { value: 'RESPONDED', label: 'Respondido' },
    { value: 'CLOSED', label: 'Cerrado' }
  ];

  const typeOptions = [
    { value: 'ALL', label: 'Todos los tipos' },
    { value: 'INCOMING', label: '📥 Entrada' },
    { value: 'OUTGOING', label: '📤 Salida' }
  ];

  // Filter transmittals
  const filteredTransmittals = transmittals.filter(t => {
    const matchesSearch = 
      t.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sender?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || t.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort transmittals by date (most recent first)
  const sortedTransmittals = [...filteredTransmittals].sort((a, b) => {
    return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
  });

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar en todos los transmittals..."
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={typeOptions}
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

      {/* Summary Stats */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{transmittals.length}</span>
          <span className={styles.summaryLabel}>Total</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>
            {transmittals.filter(t => t.type === 'OUTGOING').length}
          </span>
          <span className={styles.summaryLabel}>Enviados</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>
            {transmittals.filter(t => t.type === 'INCOMING').length}
          </span>
          <span className={styles.summaryLabel}>Recibidos</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>
            {transmittals.filter(t => t.status === 'PENDING_RESPONSE').length}
          </span>
          <span className={styles.summaryLabel}>Pendientes</span>
        </div>
      </div>

      {/* Transmittal List or Empty State */}
      {sortedTransmittals.length > 0 ? (
        <TransmittalList
          transmittals={sortedTransmittals}
          onTransmittalClick={onTransmittalClick}
          type="ALL"
        />
      ) : (
        <EmptyState
          icon="📋"
          title={
            searchTerm || statusFilter !== 'ALL' || typeFilter !== 'ALL'
              ? 'No se encontraron transmittals'
              : 'No hay transmittals'
          }
          description={
            searchTerm || statusFilter !== 'ALL' || typeFilter !== 'ALL'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Los transmittals aparecerán aquí cuando se creen'
          }
        />
      )}
    </div>
  );
};

export default AllTransmittals;
