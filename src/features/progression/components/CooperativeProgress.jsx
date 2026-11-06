import React, { useState } from 'react';
import { INITIAL_COOPERATIVE_PROJECTS } from '../data/demoActivity';
import styles from './CooperativeProgress.module.css';

export default function CooperativeProgress({ onContribute = null }) {
  const [projects, setProjects] = useState(INITIAL_COOPERATIVE_PROJECTS);
  const [contributedMap, setContributedMap] = useState({});

  const handleContribute = (project) => {
    if (contributedMap[project.id]) return;

    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? { ...p, currentAmount: p.currentAmount + 1, contributorCount: p.contributorCount + 1 }
          : p
      )
    );

    setContributedMap((prev) => ({ ...prev, [project.id]: true }));

    if (onContribute) {
      onContribute(project.id, project.title);
    }
  };

  return (
    <div className={styles.root} role="region" aria-label="Cooperative Community Quests">
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.eyebrow}>COOPERATIVE PROGRESSION</div>
          <h2 className={styles.heading}>Shared Community Quests</h2>
          <p className={styles.subtext}>
            In RightsQuest India, we learn together. These collective goals are solved by children across classrooms, with zero competitive ranking, social pressure, or public scores.
          </p>
        </div>

        <div className={styles.coopPill}>
          <span>🤝 100% NON-COMPETITIVE COOPERATION</span>
        </div>
      </div>

      {/* Projects List */}
      <div className={styles.projectGrid}>
        {projects.map((proj) => {
          const percent = Math.min(100, Math.round((proj.currentAmount / proj.targetAmount) * 100));
          const hasContributed = Boolean(contributedMap[proj.id]);

          return (
            <div
              key={proj.id}
              className={styles.projectCard}
              style={{ borderLeftColor: proj.color }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle} style={{ backgroundColor: proj.accentBg }}>
                  <span className={styles.projIcon}>{proj.icon}</span>
                </div>

                <div className={styles.metaInfo}>
                  <span className={styles.realmLabel}>{proj.realm}</span>
                  <h3 className={styles.projTitle}>{proj.title}</h3>
                </div>
              </div>

              <p className={styles.projDesc}>{proj.description}</p>

              {/* Progress Bar */}
              <div className={styles.progressContainer}>
                <div className={styles.progressNumbers}>
                  <span className={styles.currentNum}>
                    {proj.currentAmount.toLocaleString()} / {proj.targetAmount.toLocaleString()} {proj.unit}
                  </span>
                  <span className={styles.percentText}>{percent}%</span>
                </div>

                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{ width: `${percent}%`, backgroundColor: proj.color }}
                  />
                </div>
              </div>

              {/* Reward Perk & Action */}
              <div className={styles.cardFooter}>
                <div className={styles.perkNotice}>
                  <span className={styles.perkBadge}>COMMUNITY REWARD:</span>
                  <span className={styles.perkTitle}>{proj.rewardPerk}</span>
                </div>

                <button
                  className={`${styles.contributeBtn} ${hasContributed ? styles.contributedBtn : ''}`}
                  onClick={() => handleContribute(proj)}
                  disabled={hasContributed}
                >
                  {hasContributed ? '✓ Discovery Added!' : '+ Contribute Milestone'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
