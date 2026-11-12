/**
 * Comprehensive Safety Topics Data with 3-Tier Age Adaptations
 * Target Age Groups:
 * - 8–10 (Young Navigators)
 * - 11–13 (Pathfinders)
 * - 14–16 (Youth Advocates)
 * Grounded in Indian Law (POCSO 2012, DPDP 2023 §9, RTE 2009, Child Labour Act 2016, Arts. 14, 15, 21A, 24)
 */

export const SAFETY_TOPICS = [
  {
    id: 'boundaries',
    category: 'Personal Safety',
    icon: 'Shield',
    color: '#D04F36',
    legalCitation: 'POCSO Act 2012 & Article 21 (Right to Personal Liberty & Bodily Autonomy)',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'My Body Belongs to Me',
        lead: 'Your body is yours. You have the right to feel safe and respected at all times.',
        concept: 'Parts of our body that are covered by a swimsuit are our private parts. No one is allowed to touch them, ask to see them, or ask you to touch theirs, unless a doctor or parent is helping you stay clean or healthy with you present.',
        scenarios: [
          'If someone tries to tickle or hug you in a way that makes you feel uneasy or uncomfortable, you are allowed to say "Stop, I don’t like that!"',
          'If an older person tells you "this is our secret", remember: good secrets are happy surprises like birthday gifts. Secrets that make you feel scared or confused must always be told to a trusted adult.'
        ],
        goldenRule: 'The 3-Step Safety Rule: 1. Say NO firmly. 2. RUN or walk away to a safe space. 3. TELL a trusted adult.',
        whatToRemember: 'You will never get into trouble for telling the truth about an uncomfortable touch. You are never at fault.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'Personal Boundaries, Consent & Body Autonomy',
        lead: 'Understanding boundaries helps you protect yourself and treat your friends with dignity.',
        concept: 'Physical and emotional boundaries are the personal invisible fences we set for ourselves. You decide who touches you, how close people stand, and what topics make you feel safe. You also have a duty to respect others when they say no.',
        scenarios: [
          'Peer pressure often challenges boundaries: "If you were really my friend, you would let me borrow this or hug me." True friendship respects a "no" without guilt.',
          'Grooming or boundary crossing often starts with special gifts or requests for private chats. If someone asks you to hide things from your parents or teachers, pause and evaluate.'
        ],
        goldenRule: 'Consent must be clear, voluntary, and can be changed at any time. A hesitation or uncomfortable silence is not a yes.',
        whatToRemember: 'Under the POCSO Act 2012, the law strictly protects all individuals under 18 from any form of sexual harassment or abuse. You have the legal right to safety.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Bodily Integrity, Legal Protections & POCSO Jurisprudence',
        lead: 'Constitutional liberty and statutory protections regarding consent, harassment, and bodily boundaries.',
        concept: 'Article 21 guarantees the fundamental right to life with dignity, which Indian courts have ruled includes bodily integrity and privacy. The Protection of Children from Sexual Offences (POCSO) Act 2012 provides a gender-neutral framework protecting every person under 18 against sexual assault, harassment, and exploitation.',
        scenarios: [
          'Recognizing subtle boundary violations: coercion disguised as affection, guilt-tripping, or threats of social isolation.',
          'Mandatory reporting obligations under POCSO Section 19: Any person who has knowledge of an offence against a minor must report it to the Special Juvenile Police Unit (SJPU) or local police.'
        ],
        goldenRule: 'Consent cannot be coerced, induced by intoxication, or extracted through power imbalances (e.g., coach, mentor, elder relative).',
        whatToRemember: 'Victim blaming is legally and morally false. The law places complete responsibility on the perpetrator, never the adolescent.'
      }
    }
  },
  {
    id: 'trustedAdults',
    category: 'Protection Circle',
    icon: 'HeartHandshake',
    color: '#DE7215',
    legalCitation: 'UNCRC Article 3 (Best Interests of the Child) & Juvenile Justice Act 2015',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'My Trusted Adults Safety Circle',
        lead: 'Who are the big people in your life that you can turn to whenever you feel scared or unsure?',
        concept: 'A trusted adult is someone older who listens without yelling, believes you when you speak, respects your feelings, and takes action to keep you safe.',
        scenarios: [
          'Pick 3 to 5 people for your safety palm: your mother, father, a favorite school teacher, a doctor, or an aunt.',
          'If the first adult says "oh, you are just imagining it", do not give up! Go to the second person on your list.'
        ],
        goldenRule: 'Keep talking until you find an adult who listens and helps.',
        whatToRemember: 'You do not have to carry heavy worries in your heart by yourself.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'Building a Reliable Support Network',
        lead: 'How to communicate effectively with adults when facing complex challenges.',
        concept: 'As you grow, challenges become more complicated—academic anxiety, cyberbullying, or interpersonal friction. Having identified mentors you trust ensures you never feel isolated.',
        scenarios: [
          'How to open the conversation: "Sir/Ma’am, can I talk to you in private for 5 minutes? Something happened that is bothering me and I need advice."',
          'Distinguishing advice from dismissiveness: A good mentor doesn’t dismiss your feelings as "teenage drama".'
        ],
        goldenRule: 'Professional help exists: School counselors and Childline 1098 are trained to listen without anger or judgment.',
        whatToRemember: 'Asking for help is an act of courage and maturity, not weakness.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Navigating Institutional Support, CWCs & Helplines',
        lead: 'Understanding your rights when seeking formal assistance from adults and state child protection bodies.',
        concept: 'Under the Juvenile Justice (Care and Protection of Children) Act 2015, District Child Welfare Committees (CWCs) hold magisterial powers to safeguard minors. If family environments become unsafe or non-responsive, legal institutional channels exist to support you.',
        scenarios: [
          'Confidential counseling: When seeking support from school counselors or adolescent health centers, understand your rights to confidentiality and the limits where mandatory safety reporting applies.',
          'Advocating for peers: Knowing how to guide a friend who is facing domestic abuse or harassment to institutional help without endangering them.'
        ],
        goldenRule: 'Institutional duty of care: Adults in positions of authority have a legal responsibility to act in the best interests of the child.',
        whatToRemember: 'Helplines like 1098 and 112 are free public safety infrastructures funded by the Government of India for your protection.'
      }
    }
  },
  {
    id: 'onlineSafety',
    category: 'Digital Citizenship',
    icon: 'Laptop',
    color: '#1B6D80',
    legalCitation: 'DPDP Act 2023 §9 (Children’s Data Protection) & IT Act 2000 Section 67B',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'Safe Internet Adventures',
        lead: 'The internet is a giant playground, but we must stay on the safe path.',
        concept: 'Never share personal secrets with online games or websites. Personal secrets include your real full name, the school you attend, your home address, or your parent’s phone number.',
        scenarios: [
          'If a player in an online game asks "Where do you live? Let’s meet at the park," tell a parent immediately. Never meet internet strangers in person.',
          'If a game asks for permission to take your photo or record your voice, ask an adult first.'
        ],
        goldenRule: 'If something on the screen makes your tummy feel weird or scared, turn off the screen and tell an adult.',
        whatToRemember: 'People on the internet can pretend to be a child even when they are an adult. Keep your private identity protected.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'Smart Social Media & Cyber Privacy',
        lead: 'Protecting your digital footprint, passwords, and emotional well-being online.',
        concept: 'Under Section 9 of the Digital Personal Data Protection Act (DPDP) 2023, platforms are legally barred from tracking or profiling children without parental consent. Be mindful of what you upload—once posted, photos and comments can be copied and saved forever.',
        scenarios: [
          'Cyberbullying in group chats: When someone makes a meme out of a classmate’s photo or excludes them from study groups, don’t share or like it. Take screenshots as evidence and report to the class teacher.',
          'Phishing and free game currency scams: Never click links offering "free Robux" or "unlimited diamonds" that ask for passwords.'
        ],
        goldenRule: 'Strong passwords, private accounts, and trusted friend lists: Only accept friend requests from people you know in real life.',
        whatToRemember: 'If someone threatens to share your private chats or pictures unless you do something, do not comply. It is illegal blackmail. Call 1930 or 1098.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Cyber Law, Digital Extortion & National Cybercrime Reporting',
        lead: 'Legal rights against non-consensual imagery, online harassment, and digital exploitation.',
        concept: 'The Information Technology Act 2000 (Sections 66E, 67, 67B) and the Indian Penal Code strictly penalize cyberstalking, non-consensual sharing of intimate images, and online extortion. Section 67B imposes stringent imprisonment for creating or distributing abusive child material.',
        scenarios: [
          'Sextortion and image abuse: If an anonymous account threatens to leak morphed photos, remember that you are the victim of a cybercrime. Do not pay money. Preserve evidence (URLs, usernames, timestamps) and report to cybercrime.gov.in (National Cyber Crime Reporting Portal or call 1930).',
          'Algorithms and mental health: Understanding how commercial algorithms exploit adolescent attention through infinite feeds and outrage cycles.'
        ],
        goldenRule: 'Zero tolerance for digital blackmail: Law enforcement has specialized cyber units to trace IP addresses and remove abusive content from platforms.',
        whatToRemember: 'You have the right to be forgotten and protected against online harassment. The National Cyber Crime Portal operates toll-free at 1930.'
      }
    }
  },
  {
    id: 'bullying',
    category: 'Dignity & Protection',
    icon: 'Users',
    color: '#8A58A5',
    legalCitation: 'Articles 14 & 15(3) (Equality Code) & CBSE Anti-Bullying Directives',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'Kindness, Sharing & No Teasing',
        lead: 'Every friend in school deserves to be treated with care and respect.',
        concept: 'Bullying is when someone hurts, pushes, or makes fun of another person on purpose again and again. Teasing someone because of their lunch, clothes, skin, or language is wrong.',
        scenarios: [
          'If you see someone sitting alone at recess because others said "you can’t play with us," invite them to your circle.',
          'If someone pushes you in the school line, look at them and say "Do not push me," then tell your teacher.'
        ],
        goldenRule: 'Be a kind friend: Words have power. Use words that lift friends up, not tear them down.',
        whatToRemember: 'It takes courage to be kind when others are being mean.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'Active Bystander Intervention',
        lead: 'Moving from a silent spectator to an active ally when classmates face exclusion.',
        concept: 'CBSE guidelines mandate that every school maintain an anti-bullying committee. Discrimination based on caste, religion, language, or physical ability directly violates the Constitution of India (Articles 14 and 15).',
        scenarios: [
          'The 4 Ds of Active Bystander intervention: Direct (Say "That’s not cool"), Distract (Change the topic or invite the person away), Delegate (Tell a teacher), Delay (Check on the person afterwards).',
          'Name-calling disguised as "just joking": If the person on the receiving end isn’t laughing, it is not a joke; it is harassment.'
        ],
        goldenRule: 'Silence can be mistaken for agreement. Speaking up safely protects the whole classroom culture.',
        whatToRemember: 'You have the constitutional right to attend school without psychological harassment or humiliation.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Equality Jurisprudence, Anti-Ragging & Institutional Remedies',
        lead: 'Constitutional equality, systemic discrimination, and grievance redressal mechanisms.',
        concept: 'Articles 14, 15, and 17 of the Constitution of India establish an uncompromising framework against discrimination and untouchability. Ragging and structural bullying are punishable offences under state legislation and university/school disciplinary regulations.',
        scenarios: [
          'Recognizing systemic bias: When certain student groups are stereotyped or excluded from student councils and sports teams based on socioeconomic background or gender.',
          'Formal grievance filing: Utilizing internal complaints committees, school ombudsmen, and state human rights commissions when institutional authorities ignore persistent bullying.'
        ],
        goldenRule: 'True leadership is democratic: Creating inclusive spaces where every peer’s dignity is actively defended.',
        whatToRemember: 'Dignity is non-negotiable. Article 14 ensures that all persons are equal before the law and entitled to equal protection.'
      }
    }
  },
  {
    id: 'educationRights',
    category: 'Empowerment',
    icon: 'BookOpen',
    color: '#2E7D32',
    legalCitation: 'Article 21A, Right of Children to Free and Compulsory Education (RTE) Act 2009',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'The School Bell Rings for Everyone',
        lead: 'Every girl and boy has the right to go to school, read books, and learn joyfully.',
        concept: 'Under our country’s law, school is free for every child between 6 and 14 years old. You should get books, clean drinking water, clean toilets, and a hot midday meal every day.',
        scenarios: [
          'A teacher is never allowed to hit you with a stick, slap you, or make you stand in the sun as punishment. This is called corporal punishment, and it is against the law.',
          'If a classmate stops coming to school because their family thinks they shouldn’t study, the law says they must be helped to come back.'
        ],
        goldenRule: 'School is for learning and growing, not for fear.',
        whatToRemember: 'The government must provide you with a school within walking distance of your neighborhood.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'RTE Entitlements & Corporal Punishment Ban',
        lead: 'Understanding your legal protections under Section 17 of the RTE Act 2009.',
        concept: 'Section 17 of the RTE Act strictly prohibits physical punishment and mental harassment. Violators face disciplinary action. Additionally, schools cannot deny admission for lack of birth certificates or age proof.',
        scenarios: [
          'If a student is failed and expelled in elementary school: Under Section 16 of the RTE Act, schools must support students with continuous evaluation rather than expelling them.',
          'Girls’ rights to sanitation: Schools must maintain functional, separate, clean toilets for girls to prevent dropout rates.'
        ],
        goldenRule: 'Education is a fundamental right, not a charity or favor.',
        whatToRemember: 'You have the right to question, explore, and learn in an encouraging, non-violent classroom environment.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Constitutional Architecture of Article 21A & Educational Equity',
        lead: 'Analyzing state obligations, affirmative action, and the 25% economically weaker section (EWS) quota.',
        concept: 'The 86th Constitutional Amendment Act (2002) inserted Article 21A, elevating elementary education into an enforceable Fundamental Right. Section 12(1)(c) of the RTE Act mandates 25% reservation in private unaided schools for children from disadvantaged groups and weaker sections.',
        scenarios: [
          'Transitioning beyond Grade 8: While Article 21A covers ages 6–14, national policies (NEP 2020) and constitutional directives obligate the state to provide secondary education access.',
          'Challenging discriminatory fee barriers or withholding of transfer certificates: Courts consistently rule that children cannot be held hostage for parental financial disputes.'
        ],
        goldenRule: 'Knowledge is sovereign: Quality public education is the foundation of democratic citizenship.',
        whatToRemember: 'State commissions for protection of child rights (SCPCR) have statutory powers to inspect schools and enforce RTE compliance.'
      }
    }
  },
  {
    id: 'labourProtection',
    category: 'Protection Circle',
    icon: 'Hammer',
    color: '#8C3D10',
    legalCitation: 'Article 24 & Child and Adolescent Labour (Prohibition and Regulation) Act 1986/2016',
    ageAdaptations: {
      '8-10': {
        stage: 'Young Navigators',
        title: 'Books Before Work',
        lead: 'Children belong in schools and playgrounds, not working in tea stalls or brick factories.',
        concept: 'Children under 14 are not allowed to be employed in any jobs. You have the right to play, study, and sleep enough every day so your body grows strong.',
        scenarios: [
          'Helping parents with light household chores or farm work after school hours is fine, but it should never stop you from doing homework or attending class.',
          'If you see a child working full-time at a roadside shop instead of going to school, they need help from Childline 1098.'
        ],
        goldenRule: 'A child’s job is to learn, play, and dream.',
        whatToRemember: 'Every child deserves a real childhood.'
      },
      '11-13': {
        stage: 'Pathfinders',
        title: 'Child Labour Laws & Hazardous Work Protections',
        lead: 'Understanding the legal difference between household chores and unlawful child labour.',
        concept: 'The Child and Adolescent Labour Act prohibits employment of children under 14 in all occupations and processes. For adolescents aged 14–18, employment in hazardous occupations (mines, inflammable substances, factories) is strictly prohibited by law.',
        scenarios: [
          'The myth of "helping the family": Work that interferes with school attendance, damages health, or exposes a child to dangerous chemicals is prohibited.',
          'Reporting child labour: The PENCIL portal (Platform for Effective Enforcement for No Child Labour) and Childline 1098 coordinate rescue and rehabilitation with district collectors.'
        ],
        goldenRule: 'Economic hardship does not erase a child’s constitutional right to freedom from exploitation.',
        whatToRemember: 'Article 24 of the Constitution is an absolute prohibition: no child under 14 shall be employed in any factory or mine.'
      },
      '14-16': {
        stage: 'Youth Advocates',
        title: 'Economic Exploitation, Human Trafficking & Article 23/24 Enforcement',
        lead: 'Constitutional prohibitions against forced labour, trafficking, and adolescent workplace hazards.',
        concept: 'Articles 23 (Prohibition of traffic in human beings and forced labour) and 24 (Prohibition of child labour in hazardous employment) form the constitutional shield against economic exploitation. Violation of these provisions is a cognizable criminal offence.',
        scenarios: [
          'Adolescents (14–18) in the gig or informal economy: Understanding working hour regulations (maximum 6 hours/day with a rest interval, no work between 7 PM and 8 AM).',
          'Inter-state migration and bonded labour: Recognizing deceptive recruitment practices where young people are trafficked under promises of high wages.'
        ],
        goldenRule: 'Dignity of labour begins with the total protection of childhood.',
        whatToRemember: 'Rehabilitation schemes exist: Rescued child workers are entitled to financial rehabilitation and enrollment in residential schools like Kasturba Gandhi Balika Vidyalayas.'
      }
    }
  }
];

