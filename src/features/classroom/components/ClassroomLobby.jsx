import React, { useState } from 'react';
import { ANIMAL_AVATARS } from '../data/animalAvatars';
import { isRoomPin, ROOM_PIN_PREFIX } from '../engine/classroomTypes';
import styles from './ClassroomLobby.module.css';

export default function ClassroomLobby({ onJoin, connectionStatus = 'idle', error = '' }) {
  const [roomPin, setRoomPin] = useState('');
  const [avatarId, setAvatarId] = useState('tiger');
  const [showError, setShowError] = useState(false);
  const selectedAvatar = ANIMAL_AVATARS.find((avatar) => avatar.id === avatarId);
  const validPin = isRoomPin(roomPin);
  const busy = connectionStatus === 'connecting';

  function handlePinChange(event) {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    setRoomPin(digits ? `${ROOM_PIN_PREFIX}${digits}` : '');
    setShowError(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validPin || !selectedAvatar || busy) {
      setShowError(true);
      return;
    }
    onJoin({ roomPin, codename: selectedAvatar.codename });
  }

  return (
    <section className={styles.root} aria-labelledby="classroom-join-title">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>LEARN TOGETHER · THINK TOGETHER</span>
        <h2 id="classroom-join-title">Join your classroom</h2>
        <p>Enter the room PIN your teacher is showing, then choose an animal codename for this session.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.fieldLabel} htmlFor="classroom-room-pin">Room PIN</label>
        <div className={styles.pinInputWrap}>
          <span aria-hidden="true">RQ-</span>
          <input
            id="classroom-room-pin"
            aria-describedby="classroom-pin-help classroom-join-error"
            autoComplete="off"
            inputMode="numeric"
            maxLength={4}
            onChange={handlePinChange}
            placeholder="0000"
            value={roomPin.replace(ROOM_PIN_PREFIX, '')}
          />
        </div>
        <p id="classroom-pin-help" className={styles.fieldHelp}>Ask your teacher for the four digits shown on the classroom screen.</p>

        <fieldset className={styles.avatarFieldset}>
          <legend className={styles.fieldLabel}>Choose an animal codename</legend>
          <div className={styles.avatarGrid}>
            {ANIMAL_AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                aria-pressed={avatarId === avatar.id}
                className={`${styles.avatarChoice} ${avatarId === avatar.id ? styles.avatarSelected : ''}`}
                onClick={() => setAvatarId(avatar.id)}
                style={{ '--avatar-accent': avatar.color }}
                type="button"
              >
                <span className={styles.avatarEmoji} aria-hidden="true">{avatar.emoji}</span>
                <span>{avatar.codename}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className={styles.privacyNote} role="note">
          <span aria-hidden="true">🛡️</span>
          <p><strong>Just a codename.</strong> No account, real name, email, or phone number is needed to join.</p>
        </div>

        <p id="classroom-join-error" className={styles.error} role="alert">
          {error || (showError && !validPin ? 'Enter all four digits from your teacher.' : '')}
        </p>
        <button className={styles.joinButton} disabled={busy} type="submit">
          {busy ? 'Connecting to room…' : 'Join the room'}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}
