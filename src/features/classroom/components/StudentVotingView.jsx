import React, { useEffect, useState } from 'react';
import ConsensusChart from './ConsensusChart';
import styles from './StudentVotingView.module.css';

export default function StudentVotingView({ quest, room, onVote }) {
  const [selectedOptionId, setSelectedOptionId] = useState(room?.myVoteOptionId || '');
  const revealed = Array.isArray(room?.tally);

  useEffect(() => {
    if (room?.myVoteOptionId) setSelectedOptionId(room.myVoteOptionId);
  }, [room?.myVoteOptionId]);

  const hasSubmitted = Boolean(room?.myVoteOptionId);
  const canVote = room?.stage === 'VOTING_OPEN';

  return (
    <section className={styles.root} aria-labelledby="student-vote-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>CLASSROOM DILEMMA · {quest.realm}</span>
          <h2 id="student-vote-title">{quest.title}</h2>
          <p>{quest.articleRef}</p>
        </div>
        <span className={styles.roomBadge} aria-label={`${room.participantCount} students connected`}>
          👥 {room.participantCount} here
        </span>
      </header>

      <div className={styles.dilemma}>
        <span aria-hidden="true">💭</span>
        <p>{quest.dilemma}</p>
      </div>

      {canVote && (
        <div className={styles.ballot}>
          <h3>What do you think?</h3>
          <p className={styles.privateHint}>Your choice stays private until your teacher reveals the class results.</p>
          <div className={styles.options} role="group" aria-label="Choose your classroom response">
            {quest.options.map((option, index) => (
              <button
                key={option.id}
                aria-pressed={selectedOptionId === option.id}
                className={`${styles.option} ${selectedOptionId === option.id ? styles.optionSelected : ''}`}
                onClick={() => setSelectedOptionId(option.id)}
                type="button"
              >
                <span className={styles.optionLetter} aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <span>{option.label}</span>
                {selectedOptionId === option.id && <span className={styles.selectedMark} aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
          <div className={styles.submitRow}>
            <span className={styles.submitStatus} role="status">
              {hasSubmitted ? 'Your vote is saved. You can change it while voting is open.' : 'You can change your mind until voting closes.'}
            </span>
            <button
              className={styles.submitButton}
              disabled={!selectedOptionId || selectedOptionId === room.myVoteOptionId}
              onClick={() => onVote(selectedOptionId)}
              type="button"
            >
              {hasSubmitted ? 'Update my vote' : 'Submit my vote'}
            </button>
          </div>
        </div>
      )}

      {room.stage === 'LOBBY' && (
        <div className={styles.waiting} role="status">
          <span className={styles.waitingIcon} aria-hidden="true">🌱</span>
          <h3>You’re in the room</h3>
          <p>Your teacher will open the dilemma when everyone is ready.</p>
        </div>
      )}

      {room.stage === 'VOTING_CLOSED' && (
        <div className={styles.waiting} role="status">
          <span className={styles.waitingIcon} aria-hidden="true">🗳️</span>
          <h3>Voting is closed</h3>
          <p>Hold your thought for a moment. Your teacher will reveal the class choices soon.</p>
        </div>
      )}

      {revealed && (
        <div className={styles.results} aria-labelledby="class-vote-results">
          <h3 id="class-vote-results" className={styles.resultsTitle}>Here’s how the class voted</h3>
          <ConsensusChart quest={quest} room={room} compact />
          <p className={styles.reflection}>{quest.reflection}</p>
          {room.stage === 'DEBATE_GUIDE' && <p className={styles.discussionPrompt}>{quest.discussionPrompt}</p>}
        </div>
      )}

      {room.stage === 'COMPLETED' && (
        <p className={styles.finished} role="status">This classroom conversation has ended. Thank you for listening and sharing thoughtfully.</p>
      )}
    </section>
  );
}
