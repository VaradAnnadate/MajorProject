import React from 'react';
import StoryHero from '../features/storytelling/components/StoryHero';
import StoryWorldParallax from '../features/storytelling/components/StoryWorldParallax';
import StoryRightsMetaphor from '../features/storytelling/components/StoryRightsMetaphor';
import StoryMascotIntro from '../features/storytelling/components/StoryMascotIntro';
import { LandingScrollGateway } from '../features/gateway/components/LandingScrollGateway';
import StoryMapPortal from '../features/storytelling/components/StoryMapPortal';
import StoryFinalCta from '../features/storytelling/components/StoryFinalCta';
import '../styles/storytelling.css';

/**
 * LandingPage — Cinematic Living Story World Experience (Part 02)
 * Orchestrates the 6-Scene Persuasion Spine governed by Creative OS 44_AGENCYLIKE_UI.
 * Features the pinned 3D Sovereign Seal of Child Rights between Scene 04 and Scene 05.
 */
export default function LandingPage() {
  return (
    <div className="landing-page-v2">
      {/* Scene 01 — The Invitation */}
      <StoryHero />

      {/* Scene 02 — The World Awakens (Five Realms) */}
      <StoryWorldParallax />

      {/* Scene 03 — Discover the Meaning (Constitutional & UNCRC Metaphors) */}
      <StoryRightsMetaphor />

      {/* Scene 04 — The Companion (Mitra the Sun-Fox) */}
      <StoryMascotIntro />

      {/* 3D Sovereign Seal Gateway — Pinned full-animation scroll experience */}
      <LandingScrollGateway />

      {/* Scene 05 — The Adventure Begins (Interactive Map Centerpiece) */}
      <StoryMapPortal />

      {/* Scene 06 — Final Invitation */}
      <StoryFinalCta />
    </div>
  );
}
