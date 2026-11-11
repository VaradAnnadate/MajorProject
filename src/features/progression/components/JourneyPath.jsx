import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GamifiedMilestoneCelebration } from './GamifiedMilestoneCelebration';
import styles from './JourneyPath.module.css';

const JOURNEY_WAYPOINTS = [
  {
    id: 'wp-01',
    number: 1,
    title: 'The Schoolyard Gate',
    realm: 'Gardens of Growth',
    worldId: 'gardens-of-growth',
    right: 'Article 21A & RTE Act',
    icon: '🏫',
    requiredLevel: 1,
    description: 'Understand that no child can be turned away from school due to poverty.',
  },
  {
    id: 'wp-02',
    number: 2,
    title: 'The Whispering Screen',
    realm: 'Forest of Safety',
    worldId: 'forest-of-safety',
    right: 'POCSO Act & DPDP Act §9',
    icon: '📱',
    requiredLevel: 2,
    description: 'Learn to guard personal boundaries and reject online manipulation.',
  },
  {
    id: 'wp-03',
    number: 3,
    title: 'The Silent Brickyard',
    realm: 'Haven of Dignity',
    worldId: 'haven-of-dignity',
    right: 'Article 24 & Child Labour Act',
    icon: '🧱',
    requiredLevel: 3,
    description: 'Defend childhood by recognizing that hazardous work is banned by law.',
  },
  {
    id: 'wp-04',
    number: 4,
    title: 'The Equal Playfield',
    realm: 'Village of Belonging',
    worldId: 'village-of-belonging',
    right: 'Articles 14 & 15(3)',
    icon: '⚽',
    requiredLevel: 4,
    description: 'Stand with peers so that girls and vulnerable youth share the ground equally.',
  },
  {
    id: 'wp-05',
    number: 5,
    title: 'The River Assembly',
    realm: 'River of Voices',
    worldId: 'river-of-voices',
    right: 'UNCRC Article 12 (Participation)',
    icon: '🛶',
    requiredLevel: 5,
    description: 'Make children\'s voices heard in school committees and community meetings.',
  },
  {
    id: 'wp-06',
    number: 6,
    title: 'The Summit of Guardians',
    realm: 'Haven of Dignity',
    worldId: 'haven-of-dignity',
    right: 'Constitutional Charter of Dignity',
    icon: '🏔️',
    requiredLevel: 6,
    description: 'Become a peer guardian, inspiring community kindness across the living world.',
  },
];

export default function JourneyPath({ currentLevelNumber = 1 }) {
  const [activeCelebration, setActiveCelebration] = useState(null);

  return (
    <div className={styles.root} role="region" aria-label="Constitutional Journey Path">
      {activeCelebration && (
        <GamifiedMilestoneCelebration
          worldId={activeCelebration.worldId}
          onClose={() => setActiveCelebration(null)}
          onContinue={() => setActiveCelebration(null)}
        />
      )}

      <div className={styles.header}>
        <div className={styles.eyebrowStrip}>
          <span className={styles.eyebrow}>DISCOVERY TRAIL</span>
          <button
            type="button"
            className={styles.headerLaunchBtn}
            onClick={() => setActiveCelebration({ worldId: 'village-of-belonging' })}
          >
            🏆 View Realm Milestone Celebration
          </button>
        </div>
        <h2 className={styles.heading}>The Path of Constitutional Light</h2>
        <p className={styles.subtext}>
          As your civic knowledge and empathy deepen, milestones along the five realms illuminate. Unlock realm crests, celebrate constitutional protections, and level up your guardian tier.
        </p>
      </div>

      <div className={styles.pathList}>
        {JOURNEY_WAYPOINTS.map((wp, idx) => {
          const isReached = currentLevelNumber >= wp.requiredLevel;
          const isCurrent = currentLevelNumber === wp.requiredLevel;
          const isLocked = currentLevelNumber < wp.requiredLevel;

          return (
            <div
              key={wp.id}
              className={`${styles.waypointCard} ${
                isReached ? styles.reached : isLocked ? styles.locked : ''
              } ${isCurrent ? styles.current : ''}`}
            >
              <div className={styles.nodeIndicator}>
                <div className={styles.nodeCircle}>
                  {isReached ? <span>{wp.icon}</span> : <span className={styles.lockIcon}>🔒</span>}
                </div>
                {idx < JOURNEY_WAYPOINTS.length - 1 && (
                  <div
                    className={`${styles.connectorLine} ${
                      currentLevelNumber > wp.requiredLevel ? styles.lineActive : ''
                    }`}
                  />
                )}
              </div>

              <div className={styles.waypointContent}>
                <div className={styles.metaRow}>
                  <span className={styles.realmBadge}>{wp.realm}</span>
                  <span className={styles.statusBadge}>
                    {isCurrent ? '★ Current Milestone' : isReached ? '✓ Mastered' : `Unlocks at Level ${wp.requiredLevel}`}
                  </span>
                </div>

                <h3 className={styles.waypointTitle}>{wp.title}</h3>
                <div className={styles.waypointRight}>{wp.right}</div>
                <p className={styles.waypointDesc}>{wp.description}</p>

                {isReached && (
                  <button
                    type="button"
                    className={styles.waypointGatewayBtn}
                    onClick={() => setActiveCelebration({ worldId: wp.worldId })}
                  >
                    <span>🎖️ Celebrate {wp.realm} Milestone →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

