import React, { useEffect, useRef, useState } from 'react';
import { SovereignPortalTunnel } from '../engine/SovereignPortalTunnel';
import styles from './LandingScrollGateway.module.css';

/**
 * Play harmonic triumph chime upon entering the white light core
 */
function playThresholdChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const notes = [
      { freq: 440.00, time: 0.00, dur: 0.35 },
      { freq: 554.37, time: 0.12, dur: 0.35 },
      { freq: 659.25, time: 0.24, dur: 0.45 },
      { freq: 880.00, time: 0.36, dur: 0.80 },
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur + 0.05);
    });

    setTimeout(() => {
      try { ctx.close(); } catch (_) {}
    }, 1500);
  } catch (_) {}
}

/**
 * LandingScrollGateway
 * The 3D Dimensional Bridge connecting Scene 04 (Mitra Companion) directly to Scene 05 (Map Portal).
 * Seamless scroll experience:
 * - Camera glides into the Sovereign Ashoka Seal.
 * - POV travels through the inner warp tunnel with glowing rings & rushing sparks.
 * - Luminous white-light burst takes over the screen.
 * - White light fades out seamlessly, revealing Scene 05 right beneath your eyes with zero empty space!
 */
export function LandingScrollGateway() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tunnelRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [whiteOverlayOpacity, setWhiteOverlayOpacity] = useState(0);
  const [hasCrossedLight, setHasCrossedLight] = useState(false);

  // 1. Initialize 3D Tunnel Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      tunnelRef.current = new SovereignPortalTunnel(canvasRef.current);
    } catch (err) {
      console.warn('SovereignPortalTunnel WebGL fallback:', err);
    }

    return () => {
      if (tunnelRef.current) {
        tunnelRef.current.destroy();
        tunnelRef.current = null;
      }
    };
  }, []);

  // 2. Scroll Listener - Syncs scroll progress to 3D POV travel through the seal
  useEffect(() => {
    let animId = null;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const t = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setProgress(t);

      if (tunnelRef.current) {
        tunnelRef.current.setProgress(t);
      }

      // White-light burst curve:
      // t < 0.82: opacity = 0
      // t in [0.82, 0.94]: rises from 0 -> 1.0 (entering the white beacon)
      // t in [0.94, 0.97]: holds at 1.0 (pure brilliant white)
      // t > 0.97: smoothly fades out 1.0 -> 0.0 so Scene 05 appears underneath!
      let opacity = 0;
      if (t >= 0.82 && t <= 0.94) {
        opacity = (t - 0.82) / 0.12;
      } else if (t > 0.94 && t <= 0.97) {
        opacity = 1.0;
      } else if (t > 0.97) {
        opacity = 1.0 - (t - 0.97) / 0.03;
      }
      setWhiteOverlayOpacity(Math.max(0, Math.min(1, opacity)));

      // Sound trigger upon entering the white light core
      if (t >= 0.88 && !hasCrossedLight) {
        playThresholdChime();
        setHasCrossedLight(true);
      } else if (t < 0.6) {
        setHasCrossedLight(false);
      }
    };

    const loop = () => {
      onScroll();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasCrossedLight]);

  return (
    <section
      ref={containerRef}
      className={styles.scrollSection}
      aria-label="3D Dimensional Bridge: Travelling into the 5 Realms"
    >
      <div className={styles.stickyViewport}>
        {/* Fullscreen 3D WebGL Canvas */}
        <canvas ref={canvasRef} className={styles.webglCanvas} />

        {/* Pure White-Light Screen Burst Overlay */}
        <div
          className={styles.whiteLightOverlay}
          style={{
            opacity: whiteOverlayOpacity,
            pointerEvents: whiteOverlayOpacity > 0.85 ? 'auto' : 'none',
          }}
          aria-hidden="true"
        />

        {/* Top Editorial Pill — Fades out when flying inside the seal */}
        <div 
          className={styles.topHud}
          style={{
            opacity: progress > 0.35 ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        >
          <div className={styles.eyebrowPill}>
            <span className={styles.chakraIcon}>☸</span>
            <span className={styles.pillText}>SOVEREIGN THRESHOLD · THE 5 CONSTITUTIONAL REALMS</span>
          </div>
        </div>

        {/* Dynamic Flight Caption HUD — Fades out before white light takes over */}
        <div 
          className={styles.captionHud}
          style={{
            opacity: progress > 0.82 ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className={styles.captionCard}>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className={styles.captionContent}>
              {progress < 0.35 && (
                <>
                  <span className={styles.captionTag}>APPROACHING THE SEAL</span>
                  <h3 className={styles.captionHeading}>The Sovereign Seal of Child Rights</h3>
                  <p className={styles.captionSub}>
                    Scroll down to fly into the golden Ashoka Chakra and enter the living story world.
                  </p>
                </>
              )}
              {progress >= 0.35 && progress < 0.70 && (
                <>
                  <span className={styles.captionTag}>PASSING INSIDE</span>
                  <h3 className={styles.captionHeading}>Entering the Dimensional Portal</h3>
                  <p className={styles.captionSub}>
                    Traveling through the central aperture into the vaulted colonnade of rights.
                  </p>
                </>
              )}
              {progress >= 0.70 && progress < 0.94 && (
                <>
                  <span className={styles.captionTag}>WARP TUNNEL</span>
                  <h3 className={styles.captionHeading}>Flying Through the Light Threshold</h3>
                  <p className={styles.captionSub}>
                    Passing between the glowing golden rings into the radiant white light beacon.
                  </p>
                </>
              )}
              {progress >= 0.94 && (
                <>
                  <span className={styles.captionTag}>EMERGENCE</span>
                  <h3 className={styles.captionHeading}>Welcome to The World of Every Child</h3>
                  <p className={styles.captionSub}>
                    Light clears to reveal the interactive 5 Realms Adventure Map!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingScrollGateway;
