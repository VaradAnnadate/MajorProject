/**
 * Shared Intelligence Data & Curriculum Alignments
 * RightsQuest India — Part 06 Educator & Guardian System
 * 
 * Complies with Creative OS 44_AGENCYLIKE_UI & DPDP Act 2023 Section 9.
 */

export const CURRICULUM_ALIGNMENTS = Object.freeze([
  {
    realmId: 'village-of-belonging',
    realmName: 'The Village of Belonging',
    statutoryArticles: ['Article 14', 'Article 15(3)'],
    ncertMapping: 'NCERT Class 6 Civics Ch. 1 & 2: Understanding Diversity, Diversity and Discrimination',
    cbseUnits: 'Unit 1: Diversity, Equality and the Indian Constitution',
    coreConcepts: ['Equal Protection of Laws', 'Affirmative Action for Vulnerable Groups', 'Active Bystander Empathy'],
    discussionPrompts: [
      'What is the difference between treating everyone identically and treating everyone with equal fairness?',
      'If a school rule accidentally excludes someone with a disability or different mother tongue, how should the circle adapt?',
    ],
    offlineClassroomActivity: 'The Shared Circle Exercise: Students collaborate to draft 3 inclusive playground guidelines where no classmate sits on the sidelines.',
    familyDinnerPrompt: 'Ask your child: Was there a time at school this week when someone felt left out, and how did classmates respond?',
    familyOfflineActivity: 'The Fair Household Rota: Discuss how family chores and responsibilities can be shared with equal dignity irrespective of gender.',
  },
  {
    realmId: 'gardens-of-growth',
    realmName: 'The Gardens of Growth',
    statutoryArticles: ['Article 21A', 'RTE Act 2009'],
    ncertMapping: 'NCERT Class 8 Civics Ch. 4 & 5: Understanding Laws, Judiciary & Social Justice',
    cbseUnits: 'Unit 2: Fundamental Rights and Duties of Citizens',
    coreConcepts: ['Free & Compulsory Elementary Education (6–14 years)', 'No Detention / Corporal Punishment Prohibition', 'Midday Meal Nutrition'],
    discussionPrompts: [
      'Why did India amend its Constitution to make school education a fundamental right for every child?',
      'If a friend stops attending school to help their family work, what legal and welfare supports are available?',
    ],
    offlineClassroomActivity: 'Classroom Empty Bench Audit: Students write a supportive letter to a peer who has missed school, emphasizing why their seat matters.',
    familyDinnerPrompt: 'Ask your child: What is something you learned today that made you curious, and who is someone at school who helped you learn it?',
    familyOfflineActivity: 'Family Library Evening: Read a story about child rights together and note down 1 right that protects daily schooling.',
  },
  {
    realmId: 'forest-of-safety',
    realmName: 'The Forest of Safety',
    statutoryArticles: ['POCSO Act 2012', 'Childline 1098'],
    ncertMapping: 'NCERT Health & Physical Education Module: Personal Safety, Boundaries & Well-being',
    cbseUnits: 'CBSE Unit: Life Skills & Adolescence Education Programme: Safe Touch & Emotional Well-being',
    coreConcepts: ['Bodily Integrity & Personal Boundaries', 'Safe vs. Unsafe Touch', 'Trusted Adult Networks', 'No Blame / Confidential Help'],
    discussionPrompts: [
      'Who are the 3 trusted adults in your circle you would speak with if something felt confusing or uncomfortable?',
      'Why is asking for help a sign of courage rather than weakness?',
    ],
    offlineClassroomActivity: 'The 3-Ring Safety Circle: Students map out their personal boundary rings (Inner Self, Trusted Family/Teachers, Public Acquaintances).',
    familyDinnerPrompt: 'Remind your child: You can always tell us anything, even if someone told you it was a secret or you feel nervous. You will never be in trouble for telling the truth.',
    familyOfflineActivity: 'Emergency Contacts Card: Create a refrigerator card with family emergency numbers and National Childline 1098.',
  },
  {
    realmId: 'river-of-voices',
    realmName: 'The River of Voices',
    statutoryArticles: ['UNCRC Article 12', 'Article 19(1)(a)'],
    ncertMapping: 'NCERT Class 7 Civics Ch. 6: Understanding Media & Freedom of Expression',
    cbseUnits: 'Unit 3: Democratic Participation and Civic Responsibilities',
    coreConcepts: ['Child’s Right to Be Heard', 'Bal Sansad (Children’s Parliaments)', 'Respectful Online Disagreement', 'Digital Footprint Dignity'],
    discussionPrompts: [
      'How can we share our honest opinion without hurting another person’s dignity or privacy?',
      'If a group chat becomes unkind or forwards an embarrassing meme of a classmate, what is the most constructive response?',
    ],
    offlineClassroomActivity: 'Mini Bal Sansad Debate: The class forms two peaceful consensus councils to deliberate on student council election rules.',
    familyDinnerPrompt: 'Ask your child: What is an opinion you hold about a school matter that you wish more adults listened to?',
    familyOfflineActivity: 'Family Listening Circle: Give every family member uninterrupted 2 minutes to share a high and low point of their week.',
  },
  {
    realmId: 'haven-of-dignity',
    realmName: 'The Haven of Dignity',
    statutoryArticles: ['Article 24', 'Child Labour Amendment Act 2016'],
    ncertMapping: 'NCERT Class 8 Civics Ch. 10: Law and Social Justice (Enforcing Minimum Wages & Child Labour Bans)',
    cbseUnits: 'Unit 4: Economic Justice, Child Protection and Government Schemes',
    coreConcepts: ['Prohibition of Hazardous Work under 18', 'Protection from Economic Exploitation', 'Childhood as a Protected Phase'],
    discussionPrompts: [
      'What is the difference between helping at home with light chores and hazardous child labour in workshops or kilns?',
      'How does keeping children in school rather than hazardous work strengthen India’s future?',
    ],
    offlineClassroomActivity: 'Civic Awareness Poster: Design a poster celebrating childhood dignity and highlighting Childline 1098.',
    familyDinnerPrompt: 'Discuss with your child: Why is childhood considered a protected time in our constitution, and what do children need to flourish?',
    familyOfflineActivity: 'Community Gratitude Note: Write a thank you note to community helpers who keep school environments clean and safe.',
  },
]);

