import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorldMap from '../../world/components/WorldMap';
import { Compass, Sparkles, MapPin } from 'lucide-react';

/**
 * Scene 05 — The Adventure Begins
 * Directly surfaces the interactive living map as a centerpiece discovery portal
 */
export default function StoryMapPortal() {
  const navigate = useNavigate();

  const handleOpenMission = (mission) => {
    const scenarioId = mission.scenarioId || (
      mission.id?.includes('bench') || mission.id?.includes('pencil') || mission.id?.includes('library') ? 'scenario-01-bench' :
      mission.id?.includes('secret') || mission.id?.includes('digital') ? 'scenario-02-screen' :
      mission.id?.includes('circle') || mission.id?.includes('panchayat') || mission.id?.includes('paper') ? 'scenario-02-words' :
      mission.id?.includes('dhabba') || mission.id?.includes('brick') ? 'scenario-03-workshop' :
      'scenario-01-bench'
    );
    navigate(`/play/${scenarioId}`);
  };

  return (
    <section className="story-scene" style={{ backgroundColor: 'var(--color-canvas-primary)', paddingBottom: 'var(--space-10)' }}>
      <div className="container">
        <div style={{ maxWidth: '780px', marginBottom: 'var(--space-6)' }}>
          <span className="editorial-eyebrow">
            Scene 05 · The Adventure Begins
          </span>
          <h2 
            style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.15,
              margin: 'var(--space-2) 0 var(--space-3) 0',
              color: 'var(--color-ink-primary)'
            }}
          >
            The Explorable Map of Rights
          </h2>
          <p className="text-lead" style={{ color: 'var(--color-ink-secondary)', margin: 0 }}>
            Hover or tap any realm crest to preview its story, inspect golden landmark sparks for hidden lore, 
            or consult Mitra in the corner for companion tips.
          </p>
        </div>

        {/* Embedded Live Interactive World Map */}
        <WorldMap onOpenMission={handleOpenMission} />
      </div>
    </section>
  );
}

