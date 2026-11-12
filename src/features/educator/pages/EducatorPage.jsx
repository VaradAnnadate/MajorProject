import React from 'react';
import { PermissionGateway } from '../../intelligence/components/PermissionGateway';
import { ClassroomMetricsGrid } from '../components/ClassroomMetricsGrid';
import { LiveSessionManager } from '../components/LiveSessionManager';
import { TopicExplorationChart } from '../components/TopicExplorationChart';
import { DiscussionToolkitView } from '../components/DiscussionToolkitView';
import { RecentSessionsAudit } from '../components/RecentSessionsAudit';
import { useIntelligence } from '../../intelligence/hooks/useIntelligence';
import styles from './EducatorPage.module.css';

export default function EducatorPage() {
  const { historicalSessions, classroomSummaryStatus } = useIntelligence();
  return (
    <PermissionGateway
      requiredRole="educator"
      title="Educator & Facilitator Intelligence Studio"
      subtitle="Access cohort-level constitutional learning insights, live Socratic consensus tools, and curriculum-aligned civic resources."
      icon="🏛️"
    >
      <main className={styles.pageRoot}>
        <div className={styles.container}>
          {/* Hero Section */}
          <header className={styles.hero}>
            <div className={styles.eyebrowStrip}>
              <span className={styles.pillBadge}>Part 06 Educator Studio</span>
              <span className={styles.complianceBadge}>NCERT Civics & CBSE Aligned</span>
              <span className={styles.dpdpPill}>DPDP Act 2023 §9 Compliant</span>
            </div>
            <h1 className={styles.heroTitle}>
              Classroom Constitutional Intelligence Studio
            </h1>
            <p className={styles.heroDescription}>
              Facilitate deep civic understanding, run live deliberative consensus rooms, and explore curriculum-mapped fundamental rights without invasive tracking or competitive student surveillance.
            </p>
          </header>

          {/* Aggregate Metrics Grid */}
          <ClassroomMetricsGrid />

          {/* Synchronous Live Room Facilitator */}
          <LiveSessionManager />

          {/* Curriculum & Realms Exploration */}
          <TopicExplorationChart />

          {/* Pedagogical Discussion Toolkit */}
          <DiscussionToolkitView />

          {/* Collaborative Classroom Audit Trail */}
          <RecentSessionsAudit sessions={historicalSessions} status={classroomSummaryStatus} />

          {/* Educator Legal & Facilitation Resources */}
          <section className={styles.resourcesSection} aria-labelledby="educator-resources-title">
            <div className={styles.resourcesHeader}>
              <h2 id="educator-resources-title" className={styles.resourcesTitle}>
                Verified Educator & Facilitator Legal Compendium
              </h2>
              <p className={styles.resourcesSubtitle}>
                Authoritative reference documents, government circulars, and helpline contacts for institutional child welfare.
              </p>
            </div>

            <div className={styles.resourcesGrid}>
              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>📖</div>
                <h3 className={styles.resourceCardTitle}>Right to Education (RTE) Act 2009</h3>
                <p className={styles.resourceCardDesc}>
                  Section 17 prohibiting corporal punishment, Section 12(1)(c) economically disadvantaged seat quotas, and continuous comprehensive evaluation mandates.
                </p>
                <div className={styles.resourcePill}>Statutory Mandate</div>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>⚖️</div>
                <h3 className={styles.resourceCardTitle}>POCSO Act 2012 — Institutional Protocol</h3>
                <p className={styles.resourceCardDesc}>
                  Mandatory reporting obligations for teachers and administrators (Section 19), child-friendly inquiry guidelines, and designated child protection officers.
                </p>
                <div className={styles.resourcePill}>Mandatory Reporting</div>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>📞</div>
                <h3 className={styles.resourceCardTitle}>Emergency Helpline Escalation: 1098</h3>
                <p className={styles.resourceCardDesc}>
                  National Childline / Ministry of Women & Child Development 24/7 toll-free emergency response service for children in immediate distress.
                </p>
                <div className={styles.resourcePill}>Toll-Free 24/7</div>
              </div>

              <div className={styles.resourceCard}>
                <div className={styles.resourceIcon}>🏛️</div>
                <h3 className={styles.resourceCardTitle}>NCERT Civics Learning Outcomes (Grades 6–8)</h3>
                <p className={styles.resourceCardDesc}>
                  Key pedagogical indicators for democratic decision-making, recognizing inequality, understanding institutional checks and balances, and active citizenship.
                </p>
                <div className={styles.resourcePill}>Curriculum Core</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PermissionGateway>
  );
}

