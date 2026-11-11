import React, { useState } from 'react';
import { CURRICULUM_ALIGNMENTS } from '../../intelligence/data/intelligenceData';
import styles from './FamilyConversationStarters.module.css';

export function FamilyConversationStarters() {
  const [selectedRealmId, setSelectedRealmId] = useState(CURRICULUM_ALIGNMENTS[0].realmId);
  const activePrompt = CURRICULUM_ALIGNMENTS.find((a) => a.realmId === selectedRealmId) || CURRICULUM_ALIGNMENTS[0];

  return (
    <section className={styles.section} aria-labelledby="family-conversations-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Family Dialogue & Offline Connection</span>
        <h2 id="family-conversations-title" className={styles.title}>
          “At the Dinner Table” Discussion Primers
        </h2>
        <p className={styles.subtitle}>
          Turn screen-based learning into meaningful family conversations about fairness, boundaries, and rights.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.realmTabs}>
          {CURRICULUM_ALIGNMENTS.map((item) => (
            <button
              key={item.realmId}
              type="button"
              className={`${styles.tabBtn} ${item.realmId === selectedRealmId ? styles.activeTab : ''}`}
              onClick={() => setSelectedRealmId(item.realmId)}
            >
              <span className={styles.tabName}>{item.realmName}</span>
              <span className={styles.tabLaw}>{item.statutoryArticles[0]}</span>
            </button>
          ))}
        </div>

        <div className={styles.contentCard}>
          <div className={styles.promptBox}>
            <span className={styles.promptTag}>🍽️ Today’s Dinner Table Starter</span>
            <blockquote className={styles.promptQuote}>
              “{activePrompt.familyDinnerPrompt}”
            </blockquote>
          </div>

          <div className={styles.activityBox}>
            <span className={styles.activityTag}>🏡 Screen-Free Family Activity</span>
            <p className={styles.activityDesc}>
              {activePrompt.familyOfflineActivity}
            </p>
          </div>

          <div className={styles.guardianTip}>
            <span className={styles.tipIcon}>💡</span>
            <p>
              <strong>Parenting Tip:</strong> There is no single "correct" answer. The goal is to create a safe space where children feel heard, respected, and confident in expressing their observations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

