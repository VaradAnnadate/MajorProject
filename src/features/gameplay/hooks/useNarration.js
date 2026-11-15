/**
 * useNarration — Text-to-Speech narration hook for quest dialogues.
 *
 * Uses native Web SpeechSynthesis with automatic voice hydration, un-pause handling,
 * and user-gesture activation to ensure audio plays audibly in all modern browsers.
 */

import { useCallback, useRef, useState, useEffect } from 'react';

export function useNarration() {
  const utteranceRef = useRef(null);
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize and keep voices ready
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      try {
        window.speechSynthesis.getVoices();
      } catch {
        // no-op
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  /** Stop any active audio immediately */
  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // no-op
      }
      if (utteranceRef.current) {
        utteranceRef.current.onstart = null;
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
        utteranceRef.current = null;
      }
    }
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = '';
      } catch {
        // no-op
      }
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  /**
   * Speak `text`
   */
  const speak = useCallback((text) => {
    const cleanText = (text || '').trim();
    if (!cleanText || isMuted) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('[useNarration] SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Stop previous utterance immediately
    stop();

    try {
      // Clear any hung queue in the browser
      window.speechSynthesis.cancel();

      // Safari/Chrome resume hack if speech engine was paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utt = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utt;
      utt.rate = 0.95;
      utt.pitch = 1.0;
      utt.volume = 1.0;

      // Select natural voice
      const voices = window.speechSynthesis.getVoices() || [];
      if (voices.length > 0) {
        const selected =
          voices.find((v) => v.lang.startsWith('en-IN') && !v.name.includes('Compact')) ||
          voices.find((v) => v.lang.startsWith('en-US')) ||
          voices.find((v) => v.lang.startsWith('en-GB')) ||
          voices.find((v) => v.lang.startsWith('en'));
        if (selected) {
          utt.voice = selected;
        }
      }

      utt.onstart = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      utt.onend = () => {
        setIsPlaying(false);
        setIsLoading(false);
        utteranceRef.current = null;
      };

      utt.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('[useNarration] Speech synthesis error:', e.error || e);
        }
        setIsPlaying(false);
        setIsLoading(false);
        utteranceRef.current = null;
      };

      setIsLoading(false);
      setIsPlaying(true);

      window.speechSynthesis.speak(utt);

      // Chrome speech timeout safeguard: keep engine alive
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err) {
      console.error('[useNarration] Speak error:', err);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [isMuted, stop]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) stop();
      return next;
    });
  }, [stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop, isLoading, isPlaying, isMuted, toggleMute };
}
