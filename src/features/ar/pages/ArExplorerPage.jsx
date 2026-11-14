import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  X, 
  Info, 
  Lock,
  Layers,
  Award
} from 'lucide-react';
import { AR_CONSTITUTIONAL_OBJECTS, AR_MINIATURE_REALMS } from '../data/arConstitutionalObjects';
import { ArSceneEngine } from '../engine/ArSceneEngine';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import styles from './ArExplorerPage.module.css';

export default function ArExplorerPage() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  const { awardReward } = useDemoLearner();

  const [selectedId, setSelectedId] = useState('ashoka-chakra');
  const [isArSupported, setIsArSupported] = useState(false);
  const [isArActive, setIsArActive] = useState(false);
  const [arStatusMessage, setArStatusMessage] = useState('');
  const [arError, setArError] = useState(null);

  // Quiz state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [completedObjects, setCompletedObjects] = useState(new Set());

  const currentObject = AR_CONSTITUTIONAL_OBJECTS.find((obj) => obj.id === selectedId) || AR_CONSTITUTIONAL_OBJECTS[0];

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
      engine.loadConstitutionalObject(currentObject);
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
    if (engineRef.current && currentObject) {
      engineRef.current.loadConstitutionalObject(currentObject);
      // Reset quiz state for new object
      setSelectedOptionIndex(null);
      setIsQuizSubmitted(false);
      setQuizFeedback(null);
    }
  }, [currentObject]);

  // Handle AR Session launch
  const handleLaunchAr = async () => {
    setArError(null);
    if (!engineRef.current) return;

    try {
      await engineRef.current.startArSession();
      setIsArActive(true);
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
  };

  // Handle Quiz Answer
  const handleQuizAnswer = (optionIndex) => {
    if (isQuizSubmitted) return;
    setSelectedOptionIndex(optionIndex);
    setIsQuizSubmitted(true);

    const isCorrect = optionIndex === currentObject.quiz.correctIndex;
    if (isCorrect) {
      setQuizFeedback({
        correct: true,
        message: `Excellent! ${currentObject.quiz.explanation}`,
      });

      // Award Dignity XP idempotently
      if (!completedObjects.has(currentObject.id)) {
        setCompletedObjects((prev) => new Set([...prev, currentObject.id]));
        if (awardReward) {
          awardReward({
            eventType: 'RIGHTS_DISCOVERY',
            sourceId: `ar-${currentObject.id}`,
            metadata: {
              articleName: currentObject.articleRef,
              objectTitle: currentObject.title,
            },
          });
        }
      }
    } else {
      setQuizFeedback({
        correct: false,
        message: `Not quite right, but every try teaches us something! ${currentObject.quiz.explanation}`,
      });
    }
  };

  return (
    <div className={styles.arPage}>
      {/* Editorial Header */}
      <header className={styles.heroHeader}>
        <div className="container-editorial">
          <div className={styles.badgeRow}>
            <span className="editorial-eyebrow">Creative OS · 3D Constitutional Reality</span>
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
          </div>

          <h1 className="hero-headline" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', margin: '0 0 var(--space-3)' }}>
            Bring the Constitution to Life
          </h1>

          <p className="text-lead" style={{ maxWidth: '680px', margin: '0 0 var(--space-4)' }}>
            Place the 24-spoke Ashoka Chakra and India's Fundamental Rights directly onto your desk or floor. 
            Rotate, inspect, and explore constitutional wisdom with Mitra your 3D guardian guide.
          </p>

          {/* Child Privacy Shield Banner */}
          <div className={styles.privacyNotice} role="note">
            <Lock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Child Privacy & Safeguarding Shield:</strong> Camera tracking runs exclusively within your 
              browser's local WebXR engine to place objects in your room. Zero photographs or videos are recorded, 
              zero frames are uploaded, and zero biometric data is collected (DPDP Act 2023 §9 compliant).
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

        {/* 3D / AR Viewport Stage */}
        <section className={styles.stageContainer} aria-label="Constitutional Object 3D Stage">
          <canvas ref={canvasRef} className={styles.canvas} />

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
                Drag to rotate · Scroll to zoom · Tap model to explore
              </span>
            )}
          </div>
        </section>

        {/* Object Selector Tabs */}
        <nav className={styles.objectSelector} aria-label="Constitutional Objects Selector">
          {AR_CONSTITUTIONAL_OBJECTS.map((obj) => {
            const isActive = obj.id === selectedId;
            return (
              <button
                key={obj.id}
                type="button"
                className={`${styles.objectTab} ${isActive ? styles.objectTabActive : ''}`}
                onClick={() => setSelectedId(obj.id)}
                aria-pressed={isActive}
              >
                <span>{obj.title}</span>
                {completedObjects.has(obj.id) && (
                  <CheckCircle2 size={14} style={{ color: isActive ? '#34D399' : '#10B981' }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Two-Column Learning & Quiz Grid */}
        <div className={styles.detailsGrid}>
          {/* Column 1: Object Overview & Real World Context */}
          <article className={styles.learningCard}>
            <span className={styles.articleBadge}>{currentObject.articleRef}</span>
            <h2 style={{ fontSize: '1.45rem', margin: '0 0 0.5rem', fontFamily: 'var(--font-family-display)' }}>
              {currentObject.title}
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-ink-secondary)', lineHeight: 1.6, margin: '0 0 1rem' }}>
              {currentObject.description}
            </p>

            {/* Everyday Real-World Scenario */}
            <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
              <strong style={{ display: 'block', fontSize: '0.82rem', color: '#0F172A', marginBottom: '0.25rem' }}>
                Everyday Scenario for Young Citizens:
              </strong>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                {currentObject.realWorldExample}
              </p>
            </div>

            {/* Mitra Guardian Guidance */}
            <div className={styles.mitraSpeech} role="note">
              <span style={{ fontSize: '1.8rem' }} aria-hidden="true">🦊</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.82rem', color: '#DE7215', marginBottom: '0.2rem' }}>
                  Mitra Companion says:
                </strong>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                  "{currentObject.mitraPrompt}"
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <Link to={`/world?realm=${currentObject.worldId}`} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
                <span>Explore Associated Realm in Story World</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* Column 2: Check-For-Understanding Reflection Quiz */}
          <section className={styles.quizCard} aria-labelledby="ar-quiz-heading">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Award size={18} style={{ color: '#DE7215' }} />
              <h3 id="ar-quiz-heading" style={{ fontSize: '1.1rem', margin: 0, fontWeight: 750 }}>
                Check Your Constitutional Insight
              </h3>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#1F2937', fontWeight: 600, lineHeight: 1.5, margin: '0 0 1rem' }}>
              {currentObject.quiz.question}
            </p>

            <div>
              {currentObject.quiz.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                let optionStyle = styles.quizOption;
                if (isQuizSubmitted) {
                  if (idx === currentObject.quiz.correctIndex) {
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

