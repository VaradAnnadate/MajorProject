import React from 'react';
import { Compass, Sparkles, Shield } from 'lucide-react';
import styles from './AgeBandSafetyView.module.css';

const AGE_STAGES = [
  {
    id: '8-10',
    range: '8–10 Years',
    title: 'The Young Navigators',
    symbol: '🌱',
    focus: 'Concrete boundaries, private parts rule, 3-step action (Say No, Run, Tell), and identifying trusted adults.'
  },
  {
    id: '11-13',
    range: '11–13 Years',
    title: 'The Pathfinders',
    symbol: '🧭',
    focus: 'Social boundaries, cyber safety, group chats, bystander intervention, and school anti-bullying directives.'
  },
  {
    id: '14-16',
    range: '14–16 Years',
    title: 'The Youth Advocates',
    symbol: '⚖️',
    focus: 'Constitutional liberty, POCSO legal framework, online extortion defense (1930), and civic rights defense.'
  }
];

export function AgeBandSafetyView({ selectedAgeBand, onSelectAgeBand }) {
  const currentStage = AGE_STAGES.find((s) => s.id === selectedAgeBand) || AGE_STAGES[0];

  return (
    <div className={styles.container}>
      <div className={styles.selectorBar} role="tablist" aria-label="Safety Age Adaptation Selector">
        {AGE_STAGES.map((stage) => {
          const isActive = stage.id === selectedAgeBand;
          return (
            <button
              key={stage.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectAgeBand(stage.id)}
              className={`${styles.agePill} ${isActive ? styles.agePillActive : ''}`}
            >
              <span>{stage.symbol}</span>
              <span>{stage.title} ({stage.range})</span>
            </button>
          );
        })}
      </div>

      <div className={styles.stageBanner}>
        <span className={styles.stageEyebrow}>Developmental & Legal Focus · {currentStage.title}</span>
        <p className={styles.stageText}>{currentStage.focus}</p>
      </div>
    </div>
  );
}

export default AgeBandSafetyView;

