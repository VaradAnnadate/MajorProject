import React, { useState } from 'react';
import { useProgression } from '../hooks/useProgression';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import ExplorerProfile from './ExplorerProfile';
import XPDisplay from './XPDisplay';
import LevelProgress from './LevelProgress';
import AchievementCollection from './AchievementCollection';
import AchievementDetail from './AchievementDetail';
import JourneyPath from './JourneyPath';
import CooperativeProgress from './CooperativeProgress';
import StreakCalendar from './StreakCalendar';
import ActivityJournal from './ActivityJournal';
import RewardCelebration from './RewardCelebration';
import styles from './ProgressionHub.module.css';

const TABS = [
  { id: 'cabinet', label: 'Treasure Cabinet', icon: '🎖️' },
  { id: 'trail', label: 'Discovery Trail', icon: '🗺️' },
  { id: 'community', label: 'Community Quests', icon: '🤝' },
  { id: 'consistency', label: 'Consistency Calendar', icon: '🔥' },
  { id: 'journal', label: 'Chronicles & Audit', icon: '📜' },
];

export default function ProgressionHub() {
  const {
    totalXp,
    level,
    badges,
    unlockedBadges,
    streak,
    transactions,
    completedMissions,
    lastAwardEvent,
    contributeToCoop,
    dismissCelebration,
  } = useProgression();

  const { activePersona, activeAgeBand } = useDemoLearner();

  const [activeTab, setActiveTab] = useState('cabinet');
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <div className={styles.root} role="main" aria-label="RightsQuest Living Progression Hub">
      {/* Top Banner: Explorer Profile + XP Card */}
      <div className={styles.topSection}>
        <div className={styles.profileCol}>
          <ExplorerProfile
            persona={activePersona}
            ageBand={activeAgeBand}
            level={level}
            unlockedBadgeCount={unlockedBadges.length}
            totalBadgeCount={badges.length}
            missionsCount={completedMissions.length}
          />
        </div>

        <div className={styles.xpCol}>
          <XPDisplay
            totalXp={totalXp}
            level={level}
            streakCount={streak?.currentStreak || 1}
          />
        </div>
      </div>

      {/* Level Milestone Banner */}
      <LevelProgress level={level} />

      {/* Main Tabbed Navigation Strip */}
      <div className={styles.navigationStrip}>
        <div className={styles.tabBar} role="tablist" aria-label="Progression views">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.navTabBtn} ${activeTab === tab.id ? styles.navTabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon} aria-hidden="true">{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className={styles.tabContentArea}>
        {activeTab === 'cabinet' && (
          <AchievementCollection
            badges={badges}
            onSelectBadge={(badge) => setSelectedBadge(badge)}
          />
        )}

        {activeTab === 'trail' && (
          <JourneyPath currentLevelNumber={level?.levelNumber || 1} />
        )}

        {activeTab === 'community' && (
          <CooperativeProgress
            onContribute={(projectId, title) => {
              if (contributeToCoop) contributeToCoop(projectId, title);
            }}
          />
        )}

        {activeTab === 'consistency' && (
          <StreakCalendar streak={streak} />
        )}

        {activeTab === 'journal' && (
          <ActivityJournal transactions={transactions} />
        )}
      </div>

      {/* Badge Detail Inspection Modal */}
      {selectedBadge && (
        <AchievementDetail
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}

      {/* Celebratory Banner on Milestone */}
      <RewardCelebration
        lastAwardEvent={lastAwardEvent}
        onDismiss={dismissCelebration}
      />
    </div>
  );
}

