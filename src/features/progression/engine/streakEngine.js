/**
 * Non-Punitive Learning Consistency & Streak Engine
 *
 * GUIDING PRINCIPLES (Creative OS & Child Safeguarding):
 * 1. Missing a day NEVER deducts XP.
 * 2. Missing a day NEVER revokes unlocked badges or achievements.
 * 3. Missing a day NEVER resets a learner's milestones.
 * 4. Zero guilt-inducing notifications or manipulative countdown timers.
 * 5. Friendly welcome back: "Welcome back, explorer! Your adventure is waiting."
 */

/**
 * Format a Date to YYYY-MM-DD in local time
 * @param {Date} [date]
 * @returns {string}
 */
export function toLocalDateString(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate the difference in calendar days between two YYYY-MM-DD date strings.
 * @param {string} dateStr1
 * @param {string} dateStr2
 * @returns {number}
 */
export function differenceInDays(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = d1.getTime() - d2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Pure evaluation of streak state given current state and a new activity date.
 *
 * @param {object} currentStreakState - { currentStreak, longestStreak, lastActiveDate, activeDates }
 * @param {string} [activityDateStr] - YYYY-MM-DD string (defaults to today)
 * @returns {object} Updated streak state
 */
export function recordLearningActivity(currentStreakState = {}, activityDateStr = null) {
  const todayStr = activityDateStr || toLocalDateString();
  const lastActive = currentStreakState.lastActiveDate || null;
  const currentStreak = currentStreakState.currentStreak || 0;
  const longestStreak = currentStreakState.longestStreak || 0;
  const activeDates = Array.isArray(currentStreakState.activeDates)
    ? [...currentStreakState.activeDates]
    : [];

  // Add date to history if not present
  if (!activeDates.includes(todayStr)) {
    activeDates.push(todayStr);
    activeDates.sort();
  }

  // Same day activity: streak unchanged
  if (lastActive === todayStr) {
    return {
      currentStreak: Math.max(1, currentStreak),
      longestStreak: Math.max(1, longestStreak, currentStreak),
      lastActiveDate: todayStr,
      activeDates,
      isNewDay: false,
      welcomeMessage: 'Great to see you continuing your exploration today!',
    };
  }

  // No previous activity: first day
  if (!lastActive) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(1, longestStreak),
      lastActiveDate: todayStr,
      activeDates,
      isNewDay: true,
      welcomeMessage: 'Welcome to your learning journey! Every step counts.',
    };
  }

  const daysSinceLast = differenceInDays(todayStr, lastActive);

  let newCurrentStreak;
  let welcomeMessage;

  if (daysSinceLast === 1) {
    // Consecutive day
    newCurrentStreak = currentStreak + 1;
    welcomeMessage = `Wonderful! That's ${newCurrentStreak} days of discovering child rights!`;
  } else if (daysSinceLast > 1) {
    // Break in activity: restart counter to 1, but PRESERVE all achievements and records
    newCurrentStreak = 1;
    welcomeMessage = 'Welcome back! Your adventure was waiting for you.';
  } else {
    // Activity recorded for a previous date
    newCurrentStreak = currentStreak;
    welcomeMessage = 'Historical learning record updated.';
  }

  const newLongestStreak = Math.max(longestStreak, newCurrentStreak);

  return {
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActiveDate: todayStr,
    activeDates,
    isNewDay: true,
    welcomeMessage,
  };
}

/**
 * Generate a 7-day or 14-day calendar window for visual inspection.
 *
 * @param {Array<string>} activeDates - List of active YYYY-MM-DD dates
 * @param {number} [daysCount=7]
 * @returns {Array<object>} Days in window with active status
 */
export function getRecentCalendarWindow(activeDates = [], daysCount = 7) {
  const windowDays = [];
  const today = new Date();

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = toLocalDateString(d);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();

    windowDays.push({
      dateStr,
      dayName,
      dayNum,
      isActive: activeDates.includes(dateStr),
      isToday: i === 0,
    });
  }

  return windowDays;
}

