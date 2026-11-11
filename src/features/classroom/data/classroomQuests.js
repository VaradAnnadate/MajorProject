export const CLASSROOM_QUESTS = Object.freeze([
  {
    id: 'playground-partition',
    title: 'The Great Playground Partition',
    realm: 'The Village of Belonging',
    articleRef: 'Equality · Constitution of India, Article 14',
    minutes: 8,
    synopsis: 'A new playground rule keeps some classmates away from the best play space. The class must decide how to make play fair for everyone.',
    dilemma: 'The school has one shaded play area. A group says it should be reserved for only the fastest runners. What should the class suggest?',
    options: [
      { id: 'share', label: 'Make a fair schedule so everyone gets a turn.' },
      { id: 'listen', label: 'Ask classmates what would help them join in.' },
      { id: 'keep-rule', label: 'Keep the rule because it is already in place.' },
    ],
    reflection: 'Fair rules should give every child a meaningful chance to take part.',
    discussionPrompt: 'Who might be left out by the current rule, and how could the class hear their ideas?',
    legalNote: 'Article 14 describes equality before the law and equal protection of the laws.',
  },
  {
    id: 'classroom-meme',
    title: 'The Viral Classroom Meme',
    realm: 'The River of Voices',
    articleRef: 'Privacy, dignity & respectful participation',
    minutes: 8,
    synopsis: 'A funny picture of a classmate is spreading in a group chat. The class considers how to respond with care.',
    dilemma: 'A classmate says the picture is embarrassing and asks everyone to stop sharing it. What is a helpful next step?',
    options: [
      { id: 'stop-share', label: 'Stop forwarding it and ask others to do the same.' },
      { id: 'check-in', label: 'Check privately with the classmate and a trusted adult.' },
      { id: 'ignore', label: 'Ignore it and hope the messages stop by themselves.' },
    ],
    reflection: 'A kind response protects dignity. Children can ask a trusted adult for help with online harm.',
    discussionPrompt: 'How can we support a classmate without repeating or spreading the picture?',
    legalNote: 'Children deserve dignity and a say in matters that affect them. This activity is a classroom discussion, not legal advice.',
  },
  {
    id: 'midday-meal',
    title: 'The Great Midday Stew Question',
    realm: 'The Gardens of Growth',
    articleRef: 'Education · Constitution of India, Article 21A & RTE Act 2009',
    minutes: 8,
    synopsis: 'The class notices that some children are missing lunch and wonders how to raise the issue kindly.',
    dilemma: 'A few students are not getting the same lunch portions. How can the class raise this fairly and respectfully?',
    options: [
      { id: 'adult-help', label: 'Tell a trusted teacher and ask them to check the serving plan.' },
      { id: 'class-meeting', label: 'Ask the class to listen to everyone and make a shared plan.' },
      { id: 'blame', label: 'Publicly blame the person serving lunch.' },
    ],
    reflection: 'Children can share concerns with trusted adults. A calm, fair process helps find what is happening.',
    discussionPrompt: 'What facts should a teacher check before the class decides what to change?',
    legalNote: 'Article 21A and the Right to Education Act concern free and compulsory elementary education for children aged 6–14.',
  },
]);

export function getClassroomQuest(questId) {
  return CLASSROOM_QUESTS.find((quest) => quest.id === questId) || null;
}
