import React from 'react';
import styles from './ActivityJournal.module.css';

export default function ActivityJournal({ transactions = [] }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon} aria-hidden="true">📜</span>
        <h3 className={styles.emptyTitle}>Your Journal is Blank</h3>
        <p className={styles.emptyText}>
          Solve your first quest on the World Map to start recording your constitutional discoveries!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.root} role="region" aria-label="Explorer Activity Journal">
      <div className={styles.header}>
        <div className={styles.eyebrow}>DISCOVERY AUDIT LOG</div>
        <h2 className={styles.heading}>The Expedition Chronicles</h2>
        <p className={styles.subtext}>
          A transparent, tamper-proof record of every milestone and constitutional insight earned.
        </p>
      </div>

      <div className={styles.logList}>
        {transactions.map((tx) => (
          <div key={tx.id} className={styles.txCard}>
            <div className={styles.leftCol}>
              <div className={styles.amountPill}>
                +{tx.amount} XP
              </div>
              <span className={styles.txDate}>
                {tx.awardedAt
                  ? new Date(tx.awardedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Recent Discovery'}
              </span>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.txHeader}>
                <span className={styles.txType}>{tx.eventType?.replace('_', ' ')}</span>
                {tx.badgesUnlocked && tx.badgesUnlocked.length > 0 && (
                  <span className={styles.badgePill}>
                    🎖️ {tx.badgesUnlocked.join(', ')} Unlocked
                  </span>
                )}
              </div>
              <h3 className={styles.txTitle}>{tx.title}</h3>
              <p className={styles.txDesc}>{tx.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

