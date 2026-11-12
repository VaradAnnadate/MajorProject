import React, { useState } from 'react';
import { TrustedAdultExplainer } from '../components/TrustedAdultExplainer';
import { VerifiedHelplineDirectory } from '../components/VerifiedHelplineDirectory';
import { QuickExitButton } from '../components/QuickExitButton';
import { HeartHandshake, ShieldCheck, PhoneCall, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './GetHelpExperiencePage.module.css';

/**
 * GetHelpExperiencePage (/safety/get-help & /help)
 * Part 07: Child Safety & Help Experience
 * Creative OS 44_AGENCYLIKE_UI Light Luxury Editorial Architecture
 * 
 * Calm, dignified, child-friendly support flow:
 * - What is a trusted adult?
 * - Practice scripts: "How to ask for help"
 * - What to do when an adult doesn't listen
 * - Fact-checked statutory directories (1098, 112, POCSO e-Box, 1930 Cyber)
 * - Quick Exit safety latch
 * - Strictly zero personal disclosure harvesting or XP gamification
 */
export function GetHelpExperiencePage() {
  const [copiedScriptIndex, setCopiedScriptIndex] = useState(null);

  const practiceScripts = [
    {
      context: 'School or Playground',
      phrase: 'Something happened at school that didn\'t feel safe or fair, and I need help dealing with it.',
      cue: 'Say this to a teacher, school counselor, or trusted parent.'
    },
    {
      context: 'Personal Boundaries',
      phrase: 'An adult or older person did something that made me feel uncomfortable, and I want to talk about it safely.',
      cue: 'Remember: You did nothing wrong. You have every right to be safe.'
    },
    {
      context: 'Online Safety',
      phrase: 'Someone online asked me for private pictures or information, and it scared me.',
      cue: 'Show a trusted adult right away. You are not in trouble.'
    },
    {
      context: 'If someone told you to keep a bad secret',
      phrase: 'Someone told me not to tell, but it feels wrong and I know good secrets never hurt or scare people.',
      cue: 'Secrets that make you feel scared or sad are meant to be shared with a trusted adult.'
    }
  ];

  const handleCopyScript = (phrase, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phrase).then(() => {
        setCopiedScriptIndex(index);
        setTimeout(() => setCopiedScriptIndex(null), 2500);
      }).catch(() => {});
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Top Banner with Quick Exit */}
      <header className={styles.pageHeader}>
        <div className={styles.headerTop}>
          <div className={styles.headerTag}>
            <ShieldCheck size={16} />
            <span>PART 07 · CHILD SAFETY & CARE DIRECTORY</span>
          </div>
          <QuickExitButton label="Safe Quick Exit" />
        </div>

        <h1 className={styles.pageTitle}>
          You Deserve to Feel Safe. <em>Always.</em>
        </h1>
        <p className={styles.pageSubtitle}>
          Asking for help is a brave and powerful choice. You are never alone, never in trouble for seeking safety, 
          and have the constitutional right to be heard and protected.
        </p>

        {/* Immediate Emergency Warning Box */}
        <div className={styles.emergencyNotice} role="alert">
          <AlertTriangle size={22} className={styles.emergencyIcon} />
          <div className={styles.emergencyText}>
            <strong>Immediate Danger Emergency:</strong> If you or someone else is in immediate, life-threatening danger, 
            dial <strong>112</strong> (National Emergency Helpline) or find a police officer, doctor, or station authority right away.
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className={styles.mainLayout}>
        {/* Section 1: Trusted Adult Explainer */}
        <section className={styles.sectionBlock} aria-labelledby="trusted-adult-heading">
          <TrustedAdultExplainer />
        </section>

        {/* Section 2: Words to Use — Practice Phrases */}
        <section className={styles.sectionBlock} aria-labelledby="scripts-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>STEP 02 · FINDING THE RIGHT WORDS</span>
            <h2 id="scripts-heading" className={styles.sectionTitle}>
              How to Start the Conversation
            </h2>
            <p className={styles.sectionDesc}>
              It can be hard to know what to say when something feels wrong. You can read, memorize, or show these practice phrases to your trusted adult:
            </p>
          </div>

          <div className={styles.scriptsGrid}>
            {practiceScripts.map((script, idx) => (
              <div key={idx} className={styles.scriptCard}>
                <div className={styles.scriptContext}>{script.context}</div>
                <blockquote className={styles.scriptQuote}>"{script.phrase}"</blockquote>
                <div className={styles.scriptFooter}>
                  <span className={styles.scriptCue}>{script.cue}</span>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => handleCopyScript(script.phrase, idx)}
                    aria-label={`Copy practice sentence for ${script.context}`}
                  >
                    {copiedScriptIndex === idx ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy Words</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: What if the adult doesn't listen? */}
        <section className={styles.notListeningBlock}>
          <div className={styles.notListeningCard}>
            <HeartHandshake size={28} className={styles.notListeningIcon} />
            <div className={styles.notListeningContent}>
              <h3 className={styles.notListeningTitle}>What If the First Adult Doesn't Listen?</h3>
              <p className={styles.notListeningText}>
                Sometimes adults get busy, confused, or don't realize how serious things are. 
                <strong> This does NOT mean you are wrong or that it didn't matter.</strong>
              </p>
              <ul className={styles.notListeningList}>
                <li><strong>Try another trusted adult:</strong> Speak to a different teacher, aunt, uncle, doctor, or family friend.</li>
                <li><strong>Be direct:</strong> Tell them: <em>"I need you to listen because this is about my safety."</em></li>
                <li><strong>Call a verified children's helpline:</strong> You can call <strong>1098</strong> for free from any phone to talk to a trained child protection officer who will listen.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Verified Statutory Helplines & Authorities */}
        <section className={styles.sectionBlock} aria-labelledby="helplines-heading">
          <VerifiedHelplineDirectory />
        </section>
      </main>
    </div>
  );
}

export default GetHelpExperiencePage;
