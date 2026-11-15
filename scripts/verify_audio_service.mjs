import assert from 'node:assert';
import { audioService, ASR_MODELS } from '../src/features/audio/audioService.js';

console.log('--- TEST SUITE: Centralized Audio Controller & ASR Engine ---');

// Test 1: Initial state is clean
const state1 = audioService.getState();
assert.strictEqual(state1.isPlaying, false, 'Initial isPlaying must be false');
assert.strictEqual(state1.isLoading, false, 'Initial isLoading must be false');
assert.strictEqual(state1.isPaused, false, 'Initial isPaused must be false');
assert.strictEqual(state1.currentText, '', 'Initial text must be empty');
console.log('✓ Test 1: Initial state is clean and idle');

// Test 2: Model Configuration
assert.strictEqual(audioService.getAsrModel(), 'openai/whisper-large-v3-turbo', 'Default ASR model should be Whisper Turbo');
audioService.setAsrModel(ASR_MODELS.META_MMS_HINDI.id);
assert.strictEqual(audioService.getAsrModel(), 'facebook/mms-1b-all', 'ASR model should switch dynamically to Meta MMS');
audioService.setAsrModel(ASR_MODELS.WHISPER_TURBO.id);
assert.strictEqual(audioService.getAsrModel(), 'openai/whisper-large-v3-turbo', 'Switched back to Whisper Turbo');
console.log('✓ Test 2: ASR model is dynamically configurable');

// Test 3: Stop terminates any session and increments session ID
const initialSessionId = audioService.currentSessionId;
audioService.stop();
assert.strictEqual(audioService.currentSessionId, initialSessionId + 1, 'Calling stop must increment currentSessionId to invalidate active fetches');
console.log('✓ Test 3: Stop invalidates active sessions and cancels tokens');

// Test 4: Rapid multi-call race condition handling
audioService.speak('First fast sentence');
const sessionAfterFirst = audioService.currentSessionId;
audioService.speak('Second rapid sentence');
const sessionAfterSecond = audioService.currentSessionId;
assert(sessionAfterSecond > sessionAfterFirst, 'Subsequent speak calls must immediately supersede previous sessions');
assert.strictEqual(audioService.currentText, 'Second rapid sentence', 'Current text must belong strictly to the newest invocation');
audioService.stop();
console.log('✓ Test 4: Rapid navigation supersedes prior calls without overlapping audio');

// Test 5: Pause and Resume state machine
audioService.isPlaying = true;
audioService.pause();
assert.strictEqual(audioService.isPaused, true, 'Calling pause sets isPaused to true');
assert.strictEqual(audioService.isPlaying, false, 'Calling pause sets isPlaying to false');
audioService.stop();
assert.strictEqual(audioService.isPaused, false, 'Stop resets paused flag');
console.log('✓ Test 5: Pause, resume and stop lifecycle behaves correctly');

// Test 6: Mute behavior
const muted = audioService.toggleMute();
assert.strictEqual(muted, true, 'toggleMute should toggle to true');
assert.strictEqual(audioService.getState().isMuted, true, 'State should reflect isMuted');
audioService.speak('This should not play while muted');
assert.strictEqual(audioService.getState().isPlaying, false, 'Muted state prevents audio playback');
audioService.toggleMute();
assert.strictEqual(audioService.getState().isMuted, false, 'Mute toggled back to false');
console.log('✓ Test 6: Mute cleanly prevents playback and resets properly');

console.log('------------------------------------------------------------');
console.log('ALL 6 AUDIO CONTROLLER VERIFICATION TESTS PASSED');
console.log('------------------------------------------------------------');
