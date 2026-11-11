import React from 'react';
import { PermissionGateway } from '../../intelligence/components/PermissionGateway';
import { LearningHighlightsCard } from '../components/LearningHighlightsCard';
import { LearningTimelineView } from '../components/LearningTimelineView';
import { FamilyConversationStarters } from '../components/FamilyConversationStarters';
import { SupportivePillarsGrid } from '../components/SupportivePillarsGrid';
import { GuardianResourcesAccordion } from '../components/GuardianResourcesAccordion';
import styles from './GuardianPage.module.css';

export default function GuardianPage() {
  return (
    <PermissionGateway
      requiredRole="guardian"
      title="Guardian Chronicle & Family Window"
      subtitle="Follow your child's constitutional discovery journey, find dinner-table conversation primers, and review family rights protections."
      icon="🏡"
    >
      <main className={styles.pageRoot}>
        <div className={styles.container}>
          {/* Hero Section */}
          <header className={styles.hero}>
            <div className={styles.eyebrowStrip}>
              <span className={styles.pillBadge}>Part 06 Guardian Chronicle</span>
              <span className={styles.complianceBadge}>Zero Child Surveillance</span>
              <span className={styles.dpdpPill}>DPDP Act 2023 §9 Compliant</span>
            </div>
            <h1 className={styles.heroTitle}>
              Your Child’s Constitutional Learning Chronicle
            </h1>
            <p className={styles.heroDescription}>
              A calm, non-surveillance window into your child’s growing understanding of equality, empathy, and constitutional rights — complete with offline family conversation starters.
            </p>
          </header>

          {/* Child Highlights & Reassurance */}
          <LearningHighlightsCard />

          {/* Chronological Narrative Learning Timeline */}
          <LearningTimelineView />

          {/* Dinner Table Discussion Starters & Family Activities */}
          <FamilyConversationStarters />

          {/* Ethical Tech & Anti-Addiction Guarantees */}
          <SupportivePillarsGrid />

          {/* Verified Legal & Statutory Resources */}
          <GuardianResourcesAccordion />
        </div>
      </main>
    </PermissionGateway>
  );
}

