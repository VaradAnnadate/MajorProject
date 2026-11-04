import React from 'react';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmergencyQuickBar() {
  return (
    <aside 
      className="emergency-quickbar" 
      aria-label="Emergency Childline Alert Bar"
      style={{
        backgroundColor: '#161F33',
        color: '#FBF8F3',
        borderBottom: '1px solid rgba(251, 248, 243, 0.12)',
        fontSize: '0.82rem',
        padding: '0.45rem var(--gutter)',
        position: 'relative',
        zIndex: 100
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#DE7215',
              boxShadow: '0 0 0 3px rgba(222, 114, 21, 0.3)'
            }}
          />
          <span style={{ fontFamily: 'var(--font-family-mono)', letterSpacing: '0.02em' }}>
            <strong>CHILD SAFETY HELPLINE:</strong> Dial <strong>1098</strong> (Toll-Free, 24/7 across India)
          </span>
        </div>

        <Link 
          to="/help"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: '#F7C693',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.75rem',
            textDecoration: 'underline',
            fontWeight: 700
          }}
        >
          <span>Safety Contacts & Trusted Adults Guide</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </aside>
  );
}

