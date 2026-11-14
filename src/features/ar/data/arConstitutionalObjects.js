/**
 * AR Constitutional Learning Objects Catalog
 * Mapped to the Constitution of India, UNCRC pillars, and the 5 Living Realms.
 *
 * Each object defines:
 * - id, title, subtitle, category
 * - articleRef: statutory or constitutional citation
 * - description: age-appropriate conceptual explanation
 * - realWorldExample: relatable everyday scenario for children aged 8–16
 * - quiz: single check-for-understanding reflection question
 * - mitraPrompt: Mitra companion guidance in AR
 * - worldId: associated realm for deep linking
 */

export const AR_CONSTITUTIONAL_OBJECTS = [
  {
    id: 'ashoka-chakra',
    title: 'The Sovereign Ashoka Chakra',
    subtitle: '24 Spokes of Continuous Justice & Dharma',
    category: 'sovereign',
    articleRef: 'Preamble & Article 51A (Fundamental Duties)',
    color: '#DE7215',
    accentColor: '#1B6D80',
    geometryType: 'chakra',
    description:
      'The 24-spoke Ashoka Chakra in India’s National Flag represents the wheel of cosmic order (Dharma) and the tireless movement of justice. In RightsQuest, each spoke symbolizes an active principle protecting every child: equality, liberty, safety, dignity, and civic fraternity.',
    realWorldExample:
      'Just like a bicycle wheel collapses if one spoke breaks, a school or community only stays fair when every single child’s rights are honored equally.',
    mitraPrompt:
      'Greetings, explorer! I am Mitra. Look at the 24 spokes turning in harmony before you. The Constitution belongs to you — let us step closer and discover the rights that shield your journey.',
    quiz: {
      question: 'What do the spokes of the Ashoka Chakra teach us in RightsQuest?',
      options: [
        'That rights belong only to grown-ups in courtrooms',
        'Continuous movement, fairness, and mutual respect for every child',
        'That some students are more important than others',
        'Only speed matters in life',
      ],
      correctIndex: 1,
      explanation:
        'The Ashoka Chakra represents dynamic, continuous moral action. Every child has the duty and right to practice fairness every single day.',
      dignityXpReward: 25,
    },
    worldId: 'haven-of-dignity',
  },
  {
    id: 'right-to-equality',
    title: 'The Balance of Equality',
    subtitle: 'Articles 14–18 · Non-Discrimination',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 14 & Article 15(3)',
    color: '#D4A017',
    accentColor: '#8A5D00',
    geometryType: 'pillar',
    description:
      'Article 14 guarantees equality before the law and equal protection of the laws across India. Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth, while explicitly empowering special protections for children.',
    realWorldExample:
      'In a school cricket team or computer lab, team captains cannot exclude a student because of their gender, mother tongue, or background. Everyone gets an equal turn to play and learn.',
    mitraPrompt:
      'See this golden balance scale? When people look at each other through the lens of Article 14, every child stands at the exact same height. True fairness means giving everyone what they need to thrive!',
    quiz: {
      question: 'Under Article 14 and 15, can a public school deny admission to a girl or boy based on caste or religion?',
      options: [
        'Yes, if the principal decides so',
        'No, the Constitution strictly forbids discrimination and guarantees equal protection',
        'Only if the school is full',
        'Only during sports events',
      ],
      correctIndex: 1,
      explanation:
        'Article 15 prohibits discrimination against any citizen on grounds of religion, race, caste, sex, or place of birth. Education is for all children.',
      dignityXpReward: 30,
    },
    worldId: 'village-of-belonging',
  },
  {
    id: 'right-to-freedom',
    title: 'The Beacon of Voice & Expression',
    subtitle: 'Article 19(1)(a) · Freedom of Speech & Bal Sansad',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 19(1)(a) & UNCRC Article 12',
    color: '#1B6D80',
    accentColor: '#0E4450',
    geometryType: 'beacon',
    description:
      'Article 19(1)(a) guarantees all citizens the right to freedom of speech and expression. For young people, this is reinforced by UNCRC Article 12: the right to express your views freely in all matters affecting you, such as student councils and school clubs.',
    realWorldExample:
      'When students organize a Bal Sansad (Children’s Parliament) to propose better drinking water coolers or a quiet library corner, they are actively living their Article 19 freedoms.',
    mitraPrompt:
      'Listen to the rustle of the beacon! Your voice has power. You have the right to express ideas, ask tough questions in class, and speak up peacefully whenever you witness unfairness.',
    quiz: {
      question: 'What is a positive and constitutional way to use your right to freedom of expression in school?',
      options: [
        'Spreading rumors about a classmate on WhatsApp',
        'Participating respectfully in a student council or school debate to improve school safety',
        'Shouting over the teacher when others are trying to speak',
        'Keeping quiet even when someone needs help',
      ],
      correctIndex: 1,
      explanation:
        'Freedom of speech comes with responsibility. Using your voice constructively through councils, writing, art, and debate strengthens your community.',
      dignityXpReward: 30,
    },
    worldId: 'river-of-voices',
  },
  {
    id: 'right-against-exploitation',
    title: 'The Shield of Shelter & Bodily Safety',
    subtitle: 'Articles 21, 23–24 & POCSO Act 2012',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 24 & POCSO Act 2012',
    color: '#D04F36',
    accentColor: '#8C2B19',
    geometryType: 'shield',
    description:
      'Article 24 strictly bans child labour under age 14 in factories, mines, or hazardous occupations. Together with Article 21 (Right to Life & Personal Liberty) and the POCSO Act 2012, Indian law builds an impenetrable legal shield protecting every child’s physical safety and personal boundaries.',
    realWorldExample:
      'If a brick kiln owner or shopkeeper tries to force an 11-year-old child to work 12-hour shifts instead of attending school, the law steps in to rescue the child and hold the employer accountable.',
    mitraPrompt:
      'This shield glows with absolute protection. Remember our golden rule: your body belongs entirely to you. You always have the right to say NO to unsafe situations, and to tell a trusted adult or call 1098.',
    quiz: {
      question: 'What is India’s national 24/7 toll-free emergency helpline for children in distress or facing exploitation?',
      options: [
        'Dial 100',
        'Dial 1098 (Childline / Mission Vatsalya)',
        'Dial 1999',
        'Dial 911',
      ],
      correctIndex: 1,
      explanation:
        '1098 is the dedicated, toll-free, 24/7 child emergency helpline across India operated under the Ministry of Women & Child Development.',
      dignityXpReward: 35,
    },
    worldId: 'forest-of-safety',
  },
  {
    id: 'right-to-education',
    title: 'The Scroll of Free & Compulsory Learning',
    subtitle: 'Article 21A & Right to Education (RTE) Act 2009',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 21A & RTE Act 2009 §3',
    color: '#2A7A4C',
    accentColor: '#16482C',
    geometryType: 'scroll',
    description:
      'Enacted via the landmark 86th Constitutional Amendment, Article 21A directs the State to provide free and compulsory education to all children aged 6 to 14 years. The RTE Act 2009 guarantees trained teachers, safe classroom infrastructure, midday meals, and prohibits screening fees or expulsion.',
    realWorldExample:
      'Even if a child’s family has just migrated to a new city and has no birth certificate or past report card, the neighborhood government school must admit the child into an age-appropriate grade.',
    mitraPrompt:
      'Look at this luminous scroll! A notebook and a pencil are the most potent tools in our democracy. Every child in India has the constitutional right to learn, think, and dream without financial barriers.',
    quiz: {
      question: 'For which age group does Article 21A guarantee free and compulsory school education in India?',
      options: [
        'Ages 18 to 25 years only',
        'Ages 6 to 14 years',
        'Only children with perfect exam marks',
        'Only children in metropolitan cities',
      ],
      correctIndex: 1,
      explanation:
        'Article 21A guarantees free and compulsory education for all children between the ages of 6 and 14 years as an enforceable Fundamental Right.',
      dignityXpReward: 30,
    },
    worldId: 'gardens-of-growth',
  },
  {
    id: 'constitutional-remedies',
    title: 'The Crest of Legal Remedies (Heart of the Constitution)',
    subtitle: 'Article 32 · Dr. B.R. Ambedkar’s Pillar',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 32 (Heart & Soul of Constitution)',
    color: '#3B5998',
    accentColor: '#1E2F54',
    geometryType: 'crest',
    description:
      'Dr. B.R. Ambedkar called Article 32 the "very soul and heart of the Constitution." Without Article 32, written rights would just be words on paper. It empowers anyone — including children through guardians or public-spirited advocates — to approach the Supreme Court directly via writs if their rights are violated.',
    realWorldExample:
      'When students or activists file a Public Interest Litigation (PIL) to clean a polluted river near children’s homes or demand clean school toilets, the Supreme Court uses Article 32 to enforce the government’s constitutional duties.',
    mitraPrompt:
      'This royal crest anchors our entire democracy. Rights are not merely wishes; they are legally enforceable promises. When you understand Article 32, you understand how citizens safeguard one another!',
    quiz: {
      question: 'Why did Dr. B.R. Ambedkar call Article 32 the "heart and soul" of the Constitution?',
      options: [
        'Because it allows citizens to approach the Supreme Court directly to enforce their rights',
        'Because it was the longest article in the book',
        'Because it only applies to lawyers',
        'Because it was written first',
      ],
      correctIndex: 0,
      explanation:
        'Article 32 gives Fundamental Rights real power by giving all citizens direct access to the Supreme Court through constitutional writs (Habeas Corpus, Mandamus, etc.).',
      dignityXpReward: 35,
    },
    worldId: 'haven-of-dignity',
  },
];

