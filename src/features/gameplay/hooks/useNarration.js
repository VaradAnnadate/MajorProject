/**
 * useNarration — Text-to-Speech narration hook for quest dialogues.
 *
 * Uses Hugging Face Inference API (facebook/mms-tts-eng) to synthesise
 * speech for narrator, character, and mitra dialogue lines.
 *
 * Usage:
 *   const { speak, stop, isLoading, isPlaying, isMuted, toggleMute } = useNarration();
 *   speak("It is Monday morning...");
 */

import { useCallback, useRef, useState } from 'react';
import { InferenceClient } from '@huggingface/inference';

// Vite exposes VITE_* env vars to the client bundle
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const TTS_MODEL = 'facebook/mms-tts-eng';

let clientInstance = null;
function getClient() {
  if (!clientInstance && HF_TOKEN) {
    clientInstance = new InferenceClient(HF_TOKEN);
  }
  return clientInstance;
}

export function useNarration() {
  const audioRef = useRef(null);
  const abortRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  /** Stop any audio currently playing */
  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  /**
   * Speak `text` via HF TTS.
   * Silently no-ops when muted or no token is configured.
   */
  const speak = useCallback(async (text) => {
    if (!text || isMuted) return;

    const client = getClient();
    if (!client) {
      // No HF token — fall back to browser's built-in speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.rate = 0.92;
        utt.pitch = 1;
        setIsPlaying(true);
        utt.onend = () => setIsPlaying(false);
        utt.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utt);
      }
      return;
    }

    // Stop any previous audio
    stop();

    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);

    try {
      const blob = await client.textToSpeech({
        model: TTS_MODEL,
        inputs: text,
        provider: 'hf-inference',
      });

      if (controller.signal.aborted) return;

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setIsPlaying(false);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        setIsPlaying(false);
        setIsLoading(false);
      };

      setIsLoading(false);
      setIsPlaying(true);
      await audio.play();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('[useNarration] TTS error, falling back to browser synthesis:', err.message);
        // Graceful fallback
        if ('speechSynthesis' in window) {
          const utt = new SpeechSynthesisUtterance(text);
          utt.rate = 0.92;
          setIsPlaying(true);
          utt.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(utt);
        }
      }
      setIsLoading(false);
    }
  }, [isMuted, stop]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) stop(); // stop current if muting
      return !prev;
    });
  }, [stop]);

  return { speak, stop, isLoading, isPlaying, isMuted, toggleMute };
}

