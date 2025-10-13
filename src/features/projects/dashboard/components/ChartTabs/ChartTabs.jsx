/**
 * ChartTabs component
 * Tabbed container for S-Curve and Budget charts
 * @module features/projects/dashboard/components/ChartTabs
 */

import { useState } from 'react';
import Card from '../../../../../components/shared/Card';
import SCurveChart from '../ProgressChart/SCurveChart';
import BudgetOverTimeChart from '../CostWidget/BudgetOverTimeChart';
import BudgetChart from '../CostWidget/BudgetChart';
import styles from './ChartTabs.module.css';

const ChartTabs = ({ sCurveData, budgetData, budgetOverTime }) => {
  const [activeTab, setActiveTab] = useState('scurve');
  const [budgetView, setBudgetView] = useState('timeline'); // 'timeline' or 'discipline'

  // Calculate overall budget totals for discipline view
  const overallBudget = budgetData.reduce((acc, item) => ({
    budgeted: acc.budgeted + item.budgeted,
    spent: acc.spent + item.spent,
  }), { budgeted: 0, spent: 0 });

  overallBudget.remaining = overallBudget.budgeted - overallBudget.spent;
  overallBudget.percentage = (overallBudget.spent / overallBudget.budgeted) * 100;

  return (
    <Card className={styles.tabsCard}>
      <div className={styles.tabsHeader}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'scurve' ? styles.active : ''}`}
            onClick={() => setActiveTab('scurve')}
          >
            📈 Curva S
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'budget' ? styles.active : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            💰 Presupuesto por Disciplina
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'scurve' ? (
          <div>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Curva S - Avance del Proyecto</h3>
              <div className={styles.info}>
                <span className={styles.infoLabel}>Semana Actual:</span>
                <span className={styles.infoValue}>{sCurveData.currentWeek}</span>
              </div>
            </div>
            <SCurveChart
              plannedData={sCurveData.planned}
              actualData={sCurveData.actual}
              currentWeek={sCurveData.currentWeek}
            />
          </div>
        ) : (
          <div>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Ejecución de Presupuesto</h3>
              <div className={styles.budgetViewToggle}>
                <button
                  className={`${styles.viewToggleBtn} ${budgetView === 'timeline' ? styles.activeView : ''}`}
                  onClick={() => setBudgetView('timeline')}
                >
                  Línea de Tiempo
                </button>
                <button
                  className={`${styles.viewToggleBtn} ${budgetView === 'discipline' ? styles.activeView : ''}`}
                  onClick={() => setBudgetView('discipline')}
                >
                  Por Disciplina
                </button>
              </div>
            </div>
            
            {budgetView === 'timeline' ? (
              <BudgetOverTimeChart
                plannedBudget={budgetOverTime.planned}
                actualBudget={budgetOverTime.actual}
                currentWeek={budgetOverTime.currentWeek}
                totalBudget={budgetOverTime.totalBudget}
              />
            ) : (
              <BudgetChart
                budgetData={budgetData}
                overall={overallBudget}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartTabs;

