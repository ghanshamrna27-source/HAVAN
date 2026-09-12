import React, { useState, useEffect } from 'react';
import { ARTWORKS } from './data/artworks';
import { WAX_SEALS, FRAMING_BORDERS, DRESS_CODES, RSVP_PRESETS } from './data/decorations';
import InviteCard from './components/InviteCard';
import DesignSuite from './components/DesignSuite';
import ParticlesCanvas from './components/ParticlesCanvas';
import { Share2, Sparkles } from 'lucide-react';

export default function App() {
  const [artwork, setArtwork] = useState(ARTWORKS[0]);
  const [theme, setTheme] = useState('mystic-sufi');
  const [effect, setEffect] = useState('stardust');
  const [density, setDensity] = useState(1);
  const [speed, setSpeed] = useState(1);

  const [seal, setSeal] = useState(WAX_SEALS[0]);
  const [framingBorder, setFramingBorder] = useState(FRAMING_BORDERS[0]);
  const [dressCode, setDressCode] = useState(DRESS_CODES[0]);

  // Host-Editable RSVP Options (Yes, No, Maybe)
  const [rsvpOptions, setRsvpOptions] = useState({
    yes: { emoji: '✨', title: 'Aana Hi Hai', sub: 'Going' },
    maybe: { emoji: '🌙', title: 'Dil Hai', sub: 'Maybe' },
    no: { emoji: '🙏', title: 'Alvida', sub: "Can't Go" }
  });

  // Event Data
  const [eventData, setEventData] = useState({
    title: 'Mehfil-e-Samaa',
    subtitle: 'An evening of ecstatic Sufi soul, transcendent qawwali, and timeless melody under the open sky.',
    host: 'Arjun & The Mystic Collective',
    date: 'Saturday, October 18',
    time: '8:00 PM — Late Night Under Starlight',
    venue: 'The Haveli Courtyard, Hauz Khas Village',
    description: 'Come experience the timeless mysticism of Sufi music in an intimate, candlelit baithak setting. We\'ll journey through soul-stirring qawwalis, Rajasthani folk raags, and meditative tanpura drones. Expect warm zafrani chai, velvet floor cushions on vintage Persian rugs, and an atmosphere that dissolves the boundaries between song and spirit. Leave your shoes and worries at the carved wooden door. ✦',
    vibeTags: '🕯️ Candlelit Baithak, 🫖 Zafrani Chai & Dastarkhwan, 👘 White Kurtas / Shawls, 🎶 Live Tanpura & Harmonium, 🌙 Open Air Courtyard'
  });

  const [mobileView, setMobileView] = useState('preview');
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Update body theme attribute when theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function triggerToast(message) {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2800);
  }

  function handleSelectArtwork(art) {
    setArtwork(art);
    setTheme(art.theme);
    setEffect(art.effect);
    triggerToast(`🎨 Switched artwork to "${art.title}"`);
  }

  function handleShare() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('🔗 Invitation link copied to clipboard!');
    } else {
      triggerToast('🔗 Invitation link ready to share!');
    }
  }

  return (
    <>
      {/* Ambient Aura Background */}
      <div className="aura-bg" id="auraBg">
        <div className="aura-orb aura-orb-1" />
        <div className="aura-orb aura-orb-2" />
        <div className="aura-orb aura-orb-3" />
        <div className="aura-blur-overlay" />
      </div>

      {/* 60fps Interactive Particles Canvas */}
      <ParticlesCanvas effect={effect} density={density} speed={speed} />

      {/* Top Header */}
      <header className="top-header">
        <div className="header-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="nav-logo-icon">☽</span>
            <div className="nav-logo-group">
              <span className="nav-logo-text">mehfil</span>
              <span className="nav-logo-badge">React Studio</span>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="mobile-view-tabs">
            <button
              className={`mobile-tab ${mobileView === 'preview' ? 'active' : ''}`}
              onClick={() => setMobileView('preview')}
            >
              📱 Preview Card
            </button>
            <button
              className={`mobile-tab ${mobileView === 'editor' ? 'active' : ''}`}
              onClick={() => setMobileView('editor')}
            >
              ⚙️ Design Suite
            </button>
          </div>

          {/* Header Action */}
          <div className="nav-actions">
            <button className="nav-btn nav-btn-primary" onClick={handleShare}>
              <Share2 size={16} />
              <span>Share Invite</span>
            </button>
          </div>
        </div>
      </header>

      {/* Master Split Studio Layout */}
      <main className="studio-container">
        <div className={`studio-layout ${mobileView === 'editor' ? 'mobile-show-editor' : 'mobile-show-preview'}`}>

          {/* LEFT COLUMN: Sticky Live Invitation Card Preview */}
          <section className="studio-preview-col">
            <div className="preview-header-bar">
              <span className="preview-status-pill">
                <span className="status-dot" /> Live Card Preview
              </span>
              <span className="preview-hint">Updates simultaneously as you edit</span>
            </div>

            <InviteCard
              artwork={artwork}
              theme={theme}
              seal={seal}
              framingBorder={framingBorder}
              dressCode={dressCode}
              eventData={eventData}
              rsvpOptions={rsvpOptions}
              onToast={triggerToast}
            />
          </section>

          {/* RIGHT COLUMN: Interactive Design & Customization Suite */}
          <section className="studio-editor-wrapper">
            <DesignSuite
              currentArtwork={artwork}
              onSelectArtwork={handleSelectArtwork}
              currentTheme={theme}
              onSelectTheme={(t) => { setTheme(t); triggerToast('Theme palette updated!'); }}
              currentEffect={effect}
              onSelectEffect={(fx) => { setEffect(fx); triggerToast(`FX switched to ${fx}!`); }}
              density={density}
              onSelectDensity={setDensity}
              speed={speed}
              onSelectSpeed={setSpeed}
              currentSeal={seal}
              onSelectSeal={(s) => { setSeal(s); triggerToast(`Wax seal set to ${s.name}`); }}
              currentBorder={framingBorder}
              onSelectBorder={(b) => { setFramingBorder(b); triggerToast(`Card border set to ${b.name}`); }}
              currentDressCode={dressCode}
              onSelectDressCode={(d) => { setDressCode(d); triggerToast(`Dress code set to ${d.title}`); }}
              eventData={eventData}
              onChangeEventData={setEventData}
              rsvpOptions={rsvpOptions}
              onChangeRsvpOptions={setRsvpOptions}
              onToast={triggerToast}
            />
          </section>

        </div>
      </main>

      {/* Floating Share Toast Notification */}
      <div className={`share-toast ${toast.visible ? 'show' : ''}`}>
        <span>{toast.message}</span>
      </div>
    </>
  );
}
