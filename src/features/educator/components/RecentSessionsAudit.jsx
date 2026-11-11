import React from 'react';
import { HISTORICAL_CLASSROOM_SESSIONS } from '../../intelligence/data/intelligenceData';
import styles from './RecentSessionsAudit.module.css';

export function RecentSessionsAudit() {
  return (
    <section className={styles.section} aria-labelledby="sessions-audit-title">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Collaborative Audit Trail</span>
          <h2 id="sessions-audit-title" className={styles.title}>
            Recent Classroom Deliberation Archives
          </h2>
        </div>
        <div className={styles.complianceTag}>
          <span>🔒 Anonymized Cohort Consensus Only</span>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.responsiveTableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Room PIN</th>
                <th>Dilemma Quest</th>
                <th>Participants</th>
                <th>Classroom Consensus Outcome</th>
                <th>Facilitation Notes</th>
              </tr>
            </thead>
            <tbody>
              {HISTORICAL_CLASSROOM_SESSIONS.map((session) => (
                <tr key={session.id}>
                  <td className={styles.dateCell}>{session.date}</td>
                  <td>
                    <code className={styles.pinCode}>{session.pin}</code>
                  </td>
                  <td className={styles.questCell}>
                    <strong>{session.questTitle}</strong>
                  </td>
                  <td className={styles.participantCell}>
                    <span className={styles.avatarIcon}>👥</span>
                    <span>{session.participantsCount} learners</span>
                  </td>
                  <td>
                    <div className={styles.consensusBox}>
                      <span className={styles.consensusText}>{session.consensusOutcome}</span>
                      <span className={styles.consensusPct}>{session.majorityPercentage}%</span>
                    </div>
                  </td>
                  <td className={styles.notesCell}>{session.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