export const AR_MINIATURE_REALMS = [
  {
    id: 'village-of-belonging',
    name: 'Village of Belonging',
    article: 'Article 14 & 15',
    color: '#D4A017',
    icon: '🤝',
    description: 'Meadow where every child has a seat in the circle regardless of background.',
  },
  {
    id: 'gardens-of-growth',
    name: 'Gardens of Growth',
    article: 'Article 21A (RTE)',
    color: '#2A7A4C',
    icon: '🌱',
    description: 'Sunlit groves where learning, curiosity, and midday nutrition blossom.',
  },
  {
    id: 'forest-of-safety',
    name: 'Forest of Safety',
    article: 'POCSO & Article 21',
    color: '#D04F36',
    icon: '🛡️',
    description: 'Sanctuary of bodily boundaries, trusted adult beacons, and Childline 1098.',
  },
  {
    id: 'river-of-voices',
    name: 'River of Voices',
    article: 'Article 19 & UNCRC 12',
    color: '#1B6D80',
    icon: '🗣️',
    description: 'Flowing streams where student parliaments and child ideas are heard with dignity.',
  },
  {
    id: 'haven-of-dignity',
    name: 'Haven of Dignity',
    article: 'Article 24 & Article 32',
    color: '#3B5998',
    icon: '⚖️',
    description: 'High court of remedies guarding children against exploitation and child labour.',
  },
];

