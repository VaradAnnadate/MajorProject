import React, { useState } from 'react';
import styles from './GuardianResourcesAccordion.module.css';

const ACCORDION_ITEMS = [
  {
    id: 'rte-act',
    title: 'The Right to Education (RTE) Act 2009 — Parent Essentials',
    summary: 'Guarantees free and compulsory schooling for all children aged 6 to 14 across India.',
    details: [
      'Zero Tuition Fees: State schools cannot charge fees, capitation fees, or screening charges.',
      '25% Private School Quota: Section 12(1)(c) mandates private unaided schools reserve 25% of entry-level seats for disadvantaged and weaker sections.',
      'Ban on Physical & Mental Harassment: Section 17 strictly outlaws corporal punishment and verbal shaming in schools.',
      'No Detention Until Class 8: Focuses on holistic continuous evaluation without fear of failing or dropping out.',
    ],
  },
  {
    id: 'pocso-act',
    title: 'POCSO Act 2012 & Child Protection Framework',
    summary: 'India’s specialized law protecting children under 18 from sexual offences, abuse, and harassment.',
    details: [
      'Child-Centric Justice: Testimony recorded at the child’s residence or preferred place in presence of trusted parents/guardians.',
      'Identity Protection: The media and public cannot disclose the name, address, school, or photograph of any child victim.',
      'Mandatory Reporting: Any adult aware of abuse has a legal duty to report without fear of civil or criminal liability.',
      'Special POCSO Courts: Designed to complete trials expeditiously with child-friendly court procedures.',
    ],
  },
  {
    id: 'childline-1098',
    title: 'National Childline 1098 — Emergency Protocol',
    summary: 'Emergency 24/7 toll-free crisis response service operated by the Ministry of Women & Child Development.',
    details: [
      'Toll-Free & Confidential: Dial 1098 from any mobile phone or landline anywhere in India without any balance.',
      'Types of Situations: Medical emergencies, child labor rescue, lost/runaway children, emotional distress, or abuse reporting.',
      'Allied Support: Coordinates with Child Welfare Committees (CWCs), Special Juvenile Police Units (SJPUs), and trusted pediatric hospitals.',
    ],
  },
  {
    id: 'dpdp-act',
    title: 'DPDP Act 2023 Section 9: Children’s Digital Safety Rights',
    summary: 'Protects young internet users under 18 from algorithmic surveillance and exploitation.',
    details: [
      'Verifiable Parental Consent: Data fiduciaries must obtain verifiable parental consent before processing child data.',
      'Ban on Tracking & Profiling: Strictly prohibits behavioral monitoring, tracking, or targeted advertisements directed at children.',
      'No Harmful Processing: Prohibits processing personal data in any manner likely to cause detrimental effects to a child’s well-being.',
      'RightsQuest Pledge: RightsQuest operates fully within Section 9 by refusing to collect any child PII in the first place.',
    ],
  },
];

export function GuardianResourcesAccordion() {
  const [openId, setOpenId] = useState(ACCORDION_ITEMS[0].id);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} aria-labelledby="guardian-resources-title">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Verified Legal & Safety Knowledge</span>
        <h2 id="guardian-resources-title" className={styles.title}>
          Essential Child Rights Explainer for Indian Parents
        </h2>
        <p className={styles.subtitle}>
          Clear, jargon-free guides to statutory protections that empower parents, guardians, and communities.
        </p>
      </div>

      <div className={styles.accordionList}>
        {ACCORDION_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.triggerBtn}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
              >
                <div className={styles.triggerText}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemSummary}>{item.summary}</span>
                </div>
                <span className={styles.chevron} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className={styles.contentBody}>
                  <ul className={styles.bulletList}>
                    {item.details.map((point, idx) => (
                      <li key={idx} className={styles.bulletItem}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

