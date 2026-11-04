import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from '../navigation/Navbar';
import Footer from './Footer';
import EmergencyQuickBar from '../common/EmergencyQuickBar';
import IntroPreloader from '../common/IntroPreloader';
import { useDemoLearner } from '../../context/DemoLearnerContext';

export default function AppShell() {
  const location = useLocation();
  const { introPlaying, introCurtainLifting } = useDemoLearner();

  // Lenis Smooth Inertia Scroll (Creative OS Standard)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Bottom part comes upper choreography
  const isRising = introPlaying && !introCurtainLifting;

  return (
    <div className="app-shell" style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* GOATED Minimalist Agency Story Intro */}
      <IntroPreloader />

      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Main Website Wrapper with Bottom-Up Reveal */}
      <div
        style={{
          transform: isRising ? 'translateY(95px) scale(0.985)' : 'translateY(0px) scale(1)',
          opacity: isRising ? 0.7 : 1,
          filter: isRising ? 'brightness(0.9) blur(1px)' : 'brightness(1) blur(0px)',
          transition: 'transform 0.92s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out, filter 0.85s ease',
          willChange: 'transform, opacity, filter'
        }}
      >
        {/* Childline Safety Quickbar */}
        <EmergencyQuickBar />

        {/* Main Navigation Bar */}
        <Navbar />

        {/* Dynamic Lazy Route Content */}
        <main id="main-content" className="main-content" role="main">
          <Outlet />
        </main>

        {/* Master Editorial Footer */}
        <Footer />
      </div>
    </div>
  );
}
