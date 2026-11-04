/**
 * RightsQuest India — Legal Rights & Statutory Safeguards Catalog
 * 
 * LEGAL FIDELITY & EXPERT VALIDATION NOTICE:
 * All entries are benchmarked against official Indian constitutional and statutory provisions:
 * - Constitution of India (Articles 15(3), 21A, 24, 39(e), 39(f))
 * - Right of Children to Free and Compulsory Education (RTE) Act, 2009
 * - Protection of Children from Sexual Offences (POCSO) Act, 2012
 * - Juvenile Justice (Care and Protection of Children) Act, 2015
 * - Child Labour (Prohibition and Regulation) Amendment Act, 2016
 * - Prohibition of Child Marriage Act (PCMA), 2006
 * - UN Convention on the Rights of the Child (UNCRC, ratified by India in 1992)
 * 
 * [LEGAL VALIDATION FLAG]: This content is curated for legal literacy and age-appropriate pedagogy.
 * It is NOT formal legal advice. In any real crisis, children must contact verified authorities or 1098.
 */

export const UNCRC_FOUR_PILLARS = [
  {
    id: 'pillar-survival',
    title: 'Right to Survival',
    slogan: 'Life, Health, Nutrition & Shelter',
    description: 'Every child has the inherent right to life, clean drinking water, adequate food, healthcare, and a safe place to grow.',
    icon: 'HeartPulse',
    color: 'var(--color-terracotta-500)',
    bg: 'var(--color-terracotta-100)',
    border: 'var(--color-terracotta-border)',
    constitutionalAnchor: 'Article 21 & Article 47 of the Indian Constitution'
  },
  {
    id: 'pillar-development',
    title: 'Right to Development',
    slogan: 'Education, Play, Expression & Rest',
    description: 'Every child has the right to free and compulsory education, creative play, leisure, cultural life, and holistic personality growth.',
    icon: 'GraduationCap',
    color: 'var(--color-saffron-500)',
    bg: 'var(--color-saffron-100)',
    border: 'var(--color-saffron-border)',
    constitutionalAnchor: 'Article 21A (Fundamental Right) & RTE Act 2009'
  },
  {
    id: 'pillar-protection',
    title: 'Right to Protection',
    slogan: 'Freedom from Abuse, Neglect & Exploitation',
    description: 'Every child must be shielded from hazardous work, physical violence, sexual harassment, trafficking, cyber harm, and early marriage.',
    icon: 'Shield',
    color: 'var(--color-forest-500)',
    bg: 'var(--color-forest-100)',
    border: 'var(--color-forest-border)',
    constitutionalAnchor: 'Article 24, POCSO Act 2012, JJ Act 2015 & Child Labour Act 2016'
  },
  {
    id: 'pillar-participation',
    title: 'Right to Participation',
    slogan: 'Voice, Dignity & Being Heard',
    description: 'Children have the right to express their views freely in all matters affecting them, and have those views given due weight according to their maturity.',
    icon: 'MessageSquareShare',
    color: 'var(--color-peacock-500)',
    bg: 'var(--color-peacock-100)',
    border: 'var(--color-peacock-border)',
    constitutionalAnchor: 'Article 19(1)(a) & Article 12 of UNCRC'
  }
];

