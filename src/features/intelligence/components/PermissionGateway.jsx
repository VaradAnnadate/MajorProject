import React from 'react';
import { Link } from 'react-router-dom';
import { useDemoLearner } from '../../../context/DemoLearnerContext';
import styles from './PermissionGateway.module.css';

export function PermissionGateway({
  requiredRole,
  title,
  subtitle,
  icon = '🛡️',
  children,
}) {
  const { currentRole, setCurrentRole } = useDemoLearner();

  const isGranted = currentRole === requiredRole;

  if (isGranted) {
    return (
      <div className={styles.grantedWrapper}>
        <aside className={styles.roleHeaderBar} aria-label="Active workspace role">
          <div className={styles.roleHeaderInner}>
            <div className={styles.roleIndicator}>
              <span className={styles.roleDot} aria-hidden="true" />
              <span className={styles.roleLabel}>
                Active Persona: <strong>{requiredRole === 'educator' ? 'Educator & Facilitator' : 'Parent & Guardian'}</strong>
              </span>
              <span className={styles.dpdpBadge}>DPDP Act 2023 §9 Compliant</span>
            </div>
            <div className={styles.roleActions}>
              <button
                type="button"
                className={styles.switchButton}
                onClick={() => setCurrentRole('learner')}
                title="Return to Student / Learner Mode"
              >
                Switch to Learner View
              </button>
              {requiredRole === 'educator' ? (
                <Link to="/guardian" className={styles.switchLink}>
                  Guardian Chronicle →
                </Link>
              ) : (
                <Link to="/educator" className={styles.switchLink}>
                  Educator Studio →
                </Link>
              )}
            </div>
          </div>
        </aside>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.gatewayContainer}>
      <div className={styles.gatewayCard}>
        <div className={styles.iconCircle}>{icon}</div>
        <div className={styles.eyebrow}>RightsQuest Intelligence Gateway</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.complianceBox}>
          <div className={styles.complianceHeader}>
            <span className={styles.shieldIcon}>🔒</span>
            <strong>DPDP Act 2023 §9 Privacy & Non-Surveillance Guarantee</strong>
          </div>
          <ul className={styles.guaranteeList}>
            <li>
              <strong>Zero Personal Identifiers:</strong> We do not log child names, emails, phone numbers, or biometrics.
            </li>
            <li>
              <strong>No Individual Surveillance:</strong> Learning insights measure constitutional concept mastery and collective consensus, never behavioral surveillance.
            </li>
            <li>
              <strong>No Competitive Leaderboards:</strong> Exploration is framed as civic empathy and constitutional wisdom, eliminating toxic peer-ranking.
            </li>
          </ul>
        </div>

        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.primaryAuthButton}
            onClick={() => setCurrentRole(requiredRole)}
          >
            Access as {requiredRole === 'educator' ? 'Educator / Facilitator' : 'Parent / Guardian'}
          </button>
          <Link to="/" className={styles.returnLink}>
            Return to Learner Experience
          </Link>
        </div>
      </div>
    </div>
  );
}

