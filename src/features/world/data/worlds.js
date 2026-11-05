/**
 * The World of Every Child — Five Living Realms of Children's Rights
 * 
 * LEGAL FIDELITY & STATUTORY ANCHORING:
 * - Village of Belonging: Article 15(3) & 14 (Non-discrimination, Gender Equality, Inclusion)
 * - Gardens of Growth: Article 21A & Right of Children to Free and Compulsory Education (RTE) Act 2009
 * - Forest of Safety: Protection of Children from Sexual Offences (POCSO) Act 2012 & Safe Touch Framework
 * - River of Voices: UNCRC Article 12, Article 19(1)(a) (Freedom of Expression & Participation)
 * - Haven of Dignity: Article 24 & Child Labour (Prohibition and Regulation) Amendment Act 2016
 */

export const WORLDS_DATA = [
  {
    id: 'village-of-belonging',
    slug: 'village-of-belonging',
    name: 'The Village of Belonging',
    regionName: 'Sunlit Valley of Equality',
    shortDescription: 'Where every child is welcomed, celebrated, and treated with equal dignity.',
    tagline: 'Equal Dignity, Irrespective of Background, Ability or Gender',
    statutoryArticle: 'Article 14 & 15(3)',
    statutoryTitle: 'Equality Before Law & Special Provisions for Children',
    uncrcPillar: 'Participation & Survival',
    accentColor: '#DE7215',
    accentLight: '#FDF1E3',
    accentBorder: '#F7C693',
    accentGlow: 'rgba(222, 114, 21, 0.4)',
    mapCoordinates: { x: 22, y: 32 }, // Percentage position on vector terrain
    isLocked: false,
    unlockCondition: null,
    ambientAura: 'Golden Sunlight & Community Drums',
    lore: 'Nestled between terracotta hills and mango orchards, the Village of Belonging is built on the ancient rule that no child sits outside the circle. Here, differences in mother tongue, disability, gender, or background are threads woven into a great shared tapestry of community strength.',
    landmarks: [
      {
        id: 'landmark-banyan',
        name: 'The Whispering Banyan',
        type: 'Sanctuary',
        coords: { x: 24, y: 28 },
        hint: 'Under its sprawling roots, every voice is heard without fear of mockery.',
        lore: 'A centuries-old banyan tree where children gather to settle disagreements with empathy instead of shouting. Its roots touch every home in the village.'
      },
      {
        id: 'landmark-courtyard',
        name: 'The Inclusive Courtyard',
        type: 'Playground',
        coords: { x: 20, y: 36 },
        hint: 'Paved with smooth ramps so every wheelchair and running shoe rolls side by side.',
        lore: 'A public square where games are designed so nobody is left sitting on the sidelines.'
      }
    ],
    missions: [
      {
        id: 'mission-01-bench',
        title: 'The Mystery of the Empty Bench',
        badge: 'Seal of Inclusion',
        difficulty: 'Story Quest',
        targetAge: '8–13 years',
        summary: 'Class 4 has an empty desk. A new student from across the border is eating alone. Can you build a bridge of friendship?',
        articleRef: 'Article 15(3)'
      },
      {
        id: 'mission-02-circle',
        title: 'The Great Playground Debate',
        badge: 'Compass of Fairness',
        difficulty: 'Decision Quest',
        targetAge: '11–16 years',
        summary: 'Older students claim the main pitch every day. Help draft a shared charter of play that honors equal rights for all.',
        articleRef: 'Article 14'
      }
    ],
    learningOutcomes: [
      'Understand that discrimination based on caste, religion, gender, or ability is unconstitutional.',
      'Recognize how small acts of inclusion protect children from isolation and bullying.',
      'Learn how Article 15(3) empowers affirmative action to support vulnerable children.'
    ]
  },
  {
    id: 'gardens-of-growth',
    slug: 'gardens-of-growth',
    name: 'The Gardens of Growth',
    regionName: 'Terraced Orchards of Knowledge',
    shortDescription: 'The flourishing sanctuary where curiosity is nourished through free, compulsory education.',
    tagline: 'Right to Free & Compulsory Education for Every Child',
    statutoryArticle: 'Article 21A & RTE Act 2009',
    statutoryTitle: 'Right to Education & Midday Meal Nutrition',
    uncrcPillar: 'Development',
    accentColor: '#297652',
    accentLight: '#E4F6ED',
    accentBorder: '#A1DCBE',
    accentGlow: 'rgba(41, 118, 82, 0.4)',
    mapCoordinates: { x: 50, y: 24 },
    isLocked: false,
    unlockCondition: null,
    ambientAura: 'Morning School Bells & Rustling Mulberry Leaves',
    lore: 'Terraces of flowering jacarandas and open-air reading pavilions cascade down the hillside. In the Gardens of Growth, books, meals, and caring teachers are not expensive privileges — they are the birthright of every girl and boy aged 6 to 14 under Article 21A.',
    landmarks: [
      {
        id: 'landmark-bell-of-dawn',
        name: 'The Bell of the First Lesson',
        type: 'Monument',
        coords: { x: 52, y: 20 },
        hint: 'Its brass chime marks the promise that school fees can never bar a child.',
        lore: 'Cast from old copper slates, the bell rings each morning to remind administrators that no child can be turned away for lack of birth certificates.'
      },
      {
        id: 'landmark-kitchen-pot',
        name: 'The Great Midday Cauldron',
        type: 'Hearth',
        coords: { x: 47, y: 28 },
        hint: 'Steam rises smelling of lentils, cumin, and hot rice — fuel for hungry minds.',
        lore: 'A community kitchen ensuring that hunger never interferes with a child’s concentration in the classroom.'
      }
    ],
    missions: [
      {
        id: 'mission-03-pencil',
        title: 'The Broken Slate Dilemma',
        badge: 'Crest of the Scholar',
        difficulty: 'Investigation',
        targetAge: '8–12 years',
        summary: 'A headmaster demands money for admission forms. Investigate the RTE Section 12 rulebook and defend a neighbor’s right to study.',
        articleRef: 'RTE Act 2009'
      },
      {
        id: 'mission-04-library',
        title: 'The Midnight Book Thieves',
        badge: 'Lantern of Wisdom',
        difficulty: 'Interactive Mystery',
        targetAge: '11–16 years',
        summary: 'Why are schoolbooks locked away after hours? Help reopen the community library for evening learners.',
        articleRef: 'Article 21A'
      }
    ],
    learningOutcomes: [
      'Know that education is free and mandatory for children aged 6 to 14 in India.',
      'Understand that schools cannot expel, detain, or subject children to corporal punishment.',
      'Appreciate the role of nutrition and clean facilities in quality schooling.'
    ]
  },
  {
    id: 'forest-of-safety',
    slug: 'forest-of-safety',
    name: 'The Forest of Safety',
    regionName: 'Canopy of Guardians & Boundary Stones',
    shortDescription: 'A protective grove where boundaries are respected, trusted adults stand guard, and help is immediate.',
    tagline: 'Child Protection, Personal Boundaries & Freedom from Fear',
    statutoryArticle: 'POCSO Act 2012 & Helpline 1098',
    statutoryTitle: 'Protection from Abuse & Childline Safeguard System',
    uncrcPillar: 'Protection',
    accentColor: '#1B6D80',
    accentLight: '#E4F3F6',
    accentBorder: '#9CD5E0',
    accentGlow: 'rgba(27, 109, 128, 0.4)',
    mapCoordinates: { x: 76, y: 40 },
    isLocked: false,
    unlockCondition: null,
    ambientAura: 'Gentle Fireflies & Watchful Cedar Pines',
    lore: 'Ancient pine trees interlock their branches to form a protective canopy against storms. Marked by glowing boundary stones, this forest teaches every child that their body belongs to them alone, that "NO" is a powerful sovereign word, and that trusted adults and Childline 1098 are always within reach.',
    landmarks: [
      {
        id: 'landmark-boundary-stone',
        name: 'The Guardian Boundary Stone',
        type: 'Sacred Pillar',
        coords: { x: 74, y: 36 },
        hint: 'Glows warm saffron when personal space is respected, and turns bright crimson if a boundary is crossed.',
        lore: 'Carved with the cardinal principle: Safe touch brings warmth and comfort; unsafe touch causes confusion and distress. You never have to keep unsafe secrets.'
      },
      {
        id: 'landmark-helpline-beacon',
        name: 'The 1098 Crystal Beacon',
        type: 'Emergency Lighthouse',
        coords: { x: 80, y: 44 },
        hint: 'Toll-free 24/7 across every corner of the nation.',
        lore: 'A crystal transmitter that lights up whenever a child signals for help, notifying counselors and child welfare committees without requiring personal identity reveal.'
      }
    ],
    missions: [
      {
        id: 'mission-05-secret',
        title: 'The Secret in the Locker Room',
        badge: 'Shield of Courage',
        difficulty: 'Safety Quest',
        targetAge: '8–14 years',
        summary: 'A senior coach tells a player to keep a private touch secret. Recognize the red flags and guide the student to a trusted teacher.',
        articleRef: 'POCSO Act 2012'
      },
      {
        id: 'mission-06-digital',
        title: 'The Anonymous Friend Request',
        badge: 'Sentinel of the Wire',
        difficulty: 'Digital Safety Quest',
        targetAge: '11–16 years',
        summary: 'An online gaming buddy asks for home address and webcam photos. Decouple psychological manipulation and apply DPDP digital boundaries.',
        articleRef: 'DPDP Act 2023 Sec 9'
      }
    ],
    learningOutcomes: [
      'Clearly differentiate between safe, uncomfortable, and unsafe touch.',
      'Understand that children are never at fault for abuse or violations of boundaries.',
      'Know the emergency protocol: Say NO, GO to a trusted adult, and TELL until heard.'
    ]
  },
  {
    id: 'river-of-voices',
    slug: 'river-of-voices',
    name: 'The River of Voices',
    regionName: 'Winding Waters of Free Expression',
    shortDescription: 'The sparkling waterway where every child’s opinion, creative voice, and democratic participation flows freely.',
    tagline: 'Freedom of Speech, Participation & Being Heard',
    statutoryArticle: 'UNCRC Article 12 & Article 19(1)(a)',
    statutoryTitle: 'Right of Children to Express Opinions in All Matters Affecting Them',
    uncrcPillar: 'Participation',
    accentColor: '#2C3E6B',
    accentLight: '#E9EDF8',
    accentBorder: '#B2C4E8',
    accentGlow: 'rgba(44, 62, 107, 0.4)',
    mapCoordinates: { x: 38, y: 72 },
    isLocked: false,
    unlockCondition: null,
    ambientAura: 'Melodic Water Cascades & Windchime Chords',
    lore: 'Flowing from the high snows down to the delta, the River of Voices carries wooden origami boats inscribed with the hopes and constructive ideas of children. Here, young people sit at round council tables with elders, proving that having a young age does not mean having zero say.',
    landmarks: [
      {
        id: 'landmark-council-rock',
        name: 'The Bal Sansad Council Rock',
        type: 'Democratic Forum',
        coords: { x: 40, y: 68 },
        hint: 'A circular stone amphitheater where students present village improvements to panchayat leaders.',
        lore: 'Inspired by children’s parliaments across India, this council rock allows children to propose pedestrian zebra crossings, library hours, and clean water points.'
      },
      {
        id: 'landmark-bridge-of-listening',
        name: 'The Bridge of Attentive Ears',
        type: 'Suspension Bridge',
        coords: { x: 34, y: 76 },
        hint: 'You cannot cross to the other side until you summarize what the speaker just said.',
        lore: 'A suspension bridge woven of river reeds that sways unless both travelers listen respectfully to one another before replying.'
      }
    ],
    missions: [
      {
        id: 'mission-07-panchayat',
        title: 'The Road That Cut the Playground',
        badge: 'Speaker’s Conch',
        difficulty: 'Civic Adventure',
        targetAge: '11–16 years',
        summary: 'Highway contractors plan to pave through the school football ground. Draft a petition and present it to the local ward committee.',
        articleRef: 'UNCRC Article 12'
      },
      {
        id: 'mission-08-paper',
        title: 'The Wall Newspaper Controversy',
        badge: 'Feather of Free Thought',
        difficulty: 'Journalism Quest',
        targetAge: '12–16 years',
        summary: 'A principal censors a student cartoon criticizing broken toilet taps. Stand up for constructive freedom of speech under Article 19.',
        articleRef: 'Article 19(1)(a)'
      }
    ],
    learningOutcomes: [
      'Learn that children have the right to express their views in judicial and administrative decisions that impact them.',
      'Practice democratic advocacy, peaceful petitioning, and evidence-backed debate.',
      'Appreciate how freedom of expression comes with the duty not to harm or slander others.'
    ]
  },
  {
    id: 'haven-of-dignity',
    slug: 'haven-of-dignity',
    name: 'The Haven of Dignity',
    regionName: 'Sanctuary of Fair Treatment & Freedom',
    shortDescription: 'The stronghold standing resolutely against child exploitation, hazardous labour, and neglect.',
    tagline: 'Prohibition of Child Labour & Safeguarding Human Dignity',
    statutoryArticle: 'Article 24 & Child Labour Act 2016',
    statutoryTitle: 'Prohibition of Employment of Children in Hazardous Occupations',
    uncrcPillar: 'Protection & Survival',
    accentColor: '#D04F36',
    accentLight: '#FDEEEA',
    accentBorder: '#F8B5A7',
    accentGlow: 'rgba(208, 79, 54, 0.4)',
    mapCoordinates: { x: 72, y: 76 },
    isLocked: false,
    unlockCondition: null,
    ambientAura: 'Tempered Anvils Turned to Bells & Warm Hearth Glow',
    lore: 'Built from warm red sandstone and sheltered beneath sheltering cliffs, the Haven of Dignity marks where exploitative kilns and hazardous workshops were dismantled. It stands as a living testament that children belong in classrooms, playgrounds, and homes — not behind weaving looms or firecracker fuses.',
    landmarks: [
      {
        id: 'landmark-quenched-furnace',
        name: 'The Quenched Glass Furnace',
        type: 'Historical Memorial',
        coords: { x: 70, y: 72 },
        hint: 'Its once-scorching fire is now replaced by cool blooming jasmine vines.',
        lore: 'A decommissioned bangle furnace where child workers once toiled in extreme heat before legal enforcement liberated them into residential schools.'
      },
      {
        id: 'landmark-dignity-scales',
        name: 'The Balanced Scales of Youth',
        type: 'Monument of Justice',
        coords: { x: 76, y: 80 },
        hint: 'Tips in favor of the child whenever childhood is weighed against factory profits.',
        lore: 'A grand stone scale commemorating India’s landmark Supreme Court judgments (M.C. Mehta v. State of Tamil Nadu) enforcing child rehabilitation.'
      }
    ],
    missions: [
      {
        id: 'mission-09-dhabba',
        title: 'The Silent Chai Boy',
        badge: 'Torch of Liberation',
        difficulty: 'Story Quest',
        targetAge: '8–14 years',
        summary: '10-year-old Raju washes glasses at the railway tea stall instead of attending school. How do you engage the tea owner and local authorities?',
        articleRef: 'Article 24'
      },
      {
        id: 'mission-10-brick',
        title: 'The Kiln Rescue Operation',
        badge: 'Seal of the Sovereign Child',
        difficulty: 'Legal Strategy Quest',
        targetAge: '13–16 years',
        summary: 'A family trapped in debt bondage forces children to mold bricks. Coordinate with the District Magistrate and Childline to enforce the law.',
        articleRef: 'Child Labour Amendment 2016'
      }
    ],
    learningOutcomes: [
      'Understand that employing children under 14 years in any occupation is strictly illegal in India.',
      'Know that adolescents (14–18) are prohibited from hazardous occupations like mines, inflammable substances, and factories.',
      'Learn about government rehabilitation funds and support systems for rescued children.'
    ]
  }
];

export function getWorldById(worldId) {
  return WORLDS_DATA.find(w => w.id === worldId || w.slug === worldId) || WORLDS_DATA[0];
}

