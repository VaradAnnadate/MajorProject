import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, PhoneCall, ArrowRight, X } from 'lucide-react';
import styles from './SensitiveDisclosureModal.module.css';

export function SensitiveDisclosureModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToHelp = () => {
    onClose();
    navigate('/safety/get-help');
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="disclosure-title">
      <div className={styles.modalCard}>
        <div className={styles.headerIconRow}>
          <div className={styles.iconWrap}>
            <ShieldAlert size={28} />
          </div>
          <div>
            <span className={styles.tagline}>Important Safety Notice</span>
            <h2 id="disclosure-title" className={styles.title}>
              You Are Safe, But You Don’t Have to Carry This Alone
            </h2>
          </div>
        </div>

        <p className={styles.bodyText}>
          RightsQuest is an <strong>educational game</strong>, not an emergency response line, police desk, or medical clinic.
          Please do not write personal trauma or private abuse details here. The safest step you can take right now is to speak directly to a <strong>trusted adult</strong> who can be by your side, or contact the official toll-free child helpline.
        </p>

        <div className={styles.highlightBox}>
          <div className={styles.highlightPhone}>1098</div>
          <div className={styles.highlightDetails}>
            <strong>National Childline (Toll-Free, 24/7)</strong>
            <div>Free call from any phone in India. Connects with the Ministry of Women & Child Development and Emergency 112.</div>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" onClick={handleGoToHelp} className={styles.btnPrimaryAction}>
            <span>View Safety Contacts & Guide</span>
            <ArrowRight size={16} />
          </button>
          <button type="button" onClick={onClose} className={styles.btnDismiss}>
            <span>Return to Learning</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SensitiveDisclosureModal;

