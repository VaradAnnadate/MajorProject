import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ClassroomLobby from '../components/ClassroomLobby';
import StudentVotingView from '../components/StudentVotingView';
import TeacherConsole from '../components/TeacherConsole';
import { CLASSROOM_QUESTS, getClassroomQuest } from '../data/classroomQuests';
import { useClassroomRoom } from '../hooks/useClassroomRoom';
import styles from './ClassroomPage.module.css';

export default function ClassroomPage() {
  const { roomPin } = useParams();
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(null);
  const classroom = useClassroomRoom();
  const mode = selectedMode || (roomPin ? 'student' : null);
  const quest = classroom.room ? getClassroomQuest(classroom.room.questId) : null;

  useEffect(() => {
    if (classroom.room?.roomPin && classroom.room.roomPin !== roomPin) {
      navigate(`/classroom/${classroom.room.roomPin}`, { replace: true });
    }
  }, [classroom.room?.roomPin, roomPin, navigate]);

  function leaveRoom() {
    classroom.disconnect();
    setSelectedMode(null);
    navigate('/classroom', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.backLink} to="/adventures">← Back to Adventures</Link>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>PART 05 · LIVE CLASSROOM</span>
          <h1>Rights are better explored together.</h1>
          <p>Join a teacher-led civics conversation with a room PIN, private voting, and space for every voice.</p>
        </header>

        {!mode && (
          <section className={styles.modeChooser} aria-labelledby="classroom-mode-title">
            <h2 id="classroom-mode-title">How would you like to join?</h2>
            <div className={styles.modeGrid}>
              <button className={styles.modeCard} onClick={() => setSelectedMode('student')} type="button">
                <span className={styles.modeIcon} aria-hidden="true">🦊</span>
                <span className={styles.modeTitle}>Join as an explorer</span>
                <span className={styles.modeDescription}>Enter a room PIN and pick an animal codename. No account needed.</span>
                <span className={styles.modeAction}>Join a class →</span>
              </button>
              <button className={styles.modeCard} onClick={() => setSelectedMode('teacher')} type="button">
                <span className={styles.modeIcon} aria-hidden="true">🧭</span>
                <span className={styles.modeTitle}>Host a classroom</span>
                <span className={styles.modeDescription}>Choose a civics dilemma, create a room, and guide the discussion.</span>
                <span className={styles.modeAction}>Create a room →</span>
              </button>
            </div>
          </section>
        )}

        {mode && !classroom.room && (
          <div className={styles.modeContent}>
            <button className={styles.changeMode} onClick={() => { setSelectedMode(null); classroom.clearError(); }} type="button">← Choose another way</button>
            {mode === 'student' ? (
              <ClassroomLobby
                connectionStatus={classroom.connectionStatus}
                error={classroom.error}
                initialRoomPin={roomPin ? `RQ-${roomPin.replace(/^RQ-/i, '').replace(/\D/g, '').slice(0, 4)}` : ''}
                onJoin={classroom.joinRoom}
              />
            ) : (
              <TeacherConsole
                connectionStatus={classroom.connectionStatus}
                error={classroom.error}
                onAction={classroom.facilitatorAction}
                onCreateRoom={classroom.createRoom}
                onLeave={leaveRoom}
                quests={CLASSROOM_QUESTS}
                room={null}
              />
            )}
          </div>
        )}

        {classroom.room && classroom.role === 'student' && quest && (
          <div className={styles.roomContent}>
            <div className={styles.roomToolbar}>
              <span className={styles.liveStatus}><span aria-hidden="true">●</span> {classroom.connectionStatus === 'connected' ? 'Connected to class' : 'Connection lost'}</span>
              <button className={styles.changeMode} onClick={leaveRoom} type="button">Leave room</button>
            </div>
            {classroom.error && <p className={styles.roomError} role="alert">{classroom.error}</p>}
            <StudentVotingView quest={quest} room={classroom.room} onVote={classroom.castVote} />
          </div>
        )}

        {classroom.role === 'teacher' && (
          <div className={styles.roomContent}>
            <div className={styles.roomToolbar}>
              <button className={styles.changeMode} onClick={leaveRoom} type="button">← Close and leave room</button>
            </div>
            <TeacherConsole
              connectionStatus={classroom.connectionStatus}
              error={classroom.error}
              onAction={classroom.facilitatorAction}
              onCreateRoom={classroom.createRoom}
              onLeave={leaveRoom}
              quests={CLASSROOM_QUESTS}
              room={classroom.room}
            />
          </div>
        )}

        <aside className={styles.safetyNote}>
          <span aria-hidden="true">🛡️</span>
          <p><strong>Room privacy:</strong> classroom sessions use animal codenames and temporary room state. Do not share personal details in the activity.</p>
        </aside>
      </div>
    </div>
  );
}
