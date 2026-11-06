/**
 * Demonstration Activity, Cooperative Projects & Transaction Baseline
 *
 * Provides initial demonstration data for prototype exploration.
 * Explicitly non-identifiable and DPDP Act 2023 §9 compliant (no real student names).
 */

export const INITIAL_COOPERATIVE_PROJECTS = [
  {
    id: 'coop-rights-grove',
    title: 'The Pan-India Rights Grove',
    realm: 'Gardens of Growth',
    icon: '🌳',
    description: 'Children across India are collectively exploring Article 21A, uncovering the truth behind empty school benches.',
    targetAmount: 5000,
    currentAmount: 3680,
    unit: 'Rights Discovered',
    contributorCount: 840,
    status: 'Active Community Quest',
    rewardPerk: 'Collective Seal of the Flowering Jacaranda',
    color: '#297652',
    accentBg: 'rgba(41, 118, 82, 0.12)',
  },
  {
    id: 'coop-kindness-bench',
    title: 'The Kindness Bench Initiative',
    realm: 'Village of Belonging',
    icon: '🤝',
    description: 'A shared mission to log 2,500 active bystander interventions where classmates stood together against bullying.',
    targetAmount: 2500,
    currentAmount: 1945,
    unit: 'Empathetic Bystander Choices',
    contributorCount: 620,
    status: 'Active Community Quest',
    rewardPerk: 'Collective Emblem of the Welcoming Circle',
    color: '#DE7215',
    accentBg: 'rgba(222, 114, 21, 0.12)',
  },
  {
    id: 'coop-safe-village',
    title: 'The Safe Digital Village',
    realm: 'Haven of Dignity',
    icon: '🛡️',
    description: 'Equipping young people to identify predatory online requests and safeguard private identity details.',
    targetAmount: 2000,
    currentAmount: 1530,
    unit: 'Cyber Safeguards Mastered',
    contributorCount: 490,
    status: 'Active Community Quest',
    rewardPerk: 'Collective Lantern of Digital Sanctuary',
    color: '#1B6D80',
    accentBg: 'rgba(27, 109, 128, 0.14)',
  },
];

export const INITIAL_ACTIVITY_LOG = [
  {
    id: 'tx-init-01',
    eventId: 'init_welcome_quest',
    eventType: 'WELCOME_BONUS',
    title: 'First Step into the World of Every Child',
    description: 'Selected an explorer persona and entered the interactive learning universe.',
    amount: 50,
    awardedAt: '2026-11-04T10:00:00.000Z',
    category: 'explorer',
    badgeUnlocked: null,
  },
  {
    id: 'tx-init-02',
    eventId: 'init_article_discovery',
    eventType: 'RIGHTS_DISCOVERY',
    title: 'Constitutional Charter Discovery',
    description: 'Explored the Four Pillars of UNCRC and Article 21A educational rights.',
    amount: 30,
    awardedAt: '2026-11-04T11:15:00.000Z',
    category: 'learning',
    badgeUnlocked: null,
  },
];

