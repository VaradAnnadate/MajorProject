import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  X, 
  Info, 
  Lock,
  Layers,
  Award,
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

  // Adaptive Age Tier Key state ('8-10' | '11-13' | '14-16') with context synchronization
  const [selectedAgeTier, setSelectedAgeTier] = useState(() => {
    const bandId = activeAgeBand?.id || 'band-8-10';
    if (bandId.includes('14') || bandId.includes('16')) return '14-16';
    if (bandId.includes('11') || bandId.includes('13')) return '11-13';
    return '8-10';
  });

  // Keep in sync with activeAgeBand if externally modified
  useEffect(() => {
    if (activeAgeBand?.id) {
      if (activeAgeBand.id.includes('14') || activeAgeBand.id.includes('16')) {
        setSelectedAgeTier('14-16');
      } else if (activeAgeBand.id.includes('11') || activeAgeBand.id.includes('13')) {
        setSelectedAgeTier('11-13');
      } else {
        setSelectedAgeTier('8-10');
      }
    }
  }, [activeAgeBand]);

  const currentAgeKey = selectedAgeTier;

  const handleSelectAgeTier = useCallback((tierKey) => {
    setSelectedAgeTier(tierKey);
    if (setAgeBand) {
      setAgeBand(`band-${tierKey}`);
    }
  }, [setAgeBand]);

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
  const [focusedObject, setFocusedObject] = useState(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [artifactTransform, setArtifactTransform] = useState({
    stationId: 'ashoka-chakra',
    stationTitle: 'The Sovereign Ashoka Chakra',
    rotationDegrees: 0,
    scalePercent: 100,
    apparentSize: '62.1 cm apparent',
    physicalMetricSize: '39.2 cm (diameter)',
    isArActive: false,
    isPlacedInAr: false,
    isWallDetected: false,
    canPlace: false,
  });

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
          setHasUserInteracted(true);
          if (action.message) {
            setMitraMessage(action.message);
          }
          if (action.part && action.part !== 'overview' && action.part !== 'balance-pan') {
            setFocusedObject({
              part: action.part,
              title: action.title || action.part,
              badge: action.badge || 'Classroom Discovery',
              message: action.message,
            });
          } else if (action.part === 'overview') {
            setFocusedObject(null);
          }
        },
        onArSessionEnd: () => {
          setIsArActive(false);
          setArStatusMessage('');
        },
        onPlacementStatus: (msg) => {
          setArStatusMessage(msg);
        },
        onTransformChange: (t) => {
          if (t) setArtifactTransform(t);
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
    setMitraMessage('Returned to your 3D virtual classroom wall exhibit.');
  };

  // Whole-Classroom Navigation & Focal Object Interactions
  const handleResetCameraView = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.resetCameraOverview();
    }
    setFocusedObject(null);
  }, []);

  const handleFocusClassroomObject = useCallback((objectKey) => {
    setHasUserInteracted(true);
    if (engineRef.current) {
      engineRef.current.focusOnObject(objectKey);
    }
  }, []);

  const handleRepositionExhibit = () => {
    if (engineRef.current?.repositionExhibit) {
      engineRef.current.repositionExhibit();
      setMitraMessage('Scan a vertical classroom wall in your room and tap to mount the exhibit.');
    }
  };

  // Universal Keyboard Spatial Navigation Controls for Accessibility
  const handleStageKeyDown = (e) => {
    setHasUserInteracted(true);
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (engineRef.current) {
          engineRef.current.activeFocusObject = null;
          engineRef.current.desiredCameraYaw = Math.max(-0.65, Math.min(0.65, engineRef.current.desiredCameraYaw + 0.1));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (engineRef.current) {
          engineRef.current.activeFocusObject = null;
          engineRef.current.desiredCameraYaw = Math.max(-0.65, Math.min(0.65, engineRef.current.desiredCameraYaw - 0.1));
        }
        break;
      case 'ArrowUp':
      case '+':
      case '=':
        e.preventDefault();
        if (engineRef.current) {
          engineRef.current.activeFocusObject = null;
          engineRef.current.desiredCameraDistance = Math.max(1.5, Math.min(5.2, engineRef.current.desiredCameraDistance - 0.3));
        }
        break;
      case 'ArrowDown':
      case '-':
      case '_':
        e.preventDefault();
        if (engineRef.current) {
          engineRef.current.activeFocusObject = null;
          engineRef.current.desiredCameraDistance = Math.max(1.5, Math.min(5.2, engineRef.current.desiredCameraDistance + 0.3));
        }
        break;
      case 'r':
      case 'R':
      case 'Escape':
        e.preventDefault();
        handleResetCameraView();
        break;
      case '1':
        e.preventDefault();
        handleFocusClassroomObject('blackboard');
        break;
      case '2':
        e.preventDefault();
        handleFocusClassroomObject('exhibit');
        break;
      case '3':
        e.preventDefault();
        handleFocusClassroomObject('charter');
        break;
      case '4':
        e.preventDefault();
        handleFocusClassroomObject('mitra');
        break;
      case '5':
        e.preventDefault();
        handleFocusClassroomObject('desk');
        break;
      default:
        break;
    }
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
            <span className="editorial-eyebrow">Creative OS · RightsQuest Living Classroom Wall Exhibits</span>
            {isArSupported ? (
              <span className={`${styles.statusPill} ${styles.statusPillAr}`}>
                <Camera size={13} aria-hidden="true" />
                WebXR AR Capable · Mount on Real Classroom Wall
              </span>
            ) : (
              <span className={styles.statusPill}>
                <Layers size={13} aria-hidden="true" />
                Virtual Classroom Studio · Wall Exhibit 3D Fallback
              </span>
            )}
            <span className={styles.stationTrackerBadge}>
              <GraduationCap size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Lesson {currentStation.stationNumber} of {AR_CONSTITUTIONAL_STATIONS.length} · {completedObjects.size} Mastered
            </span>
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.2rem)', margin: '0 0 var(--space-3)' }}>
            Discover Constitutional Exhibits on Your Classroom Wall
          </h1>

          <p className="text-lead" style={{ maxWidth: '720px', margin: '0 0 var(--space-4)' }}>
            Welcome to our hands-on constitutional classroom. Explore compact 35–45 cm constitutional exhibits mounted on your classroom wall with Mitra in Mode A: Live Camera WebXR AR. Place the exhibit onto your physical room wall via camera passthrough, explore the classroom landmarks, and resolve living dilemmas.
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
                      onClick={() => handleSelectAgeTier(band.id)}
                      aria-pressed={isCurrent}
                      data-testid={`age-tier-${band.id}`}
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

        {/* Experience Mode Banner: Mode A Augmented Reality Wall Exhibit Experience */}
        <div 
          className={`${styles.modeBanner} ${styles.modeBannerAr}`}
          role="region"
          aria-label="Experience Mode Indicator"
        >
          <div className={styles.modeBannerHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={18} className={styles.modeIconAr} aria-hidden="true" />
              <h2 className={styles.modeBannerTitle}>
                Mode A: Live Camera WebXR AR (Wall Placement)
              </h2>
            </div>
            <span className={styles.modeBannerBadge}>
              {isArActive ? 'Camera Passthrough Active · Real Classroom Wall' : 'Augmented Reality (AR) · Interactive Wall Exhibit'}
            </span>
          </div>
          <p className={styles.modeBannerText}>
            {isArActive
              ? 'Your physical room camera is active via WebXR. Scan and tap any vertical wall surface to mount this compact 35–45 cm constitutional exhibit flush against your wall. Zero camera video or photos are saved or uploaded (DPDP Act 2023 §9).'
              : 'Augmented Reality constitutional learning experience. Explore living constitutional exhibits calibrated to physical 35–45 cm dimensions. Tap "Mount on Real Wall (AR)" to project directly onto your physical room wall via WebXR camera passthrough.'}
          </p>
        </div>

        {/* 3D / AR Viewport Stage (Virtual Classroom & Real AR Placement) */}
        <section 
          className={styles.stageContainer} 
          tabIndex={0}
          onKeyDown={handleStageKeyDown}
          aria-label="Classroom Wall Exhibit Stage. Use Arrow Keys to rotate, +/- to zoom, R to reset view."
        >
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
                  aria-label="Launch WebXR Augmented Reality on your physical classroom wall"
                >
                  <Camera size={16} aria-hidden="true" />
                  <span>Mount on Real Wall (AR)</span>
                </button>
              ) : isArActive ? (
                <>
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
                  <button
                    type="button"
                    className={styles.arRepositionBtn}
                    onClick={handleRepositionExhibit}
                    title="Reposition Exhibit on Another Wall"
                    aria-label="Reposition Exhibit on Another Wall"
                  >
                    <Camera size={14} />
                    <span>Reposition on Wall</span>
                  </button>
                  <span className={artifactTransform.isWallDetected ? styles.wallBadgeValid : styles.wallBadgeInvalid}>
                    {artifactTransform.isWallDetected ? '✓ Vertical Wall Detected' : '⚠ Aim at Vertical Wall'}
                  </span>
                </>
              ) : null}

              {/* Natural Classroom Exploration Contextual Hint Banner */}
              {!isArActive && (
                <div 
                  className={`${styles.classroomGestureHint} ${hasUserInteracted ? styles.hintDimmed : ''}`}
                  role="status"
                  aria-live="polite"
                >
                  <Compass size={14} className={styles.gestureHintIcon} aria-hidden="true" />
                  <span>Drag to explore · Scroll or pinch to move closer · Tap classroom objects to discover</span>
                  {hasUserInteracted && (
                    <button 
                      type="button" 
                      className={styles.resetViewPill} 
                      onClick={handleResetCameraView}
                      title="Reset classroom overview"
                    >
                      Reset View
                    </button>
                  )}
                </div>
              )}
            </div>

            {isArActive && arStatusMessage && (
              <span className={styles.stageTip} role="status">
                {arStatusMessage}
              </span>
            )}
          </div>

          {/* Dismissible Interactive Classroom Object Focus Card */}
          {focusedObject && (
            <aside 
              className={styles.focusedObjectCard} 
              role="region" 
              aria-label={`Inspecting ${focusedObject.title}`}
            >
              <div className={styles.focusedObjectHeader}>
                <div className={styles.focusedObjectBadgeWrap}>
                  <Sparkles size={13} className={styles.focusedObjectSparkle} aria-hidden="true" />
                  <span className={styles.focusedObjectBadge}>{focusedObject.badge}</span>
                </div>
                <button
                  type="button"
                  className={styles.focusedObjectClose}
                  onClick={handleResetCameraView}
                  aria-label="Return to classroom overview"
                >
                  <X size={15} />
                </button>
              </div>
              <h3 className={styles.focusedObjectTitle}>{focusedObject.title}</h3>
              <p className={styles.focusedObjectMessage}>{focusedObject.message}</p>
              <div className={styles.focusedObjectActions}>
                <button
                  type="button"
                  className={styles.returnOverviewBtn}
                  onClick={handleResetCameraView}
                >
                  <Compass size={14} />
                  <span>Classroom Overview</span>
                </button>
                {focusedObject.part === 'exhibit' && (
                  <a
                    href="#constitutional-inquiry-section"
                    className={styles.inspectExhibitBtn}
                  >
                    <BookOpen size={14} />
                    <span>Study Lesson Below</span>
                  </a>
                )}
                {focusedObject.part === 'desk' && (
                  <a
                    href="#constitutional-inquiry-section"
                    className={styles.inspectExhibitBtn}
                  >
                    <GraduationCap size={14} />
                    <span>Open Civics Dilemma</span>
                  </a>
                )}
              </div>
            </aside>
          )}
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
            <span>Tip: The 35–45 cm model mounted on your classroom wall represents this principle. Test choices below to see physical cause-and-effect!</span>
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

        {/* AR vs 3D Simulation Capability Distinction Table */}
        <section className={styles.capabilitySection} aria-labelledby="capability-heading">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Layers size={20} style={{ color: 'var(--color-primary-600, #de7215)' }} />
            <h3 id="capability-heading" style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-family-display)' }}>
              AR vs 3D Simulation: Technical Architecture & Capability Distinction
            </h3>
          </div>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
            RightsQuest India maintains technical transparency regarding augmented reality capabilities. Rotating and zooming an exhibit inside a WebGL canvas provides an interactive 3D simulation. True Augmented Reality requires camera passthrough, real-world vertical surface detection (hit-testing), calibrated metric scaling (35–45 cm), and 6DoF spatial tracking.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.capabilityTable}>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">Technical Definition</th>
                  <th scope="col">RightsQuest Implementation</th>
                  <th scope="col">Verification Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3D Classroom Simulation</strong></td>
                  <td>Interactive 3D environment with wall, blackboard, preamble charter, desk, and exhibit transforms.</td>
                  <td><span className={styles.capabilityBadge3D}>Mode B: Classroom 3D Simulation</span></td>
                  <td>Active on all WebGL browsers</td>
                </tr>
                <tr>
                  <td><strong>Camera Passthrough</strong></td>
                  <td>User observes physical room surroundings via device video feed (zero recorded or uploaded frames).</td>
                  <td><span className={styles.capabilityBadgeAr}>Mode A: WebXR AR</span></td>
                  <td>Active on WebXR devices</td>
                </tr>
                <tr>
                  <td><strong>Wall Plane Hit-Testing</strong></td>
                  <td>Device recognises real vertical walls using <code>XRHitTestSource</code> raycasting.</td>
                  <td><span className={styles.capabilityBadgeAr}>Mode A: WebXR AR</span></td>
                  <td>Active on ARCore / WebXR</td>
                </tr>
                <tr>
                  <td><strong>Physical Metric Anchoring</strong></td>
                  <td>Exhibit anchored flush to physical wall at strictly calibrated 35–45 cm dimensions.</td>
                  <td><span className={styles.capabilityBadgeAr}>Mode A: WebXR AR</span></td>
                  <td>Active upon tap placement</td>
                </tr>
                <tr>
                  <td><strong>6DoF Spatial Tracking</strong></td>
                  <td>Real-time device position/orientation tracking keeps wall plaque firmly anchored while walking.</td>
                  <td><span className={styles.capabilityBadgeAr}>Mode A: WebXR AR</span></td>
                  <td>Active via XRFrame reference space</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

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