export const CORE_RIGHTS_CATALOG = [
  {
    id: 'right-education-21a',
    title: 'Right to Free & Compulsory Education',
    citation: 'Article 21A, Constitution of India & RTE Act 2009',
    pillarId: 'pillar-development',
    summary: 'The State must provide free and compulsory education to all children aged 6 to 14 years in a neighborhood school without discrimination or hidden fees.',
    ageExplanations: {
      'band-8-10': 'Every boy and girl between 6 and 14 has a superpower: the right to go to school for free! Nobody can tell you that school is only for some kids.',
      'band-11-13': 'Under the law, no school can demand admission screening or capitation fees from children aged 6–14. Basic books and meals are your statutory right.',
      'band-14-16': 'Article 21A guarantees 8 years of elementary schooling. Section 16 of the RTE Act prohibits detention until completion of elementary education.'
    },
    actionableGuidance: 'If a school turns away a child due to poverty or demands illegal fees, school management committees (SMCs) or child helplines can intervene.',
    relatedHelpline: '1098 (Childline) & Local Education Officer'
  },
  {
    id: 'right-hazardous-labour-24',
    title: 'Prohibition of Child Labour & Exploitation',
    citation: 'Article 24, Constitution of India & Child Labour Amendment Act 2016',
    pillarId: 'pillar-protection',
    summary: 'No child below 14 years may be employed in any occupation or process. Adolescents (14–18) are strictly barred from hazardous occupations and processes.',
    ageExplanations: {
      'band-8-10': 'Children should hold pencils and cricket bats, not carry heavy factory bricks or wash dishes in roadside dhabas during school hours.',
      'band-11-13': 'Employing children under 14 is a cognizable criminal offense in India. Working at home cannot be used as an excuse to skip school.',
      'band-14-16': 'The 2016 Amendment completely bans employment of children under 14, and bars adolescents (14–18) from mines, explosives, and toxic chemicals.'
    },
    actionableGuidance: 'If you see children forced into daily labor instead of school, call 1098. Rescuing them is handled safely by Child Welfare Committees (CWCs).',
    relatedHelpline: '1098 & National Child Labour Project (NCLP)'
  },
  {
    id: 'right-safety-pocso',
    title: 'Protection from Bodily Harm & Sexual Abuse',
    citation: 'POCSO Act 2012 & Juvenile Justice Act 2015',
    pillarId: 'pillar-protection',
    summary: 'Gender-neutral protection against all forms of sexual assault, harassment, and exploitation, with mandatory child-friendly reporting and identity secrecy.',
    ageExplanations: {
      'band-8-10': 'Your body belongs to you. No one has the right to touch you in a way that makes you feel confused, uncomfortable, or scared.',
      'band-11-13': 'Any touch, online photo request, or behavior that crosses your safe boundaries is wrong. You are never in trouble for speaking up to a trusted adult.',
      'band-14-16': 'POCSO is strictly gender-neutral and makes reporting mandatory for institutions. Disclosing the identity of a minor survivor in media is illegal.'
    },
    actionableGuidance: 'If someone makes you feel unsafe, confide in a trusted adult, school counselor, or file a confidential report via POCSO E-Box or 1098.',
    relatedHelpline: '1098 & NCPCR POCSO E-Box'
  },
  {
    id: 'right-equality-15',
    title: 'Right to Equality & Non-Discrimination',
    citation: 'Article 14 & Article 15(3), Constitution of India',
    pillarId: 'pillar-participation',
    summary: 'The Constitution prohibits discrimination against any child based on religion, race, caste, sex, or place of birth, while empowering special laws for children.',
    ageExplanations: {
      'band-8-10': 'Every child in the playground deserves the same kindness and turn, whether boy or girl, and no matter which town or family they come from.',
      'band-11-13': 'Equal chance to play sports, study science, and speak in assembly. No teacher or community member can treat you as less because of your caste or gender.',
      'band-14-16': 'Article 15(3) enables affirmative state action exclusively for women and children to overcome historical disadvantages and ensure genuine dignity.'
    },
    actionableGuidance: 'Speak up against exclusionary practices in peer circles or school activities; promote inclusive, non-judgmental spaces.',
    relatedHelpline: '1098 & State Commission for Protection of Child Rights (SCPCR)'
  },
  {
    id: 'right-digital-privacy-dpdp',
    title: 'Digital Privacy & Child Protection Online',
    citation: 'DPDP Act 2023 (Section 9) · Digital Personal Data Protection',
    pillarId: 'pillar-protection',
    summary: 'Online platforms are prohibited from tracking or behavioral monitoring of children, serving targeted advertisements, or processing data likely to cause harm.',
    ageExplanations: {
      'band-8-10': 'The internet is a place to play and learn, but games must never spy on where you live or trick you into giving away your family photos.',
      'band-11-13': 'You have the right to play games and study online without apps tracking your secrets or showing you manipulative adverts.',
      'band-14-16': 'Under India’s DPDP Act Section 9, digital services cannot conduct behavioral surveillance on minors or serve targeted advertising to children.'
    },
    actionableGuidance: 'Never share home addresses, passwords, or live locations in game chat. Report suspicious online behavior immediately.',
    relatedHelpline: 'Cyber Crime Helpline 1930 & 1098'
  }
];

export const VERIFIED_HELPLINES = [
  {
    id: 'help-1098',
    name: 'Childline India (MWCD / ERSS-112)',
    number: '1098',
    hours: '24 Hours · 7 Days a Week',
    cost: 'Toll-Free Across All Telecom Operators in India',
    description: 'The official national emergency service for children in need of care and protection, operated under the Ministry of Women and Child Development.',
    isPrimary: true
  },
  {
    id: 'help-112',
    name: 'National Emergency Response Support System',
    number: '112',
    hours: '24/7 All-India Emergency',
    cost: 'Toll-Free',
    description: 'Single emergency response number integrating Police, Fire, and Health services across all States and Union Territories in India.'
  },
  {
    id: 'help-telemanas',
    name: 'Tele-MANAS (Mental Health Support)',
    number: '14416',
    hours: '24/7 Free Counseling in Multiple Indian Languages',
    cost: 'Toll-Free',
    description: 'National tele-mental health assistance initiative by the Ministry of Health and Family Welfare for students and youth facing stress or anxiety.'
  },
  {
    id: 'help-cybercrime',
    name: 'National Cyber Crime Reporting Helpline',
    number: '1930',
    hours: '24/7 Reporting',
    cost: 'Toll-Free',
    description: 'Official portal and helpline for reporting online stalking, cyberbullying, unauthorized photos, or harassment.'
  }
];
