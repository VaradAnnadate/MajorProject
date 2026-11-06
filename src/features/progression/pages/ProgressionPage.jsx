import React from 'react';
import ProgressionHub from '../components/ProgressionHub';
import styles from './ProgressionPage.module.css';

export default function ProgressionPage() {
  return (
    <div className={styles.pageRoot}>
      {/* Background grain and subtle radial ambiance */}
      <div className={styles.ambientHalo} aria-hidden="true" />

      <div className="container">
        {/* Editorial Eyebrow & Headline */}
        <div className={styles.pageHeader}>
          <div className={styles.eyebrowStrip}>
            <span className={styles.badgePill}>PART 04 · THE LIVING PROGRESSION SYSTEM</span>
            <span className={styles.guaranteePill}>🛡️ DPDP ACT 2023 §9 COMPLIANT</span>
          </div>

          <h1 className={styles.heroHeadline}>
            Your Constitutional Rights Passport
          </h1>
          <p className={styles.heroLead}>
            Every discovery you make lights up a corner of the world. Badges in your passport are not competitive scores — they celebrate your empathy, your choices, and your growing understanding of fundamental rights.
          </p>
        </div>

        {/* Progression Hub Core */}
        <ProgressionHub />
      </div>
    </div>
  );
}

