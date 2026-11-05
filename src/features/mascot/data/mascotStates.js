/**
 * Mitra the Guardian Companion — Mascot Identity & State Machine
 * 
 * DESIGN PRINCIPLES (Creative OS 44_AGENCYLIKE_UI & Child Psychology):
 * - Mitra is a mythical Indian Sun-Fox / Lantern Companion.
 * - Warm terracotta and saffron fur, luminous cream chest, expressive ears, and a glowing lantern tail that lights up dark paths.
 * - Friendly, supportive, emotionally attuned, non-authoritative.
 * - Supports ages 8–16 without condescension.
 * - CRITICAL SAFEGUARD: During sensitive safety stories (abuse, exploitation, distress),
 *   Mitra enters the 'concerned' or 'protective' state: calm, empathetic, and serious.
 *   Never trivializes, jokes, or plays music during child safety or helpline contexts.
 */

export const MASCOT_STATES = {
  idle: {
    id: 'idle',
    label: 'Resting & Attentive',
    expression: 'gentle-smile',
    eyeState: 'open',
    ears: 'perked',
    tailMotion: 'gentle-sway',
    glowIntensity: 0.5,
    defaultDialogue: 'Welcome back, explorer! The world of rights is waiting for your footsteps.',
    dialoguesByAge: {
      'band-8-10': 'Hello little navigator! Ready to explore something wonderful today?',
      'band-11-13': 'Hey pathfinder! New challenges and mysteries await on the map.',
      'band-14-16': 'Greetings, advocate. Let us inspect the constitutional landscape.'
    }
  },
  happy: {
    id: 'happy',
    label: 'Joyful & Delighted',
    expression: 'wide-smile',
    eyeState: 'happy-arcs',
    ears: 'up-flutter',
    tailMotion: 'joyful-wag',
    glowIntensity: 0.85,
    defaultDialogue: 'It warms my heart to see you standing up for what is fair and true!',
    dialoguesByAge: {
      'band-8-10': 'Yay! You made a kind and brave choice!',
      'band-11-13': 'Brilliant move! Fairness always makes the team stronger.',
      'band-14-16': 'Exemplary reasoning. That is constitutional dignity in practice.'
    }
  },
  curious: {
    id: 'curious',
    label: 'Inquisitive & Exploring',
    expression: 'tilted-wonder',
    eyeState: 'wide-inquisitive',
    ears: 'one-cocked',
    tailMotion: 'question-curve',
    glowIntensity: 0.7,
    defaultDialogue: 'Look closer at this landmark... do you notice the story hidden in the stones?',
    dialoguesByAge: {
      'band-8-10': 'Ooh! What do you think happens if we open this gate?',
      'band-11-13': 'Notice the details here: who holds the power, and who needs a voice?',
      'band-14-16': 'Examine the statutory premise: which right is being contested here?'
    }
  },
  thinking: {
    id: 'thinking',
    label: 'Pondering & Reflecting',
    expression: 'thoughtful-pout',
    eyeState: 'upward-ponder',
    ears: 'lowered-focus',
    tailMotion: 'slow-curl',
    glowIntensity: 0.6,
    defaultDialogue: 'Every choice has ripples. Take your time to think what is truly just.',
    dialoguesByAge: {
      'band-8-10': 'Hmm, let us think: how would you feel if you were in their shoes?',
      'band-11-13': 'Weigh the options: what is legal versus what is truly right?',
      'band-14-16': 'Analyze the constitutional test: does this uphold equality under Article 14 & 15?'
    }
  },
  celebrating: {
    id: 'celebrating',
    label: 'Victorious & Proud',
    expression: 'beaming-glee',
    eyeState: 'star-eyes',
    ears: 'high-spread',
    tailMotion: 'spiral-spark',
    glowIntensity: 1.0,
    defaultDialogue: 'Incredible discovery! You have unlocked a pillar of justice!',
    dialoguesByAge: {
      'band-8-10': 'Hooray! You earned the Golden Seal of Friendship!',
      'band-11-13': 'Quest completed! Your legal awareness score just leveled up.',
      'band-14-16': 'Milestone achieved: Constitutional advocacy badge secured.'
    }
  },
  encouraging: {
    id: 'encouraging',
    label: 'Supportive & Inspiring',
    expression: 'warm-nod',
    eyeState: 'soft-gaze',
    ears: 'warm-forward',
    tailMotion: 'reassuring-pulse',
    glowIntensity: 0.65,
    defaultDialogue: 'Mistakes are just pathfinders finding the true road. Try again with courage.',
    dialoguesByAge: {
      'band-8-10': 'It is totally okay! Learning something new always takes practice.',
      'band-11-13': 'Do not worry — even judges debate tough cases. Re-read the clues and try once more.',
      'band-14-16': 'Nuanced dilemmas are complex by design. Re-examine the facts and statutory protections.'
    }
  },
  explaining: {
    id: 'explaining',
    label: 'Teaching & Guiding',
    expression: 'open-speaking',
    eyeState: 'focused-direct',
    ears: 'alert-listener',
    tailMotion: 'lantern-beam',
    glowIntensity: 0.75,
    defaultDialogue: 'Under the Constitution of India, rights are promises the nation makes to every child.',
    dialoguesByAge: {
      'band-8-10': 'Every child has the right to play, learn in school, and be safe from harm.',
      'band-11-13': 'The RTE Act guarantees free schooling, while Article 24 forbids hazardous child labour.',
      'band-14-16': 'Article 21A elevates education to a Fundamental Right, enforceable by courts.'
    }
  },
  discovering: {
    id: 'discovering',
    label: 'Uncovering Secret Lore',
    expression: 'gasp-wonder',
    eyeState: 'sparkling-wide',
    ears: 'twitch-excited',
    tailMotion: 'flame-flare',
    glowIntensity: 0.9,
    defaultDialogue: 'You found an ancient landmark of justice! Listen to the wisdom of the elders.',
    dialoguesByAge: {
      'band-8-10': 'Look! The magical banyan tree has dropped a secret story scroll!',
      'band-11-13': 'Secret archive unlocked: A forgotten court case that changed children’s lives.',
      'band-14-16': 'Legal landmark uncovered: Landmark jurisprudence on child dignity and liberty.'
    }
  },
  concerned: {
    id: 'concerned',
    label: 'Empathetic & Safeguarding',
    expression: 'solemn-care',
    eyeState: 'caring-warm',
    ears: 'tilted-gentle',
    tailMotion: 'protective-wrap',
    glowIntensity: 0.45,
    defaultDialogue: 'Remember: if you or a friend ever feel unsafe, you are never alone. Trusted adults and Childline 1098 are always here.',
    dialoguesByAge: {
      'band-8-10': 'Your safety is the most important thing in the world. It is never your fault if someone makes you feel bad.',
      'band-11-13': 'You have the legal right to be protected from harm. Dial 1098 toll-free anytime, anywhere in India.',
      'band-14-16': 'Under POCSO Act 2012, your identity is strictly safeguarded. Speaking up takes immense strength, and help is immediate.'
    }
  }
};

/**
 * Returns contextual mascot reaction based on world or action
 */
export function getMascotReactionForWorld(worldId) {
  switch (worldId) {
    case 'village-of-belonging':
      return {
        state: 'happy',
        message: 'Welcome to the Village of Belonging! Here, every child is respected equally, no matter who they are.'
      };
    case 'gardens-of-growth':
      return {
        state: 'discovering',
        message: 'The Gardens of Growth! Look how the trees bloom when children are free to read, learn and play.'
      };
    case 'forest-of-safety':
      return {
        state: 'concerned',
        message: 'The Forest of Safety holds strong shields. We learn to recognize boundaries and call for trusted help.'
      };
    case 'river-of-voices':
      return {
        state: 'curious',
        message: 'Hear the River of Voices singing? When children speak with truth and kindness, the entire nation listens.'
      };
    case 'haven-of-dignity':
      return {
        state: 'thinking',
        message: 'The Haven of Dignity stands against child labour and exploitation. Every child belongs in school, not factories.'
      };
    default:
      return {
        state: 'idle',
        message: 'Where shall our compass guide us next?'
      };
  }
}

