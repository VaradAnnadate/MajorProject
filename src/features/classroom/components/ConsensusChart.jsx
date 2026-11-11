import React from 'react';
import styles from './ConsensusChart.module.css';

export default function ConsensusChart({ quest, room, compact = false }) {
  const revealed = Array.isArray(room?.tally);
  const tally = room?.tally || [];
  const totalVotes = room?.voteCount || 0;
  const results = quest.options.map((option) => {
    const count = tally.find((entry) => entry.optionId === option.id)?.count || 0;
    const percentage = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
    return { ...option, count, percentage };
  });
  const leader = results.reduce((best, result) => result.count > best.count ? result : best, results[0]);
  const reachedBenchmark = totalVotes > 0 && leader.percentage >= (quest.consensusBenchmark || 60);

  return (
    <section className={`${styles.root} ${compact ? styles.compact : ''}`} aria-labelledby="class-consensus-title">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>A CLASSROOM SNAPSHOT</span>
          <h3 id="class-consensus-title">{revealed ? 'Our choices, together' : 'Votes are private for now'}</h3>
        </div>
        <span className={styles.voteCount}>{revealed ? `${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'}` : `${room.voteCount} in`}</span>
      </div>

      {!revealed ? (
        <p className={styles.waitingText}>
          The class can see how many people have voted. Individual choices stay hidden until the facilitator reveals the results.
        </p>
      ) : totalVotes === 0 ? (
        <p className={styles.waitingText}>No votes were cast this round. The class can still discuss the dilemma together.</p>
      ) : (
        <>
          <ol className={styles.results}>
            {results.map((result, index) => (
              <li key={result.id} className={styles.result}>
                <div className={styles.labelRow}>
                  <span className={styles.optionLabel}><span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>{result.label}</span>
                  <strong>{result.percentage}% <span className={styles.voteNumber}>({result.count})</span></strong>
                </div>
                <div className={styles.track} role="img" aria-label={`${result.percentage}% chose ${result.label}`}>
                  <span style={{ width: `${result.percentage}%` }} />
                </div>
              </li>
            ))}
          </ol>
          <p className={reachedBenchmark ? styles.consensus : styles.divided} role="status">
            {reachedBenchmark
              ? `The largest share chose “${leader.label}.” That reaches the ${quest.consensusBenchmark || 60}% discussion marker; the class can still hear every perspective.`
              : 'The class chose different paths. That is a good starting point for listening and respectful debate.'}
          </p>
        </>
      )}
    </section>
  );
}
