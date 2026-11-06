import React, { useState } from 'react';
import { ACHIEVEMENT_CATEGORIES } from '../data/achievements';
import styles from './AchievementCollection.module.css';

export default function AchievementCollection({
  badges = [],
  onSelectBadge = null,
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBadges = activeCategory === 'all'
    ? badges
    : badges.filter((b) => b.category === activeCategory);

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className={styles.root} role="region" aria-label="Collectible Badges Archive">
      <div className={styles.topHeader}>
        <div className={styles.titleCol}>
          <div className={styles.eyebrow}>TREASURE CABINET</div>
          <h2 className={styles.title}>The Artifacts of Dignity</h2>
          <p className={styles.desc}>
            Each medallion represents an active ethical decision, a statutory article unlocked, or an act of peer solidarity.
          </p>
        </div>

        <div className={styles.unlockedCounter}>
          <span className={styles.counterVal}>{unlockedCount} / {badges.length}</span>
          <span className={styles.counterLabel}>Artifacts Discovered</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className={styles.tabBar} role="tablist" aria-label="Badge categories">
        {ACHIEVEMENT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className={styles.grid}>
        {filteredBadges.map((badge) => {
          const isUnlocked = badge.unlocked;

          return (
            <div
              key={badge.id}
              className={`${styles.badgeCard} ${isUnlocked ? styles.cardUnlocked : styles.cardLocked}`}
              onClick={() => onSelectBadge && onSelectBadge(badge)}
              role="button"
              tabIndex={0}
              aria-label={`${badge.name}: ${isUnlocked ? 'Unlocked' : 'Locked'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectBadge && onSelectBadge(badge);
                }
              }}
            >
              <div className={styles.cardHeader}>
                <span
                  className={styles.catTag}
                  style={{ color: badge.color, backgroundColor: badge.bg, borderColor: badge.border }}
                >
                  {badge.categoryLabel}
                </span>

                <span className={styles.statusIndicator}>
                  {isUnlocked ? (
                    <span className={styles.unlockedText}>✓ Unlocked</span>
                  ) : (
                    <span className={styles.lockedText}>🔒 Locked</span>
                  )}
                </span>
              </div>

              {/* Medallion Visual */}
              <div className={styles.medallionWrap}>
                <div
                  className={`${styles.medallion} ${isUnlocked ? styles.medallionGlow : ''}`}
                  style={{
                    borderColor: isUnlocked ? badge.color : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: isUnlocked ? badge.bg : 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <span className={styles.symbol}>{badge.symbol}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.badgeName}>{badge.name}</h3>
                <div className={styles.articleRef}>{badge.constitutionalArticle}</div>
                <p className={styles.badgeDescription}>{badge.description}</p>
              </div>

              {/* Bottom Progress or Date */}
              <div className={styles.cardFooter}>
                {isUnlocked ? (
                  <span className={styles.unlockedDate}>Recorded in your local passport</span>
                ) : (
                  <div className={styles.progressWrap}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${badge.progress || 0}%`, backgroundColor: badge.color }}
                      />
                    </div>
                    <span className={styles.progressNum}>{badge.progress || 0}% explored</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

