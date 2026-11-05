import React, { useState } from 'react';
import { X, Sparkles, HeartHandshake, ShieldAlert } from 'lucide-react';
import Mascot from './Mascot';
import { MASCOT_STATES } from '../data/mascotStates';

/**
 * MascotReaction — Contextual companion widget
 * Surfaces Mitra in the lower corner of discovery screens, offering gentle encouragement,
 * hints, and a direct line to child safety guidance.
 */
export default function MascotReaction({
  worldId = null,
  landmark = null,
  customState = null,
  customDialogue = null,
  onOpenGuide = null
}) {
  const [minimized, setMinimized] = useState(false);

  let state = customState || 'idle';
  let dialogue = customDialogue;

  if (landmark) {
    state = 'discovering';
    dialogue = `You uncovered ${landmark.name}! "${landmark.hint || landmark.description}"`;
  } else if (worldId === 'forest-of-safety') {
    state = 'concerned';
    dialogue = 'Here in the Forest of Safety, remember: your body belongs to you. No secret should ever make you feel scared.';
  } else if (worldId === 'gardens-of-growth') {
    state = 'curious';
    dialogue = 'In the Gardens of Growth, Article 21A guarantees that school doors are open wide for every single child!';
  } else if (worldId === 'village-of-belonging') {
    state = 'happy';
    dialogue = 'Every friend in this village is equal. Differences in language, home, or gender make our circle stronger!';
  } else if (worldId === 'river-of-voices') {
    state = 'explaining';
    dialogue = 'Under UNCRC Article 12, children have the right to speak their thoughts on things that affect their lives.';
  } else if (worldId === 'haven-of-dignity') {
    state = 'thinking';
    dialogue = 'Article 24 and the Child Labour Act protect kids from dangerous work. Learning and playing come first.';
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="btn"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 85,
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          backgroundColor: 'var(--color-canvas-elevated)',
          border: '1.5px solid var(--color-saffron-border)',
          boxShadow: '0 8px 24px rgba(18, 25, 39, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
        aria-label="Summon Mitra Companion"
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-saffron-500)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-ink-primary)' }}>
          Ask Mitra
        </span>
      </button>
    );
  }

  return (
    <aside 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 85,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'auto'
      }}
      aria-label="Mitra Companion Widget"
    >
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <button
          onClick={() => setMinimized(true)}
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-canvas-secondary)',
            border: '1px solid var(--color-border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20
          }}
          title="Minimize companion"
          aria-label="Minimize companion"
        >
          <X size={12} color="var(--color-ink-muted)" />
        </button>

        <Mascot 
          state={state} 
          dialogue={dialogue} 
          size="sm" 
          showBubble={true} 
          interactive={false} 
        />
      </div>
    </aside>
  );
}

