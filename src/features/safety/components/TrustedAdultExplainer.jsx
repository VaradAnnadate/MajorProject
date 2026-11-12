import React from 'react';
import { HeartHandshake, Users, MessageSquareQuote, AlertTriangle, ShieldCheck } from 'lucide-react';
import styles from './TrustedAdultExplainer.module.css';

export function TrustedAdultExplainer() {
  return (
    <section className={styles.section} aria-labelledby="trusted-adults-heading">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Safety Circle Guide</span>
        <h2 id="trusted-adults-heading" className={styles.title}>
          Who is a "Trusted Adult" and How to Ask for Help
        </h2>
        <p className={styles.lead}>
          Children should never have to navigate fear, unsafe secrets, or boundary violations alone.
          Identifying trustworthy adults ahead of time creates a dependable safety net.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Box 1: Definition */}
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>
            <ShieldCheck size={20} color="var(--color-terracotta-500)" />
            <span>Qualities of a Trusted Adult</span>
          </h3>
          <p className={styles.boxText}>
            A trusted adult is an older person who treats you with patience, respects your personal space, keeps you safe, and does not demand that you keep frightening secrets from parents or teachers.
          </p>
          <div className={styles.scriptBox}>
            "Examples: Favorite teacher, school counselor, mother, father, aunt, doctor, or coach."
          </div>
        </div>

        {/* Box 2: How to start the talk */}
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>
            <MessageSquareQuote size={20} color="var(--color-saffron-500)" />
            <span>How to Start the Conversation</span>
          </h3>
          <p className={styles.boxText}>
            You do not have to have everything figured out before you speak. You can use these exact sentences:
          </p>
          <div className={styles.scriptBox}>
            "Can I talk to you in private? Someone did something that made me feel unsafe, and I need help."
          </div>
        </div>

        {/* Box 3: What if dismissed */}
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>
            <Users size={20} color="var(--color-peacock-500)" />
            <span>Building Your 5-Finger Palm</span>
          </h3>
          <p className={styles.boxText}>
            Imagine your hand: write the name of one trusted person on each finger. Having 3 to 5 people ensures that if one person is unavailable or doesn't believe you, you can move immediately to the next.
          </p>
          <div className={styles.scriptBox}>
            "If adult #1 says 'it's nothing', do not give up. Your feelings matter. Talk to adult #2 or call 1098."
          </div>
        </div>
      </div>

      <div className={styles.alertBox}>
        <AlertTriangle size={24} className={styles.alertIcon} />
        <div>
          <h4 className={styles.alertTitle}>What If the First Adult Dismisses You?</h4>
          <p className={styles.alertDesc}>
            Sometimes big people are busy, stressed, or do not immediately understand the seriousness of what you are saying. 
            <strong> You are not at fault, and you must never stop speaking up.</strong> If the first person dismisses you, 
            approach the next person in your safety circle, or call the National Childline at <strong>1098</strong> directly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TrustedAdultExplainer;