/**
 * Historical Classroom Sessions (Simulated seed data for Educator Studio)
 * All entries strictly use anonymous animal avatars and aggregate statistics.
 */
export const HISTORICAL_CLASSROOM_SESSIONS = Object.freeze([
  {
    id: 'session-oct-28',
    sessionId: 'session-oct-28',
    pin: 'RQ-4821',
    date: '2026-10-28',
    questId: 'playground-partition',
    questTitle: 'The Great Playground Partition',
    statutoryRef: 'Article 14 (Equality)',
    participantsCount: 28,
    majorityPercentage: 75,
    consensusPercentage: 75,
    consensusOutcome: 'Make a fair schedule so everyone gets a turn',
    dominantOption: 'Make a fair schedule so everyone gets a turn',
    divergentOption: 'Ask classmates what would help them join in',
    status: 'completed',
    notes: '89% of students recognized that rules should accommodate all abilities, not just athletic speed.',
    keyInsight: '89% of students recognized that rules should accommodate all abilities, not just athletic speed.',
  },
  {
    id: 'session-nov-04',
    sessionId: 'session-nov-04',
    pin: 'RQ-7319',
    date: '2026-11-04',
    questId: 'classroom-meme',
    questTitle: 'The Viral Classroom Meme',
    statutoryRef: 'UNCRC Article 12 & DPDP Act §9',
    participantsCount: 31,
    majorityPercentage: 68,
    consensusPercentage: 68,
    consensusOutcome: 'Check privately with the classmate and a trusted adult',
    dominantOption: 'Check privately with the classmate and a trusted adult',
    divergentOption: 'Stop forwarding it and ask others to do the same',
    status: 'completed',
    notes: 'Students debated whether confronting the group chat directly was safer than quietly seeking adult assistance.',
    keyInsight: 'Students debated whether confronting the group chat directly was safer than quietly seeking adult assistance.',
  },
  {
    id: 'session-nov-09',
    sessionId: 'session-nov-09',
    pin: 'RQ-1094',
    date: '2026-11-09',
    questId: 'midday-meal',
    questTitle: 'The Great Midday Stew Question',
    statutoryRef: 'Article 21A & RTE Act 2009',
    participantsCount: 26,
    majorityPercentage: 81,
    consensusPercentage: 81,
    consensusOutcome: 'Tell a trusted teacher and ask them to check the serving plan',
    dominantOption: 'Tell a trusted teacher and ask them to check the serving plan',
    divergentOption: 'Ask the class to listen to everyone and make a shared plan',
    status: 'completed',
    notes: 'High consensus that collective welfare questions should be raised calmly through trusted school channels.',
    keyInsight: 'High consensus that collective welfare questions should be raised calmly through trusted school channels.',
  },
]);

export function getCurriculumAlignment(realmId) {
  return CURRICULUM_ALIGNMENTS.find((item) => item.realmId === realmId) || CURRICULUM_ALIGNMENTS[0];
}
