import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, PhoneCall, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SAFETY_TOPICS } from '../data/safetyTopics';
import { SafetyTopicCard } from '../components/SafetyTopicCard';
import { AgeBandSafetyView } from '../components/AgeBandSafetyView';
import { TrustedAdultExplainer } from '../components/TrustedAdultExplainer';
import { QuickExitButton } from '../components/QuickExitButton';
import styles from './SafetyLibraryPage.module.css';

export function SafetyLibraryPage() {
  const [selectedAgeBand, setSelectedAgeBand] = useState('8-10');

  return (
    <div className={styles.page}>
      <div className="container-editorial">
        {/* Top Header Row with Quick Exit */}
        <div className={styles.heroHeader}>
          <div className={styles.topBarRow}>
            <span className={styles.eyebrow}>
              <ShieldAlert size={16} />
              <span>Knowledge That Protects · Rights That Empower</span>
            </span>
            <QuickExitButton />
          </div>

          <h1 className={styles.heroTitle}>
            Child Safety & Personal Rights Library
          </h1>
          <p className={styles.heroLead}>
            Every child has the fundamental right to be safe, heard, and protected from harm. Explore everyday safety skills tailored to your age.
          </p>
        </div>

        {/* 3-Tier Age Adaptation Filter */}
        <AgeBandSafetyView 
          selectedAgeBand={selectedAgeBand}
          onSelectAgeBand={setSelectedAgeBand}
        />

        {/* Topics Grid */}
        <div className={styles.topicsGrid}>
          {SAFETY_TOPICS.map((topic) => (
            <SafetyTopicCard 
              key={topic.id}
              topic={topic}
              selectedAgeBand={selectedAgeBand}
            />
          ))}
        </div>

        {/* Trusted Adult Framework */}
        <TrustedAdultExplainer />

        {/* Get Help Route Callout */}
        <div className={styles.helpCtaBanner}>
          <div className={styles.helpCtaContent}>
            <h3>Need to Talk to Someone Right Now?</h3>
            <p>
              If something feels wrong, confusing, or scary in your life, you never have to face it alone. 
              Explore verified helplines, practice conversation scripts, and official protection resources.
            </p>
          </div>
          <Link to="/safety/get-help" className={styles.btnGetHelp}>
            <PhoneCall size={18} />
            <span>Go to Get Help Experience</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SafetyLibraryPage;

