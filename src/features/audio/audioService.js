/**
 * audioService.js
 * Centralized Audio & Speech Recognition Controller for RightsQuest India.
 *
 * Guarantees:
 * 1. Single-Flight Audio playback: Never allows multiple audio tracks or TTS utterances to play simultaneously.
 * 2. Session IDs & Cancellation: Prevents stale network/TTS audio from playing after user navigates or selects new text.
 * 3. Pause & Resume: True pause/resume capability on active audio streams.
 * 4. Stop: Immediately purges active audio, revokes object URLs, cancels ongoing fetch requests, and stops browser speech synthesis.
 * 5. Configurable Speech Recognition (ASR): Modular multi-model ASR interface supporting Whisper Large-v3 Turbo, Meta MMS, and Conformer/Indic models with HF Inference.
 */

// Available configurable ASR models on Hugging Face Inference
export const ASR_MODELS = {
  // Ultra-low latency, highly optimized sentence segmentation, lightweight variant of v3
  WHISPER_TURBO: {
    id: 'openai/whisper-large-v3-turbo',
    name: 'Whisper Large-v3 Turbo',
    description: '4x faster inference with comparable accuracy, natural sentence boundaries and lower latency than Large-v3.',
    supportsPunctuation: true,
    languages: ['en', 'hi', 'multilingual'],
    recommended: true
  },
  // Meta MMS multilingual 1400+ languages including Hindi, Bengali, Tamil, etc.
  META_MMS_HINDI: {
    id: 'facebook/mms-1b-all',
    name: 'Meta MMS 1B (Multilingual)',
    description: 'Massively Multilingual Speech covering 1,400+ languages including Hindi and Indian regional languages.',
    supportsPunctuation: true,
    languages: ['en', 'hi', 'regional'],
    recommended: false
  },
  // NVIDIA FastConformer / Canary
  CANARY_1B: {
    id: 'nvidia/canary-1b',
    name: 'NVIDIA Canary 1B',
    description: 'High-accuracy multilingual speech-to-text and punctuation model (English, German, French, Spanish).',
    supportsPunctuation: true,
    languages: ['en', 'multilingual'],
    recommended: false
  },
  // Classic Whisper Large-v3 (preserved for backward compatibility/choice)
  WHISPER_LARGE_V3: {
    id: 'openai/whisper-large-v3',
    name: 'OpenAI Whisper Large-v3',
    description: 'Standard Whisper v3 model; higher compute and latency.',
    supportsPunctuation: true,
    languages: ['en', 'hi', 'multilingual'],
    recommended: false
  }
};

// Default models
export const DEFAULT_ASR_MODEL_ID = ASR_MODELS.WHISPER_TURBO.id;
export const DEFAULT_TTS_MODEL_ID = 'facebook/mms-tts-eng';

