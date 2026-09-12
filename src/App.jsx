import React, { useState, useEffect } from 'react';
import Backdrop from './components/Backdrop';
import InviteCard from './components/InviteCard';
import DesignSuite from './components/DesignSuite';
import ShareModal from './components/ShareModal';
import { ARTWORKS } from './data/artworks';
import { THEMES } from './data/themes';
import { WAX_SEALS, FRAMING_BORDERS, DRESS_CODES } from './data/decorations';
import { INITIAL_GUESTS } from './data/sampleGuests';
import { Eye, Sliders, Sparkles, Share2 } from 'lucide-react';

export default function App() {
  const [artwork, setArtwork] = useState(ARTWORKS[0]);
  const [theme, setTheme] = useState(THEMES[0]);
  const [seal, setSeal] = useState(WAX_SEALS[0]);
  const [framingBorder, setFramingBorder] = useState(FRAMING_BORDERS[0]);
  const [dressCode, setDressCode] = useState(DRESS_CODES[0]);

  const [effect, setEffect] = useState('stardust');
  const [density, setDensity] = useState(1);
  const [speed, setSpeed] = useState(1);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [guestCount, setGuestCount] = useState(34);
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Mobile responsive pane toggle
  const [mobileView, setMobileView] = useState('preview'); // 'preview' | 'studio'

  // Host-Customizable RSVP Replies
  const [rsvpOptions, setRsvpOptions] = useState({
    yes: { emoji: '🍾', title: "Hell Yeah, I'm In!", sub: 'Ready to rage' },
    maybe: { emoji: '🍹', title: 'Might Slide Through', sub: 'Depends on vibe' },
    no: { emoji: '😴', title: 'FOMO Sleeping In', sub: "Can't make it" }
  });

  // Event Details Live Two-Way Binding
  const [eventData, setEventData] = useState({
    title: 'AFTERHOURS: The Loft Session',
    subtitle: 'Vinyl selections, craft cocktails, rooftop views & late-night frequencies',
    host: 'Devin & Maya',
    date: 'Saturday, October 18, 2026',
    time: '9:00 PM — Sunrise',
    venue: 'The Skyline Loft & Terrace',
    address: '742 Evergreen Blvd, 5th Floor Penthouse',
    doorCode: 'CODE: #9042',
    locationNotes: 'Take the elevator to 4th floor, walk up private spiral stairs to rooftop',
    byobNote: 'BYOB + Artisan punch provided',
    description: 'We are pushing the couches aside, plugging in the analog synths, and turning the terrace into an electric sanctuary. Come dressed to dance, mingle, and celebrate good vibes into the early hours.'
  });

  // Reactive body theme attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme.id);
  }, [theme]);

  // Handle RSVP with count adjustment
  const handleSelectStatus = (statusKey) => {
    if (selectedStatus !== 'yes' && statusKey === 'yes') {
      setGuestCount((prev) => prev + 1);
    } else if (selectedStatus === 'yes' && statusKey !== 'yes') {
      setGuestCount((prev) => Math.max(1, prev - 1));
    }
    setSelectedStatus(statusKey);
  };

  // Add guest note
  const handleAddGuestMessage = (newGuest) => {
    setGuests((prev) => [
      { id: `g-${Date.now()}`, ...newGuest },
      ...prev
    ]);
  };

  // Cycle through seals on click
  const handleCycleSeal = () => {
    const currentIndex = WAX_SEALS.findIndex((s) => s.id === seal.id);
    const nextIndex = (currentIndex + 1) % WAX_SEALS.length;
    setSeal(WAX_SEALS[nextIndex]);
  };

  return (
    <div className="studio-wrapper">
      {/* 5-Layer Layer 1: Ambient Sensory Backdrop */}
      <Backdrop
        currentTheme={theme}
        effect={effect}
        density={density}
        speed={speed}
      />

      {/* Header */}
      <header className="app-header">
        <a href="#" className="brand-badge">
          <div className="brand-icon">🎉</div>
          <div>
            <div className="brand-title">
              <span>AFTERHOURS</span>
              <span className="brand-pill">LIVE STUDIO</span>
            </div>
          </div>
        </a>

        <div className="header-actions">
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Share2 size={14} />
            <span>Share Invite</span>
          </button>
        </div>
      </header>

      {/* Main Studio Container: Left Sticky Preview + Right Control Suite */}
      <main className="studio-container">
        <div className="studio-grid">
          {/* Left Pane: Sticky Live Card */}
          <div style={{ display: mobileView === 'preview' ? 'block' : undefined }} className="preview-pane-wrapper">
            <InviteCard
              artwork={artwork}
              theme={theme}
              seal={seal}
              framingBorder={framingBorder}
              dressCode={dressCode}
              eventData={eventData}
              rsvpOptions={rsvpOptions}
              selectedStatus={selectedStatus}
              onSelectStatus={handleSelectStatus}
              guestCount={guestCount}
              guests={guests}
              onAddGuestMessage={handleAddGuestMessage}
              onOpenShare={() => setIsShareOpen(true)}
              onCycleSeal={handleCycleSeal}
            />
          </div>

          {/* Right Pane: Design & Customization Suite */}
          <div style={{ display: mobileView === 'studio' ? 'block' : undefined }} className="suite-pane-wrapper">
            <DesignSuite
              currentArtwork={artwork}
              onSelectArtwork={setArtwork}
              currentTheme={theme}
              onSelectTheme={setTheme}
              currentSeal={seal}
              onSelectSeal={setSeal}
              currentBorder={framingBorder}
              onSelectBorder={setFramingBorder}
              currentDressCode={dressCode}
              onSelectDressCode={setDressCode}
              currentEffect={effect}
              onSelectEffect={setEffect}
              density={density}
              onSelectDensity={setDensity}
              speed={speed}
              onSelectSpeed={setSpeed}
              rsvpOptions={rsvpOptions}
              onChangeRsvpOptions={setRsvpOptions}
              eventData={eventData}
              onChangeEventData={setEventData}
              onOpenShare={() => setIsShareOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Mobile Floating View Switcher (< 1024px) */}
      <nav className="mobile-view-tabs" aria-label="Mobile view switcher">
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`mobile-tab-btn ${mobileView === 'preview' ? 'active' : ''}`}
        >
          <Eye size={16} />
          <span>Card Preview</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('studio')}
          className={`mobile-tab-btn ${mobileView === 'studio' ? 'active' : ''}`}
        >
          <Sliders size={16} />
          <span>Design Studio</span>
        </button>
      </nav>

      {/* Share & Calendar Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        eventData={{
          ...eventData,
          dressCodeNote: dressCode?.title
        }}
      />
    </div>
  );
}
