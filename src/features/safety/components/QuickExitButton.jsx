import React, { useState, useEffect } from 'react';
import { EyeOff, RotateCcw } from 'lucide-react';
import styles from './QuickExitButton.module.css';

export function QuickExitButton({ className = '' }) {
  const [isMasked, setIsMasked] = useState(false);

  // Escape key quick toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Pressing Escape twice quickly triggers exit
      if (e.key === 'Escape' && !isMasked) {
        setIsMasked(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMasked]);

  useEffect(() => {
    const originalTitle = document.title;
    if (isMasked) {
      document.title = 'CBSE Class 7 Science: Revision Notes';
    } else {
      document.title = originalTitle;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [isMasked]);

  const handleMask = () => {
    setIsMasked(true);
  };

  const handleUnmask = () => {
    setIsMasked(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleMask}
        className={`${styles.quickExitBtn} ${className}`}
        title="Instantly switch to safe study notes screen"
        aria-label="Quick Safe Exit"
      >
        <EyeOff size={13} />
        <span>Quick Exit</span>
      </button>

      {isMasked && (
        <div className={styles.maskScreen} role="region" aria-label="Study Notes Mode">
          <div className={styles.maskContainer}>
            <div className={styles.maskHeader}>
              <div>
                <h1 className={styles.maskTitle}>NCERT Class 7 Science — Chapter 11</h1>
                <div className={styles.maskSubtitle}>Transportation in Animals and Plants · Summary Notes</div>
              </div>
              <button type="button" onClick={handleUnmask} className={styles.unmaskBtn}>
                <RotateCcw size={14} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Resume Lesson</span>
              </button>
            </div>

            <div className={styles.maskBody}>
              <h3>1. Circulatory System</h3>
              <p>
                In humans, the circulatory system consists of the heart, blood, and blood vessels. Blood transports substances like digested food from the small intestine to other parts of the body, and carries oxygen from the lungs to the cells.
              </p>
              <ul>
                <li><strong>Red Blood Cells (RBC):</strong> Contain hemoglobin which binds with oxygen.</li>
                <li><strong>White Blood Cells (WBC):</strong> Fight against germs that enter our body.</li>
                <li><strong>Platelets:</strong> Form blood clots to stop bleeding from wounds.</li>
              </ul>

              <h3>2. Blood Vessels</h3>
              <p>
                Two main types of blood vessels are arteries and veins. Arteries carry oxygen-rich blood from the heart to all parts of the body. Veins carry carbon dioxide-rich blood from all parts back to the heart.
              </p>

              <h3>3. Excretion in Animals</h3>
              <p>
                The process of removal of wastes produced in the cells of living organisms is called excretion. The human excretory system consists of kidneys, ureters, urinary bladder, and urethra.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickExitButton;

