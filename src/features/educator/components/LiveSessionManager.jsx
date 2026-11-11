import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLASSROOM_QUESTS } from '../../classroom/data/classroomQuests';
import styles from './LiveSessionManager.module.css';

export function LiveSessionManager() {
  const [selectedQuestId, setSelectedQuestId] = useState(CLASSROOM_QUESTS[0]?.id || 'dev-workshop');
  const quest = CLASSROOM_QUESTS.find((q) => q.id === selectedQuestId) || CLASSROOM_QUESTS[0];

  return (
    <section className={styles.section} aria-labelledby="live-session-manager-title">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Part 05 Synchronous Bridge</span>
          <h2 id="live-session-manager-title" className={styles.title}>
            Live Classroom Facilitator & Consensus Room
          </h2>
        </div>
        <Link to="/classroom" className={styles.directLaunchLink}>
          Launch Teacher Console →
        </Link>
      </div>

      <div className={styles.contentGrid}>
        {/* Quest Selector */}
        <div className={styles.questPicker}>
          <span className={styles.pickerLabel}>Available Deliberation Quests:</span>
          <div className={styles.questCards}>
            {CLASSROOM_QUESTS.map((item) => {
              const active = item.id === selectedQuestId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.questOption} ${active ? styles.questActive : ''}`}
                  onClick={() => setSelectedQuestId(item.id)}
                >
                  <div className={styles.questTop}>
                    <span className={styles.questArticle}>{item.articleRef}</span>
                    <span className={styles.choiceCount}>{item.choices?.length || 3} stances</span>
                  </div>
                  <div className={styles.questName}>{item.title}</div>
                  <div className={styles.questSummary}>{item.summary}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quest Preview & Launch Card */}
        <div className={styles.launchCard}>
          <div className={styles.badgeRow}>
            <span className={styles.activeTag}>Facilitation Ready</span>
            <span className={styles.lawTag}>{quest?.articleRef}</span>
          </div>

          <h3 className={styles.questHeading}>{quest?.title}</h3>
          <p className={styles.questPrompt}>{quest?.prompt}</p>

          <div className={styles.stancesBox}>
            <span className={styles.stancesHeading}>Student Perspectives to Deliberate:</span>
            <div className={styles.stanceList}>
              {quest?.choices?.map((choice) => (
                <div key={choice.id} className={styles.stanceItem}>
                  <span className={styles.stanceKey}>{choice.id}</span>
                  <div className={styles.stanceContent}>
                    <strong>{choice.label}</strong>
                    <p>{choice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.legalNoteBox}>
            <strong>Constitutional Context:</strong> {quest?.legalNote}
          </div>

          <div className={styles.workflowSteps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <span>Generate 6-character room PIN (<code>RQ-####</code>)</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <span>Students join anonymously with animal avatars (no sign-up)</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <span>Conduct blind voting & reveal interactive consensus chart</span>
            </div>
          </div>

          <div className={styles.cardActions}>
            <Link
              to={`/classroom?quest=${quest?.id}`}
              className={styles.primaryLaunchBtn}
            >
              Start Live Room with This Dilemma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

