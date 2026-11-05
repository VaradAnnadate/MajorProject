import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';

// Dynamic Lazy Loading for All Pages (Performance & Build Budgets)
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AgeSelectionPage = lazy(() => import('../pages/AgeSelectionPage'));
const LearnerHomePage = lazy(() => import('../pages/LearnerHomePage'));
const ExploreRightsPage = lazy(() => import('../pages/ExploreRightsPage'));
const AdventuresPage = lazy(() => import('../pages/AdventuresPage'));
const WorldMapPage = lazy(() => import('../features/world/pages/WorldMapPage'));
const AchievementsPage = lazy(() => import('../pages/AchievementsPage'));
const GetHelpPage = lazy(() => import('../pages/GetHelpPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));

// Refined Agency Suspense Fallback
function PageFallback() {
  return (
    <div 
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}
    >
      <div 
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2.5px solid var(--color-canvas-secondary)',
          borderTopColor: 'var(--color-saffron-500)',
          animation: 'spinLoader 0.75s linear infinite'
        }}
      />
      <span 
        style={{
          fontFamily: 'var(--font-family-mono)',
          fontSize: '0.74rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-muted)'
        }}
      >
        Loading Storyline...
      </span>
      <style>{`
        @keyframes spinLoader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <LandingPage />
          </Suspense>
        )
      },
      {
        path: 'enter',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AgeSelectionPage />
          </Suspense>
        )
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<PageFallback />}>
            <LearnerHomePage />
          </Suspense>
        )
      },
      {
        path: 'rights',
        element: (
          <Suspense fallback={<PageFallback />}>
            <ExploreRightsPage />
          </Suspense>
        )
      },
      {
        path: 'adventures',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AdventuresPage />
          </Suspense>
        )
      },
      {
        path: 'world',
        element: (
          <Suspense fallback={<PageFallback />}>
            <WorldMapPage />
          </Suspense>
        )
      },
      {
        path: 'achievements',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AchievementsPage />
          </Suspense>
        )
      },
      {
        path: 'help',
        element: (
          <Suspense fallback={<PageFallback />}>
            <GetHelpPage />
          </Suspense>
        )
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
