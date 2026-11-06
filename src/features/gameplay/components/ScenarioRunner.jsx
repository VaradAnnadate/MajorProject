/**
 * ScenarioRunner — Main gameplay orchestrator.
 * Full-screen dark layout: progress bar top, dialogue + character panel centre,
 * bottom control strip. Coordinates all sub-components via useScenarioEngine.
 */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScenarioEngine } from '../engine/useScenarioEngine';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import ChapterProgress from './ChapterProgress';
import DialogueBox from './DialogueBox';
import ChoicePanel from './ChoicePanel';
import ConsequencePreview from './ConsequencePreview';
import ArticleRevealStamp from './ArticleRevealStamp';
import MascotGuide from './MascotGuide';
import EvidenceInspector from './EvidenceInspector';
import styles from './ScenarioRunner.module.css';

export default function ScenarioRunner({ scenarioId, onComplete }) {
  const navigate = useNavigate();
  const engine = useScenarioEngine(scenarioId);
  const { activeAgeBand, inspectEvidenceReward, recordHelplineAccess } = useDemoLearner();
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [pendingEvidence, setPendingEvidence] = useState(null);
  const [safeguardModalOpen, setSafeguardModalOpen] = useState(false);

  const {
    scenario,
    currentChapter,
    currentDialogue,
    chapterProgress,
    isChoicePhase,
    selectedChoice,
    consequenceVisible,
    articleRevealVisible,
    isScenarioComplete,
    advanceDialogue,
    skipToChoicePhase,
    selectChoice,
    acknowledgeConsequence,
    dismissReveal,
    restart,
  } = engine;

  // Handle evidence dialogues
  const handleAdvance = useCallback(() => {
    if (currentDialogue?.type === 'evidence' && !evidenceOpen) {
      setPendingEvidence(currentDialogue);
      setEvidenceOpen(true);
      return;
    }
    advanceDialogue();
  }, [currentDialogue, evidenceOpen, advanceDialogue]);

  const handleEvidenceClose = useCallback(() => {
    if (pendingEvidence && inspectEvidenceReward) {
      inspectEvidenceReward(pendingEvidence.id, pendingEvidence.text?.slice(0, 40));
    }
    setEvidenceOpen(false);
    setPendingEvidence(null);
    advanceDialogue();
  }, [pendingEvidence, inspectEvidenceReward, advanceDialogue]);

  const handleDismissReveal = useCallback(() => {
    dismissReveal();
    if (onComplete) onComplete(engine.totalXp, engine.choicesMade);
  }, [dismissReveal, onComplete, engine.totalXp, engine.choicesMade]);

  if (!scenario || !currentChapter) {
    return (
      <div className={styles.loadingState} aria-live="polite">
        <span className={styles.loadingSpinner} aria-hidden="true" />
        <span>Loading scenario...</span>
      </div>
    );
  }

  // Completion screen
  if (isScenarioComplete && !articleRevealVisible) {
    return (
      <div className={styles.completeScreen} role="main" aria-label="Mission complete" data-world={scenario.worldId}>
        <div className={styles.completeInner}>
          <div className={styles.completeIcon} aria-hidden="true">🌟</div>
          <h1 className={styles.completeTitle}>Constitutional Insight Milestone!</h1>
          <p className={styles.completeSub}>{scenario.title}</p>
          <div className={styles.articleBadge}>
            <span className={styles.articleBadgeLabel}>Constitutional Protection</span>
            <span className={styles.articleBadgeText}>{scenario.articleReveal?.article || 'Fundamental Right'}</span>
          </div>
          <div className={styles.xpSummary}>
            <span className={styles.xpLabel}>Dignity & Civic Wisdom</span>
            <span className={styles.xpValue}>+{engine.totalXp} Pts</span>
          </div>
          <div className={styles.choicesSummary}>
            <span className={styles.choicesLabel}>
              ✨ {engine.choicesMade.filter((c) => c.isCorrect).length} / {engine.choicesMade.length} empathetic decisions made
            </span>
          </div>
          <div className={styles.completeSafeguardNote}>
            🛡️ Safe Harbor: You have strengthened civic awareness for yourself and your peers.
          </div>
          <div className={styles.completeBtns}>
            <button className={styles.restartBtn} onClick={restart}>
              Replay Mission
            </button>
            {onComplete && (
              <button
                className={styles.continueBtn}
                onClick={() => onComplete(engine.totalXp, engine.choicesMade)}
              >
                Return to World Map →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isMitraSpeaking = currentDialogue?.speaker === 'mitra';
  const activeMascotState = currentDialogue?.mascotState || scenario.mascotStateDefault || 'idle';

  return (
    <div
      className={styles.root}
      role="main"
      data-world={scenario.worldId || 'gardens-of-growth'}
      data-lenis-prevent="true"
    >
      {/* Top: chapter progress & safeguard trigger */}
      <div className={styles.topBar}>
        <ChapterProgress
          chapterProgress={chapterProgress}
          chapterTitle={currentChapter.title}
          missionTitle={scenario.title}
        />
        <div className={styles.topActions}>
          <button
            className={styles.safeguardQuickBtn}
            onClick={() => {
              setSafeguardModalOpen(true);
              if (recordHelplineAccess) recordHelplineAccess();
            }}
            title="Child Helpline 1098 & Safety Protocol"
            aria-label="Open Childline 1098 helpline and safety protocol"
          >
            <span className={styles.safeguardIcon} aria-hidden="true">📞</span>
            <span className={styles.safeguardText}>Childline 1098</span>
          </button>
          <button
            className={styles.exitBtn}
            onClick={() => navigate('/world')}
            title="Return to World Map"
            aria-label="Return to World Map"
          >
            ← Map
          </button>
        </div>
      </div>

      {/* Setting context strip */}
      {currentChapter.setting && (
        <div className={styles.settingStrip} aria-label="Scene setting">
          <span className={styles.settingIcon} aria-hidden="true">◉</span>
          <span className={styles.settingText}>{currentChapter.setting}</span>
        </div>
      )}

      {/* Main content area */}
      <div className={styles.contentArea}>
        <div className={styles.dialogueWrap}>
          {/* Dialogue display */}
          {!isChoicePhase && currentDialogue && (
            <DialogueBox
              key={currentDialogue.id}
              dialogue={currentDialogue}
              ageBandId={activeAgeBand?.id}
              onComplete={() => {}}
            />
          )}

          {/* Choice phase & consequence review */}
          {(isChoicePhase || consequenceVisible) && currentChapter.choices && (
            <ChoicePanel
              choices={currentChapter.choices}
              selectedChoice={selectedChoice}
              onSelect={selectChoice}
            />
          )}

          {/* Consequence feedback card right under the choice question */}
          <ConsequencePreview
            choice={selectedChoice}
            visible={consequenceVisible}
            onContinue={acknowledgeConsequence}
          />

          {/* Controls placed directly down of the question / dialogue */}
          {!isChoicePhase && !consequenceVisible && !articleRevealVisible && (
            <div className={styles.controlStrip}>
              <button
                className={styles.advanceBtn}
                onClick={handleAdvance}
                aria-label="Continue story"
              >
                {currentDialogue?.type === 'evidence' ? (
                  <>
                    <span className={styles.advanceBtnIcon} aria-hidden="true">🔍</span>
                    Inspect Evidence
                  </>
                ) : (
                  <>
                    Continue
                    <span className={styles.advanceBtnArrow} aria-hidden="true">›</span>
                  </>
                )}
              </button>
              <button
                className={styles.skipBtn}
                onClick={skipToChoicePhase}
                aria-label="Skip to questions or choices"
              >
                Skip ››
              </button>
            </div>
          )}

          {/* In choice phase: optional skip question control */}
          {isChoicePhase && !consequenceVisible && !articleRevealVisible && (
            <div className={styles.choiceSkipRow}>
              <button
                className={styles.skipBtn}
                onClick={skipToChoicePhase}
                aria-label="Skip this question"
              >
                Skip question ››
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Article reveal */}
      <ArticleRevealStamp
        articleReveal={currentChapter.articleReveal}
        visible={articleRevealVisible}
        onDismiss={handleDismissReveal}
      />

      {/* Evidence inspector */}
      <EvidenceInspector
        dialogue={pendingEvidence}
        visible={evidenceOpen}
        onClose={handleEvidenceClose}
      />

      {/* Mitra companion */}
      <MascotGuide
        mascotState={activeMascotState}
        dialogue={isMitraSpeaking ? currentDialogue?.text : null}
        isMitraSpeaking={isMitraSpeaking}
      />

      {/* Safeguarding & Childline 1098 Modal */}
      {safeguardModalOpen && (
        <div
          className={styles.safeguardOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="safeguardTitle"
          onClick={() => setSafeguardModalOpen(false)}
        >
          <div
            className={styles.safeguardCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.safeguardPill}>
              🛡️ Safe Harbor Protocol · National Safeguard
            </div>
            <h2 id="safeguardTitle" className={styles.safeguardHeading}>
              You Are Safe & Valued
            </h2>
            <p className={styles.safeguardText}>
              RightsQuest India is a safe space for learning constitutional rights and civic empathy.
              If you or any young person around you faces harm, distress, child labour, or unsafe situations,
              free and confidential help is always available.
            </p>
            <div className={styles.safeguardCallout}>
              <div className={styles.safeguardNumber} aria-label="Helpline number 1098">
                📞 1098
              </div>
              <div className={styles.safeguardInfo}>
                <strong>Childline India · 24/7 Emergency Helpline</strong>
                <span>Toll-free · Confidential · National Emergency Support</span>
              </div>
            </div>
            <div className={styles.safeguardPrivacy}>
              🔒 <strong>DPDP Act 2023 §9 Child Privacy Guarantee:</strong> RightsQuest India never asks for your personal information, phone numbers, or passwords. Your journey is completely private and secure.
            </div>
            <button
              className={styles.safeguardCloseBtn}
              onClick={() => setSafeguardModalOpen(false)}
              autoFocus
            >
              Return to Story Adventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

