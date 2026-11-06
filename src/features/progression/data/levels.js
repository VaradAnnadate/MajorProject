/**
 * Level & Journey Progression Definitions
 *
 * Narrative levels celebrate learning engagement, curiosity, and empathy.
 * They deliberately avoid implying formal legal credentialing or professional certification.
 */

export const PROGRESSION_LEVELS = [
  {
    level: 1,
    title: 'Curious Explorer',
    minXp: 0,
    maxXp: 150,
    symbol: '🧭',
    color: '#DE7215',
    accentBg: 'rgba(222, 114, 21, 0.12)',
    tagline: 'Taking the first steps into the World of Every Child.',
    milestoneQuote: 'Every journey begins with a curious question and an open mind.',
    perk: 'Unlocks the Expedition Journal and story notes.',
  },
  {
    level: 2,
    title: 'Story Pathfinder',
    minXp: 151,
    maxXp: 350,
    symbol: '🗺️',
    color: '#1B6D80',
    accentBg: 'rgba(27, 109, 128, 0.14)',
    tagline: 'Listening closely to the voices and daily journeys of peers.',
    milestoneQuote: 'Listening with care is the first step toward understanding dignity.',
    perk: 'Unlocks deeper evidence inspection in story missions.',
  },
  {
    level: 3,
    title: 'Dignity Scout',
    minXp: 351,
    maxXp: 650,
    symbol: '⚖️',
    color: '#297652',
    accentBg: 'rgba(41, 118, 82, 0.14)',
    tagline: 'Recognizing that fairness and school access belong to every girl and boy.',
    milestoneQuote: 'When one bench sits empty, the entire classroom is incomplete.',
    perk: 'Unlocks the Treasure Cabinet and physical wax seals.',
  },
  {
    level: 4,
    title: 'Rights Champion',
    minXp: 651,
    maxXp: 1050,
    symbol: '🛡️',
    color: '#D04F36',
    accentBg: 'rgba(208, 79, 54, 0.14)',
    tagline: 'Standing up as an active bystander with courage and empathy.',
    milestoneQuote: 'Courage is choosing to stand beside someone who feels alone.',
    perk: 'Unlocks cooperative classroom community milestones.',
  },
  {
    level: 5,
    title: 'Kindness Guardian',
    minXp: 1051,
    maxXp: 1550,
    symbol: '🌿',
    color: '#38A169',
    accentBg: 'rgba(56, 161, 105, 0.14)',
    tagline: 'Protecting safe boundaries at school, at home, and in digital spaces.',
    milestoneQuote: 'Your digital presence can be a sanctuary of kindness.',
    perk: 'Unlocks the Guardian Glow reaction on companion Mitra.',
  },
  {
    level: 6,
    title: 'Voice of Change',
    minXp: 1551,
    maxXp: 2200,
    symbol: '📢',
    color: '#805AD5',
    accentBg: 'rgba(128, 90, 213, 0.14)',
    tagline: 'Inspiring community dialogue and advocating for inclusive playfields.',
    milestoneQuote: 'Every voice, no matter how young, adds melody to justice.',
    perk: 'Unlocks the Citizen Diplomat dossier emblem.',
  },
  {
    level: 7,
    title: 'Guardian of Tomorrow',
    minXp: 2201,
    maxXp: Infinity,
    symbol: '🌟',
    color: '#D69E2E',
    accentBg: 'rgba(214, 158, 46, 0.16)',
    tagline: 'A living beacon of constitutional compassion and peer protection.',
    milestoneQuote: 'True leadership protects the dignity of the most vulnerable.',
    perk: 'Master of the 5 Living Realms with eternal Safe Harbor seal.',
  },
];

/**
 * Pure calculation of level from XP.
 *
 * @param {number} xp - Current total XP
 * @returns {object} Level calculation details
 */
export function calculateLevel(xp = 0) {
  const safeXp = Math.max(0, Number(xp) || 0);

  const currentLevelIndex = PROGRESSION_LEVELS.findIndex(
    (lvl) => safeXp >= lvl.minXp && safeXp <= lvl.maxXp
  );

  const index = currentLevelIndex === -1 ? PROGRESSION_LEVELS.length - 1 : currentLevelIndex;
  const current = PROGRESSION_LEVELS[index];
  const next = PROGRESSION_LEVELS[index + 1] || null;

  const isMaxLevel = !next;
  const levelSpan = isMaxLevel ? 500 : (next.minXp - current.minXp);
  const xpIntoCurrent = safeXp - current.minXp;
  const xpNeededForNext = isMaxLevel ? 0 : Math.max(0, next.minXp - safeXp);
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.max(0, Math.round((xpIntoCurrent / levelSpan) * 100)));

  return {
    levelNumber: current.level,
    title: current.title,
    symbol: current.symbol,
    color: current.color,
    accentBg: current.accentBg,
    tagline: current.tagline,
    milestoneQuote: current.milestoneQuote,
    perk: current.perk,
    totalXp: safeXp,
    currentLevelMinXp: current.minXp,
    currentLevelMaxXp: current.maxXp,
    xpIntoCurrent,
    xpNeededForNext,
    progressPercent,
    isMaxLevel,
    nextLevelTitle: next ? next.title : null,
    nextLevelSymbol: next ? next.symbol : null,
  };
}

