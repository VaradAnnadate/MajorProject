/**
 * Collectible Achievement & Badge Registry for RightsQuest India
 *
 * Badges resemble physical wax seals, embossed medallions, and story artifacts.
 * Categorized into Explorer, Learning, Kindness, and Discovery.
 */

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', label: 'All Artifacts', icon: 'Sparkles' },
  { id: 'explorer', label: 'Explorer', icon: 'Compass', color: '#DE7215' },
  { id: 'learning', label: 'Constitutional', icon: 'BookOpen', color: '#1B6D80' },
  { id: 'kindness', label: 'Kindness & Empathy', icon: 'Heart', color: '#297652' },
  { id: 'discovery', label: 'Digital & Discovery', icon: 'Shield', color: '#D04F36' },
];

export const BADGE_DEFINITIONS = [
  // ── 1. EXPLORER BADGES ──────────────────────────────────────────────────────
  {
    id: 'badge-first-bell',
    name: 'Seal of the First Bell',
    category: 'explorer',
    categoryLabel: 'Explorer',
    symbol: '🔔',
    silhouette: 'bell-seal',
    color: '#DE7215',
    bg: 'rgba(222, 114, 21, 0.12)',
    border: 'rgba(222, 114, 21, 0.4)',
    tagline: 'Embarking on the Quest for Fair Classrooms',
    description: 'Completed your very first story mission and stepped into the World of Every Child.',
    constitutionalArticle: 'Article 21A & RTE Act 2009',
    unlockCondition: {
      type: 'MISSION_COMPLETED',
      targetCount: 1,
    },
    learningOutcome: 'Recognized that school attendance is a protected fundamental right for all children.',
  },
  {
    id: 'badge-realm-wanderer',
    name: 'Wanderer of Realms',
    category: 'explorer',
    categoryLabel: 'Explorer',
    symbol: '🗺️',
    silhouette: 'compass-rose',
    color: '#DE7215',
    bg: 'rgba(222, 114, 21, 0.12)',
    border: 'rgba(222, 114, 21, 0.4)',
    tagline: 'Traversing the 5 Constitutional Realms',
    description: 'Explored landmarks and story portals across multiple distinct world realms.',
    constitutionalArticle: 'Part III: Fundamental Rights',
    unlockCondition: {
      type: 'REALMS_VISITED',
      targetCount: 2,
    },
    learningOutcome: 'Mapped the living metaphor of children\'s constitutional rights across diverse environments.',
  },
  {
    id: 'badge-keen-investigator',
    name: 'Keen Investigator',
    category: 'explorer',
    categoryLabel: 'Explorer',
    symbol: '🔍',
    silhouette: 'magnifier-lens',
    color: '#DE7215',
    bg: 'rgba(222, 114, 21, 0.12)',
    border: 'rgba(222, 114, 21, 0.4)',
    tagline: 'Uncovering the Truth with Evidence',
    description: 'Inspected tactile parchment exhibits and documents during an active story investigation.',
    constitutionalArticle: 'Procedural Fairness & Truth',
    unlockCondition: {
      type: 'EVIDENCE_INSPECTED',
      targetCount: 1,
    },
    learningOutcome: 'Learned to look past assumptions and verify factual evidence before judging situations.',
  },

  // ── 2. LEARNING BADGES (CONSTITUTIONAL) ────────────────────────────────────
  {
    id: 'badge-article-21a',
    name: 'Beacon of the Classroom',
    category: 'learning',
    categoryLabel: 'Constitutional',
    symbol: '📚',
    silhouette: 'book-beacon',
    color: '#1B6D80',
    bg: 'rgba(27, 109, 128, 0.14)',
    border: 'rgba(27, 109, 128, 0.45)',
    tagline: 'Right to Free & Compulsory Education',
    description: 'Unlocked Article 21A by helping a friend return to school without financial penalty or shame.',
    constitutionalArticle: 'Article 21A & RTE Act 2009',
    unlockCondition: {
      type: 'ARTICLE_UNLOCKED',
      article: 'Article 21A',
    },
    learningOutcome: 'Affirmed that education is non-negotiable and guaranteed to every child aged 6 to 14.',
  },
  {
    id: 'badge-article-14-15',
    name: 'Seal of Equal Ground',
    category: 'learning',
    categoryLabel: 'Constitutional',
    symbol: '🤝',
    silhouette: 'harmony-shield',
    color: '#1B6D80',
    bg: 'rgba(27, 109, 128, 0.14)',
    border: 'rgba(27, 109, 128, 0.45)',
    tagline: 'Equality & Freedom from Discrimination',
    description: 'Challenged schoolyard bias and stood up for equal access in sports and playfields.',
    constitutionalArticle: 'Articles 14 & 15(3)',
    unlockCondition: {
      type: 'ARTICLE_UNLOCKED',
      article: 'Article 14',
    },
    learningOutcome: 'Understood that special affirmative protections exist to ensure girls and vulnerable children thrive.',
  },
  {
    id: 'badge-article-24',
    name: 'Protector of Childhood',
    category: 'learning',
    categoryLabel: 'Constitutional',
    symbol: '⚖️',
    silhouette: 'scale-dignity',
    color: '#1B6D80',
    bg: 'rgba(27, 109, 128, 0.14)',
    border: 'rgba(27, 109, 128, 0.45)',
    tagline: 'Prohibition of Hazardous Labour',
    description: 'Identified unlawful child labour in hazardous kilns and recognized safe rehabilitation paths.',
    constitutionalArticle: 'Article 24 & Child Labour Act 2016',
    unlockCondition: {
      type: 'ARTICLE_UNLOCKED',
      article: 'Article 24',
    },
    learningOutcome: 'Recognized that children belong in classrooms and playgrounds, never in hazardous workshops.',
  },
  {
    id: 'badge-pocso-shield',
    name: 'Guardian of Safe Boundaries',
    category: 'learning',
    categoryLabel: 'Constitutional',
    symbol: '⭐',
    silhouette: 'star-fortress',
    color: '#1B6D80',
    bg: 'rgba(27, 109, 128, 0.14)',
    border: 'rgba(27, 109, 128, 0.45)',
    tagline: 'Personal Safety & Bodily Integrity',
    description: 'Mastered the principles of safe boundaries, trusted adult circles, and confidential support.',
    constitutionalArticle: 'POCSO Act 2012 & UNCRC Art 19',
    unlockCondition: {
      type: 'ARTICLE_UNLOCKED',
      article: 'POCSO Act',
    },
    learningOutcome: 'Gained confidence to say NO, GO, and TELL when boundaries feel uncomfortable or unsafe.',
  },

  // ── 3. KINDNESS & EMPATHY BADGES ───────────────────────────────────────────
  {
    id: 'badge-active-bystander',
    name: 'Courageous Ally',
    category: 'kindness',
    categoryLabel: 'Kindness',
    symbol: '🛡️',
    silhouette: 'ally-wings',
    color: '#297652',
    bg: 'rgba(41, 118, 82, 0.14)',
    border: 'rgba(41, 118, 82, 0.45)',
    tagline: 'Defusing Peer Cruelty and Teasing',
    description: 'Intervened supportively to protect a peer facing exclusion without resorting to anger.',
    constitutionalArticle: 'Dignity of the Individual',
    unlockCondition: {
      type: 'EMPATHETIC_CHOICES_TOTAL',
      targetCount: 3,
    },
    learningOutcome: 'Demonstrated that speaking up gently can change the atmosphere of an entire group.',
  },
  {
    id: 'badge-safe-harbor',
    name: 'Helpline Harbinger',
    category: 'kindness',
    categoryLabel: 'Kindness',
    symbol: '📞',
    silhouette: 'beacon-circle',
    color: '#297652',
    bg: 'rgba(41, 118, 82, 0.14)',
    border: 'rgba(41, 118, 82, 0.45)',
    tagline: 'Mastering the 1098 Protocol',
    description: 'Accessed and learned the National Childline 1098 protocol to protect peers in distress.',
    constitutionalArticle: 'Emergency Welfare Support',
    unlockCondition: {
      type: 'HELPLINE_ACCESSED',
      targetCount: 1,
    },
    learningOutcome: 'Understood that 1098 is free, 24/7, confidential, and available whenever help is needed.',
  },
  {
    id: 'badge-empathy-master',
    name: 'Heart of Compassion',
    category: 'kindness',
    categoryLabel: 'Kindness',
    symbol: '❤️',
    silhouette: 'heart-seal',
    color: '#297652',
    bg: 'rgba(41, 118, 82, 0.14)',
    border: 'rgba(41, 118, 82, 0.45)',
    tagline: '100% Empathetic Decision Harmony',
    description: 'Completed a story mission by selecting thoughtful, caring choices at every decision point.',
    constitutionalArticle: 'Fraternity & Mutual Respect',
    unlockCondition: {
      type: 'PERFECT_EMPATHY_MISSION',
      targetCount: 1,
    },
    learningOutcome: 'Practiced empathetic perspective-taking by listening to the quietest voice in the room.',
  },

  // ── 4. DIGITAL SAFETY & DISCOVERY BADGES ────────────────────────────────────
  {
    id: 'badge-digital-scout',
    name: 'Cyber Sentinel',
    category: 'discovery',
    categoryLabel: 'Discovery',
    symbol: '🔒',
    silhouette: 'lock-hexagon',
    color: '#D04F36',
    bg: 'rgba(208, 79, 54, 0.14)',
    border: 'rgba(208, 79, 54, 0.45)',
    tagline: 'Defusing Online Pressure & Data Grooming',
    description: 'Refused to disclose personal passwords, phone numbers, or school locations to online strangers.',
    constitutionalArticle: 'DPDP Act 2023 §9 & Digital Privacy',
    unlockCondition: {
      type: 'DIGITAL_SAFETY_PASSED',
      targetCount: 1,
    },
    learningOutcome: 'Mastered the distinction between digital friendship and private personal data boundaries.',
  },
  {
    id: 'badge-community-builder',
    name: 'Harmony Builder',
    category: 'discovery',
    categoryLabel: 'Discovery',
    symbol: '🏛️',
    silhouette: 'temple-pillar',
    color: '#D04F36',
    bg: 'rgba(208, 79, 54, 0.14)',
    border: 'rgba(208, 79, 54, 0.45)',
    tagline: 'Contributing to Collective Classroom Milestones',
    description: 'Contributed learning milestones to the cooperative, non-competitive community quest.',
    constitutionalArticle: 'Article 51A(e): Spirit of Common Brotherhood',
    unlockCondition: {
      type: 'COOP_CONTRIBUTION',
      targetCount: 1,
    },
    learningOutcome: 'Experienced the power of community progress where every individual discovery counts.',
  },
  {
    id: 'badge-uncrc-scholar',
    name: 'Constitution Archivist',
    category: 'discovery',
    categoryLabel: 'Discovery',
    symbol: '📜',
    silhouette: 'scroll-crest',
    color: '#D04F36',
    bg: 'rgba(208, 79, 54, 0.14)',
    border: 'rgba(208, 79, 54, 0.45)',
    tagline: 'Exploring the 4 UNCRC Pillars',
    description: 'Studied the four foundational pillars: Survival, Development, Protection, and Participation.',
    constitutionalArticle: 'UNCRC 4 Pillars & National Policy',
    unlockCondition: {
      type: 'PILLARS_EXPLORED',
      targetCount: 4,
    },
    learningOutcome: 'Recognized that all children\'s rights are interconnected, indivisible, and universal.',
  },
];

