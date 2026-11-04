/**
 * Demonstration Personas for RightsQuest India
 * 
 * PRIVACY & CHILD SAFETY MANDATE:
 * - These profiles are strictly fictional demonstration personas for prototype testing.
 * - No real children's names, phone numbers, schools, biometric or location data are stored or requested.
 * - In accordance with India's DPDP Act 2023 principles and global child safeguarding guidelines,
 *   identities are non-identifiable and stored locally in browser demonstration memory.
 */

export const AGE_BANDS = [
  {
    id: 'band-8-10',
    range: '8–10 years',
    title: 'The Young Navigators',
    badge: 'Explorer Tier',
    theme: 'Curiosity, Empathy & Everyday Fairness',
    description: 'Illustrated story quests about schoolyard fairness, classroom respect, the joy of learning, and who to talk to when something feels wrong.',
    tone: 'Gentle, visual, relatable storybook dilemmas with illustrated companions.',
    icon: 'Compass',
    accentColor: 'var(--color-saffron-500)',
    accentBg: 'var(--color-saffron-100)',
    accentBorder: 'var(--color-saffron-border)',
    defaultPersonaId: 'persona-ananya'
  },
  {
    id: 'band-11-13',
    range: '11–13 years',
    title: 'The Pathfinders',
    badge: 'Seeker Tier',
    theme: 'Equal Opportunities, Peer Safety & Digital Sense',
    description: 'Graphic dilemmas navigating online safety, equal chance for boys and girls to study, recognizing child labour, and standing up for classmates.',
    tone: 'Dynamic comic-style investigations with clear decision trees and real-life scenarios.',
    icon: 'MapPin',
    accentColor: 'var(--color-peacock-500)',
    accentBg: 'var(--color-peacock-100)',
    accentBorder: 'var(--color-peacock-border)',
    defaultPersonaId: 'persona-kabir'
  },
  {
    id: 'band-14-16',
    range: '14–16 years',
    title: 'The Youth Advocates',
    badge: 'Champion Tier',
    theme: 'Legal Literacy, Dignity & Constitutional Safeguards',
    description: 'Realistic legal mystery dossiers exploring Article 21A, Juvenile Justice safeguards, digital consent, freedom of thought, and community action.',
    tone: 'Thought-provoking editorial dossiers with authentic constitutional references and ethical problem-solving.',
    icon: 'ShieldCheck',
    accentColor: 'var(--color-terracotta-500)',
    accentBg: 'var(--color-terracotta-100)',
    accentBorder: 'var(--color-terracotta-border)',
    defaultPersonaId: 'persona-priya'
  }
];

export const DEMO_PERSONAS = [
  {
    id: 'persona-ananya',
    ageBandId: 'band-8-10',
    codename: 'Ananya the Keen Observer',
    symbol: '🦉',
    tagline: 'Always looks out for classmates left behind',
    focusTopic: 'Right to Education & Play',
    activeAdventure: {
      id: 'adv-01-schoolbag',
      title: 'The Mystery of the Empty Bench',
      chapter: 'Chapter 2 of 4',
      progressPercent: 45,
      currentObjective: 'Discover why Chintu was asked to work in the tea stall instead of attending morning math class.',
      relatedRight: 'Article 21A: Right to Free and Compulsory Education (RTE Act 2009)',
      badgeReward: 'Seal of the School Bell'
    },
    stats: {
      adventuresCompleted: 1,
      rightsDiscovered: 4,
      dignityShields: 3
    },
    recentBadges: [
      { id: 'b1', title: 'Curious Listener', icon: 'Ear', date: 'Demo Day 1' },
      { id: 'b2', title: 'Fair Play Champion', icon: 'HeartHandshake', date: 'Demo Day 2' }
    ]
  },
  {
    id: 'persona-kabir',
    ageBandId: 'band-11-13',
    codename: 'Kabir the Digital Scout',
    symbol: '⚡',
    tagline: 'Spotting online traps & championing equality',
    focusTopic: 'Cyber Safety & Equal Opportunity',
    activeAdventure: {
      id: 'adv-02-screen',
      title: 'The Whispering Screen & The Unknown Request',
      chapter: 'Chapter 3 of 5',
      progressPercent: 60,
      currentObjective: 'Decide what to do when a gaming friend asks for your home address and private school photo.',
      relatedRight: 'Right to Protection from Exploitation & DPDP Child Safeguards',
      badgeReward: 'Cyber Shield Emblem'
    },
    stats: {
      adventuresCompleted: 2,
      rightsDiscovered: 7,
      dignityShields: 5
    },
    recentBadges: [
      { id: 'b3', title: 'Truth Sleuth', icon: 'Search', date: 'Demo Day 1' },
      { id: 'b4', title: 'Guardian of Privacy', icon: 'Lock', date: 'Demo Day 3' }
    ]
  },
  {
    id: 'persona-priya',
    ageBandId: 'band-14-16',
    codename: 'Priya the Constitution Voice',
    symbol: '⚖️',
    tagline: 'Understanding our laws to protect everyone’s dignity',
    focusTopic: 'Constitutional Rights & Legal Remedies',
    activeAdventure: {
      id: 'adv-03-brickyard',
      title: 'Case File: The Kiln at the Village Border',
      chapter: 'Chapter 1 of 4',
      progressPercent: 25,
      currentObjective: 'Analyse whether teenagers aged 15 can be legally employed during school hours under Child Labour Laws.',
      relatedRight: 'Article 24 of Constitution & Child Labour (Prohibition & Regulation) Act',
      badgeReward: 'Dignity Advocate Seal'
    },
    stats: {
      adventuresCompleted: 3,
      rightsDiscovered: 11,
      dignityShields: 8
    },
    recentBadges: [
      { id: 'b5', title: 'Constitutional Thinker', icon: 'BookOpen', date: 'Demo Day 2' },
      { id: 'b6', title: 'Remedy Finder', icon: 'Award', date: 'Demo Day 4' }
    ]
  }
];

export const DEMO_STORAGE_KEY = 'rightsquest_demo_state_v1';

export function getInitialDemoState() {
  return {
    selectedAgeBand: 'band-11-13',
    activePersonaId: 'persona-kabir',
    savedMissions: ['adv-02-screen'],
    completedChapters: ['adv-02-screen-ch1', 'adv-02-screen-ch2'],
    isDemoMode: true
  };
}

