import React from 'react';
import styles from './DebateGuide.module.css';

const INDIA_CODE_CONSTITUTION = 'https://upload.indiacode.nic.in/showfile?actid=AC_AN_91_1361_00006_00006_1696917644691&filename=constitution_of_india.pdf&type=actfile';
const INDIA_CODE_RTE = 'https://www.indiacode.nic.in/bitstream/123456789/19958/1/rte2009_eng.pdf';

function getSources(questId) {
  if (questId === 'playground-partition') {
    return [{ label: 'Constitution of India · Article 14', href: INDIA_CODE_CONSTITUTION }];
  }
  if (questId === 'midday-meal') {
    return [
      { label: 'Constitution of India · Article 21A', href: INDIA_CODE_CONSTITUTION },
      { label: 'Right to Education Act, 2009', href: INDIA_CODE_RTE },
    ];
  }
  return [];
}

const TALKING_CIRCLE_RULES = [
  { icon: '👂', title: 'Listen to understand', text: 'Let a speaker finish before replying.' },
  { icon: '🧭', title: 'Question the idea kindly', text: 'Disagree with a suggestion, never label a person.' },
  { icon: '🌱', title: 'Make space for every voice', text: 'A student may pass or share with a partner instead.' },
  { icon: '🛟', title: 'Ask a trusted adult', text: 'Pause the activity if someone needs support.' },
];

export default function DebateGuide({ quest }) {
  const sources = getSources(quest.id);

  return (
    <section className={styles.root} aria-labelledby="debate-guide-title">
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">🗣️</span>
        <div>
          <span className={styles.eyebrow}>BAL SANSAD · CLASS DISCUSSION</span>
          <h3 id="debate-guide-title">Make room for every perspective</h3>
        </div>
      </div>

      <div className={styles.promptCard}>
        <span className={styles.promptLabel}>ASK THE CLASS</span>
        <p>{quest.discussionPrompt}</p>
      </div>

      <div className={styles.rules} aria-label="Talking circle agreements">
        {TALKING_CIRCLE_RULES.map((rule) => (
          <article key={rule.title} className={styles.rule}>
            <span aria-hidden="true">{rule.icon}</span>
            <div><h4>{rule.title}</h4><p>{rule.text}</p></div>
          </article>
        ))}
      </div>

      <p className={styles.rightsNote}><strong>Rights connection:</strong> {quest.legalNote}</p>
      {sources.length > 0 && (
        <div className={styles.sources}>
          <span>TEACHER REFERENCES</span>
          {sources.map((source) => (
            <a key={source.label} href={source.href} target="_blank" rel="noreferrer">
              {source.label}<span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      )}
      <p className={styles.disclaimer}>Learning discussion only; not legal advice or a place to share private details.</p>
    </section>
  );
}
