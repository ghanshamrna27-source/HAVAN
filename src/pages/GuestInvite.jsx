import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InviteCard from '../components/InviteCard';
import ParticlesCanvas from '../components/ParticlesCanvas';
import { ARTWORKS } from '../data/artworks';
import { WAX_SEALS, FRAMING_BORDERS, DRESS_CODES } from '../data/decorations';
import { Sparkles, Moon, X } from 'lucide-react';

export default function GuestInvite() {
  const { id } = useParams();
  const [toast, setToast] = useState({ visible: false, message: '' });

  const [guestName, setGuestName] = useState('');
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [pendingRsvp, setPendingRsvp] = useState(null);
  
  // Using default data for the prototype
  const artwork = ARTWORKS[0];
  const theme = 'mystic-sufi';
  const effect = 'stardust';
  const seal = WAX_SEALS[0];
  const framingBorder = FRAMING_BORDERS[0];
  const dressCode = DRESS_CODES[0];

  const rsvpOptions = {
    yes: { emoji: <Sparkles size={16} strokeWidth={1.5} />, title: 'Aana Hi Hai', sub: 'Going' },
    maybe: { emoji: <Moon size={16} strokeWidth={1.5} />, title: 'Dil Hai', sub: 'Maybe' },
    no: { emoji: <X size={16} strokeWidth={1.5} />, title: 'Alvida', sub: "Can't Go" }
  };

  const eventData = {
    title: 'Mehfil-e-Samaa',
    subtitle: 'An evening of ecstatic Sufi soul, transcendent qawwali, and timeless melody under the open sky.',
    host: 'Arjun & The Mystic Collective',
    date: 'Saturday, October 18',
    time: '8:00 PM — Late Night Under Starlight',
    venue: 'The Haveli Courtyard, Hauz Khas Village',
    description: 'Come experience the timeless mysticism of Sufi music in an intimate, candlelit baithak setting. We\'ll journey through soul-stirring qawwalis, Rajasthani folk raags, and meditative tanpura drones. Expect warm zafrani chai, velvet floor cushions on vintage Persian rugs, and an atmosphere that dissolves the boundaries between song and spirit. Leave your shoes and worries at the carved wooden door. ✦',
    vibeTags: '🕯️ Candlelit Baithak, 🫖 Zafrani Chai & Dastarkhwan, 👘 White Kurtas / Shawls, 🎶 Live Tanpura & Harmonium, 🌙 Open Air Courtyard'
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    
    // Intercept clicks on RSVP buttons inside InviteCard to show our modal
    const handleRsvpClick = (e) => {
      const btn = e.target.closest('.rsvp-btn');
      if (btn && !guestName) {
        e.preventDefault();
        e.stopPropagation();
        
        let status = 'going';
        if (btn.classList.contains('rsvp-maybe')) status = 'maybe';
        if (btn.classList.contains('rsvp-cant')) status = 'cant';
        
        setPendingRsvp(status);
        setShowRsvpModal(true);
      }
    };
    
    document.addEventListener('click', handleRsvpClick, true);
    return () => document.removeEventListener('click', handleRsvpClick, true);
  }, [theme, guestName]);

  function triggerToast(message) {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2800);
  }

  function handleConfirmRsvp() {
    if (!guestName.trim()) {
      triggerToast('Please enter your name to RSVP.');
      return;
    }
    
    setShowRsvpModal(false);
    triggerToast(`Welcome, ${guestName}! Please click RSVP again to confirm.`);
  }

  return (
    <>
      <div className="aura-bg" id="auraBg">
        <div className="aura-orb aura-orb-1" />
        <div className="aura-orb aura-orb-2" />
        <div className="aura-orb aura-orb-3" />
        <div className="aura-blur-overlay" />
      </div>

      <ParticlesCanvas effect={effect} density={1} speed={1} />

      <main style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        padding: '20px',
        paddingTop: '60px'
      }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
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
        </div>
      </main>

      {/* Anonymous RSVP Modal */}
      {showRsvpModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'var(--sand, #E6D5AE)',
            color: 'var(--ink, #19140F)',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '400px',
            fontFamily: "'Mukta', sans-serif"
          }}>
            <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '24px', margin: '0 0 8px 0' }}>Who is RSVPing?</h2>
            <p style={{ margin: '0 0 24px 0', opacity: 0.8 }}>Enter your name so the host knows.</p>
            
            <input 
              type="text" 
              placeholder="Your full name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={{
                width: '100%', padding: '12px', boxSizing: 'border-box',
                background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '8px', fontSize: '16px', marginBottom: '24px',
                fontFamily: 'inherit'
              }}
              autoFocus
            />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowRsvpModal(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px',
                  background: 'transparent', border: '1px solid var(--ink, #19140F)',
                  cursor: 'pointer', fontWeight: 600, fontSize: '16px'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRsvp}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px',
                  background: 'var(--accent-primary, #C0922E)', color: '#fff', border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: '16px'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      <div className={`share-toast ${toast.visible ? 'show' : ''}`}>
        <span>{toast.message}</span>
      </div>
    </>
  );
}
