/**
 * AR Constitutional Learning Journey & Scenario Catalog
 * Mapped to the Constitution of India, UNCRC pillars, and the 5 Living Realms.
 *
 * Each station represents a spatial learning activity:
 * - Station 1: The Sovereign Ashoka Chakra (Dharma Wheel & Preamble)
 * - Station 2: The Balance of Equality (Articles 14 & 15 Non-Discrimination)
 * - Station 3: The Beacon of Expression (Article 19 & UNCRC 12 Bal Sansad)
 * - Station 4: The Shield of Bodily Safety (Articles 21, 24 & POCSO Act 2012)
 * - Station 5: The Scroll of Learning (Article 21A & RTE Act 2009)
 * - Station 6: The Crest of Remedies (Article 32 Dr. Ambedkar's Pillar)
 *
 * Features 3-tier age adaptation (8–10, 11–13, 14–16), interactive spatial dilemmas,
 * consequence animations, and deterministic Dignity XP rewards.
 */

export const AR_CONSTITUTIONAL_STATIONS = [
  {
    id: 'ashoka-chakra',
    stationNumber: 1,
    title: 'The Sovereign Ashoka Chakra',
    subtitle: 'The 24 Spokes of Continuous Justice & Dharma',
    category: 'sovereign',
    articleRef: 'Preamble & Article 51A (Fundamental Duties)',
    color: '#DE7215',
    accentColor: '#1B6D80',
    geometryType: 'chakra',
    worldId: 'haven-of-dignity',
    dignityXpReward: 35,

    overview:
      'The 24-spoke Ashoka Chakra in India’s National Flag represents the eternal wheel of Dharma — continuous movement, moral order, and tireless civic justice. In RightsQuest, each spoke symbolizes an active principle protecting every child.',
    description:
      'The 24-spoke Ashoka Chakra in India’s National Flag represents the eternal wheel of Dharma — continuous movement, moral order, and tireless civic justice. In RightsQuest, each spoke symbolizes an active principle protecting every child.',
    realWorldExample:
      'During morning assembly, Kabir wonders whether the Constitution belongs to big politicians and police officers, or to children in the classroom too.',
    mitraPrompt:
      'Look at the 24 spokes turning in harmony! The Constitution is a living compass guiding every child in India toward fairness, courage, and truth.',
    quiz: {
      question: 'What does the wheel (Chakra) at the center of our National Flag stand for?',
      options: [
        'Continuous movement, fairness, and justice for every child',
        'That only fast runners win in life',
        'That rules never change over time',
        'Only adults can hold rights',
      ],
      correctIndex: 0,
      explanation: 'The Ashoka Chakra represents continuous movement, moral order, and tireless civic justice for all children.',
    },

    // Spoke highlights for interactive spoke exploration
    spokeValues: [
      { id: 1, name: 'Love & Compassion', description: 'Caring for every fellow citizen and living being.' },
      { id: 2, name: 'Courage & Truth', description: 'Standing up for what is right even when difficult.' },
      { id: 3, name: 'Patience & Peace', description: 'Resolving disputes through listening and dialogue.' },
      { id: 4, name: 'Equality for All', description: 'Treating all children with equal honor and dignity.' },
      { id: 5, name: 'Justice (Nyaya)', description: 'Fair rules that protect the vulnerable without bias.' },
      { id: 6, name: 'Fraternity (Brotherhood)', description: 'A shared bond uniting children across all languages.' },
      { id: 7, name: 'Liberty of Thought', description: 'Freedom to imagine, question, create, and speak.' },
      { id: 8, name: 'Education for Every Child', description: 'Knowledge as an inalienable birthright for all.' },
    ],

    // Age-adapted scenario dilemma
    scenarios: {
      '8-10': {
        context:
          'During the morning assembly at school, children are discussing why the Ashoka Chakra sits at the exact center of our National Flag.',
        dilemma:
          'Kabir asks: "Does the Constitution only belong to big politicians and police officers, or does it belong to children in the classroom too?"',
        choices: [
          {
            id: 'c1',
            text: 'Tell Kabir the Constitution belongs to everyone — especially children — to keep life fair and safe.',
            isConstitutional: true,
            spatialEffect: 'chakra-glow-full',
            consequence:
              'The 24 spokes light up in a brilliant golden aurora! Mitra smiles and holds up his glowing wisdom lantern.',
            explanation:
              'Dr. B.R. Ambedkar and the Constituent Assembly wrote the Constitution for all citizens. Children are the very future of India’s democracy.',
          },
          {
            id: 'c2',
            text: 'Say that rights are only for adults with legal jobs, so children should wait until they grow up.',
            isConstitutional: false,
            spatialEffect: 'chakra-dim',
            consequence:
              'The wheel slows down and dims to a pale grey. Mitra tilts his head thoughtfully with a gentle reminder.',
            explanation:
              'Children hold fundamental rights from the moment they are born — including the right to education, safety, equality, and voice!',
          },
        ],
        quiz: {
          question: 'What does the wheel (Chakra) at the center of our National Flag stand for?',
          options: [
            'Continuous movement, fairness, and justice for every child',
            'That only fast runners win in life',
            'That rules never change over time',
            'Only adults can hold rights',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'In your middle-school civics club, your group is designing a student charter for classroom respect and fair play.',
        dilemma:
          'One group member argues: "Let’s only include rules about student duties. Rights are unnecessary because teachers handle everything."',
        choices: [
          {
            id: 'c1',
            text: 'Explain that Rights and Duties are twin spokes on the same wheel — you need both to move forward fairly.',
            isConstitutional: true,
            spatialEffect: 'chakra-glow-full',
            consequence:
              'The inner hub turns peacock navy while the 24 spokes radiate golden harmony! The student charter lights up.',
            explanation:
              'Article 51A duties (cherishing noble ideals, renouncing practices derogatory to dignity) complement our Part III fundamental rights.',
          },
          {
            id: 'c2',
            text: 'Agree to remove rights and keep only strict punishments for students who make mistakes.',
            isConstitutional: false,
            spatialEffect: 'chakra-dim',
            consequence:
              'The Chakra tilts uncomfortably and the cardinal medallions flicker red.',
            explanation:
              'A healthy democracy balances freedom with responsibility; discipline without dignity creates fear rather than learning.',
          },
        ],
        quiz: {
          question: 'In India’s constitutional philosophy, what is the relationship between Fundamental Rights and Duties?',
          options: [
            'They are complementary — rights protect our dignity while duties protect each other',
            'Duties cancel out our rights completely',
            'Rights only exist if a student has perfect grades',
            'They are completely unrelated laws',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'A student debate on constitutional morality asks whether the Preamble reflects living values or historical words on paper.',
        dilemma:
          'An opponent claims: "Constitutional principles like Fraternity and Liberty are abstract ideals that have no real-world application in everyday youth life."',
        choices: [
          {
            id: 'c1',
            text: 'Argue that Fraternity is the moral glue of society — without mutual dignity among young citizens, democracy cannot function.',
            isConstitutional: true,
            spatialEffect: 'chakra-glow-full',
            consequence:
              'The 4 cardinal medallions of Rights (Survival, Protection, Development, Participation) align in perfect cosmic balance!',
            explanation:
              'Dr. Ambedkar insisted that Liberty cannot be divorced from Equality, nor can Equality from Fraternity. They form a union of trinity.',
          },
          {
            id: 'c2',
            text: 'Concede that only physical laws matter, and constitutional values are just symbolic slogans.',
            isConstitutional: false,
            spatialEffect: 'chakra-dim',
            consequence:
              'The central hub loses its radiance and the spokes stop their harmonic spin.',
            explanation:
              'Every law in India must pass the test of the Preamble. When young citizens stand up for fraternity, they breathe life into the Constitution.',
          },
        ],
        quiz: {
          question: 'According to Dr. B.R. Ambedkar, which three constitutional ideals form an inseparable "union of trinity"?',
          options: [
            'Liberty, Equality, and Fraternity',
            'Power, Wealth, and Authority',
            'Silence, Obedience, and Conformity',
            'Commerce, Competition, and Speed',
          ],
          correctIndex: 0,
        },
      },
    },
  },
  {
    id: 'right-to-equality',
    stationNumber: 2,
    title: 'The Balance of Equality',
    subtitle: 'Articles 14–18 · Rule of Law & Non-Discrimination',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 14 & Article 15(3)',
    color: '#D4A017',
    accentColor: '#8A5D00',
    geometryType: 'pillar',
    worldId: 'village-of-belonging',
    dignityXpReward: 35,

    overview:
      'Article 14 guarantees equality before the law and equal protection of the laws across India. Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth, while empowering special affirmative provisions for children.',
    description:
      'Article 14 guarantees equality before the law and equal protection of the laws across India. Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth, while empowering special affirmative provisions for children.',
    realWorldExample:
      'During sports period, senior students try to exclude girls and newcomers from playing football or running the relay match.',
    mitraPrompt:
      'When we share opportunities equally, the scales of justice find perfect balance. Every child has equal dignity under Article 14 and 15!',
    quiz: {
      question: 'Which constitutional article guarantees equality before the law for every person in India?',
      options: [
        'Article 14 (Right to Equality)',
        'Article 999 (Special VIP Rule)',
        'Only rules made by team captains',
        'Article 0 (Secret Law)',
      ],
      correctIndex: 0,
      explanation: 'Article 14 ensures that every person is treated equally before the law without favoritism.',
    },

    scenarios: {
      '8-10': {
        context:
          'At the school playground sports period, two senior students are picking players for the football and relay matches.',
        dilemma:
          'They say: "Girls cannot be on the football team, and new students from other states can only sit on the bench and watch."',
        choices: [
          {
            id: 'c1',
            text: 'Step forward and invite all students to play: "Everyone gets an equal chance to try out and enjoy the game!"',
            isConstitutional: true,
            spatialEffect: 'scale-balanced',
            consequence:
              'The 3D balance scale swings smoothly into perfect horizontal equilibrium! The central diamond glows golden.',
            explanation:
              'Article 15 strictly prohibits discrimination based on gender or birthplace. In RightsQuest, fair play means nobody is left out!',
          },
          {
            id: 'c2',
            text: 'Stay silent and join the team while your classmates are left sitting alone on the sideline.',
            isConstitutional: false,
            spatialEffect: 'scale-tilted',
            consequence:
              'The balance scale tilts steeply to one side, screeching with metallic friction as warning terracotta light flashes.',
            explanation:
              'When we exclude others based on gender or language, the balance of fairness collapses.',
          },
        ],
        quiz: {
          question: 'Can a school sports club or class exclude a student simply because of their gender or where they were born?',
          options: [
            'No, Article 15 guarantees that every child must be treated with equal respect and opportunity',
            'Yes, if the captain wants to win',
            'Only on Fridays',
            'Only if the playground is small',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'The school science laboratory has limited high-end microscopes for an upcoming state exhibition project.',
        dilemma:
          'A teacher’s assistant proposes allocating the microscopes only to students from wealthy families who pay an extra lab deposit.',
        choices: [
          {
            id: 'c1',
            text: 'Propose a fair rotation schedule where all student teams get equal laboratory hours regardless of wealth.',
            isConstitutional: true,
            spatialEffect: 'scale-balanced',
            consequence:
              'Both crystal pans of the balance scale level out gracefully! Golden light floods the science pillars.',
            explanation:
              'Article 14 ensures equal protection of the laws. Public school resources must be accessible to all students equitably.',
          },
          {
            id: 'c2',
            text: 'Agree with the deposit rule because it ensures only paying students get access.',
            isConstitutional: false,
            spatialEffect: 'scale-tilted',
            consequence:
              'The scale drops heavily onto one pan, casting dark shadows over the laboratory pedestal.',
            explanation:
              'Economic discrimination in education violates constitutional equality and the Right to Education Act.',
          },
        ],
        quiz: {
          question: 'What does "Equality before the Law" under Article 14 mean for students in India?',
          options: [
            'All persons are equal before the law, and no one is above or beneath legal protection',
            'Wealthier people receive special legal rules',
            'Only adults have constitutional rights',
            'The law only applies during school exams',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'A municipal youth scholarship program is reviewing special coaching seats reserved for adolescent girls and marginalized rural youth.',
        dilemma:
          'A critic argues: "Special seats for vulnerable children violate Article 14’s promise of formal equality. Everyone should compete with zero assistance."',
        choices: [
          {
            id: 'c1',
            text: 'Defend affirmative action: "Substantive equality recognizes unequal starting points. Article 15(3) explicitly authorizes special provisions for women and children."',
            isConstitutional: true,
            spatialEffect: 'scale-balanced',
            consequence:
              'The balance scale rises into magnificent equilibrium, proving that true fairness creates equal opportunity for all starting lines!',
            explanation:
              'The Supreme Court has consistently held that Article 15(3) is not an exception to equality, but a dynamic tool to achieve real, substantive equality.',
          },
          {
            id: 'c2',
            text: 'Concur that any special support for disadvantaged children is unfair to privileged students.',
            isConstitutional: false,
            spatialEffect: 'scale-tilted',
            consequence:
              'The balance scale fractures, revealing that treating unequals equally only deepens inequality.',
            explanation:
              'Treating unequals as equals without addressing systemic barriers preserves injustice.',
          },
        ],
        quiz: {
          question: 'What power does Article 15(3) of the Indian Constitution grant to the State regarding children?',
          options: [
            'The power to make special protective provisions and affirmative measures for women and children',
            'The power to ban children from schools',
            'The power to charge higher fees to students',
            'The power to eliminate child helplines',
          ],
          correctIndex: 0,
        },
      },
    },
  },
  {
    id: 'right-to-freedom',
    stationNumber: 3,
    title: 'The Beacon of Voice & Expression',
    subtitle: 'Article 19(1)(a) & UNCRC Article 12 · Freedom of Speech & Bal Sansad',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 19(1)(a) & UNCRC Article 12',
    color: '#1B6D80',
    accentColor: '#0E4450',
    geometryType: 'beacon',
    worldId: 'river-of-voices',
    dignityXpReward: 35,

    overview:
      'Article 19(1)(a) guarantees all citizens freedom of speech and expression. For young people, this is reinforced by UNCRC Article 12: the right to express views freely in all matters affecting them, such as student councils, school clubs, and peaceful youth forums.',
    description:
      'Article 19(1)(a) guarantees all citizens freedom of speech and expression. For young people, this is reinforced by UNCRC Article 12: the right to express views freely in all matters affecting them, such as student councils, school clubs, and peaceful youth forums.',
    realWorldExample:
      'When the school library replaces popular storybooks with adult files, students wonder if they have the right to speak up.',
    mitraPrompt:
      'Your voice is your constitutional power! Article 19(1)(a) and UNCRC Article 12 give every young citizen the right to speak, create, and be heard.',
    quiz: {
      question: 'Under Article 19(1)(a) and UNCRC Article 12, what right do children hold when school policies affect them?',
      options: [
        'The right to express their views freely and participate respectfully',
        'To remain silent forever and accept everything without questions',
        'Only adults may have opinions on learning',
        'Children can only speak if they obtain a court permit',
      ],
      correctIndex: 0,
      explanation: 'Article 19(1)(a) and UNCRC Article 12 protect peaceful child expression and student councils (Bal Sansad).',
    },

    scenarios: {
      '8-10': {
        context:
          'The school library is replacing popular picture books with old unused files because adults assumed children do not care about reading stories.',
        dilemma:
          'Meera wants to speak up, but her friend warns: "Children must be quiet and never disagree with adults, even when decisions affect us."',
        choices: [
          {
            id: 'c1',
            text: 'Help Meera write a polite, creative petition signed by her classmates asking to keep the storybook corner.',
            isConstitutional: true,
            spatialEffect: 'beacon-pulse',
            consequence:
              'The Voice Beacon erupts with rhythmic concentric light waves! Glowing cyan lanterns float above the assembly.',
            explanation:
              'UNCRC Article 12 and Article 19 protect your right to share respectful opinions on issues that directly shape your learning.',
          },
          {
            id: 'c2',
            text: 'Tell Meera to stay completely quiet and accept that children have no voice in school decisions.',
            isConstitutional: false,
            spatialEffect: 'beacon-quench',
            consequence:
              'The beacon flame flickers and dims into smoke. Mitra sits quietly with a concerned expression.',
            explanation:
              'When children are silenced, institutions miss out on creative ideas and child perspectives.',
          },
        ],
        quiz: {
          question: 'What does UNCRC Article 12 guarantee to young people across the world and in India?',
          options: [
            'The right of children to express their views freely on matters that affect them, and to have those views given due weight',
            'That children must never ask questions',
            'That only adult voices can be heard in schools',
            'That reading books is forbidden after sunset',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'In a class WhatsApp group, several students begin circulating an embarrassing, fabricated rumor about a shy classmate.',
        dilemma:
          'One student says: "This is my freedom of speech! Article 19 means I can say or post anything I want about anyone."',
        choices: [
          {
            id: 'c1',
            text: 'Challenge the rumor: "Freedom of speech does not include cyberbullying or defaming others. Article 19(2) sets reasonable limits to protect dignity."',
            isConstitutional: true,
            spatialEffect: 'beacon-pulse',
            consequence:
              'The beacon shines with clear, noble radiance, washing away the toxic static with peaceful harmonic chimes!',
            explanation:
              'Under Article 19(2), speech has reasonable restrictions including defamation, public order, and the protection of individual dignity.',
          },
          {
            id: 'c2',
            text: 'Forward the rumor to other groups because you want to be popular with the group admins.',
            isConstitutional: false,
            spatialEffect: 'beacon-quench',
            consequence:
              'The beacon turns murky red and emits discordant buzzing as the digital space becomes hostile.',
            explanation:
              'Cyberbullying and harassment cause real harm and violate both constitutional morality and cyber laws (IT Act & Cyber Crime 1930).',
          },
        ],
        quiz: {
          question: 'Does the constitutional Right to Freedom of Speech give someone the right to bully or defame a classmate online?',
          options: [
            'No, freedom of speech is subject to reasonable restrictions under Article 19(2) and cannot be used to defame or harm others',
            'Yes, freedom of speech means zero rules online',
            'Only if the message is in a private group',
            'Only during summer holidays',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'Students organizing a peaceful youth discussion on climate change and child health are told by local authorities they cannot assemble in the municipal park.',
        dilemma:
          'The officer claims: "Young people have no constitutional right to gather peacefully in public spaces to discuss public issues."',
        choices: [
          {
            id: 'c1',
            text: 'Cite Article 19(1)(b): Citizens have the fundamental right to assemble peaceably and without arms to discuss public interest issues.',
            isConstitutional: true,
            spatialEffect: 'beacon-pulse',
            consequence:
              'The beacon projects an expansive holographic dome of public assembly, welcoming all voices into democratic dialogue!',
            explanation:
              'Peaceful assembly is a foundational pillar of Indian democracy. Youth have the right to organize respectful, peaceful public forums.',
          },
          {
            id: 'c2',
            text: 'Disband and accept that civic participation is illegal for high-school students.',
            isConstitutional: false,
            spatialEffect: 'beacon-quench',
            consequence:
              'The forum falls silent and the democratic podium disappears into darkness.',
            explanation:
              'Civic disengagement weakens democracy. Peaceful assembly is protected by the Constitution of India.',
          },
        ],
        quiz: {
          question: 'Which constitutional sub-clause protects the right of citizens to assemble peaceably and without arms?',
          options: [
            'Article 19(1)(b)',
            'Article 54',
            'Article 356',
            'Article 12',
          ],
          correctIndex: 0,
        },
      },
    },
  },
  {
    id: 'right-against-exploitation',
    stationNumber: 4,
    title: 'The Shield of Shelter & Bodily Safety',
    subtitle: 'Articles 21, 23–24 & POCSO Act 2012 · Protection from Exploitation',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 24 & POCSO Act 2012',
    color: '#D04F36',
    accentColor: '#8C2B19',
    geometryType: 'shield',
    worldId: 'forest-of-safety',
    dignityXpReward: 35,

    overview:
      'Article 24 strictly prohibits child labour under age 14 in factories, mines, or hazardous occupations. Together with Article 21 (Right to Life & Dignity) and the POCSO Act 2012, Indian law builds an impenetrable shield protecting every child’s physical safety, personal boundaries, and freedom from forced work.',
    description:
      'Article 24 strictly prohibits child labour under age 14 in factories, mines, or hazardous occupations. Together with Article 21 (Right to Life & Dignity) and the POCSO Act 2012, Indian law builds an impenetrable shield protecting every child’s physical safety, personal boundaries, and freedom from forced work.',
    realWorldExample:
      'A stranger or neighbor asks a child to keep an unsafe physical boundary secret, or a child is forced to work during school hours.',
    mitraPrompt:
      'Your safety is non-negotiable! Article 21 and the POCSO Act form an unbreakable shield. Dial 1098 if you or any friend ever needs protection.',
    quiz: {
      question: 'What free emergency 24/7 national child helpline protects children from abuse, distress, or forced labor in India?',
      options: [
        'Childline 1098',
        '0000',
        'Random social media messages',
        'Directory 411',
      ],
      correctIndex: 0,
      explanation: 'Childline 1098 is India’s free, toll-free 24/7 emergency service dedicated to rescuing and safeguarding children.',
    },

    scenarios: {
      '8-10': {
        context:
          'An older neighbor or stranger asks a child to keep an uncomfortable "secret" about an inappropriate physical touch that made the child feel uneasy.',
        dilemma:
          'The person says: "This is our special secret. If you tell your parents or teacher, something bad will happen to your family."',
        choices: [
          {
            id: 'c1',
            text: 'Remember the Golden Rule: Your body belongs to you. Unsafe secrets should NEVER be kept. Tell a trusted adult immediately or call 1098.',
            isConstitutional: true,
            spatialEffect: 'shield-expand',
            consequence:
              'The 3D Shield of Shelter expands a protective translucent sanctuary dome! The Childline 1098 beacon shines brightly overhead.',
            explanation:
              'Under POCSO 2012, the law is on your side. Children are never to blame for unsafe actions by others. Trusted adults are there to protect you.',
          },
          {
            id: 'c2',
            text: 'Keep the secret and hide in your bedroom because you feel frightened.',
            isConstitutional: false,
            spatialEffect: 'shield-shatter',
            consequence:
              'The shield dome wavers and turns grey. Mitra gently steps forward with compassionate ears and says: "You are never alone, explorer."',
            explanation:
              'Keeping unsafe secrets isolates you. Always speak to a trusted adult — a teacher, parent, doctor, or dial toll-free 1098.',
          },
        ],
        quiz: {
          question: 'What should a child do if anyone makes them feel uncomfortable, asks for an unsafe secret, or touches them inappropriately?',
          options: [
            'Say NO loudly, get away safely, and tell a trusted adult or call Childline 1098 immediately',
            'Keep it a secret forever',
            'Blame themselves for what happened',
            'Hide and never go to school again',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'Near your neighborhood marketplace, you notice a 10-year-old child working 12-hour shifts carrying heavy boiling tea kettles and washing dishes all day instead of attending school.',
        dilemma:
          'The shop owner shouts: "Mind your own business! His parents need money, so school is useless for poor kids."',
        choices: [
          {
            id: 'c1',
            text: 'Report the hazardous child labour situation to a trusted school counsellor, Child Welfare Committee (CWC), or call toll-free 1098.',
            isConstitutional: true,
            spatialEffect: 'shield-expand',
            consequence:
              'The protective shield locks into place, sending rescue beacons across the horizon! A golden scroll of Article 24 appears.',
            explanation:
              'Article 24 and the Child Labour (Prohibition & Regulation) Amendment Act 2016 completely ban employment of children below 14 years in all occupations.',
          },
          {
            id: 'c2',
            text: 'Ignore the child and buy tea, assuming child labour is normal and cannot be stopped.',
            isConstitutional: false,
            spatialEffect: 'shield-shatter',
            consequence:
              'The shield drops down into the dust. Mitra looks down with a determined, serious gaze.',
            explanation:
              'Child labour steals education and childhood. Every citizen has a duty to report child exploitation to 1098 or 112.',
          },
        ],
        quiz: {
          question: 'Under Article 24 of the Indian Constitution, what is the minimum age below which children cannot be employed in factories, mines, or hazardous work?',
          options: [
            '14 years of age',
            '21 years of age',
            '10 years of age',
            'There is no minimum age',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'A teenage student in your locality is being pressured by family relatives into an underage child marriage before completing her Grade 10 board exams.',
        dilemma:
          'The relatives argue: "This is an internal family tradition. The law has no right to interfere in domestic family arrangements."',
        choices: [
          {
            id: 'c1',
            text: 'Stand up for the law: Prohibition of Child Marriage Act 2006 makes child marriage illegal and voidable. Contact Childline 1098 and the Child Marriage Prohibition Officer (CMPO).',
            isConstitutional: true,
            spatialEffect: 'shield-expand',
            consequence:
              'The shield of justice blazes with statutory authority! The student’s educational future is shielded by constitutional protection.',
            explanation:
              'Child marriage violates fundamental rights to health, education, and equality. Indian law strictly penalizes performing or facilitating child marriage.',
          },
          {
            id: 'c2',
            text: 'Say that cultural traditions always supersede constitutional rights and human dignity.',
            isConstitutional: false,
            spatialEffect: 'shield-shatter',
            consequence:
              'The shield develops deep fractures. Mitra reminds the student: "Constitutional morality always protects the rights of the child."',
            explanation:
              'No tradition or family custom can override the fundamental human rights and statutory protections guaranteed to adolescents.',
          },
        ],
        quiz: {
          question: 'Which key legislation in India renders child marriages punishable and empowers courts to issue child marriage injunction orders?',
          options: [
            'Prohibition of Child Marriage Act, 2006',
            'Income Tax Act, 1961',
            'Motor Vehicles Act, 1988',
            'Indian Railways Act, 1989',
          ],
          correctIndex: 0,
        },
      },
    },
  },
  {
    id: 'right-to-education',
    stationNumber: 5,
    title: 'The Scroll of Free & Compulsory Learning',
    subtitle: 'Article 21A & Right to Education (RTE) Act 2009',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 21A & RTE Act 2009 §3',
    color: '#2A7A4C',
    accentColor: '#16482C',
    geometryType: 'scroll',
    worldId: 'gardens-of-growth',
    dignityXpReward: 35,

    overview:
      'Enacted via the landmark 86th Constitutional Amendment, Article 21A directs the State to provide free and compulsory education to all children aged 6 to 14 years. The RTE Act 2009 guarantees trained teachers, safe classroom infrastructure, midday meals, and strictly prohibits screening fees, capitation fees, or denial of admission.',
    description:
      'Enacted via the landmark 86th Constitutional Amendment, Article 21A directs the State to provide free and compulsory education to all children aged 6 to 14 years. The RTE Act 2009 guarantees trained teachers, safe classroom infrastructure, midday meals, and strictly prohibits screening fees, capitation fees, or denial of admission.',
    realWorldExample:
      'A child working at a tea stall wants to attend school, but someone says they cannot afford books and uniform.',
    mitraPrompt:
      'The gates of school belong wide open to every girl and boy! Article 21A guarantees free, high-quality learning, books, and meals.',
    quiz: {
      question: 'Under Article 21A of India’s Constitution and the RTE Act 2009, which children are entitled to free and compulsory education?',
      options: [
        'All children between the ages of 6 and 14 years',
        'Only children whose parents work in government offices',
        'Only students with 100% test scores',
        'No child in India has this right',
      ],
      correctIndex: 0,
      explanation: 'Article 21A makes free and compulsory elementary education (ages 6–14) a fundamental right in India.',
    },

    scenarios: {
      '8-10': {
        context:
          'A young boy named Aarav has recently moved from a rural village with his parents. When they visit the local neighborhood school for Grade 3 admission, the principal turns them away.',
        dilemma:
          'The school says: "You do not have a formal birth certificate or transfer report card from your village. We cannot give you a desk here."',
        choices: [
          {
            id: 'c1',
            text: 'Remind the school of the RTE Act: Lack of birth certificates or past papers can NEVER be used to deny a child admission to a government school!',
            isConstitutional: true,
            spatialEffect: 'scroll-unfurl',
            consequence:
              'The 3D schoolhouse gates swing wide open! A magnificent golden scroll unrolls in mid-air, illuminating Article 21A.',
            explanation:
              'Section 14 of the RTE Act explicitly provides that no child shall be denied admission in a school for lack of age proof or past documentation.',
          },
          {
            id: 'c2',
            text: 'Tell Aarav he should go home and wait a year until his parents can find paperwork from the village.',
            isConstitutional: false,
            spatialEffect: 'scroll-roll-up',
            consequence:
              'The school gates slam shut with an iron clang. The parchment tightly rolls up into shadows.',
            explanation:
              'Every day out of school harms a child’s learning growth. The law requires immediate admission with bridge classes if needed.',
          },
        ],
        quiz: {
          question: 'Can a school in India deny admission to a 7-year-old child because their family does not have a birth certificate?',
          options: [
            'No, Section 14 of the RTE Act 2009 prohibits denying admission for lack of age proof',
            'Yes, without a certificate no child can study',
            'Only if the child pays a huge fine',
            'Only in big private academies',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'A private aided school in the neighborhood demands a ₹10,000 "library and development capitation fee" from parents before enrolling students under the 25% RTE reservation quota.',
        dilemma:
          'The school clerk claims: "Even under RTE, parents must pay extra building donations or their child will be expelled."',
        choices: [
          {
            id: 'c1',
            text: 'Expose the capitation fee: Section 13 of the RTE Act strictly bans screening procedures and capitation fees, imposing heavy fines on violators.',
            isConstitutional: true,
            spatialEffect: 'scroll-unfurl',
            consequence:
              'The golden scroll unrolls into a brilliant green garden of learning! Benches, chalkboards, and midday meal symbols appear.',
            explanation:
              'Education for children aged 6–14 must be genuinely free. Capitation fees are an offense under Indian education law.',
          },
          {
            id: 'c2',
            text: 'Advise poor parents to take high-interest loans from moneylenders to pay the school fee.',
            isConstitutional: false,
            spatialEffect: 'scroll-roll-up',
            consequence:
              'The scroll snaps shut and the schoolhouse fountain runs dry.',
            explanation:
              'Exploitative school fees drive vulnerable families into debt and force children out of classrooms.',
          },
        ],
        quiz: {
          question: 'What does Section 13 of the Right to Education (RTE) Act 2009 say about capitation fees in schools?',
          options: [
            'It strictly prohibits capitation fees and screening tests, making them punishable with heavy fines',
            'It encourages schools to charge as much as possible',
            'It allows fees only for sports equipment',
            'It only applies to colleges',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'A school management committee considers expelling an adolescent student who failed their Grade 8 annual examination.',
        dilemma:
          'The committee argues: "Expelling students who struggle keeps our school’s academic ranking high for city prestige."',
        choices: [
          {
            id: 'c1',
            text: 'Cite Section 16 of the RTE Act: No child shall be held back or expelled before completing elementary education (up to Grade 8); schools must provide remedial support!',
            isConstitutional: true,
            spatialEffect: 'scroll-unfurl',
            consequence:
              'The schoolhouse expands with dedicated tutoring benches and Socratic mentors! The student’s diploma shines proudly.',
            explanation:
              'The RTE philosophy treats student failure as an institutional failure to teach, requiring diagnostic learning rather than punitive expulsion.',
          },
          {
            id: 'c2',
            text: 'Vote to expel the student so other students study harder out of fear.',
            isConstitutional: false,
            spatialEffect: 'scroll-roll-up',
            consequence:
              'The classroom desk breaks down and shadows engulf the school hallway.',
            explanation:
              'Expulsion drives vulnerable youth into hazardous child labour and emotional trauma, defeating the entire purpose of Article 21A.',
          },
        ],
        quiz: {
          question: 'What is the core pedagogical principle of the RTE Act 2009 regarding elementary school children (Grades 1–8)?',
          options: [
            'Continuous learning, supportive remedial guidance, and protection from expulsion or screening',
            'Punitive rankings and public shaming of low-scoring students',
            'Immediate expulsion of students who ask questions',
            'Exams must be conducted in foreign languages only',
          ],
          correctIndex: 0,
        },
      },
    },
  },
  {
    id: 'constitutional-remedies',
    stationNumber: 6,
    title: 'The Crest of Legal Remedies (Heart & Soul)',
    subtitle: 'Article 32 · Dr. B.R. Ambedkar’s Pillar of Direct Supreme Court Justice',
    category: 'fundamental_right',
    articleRef: 'Constitution of India, Article 32 (Heart & Soul of Constitution)',
    color: '#3B5998',
    accentColor: '#1E2F54',
    geometryType: 'crest',
    worldId: 'haven-of-dignity',
    dignityXpReward: 40,

    overview:
      'Dr. B.R. Ambedkar called Article 32 the "very soul and heart of the Constitution." Without Article 32, written fundamental rights would just be words on paper. It empowers anyone — including children through guardians or public-spirited advocates — to approach the Supreme Court directly via writs if their rights are violated.',
    description:
      'Dr. B.R. Ambedkar called Article 32 the "very soul and heart of the Constitution." Without Article 32, written fundamental rights would just be words on paper. It empowers anyone — including children through guardians or public-spirited advocates — to approach the Supreme Court directly via writs if their rights are violated.',
    realWorldExample:
      'When an arbitrary rule denies a group of children access to public parks or schooling, citizens use constitutional remedies to enforce rights.',
    mitraPrompt:
      'Dr. Ambedkar called Article 32 the "Heart and Soul" of our Constitution. When a right is denied, our courts stand ready to protect you!',
    quiz: {
      question: 'Why did Dr. B.R. Ambedkar describe Article 32 as the "Heart and Soul" of the Indian Constitution?',
      options: [
        'Because it allows citizens to directly petition the Supreme Court to enforce their fundamental rights',
        'Because it was written on a red heart-shaped stamp',
        'Because it only deals with medical matters',
        'Because it cancels all other rights in times of peace',
      ],
      correctIndex: 0,
      explanation: 'Article 32 provides the judicial teeth (writs) to enforce fundamental rights directly in the Supreme Court.',
    },

    // Five constitutional writs
    writs: [
      { name: 'Habeas Corpus', meaning: 'Produce the body', purpose: 'Protects against unlawful detention or kidnapping.' },
      { name: 'Mandamus', meaning: 'We command', purpose: 'Orders a public official to perform their statutory duty.' },
      { name: 'Prohibition', meaning: 'To forbid', purpose: 'Prevents lower courts or bodies from exceeding their legal powers.' },
      { name: 'Quo Warranto', meaning: 'By what authority', purpose: 'Challenges unauthorized occupation of a public office.' },
      { name: 'Certiorari', meaning: 'To be certified', purpose: 'Quashes illegal orders passed by lower tribunals.' },
    ],

    scenarios: {
      '8-10': {
        context:
          'Children in a town discover that the city government stopped clean drinking water pipes to their primary school, making many students sick.',
        dilemma:
          'Local officials ignore their letters. The children ask: "If a government department breaks our rights, can anyone make them listen?"',
        choices: [
          {
            id: 'c1',
            text: 'Explain that the Supreme Court can issue orders (Writs) under Article 32 to command officials to fix the water pipes immediately!',
            isConstitutional: true,
            spatialEffect: 'remedy-prisms-fire',
            consequence:
              'The five crystal prism rays burst with brilliant blue and diamond light! A flowing fountain of clean constitutional justice appears.',
            explanation:
              'Article 32 gives citizens a direct key to the highest court in the land to enforce their Fundamental Rights (such as clean water under Article 21).',
          },
          {
            id: 'c2',
            text: 'Tell the children that once an official says no, there is nothing in the whole world anyone can do.',
            isConstitutional: false,
            spatialEffect: 'remedy-dim',
            consequence:
              'The crystal rays go dark and the royal pillar recedes into shadows.',
            explanation:
              'The Constitution creates independent courts specifically to protect citizens when public officials fail their duties.',
          },
        ],
        quiz: {
          question: 'Why did Dr. B.R. Ambedkar call Article 32 the "heart and soul" of the Constitution?',
          options: [
            'Because it gives citizens the right to approach the Supreme Court directly to enforce their Fundamental Rights',
            'Because it is the longest page in the book',
            'Because it only protects government ministers',
            'Because it was written in blue ink',
          ],
          correctIndex: 0,
        },
      },
      '11-13': {
        context:
          'A factory is dumping untreated chemical toxic waste into a river where thousands of slum children play and drink.',
        dilemma:
          'The children’s families cannot afford expensive private lawyers. A law student asks: "How can these children seek justice in the Supreme Court?"',
        choices: [
          {
            id: 'c1',
            text: 'File a Public Interest Litigation (PIL) under Article 32: Any public-spirited citizen can petition the Supreme Court on behalf of vulnerable children!',
            isConstitutional: true,
            spatialEffect: 'remedy-prisms-fire',
            consequence:
              'The 5 crystal rays surge with energy, projecting the emblem of the Supreme Court of India ("Yato Dharmastato Jayah")!',
            explanation:
              'Public Interest Litigation (PIL), pioneered by Justices P.N. Bhagwati and V.R. Krishna Iyer, relaxed traditional standing so anyone can protect child rights.',
          },
          {
            id: 'c2',
            text: 'Say that court cases can only be filed if every single child pays millions of rupees in advance.',
            isConstitutional: false,
            spatialEffect: 'remedy-dim',
            consequence:
              'The pillar of justice crumbles into stone rubble.',
            explanation:
              'Indian courts accept simple postcards or letters as writ petitions under Article 32 to protect children and vulnerable citizens.',
          },
        ],
        quiz: {
          question: 'What is a "Public Interest Litigation" (PIL) filed under Article 32 in the Supreme Court of India?',
          options: [
            'A legal action filed by any public-spirited person or group to protect the rights of vulnerable people and public welfare',
            'A private contract between two business corporations',
            'A secret police investigation',
            'A commercial advertisement broadcast on television',
          ],
          correctIndex: 0,
        },
      },
      '14-16': {
        context:
          'A state government issues an arbitrary executive order suspending the right of citizens to challenge illegal detentions during an emergency.',
        dilemma:
          'A legal analyst asks: "Can a statute or executive circular eliminate a citizen’s right to seek a writ of Habeas Corpus under Article 32?"',
        choices: [
          {
            id: 'c1',
            text: 'Assert the Basic Structure Doctrine: Judicial review and Article 32 are integral parts of the basic structure of the Constitution and cannot be abrogated.',
            isConstitutional: true,
            spatialEffect: 'remedy-prisms-fire',
            consequence:
              'The royal pillar locks into the bedrock of democracy, radiating indestructible golden and sapphire beacons across all 5 realms!',
            explanation:
              'In Kesavananda Bharati (1973) and Minerva Mills (1980), the Supreme Court ruled that judicial review under Article 32 is a basic feature immune to destruction.',
          },
          {
            id: 'c2',
            text: 'Argue that governments can suspend court remedies whenever they find constitutional checks inconvenient.',
            isConstitutional: false,
            spatialEffect: 'remedy-dim',
            consequence:
              'The entire constitutional bedrock shakes and the scales fall.',
            explanation:
              'A government without judicial checks becomes tyrannical. The Constitution is supreme over all legislative and executive branches.',
          },
        ],
        quiz: {
          question: 'Which landmark writ under Article 32 literally translates to "Produce the Body" and protects individuals against unlawful detention?',
          options: [
            'Habeas Corpus',
            'Quo Warranto',
            'Certiorari',
            'Prohibition',
          ],
          correctIndex: 0,
        },
      },
    },
  },
];

// Alias export for backward compatibility with existing test suites
export const AR_CONSTITUTIONAL_OBJECTS = AR_CONSTITUTIONAL_STATIONS;

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
