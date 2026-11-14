/**
 * Navigation Configuration for RightsQuest India
 * Conforms to Creative OS Information Architecture:
 * - Direct, transparent navigation paths
 * - Uncluttered desktop bar + responsive mobile drawer
 * - Distinct, visible "Get Help" safety button
 */

export const NAV_LINKS = [
  { path: '/', label: 'Home', isAction: false },
  { path: '/world', label: 'World Map', isAction: false, badge: '5 Realms' },
  { path: '/rights', label: 'Explore Rights', isAction: false },
  { path: '/safety', label: 'Child Safety', isAction: false, badge: 'Safety' },
  { path: '/adventures', label: 'Adventures', isAction: false },
  { path: '/ar-explorer', label: 'AR 3D Explorer', isAction: false, badge: 'WebXR' },
  { path: '/classroom', label: 'Classroom', isAction: false, badge: 'Live' },
  { path: '/educator', label: 'Educator', isAction: false, badge: 'Studio' },
  { path: '/guardian', label: 'Guardian', isAction: false, badge: 'Family' },
  { path: '/achievements', label: 'Achievements', isAction: false },
  { path: '/about', label: 'About', isAction: false },
  { path: '/help', label: 'Get Help', isAction: true, variant: 'help' }
];

export const FOOTER_LINKS = {
  learning: [
    { path: '/world', label: 'The Living World Map (5 Realms)' },
    { path: '/rights', label: 'The 4 Pillars of Child Rights' },
    { path: '/safety', label: 'Child Safety & Rights Education' },
    { path: '/adventures', label: 'Quest Directory' },
    { path: '/ar-explorer', label: 'AR Constitutional Explorer (WebXR 3D)' },
    { path: '/classroom', label: 'Live Classroom Deliberation' },
    { path: '/educator', label: 'Educator Intelligence Studio' },
    { path: '/guardian', label: 'Guardian Learning Chronicle' },
    { path: '/enter', label: 'Age-Tailored Modes' }
  ],
  legalAndSafety: [
    { path: '/safety/get-help', label: 'Childline 1098 & ERSS 112 Help' },
    { path: '/safety', label: 'Personal Boundaries & Safety Library' },
    { path: '/about#privacy', label: 'DPDP 2023 Child Privacy Mandate' },
    { path: '/about#legal', label: 'Constitutional Articles & RTE Act' },
    { path: '/help', label: 'Safety Rules & Trusted Adults' }
  ],
  foundation: [
    { path: '/about#pedagogy', label: 'Mission & Pedagogy' },
    { path: '/about#architecture', label: 'Creative OS Design System' },
    { path: '/about#legal', label: 'Expert Validation Framework' }
  ]
};

