import React from 'react';
import styles from './RecentSessionsAudit.module.css';

export function RecentSessionsAudit({ sessions = [], status = 'loading' }) {
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
                <th>Dilemma Quest</th>
                <th>Participants</th>
                <th>Aggregate consensus outcome</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={`${session.date}-${session.questId}-${index}`}>
                  <td className={styles.dateCell}>{session.date}</td>
                  <td className={styles.questCell}>
                    <strong>{session.questTitle}</strong>
                  </td>
                  <td className={styles.participantCell}>
                    <span className={styles.avatarIcon}>👥</span>
                    <span>{session.participantsCount} learners</span>
                  </td>
                  <td>
                    <div className={styles.consensusBox}>
                      <span className={styles.consensusText}>{session.winningOption}</span>
                      <span className={styles.consensusPct}>{session.majorityPercentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr><td colSpan="4" className={styles.notesCell}>
                  {status === 'loading' && 'Loading saved classroom summaries…'}
                  {status === 'unconfigured' && 'Supabase is not configured. Add the server environment settings to save classroom summaries.'}
                  {status === 'unavailable' && 'Classroom summaries could not be loaded. Check the backend and database connection.'}
                  {status === 'ready' && 'No completed classroom summaries yet. Rooms are recorded only after at least five students submit a vote.'}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

