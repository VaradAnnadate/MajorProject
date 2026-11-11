import { useMemo } from 'react';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import { CURRICULUM_ALIGNMENTS, HISTORICAL_CLASSROOM_SESSIONS } from '../data/intelligenceData';
import { CLASSROOM_QUESTS } from '../../classroom/data/classroomQuests';
import { WORLDS_DATA } from '../../world/data/worlds';

export function useIntelligence() {
  const {
    activeAgeBand,
    activePersona,
    progression,
    missionProgress,
    currentRole = 'learner',
    setCurrentRole,
  } = useDemoLearner();

  // Aggregate stats derived from actual progression and mission state
  const aggregateMetrics = useMemo(() => {
    const completedMissionsList = progression?.completedMissions || [];
    const totalTransactions = progression?.transactions?.length || 0;
    const totalXp = progression?.totalXp || 0;
    const unlockedBadgesCount = progression?.unlockedBadges?.length || 0;
    const currentStreak = progression?.streak?.currentStreak || 1;

    // Topics explored mapping
    const exploredTopicsMap = new Map();
    for (const tx of progression?.transactions || []) {
      if (tx.eventType === 'MISSION_COMPLETED' || tx.eventType === 'RIGHTS_DISCOVERY') {
        const topic = tx.metadata?.articleUnlocked || tx.metadata?.missionTitle || 'Constitutional Rights';
        exploredTopicsMap.set(topic, (exploredTopicsMap.get(topic) || 0) + 1);
      }
    }

    return {
      totalMissionsCompleted: completedMissionsList.length,
      totalXp,
      unlockedBadgesCount,
      currentStreak,
      totalTransactions,
      exploredTopics: [...exploredTopicsMap.entries()].map(([topic, count]) => ({ topic, count })),
      activeSessionsCount: HISTORICAL_CLASSROOM_SESSIONS.length,
      totalClassroomParticipants: HISTORICAL_CLASSROOM_SESSIONS.reduce((acc, s) => acc + s.participantsCount, 0),
    };
  }, [progression]);

  // Chronological learning timeline constructed from actual transactions
  const learningTimeline = useMemo(() => {
    if (!progression?.transactions || progression.transactions.length === 0) {
      return [
        {
          id: 'initial-explorer-step',
          title: 'Explorer Identity Dossier Initialized',
          description: `Began rights journey in Standard 4 as ${activePersona?.codename || 'Curious Navigator'}.`,
          timestamp: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: 'onboarding',
          badge: '🧭 Explorer',
        },
      ];
    }

    return progression.transactions
      .slice()
      .reverse()
      .map((tx) => {
        let title = 'Learning Milestone Recorded';
        let desc = 'Participated in learning activity.';
        let badge = '📜 Dossier';

        if (tx.eventType === 'MISSION_COMPLETED') {
          title = `Completed Story Adventure: ${tx.metadata?.missionTitle || 'Scenario'}`;
          desc = `Discovered constitutional protections and made thoughtful bystander choices (+${tx.xpAwarded} Wisdom XP).`;
          badge = '🎖️ Adventure';
        } else if (tx.eventType === 'RIGHTS_DISCOVERY') {
          title = `Constitutional Article Unlocked: ${tx.metadata?.article || 'Fundamental Right'}`;
          desc = 'Archived legal principle into Constitutional Rights Passport.';
          badge = '⚖️ Article';
        } else if (tx.eventType === 'EVIDENCE_INSPECTED') {
          title = `Tactile Evidence Examined: ${tx.metadata?.evidenceTitle || 'Story Exhibit'}`;
          desc = 'Carefully inspected documentary artifact to uncover rights context.';
          badge = '🔍 Evidence';
        } else if (tx.eventType === 'COOP_CONTRIBUTED') {
          title = `Shared Quest Contribution: ${tx.metadata?.projectName || 'Community Goal'}`;
          desc = 'Contributed collective wisdom toward pan-India children’s rights milestones.';
          badge = '🤝 Community';
        } else if (tx.eventType === 'HELPLINE_ACCESSED') {
          title = 'National Childline 1098 Protocol Reviewed';
          desc = 'Understood confidential emergency protection channels for young people in distress.';
          badge = '📞 1098 Shield';
        }

        return {
          id: tx.transactionId,
          title,
          description: desc,
          timestamp: new Date(tx.timestamp).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          category: tx.eventType,
          badge,
        };
      });
  }, [progression?.transactions, activePersona?.codename]);

  // Family conversation starters aligned to active age band and completed missions
  const conversationStarters = useMemo(() => {
    return CURRICULUM_ALIGNMENTS.map((alignment) => ({
      ...alignment,
      adaptedForAgeBand: activeAgeBand?.title || 'Young Explorer',
    }));
  }, [activeAgeBand?.title]);

  return {
    activeAgeBand,
    activePersona,
    progression,
    missionProgress,
    currentRole,
    setCurrentRole,
    aggregateMetrics,
    learningTimeline,
    conversationStarters,
    curriculumAlignments: CURRICULUM_ALIGNMENTS,
    historicalSessions: HISTORICAL_CLASSROOM_SESSIONS,
    classroomQuests: CLASSROOM_QUESTS,
    worlds: WORLDS_DATA,
  };
}
