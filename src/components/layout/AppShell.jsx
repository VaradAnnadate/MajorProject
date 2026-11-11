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

  const isGameplay = location.pathname.startsWith('/play');

  // Set dark body background during full-screen story gameplay
  useEffect(() => {
    if (isGameplay) {
      const origBg = document.body.style.backgroundColor;
      const origHtmlBg = document.documentElement.style.backgroundColor;
      document.body.style.backgroundColor = '#0B0D14';
      document.documentElement.style.backgroundColor = '#0B0D14';
      return () => {
        document.body.style.backgroundColor = origBg;
        document.documentElement.style.backgroundColor = origHtmlBg;
      };
    }
  }, [isGameplay]);

  // Lenis Smooth Inertia Scroll (Creative OS Standard)
  useEffect(() => {
    // During full-screen story gameplay, allow 100% native responsive scrolling
    if (isGameplay) {
      return;
    }

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
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Bottom part comes upper choreography (only during initial home intro, never in gameplay)
  const isRising = !isGameplay && introPlaying && !introCurtainLifting;

  return (
    <div 
      className="app-shell" 
      style={{ 
        position: 'relative', 
        overflowX: 'clip',
        backgroundColor: isGameplay ? '#0B0D14' : undefined 
      }}
    >
      {/* GOATED Minimalist Agency Story Intro */}
      {!isGameplay && <IntroPreloader />}

      {/* Accessibility Skip Link */}
      {!isGameplay && (
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
      )}

      {/* Main Website Wrapper with Bottom-Up Reveal */}
      <div
        style={{
          transform: isRising ? 'translateY(95px) scale(0.985)' : undefined,
          opacity: isRising ? 0.7 : 1,
          filter: isRising ? 'brightness(0.9) blur(1px)' : undefined,
          transition: 'transform 0.92s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out, filter 0.85s ease',
          willChange: isRising ? 'transform, opacity, filter' : 'auto',
          backgroundColor: isGameplay ? '#0B0D14' : undefined,
          minHeight: isGameplay ? '100vh' : undefined
        }}
      >
        {/* Childline Safety Quickbar */}
        {!isGameplay && <EmergencyQuickBar />}

        {/* Main Navigation Bar */}
        {!isGameplay && <Navbar />}

        {/* Dynamic Lazy Route Content */}
        <main 
          id="main-content" 
          className="main-content" 
          role="main"
          style={{ minHeight: isGameplay ? '100vh' : undefined }}
        >
          <Outlet />
        </main>

        {/* Master Editorial Footer */}
        {!isGameplay && <Footer />}
      </div>
    </div>
  );
}
