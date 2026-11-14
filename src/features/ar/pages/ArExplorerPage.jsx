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
  HelpCircle
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

  const { activeAgeBand, setAgeBand, ageBands, awardReward } = useDemoLearner();

  // Current station selection
  const [selectedId, setSelectedId] = useState('ashoka-chakra');

  // Age band selection (defaults to context activeAgeBand or '8-10')
  const currentAgeKey = useMemo(() => {
    const bandId = activeAgeBand?.id || '8-10';
    if (bandId.includes('14') || bandId.includes('16')) return '14-16';
    if (bandId.includes('11') || bandId.includes('13')) return '11-13';
    return '8-10';
  }, [activeAgeBand]);

  // WebXR AR state
  const [isArSupported, setIsArSupported] = useState(false);
  const [isArActive, setIsArActive] = useState(false);
  const [arStatusMessage, setArStatusMessage] = useState('');
  const [arError, setArError] = useState(null);

  // Mitra state & Speech
  const [mitraEmotion, setMitraEmotionState] = useState('welcome');
  const [mitraMessage, setMitraMessage] = useState('');

  // Scenario decision state
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [activeConsequence, setActiveConsequence] = useState(null);

  // Interactive spoke / writ inspection state
  const [inspectedDetail, setInspectedDetail] = useState(null);

  // Check-for-understanding Quiz state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [completedObjects, setCompletedObjects] = useState(new Set());

  // Find current station from catalog
  const currentStationIndex = useMemo(() => {
    const idx = AR_CONSTITUTIONAL_STATIONS.findIndex((st) => st.id === selectedId);
    return idx >= 0 ? idx : 0;
  }, [selectedId]);

  const currentStation = AR_CONSTITUTIONAL_STATIONS[currentStationIndex] || AR_CONSTITUTIONAL_STATIONS[0];
  // Backward compatibility alias
  const currentObject = currentStation;

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

  // 2. Initialize Three.js Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const engine = new ArSceneEngine(canvasRef.current, {
        onObjectClick: (data) => {
          if (data?.id) setSelectedId(data.id);
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
      engine.loadConstitutionalStation(currentStation);
      setMitraMessage(currentStation.mitraPrompt || 'Welcome to the Constitutional AR Explorer!');
    } catch (err) {
      console.warn('Could not initialize Three.js AR Scene Engine:', err);
      setArError('Interactive 3D graphics initialization failed on this device.');
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  // 3. Swap 3D Model when selection changes
  useEffect(() => {
    if (engineRef.current && currentStation) {
      engineRef.current.loadConstitutionalStation(currentStation);
      engineRef.current.setMitraEmotion('welcome');
      setMitraEmotionState('welcome');
      setMitraMessage(currentStation.mitraPrompt || 'Explore this constitutional pillar!');

      // Reset scenario and quiz state for new station
      setSelectedChoiceId(null);
      setActiveConsequence(null);
      setInspectedDetail(null);
      setSelectedOptionIndex(null);
      setIsQuizSubmitted(false);
      setQuizFeedback(null);
    }
  }, [currentStation]);

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
      setMitraMessage('WebXR AR active! Scan your floor or desk and tap to place your constitutional monument.');
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
    setMitraMessage('Returned to interactive 3D studio.');
  };

  // Handle Scenario Choice Selection
  const handleSelectChoice = (choice) => {
    setSelectedChoiceId(choice.id);
    setActiveConsequence(choice);

    // Trigger physical 3D spatial animation in engine
    if (engineRef.current && choice.spatialEffect) {
      engineRef.current.triggerSpatialEffect(choice.spatialEffect);
    }

    // Set Mitra emotion and speech
    if (choice.isConstitutional) {
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('celebrating');
      }
      setMitraEmotionState('celebrating');
      setMitraMessage(`Superb choice! ${choice.explanation}`);
    } else {
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('concerned');
      }
      setMitraEmotionState('concerned');
      setMitraMessage(`Take another look: ${choice.explanation}`);
    }
  };

  // Handle Spoke or Writ Detail Inspection
  const handleInspectDetail = (item) => {
    setInspectedDetail(item);
    if (engineRef.current?.setMitraEmotion) {
      engineRef.current.setMitraEmotion('explaining');
    }
    setMitraEmotionState('explaining');
    setMitraMessage(`Inspecting ${item.name || item.meaning}: ${item.description || item.purpose}`);
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
        message: `Excellent! ${currentQuiz.explanation || 'You mastered this constitutional principle!'}`,
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
        message: `Not quite right, but every try teaches us something! ${currentQuiz.explanation || 'Review the constitutional article above and try again.'}`,
      });
      if (engineRef.current?.setMitraEmotion) {
        engineRef.current.setMitraEmotion('concerned');
      }
      setMitraEmotionState('concerned');
    }
  };

  // Navigate to Next Station
  const handleNextStation = () => {
    const nextIdx = (currentStationIndex + 1) % AR_CONSTITUTIONAL_STATIONS.length;
    setSelectedId(AR_CONSTITUTIONAL_STATIONS[nextIdx].id);
  };

  // Navigate to Previous Station
  const handlePrevStation = () => {
    const prevIdx = (currentStationIndex - 1 + AR_CONSTITUTIONAL_STATIONS.length) % AR_CONSTITUTIONAL_STATIONS.length;
    setSelectedId(AR_CONSTITUTIONAL_STATIONS[prevIdx].id);
  };

  return (
    <div className={styles.arPage}>
      {/* Editorial Header */}
      <header className={styles.heroHeader}>
        <div className="container-editorial">
          <div className={styles.badgeRow}>
            <span className="editorial-eyebrow">Creative OS · Spatial Constitutional Experience</span>
            {isArSupported ? (
              <span className={`${styles.statusPill} ${styles.statusPillAr}`}>
                <Camera size={13} aria-hidden="true" />
                WebXR AR Compatible
              </span>
            ) : (
              <span className={styles.statusPill}>
                <Layers size={13} aria-hidden="true" />
                Interactive 3D Stage (Universal Fallback)
              </span>
            )}
            <span className={styles.stationTrackerBadge}>
              Station {currentStation.stationNumber} of {AR_CONSTITUTIONAL_STATIONS.length} · {completedObjects.size} Completed
            </span>
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', margin: '0 0 var(--space-3)' }}>
            Bring the Constitution to Life
          </h1>

          <p className="text-lead" style={{ maxWidth: '720px', margin: '0 0 var(--space-4)' }}>
            Step through 6 interactive constitutional stations with Mitra your 3D sun-fox companion.
            Place India's Fundamental Rights on your desk with WebXR AR or explore them on the architectural 3D stage.
          </p>

          {/* Age Adaptation & Child Privacy Row */}
          <div className={styles.headerControlGrid}>
            {/* Age Tier Selector */}
            <div className={styles.ageSelectorContainer} role="group" aria-label="Learning Age Band Adaptation">
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

            {/* Child Privacy Shield Banner */}
            <div className={styles.privacyNotice} role="note">
              <Lock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Child Privacy & Safeguarding Shield:</strong> Camera tracking runs exclusively within your 
                browser's local WebXR device engine to place objects in your room. Zero photographs or videos are recorded, 
                zero frames are uploaded, and zero biometric data is collected (DPDP Act 2023 §9 compliant).
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
            {arError} Continuing in 3D Universal Fallback mode below.
          </div>
        )}

        {/* Station Navigation Journey Ribbon */}
        <nav className={styles.stationRibbon} aria-label="Constitutional Stations Ribbon">
          <div className={styles.ribbonScroll}>
            {AR_CONSTITUTIONAL_STATIONS.map((station, idx) => {
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
                  <span className={styles.stationPillTitle}>{station.title}</span>
                  {isDone && <CheckCircle2 size={14} className={styles.doneCheck} />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 3D / AR Viewport Stage */}
        <section className={styles.stageContainer} aria-label="Constitutional Spatial 3D Stage">
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
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {isArSupported && !isArActive ? (
                <button
                  type="button"
                  className={styles.arActionBtn}
                  onClick={handleLaunchAr}
                  aria-label="Launch WebXR Augmented Reality Camera"
                >
                  <Camera size={16} aria-hidden="true" />
                  <span>Launch WebXR AR</span>
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
                  <span>Exit AR Mode</span>
                </button>
              ) : null}

              {isArActive && arStatusMessage && (
                <span className={styles.stageTip} role="status">
                  {arStatusMessage}
                </span>
              )}
            </div>

            {!isArActive && (
              <span className={styles.stageTip}>
                Drag to rotate · Scroll to zoom · Tap object to inspect
              </span>
            )}
          </div>
        </section>

        {/* Two-Column Spatial Learning & Scenario Grid */}
        <div className={styles.detailsGrid}>
          {/* Column 1: Spatial Dilemma & Interactive Consequence */}
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

            {/* Interactive Spoke / Writ Feature Highlights */}
            {currentStation.spokeValues && (
              <div className={styles.featureBox}>
                <strong className={styles.featureTitle}>
                  Explore the 24 Dharma Spokes (Tap a value to inspect in 3D):
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

            {/* Active Detail Inspection Card */}
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

            {/* Spatial Scenario Dilemma */}
            {currentScenario && (
              <section className={styles.scenarioSection} aria-labelledby="scenario-heading">
                <div className={styles.scenarioHeader}>
                  <Compass size={16} className={styles.scenarioIcon} />
                  <h3 id="scenario-heading" className={styles.scenarioTitle}>
                    Spatial Constitutional Dilemma ({currentAgeKey} Tier)
                  </h3>
                </div>

                <p className={styles.scenarioContext}>
                  {currentScenario.context}
                </p>

                <div className={styles.dilemmaPrompt}>
                  <strong>The Dilemma:</strong> {currentScenario.dilemma}
                </div>

                {/* Branching Decision Choices */}
                <div className={styles.choicesGrid} role="group" aria-label="Dilemma Action Choices">
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

                {/* Spatial Consequence Outcome Banner */}
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
                        {activeConsequence.isConstitutional ? 'Constitutional Equilibrium Achieved!' : 'Constitutional Reflection Needed'}
                      </strong>
                    </div>

                    <p className={styles.consequenceSpatialEffect}>
                      <strong>3D Spatial Consequence:</strong> {activeConsequence.consequence}
                    </p>

                    <p className={styles.consequenceReasoning}>
                      {activeConsequence.explanation}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* Story World Realm Link */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to={`/world?realm=${currentStation.worldId}`} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
                <span>Explore Associated Realm in Story World</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* Column 2: Check-For-Understanding Reflection Quiz & Station Progression */}
          <aside className={styles.quizColumn}>
            {/* Reflection Quiz Card */}
            {currentQuiz && (
              <section className={styles.quizCard} aria-labelledby="ar-quiz-heading">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award size={18} style={{ color: '#DE7215' }} />
                    <h3 id="ar-quiz-heading" style={{ fontSize: '1.1rem', margin: 0, fontWeight: 750 }}>
                      Check Your Constitutional Insight
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

            {/* Station Progression Card */}
            <div className={styles.progressionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  Constitutional Journey
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-family-mono)' }}>
                  {completedObjects.size} of {AR_CONSTITUTIONAL_STATIONS.length} Stations Completed
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
                      title={`Station ${i + 1}: ${st.title}`}
                    />
                  );
                })}
              </div>

              <div className={styles.stationNavButtons}>
                <button
                  type="button"
                  className={styles.prevBtn}
                  onClick={handlePrevStation}
                  aria-label="Previous constitutional station"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNextStation}
                  aria-label="Next constitutional station"
                >
                  <span>Next Station</span>
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
            Each 3D object anchors an illustrated landscape in RightsQuest India.
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