/**
 * Evaluate which badges should be unlocked based on state.
 *
 * @param {object} learnerState
 * @param {Array<string>} existingUnlockedBadgeIds
 * @returns {Array<object>} Evaluated badges with updated unlock status and metadata
 */
export function evaluateBadges(learnerState, existingUnlockedBadgeIds = []) {
  const completedMissions = learnerState?.completedMissions || [];
  const unlockedArticles = learnerState?.unlockedArticles || [];
  const empatheticChoicesCount = learnerState?.empatheticChoicesCount || 0;
  const inspectedEvidenceCount = learnerState?.inspectedEvidenceCount || 0;
  const helplineAccessCount = learnerState?.helplineAccessCount || 0;
  const coopContributionsCount = learnerState?.coopContributionsCount || 0;

  return BADGE_DEFINITIONS.map((def) => {
    const alreadyUnlocked = existingUnlockedBadgeIds.includes(def.id);
    if (alreadyUnlocked) {
      return {
        ...def,
        unlocked: true,
        unlockedAt: learnerState?.badgeUnlockTimestamps?.[def.id] || 'Recorded in Adventure Log',
        progress: 100,
      };
    }

    let shouldUnlock = false;
    let progress = 0;

    switch (def.unlockCondition.type) {
      case 'MISSION_COMPLETED':
        progress = Math.min(100, Math.round((completedMissions.length / def.unlockCondition.targetCount) * 100));
        shouldUnlock = completedMissions.length >= def.unlockCondition.targetCount;
        break;

      case 'REALMS_VISITED':
        const realmsCount = learnerState?.realmsVisited?.length || 0;
        progress = Math.min(100, Math.round((realmsCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = realmsCount >= def.unlockCondition.targetCount;
        break;

      case 'EVIDENCE_INSPECTED':
        progress = Math.min(100, Math.round((inspectedEvidenceCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = inspectedEvidenceCount >= def.unlockCondition.targetCount;
        break;

      case 'ARTICLE_UNLOCKED':
        const hasArticle = unlockedArticles.some((art) => art.includes(def.unlockCondition.article));
        progress = hasArticle ? 100 : 0;
        shouldUnlock = hasArticle;
        break;

      case 'EMPATHETIC_CHOICES_TOTAL':
        progress = Math.min(100, Math.round((empatheticChoicesCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = empatheticChoicesCount >= def.unlockCondition.targetCount;
        break;

      case 'HELPLINE_ACCESSED':
        progress = Math.min(100, Math.round((helplineAccessCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = helplineAccessCount >= def.unlockCondition.targetCount;
        break;

      case 'PERFECT_EMPATHY_MISSION':
        const hasPerfect = learnerState?.hasPerfectEmpathyMission || false;
        progress = hasPerfect ? 100 : 0;
        shouldUnlock = hasPerfect;
        break;

      case 'DIGITAL_SAFETY_PASSED':
        const hasCyber = completedMissions.includes('scenario-02-screen');
        progress = hasCyber ? 100 : 0;
        shouldUnlock = hasCyber;
        break;

      case 'COOP_CONTRIBUTION':
        progress = Math.min(100, Math.round((coopContributionsCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = coopContributionsCount >= def.unlockCondition.targetCount;
        break;

      case 'PILLARS_EXPLORED':
        const pillarsCount = learnerState?.pillarsExplored?.length || 0;
        progress = Math.min(100, Math.round((pillarsCount / def.unlockCondition.targetCount) * 100));
        shouldUnlock = pillarsCount >= def.unlockCondition.targetCount;
        break;

      default:
        shouldUnlock = false;
        progress = 0;
    }

    return {
      ...def,
      unlocked: shouldUnlock,
      unlockedAt: shouldUnlock ? new Date().toISOString() : null,
      progress,
    };
  });
}