class CentralizedAudioService {
  constructor() {
    const metaEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
    const processEnv = typeof process !== 'undefined' && process.env ? process.env : {};

    this.hfToken = metaEnv.VITE_HF_TOKEN || processEnv.VITE_HF_TOKEN || '';
    this.asrModelId = metaEnv.VITE_ASR_MODEL_ID || processEnv.VITE_ASR_MODEL_ID || DEFAULT_ASR_MODEL_ID;
    this.ttsModelId = metaEnv.VITE_TTS_MODEL_ID || processEnv.VITE_TTS_MODEL_ID || DEFAULT_TTS_MODEL_ID;

    this.client = null;
    this.clientPromise = null;

    // Playback state
    this.currentAudio = null;
    this.currentBlobUrl = null;
    this.currentSessionId = 0;
    this.abortController = null;

    // Track state
    this.currentText = '';
    this.isLoading = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.isMuted = false;

    // Listeners for UI state synchronisation
    this.listeners = new Set();

    // Auto-listen to route/hash changes in the browser to immediately terminate playback
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => this.stop());
      window.addEventListener('hashchange', () => this.stop());
    }
  }

  async getClient() {
    if (this.client) return this.client;
    if (!this.hfToken || this.hfToken.includes('your_token_here')) {
      return null;
    }
    if (!this.clientPromise) {
      this.clientPromise = import('@huggingface/inference').then((module) => {
        this.client = new module.InferenceClient(this.hfToken);
        return this.client;
      }).catch((err) => {
        console.warn('[CentralizedAudioService] Failed to load @huggingface/inference dynamically:', err);
        this.clientPromise = null;
        return null;
      });
    }
    return this.clientPromise;
  }

  setToken(token) {
    this.hfToken = token;
    this.client = null;
    this.clientPromise = null;
  }

  setAsrModel(modelId) {
    if (Object.values(ASR_MODELS).some(m => m.id === modelId)) {
      this.asrModelId = modelId;
    }
  }

  getAsrModel() {
    return this.asrModelId;
  }

  setTtsModel(modelId) {
    this.ttsModelId = modelId;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Fire current state immediately
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(fn => {
      try {
        fn(state);
      } catch (err) {
        console.error('[CentralizedAudioService] Listener error:', err);
      }
    });
  }

  getState() {
    return {
      currentText: this.currentText,
      isLoading: this.isLoading,
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      isMuted: this.isMuted,
      asrModel: this.asrModelId,
      ttsModel: this.ttsModelId,
      hasHfToken: Boolean(this.client)
    };
  }

  /**
   * Terminate all active and queued audio, abort pending network calls,
   * cancel speech synthesis, and release blob memory.
   */
  stop() {
    // Increment session ID to immediately invalidate any in-flight promises
    this.currentSessionId++;

    // Cancel in-flight HTTP request
    if (this.abortController) {
      try {
        this.abortController.abort();
      } catch {
        // no-op
      }
      this.abortController = null;
    }

    // Stop HTMLAudioElement
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.removeAttribute('src');
        this.currentAudio.load();
      } catch {
        // no-op
      }
      this.currentAudio = null;
    }

    // Revoke previous blob URL
    if (this.currentBlobUrl) {
      try {
        URL.revokeObjectURL(this.currentBlobUrl);
      } catch {
        // no-op
      }
      this.currentBlobUrl = null;
    }

    // Cancel native SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // no-op
      }
    }

    this.isLoading = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = '';

    this.notify();
  }

  /**
   * Pause active narration
   */
  pause() {
    if (this.currentAudio && this.isPlaying) {
      try {
        this.currentAudio.pause();
      } catch {
        // no-op
      }
      this.isPlaying = false;
      this.isPaused = true;
      this.notify();
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      try {
        window.speechSynthesis.pause();
      } catch {
        // no-op
      }
      this.isPlaying = false;
      this.isPaused = true;
      this.notify();
      return;
    }

    // If marked playing in test/headless environments
    if (this.isPlaying) {
      this.isPlaying = false;
      this.isPaused = true;
      this.notify();
    }
  }

  /**
   * Resume paused narration
   */
  resume() {
    if (this.currentAudio && this.isPaused) {
      this.currentAudio.play().then(() => {
        this.isPlaying = true;
        this.isPaused = false;
        this.notify();
      }).catch(() => {
        this.stop();
      });
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPlaying = true;
      this.isPaused = false;
      this.notify();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    this.notify();
    return this.isMuted;
  }

  /**
   * Primary Speak method: Ensures only 1 audio stream runs.
   * Cancels any active audio before commencing new one.
   *
   * @param {string} text - text to narrate
   * @param {object} options - { force: boolean }
   */
  async speak(text, options = {}) {
    const trimmed = (text || '').trim();
    if (!trimmed || (this.isMuted && !options.force)) {
      return;
    }

    // Stop previous narration immediately and capture fresh session ID
    this.stop();
    const sessionId = this.currentSessionId;

    this.currentText = trimmed;
    this.isLoading = true;
    this.isPlaying = false;
    this.isPaused = false;
    this.notify();

    // 1. Try Hugging Face TTS if token is provided
    const client = await this.getClient();
    if (client) {
      const controller = new AbortController();
      this.abortController = controller;

      try {
        const blob = await client.textToSpeech({
          model: this.ttsModelId,
          inputs: trimmed,
          provider: 'hf-inference'
        }, {
          signal: controller.signal
        });

        // If user changed dialogue or stopped in the interim, discard stale response
        if (this.currentSessionId !== sessionId || controller.signal.aborted) {
          return;
        }

        const url = URL.createObjectURL(blob);
        this.currentBlobUrl = url;

        const audio = new Audio(url);
        this.currentAudio = audio;

        audio.onended = () => {
          if (this.currentSessionId === sessionId) {
            this.stop();
          }
        };

        audio.onerror = (e) => {
          if (this.currentSessionId === sessionId) {
            console.warn('[CentralizedAudioService] Audio playback error, switching to browser TTS fallback:', e);
            this.fallbackBrowserSpeech(trimmed, sessionId);
          }
        };

        this.isLoading = false;
        this.isPlaying = true;
        this.isPaused = false;
        this.notify();

        await audio.play();
        return;
      } catch (err) {
        if (this.currentSessionId !== sessionId) {
          return; // Intentional discard of superseded session
        }
        if (err.name !== 'AbortError') {
          console.warn('[CentralizedAudioService] HF TTS request failed, using browser speech synthesis fallback:', err.message);
          this.fallbackBrowserSpeech(trimmed, sessionId);
        }
        return;
      }
    }

    // 2. Fallback to Browser Speech Synthesis
    this.fallbackBrowserSpeech(trimmed, sessionId);
  }

  fallbackBrowserSpeech(text, sessionId) {
    if (this.currentSessionId !== sessionId) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.isLoading = false;
      this.isPlaying = false;
      this.notify();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best English voice available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      if (this.currentSessionId === sessionId) {
        this.isLoading = false;
        this.isPlaying = true;
        this.isPaused = false;
        this.notify();
      }
    };

    utterance.onend = () => {
      if (this.currentSessionId === sessionId) {
        this.isLoading = false;
        this.isPlaying = false;
        this.isPaused = false;
        this.notify();
      }
    };

    utterance.onerror = (e) => {
      if (this.currentSessionId === sessionId) {
        this.isLoading = false;
        this.isPlaying = false;
        this.isPaused = false;
        this.notify();
      }
    };

    this.isLoading = false;
    this.isPlaying = true;
    this.notify();

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Automatic Speech Recognition (Audio to Text)
   * Evaluates input audio buffer/blob and transcribes with the configured model.
   *
   * @param {Blob|ArrayBuffer|Uint8Array} audioData
   * @param {object} options - { model: string, language: string }
   * @returns {Promise<{ text: string, model: string }>}
   */
  async transcribeAudio(audioData, options = {}) {
    const selectedModel = options.model || this.asrModelId;
    const client = await this.getClient();

    if (!client) {
      throw new Error('Hugging Face Token is not configured. Please supply VITE_HF_TOKEN in .env to run ASR transcription.');
    }

    try {
      const response = await client.automaticSpeechRecognition({
        data: audioData,
        model: selectedModel,
        provider: 'hf-inference'
      });

      return {
        text: response?.text || '',
        model: selectedModel
      };
    } catch (err) {
      // Automatic fallback to Whisper Large-v3 Turbo if specific model had issues
      if (selectedModel !== ASR_MODELS.WHISPER_TURBO.id) {
        console.warn(`[CentralizedAudioService] ASR failed with ${selectedModel}, falling back to Whisper Large-v3 Turbo:`, err.message);
        const fallbackResponse = await client.automaticSpeechRecognition({
          data: audioData,
          model: ASR_MODELS.WHISPER_TURBO.id,
          provider: 'hf-inference'
        });
        return {
          text: fallbackResponse?.text || '',
          model: ASR_MODELS.WHISPER_TURBO.id,
          fellBack: true
        };
      }
      throw err;
    }
  }
}

// Export singleton instance
export const audioService = new CentralizedAudioService();
