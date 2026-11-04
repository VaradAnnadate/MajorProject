import React, { useState, useEffect } from 'react';
import { useDemoLearner } from '../../context/DemoLearnerContext';

/**
 * GOATED Creative OS Kinetic Intro
 * Refined per exact user direction:
 * 1. ONLY "RightsQuest" (NO .in)
 * 2. Ultra-attractive, sexy high-fashion editorial serif font (Cormorant Garamond)
 * 3. Kinetic letter entrance -> Hold -> Text fades UPWARDS into the dark
 * 4. Screen lifts up with curved arch & laser streak revealing the landing page
 */
export default function IntroPreloader() {
  const { 
    introPlaying, 
    setIntroCurtainLifting, 
    finishIntro 
  } = useDemoLearner();

  const [phase, setPhase] = useState('letters-in');
  const [revealedChars, setRevealedChars] = useState(0);

  // STRICTLY "RightsQuest" — NO .in
  const word = "RightsQuest";
  const letters = word.split('');

  useEffect(() => {
    if (!introPlaying) {
      setPhase('done');
      return;
    }

    setPhase('letters-in');
    setRevealedChars(0);

    // Stagger letter reveals (35ms per character)
    const letterTimers = letters.map((_, i) => {
      return setTimeout(() => {
        setRevealedChars(prev => Math.max(prev, i + 1));
      }, 70 + i * 38);
    });

    // Hold state
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 1050);

    // "text also goes fade up"
    const fadeUpTimer = setTimeout(() => {
      setPhase('fade-up');
    }, 1700);

    // Screen goes upper with curved arch & laser streak
    const curtainTimer = setTimeout(() => {
      setPhase('screen-lift');
      setIntroCurtainLifting(true);
    }, 2350);

    // Complete
    const doneTimer = setTimeout(() => {
      setPhase('done');
      finishIntro();
    }, 3200);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      letterTimers.forEach(t => clearTimeout(t));
      clearTimeout(holdTimer);
      clearTimeout(fadeUpTimer);
      clearTimeout(curtainTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [introPlaying]);

  const skip = () => {
    setPhase('done');
    finishIntro();
  };

  if (!introPlaying || phase === 'done') {
    return null;
  }

  const isFadingUp = phase === 'fade-up' || phase === 'screen-lift';
  const isScreenLifting = phase === 'screen-lift';

  return (
    <aside
      aria-label="Welcome Introduction"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#070A11',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: isScreenLifting ? 'none' : 'auto',
        // Smooth curved arch lift
        transform: isScreenLifting ? 'translateY(-105%)' : 'translateY(0%)',
        borderBottomLeftRadius: isScreenLifting ? '50% 190px' : '0px',
        borderBottomRightRadius: isScreenLifting ? '50% 190px' : '0px',
        transition: isScreenLifting 
          ? 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.85s ease-in' 
          : 'none',
        boxShadow: isScreenLifting ? '0 50px 100px rgba(0, 0, 0, 0.95)' : 'none',
        willChange: 'transform'
      }}
    >
      {/* Saffron & Cyan Laser Beam Streak along bottom border during lift */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(222, 114, 21, 0.9), rgba(255, 255, 255, 1), rgba(27, 109, 128, 0.9), transparent)',
          boxShadow: '0 0 20px rgba(222, 114, 21, 0.9), 0 0 40px rgba(255, 255, 255, 0.7)',
          opacity: isScreenLifting ? 1 : 0,
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Discrete Skip Option */}
      <button
        type="button"
        onClick={skip}
        style={{
          position: 'absolute',
          top: 'clamp(1.2rem, 3vw, 2.2rem)',
          right: 'clamp(1.2rem, 3vw, 2.5rem)',
          backgroundColor: 'transparent',
          border: '1px solid rgba(251, 248, 243, 0.12)',
          color: 'rgba(251, 248, 243, 0.5)',
          padding: '0.4rem 0.9rem',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-family-mono)',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          opacity: isFadingUp ? 0 : 0.7,
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FBF8F3';
          e.currentTarget.style.borderColor = 'rgba(251, 248, 243, 0.3)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(251, 248, 243, 0.5)';
          e.currentTarget.style.borderColor = 'rgba(251, 248, 243, 0.12)';
          e.currentTarget.style.opacity = '0.7';
        }}
      >
        SKIP [ESC]
      </button>

      {/* =========================================================================
          ONLY "RightsQuest" IN SEXY, ATTRACTIVE EDITORIAL SERIF
          - Staggered letter-by-letter reveal
          - Fades UPWARDS into the dark
          ========================================================================= */}
      <div 
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          padding: '0 var(--gutter)',
          // "text also goes fade up"
          transform: isFadingUp ? 'translateY(-55px)' : 'translateY(0)',
          opacity: isFadingUp ? 0 : 1,
          filter: isFadingUp ? 'blur(8px)' : 'blur(0px)',
          letterSpacing: isFadingUp ? '0.08em' : '0.01em',
          transition: isFadingUp 
            ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease, letter-spacing 0.6s ease'
            : 'none',
          willChange: 'transform, opacity, filter'
        }}
      >
        <div 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'baseline', 
            overflow: 'hidden',
            padding: '0.5rem 1rem' 
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', 'Bodoni Moda', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)',
              fontWeight: 600,
              fontStyle: 'normal',
              lineHeight: 1.05,
              color: '#FBF8F3',
              margin: 0,
              display: 'flex',
              alignItems: 'baseline',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 50px rgba(222, 114, 21, 0.35)',
              letterSpacing: '0.01em'
            }}
          >
            {/* Staggered Kinetic Letters */}
            {letters.map((char, index) => {
              const isRevealed = index < revealedChars;
              const isSpecial = char === 'R' || char === 'Q'; // Subtle emphasis on uppercase initials
              return (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    transform: isRevealed 
                      ? 'translateY(0%)' 
                      : 'translateY(120%)',
                    opacity: isRevealed ? 1 : 0,
                    color: isSpecial ? '#FFFFFF' : '#E8EFFB',
                    fontStyle: isSpecial ? 'italic' : 'normal',
                    transition: `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.012}s, opacity 0.4s ease ${index * 0.012}s`,
                    willChange: 'transform, opacity'
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
        </div>
      </div>
    </aside>
  );
}
