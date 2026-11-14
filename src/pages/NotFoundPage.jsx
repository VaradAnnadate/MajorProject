import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, BookOpen, ShieldCheck, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main 
      role="main"
      style={{
        paddingTop: 'clamp(3rem, 6vw, 6rem)',
        paddingBottom: 'clamp(4rem, 8vw, 8rem)',
        textAlign: 'center'
      }}
    >
      <div className="container-narrow">
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-canvas-card)',
            border: '2px solid var(--color-saffron-500)',
            color: 'var(--color-saffron-600)',
            marginBottom: 'var(--space-4)',
            boxShadow: 'var(--shadow-md)'
          }}
          aria-hidden="true"
        >
          <Compass size={38} />
        </div>

        <span className="editorial-eyebrow" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
          Navigation Notice · 404
        </span>

        <h1 
          className="hero-headline" 
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            marginBottom: 'var(--space-3)' 
          }}
        >
          Lost in the Realms?
        </h1>

        <p className="text-lead" style={{ marginBottom: 'var(--space-8)' }}>
          The path you seek is not on the map yet. Don't worry, every explorer takes a wrong turn now and then! Let's get you back to safe ground.
        </p>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
            textAlign: 'left'
          }}
        >
          <Link 
            to="/" 
            className="card-story"
            style={{
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
              border: '1.5px solid var(--color-border-medium)'
            }}
          >
            <Home size={22} style={{ color: 'var(--color-saffron-600)', flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>Home Base</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Return to the main story entrance</span>
            </div>
          </Link>

          <Link 
            to="/world" 
            className="card-story"
            style={{
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
              border: '1.5px solid var(--color-border-medium)'
            }}
          >
            <Map size={22} style={{ color: 'var(--color-peacock-500)', flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>World Map</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Explore the 5 constitutional realms</span>
            </div>
          </Link>

          <Link 
            to="/adventures" 
            className="card-story"
            style={{
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
              border: '1.5px solid var(--color-border-medium)'
            }}
          >
            <BookOpen size={22} style={{ color: 'var(--color-saffron-500)', flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>Adventures</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Browse story quests and dilemmas</span>
            </div>
          </Link>

          <Link 
            to="/safety" 
            className="card-story"
            style={{
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              color: 'inherit',
              border: '1.5px solid var(--color-border-medium)'
            }}
          >
            <ShieldCheck size={22} style={{ color: 'var(--color-terracotta-500)', flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>Child Safety Hub</strong>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-ink-muted)' }}>Emergency helplines & safety rules</span>
            </div>
          </Link>
        </div>

        <Link to="/" className="btn btn-primary" style={{ padding: '0.65rem 1.6rem' }}>
          Back to Safety & Home
        </Link>
      </div>
    </main>
  );
}
