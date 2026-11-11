import React, { useState } from 'react';
import { CURRICULUM_ALIGNMENTS } from '../../intelligence/data/intelligenceData';
import { useIntelligence } from '../../intelligence/hooks/useIntelligence';
import styles from './TopicExplorationChart.module.css';

export function TopicExplorationChart() {
  const { curriculumStats } = useIntelligence();
  const [selectedRealmId, setSelectedRealmId] = useState(CURRICULUM_ALIGNMENTS[0].realmId);

  const selectedAlignment = CURRICULUM_ALIGNMENTS.find((a) => a.realmId === selectedRealmId) || CURRICULUM_ALIGNMENTS[0];

  return (
    <section className={styles.section} aria-labelledby="topic-exploration-title">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Curriculum Alignment & Civic Topics</span>
          <h2 id="topic-exploration-title" className={styles.title}>
            Constitutional Realms & NCERT Competencies
          </h2>
        </div>
        <p className={styles.intro}>
          Every scenario directly connects Indian constitutional jurisprudence to middle-school NCERT Civics & CBSE learning competencies.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Realms Column / Selector */}
        <div className={styles.realmList} role="tablist" aria-label="Constitutional Realms">
          {CURRICULUM_ALIGNMENTS.map((alignment) => {
            const isSelected = alignment.realmId === selectedRealmId;
            return (
              <button
                key={alignment.realmId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`${styles.realmTab} ${isSelected ? styles.activeTab : ''}`}
                onClick={() => setSelectedRealmId(alignment.realmId)}
              >
                <div className={styles.tabContent}>
                  <div className={styles.tabTitle}>{alignment.realmName}</div>
                  <div className={styles.tabArticles}>
                    {alignment.statutoryArticles.join(' • ')}
                  </div>
                </div>
                <div className={styles.tabArrow} aria-hidden="true">→</div>
              </button>
            );
          })}
        </div>

        {/* Selected Realm Detail Card */}
        <div className={styles.detailCard} role="tabpanel">
          <div className={styles.detailHeader}>
            <div>
              <span className={styles.detailBadge}>Selected Domain</span>
              <h3 className={styles.detailTitle}>{selectedAlignment.realmName}</h3>
            </div>
            <div className={styles.articleTags}>
              {selectedAlignment.statutoryArticles.map((art) => (
                <span key={art} className={styles.articleTag}>{art}</span>
              ))}
            </div>
          </div>

          <div className={styles.mappingsBox}>
            <div className={styles.mappingItem}>
              <span className={styles.mappingLabel}>NCERT Civics Syllabus Mapping:</span>
              <p className={styles.mappingValue}>{selectedAlignment.ncertMapping}</p>
            </div>
            <div className={styles.mappingItem}>
              <span className={styles.mappingLabel}>CBSE Unit Alignment:</span>
              <p className={styles.mappingValue}>{selectedAlignment.cbseUnits}</p>
            </div>
          </div>

          <div className={styles.conceptPills}>
            <span className={styles.conceptHeading}>Core Competencies:</span>
            <div className={styles.pillsWrap}>
              {selectedAlignment.coreConcepts.map((concept) => (
                <span key={concept} className={styles.pill}>{concept}</span>
              ))}
            </div>
          </div>

          <div className={styles.discussionSection}>
            <h4 className={styles.discussionHeading}>Socratic Discussion Starters for Teachers:</h4>
            <ul className={styles.promptList}>
              {selectedAlignment.discussionPrompts.map((prompt, idx) => (
                <li key={idx} className={styles.promptItem}>
                  <span className={styles.promptBullet}>“</span>
                  <p>{prompt}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.activityBox}>
            <span className={styles.activityBadge}>Suggested Offline Class Exercise</span>
            <p className={styles.activityText}>{selectedAlignment.offlineClassroomActivity}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

