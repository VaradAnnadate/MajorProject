/**
 * DialogueBox — Visual novel style dialogue display.
 * Smooth GSAP typewriter reveal, distinct speaker styles,
 * Mitra fox indicator for companion lines.
 */
import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './DialogueBox.module.css';

const SPEAKER_VARIANTS = {
  narrator: 'narrator',
  mitra: 'mitra',
};

function getSpeakerVariant(speaker) {
  if (speaker === 'narrator') return 'narrator';
  if (speaker === 'mitra') return 'mitra';
  return 'character';
}

// Mitra inline fox icon (simplified SVG)
function MitraIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={styles.mitraIcon}
    >
      <circle cx="18" cy="18" r="17" fill="rgba(222,114,21,0.18)" stroke="#DE7215" strokeWidth="1.5" />
      {/* ears */}
      <polygon points="8,14 13,6 16,14" fill="#DE7215" />
      <polygon points="28,14 23,6 20,14" fill="#DE7215" />
      {/* face */}
      <ellipse cx="18" cy="20" rx="9" ry="8" fill="#F28B36" />
      {/* chest patch */}
      <ellipse cx="18" cy="23" rx="5" ry="4" fill="#FBF4E4" />
      {/* eyes */}
      <circle cx="14.5" cy="18.5" r="1.8" fill="#151A26" />
      <circle cx="21.5" cy="18.5" r="1.8" fill="#151A26" />
      <circle cx="15.1" cy="18" r="0.6" fill="white" />
      <circle cx="22.1" cy="18" r="0.6" fill="white" />
      {/* nose */}
      <ellipse cx="18" cy="21.5" rx="1.4" ry="0.9" fill="#B34C1B" />
    </svg>
  );
}

export default function DialogueBox({ dialogue, onComplete }) {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const tweenRef = useRef(null);

  const variant = dialogue ? getSpeakerVariant(dialogue.speaker) : 'narrator';

  const runTypewriter = useCallback(() => {
    if (!textRef.current || !dialogue?.text) return;
    const el = textRef.current;
    const fullText = dialogue.text;
    el.textContent = '';

    // Kill previous tween
    if (tweenRef.current) tweenRef.current.kill();

    const obj = { progress: 0 };
    tweenRef.current = gsap.to(obj, {
      progress: 1,
      duration: Math.min(fullText.length * 0.028, 4.5),
      ease: 'none',
      onUpdate() {
        const chars = Math.floor(obj.progress * fullText.length);
        el.textContent = fullText.slice(0, chars);
      },
      onComplete() {
        el.textContent = fullText;
        if (onComplete) onComplete();
      },
    });
  }, [dialogue, onComplete]);

  useEffect(() => {
    if (!dialogue) return;
    // Fade in container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', onComplete: runTypewriter }
    );
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [dialogue?.id]); // Re-run only when dialogue id changes

  // Skip animation on click
  const handleSkip = useCallback(() => {
    if (!tweenRef.current || !dialogue?.text || !textRef.current) return;
    if (tweenRef.current.progress() < 1) {
      tweenRef.current.kill();
      textRef.current.textContent = dialogue.text;
      if (onComplete) onComplete();
    }
  }, [dialogue, onComplete]);

  if (!dialogue) return null;

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${styles[`variant_${variant}`]}`}
      onClick={handleSkip}
      role="region"
      aria-label="Story dialogue"
      aria-live="polite"
    >
      {/* Speaker label row */}
      <div className={styles.speakerRow}>
        {variant === 'mitra' && <MitraIcon />}
        <span className={`${styles.speakerDot} ${styles[`dot_${variant}`]}`} aria-hidden="true" />
        <span className={styles.speakerLabel}>
          {dialogue.speakerLabel}
        </span>
        {dialogue.type === 'narrative' && (
          <span className={styles.typePill}>Narrative</span>
        )}
        {dialogue.type === 'reveal' && (
          <span className={`${styles.typePill} ${styles.revealPill}`}>Reveal</span>
        )}
        {dialogue.type === 'evidence' && (
          <span className={`${styles.typePill} ${styles.evidencePill}`}>Evidence</span>
        )}
      </div>

      {/* Dialogue text */}
      <p ref={textRef} className={styles.text} />

      {/* Advance hint */}
      <div className={styles.advanceHint} aria-hidden="true">
        <span className={styles.hintDot} />
        <span className={styles.hintDot} />
        <span className={styles.hintDot} />
      </div>
    </div>
  );
}

