/**
 * ChapterProgress — Top progress bar + chapter info strip.
 * Shows linear saffron fill, chapter badge, chapter title, and mission title.
 * Uses GSAP for smooth width transitions.
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ChapterProgress.module.css';

export default function ChapterProgress({ chapterProgress, chapterTitle, missionTitle }) {
  const { current, total } = chapterProgress;
  const fillRef = useRef(null);
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      width: `${pct}%`,
      duration: 0.65,
      ease: 'power2.out',
    });
  }, [pct]);

  return (
    <div className={styles.root} role="region" aria-label="Chapter progress">
      {/* Bar */}
      <div className={styles.barTrack} aria-hidden="true">
        <div ref={fillRef} className={styles.barFill} style={{ width: '0%' }} />
      </div>

      {/* Meta row */}
      <div className={styles.meta}>
        <div className={styles.left}>
          <span className={styles.chapterBadge} aria-label={`Chapter ${current} of ${total}`}>
            CH {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className={styles.chapterTitle}>{chapterTitle}</span>
        </div>
        <span className={styles.missionTitle}>{missionTitle}</span>
      </div>
    </div>
  );
}

