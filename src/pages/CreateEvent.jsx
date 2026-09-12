import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARTWORKS } from '../data/artworks';
import { WAX_SEALS, FRAMING_BORDERS, DRESS_CODES, RSVP_PRESETS } from '../data/decorations';
import InviteCard from '../components/InviteCard';
import DesignSuite from '../components/DesignSuite';
import ParticlesCanvas from '../components/ParticlesCanvas';
import { Share2, Sparkles, Moon, X } from 'lucide-react';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { themeId } = useParams();
  const isHouseParty = themeId === 'house-party';

  const [artwork, setArtwork] = useState(isHouseParty ? ARTWORKS.find(a => a.theme === 'psychedelic-retro') || ARTWORKS[0] : ARTWORKS[0]);
  const [theme, setTheme] = useState(isHouseParty ? 'psychedelic-retro' : 'mystic-sufi');
  const [effect, setEffect] = useState(isHouseParty ? 'aurora' : 'stardust');
  const [density, setDensity] = useState(1);
  const [speed, setSpeed] = useState(1);

  const [seal, setSeal] = useState(isHouseParty ? WAX_SEALS.find(s => s.id === 'seal-none') || WAX_SEALS[0] : WAX_SEALS[0]);
  const [framingBorder, setFramingBorder] = useState(isHouseParty ? FRAMING_BORDERS.find(b => b.id === 'border-neon') || FRAMING_BORDERS[0] : FRAMING_BORDERS[0]);
  const [dressCode, setDressCode] = useState(isHouseParty ? null : DRESS_CODES[0]);

  // Host-Editable RSVP Options (Yes, No, Maybe)
  const initialRsvp = isHouseParty ? RSVP_PRESETS.find(p => p.id === 'classic') : RSVP_PRESETS.find(p => p.id === 'sufi');
  const [rsvpOptions, setRsvpOptions] = useState({
    yes: initialRsvp.yes,
    maybe: initialRsvp.maybe,
    no: initialRsvp.no
  });

  // Event Data
  const [eventData, setEventData] = useState({
    title: isHouseParty ? 'Midnight Neon' : 'Mehfil-e-Samaa',
    subtitle: isHouseParty ? 'An exclusive late night gathering under the neon lights.' : 'An evening of ecstatic Sufi soul, transcendent qawwali, and timeless melody under the open sky.',
    host: isHouseParty ? 'The Neon Collective' : 'Arjun & The Mystic Collective',
    date: isHouseParty ? 'Saturday, October 25' : 'Saturday, October 18',
    time: isHouseParty ? '10:00 PM — Late' : '8:00 PM — Late Night Under Starlight',
    venue: isHouseParty ? 'The Cyber Loft' : 'The Haveli Courtyard, Hauz Khas Village',
    description: isHouseParty ? 'Join us for a massive house party with loud bass, neon visuals, and non-stop dancing. RSVP to unlock the location. Dress to impress in your best cyber/retro gear.' : 'Come experience the timeless mysticism of Sufi music in an intimate, candlelit baithak setting. We\'ll journey through soul-stirring qawwalis, Rajasthani folk raags, and meditative tanpura drones. Expect warm zafrani chai, velvet floor cushions on vintage Persian rugs, and an atmosphere that dissolves the boundaries between song and spirit. Leave your shoes and worries at the carved wooden door. ✦',
    vibeTags: isHouseParty ? '🪩 Loud Bass, 🌌 Aurora Rays, 🍸 Neon Cocktails, 🕶️ Late Night Vibes' : '🕯️ Candlelit Baithak, 🫖 Zafrani Chai & Dastarkhwan, 👘 White Kurtas / Shawls, 🎶 Live Tanpura & Harmonium, 🌙 Open Air Courtyard'
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

  function handleSelectTheme(t) {
    setTheme(t);
    // Find relevant UI effect based on theme
    const themeEffects = {
      'mystic-sufi': 'stardust',
      'midnight-qawwali': 'soundwaves',
      'desert-dune': 'embers',
      'heritage-royal': 'jasmine',
      'neon-cyber': 'aurora'
    };
    if (themeEffects[t]) setEffect(themeEffects[t]);
    triggerToast('Theme & FX updated!');
  }

  function handleShare() {
    triggerToast('🎉 Event Created! Redirecting to Dashboard...');
    setTimeout(() => {
      navigate('/dashboard/demo-id');
    }, 1500);
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
          <div className="nav-logo" onClick={() => navigate('/')}>
            <span className="nav-logo-icon">☽</span>
            <div className="nav-logo-group">
              <span className="nav-logo-text">havan</span>
              <span className="nav-logo-badge">Studio</span>
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
              <span>Publish Invite</span>
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
              onSelectTheme={handleSelectTheme}
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
