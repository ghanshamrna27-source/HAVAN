import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{ 
      background: 'var(--sand, #E6D5AE)', 
      color: 'var(--ink, #19140F)', 
      fontFamily: "'Mukta', sans-serif", 
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;700&family=Unbounded:wght@300;500;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        .landing-page h1, .landing-page h2, .landing-page h3 {
          font-family: 'Clash Display', 'Unbounded', Georgia, serif;
          font-weight: 500;
          line-height: 1.05;
          margin: 0;
        }

        .landing-page .hero {
          background: #1C2A4B;
          color: #E6D5AE;
          padding: 64px 0 56px;
          position: relative;
          overflow: hidden;
        }

        .landing-page .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative;
          z-index: 1;
        }

        .landing-page .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: end;
        }

        @media (min-width: 900px) {
          .landing-page .hero-grid {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }

        .landing-page .wordmark {
          font-family: 'Clash Display', 'Unbounded', Georgia, serif;
          font-weight: 600;
          font-size: clamp(60px, 12vw, 150px);
          letter-spacing: -0.04em;
          line-height: 0.85;
          color: #E6D5AE;
          position: relative;
          display: inline-block;
        }

        .landing-page .wordmark .hin {
          font-family: 'Mukta', sans-serif;
          font-weight: 500;
          font-size: clamp(30px, 5vw, 64px);
          color: #C0922E;
          letter-spacing: 0;
          line-height: 1;
          margin-left: 0.15em;
          vertical-align: baseline;
        }
        
        .landing-page .themes-section {
          padding: 72px 0;
        }

        .landing-page .themes-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 32px;
        }

        @media (min-width: 768px) {
          .landing-page .themes-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .landing-page .theme-card {
          background: #111A32;
          color: #E6D5AE;
          border: 2px solid #19140F;
          padding: 30px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px);
        }
        
        .landing-page .theme-card:hover {
          transform: translateY(-4px);
        }

        .landing-page .theme-card.disabled {
          background: #C9CFD6;
          color: #19140F;
          cursor: not-allowed;
        }

        .landing-page .theme-card h3 {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .landing-page .theme-card p {
          font-size: 16px;
          opacity: 0.8;
        }

        .landing-page .stepwell-bg {
          position: absolute;
          inset: 0;
          opacity: 0.14;
          pointer-events: none;
        }
      `}</style>

      <div className="hero">
        <svg className="stepwell-bg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="sw" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 120 L0 90 L30 90 L30 60 L60 60 L60 30 L90 30 L90 0 L120 0 L120 120 Z" fill="#E6D5AE"/>
              <path d="M0 90 L30 90 L30 60 L60 60 L60 30 L90 30 L90 0" fill="none" stroke="#C0922E" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#sw)"/>
        </svg>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div style={{ fontSize: '18px', color: '#C0922E', marginBottom: '22px' }}>
                Bombay Deco, refracted
              </div>
              <h1 style={{ fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.01em' }}>
                Host your next gathering.
              </h1>
              <p style={{ marginTop: '22px', fontSize: '19px', color: '#D9CCB0', maxWidth: '54ch' }}>
                Welcome to Havan. Create immersive, beautiful invitations with a stepwell-inspired aesthetic. Pick a theme, customize your event, and invite your circle.
              </p>
            </div>
            <div>
              <div className="wordmark">havan<span className="hin">हवन</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section className="themes-section">
          <h2>Pick a Theme</h2>
          <p style={{ fontSize: '20px', maxWidth: '62ch', color: '#5B4F40' }}>
            Choose the vibe for your gathering. Each theme comes with a tailored design suite, animations, and typography.
          </p>

          <div className="themes-grid">
            <div className="theme-card" onClick={() => navigate('/create/sufi-music')}>
              <h3>Sufi Music</h3>
              <p>Candlelit baithaks, zafrani chai, and transcendent qawwali. A deep, mystic theme with stardust effects and royal wax seals.</p>
              <div style={{ marginTop: '16px', color: '#C0922E', fontWeight: 'bold' }}>Create Invite →</div>
            </div>

            <div className="theme-card" onClick={() => navigate('/create/house-party')}>
              <h3>House Party</h3>
              <p>Late night, neon lights, and loud bass. A cyber-neon theme with aurora rays and modern styling.</p>
              <div style={{ marginTop: '16px', color: '#C0922E', fontWeight: 'bold' }}>Create Invite →</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
