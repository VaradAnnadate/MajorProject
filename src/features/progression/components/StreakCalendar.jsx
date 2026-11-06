import React from 'react';
import { getRecentCalendarWindow } from '../engine/streakEngine';
import styles from './StreakCalendar.module.css';

export default function StreakCalendar({ streak = {} }) {
  const {
    currentStreak = 1,
    longestStreak = 1,
    activeDates = [],
    welcomeMessage = 'Every day you explore brings new understanding.',
  } = streak;

  const daysWindow = getRecentCalendarWindow(activeDates, 14);

  return (
    <div className={styles.root} role="region" aria-label="Learning Consistency Calendar">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.eyebrow}>LEARNING CONSISTENCY</div>
          <h2 className={styles.heading}>The Active Explorer Trail</h2>
          <p className={styles.welcomeText}>"{welcomeMessage}"</p>
        </div>

        <div className={styles.streakStats}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>{currentStreak}</span>
            <span className={styles.statLabel}>Current Streak</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <span className={styles.statNumber}>{longestStreak}</span>
            <span className={styles.statLabel}>Best Streak</span>
          </div>
        </div>
      </div>

      {/* 14-Day Calendar Window */}
      <div className={styles.calendarStrip} role="grid" aria-label="Recent activity days">
        {daysWindow.map((day) => (
          <div
            key={day.dateStr}
            className={`${styles.dayPill} ${day.isActive ? styles.dayActive : styles.dayInactive} ${
              day.isToday ? styles.dayToday : ''
            }`}
            title={`${day.dateStr}: ${day.isActive ? 'Active Quest Logged' : 'Rest Day'}`}
          >
            <span className={styles.dayName}>{day.dayName}</span>
            <div className={styles.dayCircle}>
              {day.isActive ? '✨' : day.dayNum}
            </div>
            {day.isToday && <span className={styles.todayIndicator}>Today</span>}
          </div>
        ))}
      </div>

      {/* Non-punitive Safe Harbor Guarantee */}
      <div className={styles.guaranteeBox}>
        <span className={styles.heartIcon} aria-hidden="true">🌱</span>
        <div className={styles.guaranteeText}>
          <strong>Healthy Learning Promise:</strong> Taking time to rest, play, or attend school is an essential part of children's rights. Taking days off will never erase your XP, revoke your badges, or reset your journey.
        </div>
      </div>
    </div>
  );
}

