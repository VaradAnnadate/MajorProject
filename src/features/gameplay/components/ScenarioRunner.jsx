/**
 * ScenarioRunner — Main gameplay orchestrator.
 * Full-screen dark layout: progress bar top, dialogue + character panel centre,
 * bottom control strip. Coordinates all sub-components via useScenarioEngine.
 */
import React, { useState, useCallback } from 'react';
import { useScenarioEngine } from '../engine/useScenarioEngine';
import ChapterProgress from './ChapterProgress';
import DialogueBox from './DialogueBox';
import ChoicePanel from './ChoicePanel';
import ConsequencePreview from './ConsequencePreview';
import ArticleRevealStamp from './ArticleRevealStamp';
import MascotGuide from './MascotGuide';
import EvidenceInspector from './EvidenceInspector';
import styles from './ScenarioRunner.module.css';

export default function ScenarioRunner({ scenarioId, onComplete }) {
  const engine = useScenarioEngine(scenarioId);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [pendingEvidence, setPendingEvidence] = useState(null);

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
    setEvidenceOpen(false);
    setPendingEvidence(null);
    advanceDialogue();
  }, [advanceDialogue]);

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
      <div className={styles.completeScreen} role="main" aria-label="Mission complete">
        <div className={styles.completeInner}>
          <div className={styles.completeIcon} aria-hidden="true">🌟</div>
          <h1 className={styles.completeTitle}>Mission Complete!</h1>
          <p className={styles.completeSub}>{scenario.title}</p>
          <div className={styles.xpSummary}>
            <span className={styles.xpLabel}>Total XP Earned</span>
            <span className={styles.xpValue}>{engine.totalXp}</span>
          </div>
          <div className={styles.choicesSummary}>
            <span className={styles.choicesLabel}>
              {engine.choicesMade.filter((c) => c.isCorrect).length} / {engine.choicesMade.length} empathetic choices
            </span>
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
                Return to Adventures →
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
    <div className={styles.root} role="main">
      {/* Top: chapter progress */}
      <ChapterProgress
        chapterProgress={chapterProgress}
        chapterTitle={currentChapter.title}
        missionTitle={scenario.title}
      />

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
    </div>
  );
}

