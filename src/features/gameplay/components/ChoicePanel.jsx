/**
 * ChoicePanel — Multi-choice decision panel.
 * Stagger entrance with Framer Motion, consequence reveal, no spoilers before selection.
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChoicePanel.module.css';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function ChoicePanel({ choices, selectedChoice, onSelect }) {
  if (!choices || choices.length === 0) return null;
  const hasSelected = !!selectedChoice;

  return (
    <div className={styles.root} role="region" aria-label="Make a choice">
      <div className={styles.prompt}>
        <span className={styles.promptIcon} aria-hidden="true">◆</span>
        What would you do?
        {!hasSelected && (
          <span className={styles.hint}>Think carefully before choosing...</span>
        )}
      </div>

      <motion.div
        className={styles.list}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {choices.map((choice) => {
          const isSelected = selectedChoice?.id === choice.id;
          const isDimmed = hasSelected && !isSelected;

          return (
            <motion.div key={choice.id} variants={cardVariants}>
              <button
                className={`${styles.card} ${isSelected ? styles.selected : ''} ${isDimmed ? styles.dimmed : ''}`}
                onClick={() => !hasSelected && onSelect(choice.id)}
                disabled={hasSelected && !isSelected}
                aria-pressed={isSelected}
                aria-label={choice.text}
              >
                <span className={styles.choiceIndex} aria-hidden="true">
                  {choices.indexOf(choice) + 1}
                </span>
                <span className={styles.choiceText}>{choice.text}</span>
                {isSelected && (
                  <span className={styles.selectedBadge} aria-hidden="true">✓ Your choice</span>
                )}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

