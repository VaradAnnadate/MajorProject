import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  RotateCw, 
  ZoomIn, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X, 
  Info, 
  Lock,
  Layers,
  Award,
  Scale,
  Volume2,
  BookOpen,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { 
  AR_CONSTITUTIONAL_STATIONS, 
  AR_CONSTITUTIONAL_OBJECTS, 
  AR_MINIATURE_REALMS 
} from '../data/arConstitutionalObjects';
import { ArSceneEngine } from '../engine/ArSceneEngine';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import styles from './ArExplorerPage.module.css';

export default function ArExplorerPage() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  const { activeAgeBand, setAgeBand, awardReward } = useDemoLearner();

  // Selected station
  const [selectedId, setSelectedId] = useState('ashoka-chakra');

  // Age band key ('8-10' | '11-13' | '14-16')
  const currentAgeKey = useMemo(() => {
    const bandId = activeAgeBand?.id || '8-10';
    if (bandId.includes('14') || bandId.includes('16')) return '14-16';
    if (bandId.includes('11') || bandId.includes('13')) return '11-13';
    return '8-10';
  }, [activeAgeBand]);

  // WebXR AR session state
  const [isArSupported, setIsArSupported] = useState(false);
  const [isArActive, setIsArActive] = useState(false);
  const [arStatusMessage, setArStatusMessage] = useState('');
  const [arError, setArError] = useState(null);

  // Mitra Companion state & classroom dialogue
  const [mitraEmotion, setMitraEmotionState] = useState('welcome');
  const [mitraMessage, setMitraMessage] = useState('');

  // Spatial Scenario Decision state
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [activeConsequence, setActiveConsequence] = useState(null);

  // Spoke / Writ detail inspection
  const [inspectedDetail, setInspectedDetail] = useState(null);

  // Quiz state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [completedObjects, setCompletedObjects] = useState(new Set());

  // Current station data
  const currentStationIndex = useMemo(() => {
    const idx = AR_CONSTITUTIONAL_STATIONS.findIndex((st) => st.id === selectedId);
    return idx >= 0 ? idx : 0;
  }, [selectedId]);

  const currentStation = AR_CONSTITUTIONAL_STATIONS[currentStationIndex] || AR_CONSTITUTIONAL_STATIONS[0];

  // Age-adapted scenario and quiz
  const currentScenario = useMemo(() => {
    if (currentStation.scenarios && currentStation.scenarios[currentAgeKey]) {
      return currentStation.scenarios[currentAgeKey];
    }
    return currentStation.scenarios?.['8-10'] || null;
  }, [currentStation, currentAgeKey]);

  const currentQuiz = useMemo(() => {
    return currentScenario?.quiz || currentStation.quiz;
  }, [currentScenario, currentStation]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // 1. Detect WebXR AR device capability
  useEffect(() => {
    let isCurrent = true;
    if (typeof navigator !== 'undefined' && navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr
        .isSessionSupported('immersive-ar')
        .then((supported) => {
          if (isCurrent) setIsArSupported(Boolean(supported));
        })
        .catch(() => {
          if (isCurrent) setIsArSupported(false);
        });
    } else {
      setIsArSupported(false);
    }
    return () => {
      isCurrent = false;
    };
  }, []);

  // 2. Initialize Three.js Classroom Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const engine = new ArSceneEngine(canvasRef.current, {
        onObjectClick: (data) => {
          if (data?.id) setSelectedId(data.id);
        },
        onInteractivePartClick: (action) => {
          if (action.message) {
            setMitraMessage(action.message);
          }
        },
        onArSessionEnd: () => {
          setIsArActive(false);
          setArStatusMessage('');
        },
        onPlacementStatus: (msg) => {
          setArStatusMessage(msg);
        },
      });

      engineRef.current = engine;
      engine.loadConstitutionalStation(currentStation, currentAgeKey);
      setMitraMessage(
        currentStation.mitraPrompt ||
          'Welcome to our RightsQuest classroom! Inspect the constitutional artifact on your student desk.'
      );
    } catch (err) {
      console.warn('Could not initialize Three.js Classroom Scene Engine:', err);
      setArError('Interactive 3D classroom initialization failed on this device.');
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  // 3. Swap 3D Model & Update Blackboard when selection or age tier changes
  useEffect(() => {
    if (engineRef.current && currentStation) {
      engineRef.current.loadConstitutionalStation(currentStation, currentAgeKey);
      engineRef.current.setMitraEmotion('welcome');
      setMitraEmotionState('welcome');
      setMitraMessage(
        currentStation.mitraPrompt ||
          'Look at the model on your student desk! Let’s explore what this constitutional symbol teaches us.'
      );

      // Reset scenario and quiz state for new station
      setSelectedChoiceId(null);
      setActiveConsequence(null);
      setInspectedDetail(null);
      setSelectedOptionIndex(null);
      setIsQuizSubmitted(false);
      setQuizFeedback(null);
    }
  }, [currentStation, currentAgeKey]);

  // Handle AR Session launch
  const handleLaunchAr = async () => {
    setArError(null);
    if (!engineRef.current) return;

    try {
      await engineRef.current.startArSession();
      setIsArActive(true);
      if (engineRef.current.setMitraEmotion) {
        engineRef.current.setMitraEmotion('celebrating');
        setMitraEmotionState('celebrating');
      }
      setMitraMessage('Classroom AR active! Scan your room to detect your physical desk or floor, then tap to place the model.');
    } catch (err) {
      console.warn('AR Session launch error:', err);
      setArError(err.message || 'Could not launch AR camera session on this device.');
      setIsArActive(false);
    }
  };

  const handleStopAr = () => {
    if (engineRef.current) {
      engineRef.current.stopArSession();
    }
    setIsArActive(false);
    setMitraMessage('Returned to your 3D virtual classroom desk.');
  };

  // Handle Scenario Choice Selection (Interactive Spatial Consequence)
  const handleSelectChoice = (choice) => {
    setSelectedChoiceId(choice.id);
    setActiveConsequence(choice);

    // Trigger physical 3D animation inside scene engine
    if (engineRef.current && choice.spatialEffect) {
      engineRef.current.triggerSpatialEffect(choice.spatialEffect);
    }

    // Set Mitra emotion and speech
    if (choice.isConstitutional) {
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('celebrating');
      }
      setMitraEmotionState('celebrating');
      setMitraMessage(`Constitutional harmony achieved! ${choice.explanation}`);
    } else {
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('concerned');
      }
      setMitraEmotionState('concerned');
      setMitraMessage(`Notice the imbalance: ${choice.explanation}`);
    }
  };

  // Direct Interactive Action Buttons for Model on the Desk
  const handleDirectModelAction = (actionType) => {
    if (!engineRef.current) return;

    if (actionType === 'test_balance') {
      const isCurrentlyZero = Math.abs(engineRef.current.scaleTiltAngle) < 0.05;
      const nextTilt = isCurrentlyZero ? 'scale-unbalanced' : 'scale-balanced';
      engineRef.current.triggerSpatialEffect(nextTilt);
      setMitraMessage(
        nextTilt === 'scale-balanced'
          ? 'Equilibrium restored! Article 14 ensures equal dignity on the playground and in class.'
          : 'Notice how the scale tilts lopsided when opportunities are unequally distributed.'
      );
    } else if (actionType === 'spin_chakra') {
      engineRef.current.triggerSpatialEffect('chakra-glow-full');
      setMitraMessage('The 24 spokes radiate continuous Dharma and civic fairness for every child!');
    } else if (actionType === 'pulse_beacon') {
      engineRef.current.triggerSpatialEffect('beacon-pulse');
      setMitraMessage('Article 19 & UNCRC 12: Student voices echo across our Bal Sansad assembly!');
    } else if (actionType === 'expand_shield') {
      engineRef.current.triggerSpatialEffect('shield-expand');
      setMitraMessage('Emerald protective sanctuary dome deployed! Childline 1098 guards every child.');
    } else if (actionType === 'open_gates') {
      engineRef.current.triggerSpatialEffect('scroll-unfurl');
      setMitraMessage('The school gates swing wide open! Article 21A guarantees free, high-quality learning.');
    } else if (actionType === 'fire_remedies') {
      engineRef.current.triggerSpatialEffect('remedy-prisms-fire');
      setMitraMessage('Dr. Ambedkar’s Article 32: Constitutional writ light rays connect to the Apex Court!');
    }
  };

  // Handle Spoke or Writ Detail Inspection
  const handleInspectDetail = (item) => {
    setInspectedDetail(item);
    if (engineRef.current?.setMitraEmotion) {
      engineRef.current.setMitraEmotion('explaining');
    }
    setMitraEmotionState('explaining');
    setMitraMessage(`Classroom note on ${item.name || item.meaning}: ${item.description || item.purpose}`);
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (optionIndex) => {
    if (isQuizSubmitted || !currentQuiz) return;
    setSelectedOptionIndex(optionIndex);
    setIsQuizSubmitted(true);

    const isCorrect = optionIndex === currentQuiz.correctIndex;
    if (isCorrect) {
      setQuizFeedback({
        correct: true,
        message: `Excellent! ${currentQuiz.explanation || 'You mastered this classroom lesson!'}`,
      });

      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('celebrating');
      }
      setMitraEmotionState('celebrating');

      // Award Dignity XP idempotently
      if (!completedObjects.has(currentStation.id)) {
        setCompletedObjects((prev) => new Set([...prev, currentStation.id]));
        if (awardReward) {
          awardReward({
            eventType: 'RIGHTS_DISCOVERY',
            sourceId: `ar-${currentStation.id}`,
            metadata: {
              articleName: currentStation.articleRef,
              objectTitle: currentStation.title,
              stationNumber: currentStation.stationNumber,
              ageBand: currentAgeKey,
            },
          });
        }
      }
    } else {
      setQuizFeedback({
        correct: false,
        message: `Not quite right, but every try teaches us something! ${currentQuiz.explanation || 'Review the classroom board above and try again.'}`,
      });
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('concerned');
      }
      setMitraEmotionState('concerned');
    }
  };

  // Station navigation
  const handleNextStation = () => {
    const nextIdx = (currentStationIndex + 1) % AR_CONSTITUTIONAL_STATIONS.length;
    setSelectedId(AR_CONSTITUTIONAL_STATIONS[nextIdx].id);
  };

  const handlePrevStation = () => {
    const prevIdx = (currentStationIndex - 1 + AR_CONSTITUTIONAL_STATIONS.length) % AR_CONSTITUTIONAL_STATIONS.length;
    setSelectedId(AR_CONSTITUTIONAL_STATIONS[prevIdx].id);
  };

  return (
    <div className={styles.arPage}>
      {/* Editorial Header with Classroom Context */}
      <header className={styles.heroHeader}>
        <div className="container-editorial">
          <div className={styles.badgeRow}>
            <span className="editorial-eyebrow">Creative OS · RightsQuest Living Classroom</span>
            {isArSupported ? (
              <span className={`${styles.statusPill} ${styles.statusPillAr}`}>
                <Camera size={13} aria-hidden="true" />
                WebXR AR Capable · Place on Your Real Desk
              </span>
            ) : (
              <span className={styles.statusPill}>
                <Layers size={13} aria-hidden="true" />
                Virtual Classroom Studio · Tabletop 3D Laboratory
              </span>
            )}
            <span className={styles.stationTrackerBadge}>
              <GraduationCap size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Lesson {currentStation.stationNumber} of {AR_CONSTITUTIONAL_STATIONS.length} · {completedObjects.size} Mastered
            </span>
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.2rem)', margin: '0 0 var(--space-3)' }}>
            Bring the Constitution onto Your Desk
          </h1>

          <p className="text-lead" style={{ maxWidth: '720px', margin: '0 0 var(--space-4)' }}>
            Welcome to our hands-on constitutional classroom. Place 3D legal artifacts onto your student study desk, test fairness in everyday school situations with Mitra, and discover how India's fundamental rights protect you.
          </p>

          {/* Age Adaptation & Factual Privacy Row */}
          <div className={styles.headerControlGrid}>
            <div className={styles.ageSelectorContainer} role="group" aria-label="Learning Age Tier Selector">
              <span className={styles.ageSelectorLabel}>Adaptive Age Tier:</span>
              <div className={styles.agePillGroup}>
                {[
                  { id: '8-10', label: 'Ages 8–10', sub: 'Navigators' },
                  { id: '11-13', label: 'Ages 11–13', sub: 'Pathfinders' },
                  { id: '14-16', label: 'Ages 14–16', sub: 'Advocates' },
                ].map((band) => {
                  const isCurrent = currentAgeKey === band.id;
                  return (
                    <button
                      key={band.id}
                      type="button"
                      className={`${styles.agePill} ${isCurrent ? styles.agePillActive : ''}`}
                      onClick={() => setAgeBand && setAgeBand(band.id)}
                      aria-pressed={isCurrent}
                    >
                      <span className={styles.agePillLabel}>{band.label}</span>
                      <span className={styles.agePillSub}>{band.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Factual, Verified Privacy Banner */}
            <div className={styles.privacyNotice} role="note">
              <Lock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Privacy & Local Processing:</strong> Augmented Reality surface tracking operates entirely on-device via standard WebXR. Zero camera video or photos are recorded or stored, zero frames are transmitted over the network, and zero biometric or facial recognition is performed (aligned with DPDP Act 2023 §9 child safeguarding principles).
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container-editorial">
        {/* Error message banner */}
        {arError && (
          <div 
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#991B1B',
              fontSize: '0.85rem',
              margin: '1rem 0'
            }}
            role="alert"
          >
            {arError} Continuing in 3D Virtual Classroom mode below.
          </div>
        )}

        {/* 6-Lesson Navigation Ribbon */}
        <nav className={styles.stationRibbon} aria-label="Classroom Lessons Ribbon">
          <div className={styles.ribbonScroll}>
            {AR_CONSTITUTIONAL_STATIONS.map((station) => {
              const isActive = station.id === selectedId;
              const isDone = completedObjects.has(station.id);
              return (
                <button
                  key={station.id}
                  type="button"
                  className={`${styles.stationPill} ${isActive ? styles.stationPillActive : ''}`}
                  onClick={() => setSelectedId(station.id)}
                  aria-pressed={isActive}
                >
                  <span className={styles.stationPillNum}>{station.stationNumber}</span>
                  <span className={styles.stationPillTitle}>Lesson {station.stationNumber}: {station.title}</span>
                  {isDone && <CheckCircle2 size={14} className={styles.doneCheck} />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 3D / AR Viewport Stage (Virtual Classroom & Real AR Placement) */}
        <section className={styles.stageContainer} aria-label="3D Classroom Study Desk Stage">
          <canvas ref={canvasRef} className={styles.canvas} />

          {/* Mitra In-Stage Speech Bubble HUD */}
          <div className={styles.mitraStageHud} role="status" aria-live="polite">
            <div className={styles.mitraAvatarPill}>
              <span className={styles.mitraEmoji} aria-hidden="true">
                {mitraEmotion === 'celebrating' ? '🦊✨' : mitraEmotion === 'concerned' ? '🦊💭' : '🦊'}
              </span>
              <span className={styles.mitraNameTag}>Mitra Guide</span>
            </div>
            <p className={styles.mitraSpeechText}>
              "{mitraMessage}"
            </p>
          </div>

          {/* Stage Controls Overlay */}
          <div className={styles.stageControlsOverlay}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {isArSupported && !isArActive ? (
                <button
                  type="button"
                  className={styles.arActionBtn}
                  onClick={handleLaunchAr}
                  aria-label="Launch WebXR Augmented Reality on your physical desk"
                >
                  <Camera size={16} aria-hidden="true" />
                  <span>Enter Classroom AR</span>
                </button>
              ) : isArActive ? (
                <button
                  type="button"
                  className={styles.arActionBtn}
                  onClick={handleStopAr}
                  style={{ background: '#111827' }}
                  aria-label="Exit AR Session"
                >
                  <X size={16} aria-hidden="true" />
                  <span>Return to Virtual Classroom</span>
                </button>
              ) : null}

              {/* Direct Desktop Model Interaction Buttons */}
              {currentStation.id === 'right-to-equality' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('test_balance')}
                  aria-label="Toggle scale balance equilibrium"
                >
                  <Scale size={14} />
                  <span>Test Scale Balance</span>
                </button>
              )}

              {currentStation.id === 'ashoka-chakra' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('spin_chakra')}
                  aria-label="Spin Dharma Chakra"
                >
                  <RotateCw size={14} />
                  <span>Spin 24 Spokes</span>
                </button>
              )}

              {currentStation.id === 'right-to-freedom' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('pulse_beacon')}
                  aria-label="Broadcast student voice"
                >
                  <Volume2 size={14} />
                  <span>Broadcast Bal Sansad</span>
                </button>
              )}

              {currentStation.id === 'right-against-exploitation' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('expand_shield')}
                  aria-label="Deploy 1098 sanctuary dome"
                >
                  <ShieldCheck size={14} />
                  <span>Deploy 1098 Sanctuary</span>
                </button>
              )}

              {currentStation.id === 'right-to-education' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('open_gates')}
                  aria-label="Open school gates and unroll scroll"
                >
                  <BookOpen size={14} />
                  <span>Open School Gates</span>
                </button>
              )}

              {currentStation.id === 'constitutional-remedies' && (
                <button
                  type="button"
                  className={styles.stageActionPill}
                  onClick={() => handleDirectModelAction('fire_remedies')}
                  aria-label="Fire 5 crystal writ rays"
                >
                  <Sparkles size={14} />
                  <span>Fire Writ Light Rays</span>
                </button>
              )}

              {isArActive && arStatusMessage && (
                <span className={styles.stageTip} role="status">
                  {arStatusMessage}
                </span>
              )}
            </div>

            {!isArActive && (
              <span className={styles.stageTip}>
                Drag to rotate · Scroll to zoom · Tap desk objects to interact
              </span>
            )}
          </div>
        </section>

        {/* Phase 5: Teacher's Blackboard Synchronized Card */}
        <section className={styles.teacherBlackboardCard} aria-labelledby="teacher-board-heading">
          <div className={styles.blackboardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }} aria-hidden="true">📋</span>
              <h3 id="teacher-board-heading" className={styles.blackboardTitle}>
                Teacher’s Classroom Board · Lesson {currentStation.stationNumber}: {currentStation.classroomTopic || currentStation.title}
              </h3>
            </div>
            <span className={styles.blackboardArticleBadge}>{currentStation.articleRef}</span>
          </div>
          <p className={styles.blackboardPrinciple}>
            “{currentStation.classroomBoardSummary || currentStation.overview}”
          </p>
          <div className={styles.blackboardHint}>
            <span>Tip: The 3D model on your student desk represents this principle. Test choices below to see physical cause-and-effect!</span>
          </div>
        </section>

        {/* Interactive Classroom Situation Challenge */}
        {currentScenario && (
          <section className={styles.inSceneChallengeCard} aria-labelledby="spatial-challenge-heading">
            <div className={styles.challengeHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={18} className={styles.scenarioIcon} />
                <h3 id="spatial-challenge-heading" className={styles.challengeTitle}>
                  Classroom Situation Challenge ({currentAgeKey} Tier)
                </h3>
              </div>
              <span className={styles.categoryBadge}>{currentStation.category}</span>
            </div>

            <p className={styles.scenarioContext}>
              {currentScenario.context}
            </p>

            <div className={styles.dilemmaPrompt}>
              <strong>The Dilemma:</strong> {currentScenario.dilemma}
            </div>

            {/* Tangible Action Buttons */}
            <div className={styles.choicesGrid} role="group" aria-label="Constitutional Action Choices">
              {currentScenario.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    className={`${styles.choiceBtn} ${isSelected ? styles.choiceBtnSelected : ''}`}
                    onClick={() => handleSelectChoice(choice)}
                  >
                    <span className={styles.choiceText}>{choice.text}</span>
                    {isSelected && <Sparkles size={16} className={styles.choiceSparkle} />}
                  </button>
                );
              })}
            </div>

            {/* Spatial Consequence Outcome */}
            {activeConsequence && (
              <div 
                className={`${styles.consequenceBanner} ${activeConsequence.isConstitutional ? styles.consequenceSuccess : styles.consequenceWarning}`}
                role="status"
              >
                <div className={styles.consequenceHeader}>
                  {activeConsequence.isConstitutional ? (
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                  ) : (
                    <Info size={18} style={{ color: '#D97706', flexShrink: 0 }} />
                  )}
                  <strong>
                    {activeConsequence.isConstitutional ? 'Constitutional Equilibrium Achieved on Desk!' : 'Classroom Imbalance Observed'}
                  </strong>
                </div>

                <p className={styles.consequenceSpatialEffect}>
                  <strong>Physical Model Consequence:</strong> {activeConsequence.consequence}
                </p>

                <p className={styles.consequenceReasoning}>
                  {activeConsequence.explanation}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Two-Column Deep-Dive Grid: Feature Highlights & Assessment */}
        <div className={styles.detailsGrid}>
          {/* Column 1: Station Overview & Interactive Values */}
          <article className={styles.learningCard}>
            <div className={styles.cardHeaderRow}>
              <span className={styles.articleBadge}>{currentStation.articleRef}</span>
              <span className={styles.categoryBadge}>{currentStation.category}</span>
            </div>

            <h2 className={styles.stationTitle}>
              {currentStation.title}
            </h2>
            <p className={styles.stationSubtitle}>
              {currentStation.subtitle}
            </p>

            <p className={styles.stationOverview}>
              {currentStation.overview}
            </p>

            {/* Interactive Spoke Exploration */}
            {currentStation.spokeValues && (
              <div className={styles.featureBox}>
                <strong className={styles.featureTitle}>
                  Explore the 24 Dharma Principles (Tap to inspect):
                </strong>
                <div className={styles.featurePillRow}>
                  {currentStation.spokeValues.map((spoke) => (
                    <button
                      key={spoke.id}
                      type="button"
                      className={`${styles.featurePill} ${inspectedDetail?.id === spoke.id ? styles.featurePillActive : ''}`}
                      onClick={() => handleInspectDetail(spoke)}
                    >
                      {spoke.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Writs Exploration */}
            {currentStation.writs && (
              <div className={styles.featureBox}>
                <strong className={styles.featureTitle}>
                  The 5 Supreme Court Constitutional Writs (Article 32):
                </strong>
                <div className={styles.featurePillRow}>
                  {currentStation.writs.map((writ) => (
                    <button
                      key={writ.name}
                      type="button"
                      className={`${styles.featurePill} ${inspectedDetail?.name === writ.name ? styles.featurePillActive : ''}`}
                      onClick={() => handleInspectDetail(writ)}
                    >
                      {writ.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inspected Detail Card */}
            {inspectedDetail && (
              <div className={styles.inspectedCard} role="region" aria-label="Inspected Value Details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{inspectedDetail.name || inspectedDetail.meaning}</strong>
                  <button 
                    type="button" 
                    className={styles.closeDetailBtn} 
                    onClick={() => setInspectedDetail(null)}
                    aria-label="Close detail"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#334155' }}>
                  {inspectedDetail.description || inspectedDetail.purpose}
                </p>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to={`/world?realm=${currentStation.worldId}`} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
                <span>Explore Associated Realm in Story World</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* Column 2: Check-For-Understanding Reflection Quiz & Station Progression */}
          <aside className={styles.quizColumn}>
            {/* Student Workbook Reflection Quiz */}
            {currentQuiz && (
              <section className={styles.quizCard} aria-labelledby="ar-quiz-heading">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award size={18} style={{ color: '#DE7215' }} />
                    <h3 id="ar-quiz-heading" style={{ fontSize: '1.1rem', margin: 0, fontWeight: 750 }}>
                      Student Workbook Reflection
                    </h3>
                  </div>
                  <span className={styles.xpRewardPill}>+{currentStation.dignityXpReward} Dignity XP</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#1F2937', fontWeight: 600, lineHeight: 1.5, margin: '0 0 1rem' }}>
                  {currentQuiz.question}
                </p>

                <div>
                  {currentQuiz.options.map((option, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    let optionStyle = styles.quizOption;
                    if (isQuizSubmitted) {
                      if (idx === currentQuiz.correctIndex) {
                        optionStyle = `${styles.quizOption} ${styles.quizOptionSelectedCorrect}`;
                      } else if (isSelected) {
                        optionStyle = `${styles.quizOption} ${styles.quizOptionSelectedIncorrect}`;
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        className={optionStyle}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={isQuizSubmitted}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Feedback Banner */}
                {quizFeedback && (
                  <div 
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: quizFeedback.correct ? '#ECFDF5' : '#FEF2F2',
                      border: `1px solid ${quizFeedback.correct ? '#A7F3D0' : '#FECACA'}`,
                      color: quizFeedback.correct ? '#065F46' : '#991B1B',
                      fontSize: '0.82rem',
                      lineHeight: 1.5
                    }}
                    role="status"
                  >
                    {quizFeedback.message}
                  </div>
                )}
              </section>
            )}

            {/* Classroom Lesson Progression Card */}
            <div className={styles.progressionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  Classroom Curriculum Journey
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-family-mono)' }}>
                  {completedObjects.size} of {AR_CONSTITUTIONAL_STATIONS.length} Lessons Mastered
                </span>
              </div>

              {/* Progress Dots */}
              <div className={styles.progressDotsRow}>
                {AR_CONSTITUTIONAL_STATIONS.map((st, i) => {
                  const isDone = completedObjects.has(st.id);
                  const isCurr = st.id === selectedId;
                  return (
                    <div 
                      key={st.id} 
                      className={`${styles.progressDot} ${isDone ? styles.progressDotDone : ''} ${isCurr ? styles.progressDotCurrent : ''}`}
                      title={`Lesson ${i + 1}: ${st.title}`}
                    />
                  );
                })}
              </div>

              <div className={styles.stationNavButtons}>
                <button
                  type="button"
                  className={styles.prevBtn}
                  onClick={handlePrevStation}
                  aria-label="Previous classroom lesson"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNextStation}
                  aria-label="Next classroom lesson"
                >
                  <span>Next Lesson</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Miniature 5 Realms Connection Section */}
        <section className={styles.miniRealmsSection} aria-labelledby="mini-realms-heading">
          <h3 id="mini-realms-heading" style={{ fontSize: '1.15rem', margin: '0 0 0.25rem', fontFamily: 'var(--font-family-display)' }}>
            The Five Connected Living Realms
          </h3>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-ink-muted)' }}>
            Each classroom learning artifact anchors an illustrated story landscape in RightsQuest India.
          </p>

          <div className={styles.realmsGrid}>
            {AR_MINIATURE_REALMS.map((realm) => (
              <Link 
                key={realm.id} 
                to={`/world?realm=${realm.id}`}
                className={styles.realmMiniCard}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '1.2rem' }} aria-hidden="true">{realm.icon}</span>
                  <strong style={{ fontSize: '0.85rem' }}>{realm.name}</strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#DE7215', fontFamily: 'var(--font-family-mono)', marginBottom: '0.25rem' }}>
                  {realm.article}
                </div>
                <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B', lineHeight: 1.4 }}>
                  {realm.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
