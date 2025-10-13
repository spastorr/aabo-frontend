/**
 * TeamSelectionModal - Modal for selecting team members
 * @module features/projects/portfolio/components/CreateProjectModal/TeamSelectionModal
 */

import { useState, useMemo } from 'react';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import SearchBar from '../../../../../components/shared/SearchBar';
import Select from '../../../../../components/shared/Select';
import styles from './TeamSelectionModal.module.css';

const TeamSelectionModal = ({ 
  isOpen, 
  onClose, 
  availableMembers = [], 
  selectedMembers = [],
  onConfirm,
  loading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [tempSelected, setTempSelected] = useState([]);

  // Initialize temp selection when modal opens
  useState(() => {
    if (isOpen) {
      setTempSelected(selectedMembers);
    }
  }, [isOpen, selectedMembers]);

  // Get unique disciplines from available members
  const disciplines = useMemo(() => {
    const uniqueDisciplines = [...new Set(availableMembers.map(m => m.discipline))];
    return uniqueDisciplines.map(d => ({ value: d, label: d }));
  }, [availableMembers]);

  // Get initials from name
  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get avatar color based on discipline
  const getAvatarColor = (discipline) => {
    const colors = {
      'Gestión': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'Procesos': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'Mecánica': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      'Eléctrica': 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      'Civil': 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      'Instrumentación': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    };
    return colors[discipline] || 'linear-gradient(135deg, #48cae4 0%, #3b82f6 100%)';
  };

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return availableMembers.filter((member) => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesSearch = 
          member.name.toLowerCase().includes(search) ||
          member.role.toLowerCase().includes(search) ||
          member.discipline.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }

      // Discipline filter
      if (disciplineFilter !== 'all' && member.discipline !== disciplineFilter) {
        return false;
      }

      // Availability filter
      if (availabilityFilter === 'high' && member.availableHours <= 40) {
        return false;
      }
      if (availabilityFilter === 'medium' && (member.availableHours <= 10 || member.availableHours > 40)) {
        return false;
      }
      if (availabilityFilter === 'low' && member.availableHours > 10) {
        return false;
      }

      return true;
    });
  }, [availableMembers, searchTerm, disciplineFilter, availabilityFilter]);

  // Check if member is selected
  const isSelected = (memberId) => {
    return tempSelected.some(m => m.id === memberId);
  };

  // Toggle member selection
  const toggleMember = (member) => {
    if (isSelected(member.id)) {
      setTempSelected(tempSelected.filter(m => m.id !== member.id));
    } else {
      setTempSelected([...tempSelected, member]);
    }
  };

  // Select all filtered members
  const selectAll = () => {
    const allIds = tempSelected.map(m => m.id);
    const newMembers = filteredMembers.filter(m => !allIds.includes(m.id));
    setTempSelected([...tempSelected, ...newMembers]);
  };

  // Deselect all
  const deselectAll = () => {
    setTempSelected([]);
  };

  // Confirm selection
  const handleConfirm = () => {
    onConfirm(tempSelected);
    onClose();
  };

  // Cancel selection
  const handleCancel = () => {
    setTempSelected(selectedMembers);
    setSearchTerm('');
    setDisciplineFilter('all');
    setAvailabilityFilter('all');
    onClose();
  };

  // Get availability class
  const getAvailabilityClass = (hours) => {
    if (hours > 40) return styles.available;
    if (hours > 10) return styles.limited;
    return styles.unavailable;
  };

  const availabilityOptions = [
    { value: 'all', label: 'Todas las disponibilidades' },
    { value: 'high', label: 'Alta disponibilidad (>40h)' },
    { value: 'medium', label: 'Disponibilidad media (10-40h)' },
    { value: 'low', label: 'Baja disponibilidad (<10h)' },
  ];

  const modalFooter = (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <span className={styles.selectedCount}>
          {tempSelected.length} {tempSelected.length === 1 ? 'miembro seleccionado' : 'miembros seleccionados'}
        </span>
      </div>
      <div className={styles.footerRight}>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar Selección
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Seleccionar Miembros del Equipo"
      size="large"
      footer={modalFooter}
    >
      <div className={styles.container}>
        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar por nombre, rol o disciplina..."
            />
          </div>

          <div className={styles.filters}>
            <Select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todas las disciplinas' },
                ...disciplines
              ]}
            />
            <Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              options={availabilityOptions}
            />
          </div>

          <div className={styles.bulkActions}>
            <Button 
              variant="outline" 
              size="small" 
              onClick={selectAll}
              disabled={filteredMembers.length === 0}
            >
              Seleccionar todos ({filteredMembers.length})
            </Button>
            <Button 
              variant="outline" 
              size="small" 
              onClick={deselectAll}
              disabled={tempSelected.length === 0}
            >
              Deseleccionar todos
            </Button>
          </div>
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando recursos disponibles...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No se encontraron recursos</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className={styles.membersGrid}>
            {filteredMembers.map((member) => {
              const selected = isSelected(member.id);
              return (
                <div
                  key={member.id}
                  className={`${styles.memberCard} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleMember(member)}
                >
                  <div className={styles.cardHeader}>
                    <div 
                      className={styles.memberAvatar}
                      style={{ background: getAvatarColor(member.discipline) }}
                    >
                      {getInitials(member.name)}
                    </div>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {}}
                      className={styles.checkbox}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <h4 className={styles.memberName}>{member.name}</h4>
                    <p className={styles.memberRole}>{member.role}</p>

                    <div className={styles.memberStats}>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>Disciplina</span>
                        <span className={styles.discipline}>
                          {member.discipline}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>Disponibilidad</span>
                        <span className={`${styles.availability} ${getAvailabilityClass(member.availableHours)}`}>
                          {member.availableHours}h
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>Utilización</span>
                        <div className={styles.utilizationBar}>
                          <div 
                            className={styles.utilizationFill}
                            style={{ width: `${member.utilization}%` }}
                          />
                          <span className={styles.utilizationText}>{member.utilization.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TeamSelectionModal;

