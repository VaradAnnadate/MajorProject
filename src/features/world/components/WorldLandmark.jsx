import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * WorldLandmark — Discoverable secret locations on the world map canvas
 */
export default function WorldLandmark({ landmark, onSelect }) {
  const { coords, name, type } = landmark;

  return (
    <button
      className="world-landmark-beacon"
      style={{
        left: `${coords.x}%`,
        top: `${coords.y}%`,
        border: 'none',
        background: 'transparent',
        padding: 0
      }}
      onClick={() => onSelect(landmark)}
      aria-label={`Discover landmark: ${name} (${type})`}
      title={`Click to inspect landmark: ${name}`}
    >
      <div className="landmark-dot">
        <Sparkles size={10} color="#FFFFFF" />
        <div className="landmark-beacon-ripple" />
      </div>
    </button>
  );
}

