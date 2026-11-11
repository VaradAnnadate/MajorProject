import React from 'react';
import { useIntelligence } from '../../intelligence/hooks/useIntelligence';
import styles from './LearningTimelineView.module.css';

export function LearningTimelineView() {
  const { learningTimeline } = useIntelligence();

  return (
    <section className={styles.section} aria-labelledby="learning-timeline-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Chronological Learning Journey</span>
        <h2 id="learning-timeline-title" className={styles.title}>
          Your Child's Rights & Empathy Chronicle
        </h2>
        <p className={styles.subtitle}>
          A meaningful record of ethical choices, tactile evidence examined, and constitutional protections discovered.
        </p>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.timelineLine} aria-hidden="true" />
        <div className={styles.milestonesList}>
          {learningTimeline.map((item, index) => (
            <div key={item.id || index} className={styles.timelineItem}>
              <div className={styles.nodeMarker}>
                <span className={styles.nodeBadge}>{item.badge}</span>
              </div>
              <div className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardDate}>{item.timestamp}</span>
                </div>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

