/**
 * useScenarioEngine — Core state machine for the branching scenario player.
 * Manages chapter navigation, dialogue advancement, choice handling,
 * consequence display, article reveal, and completion tracking.
 */
import { useState, useCallback, useMemo } from 'react';
import { getScenarioById } from '../data/scenarioScripts';

/**
 * @param {string} scenarioId — The ID of the scenario to run (e.g. 'scenario-01-bench')
 */
export function useScenarioEngine(scenarioId) {
  const scenario = useMemo(() => getScenarioById(scenarioId), [scenarioId]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [currentChapterId, setCurrentChapterId] = useState(
    () => scenario?.chapters?.[0]?.id ?? null
  );
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isChoicePhase, setIsChoicePhase] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [consequenceVisible, setConsequenceVisible] = useState(false);
  const [articleRevealVisible, setArticleRevealVisible] = useState(false);
  const [isScenarioComplete, setIsScenarioComplete] = useState(false);
  const [choicesMade, setChoicesMade] = useState([]); // { chapterId, choiceId, isCorrect }
  const [totalXp, setTotalXp] = useState(0);

  // ── Derived values ─────────────────────────────────────────────────────────
  const currentChapter = useMemo(() => {
    if (!scenario) return null;
    return scenario.chapters.find((ch) => ch.id === currentChapterId) ?? null;
  }, [scenario, currentChapterId]);

  const currentDialogue = useMemo(() => {
    if (!currentChapter) return null;
    return currentChapter.dialogues?.[currentDialogueIndex] ?? null;
  }, [currentChapter, currentDialogueIndex]);

  const isLastDialogueInChapter = useMemo(() => {
    if (!currentChapter) return false;
    return currentDialogueIndex >= (currentChapter.dialogues?.length ?? 0) - 1;
  }, [currentChapter, currentDialogueIndex]);

  const chapterProgress = useMemo(() => {
    if (!scenario) return { current: 0, total: 0 };
    const index = scenario.chapters.findIndex((ch) => ch.id === currentChapterId);
    return {
      current: index + 1,
      total: scenario.chapters.length,
    };
  }, [scenario, currentChapterId]);

  // ── Internal helpers ───────────────────────────────────────────────────────
  const _advanceToChapter = useCallback(
    (chapterId) => {
      if (!scenario) return;
      const target = scenario.chapters.find((ch) => ch.id === chapterId);
      if (!target) {
        // No next chapter — scenario complete
        setIsScenarioComplete(true);
        return;
      }
      setCurrentChapterId(chapterId);
      setCurrentDialogueIndex(0);
      setIsChoicePhase(false);
      setSelectedChoice(null);
      setConsequenceVisible(false);
    },
    [scenario]
  );

  const _getNextChapterId = useCallback(
    (afterChapterId) => {
      if (!scenario) return null;
      const idx = scenario.chapters.findIndex((ch) => ch.id === afterChapterId);
      if (idx === -1 || idx >= scenario.chapters.length - 1) return null;
      return scenario.chapters[idx + 1].id;
    },
    [scenario]
  );

  // ── Public actions ─────────────────────────────────────────────────────────

  /**
   * Advance dialogue OR transition into choice phase / article reveal.
   */
  const advanceDialogue = useCallback(() => {
    if (!currentChapter) return;
    if (isChoicePhase || consequenceVisible || articleRevealVisible) return;

    if (!isLastDialogueInChapter) {
      setCurrentDialogueIndex((prev) => prev + 1);
      return;
    }

    // End of dialogues in this chapter — check what comes next
    if (currentChapter.choices && currentChapter.choices.length > 0) {
      setIsChoicePhase(true);
      return;
    }

    // No choices — check for article reveal
    if (currentChapter.articleReveal) {
      setArticleRevealVisible(true);
      return;
    }

    // Move to next chapter
    const nextId = _getNextChapterId(currentChapterId);
    if (nextId) {
      _advanceToChapter(nextId);
    } else {
      setIsScenarioComplete(true);
    }
  }, [
    currentChapter,
    isChoicePhase,
    consequenceVisible,
    articleRevealVisible,
    isLastDialogueInChapter,
    currentChapterId,
    _getNextChapterId,
    _advanceToChapter,
  ]);

  /**
   * Skip directly to choices or next phase in the current chapter.
   */
  const skipToChoicePhase = useCallback(() => {
    if (!currentChapter) return;
    if (consequenceVisible || articleRevealVisible) return;

    // If not in choice phase yet and choices exist, jump straight to choice phase
    if (!isChoicePhase && currentChapter.choices && currentChapter.choices.length > 0) {
      setCurrentDialogueIndex((currentChapter.dialogues?.length ?? 1) - 1);
      setIsChoicePhase(true);
      return;
    }

    // If already in choice phase or no choices, jump to article reveal or next chapter
    if (currentChapter.articleReveal) {
      setIsChoicePhase(false);
      setArticleRevealVisible(true);
      return;
    }

    const nextId = _getNextChapterId(currentChapterId);
    if (nextId) {
      setIsChoicePhase(false);
      _advanceToChapter(nextId);
    } else {
      setIsScenarioComplete(true);
    }
  }, [
    currentChapter,
    isChoicePhase,
    consequenceVisible,
    articleRevealVisible,
    currentChapterId,
    _getNextChapterId,
    _advanceToChapter,
  ]);

  /**
   * Player selects a choice by ID.
   */
  const selectChoice = useCallback(
    (choiceId) => {
      if (!currentChapter || !isChoicePhase || selectedChoice) return;
      const choice = currentChapter.choices?.find((c) => c.id === choiceId);
      if (!choice) return;

      setSelectedChoice(choice);
      setConsequenceVisible(true);
      setIsChoicePhase(false);

      // Record the choice
      setChoicesMade((prev) => [
        ...prev,
        { chapterId: currentChapterId, choiceId, isCorrect: choice.isCorrect },
      ]);

      // Accumulate XP
      setTotalXp((prev) => prev + (choice.xpGain ?? 0));
    },
    [currentChapter, isChoicePhase, selectedChoice, currentChapterId]
  );

  /**
   * Acknowledge the consequence panel and move forward.
   */
  const acknowledgeConsequence = useCallback(() => {
    if (!consequenceVisible || !selectedChoice) return;
    setConsequenceVisible(false);

    // Determine where to go next
    const nextChapterId = selectedChoice.nextChapterId;

    // Check if article reveal is due for CURRENT chapter AFTER choices
    if (currentChapter?.articleReveal) {
      setArticleRevealVisible(true);
      return;
    }

    if (nextChapterId) {
      _advanceToChapter(nextChapterId);
    } else {
      const nextId = _getNextChapterId(currentChapterId);
      if (nextId) {
        _advanceToChapter(nextId);
      } else {
        setIsScenarioComplete(true);
      }
    }
  }, [
    consequenceVisible,
    selectedChoice,
    currentChapter,
    currentChapterId,
    _advanceToChapter,
    _getNextChapterId,
  ]);

  /**
   * Dismiss the article reveal stamp.
   */
  const dismissReveal = useCallback(() => {
    setArticleRevealVisible(false);
    // After article reveal, always advance to next chapter or complete
    const nextId = _getNextChapterId(currentChapterId);
    if (nextId) {
      _advanceToChapter(nextId);
    } else {
      setIsScenarioComplete(true);
    }
  }, [currentChapterId, _getNextChapterId, _advanceToChapter]);

  /**
   * Restart the scenario from the beginning.
   */
  const restart = useCallback(() => {
    if (!scenario) return;
    setCurrentChapterId(scenario.chapters[0]?.id ?? null);
    setCurrentDialogueIndex(0);
    setIsChoicePhase(false);
    setSelectedChoice(null);
    setConsequenceVisible(false);
    setArticleRevealVisible(false);
    setIsScenarioComplete(false);
    setChoicesMade([]);
    setTotalXp(0);
  }, [scenario]);

  // ── Return ─────────────────────────────────────────────────────────────────
  return {
    // Data
    scenario,
    currentChapter,
    currentDialogue,
    currentDialogueIndex,
    chapterProgress,
    choicesMade,
    totalXp,

    // Phase flags
    isChoicePhase,
    selectedChoice,
    consequenceVisible,
    articleRevealVisible,
    isScenarioComplete,

    // Actions
    advanceDialogue,
    skipToChoicePhase,
    selectChoice,
    acknowledgeConsequence,
    dismissReveal,
    restart,
  };
}

