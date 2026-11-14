/**
 * ScenarioPage — Route page for /play/:scenarioId
 * Pre-mission briefing → ScenarioRunner → Return to Adventures
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getScenarioById } from '../data/scenarioScripts';
import ScenarioRunner from '../components/ScenarioRunner';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import { cacheOfflineQuests, getOfflineQuest } from '../../../pwa/offlineQuestStore';
import styles from './ScenarioPage.module.css';

// Pillar → icon map
const PILLAR_ICONS = {
  Development: '📚',
  Protection: '🛡️',
  Participation: '🗣️',
  Survival: '🌱',
};

export default function ScenarioPage() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const { saveMissionProgress, completeMission } = useDemoLearner();
  const [phase, setPhase] = useState('briefing'); // 'briefing' | 'playing' | 'done'

  const bundledScenario = getScenarioById(scenarioId);
  const [scenario, setScenario] = useState(() => (
    typeof navigator === 'undefined' || navigator.onLine ? bundledScenario : null
  ));
  const [isLoadingOfflineQuest, setIsLoadingOfflineQuest] = useState(() => (
    typeof navigator !== 'undefined' && !navigator.onLine
  ));

  useEffect(() => {
    let isCurrent = true;

    async function prepareScenario() {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        try {
          const savedScenario = await getOfflineQuest(scenarioId);
          if (isCurrent) setScenario(savedScenario || bundledScenario);
        } catch {
          if (isCurrent) setScenario(bundledScenario);
        }
      } else {
        setScenario(bundledScenario);
        if (bundledScenario) cacheOfflineQuests([bundledScenario]).catch(() => {});
      }
      if (isCurrent) setIsLoadingOfflineQuest(false);
    }

    prepareScenario();
    return () => { isCurrent = false; };
  }, [scenarioId, bundledScenario]);

  const handleComplete = (totalXp, choicesMade) => {
    if (completeMission) {
      const empatheticCount = Array.isArray(choicesMade)
        ? choicesMade.filter((c) => c.isCorrect).length
        : 0;
      const isPerfect = Array.isArray(choicesMade) && choicesMade.length > 0 && empatheticCount === choicesMade.length;
      completeMission(
        scenarioId,
        scenario?.articleReveal?.article || scenario?.articleRef,
        {
          missionTitle: scenario?.title || scenarioId,
          empatheticChoicesCount: empatheticCount,
          isPerfectEmpathy: isPerfect,
        }
      );
    }
    setPhase('done');
  };

  // Unknown scenario
  if (isLoadingOfflineQuest && !scenario) {
    return <div className={styles.loading} role="status">Opening your saved quest…</div>;
  }

  if (!scenario) {
    return (
      <div className={styles.notFound} role="main">
        <div className={styles.notFoundInner}>
          <span className={styles.notFoundIcon} aria-hidden="true">🗺️</span>
          <h1 className={styles.notFoundTitle}>Scenario Not Found</h1>
          <p className={styles.notFoundText}>
            The scenario "<code>{scenarioId}</code>" doesn't exist yet.
          </p>
          <Link to="/adventures" className={styles.returnLink}>
            ← Return to Adventures
          </Link>
        </div>
      </div>
    );
  }

  // Playing phase — full screen, no nav
  if (phase === 'playing') {
    return (
      <ScenarioRunner
        scenarioId={scenarioId}
        onComplete={handleComplete}
      />
    );
  }

  // Completed phase — clear debrief and next steps
  if (phase === 'done') {
    return (
      <div 
        className={styles.root} 
        role="main" 
        data-world={scenario.worldId || 'haven-of-dignity'}
      >
        <div className={styles.inner} style={{ textAlign: 'center', padding: 'clamp(2rem, 5vw, 4rem) 1rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-3)' }} aria-hidden="true">
            🌟
          </div>
          <span className={styles.difficultyPill} style={{ marginBottom: 'var(--space-2)' }}>
            Mission Concluded
          </span>
          <h1 className={styles.title} style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
            {scenario.title} Complete!
          </h1>
          <p className={styles.tagline} style={{ maxWidth: '580px', margin: '0 auto var(--space-6)' }}>
            Your insights have been added to your local Dignity XP and explorer records. Thank you for standing up for fairness and constitutional wisdom.
          </p>

          <div className={styles.synopsisCard} style={{ maxWidth: '540px', margin: '0 auto var(--space-6)', textAlign: 'left' }}>
            <div className={styles.synopsisLabel}>Constitutional Wisdom Recorded</div>
            <p className={styles.synopsisText} style={{ marginBottom: 'var(--space-2)' }}>
              <strong>Protected Right:</strong> {scenario.articleRef}
            </p>
            <p className={styles.synopsisText}>
              <strong>Badge Unlocked:</strong> {scenario.badgeName}
            </p>
          </div>

          <div className={styles.ctaRow} style={{ justifyContent: 'center' }}>
            <Link to="/adventures" className={styles.startBtn} aria-label="Return to adventures catalog">
              Back to Adventures
              <span className={styles.startBtnArrow} aria-hidden="true">→</span>
            </Link>
            <Link to="/world" className={styles.cancelLink}>
              Explore World Map
            </Link>
            <Link to="/achievements" className={styles.cancelLink}>
              View Dignity XP & Badges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Briefing screen
  return (
    <div 
      className={styles.root} 
      role="main"
      data-world={scenario.worldId || 'haven-of-dignity'}
    >
      <div className={styles.inner}>
        {/* Back link */}
        <Link to="/adventures" className={styles.backLink} aria-label="Return to Adventures">
          ← Adventures
        </Link>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pillRow}>
            <span className={styles.difficultyPill}>{scenario.difficulty}</span>
            <span className={styles.articlePill}>{scenario.articleRef}</span>
            <span className={styles.timePill} aria-label={`Estimated ${scenario.estimatedMinutes} minutes`}>
              ⏱ ~{scenario.estimatedMinutes} min
            </span>
          </div>
          <h1 className={styles.title}>{scenario.title}</h1>
          <p className={styles.tagline}>{scenario.tagline}</p>
        </div>

        {/* Synopsis card */}
        <div className={styles.synopsisCard}>
          <div className={styles.synopsisLabel}>Mission Briefing</div>
          <p className={styles.synopsisText}>{scenario.synopsis}</p>
        </div>

        {/* Meta grid */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Chapters</span>
            <span className={styles.metaValue}>{scenario.totalChapters}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Difficulty</span>
            <span className={styles.metaValue}>{scenario.difficulty}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Badge</span>
            <span className={styles.metaValue}>{scenario.badgeName}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>World</span>
            <span className={styles.metaValue} style={{ textTransform: 'capitalize' }}>
              {scenario.worldId?.replace(/-/g, ' ')}
            </span>
          </div>
        </div>

        {/* Mitra tip */}
        <div className={styles.mitraTip} role="note">
          <span className={styles.mitraTipIcon} aria-hidden="true">🦊</span>
          <div>
            <div className={styles.mitraTipLabel}>Mitra says</div>
            <p className={styles.mitraTipText}>
              There are no "wrong" answers — only choices that teach us something. Take your time,
              think carefully, and remember: curiosity and kindness are your greatest tools.
            </p>
          </div>
        </div>

        {/* Legal article reference */}
        <div className={styles.articleCard} aria-label="Legal article reference">
          <div className={styles.articleCardIcon} aria-hidden="true">⚖️</div>
          <div>
            <div className={styles.articleCardLabel}>Constitutional Reference</div>
            <div className={styles.articleCardText}>{scenario.articleRef}</div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <button
            className={styles.startBtn}
            onClick={() => setPhase('playing')}
            aria-label={`Begin mission: ${scenario.title}`}
          >
            Begin Mission
            <span className={styles.startBtnArrow} aria-hidden="true">→</span>
          </button>
          <Link to="/adventures" className={styles.cancelLink}>
            Not now
          </Link>
        </div>
      </div>
    </div>
  );
}

