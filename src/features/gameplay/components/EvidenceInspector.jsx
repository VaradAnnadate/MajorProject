/**
 * EvidenceInspector — Magnifying glass evidence overlay.
 * Triggered for dialogue type 'evidence'. Parchment document card,
 * animated magnifying glass that follows cursor, text reveals beneath.
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EvidenceInspector.module.css';

function MagnifyingGlassSVG() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true" className={styles.magGlass}>
      <circle cx="21" cy="21" r="17" stroke="#DE7215" strokeWidth="3" fill="rgba(222,114,21,0.08)" />
      <circle cx="21" cy="21" r="10" fill="rgba(222,114,21,0.06)" />
      <line x1="34" y1="34" x2="47" y2="47" stroke="#DE7215" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="21" cy="21" r="6" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}

export default function EvidenceInspector({ dialogue, visible, onClose }) {
  const glassRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!glassRef.current || !overlayRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 26;
    const y = e.clientY - rect.top - 26;
    glassRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !visible) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [visible, handleMouseMove]);

  if (!dialogue) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={overlayRef}
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Evidence inspection"
        >
          {/* Floating magnifying glass */}
          <div ref={glassRef} className={styles.glassWrap} aria-hidden="true">
            <MagnifyingGlassSVG />
          </div>

          {/* Document card */}
          <motion.div
            className={styles.card}
            initial={{ scale: 0.9, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 32, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Document header */}
            <div className={styles.docHeader}>
              <span className={styles.docIcon} aria-hidden="true">📄</span>
              <div>
                <div className={styles.docType}>Evidence Document</div>
                <div className={styles.docSource}>{dialogue.speakerLabel}</div>
              </div>
              <div className={styles.stampMark} aria-hidden="true">EXHIBIT</div>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            {/* Document text */}
            <p className={styles.docText}>{dialogue.text}</p>

            {/* Mitra hint */}
            <div className={styles.mitraHint}>
              <span className={styles.mitraHintIcon} aria-hidden="true">🦊</span>
              <span>Look carefully at the details — what feels suspicious here?</span>
            </div>

            {/* Close button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close investigation">
              Close Investigation
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

