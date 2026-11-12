import { useState, useCallback } from 'react';

/**
 * Heuristic distress / sensitive disclosure keyword patterns.
 * Categorized pattern rules for child protection interception.
 * STRICT SAFEGUARD: ZERO GAMIFICATION, ZERO XP REWARD, ZERO DATA STORAGE.
 */
export const SENSITIVE_PATTERNS = [
  { category: 'boundaries', regex: /\b(touched?|touching)\s+(my\s+)?(body|private|chest|groin|pants)\b/i },
  { category: 'boundaries', regex: /\b(bad|unsafe|secret)\s+touch\b/i },
  { category: 'abuse', regex: /\b(molest|rape|sexual|assault|harass|abuse|abused|abusing)\b/i },
  { category: 'abuse', regex: /\b(hit|beat|beating|hitting|strangle|burn|burned|starve)\s+(me|my)\b/i },
  { category: 'exploitation', regex: /\b(forced|forcing)\s+(me\s+)?to\s+(work|labor|marry|undress|beg)\b/i },
  { category: 'distress', regex: /\b(suicide|kill\s+myself|end\s+my\s+life|hurt\s+myself)\b/i },
  { category: 'cyber', regex: /\b(blackmail|extort|threat|threatening|threatened)\s+me\b/i },
  { category: 'cyber', regex: /\b(send|asked\s+for)\s+(nude|naked|private)\s+(photo|picture|pic|video)\b/i },
  { category: 'regional_hindi', regex: /\b(marpeet|chhua|galat\s+tareeke|dar\s+lagta\s+hai)\b/i },
];

/**
 * Pure heuristic scanner function (accessible without React hooks)
 */
export function scanSensitiveDisclosure(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  for (const item of SENSITIVE_PATTERNS) {
    if (item.regex.test(trimmed)) {
      return { category: item.category, triggered: true };
    }
  }
  return null;
}

export function useSensitiveDisclosureGuard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedTrigger, setDetectedTrigger] = useState(null);

  const scanText = useCallback((text) => {
    const trigger = scanSensitiveDisclosure(text);
    if (trigger) {
      setIsModalOpen(true);
      setDetectedTrigger(trigger);
      return trigger;
    }
    return null;
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setDetectedTrigger(null);
  }, []);

  return {
    isModalOpen,
    detectedTrigger,
    scanText,
    closeModal,
    checkTextForSensitiveContent: scanText,
    isDisclosureModalOpen: isModalOpen,
    closeDisclosureModal: closeModal,
  };
}

export default useSensitiveDisclosureGuard;
