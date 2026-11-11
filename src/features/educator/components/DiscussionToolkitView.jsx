import React, { useState } from 'react';
import styles from './DiscussionToolkitView.module.css';

const TOOLKIT_STRATEGIES = [
  {
    id: 'socratic-scaffolding',
    title: 'The Socratic Inquiry Method for Rights Dilemmas',
    objective: 'Shift students from surface emotional reactions to principled constitutional reasoning.',
    icon: '💡',
    steps: [
      'Acknowledge the emotional tension: Validate why choices feel difficult in real life.',
      'Identify the competing principles: (e.g. Friendship loyalty vs. child safety and legal protection).',
      'Anchor to fundamental rights: Ask which constitutional guarantee protects the vulnerable party.',
      'Formulate collective resolution: Guide the class toward action steps that preserve dignity for all.',
    ],
  },
  {
    id: 'bystander-de-escalation',
    title: 'Active Bystander Intervention Protocol',
    objective: 'Empower quiet students to recognize when and how to mobilize trusted adults safely.',
    icon: '🛡️',
    steps: [
      'Assess personal safety: Never place oneself in direct physical danger.',
      'Locate trusted allies: Identify peers and teachers who can support the intervention.',
      'Document facts calmly: Separate observed facts from rumors or assumptions.',
      'Activate institutional channels: Explain when to consult the school counselor, headmaster, or Childline 1098.',
    ],
  },
  {
    id: 'fishbowl-deliberation',
    title: 'The Constitutional Fishbowl Debate',
    objective: 'Encourage reflective listening and perspective-taking on complex social realities.',
    icon: '🗣️',
    steps: [
      'Inner circle speaks for 3 minutes examining one stakeholder’s dilemma.',
      'Outer circle listens without interrupting, taking notes on arguments presented.',
      'Roles rotate so every student experiences speaking and active listening.',
      'Debrief collectively: What common ground or constitutional consensus emerged?',
    ],
  },
];

export function DiscussionToolkitView() {
  const [activeStrategyId, setActiveStrategyId] = useState(TOOLKIT_STRATEGIES[0].id);
  const strategy = TOOLKIT_STRATEGIES.find((s) => s.id === activeStrategyId) || TOOLKIT_STRATEGIES[0];

  return (
    <section className={styles.section} aria-labelledby="discussion-toolkit-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Pedagogical Facilitation</span>
        <h2 id="discussion-toolkit-title" className={styles.title}>
          Classroom Discussion & Deliberation Toolkit
        </h2>
        <p className={styles.subtitle}>
          Structured facilitation methods designed for Indian middle-school classrooms, fostering respectful discourse and constitutional empathy.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.tabNav}>
          {TOOLKIT_STRATEGIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.tabBtn} ${item.id === activeStrategyId ? styles.activeTab : ''}`}
              onClick={() => setActiveStrategyId(item.id)}
            >
              <span className={styles.tabIcon}>{item.icon}</span>
              <div className={styles.tabText}>
                <span className={styles.tabHeading}>{item.title}</span>
                <span className={styles.tabSub}>{item.objective}</span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailHeader}>
            <span className={styles.strategyIcon}>{strategy.icon}</span>
            <div>
              <h3 className={styles.strategyTitle}>{strategy.title}</h3>
              <p className={styles.strategyObj}>{strategy.objective}</p>
            </div>
          </div>

          <div className={styles.stepsContainer}>
            <span className={styles.stepsHeading}>Facilitation Sequence:</span>
            <ol className={styles.stepList}>
              {strategy.steps.map((step, idx) => (
                <li key={idx} className={styles.stepItem}>
                  <div className={styles.stepNumberBadge}>{idx + 1}</div>
                  <div className={styles.stepDescription}>{step}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.facilitatorTip}>
            <span className={styles.tipIcon}>📌</span>
            <p>
              <strong>Teacher Guidance Note:</strong> Never grade or penalize a student for expressing an unorthodox perspective during deliberation. Frame every viewpoint as an opportunity to trace back to Article 14 (Equality) and Article 21 (Life and Liberty).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

