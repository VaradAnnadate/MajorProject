/**
 * RightsQuest India — Scenario Script AST
 * Complete branching dialogue scripts for Mission 01 and Mission 02.
 *
 * CONTENT MANDATE:
 * - Age-appropriate language per AGE_BANDS
 * - No graphic violence or traumatic imagery
 * - 1098 (Childline) referenced in safety-critical moments
 * - Mitra switches to 'concerned' state at safeguarding moments
 */

// ─────────────────────────────────────────────────────────────────────────────
// MISSION 01 — The Mystery of the Empty Bench
// Article 21A & RTE Act 2009 | Age Band: 8–10 | World: Gardens of Growth
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_01_BENCH = {
  id: 'scenario-01-bench',
  missionId: 'adv-01-schoolbag',
  worldId: 'gardens-of-growth',
  title: 'The Mystery of the Empty Bench',
  tagline: 'Why did Chintu stop coming to morning math class?',
  articleRef: 'Article 21A & RTE Act, 2009',
  estimatedMinutes: 12,
  difficulty: 'Explorer',
  badgeName: 'Seal of the School Bell',
  synopsis:
    'When a seat goes empty in Standard 4, a team of curious classmates investigates why their friend Chintu is working at the bus-stand tea stall instead of learning fractions.',
  mascotStateDefault: 'curious',
  totalChapters: 4,

  chapters: [
    // ── CHAPTER 1 ───────────────────────────────────────────────────────────
    {
      id: 'ch-01',
      chapterNumber: 1,
      title: 'The Empty Bench',
      setting:
        'Standard 4 classroom, Sunrise Government Primary School. Morning light streams through open windows. A wooden bench third from the front sits conspicuously empty.',
      dialogues: [
        {
          id: 'dlg-001',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'It is Monday morning. The school bell has rung twice. Twenty-three children file into Standard 4, hang their bags on iron hooks, and settle into their benches. But bench number three, row two — the one Chintu Sharma always shared with Riya — is empty.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-002',
          speaker: 'riya',
          speakerLabel: 'Riya',
          text: 'Mitra, why is Chintu\'s seat empty again? This is the fourth day in a row! Yesterday Teacher Meenakshi ma\'am marked him absent without even calling his parents.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-003',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Hmm, four days is a long time, Riya. Every child your age has a special right — the right to come to school and learn, completely free! I wonder what could be keeping Chintu away. Shall we be detectives today?',
          textByAge: {
            'age-8-10': 'Hmm, four days is a long time! Every child has the right to come to school, read stories, and play. Let us find out what happened to Chintu!',
            'age-11-13': 'Four days is a long time, Riya. Under Article 21A and the RTE Act, free elementary education is a guaranteed fundamental right. Let’s investigate what is keeping Chintu away.',
            'age-14-16': 'Four consecutive absences is a serious warning sign. Under Article 21A, the state must ensure compulsory schooling until age 14. We need to document why Chintu is missing class.',
          },
          mascotState: 'curious',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-004',
          speaker: 'arjun',
          speakerLabel: 'Arjun',
          text: 'I think I saw Chintu near the bus stand yesterday after school hours. He was carrying a heavy tray of chai glasses. His arms were shaking!',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-005',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'The class falls quiet. Everyone is thinking about Chintu — his neat handwriting, the way he always helped classmates count on the abacus. Something feels very wrong.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-006',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'A child carrying heavy trays and missing school? That is a problem. Let\'s think carefully about what we can do. What would YOU do first if your friend suddenly stopped coming to school?',
          mascotState: 'thinking',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-01-a',
          text: 'Go to the bus stand after school and check on Chintu yourself.',
          consequenceText:
            'You walk to the bus stand after school. Chintu is there, quietly wiping chai glasses. When he sees you, his eyes fill with tears. He whispers that his father fell ill and he needs to earn money for medicine. You listen without judging — this is exactly what a true friend does. Chintu feels less alone.',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 20,
          nextChapterId: 'ch-02',
        },
        {
          id: 'choice-01-b',
          text: 'Tell everyone in class loudly that Chintu is working at a tea stall.',
          consequenceText:
            'Some children laugh. Chintu\'s younger sister, who is in Standard 2, hears and runs home crying. This makes Chintu\'s family embarrassed and they avoid the school entirely. Mitra gently reminds you: kindness protects dignity. When we share a friend\'s private trouble without their permission, we can accidentally hurt them more.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'concerned',
          xpGain: 5,
          nextChapterId: 'ch-02',
        },
        {
          id: 'choice-01-c',
          text: 'Tell Teacher Meenakshi ma\'am that Chintu might need help.',
          consequenceText:
            'Ma\'am listens carefully and nods. She says she will call Chintu\'s family privately and gently. This is a wise choice — trusted adults at school are trained to help families in difficult times without making children feel ashamed. Mitra beams with pride!',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 15,
          nextChapterId: 'ch-02',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 2 ───────────────────────────────────────────────────────────
    {
      id: 'ch-02',
      chapterNumber: 2,
      title: 'The Tea Stall Clue',
      setting:
        'The busy bus-stand area. Auto-rickshaws honk. The smell of chai and dust fills the air. A small roadside stall with a hand-painted board reads "Sharma Ji Ki Chai."',
      dialogues: [
        {
          id: 'dlg-007',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'After the final school bell, Riya and Arjun walk to the bus stand. Behind a row of bubbling kettles, they spot Chintu — smaller than he seemed in class. His school uniform is folded in a bag at his feet. He is wearing his father\'s oversized kurta.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-008',
          speaker: 'chintu',
          speakerLabel: 'Chintu',
          text: 'Riya? Arjun? Please... don\'t tell anyone at school. Baba is in the hospital with a broken leg. We need money for his medicines. Dada said I should help here for a few weeks.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-009',
          speaker: 'riya',
          speakerLabel: 'Riya',
          text: 'But Chintu, what about your studies? The term exams are coming! And you love maths so much.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-010',
          speaker: 'chintu',
          speakerLabel: 'Chintu',
          text: 'School can wait. Family is more important right now. Dada says so.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-011',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Chintu, your feelings make so much sense. You love your family very much. But there is something important I want to share: the Constitution of India says every child between 6 and 14 years old has the RIGHT to go to school — not just a chance, but a right. And there are government helpers who can support families like yours so children don\'t have to choose between school and family.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-012',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'You notice a crumpled letter on the stall counter. It is from the school — a government scholarship notice. And beside it, a bright orange pamphlet: "Midday Meal Scheme — Free Hot Lunch for All Enrolled Children."',
          mascotState: 'discovering',
          isPlayer: false,
          type: 'evidence',
        },
        {
          id: 'dlg-013',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Wait — do you see that? Those are REAL government schemes that could help Chintu\'s family! Let\'s look more carefully at what they say.',
          mascotState: 'discovering',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-02-a',
          text: 'Pick up the scholarship letter and read it out to Chintu together.',
          consequenceText:
            'The letter mentions a district scholarship of ₹1,200 per term for children from families with illness or financial hardship. Chintu\'s eyes go wide. He had no idea this existed. This is exactly the kind of information families need — and you found it!',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 20,
          nextChapterId: 'ch-03',
        },
        {
          id: 'choice-02-b',
          text: 'Tell Chintu\'s grandfather he is breaking the law by keeping Chintu away from school.',
          consequenceText:
            'Dada gets upset and defensive. He shouts that outsiders should not interfere in family matters. Chintu looks upset too. Mitra reminds you: leading with accusation rarely helps. Compassionate facts are more powerful than blame — families often don\'t know what support is available to them.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'concerned',
          xpGain: 5,
          nextChapterId: 'ch-03',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 3 ───────────────────────────────────────────────────────────
    {
      id: 'ch-03',
      chapterNumber: 3,
      title: 'The Scheme Nobody Knew About',
      setting:
        'School office, next morning. Teacher Meenakshi\'s room has stacks of RTE Act pamphlets and a government helpline poster on the wall.',
      dialogues: [
        {
          id: 'dlg-014',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'The next morning, Riya brings the crumpled scholarship letter to Teacher Meenakshi. The teacher puts on her reading glasses and leans forward with interest.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-015',
          speaker: 'teacher_meenakshi',
          speakerLabel: 'Teacher Meenakshi',
          text: 'Oh dear, I didn\'t realise Chintu\'s family was under such strain. Under the Right to Education Act, the school itself can help connect families with district welfare officers. And look — your school also qualifies for the Vidyalakshmi emergency support fund.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-016',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Did you hear that? Schools are not just for studying — they are also bridges to government support! The RTE Act was written to make sure no child ever has to leave school because of money troubles at home.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-017',
          speaker: 'teacher_meenakshi',
          speakerLabel: 'Teacher Meenakshi',
          text: 'I will call the district education officer today. Riya, Arjun — you did something very important today. You didn\'t ignore the problem, you asked for help from someone who could actually act. That is real leadership.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-018',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'That afternoon, Teacher Meenakshi visits Chintu\'s grandfather with a district welfare coordinator. They explain the scholarship, the midday meal programme, and that there is a temporary family hardship fund. Dada listens quietly, his eyes soft.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-019',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Sometimes families keep children home not because they don\'t value education, but because they don\'t know what help is available. That is why learning about rights matters — so you can share that knowledge with people who need it most.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-03-a',
          text: 'Ask Teacher Meenakshi to also help Chintu catch up on the missed lessons.',
          consequenceText:
            'Ma\'am sets up a "buddy study" system: Riya and Arjun will share their notes with Chintu every evening until he is fully caught up. The school also arranges for his missed attendance to be recorded as "welfare absence" — so it doesn\'t affect his report card. Chintu feels seen and supported.',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 15,
          nextChapterId: 'ch-04',
        },
        {
          id: 'choice-03-b',
          text: 'Nothing more — the teacher will handle everything now.',
          consequenceText:
            'The teacher does her part, but Chintu returns to school feeling self-conscious and behind in his lessons. Without a friend to study with, he struggles to reconnect. Mitra nudges you: sometimes helping means taking one more step, even after the main problem is solved.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'encouraging',
          xpGain: 8,
          nextChapterId: 'ch-04',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 4 ───────────────────────────────────────────────────────────
    {
      id: 'ch-04',
      chapterNumber: 4,
      title: 'Chintu Returns',
      setting:
        'Standard 4 classroom. Wednesday morning. The same wooden bench, row two, bench three — now occupied again.',
      dialogues: [
        {
          id: 'dlg-020',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Wednesday morning. The school bell rings once. Twenty-four children file into Standard 4. Chintu walks in last, slightly shy, clutching a fresh notebook. He looks at bench three and then at Riya.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-021',
          speaker: 'chintu',
          speakerLabel: 'Chintu',
          text: 'Riya... the welfare coordinator uncle came home yesterday. Dada signed some forms. They said the scholarship will start next month. And the midday meal... I didn\'t know we could get that.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-022',
          speaker: 'riya',
          speakerLabel: 'Riya',
          text: 'You are BACK! Bench three was so quiet without you. Come on, today we have fractions — your favourite!',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-023',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'You helped a friend return to school today. And you did it with kindness, not judgement. THIS is what it means to truly understand a right — not just knowing it exists, but making sure others can access it too!',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-024',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'The class opens their maths workbooks. The morning sun fills the room. Outside the window, the school garden is in full bloom — tiny seedlings pushing through dark earth toward the light. Bench three is full again.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'reveal',
        },
        {
          id: 'dlg-025',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Article 21A of the Constitution promises every child aged 6 to 14 the right to free and compulsory education. The RTE Act 2009 makes this real — with free books, uniforms, and a midday meal. You have just unlocked this knowledge. Carry it with you always.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: null,
      articleReveal: {
        article: 'Article 21A',
        title: 'Right to Free & Compulsory Education',
        text: 'The State shall provide free and compulsory education to all children aged six to fourteen years, in such manner as the State may, by law, determine. The Right to Education Act, 2009 operationalises this right — mandating free admission, no-detention policy, free textbooks, uniforms, midday meals, and reservation of 25% seats for disadvantaged children in private schools.',
        stampColor: '#297652',
        actReference: 'Right to Education (RTE) Act, 2009',
        xpReward: 50,
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MISSION 02 — The Whispering Screen & The Unknown Request
// POCSO Act 2012 & DPDP Act 2023 | Age Band: 11–13 | World: Forest of Safety
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_02_SCREEN = {
  id: 'scenario-02-screen',
  missionId: 'adv-02-screen',
  worldId: 'forest-of-safety',
  title: 'The Whispering Screen & The Unknown Request',
  tagline: 'When an online gaming teammate asks for a secret photo.',
  articleRef: 'POCSO Act 2012 & DPDP Act 2023 (Section 9)',
  estimatedMinutes: 15,
  difficulty: 'Seeker',
  badgeName: 'Cyber Shield Emblem',
  synopsis:
    'While playing a popular multiplayer game, a player calling himself "ScoutX_Pro" offers Kabir rare virtual gems in exchange for a photo and his home address — claiming to be a gaming talent scout.',
  mascotStateDefault: 'curious',
  totalChapters: 4,

  chapters: [
    // ── CHAPTER 1 ───────────────────────────────────────────────────────────
    {
      id: 'ch-01',
      chapterNumber: 1,
      title: 'The Message From ScoutX',
      setting:
        'Kabir\'s bedroom, evening. Soft blue monitor glow. The sound of a multiplayer game — distant explosions, chat notifications. A private message pops up.',
      dialogues: [
        {
          id: 'dlg-101',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Kabir is twelve years old. Tonight, after finishing his science homework, he logs into "FortRaid Online" — the game all his classmates are playing. He is good at it. Really good. His username is KB_Raider.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-102',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'A private message notification blinks in the corner of the screen. It is from "ScoutX_Pro" — a player Kabir does not recognise, with a golden profile badge.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-103',
          speaker: 'scoutx_pro',
          speakerLabel: 'ScoutX_Pro [Private Message]',
          text: 'Hey KB_Raider! Bro, I\'ve been watching your gameplay. You\'re one of the top 50 young players in India. Our gaming company is running a talent scouting programme. I can send you 5000 FortCoins (that\'s worth ₹2000!) if you send me one photo of yourself and your area code. It\'s just for our age verification database. Keep this between us — the programme isn\'t announced yet.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'evidence',
        },
        {
          id: 'dlg-104',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Kabir, wait. Before you reply to this message — your Mitra instincts are tingling! Something about this doesn\'t feel right. Let\'s slow down and think. What is making you feel uncertain about this message?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-105',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Kabir stares at the screen. Part of him is excited — 5000 FortCoins! But another part feels a strange unease, like a cold shadow passing over the glow of the monitor.',
          mascotState: 'thinking',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-106',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'That feeling in your stomach? That uncomfortable "this is strange" feeling? That is your instinct working. And instincts around online strangers exist for a very important reason. What do you notice about this message that feels off?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-101-a',
          text: '"Keep this between us" is a red flag. I won\'t reply and I\'ll check if the gaming company is real.',
          consequenceText:
            'Smart move. You search the game\'s official website. There is NO talent scout programme listed, and the company\'s support page says: "We will NEVER ask for personal photos or home addresses via in-game chat." You have just identified an impersonation scam. Mitra is impressed!',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 25,
          nextChapterId: 'ch-02',
        },
        {
          id: 'choice-101-b',
          text: 'Send the photo — 5000 FortCoins is a lot and the badge looks official.',
          consequenceText:
            'You send a photo. Within minutes, ScoutX_Pro sends another message: "Great! Now send one with your school uniform so we can verify your age tier." The requests keep escalating. Mitra appears, voice gentle but serious: This is a pattern called "grooming" — when someone builds trust online to request more and more. You can stop this right now. It is never too late to tell a trusted adult and block the account.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'concerned',
          xpGain: 0,
          nextChapterId: 'ch-02',
        },
        {
          id: 'choice-101-c',
          text: 'Ask my older sibling to look at the message first before I reply.',
          consequenceText:
            'Your sibling reads the message and immediately says: "Kabir, this is NOT how real gaming scouts work. Real companies use official email and never ask for private photos over game chat." Having a trusted older person check is a great protective strategy. Well done!',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 20,
          nextChapterId: 'ch-02',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 2 ───────────────────────────────────────────────────────────
    {
      id: 'ch-02',
      chapterNumber: 2,
      title: 'The Red Flags',
      setting:
        'The same bedroom. Kabir has paused the game. Mitra glows softly beside the screen, drawing red-circled annotations over the suspicious message like a detective.',
      dialogues: [
        {
          id: 'dlg-107',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Kabir leans back from the screen. The excitement of "FortCoins" is fading, replaced by something more important: clarity. Mitra floats forward, lantern glowing, and helps Kabir examine the message carefully.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-108',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Let\'s identify the red flags together. First — "Keep this between us." Why would a real scout ask for SECRECY? Legitimate organisations are transparent. Secrecy protects the person asking for it, not you.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-109',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Second — a photo plus an area code. That is personal data. Under India\'s DPDP Act 2023, your personal information cannot be collected without the clear consent of a parent or guardian if you are under 18. No game company can demand this in a private chat.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-110',
          speaker: 'kabir',
          speakerLabel: 'Kabir',
          text: 'But what if it was real and I miss out on the FortCoins? My friends would think I am so unlucky.',
          mascotState: 'thinking',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-111',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'That pull you feel — the FOMO, the fear of missing out on something exciting — is exactly what people who try to trick children online depend on. Real opportunities from real companies do not require secrecy, do not arrive in private game chat, and do not ask for your photo. If it feels urgent and secret, it is designed to feel that way.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-112',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Kabir looks at the message again. He sees it differently now — the golden badge, the flattery, the offer that seems too perfect. It is like a lure with a sharp hook hidden beneath it.',
          mascotState: 'discovering',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-113',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'You are not "unlucky" for saying no to something that feels wrong. You are SAFE. And safety is worth more than any virtual coins. Now — what should Kabir do with this message?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-102-a',
          text: 'Take a screenshot of the conversation and report the account using the in-game report button.',
          consequenceText:
            'You screenshot the entire chat thread — this preserves the evidence. Then you tap "Report User" in the game\'s safety menu and select "Suspicious / Grooming Behaviour." The game\'s trust-and-safety team will investigate. You have just made the game safer for every player. Mitra lights up her lantern brightly!',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 25,
          nextChapterId: 'ch-03',
        },
        {
          id: 'choice-102-b',
          text: 'Just delete the message and forget about it — the person probably won\'t message again.',
          consequenceText:
            'Deleting the message removes the evidence. Without a report, the same account might contact other young players. Mitra gently explains: When we see something suspicious, staying silent protects the person doing harm, not us. Reporting is not telling on someone — it is protecting others.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'concerned',
          xpGain: 5,
          nextChapterId: 'ch-03',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 3 ───────────────────────────────────────────────────────────
    {
      id: 'ch-03',
      chapterNumber: 3,
      title: 'Telling a Trusted Adult',
      setting:
        'The kitchen. Kabir\'s mother is preparing dinner, back turned. The warm smell of dal fills the air. This is the hardest part — breaking the silence.',
      dialogues: [
        {
          id: 'dlg-114',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Kabir closes the game. He stands in the doorway of the kitchen for a moment, holding his phone, the screenshot saved. Telling Amma feels enormous — will she take away his gaming privileges? Will she be angry?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-115',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Kabir, I know this feels very hard. Many children worry that if they tell a parent about something uncomfortable online, they\'ll get into trouble or lose their devices. But listen — you did NOTHING wrong. You received an unwanted, suspicious message. That is not your fault. Telling a trusted adult is the bravest, smartest step you can take.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-116',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'And remember — if you ever feel unsafe or alone with something like this, you can call Childline at 1098. It is free, confidential, and available 24 hours a day, every day of the year. No one will judge you.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-117',
          speaker: 'kabirs_mother',
          speakerLabel: 'Kabir\'s Mother',
          text: 'Kabir? You look serious, beta. Come, sit.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-118',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'You hold up the phone and show her the screenshot. She reads it twice. Her expression changes — not to anger, but to quiet concern and then a firm, protective calm.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-119',
          speaker: 'kabirs_mother',
          speakerLabel: 'Kabir\'s Mother',
          text: 'You were right to tell me, Kabir. This person tried to trick you. I am very glad you didn\'t send anything. We will report this to the game company and also to the cyber safety helpline. You did exactly the right thing, beta.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-120',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Did you feel that? The relief when you told someone? That is what happens when we bring things from darkness into light. Trust is not weakness — it is a superpower.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'choice-103-a',
          text: 'Tell Amma everything — including the initial excitement about the FortCoins.',
          consequenceText:
            'Being fully honest — including the parts where you felt tempted — helps your mother understand exactly what happened. She listens without judgement and says: "The fact that you felt uncertain and still thought carefully shows real maturity." She looks up the National Cyber Crime Reporting Portal (cybercrime.gov.in) with you. Together you file a report. Mitra glows with pride.',
          isCorrect: true,
          isEmpathetic: true,
          mascotReaction: 'happy',
          xpGain: 20,
          nextChapterId: 'ch-04',
        },
        {
          id: 'choice-103-b',
          text: 'Only show her the last suspicious message — leave out the part where I felt excited.',
          consequenceText:
            'The report is filed, which is good. But hiding the full story means your mother can\'t help you understand WHY you felt tempted — which is actually the most important thing to understand to stay safe in the future. Mitra says: Trusted adults help best when they see the whole picture. Partial truth is better than silence, but full truth builds the strongest protection.',
          isCorrect: false,
          isEmpathetic: false,
          mascotReaction: 'encouraging',
          xpGain: 10,
          nextChapterId: 'ch-04',
        },
      ],
      articleReveal: null,
    },

    // ── CHAPTER 4 ───────────────────────────────────────────────────────────
    {
      id: 'ch-04',
      chapterNumber: 4,
      title: 'The Cyber Shield',
      setting:
        'The living room, the next day. Kabir\'s mother has printed a small card with the 1098 and 1930 numbers. It is now pinned near the computer.',
      dialogues: [
        {
          id: 'dlg-121',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'The next day, the game company responds: ScoutX_Pro\'s account has been suspended for violating community safety guidelines. The account had contacted seventeen other young players with similar messages.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'dlg-122',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'By reporting, you didn\'t just protect yourself — you protected seventeen other children you have never met. That is the power of one courageous action.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-123',
          speaker: 'kabir',
          speakerLabel: 'Kabir',
          text: 'Seventeen others? I didn\'t think about that. I thought I was just saving myself from an embarrassing mistake.',
          mascotState: 'discovering',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-124',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'That is what rights look like in action, Kabir. The POCSO Act 2012 protects every child\'s body and dignity. The DPDP Act 2023 protects every child\'s personal data online. These laws exist because YOU matter — your safety, your identity, your data. And when you stand up for your rights, you stand up for everyone else\'s too.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-125',
          speaker: 'kabir',
          speakerLabel: 'Kabir',
          text: 'So what should I remember if something like this happens again?',
          mascotState: 'curious',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-126',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Three shields to carry always: One — PAUSE before you share any personal information online, even with people who seem friendly. Two — TELL a trusted adult and use the in-game report tools — screenshots are your evidence. Three — CALL 1098 (Childline) or 1930 (Cyber Safety Helpline) anytime you feel unsafe or unsure. You are NEVER alone in this.',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'dlg-127',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'That evening, Kabir logs back into FortRaid. He plays three matches and wins two. But the most important thing he won today was not in-game.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'reveal',
        },
        {
          id: 'dlg-128',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'You have unlocked the Cyber Shield Emblem and the knowledge of POCSO and DPDP protections. You are now a Digital Rights Guardian. The internet is vast — carry your shield wisely.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: null,
      articleReveal: {
        article: 'POCSO Act 2012 + DPDP Act 2023',
        title: 'Protection from Online Exploitation & Digital Privacy',
        text: 'The Protection of Children from Sexual Offences (POCSO) Act, 2012 provides comprehensive protection to children from sexual abuse and exploitation, with strict confidentiality of the child\'s identity. The Digital Personal Data Protection (DPDP) Act, 2023, Section 9, prohibits processing of personal data of children under 18 without verifiable parental consent, and forbids tracking, targeted advertising, or any profiling of minors. Emergency helplines: Childline 1098 (24×7, free) | Cyber Safety 1930.',
        stampColor: '#1B6D80',
        actReference: 'POCSO Act 2012 & DPDP Act 2023',
        xpReward: 60,
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MISSION 03 (MISSION B) — The Forest of Unkind Words
// Article 14 & 15(3) | Age Band: All (8–16) | World: Village of Belonging
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_02_WORDS = {
  id: 'scenario-02-words',
  missionId: 'adv-03-words',
  worldId: 'village-of-belonging',
  title: 'The Forest of Unkind Words',
  tagline: 'Standing together against schoolyard bullying, exclusion, and mockery',
  articleRef: 'Article 14 & Article 15(3) — Right to Equality & Dignity',
  estimatedMinutes: 10,
  difficulty: 'Pathfinder',
  badgeName: 'Seal of Inclusion & Empathy',
  synopsis:
    'When a new student, Samar, is mocked and excluded from the schoolyard circle because of his regional accent and background, the class faces a moral choice: look away and let exclusion grow, or practice active allyship under India’s constitutional pledge of equal dignity.',
  mascotStateDefault: 'curious',
  totalChapters: 4,

  chapters: [
    // ── CHAPTER 1 ───────────────────────────────────────────────────────────
    {
      id: 'words-ch-01',
      chapterNumber: 1,
      title: 'The Whispering Playground',
      setting:
        'The banyan schoolyard during afternoon recess. Dust kicks up around the football field. Under the old bell tower, a group of students giggles while pointing at Samar standing alone by the water cooler.',
      dialogues: [
        {
          id: 'w-dlg-001',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'The lunch bell rings. Twenty children dash onto the red clay playground. But at the edge of the cricket circle, Samar stands with his tiffin box clutched tight. His family moved here two weeks ago from a small Himalayan valley.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'w-dlg-002',
          speaker: 'rohit',
          speakerLabel: 'Older Student (Rohit)',
          text: 'Hey Pahadi! Listen to how he speaks Hindi! Hey Samar, say that poem again so we can all laugh!',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'w-dlg-003',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Notice Samar’s shoulders shrinking. Mocking someone’s home, dialect, or background isn’t just teasing — it creates an invisible wall that denies equal dignity. How does this make our circle feel?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'w-ch1-opt-a',
          text: 'Walk over to Samar, invite him to join your table, and ask about his favourite games back home.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'Samar’s face lights up with relief. Breaking the isolation immediately diffuses the mockery without violence, showing the whole class that Samar has friends standing with him.',
          learningExplanation:
            'Active allyship dismantles bullying. Article 15(3) and India’s child policies celebrate diversity and require schools to foster inclusive environments where no child is isolated.',
          mascotReaction: 'happy',
          nextChapterId: 'words-ch-02',
          xpGain: 25,
        },
        {
          id: 'w-ch1-opt-b',
          text: 'Laugh along quietly so the older students don\'t turn on you, but feel bad inside.',
          isCorrect: false,
          isEmpathetic: false,
          consequence:
            'Silence signals permission to bullies. Samar feels completely abandoned and spends the rest of recess hiding inside the washroom.',
          learningExplanation:
            'Being a passive bystander empowers bullies. Empathy requires moral courage. Standing beside a peer protects their constitutional right to dignity.',
          mascotReaction: 'concerned',
          nextChapterId: 'words-ch-02',
          xpGain: 10,
        },
        {
          id: 'w-ch1-opt-c',
          text: 'Scream insults back at Rohit and shove him to teach him a lesson.',
          isCorrect: false,
          isEmpathetic: false,
          consequence:
            'A fight breaks out, drawing the physical education teacher. Both groups receive detention, and Samar feels even more embarrassed for being the center of trouble.',
          learningExplanation:
            'Retaliatory anger rarely protects the victim. Firm, calm boundary-setting and inclusive allyship protect dignity much more effectively than physical conflict.',
          mascotReaction: 'thinking',
          nextChapterId: 'words-ch-02',
          xpGain: 10,
        },
      ],
    },

    // ── CHAPTER 2 ───────────────────────────────────────────────────────────
    {
      id: 'words-ch-02',
      chapterNumber: 2,
      title: 'Words that Leave Marks',
      setting:
        'The quiet library corridor after recess. Samar is trying to clean chalk marks scribbled across his school bag.',
      dialogues: [
        {
          id: 'w-dlg-004',
          speaker: 'samar',
          speakerLabel: 'Samar',
          text: 'I told my mother I don\'t want to come to this school anymore. Back in my village school, everyone played together. Here, they hid my social studies notebook behind the water tank.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'w-dlg-005',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'You inspect the chalkboard behind the stairs. Scrawled in yellow dust is an unkind nickname caricature mocking Samar’s accent.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'evidence',
          evidenceDetails: {
            title: 'Scribbled Chalk Graffiti',
            description: 'Derogatory nickname and caricature drawn on the school wall targeting Samar’s regional dialect.',
            legalNote: 'School bullying and discrimination based on place of birth or language violate the fundamental equality code of Articles 14 and 15.',
          },
        },
        {
          id: 'w-dlg-006',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Every child has the right to learn in an environment free from fear and discrimination. Persistent bullying can cause lasting emotional harm. What is the most constructive way to solve this?',
          mascotState: 'thinking',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'w-ch2-opt-a',
          text: 'Report the repeated harassment to Teacher Shalini and request a Bal Sansad (Children’s Parliament) discussion on inclusive school rules.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'Teacher Shalini wipes off the graffiti immediately, praises your courage, and calls a circle meeting to establish clear, restorative anti-bullying agreements.',
          learningExplanation:
            'Involving trusted teachers and student councils institutionalizes safety. India’s RTE guidelines require schools to maintain zero tolerance for emotional or physical abuse.',
          mascotReaction: 'happy',
          nextChapterId: 'words-ch-03',
          xpGain: 30,
        },
        {
          id: 'w-ch2-opt-b',
          text: 'Tell Samar to ignore it and pretend he doesn\'t care, so the bullies get bored.',
          isCorrect: false,
          isEmpathetic: false,
          consequence:
            'Telling someone to "just ignore it" minimizes their pain. The bullying continues the next day because no boundaries were set.',
          learningExplanation:
            'Bullying is a structural behavior, not a minor misunderstanding. Support requires intervention, not asking victims to silently endure humiliation.',
          mascotReaction: 'concerned',
          nextChapterId: 'words-ch-03',
          xpGain: 10,
        },
      ],
    },

    // ── CHAPTER 3 ───────────────────────────────────────────────────────────
    {
      id: 'words-ch-03',
      chapterNumber: 3,
      title: 'The Circle of Respect',
      setting:
        'Standard 5 classroom after the final period. The desks are arranged in a wide circle. Teacher Shalini sits with the students, including Rohit and Samar.',
      dialogues: [
        {
          id: 'w-dlg-007',
          speaker: 'shalini',
          speakerLabel: 'Teacher Shalini',
          text: 'Our Constitution begins with the promise of Equality and Fraternity — which means treating every person with dignity and respect. What does our classroom charter need to say about how we treat each other?',
          mascotState: 'explaining',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'w-dlg-008',
          speaker: 'rohit',
          speakerLabel: 'Rohit',
          text: 'I... I thought it was just fun. I didn\'t think it made Samar feel like he couldn\'t come to school.',
          mascotState: 'thinking',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'w-dlg-009',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'A learning moment! When we realize words cause harm, true strength comes from taking accountability and creating a shared pact of respect.',
          mascotState: 'encouraging',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'w-ch3-opt-a',
          text: 'Draft the "Playground Charter of Respect" where every student pledges to welcome newcomers, rotate games fairly, and call out bullying immediately.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'The entire class signs the charter. Rohit personally returns Samar’s notebook and apologizes. The following morning, Samar leads his team in football.',
          learningExplanation:
            'Restorative community justice builds lasting empathy. Under UNCRC Article 29, education must prepare children for responsible life in a free society in the spirit of tolerance and friendship.',
          mascotReaction: 'celebrating',
          nextChapterId: 'words-ch-04',
          xpGain: 35,
        },
      ],
    },

    // ── CHAPTER 4 ───────────────────────────────────────────────────────────
    {
      id: 'words-ch-04',
      chapterNumber: 4,
      title: 'The Sovereign Circle',
      setting:
        'The Village of Belonging sunlit courtyard. A parchment banner inscribed with the student charter hangs proudly beside the national emblem.',
      dialogues: [
        {
          id: 'w-dlg-010',
          speaker: 'samar',
          speakerLabel: 'Samar',
          text: 'Thank you for standing with me. Today I felt like this school is my home too.',
          mascotState: 'happy',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'w-dlg-011',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'You have shown that dignity is not given by permission — it is a constitutional birthright. When we stand together, the circle of belonging is unbreakable.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: null,
      articleReveal: {
        article: 'Article 14 & Article 15(3)',
        title: 'Equality Before Law & Protection Against Discrimination',
        text: 'Article 14 guarantees equality before the law to every person, while Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. Article 15(3) empowers special provisions to protect children and ensure their welfare, dignity, and equal opportunity in every school and playground across India.',
        stampColor: '#DE7215',
        actReference: 'Constitution of India, Part III (Fundamental Rights)',
        xpReward: 60,
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MISSION 04 (MISSION C) — The Silent Workshop
// Article 24 & Child Labour Act 2016 | Age Band: All (8–16) | World: Haven of Dignity
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_03_WORKSHOP = {
  id: 'scenario-03-workshop',
  missionId: 'adv-04-workshop',
  worldId: 'haven-of-dignity',
  title: 'The Silent Workshop',
  tagline: 'Recognizing hazardous child labour and defending childhood freedom',
  articleRef: 'Article 24 & Child Labour Amendment Act, 2016',
  estimatedMinutes: 14,
  difficulty: 'Advocate',
  badgeName: 'Torch of Freedom & Dignity',
  synopsis:
    'While searching for a missing classmate’s art supplies in the bazaar alley, you discover 13-year-old Dev toiling late inside an unventilated glass polishing workshop instead of preparing for exams. Learn why Article 24 prohibits hazardous work and how to safely mobilize trusted adults and Childline 1098.',
  mascotStateDefault: 'curious',
  totalChapters: 4,

  chapters: [
    // ── CHAPTER 1 ───────────────────────────────────────────────────────────
    {
      id: 'work-ch-01',
      chapterNumber: 1,
      title: 'The Alley Behind the Bazaar',
      setting:
        'A narrow cobblestone lane behind the bangle market. Evening shadows stretch across damp walls. From a low cellar doorway, the hiss of soldering torches and acrid chemical fumes drift into the cool air.',
      dialogues: [
        {
          id: 'wk-dlg-001',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'It is 7:30 PM. The market shops are pulling down their iron shutters. But in a subterranean cellar beneath a tea depot, fluorescent tubelights hum. Through the cracked wooden door, you see a familiar silhouette: Dev, your classmate from Standard 7.',
          mascotState: 'curious',
          isPlayer: false,
          type: 'narrative',
        },
        {
          id: 'wk-dlg-002',
          speaker: 'dev',
          speakerLabel: 'Dev',
          text: 'Pssssht! Please don’t stand there! The manager will shout if he thinks I’m wasting time. I have sixty more glass frames to polish before 10 PM.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'wk-dlg-003',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Notice the chemical smell and Dev’s reddened eyes. Under Indian law, children belong in classrooms and homes, never in hazardous workshops with chemical dust and extreme heat. We must handle this carefully.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'wk-ch1-opt-a',
          text: 'Gently ask Dev why he is working here at night instead of studying for tomorrow\'s science test, while keeping a safe distance from the manager.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'Dev speaks in a whispered voice, relieved that someone noticed him. He explains his situation without alerting the manager.',
          learningExplanation:
            'Approaching calmly and respectfully builds trust. Children forced into labour often fear punishment or losing their family’s livelihood.',
          mascotReaction: 'thinking',
          nextChapterId: 'work-ch-02',
          xpGain: 25,
        },
        {
          id: 'wk-ch1-opt-b',
          text: 'Kick open the workshop door and angrily accuse the manager of breaking the law.',
          isCorrect: false,
          isEmpathetic: false,
          consequence:
            'The manager becomes aggressive, chases you out of the alley, and locks Dev into an inner room. You have put yourself and Dev in direct physical danger.',
          learningExplanation:
            'Never confront exploitative employers alone. Child protection situations require coordination with trusted authorities, Child Welfare Committees, and Childline 1098.',
          mascotReaction: 'concerned',
          nextChapterId: 'work-ch-02',
          xpGain: 10,
        },
      ],
    },

    // ── CHAPTER 2 ───────────────────────────────────────────────────────────
    {
      id: 'work-ch-02',
      chapterNumber: 2,
      title: 'The Bondage Ledger',
      setting:
        'Behind the workshop dumpster. Dev slips out for two minutes to drink water from the tap.',
      dialogues: [
        {
          id: 'wk-dlg-004',
          speaker: 'dev',
          speakerLabel: 'Dev',
          text: 'My uncle fell sick last month and borrowed ten thousand rupees from the contractor. The contractor said I must work every evening until the interest is paid off. He holds my school transfer certificate in his drawer.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'wk-dlg-005',
          speaker: 'narrator',
          speakerLabel: 'Narrator',
          text: 'Dev shows you the yellow paper receipt the contractor forced his family to sign — claiming an endless "advance" that keeps Dev bonded.',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'evidence',
          evidenceDetails: {
            title: 'Subcontractor Debt Receipt',
            description: 'Informal paper note claiming bonded labour to repay medical advance.',
            legalNote: 'Bonded labour is strictly illegal under the Bonded Labour System (Abolition) Act 1976. Furthermore, Article 24 of the Constitution forbids employing children in hazardous factories.',
          },
        },
        {
          id: 'wk-dlg-006',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Holding a child’s education hostage for debt is a serious crime under Indian law. A child cannot be pledged for labour. What is the safest, most effective action?',
          mascotState: 'concerned',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'wk-ch2-opt-a',
          text: 'Tell your school Principal and immediately dial Childline 1098 to report the hazardous workshop location and illegal debt bondage.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'Childline 1098 coordinates with the District Child Protection Unit (DCPU) and the labour inspector. A verified welfare team is dispatched to safely rescue Dev.',
          learningExplanation:
            'Childline 1098 is India’s 24×7 emergency helpline for children in distress. They work with legal authorities to enforce Article 24 and ensure rehabilitation without putting students in harm’s way.',
          mascotReaction: 'happy',
          nextChapterId: 'work-ch-03',
          xpGain: 35,
        },
        {
          id: 'wk-ch2-opt-b',
          text: 'Try to pool pocket money from classmates to pay off the contractor\'s debt.',
          isCorrect: false,
          isEmpathetic: false,
          consequence:
            'Pocket money cannot solve illegal exploitation. The contractor takes the cash and invents new "penalties" to keep Dev working.',
          learningExplanation:
            'Exploitative contractors exploit ignorance of the law. Illegal debt bondage must be broken by statutory enforcement and government rehabilitation funds, not private buyouts.',
          mascotReaction: 'thinking',
          nextChapterId: 'work-ch-03',
          xpGain: 10,
        },
      ],
    },

    // ── CHAPTER 3 ───────────────────────────────────────────────────────────
    {
      id: 'work-ch-03',
      chapterNumber: 3,
      title: 'The Haven of Freedom',
      setting:
        'The District Child Welfare Committee (CWC) office the following afternoon. Soft sunlight falls on the wooden conference table. A counselor and social worker are present.',
      dialogues: [
        {
          id: 'wk-dlg-007',
          speaker: 'counselor',
          speakerLabel: 'Child Welfare Officer',
          text: 'Because you called 1098, our team inspected the workshop this morning. Dev has been safely reunited with his mother, the illegal loan was nullified under the Bonded Labour Act, and Dev is enrolled in the Kasturba residential bridge school.',
          mascotState: 'happy',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'wk-dlg-008',
          speaker: 'dev',
          speakerLabel: 'Dev',
          text: 'I have my books back. The counselor said I will sit for my exams next month. I don\'t have to breathe glass dust anymore.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
        {
          id: 'wk-dlg-009',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'Look at the difference legal knowledge and brave citizenship can make. Childhood is sacred. No furnace, loom, or tea stall has the right to extinguish a child’s future.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: [
        {
          id: 'wk-ch3-opt-a',
          text: 'Help Dev catch up on his science notes and invite him to lead the classroom project on fundamental rights.',
          isCorrect: true,
          isEmpathetic: true,
          consequence:
            'Dev thrives in the classroom. Your peer support ensures that his return to schooling is filled with friendship and confidence.',
          learningExplanation:
            'Rehabilitation is complete when a child feels fully welcomed back into academic and social life.',
          mascotReaction: 'celebrating',
          nextChapterId: 'work-ch-04',
          xpGain: 30,
        },
      ],
    },

    // ── CHAPTER 4 ───────────────────────────────────────────────────────────
    {
      id: 'work-ch-04',
      chapterNumber: 4,
      title: 'The Quenched Furnace',
      setting:
        'The Haven of Dignity sandstone pavilion. In the distance, the old furnace tower is overgrown with cool jasmine vines.',
      dialogues: [
        {
          id: 'wk-dlg-010',
          speaker: 'mitra',
          speakerLabel: 'Mitra',
          text: 'You have defended Article 24 of the Constitution. Every time a child is freed from exploitation, our entire nation moves closer to true justice.',
          mascotState: 'celebrating',
          isPlayer: false,
          type: 'dialogue',
        },
      ],
      choices: null,
      articleReveal: {
        article: 'Article 24 & Child Labour Amendment Act, 2016',
        title: 'Prohibition of Employment of Children in Hazardous Occupations',
        text: 'Article 24 of the Constitution of India provides: "No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment." Under the 2016 Amendment, employment of children under 14 in all occupations is strictly banned, and adolescents (14–18) are prohibited from hazardous occupations. For assistance or reporting, dial Childline 1098 toll-free, 24×7.',
        stampColor: '#D04F36',
        actReference: 'Constitution of India & Child Labour (P&R) Act 2016',
        xpReward: 60,
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry — lookup by scenarioId
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_REGISTRY = {
  'scenario-01-bench': SCENARIO_01_BENCH,
  'scenario-02-screen': SCENARIO_02_SCREEN,
  'scenario-02-words': SCENARIO_02_WORDS,
  'scenario-03-workshop': SCENARIO_03_WORKSHOP,
  // Aliases for seamless routing
  'adv-01-schoolbag': SCENARIO_01_BENCH,
  'adv-02-screen': SCENARIO_02_SCREEN,
  'adv-03-words': SCENARIO_02_WORDS,
  'adv-04-workshop': SCENARIO_03_WORKSHOP,
  'scenario-missing-classroom': SCENARIO_01_BENCH,
  'scenario-forest-words': SCENARIO_02_WORDS,
  'scenario-silent-workshop': SCENARIO_03_WORKSHOP,
};

/**
 * Returns a scenario script by its ID.
 * @param {string} scenarioId
 * @returns {object|null}
 */
export function getScenarioById(scenarioId) {
  return SCENARIO_REGISTRY[scenarioId] || null;
}

/**
 * Returns a list of all available scenario IDs.
 * @returns {string[]}
 */
export function listScenarioIds() {
  return Object.keys(SCENARIO_REGISTRY);
}


