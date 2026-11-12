import React from 'react';
import { Shield, HeartHandshake, Laptop, Users, BookOpen, Hammer, Scale } from 'lucide-react';
import styles from './SafetyTopicCard.module.css';

const ICON_MAP = {
  Shield,
  HeartHandshake,
  Laptop,
  Users,
  BookOpen,
  Hammer,
};

export function SafetyTopicCard({ topic, selectedAgeBand = '8-10' }) {
  const IconComponent = ICON_MAP[topic.icon] || Shield;
  const adaptation = topic.ageAdaptations[selectedAgeBand] || topic.ageAdaptations['8-10'];

  const title = adaptation.title;
  const desc = adaptation.lead;
  const action = adaptation.goldenRule;

  return (
    <article className={styles.card} aria-labelledby={`topic-${topic.id}`}>
      <div className={styles.cardTop}>
        <div 
          className={styles.iconWrap}
          style={{ 
            backgroundColor: `${topic.color}15`, 
            color: topic.color 
          }}
        >
          <IconComponent size={24} />
        </div>
        <span className={styles.categoryBadge}>{topic.category}</span>
      </div>

      <h3 id={`topic-${topic.id}`} className={styles.title}>
        {title}
      </h3>

      <p className={styles.lead}>
        {desc}
      </p>

      <div className={styles.conceptBox}>
        {adaptation.concept}
      </div>

      <div className={styles.goldenRuleBox}>
        <span className={styles.ruleLabel}>Key Safeguard Principle</span>
        <div className={styles.ruleText}>{localizedAction}</div>
      </div>

      <div className={styles.legalFooter}>
        <Scale size={14} style={{ flexShrink: 0, color: topic.color }} />
        <span>{topic.legalCitation}</span>
      </div>
    </article>
  );
}

export default SafetyTopicCard;
