import React from 'react';
import { PhoneCall, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VERIFIED_SUPPORT_SERVICES } from '../data/verifiedSupportServices';
import styles from './VerifiedHelplineDirectory.module.css';

export function VerifiedHelplineDirectory() {
  return (
    <section className={styles.section} aria-labelledby="helpline-directory-heading">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Official Statutory Protections</span>
        <h2 id="helpline-directory-heading" className={styles.title}>
          Verified Government Support & Emergency Resources
        </h2>
        <p className={styles.lead}>
          All listed services are official statutory bodies of the Government of India.
          Calls to 1098, 112, and 1930 are 100% toll-free from any mobile or landline across India.
        </p>
      </div>

      <div className={styles.grid}>
        {VERIFIED_SUPPORT_SERVICES.map((service) => {
          const isPhone = service.type === 'phone' || service.type === 'phone_and_web';
          const telHref = isPhone ? `tel:${service.shortCode.replace(/[^0-9]/g, '')}` : null;

          return (
            <div 
              key={service.id} 
              className={`${styles.card} ${service.isPrimary ? styles.cardPrimary : ''}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                {service.isPrimary && (
                  <span className={styles.badgePrimary}>Primary Child Helpline</span>
                )}
              </div>

              <div className={styles.numberBlock}>
                <div className={styles.numberBig}>{service.shortCode}</div>
                <div className={styles.hoursText}>{service.operationalHours} · {service.cost}</div>
              </div>

              <p className={styles.desc}>{service.description}</p>

              {service.actionInstructions && (
                <div className={styles.instructionsList}>
                  <strong>How to use this resource:</strong>
                  <ul>
                    {service.actionInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.metaRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={15} color="var(--color-peacock-600)" />
                  <span>{service.authority}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {isPhone && telHref && (
                    <a href={telHref} className={styles.btnCall}>
                      <PhoneCall size={14} />
                      <span>Dial {service.shortCode}</span>
                    </a>
                  )}
                  {service.officialUrl && (
                    <a 
                      href={service.officialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.btnWeb}
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default VerifiedHelplineDirectory;

