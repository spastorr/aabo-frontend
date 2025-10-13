/**
 * RFIStatusTracker Component
 * Visual status tracking for RFI lifecycle
 * @module features/projects/rfi/components/RFIStatusTracker
 */

import { RFI_STATUS } from '../../../../../constants/statuses';
import styles from './RFIStatusTracker.module.css';

const STATUS_STEPS = [
  {
    status: RFI_STATUS.OPEN,
    label: 'Abierta',
    icon: '📝',
    description: 'RFI creada y enviada',
  },
  {
    status: RFI_STATUS.PENDING_RESPONSE,
    label: 'Pendiente',
    icon: '⏳',
    description: 'Esperando respuesta del destinatario',
  },
  {
    status: RFI_STATUS.ANSWERED,
    label: 'Respondida',
    icon: '✅',
    description: 'Respuesta recibida',
  },
  {
    status: RFI_STATUS.CLOSED,
    label: 'Cerrada',
    icon: '🔒',
    description: 'RFI cerrada',
  },
];

const RFIStatusTracker = ({ currentStatus }) => {
  const getCurrentStepIndex = () => {
    return STATUS_STEPS.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  const isStepCompleted = (stepIndex) => {
    return stepIndex <= currentStepIndex;
  };

  const isStepActive = (stepIndex) => {
    return stepIndex === currentStepIndex;
  };

  return (
    <div className={styles.tracker}>
      <div className={styles.steps}>
        {STATUS_STEPS.map((step, index) => (
          <div key={step.status} className={styles.stepWrapper}>
            {/* Step */}
            <div
              className={`
                ${styles.step}
                ${isStepCompleted(index) ? styles.stepCompleted : ''}
                ${isStepActive(index) ? styles.stepActive : ''}
              `}
            >
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepLabel}>{step.label}</div>
                <div className={styles.stepDescription}>{step.description}</div>
              </div>
            </div>

            {/* Connector */}
            {index < STATUS_STEPS.length - 1 && (
              <div
                className={`
                  ${styles.connector}
                  ${isStepCompleted(index) ? styles.connectorCompleted : ''}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RFIStatusTracker;

