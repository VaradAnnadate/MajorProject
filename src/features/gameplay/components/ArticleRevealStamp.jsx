/**
 * ArticleRevealStamp — Constitutional article unlock celebration overlay.
 * Full-screen obsidian overlay, dramatic GSAP stamp animation with wobble,
 * circular stamp design, shimmer effect, "Continue Journey" CTA.
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ArticleRevealStamp.module.css';

function StampSVG({ articleReveal }) {
  const color = articleReveal.stampColor || '#297652';
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.stampSvg}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="160" cy="160" r="155" stroke={color} strokeWidth="4" strokeDasharray="12 6" opacity="0.6" />
      {/* Inner ring */}
      <circle cx="160" cy="160" r="140" stroke={color} strokeWidth="2.5" opacity="0.4" />
      {/* Inner fill */}
      <circle cx="160" cy="160" r="135" fill={color} fillOpacity="0.07" />
      {/* Centre solid */}
      <circle cx="160" cy="160" r="110" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" opacity="0.5" />

      {/* Stars / ornaments */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 160 + 148 * Math.cos(rad);
        const y = 160 + 148 * Math.sin(rad);
        return <circle key={deg} cx={x} cy={y} r="4" fill={color} opacity="0.5" />;
      })}

      {/* UNLOCKED banner */}
      <rect x="90" y="244" width="140" height="28" rx="6" fill={color} opacity="0.9" />
      <text
        x="160"
        y="263"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="13"
        fontWeight="700"
        fill="white"
        letterSpacing="4"
      >
        UNLOCKED
      </text>
    </svg>
  );
}

export default function ArticleRevealStamp({ articleReveal, visible, onDismiss }) {
  const overlayRef = useRef(null);
  const stampRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!visible || !overlayRef.current || !stampRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Reset
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(stampRef.current, { scale: 0, rotation: -15, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 24 });

    tl
      .to(overlayRef.current, { opacity: 1, duration: 0.4 })
      .to(stampRef.current, { scale: 1.15, rotation: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.4)' })
      .to(stampRef.current, { scale: 1, duration: 0.25, ease: 'power2.inOut' })
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');

    // Shimmer pulse
    tl.to(
      stampRef.current,
      {
        filter: 'drop-shadow(0 0 32px rgba(255,255,255,0.3))',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      },
      '-=0.2'
    );

    return () => tl.kill();
  }, [visible]);

  if (!articleReveal) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Article unlocked: ${articleReveal.article}`}
        >
          <div className={styles.inner}>
            {/* Stamp graphic */}
            <div ref={stampRef} className={styles.stampWrap}>
              <StampSVG articleReveal={articleReveal} />
              {/* Text content inside stamp area */}
              <div className={styles.stampTextLayer}>
                <span className={styles.articleNumber}>{articleReveal.article}</span>
                <h2 className={styles.articleTitle}>{articleReveal.title}</h2>
              </div>
            </div>

            {/* Text content below stamp */}
            <div ref={contentRef} className={styles.content}>
              <div className={styles.separator} aria-hidden="true" />
              <p className={styles.statText}>{articleReveal.text}</p>
              {articleReveal.actReference && (
                <span className={styles.actRef}>{articleReveal.actReference}</span>
              )}
              {articleReveal.xpReward && (
                <span className={styles.xpReward}>+{articleReveal.xpReward} XP earned</span>
              )}
              <button
                className={styles.cta}
                onClick={onDismiss}
                aria-label="Continue journey"
              >
                Continue Journey
                <span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

