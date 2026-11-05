import React from 'react';

/**
 * WorldAtmosphere — Ambient Floating Spores & Drifting Cloud Shadows
 * Renders lightweight CSS-animated particle spores and environmental light layers.
 */
export default function WorldAtmosphere() {
  // Deterministic positions for spores to prevent hydration mismatch
  const spores = [
    { top: '18%', left: '15%', size: 4, delay: '0s', dur: '7s' },
    { top: '25%', left: '45%', size: 6, delay: '1.5s', dur: '9s' },
    { top: '35%', left: '78%', size: 3, delay: '0.8s', dur: '6.5s' },
    { top: '65%', left: '22%', size: 5, delay: '2.4s', dur: '8.2s' },
    { top: '78%', left: '60%', size: 4, delay: '3.1s', dur: '7.8s' },
    { top: '50%', left: '88%', size: 6, delay: '1.2s', dur: '9.5s' },
    { top: '82%', left: '35%', size: 3, delay: '4s', dur: '6.8s' }
  ];

  return (
    <div 
      className="world-atmosphere-layer"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10
      }}
      aria-hidden="true"
    >
      {spores.map((spore, idx) => (
        <div
          key={idx}
          className="atmosphere-spore"
          style={{
            top: spore.top,
            left: spore.left,
            width: `${spore.size}px`,
            height: `${spore.size}px`,
            animationDelay: spore.delay,
            animationDuration: spore.dur
          }}
        />
      ))}
    </div>
  );
}

