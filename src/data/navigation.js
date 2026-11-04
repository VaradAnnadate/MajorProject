/**
 * Navigation Configuration for RightsQuest India
 * Conforms to Creative OS Information Architecture:
 * - Direct, transparent navigation paths
 * - Uncluttered desktop bar + responsive mobile drawer
 * - Distinct, visible "Get Help" safety button
 */

export const NAV_LINKS = [
  { path: '/', label: 'Home', isAction: false },
  { path: '/rights', label: 'Explore Rights', isAction: false },
  { path: '/adventures', label: 'Adventures', isAction: false },
  { path: '/achievements', label: 'Achievements', isAction: false },
  { path: '/about', label: 'About', isAction: false },
  { path: '/help', label: 'Get Help', isAction: true, variant: 'help' }
];

export const FOOTER_LINKS = {
  learning: [
    { path: '/rights', label: 'The 4 Pillars of Child Rights' },
    { path: '/adventures', label: 'Quest Directory' },
    { path: '/enter', label: 'Age-Tailored Modes' }
  ],
  legalAndSafety: [
    { path: '/help', label: 'Child Helpline 1098' },
    { path: '/about', label: 'DPDP 2023 Child Privacy Mandate' },
    { path: '/about', label: 'Constitutional Articles & RTE Act' },
    { path: '/help', label: 'Safety Rules for Children' }
  ],
  foundation: [
    { path: '/about', label: 'Mission & Pedagogy' },
    { path: '/about', label: 'Creative OS Design System' },
    { path: '/about', label: 'Expert Validation Framework' }
  ]
};

