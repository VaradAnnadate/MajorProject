import React, { useState } from 'react';
import { getAnimalAvatar } from '../data/animalAvatars';
import { ROOM_STATES } from '../engine/classroomTypes';
import ConsensusChart from './ConsensusChart';
import DebateGuide from './DebateGuide';
import styles from './TeacherConsole.module.css';

const ACTIONS = {
  [ROOM_STATES.LOBBY]: { action: 'open-voting', label: 'Show dilemma & open voting' },
  [ROOM_STATES.VOTING_OPEN]: { action: 'close-voting', label: 'Close voting' },
  [ROOM_STATES.VOTING_CLOSED]: { action: 'reveal-results', label: 'Reveal class results' },
  [ROOM_STATES.CONSENSUS_REVEAL]: { action: 'start-debate', label: 'Open discussion guide' },
  [ROOM_STATES.DEBATE_GUIDE]: { action: 'finish-room', label: 'Finish classroom session' },
};

const STAGE_LABELS = {
  [ROOM_STATES.LOBBY]: 'Waiting for the class',
  [ROOM_STATES.VOTING_OPEN]: 'Voting is open',
  [ROOM_STATES.VOTING_CLOSED]: 'Ballot closed',
  [ROOM_STATES.CONSENSUS_REVEAL]: 'Class results revealed',
  [ROOM_STATES.DEBATE_GUIDE]: 'Discussion time',
  [ROOM_STATES.COMPLETED]: 'Session complete',
};

export default function TeacherConsole({
  quests,
  room,
  connectionStatus,
  error,
  onCreateRoom,
  onAction,
  onLeave,
}) {
  const [selectedQuestId, setSelectedQuestId] = useState(quests[0]?.id || '');
  const [copyMessage, setCopyMessage] = useState('');
  const [localError, setLocalError] = useState('');
  const quest = room
    ? quests.find((item) => item.id === room.questId)
    : quests.find((item) => item.id === selectedQuestId);

  async function copyPin() {
    try {
      await navigator.clipboard.writeText(room.roomPin);
      setCopyMessage('PIN copied');
    } catch {
      setCopyMessage('Copy unavailable — read the PIN to your class');
    }
    window.setTimeout(() => setCopyMessage(''), 2500);
  }

  if (!room) {
    return (
      <section className={styles.root} aria-labelledby="teacher-setup-title">
        <div className={styles.setupIntro}>
          <span className={styles.eyebrow}>FACILITATOR CONSOLE</span>
          <h2 id="teacher-setup-title">Create a classroom room</h2>
          <p>Choose a short dilemma for a live conversation. Students join with a PIN and an animal codename.</p>
        </div>
        <label className={styles.fieldLabel} htmlFor="classroom-quest">Choose a dilemma</label>
        <select id="classroom-quest" className={styles.questSelect} value={selectedQuestId} onChange={(event) => setSelectedQuestId(event.target.value)}>
          {quests.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.minutes} min</option>)}
        </select>
        {quest && <p className={styles.questPreview}>{quest.synopsis}<span>{quest.articleRef}</span></p>}
        <p className={styles.error} role="alert">{error || localError}</p>
        <button className={styles.primaryButton} disabled={!selectedQuestId || connectionStatus === 'connecting'} onClick={() => { setLocalError(''); onCreateRoom(selectedQuestId); }} type="button">
          {connectionStatus === 'connecting' ? 'Opening room…' : 'Create room and show PIN'}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    );
  }

  const nextAction = ACTIONS[room.stage];
  const participants = room.participants || [];

  return (
    <section className={styles.root} aria-labelledby="teacher-console-title">
      <header className={styles.consoleHeader}>
        <div>
          <span className={styles.eyebrow}>FACILITATOR CONSOLE · {STAGE_LABELS[room.stage]}</span>
          <h2 id="teacher-console-title">{quest?.title || 'Classroom room'}</h2>
          <p>{quest?.articleRef}</p>
        </div>
        <span className={`${styles.connectionBadge} ${connectionStatus === 'connected' ? styles.connected : ''}`}>
          <span aria-hidden="true">●</span> {connectionStatus === 'connected' ? 'Live' : 'Reconnecting'}
        </span>
      </header>

      <div className={styles.pinPanel}>
        <div>
          <span className={styles.pinLabel}>ROOM PIN</span>
          <strong className={styles.pin}>{room.roomPin}</strong>
          <span className={styles.pinHint}>Share this code with your class.</span>
        </div>
        <button className={styles.copyButton} onClick={copyPin} type="button">Copy PIN</button>
        {copyMessage && <span className={styles.copyStatus} role="status">{copyMessage}</span>}
      </div>

      <div className={styles.rosterHeader}>
        <div><h3>Classroom explorers</h3><p>Anonymous codenames · no real names collected</p></div>
        <strong>{participants.length} / 40</strong>
      </div>
      {participants.length > 0 ? (
        <ul className={styles.roster}>
          {participants.map((participant) => {
            const avatar = getAnimalAvatar(participant.avatarId);
            return <li key={participant.id}><span aria-hidden="true">{avatar?.emoji || '🦊'}</span>{participant.codename}</li>;
          })}
        </ul>
      ) : (
        <p className={styles.emptyRoster}>The room is ready. Students can join from their own devices.</p>
      )}

      {quest && <p className={styles.dilemmaPreview}><span>UP NEXT</span>{quest.dilemma}</p>}
      <p className={styles.error} role="alert">{error || localError}</p>

      {room.stage === ROOM_STATES.CONSENSUS_REVEAL || room.stage === ROOM_STATES.DEBATE_GUIDE || room.stage === ROOM_STATES.COMPLETED ? (
        <div className={styles.resultBlock}>
          {quest && <ConsensusChart quest={quest} room={room} />}
          {room.stage === ROOM_STATES.DEBATE_GUIDE && quest && <DebateGuide quest={quest} />}
          {room.stage === ROOM_STATES.COMPLETED && <p className={styles.doneMessage}>Room state has ended; the anonymous session data is discarded when everyone leaves.</p>}
        </div>
      ) : (
        <ConsensusChart quest={quest} room={room} compact />
      )}

      <div className={styles.controls}>
        {nextAction && (
          <button
            className={styles.primaryButton}
            disabled={(room.stage === ROOM_STATES.LOBBY && participants.length === 0) || connectionStatus !== 'connected'}
            onClick={() => { setLocalError(''); onAction(nextAction.action); }}
            type="button"
          >
            {nextAction.label}<span aria-hidden="true">→</span>
          </button>
        )}
        <button className={styles.leaveButton} onClick={onLeave} type="button">Close room</button>
      </div>
    </section>
  );
}
