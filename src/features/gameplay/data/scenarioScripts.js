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
// Registry — lookup by scenarioId
// ─────────────────────────────────────────────────────────────────────────────
export const SCENARIO_REGISTRY = {
  'scenario-01-bench': SCENARIO_01_BENCH,
  'scenario-02-screen': SCENARIO_02_SCREEN,
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

