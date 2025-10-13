/**
 * CostBreakdownModal component
 * Shows cost breakdown details with link to timesheets
 * @module features/projects/lmd/components/CostBreakdownModal
 */

import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../../../components/shared/Modal';
import Button from '../../../../../components/shared/Button';
import { formatCurrency } from '../../../../../utils';
import styles from './CostBreakdownModal.module.css';

const CostBreakdownModal = ({ isOpen, onClose, costBreakdown, cost, documentCode, revision }) => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  if (!costBreakdown) return null;

  const handleViewTimesheets = () => {
    onClose();
    navigate(`/projects/${projectId}/timesheets?document=${documentCode}&revision=${revision}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Desglose de Costos"
      size="small"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleViewTimesheets}>
            📋 Ver Planillas
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.breakdown}>
          <div className={styles.row}>
            <span className={styles.label}>Recurso</span>
            <span className={styles.value}>{costBreakdown.resource}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Horas trabajadas</span>
            <span className={styles.value}>{costBreakdown.hours} hrs</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Tarifa por hora</span>
            <span className={styles.value}>{formatCurrency(costBreakdown.rate)}/hr</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.row}>
            <span className={styles.labelTotal}>Total</span>
            <span className={styles.valueTotal}>{formatCurrency(cost)}</span>
          </div>
        </div>

        <div className={styles.calculation}>
          <span className={styles.calculationLabel}>Cálculo:</span>
          <span className={styles.calculationFormula}>
            {costBreakdown.hours} hrs × {formatCurrency(costBreakdown.rate)}/hr = {formatCurrency(cost)}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default CostBreakdownModal;

