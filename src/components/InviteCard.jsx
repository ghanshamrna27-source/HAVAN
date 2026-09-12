import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import AudioPlayer from './AudioPlayer';
import { Calendar, Clock, MapPin, Lock, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InviteCard({
  artwork,
  theme,
  seal,
  framingBorder,
  dressCode,
  eventData,
  rsvpOptions,
  onToast
}) {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [guestCounts, setGuestCounts] = useState({ going: 24, maybe: 8 });
  const [isVenueUnlocked, setIsVenueUnlocked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, name: 'Rumi K.', text: 'Can\'t wait! Bringing my handcrafted tabla 🥁', color: '#8B5CF6' },
    { id: 2, name: 'Meera S.', text: 'Under the stars with chai & qawwali… this will be transcendent ✨🌙', color: '#EC4899' },
    { id: 3, name: 'Kabir D.', text: 'White kurta ironed. Ready for the dervish ecstasy 🫖', color: '#10B981' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  // Handle Guest RSVP
  function handleRSVP(status) {
    setRsvpStatus(status);

    if (status === 'going') {
      setGuestCounts(prev => ({ ...prev, going: 25 }));
      setIsVenueUnlocked(true);

      // Trigger Confetti explosion
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFD700', '#FF2A7A', '#00F5D4', '#8B5CF6', '#FFFFFF']
      });

      if (onToast) onToast(`✨ RSVP Confirmed: "${rsvpOptions.yes.title}"`);
    } else if (status === 'maybe') {
      setGuestCounts(prev => ({ ...prev, maybe: 9 }));
      if (onToast) onToast(`🌙 Marked as "${rsvpOptions.maybe.title}"`);
    } else {
      if (onToast) onToast(`🙏 Marked as "${rsvpOptions.no.title}"`);
    }
  }

  function handleAddComment(textToAdd = null) {
    const text = textToAdd || commentInput.trim();
    if (!text) return;
    const newComment = {
      id: Date.now(),
      name: 'You',
      text,
      color: '#D4AF37'
    };
    setComments(prev => [...prev, newComment]);
    if (!textToAdd) setCommentInput('');
    if (onToast) onToast('✨ Blessing sent to the wall!');
  }

  // Calendar .ics download
  function downloadCalendarInvite() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mehfil//Sufi Music Invitation//EN',
      'BEGIN:VEVENT',
      'SUMMARY:' + eventData.title,
      'DESCRIPTION:' + eventData.description.replace(/\n/g, ' '),
      'LOCATION:' + eventData.venue,
      'DTSTART:20261018T143000Z',
      'DTEND:20261018T203000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${eventData.title.toLowerCase().replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast('📅 Calendar event (.ics) downloaded!');
  }

  const hostInitial = eventData.host.trim().charAt(0).toUpperCase() || 'A';
  const vibeTagList = eventData.vibeTags.split(',').map(t => t.trim()).filter(Boolean);

  return (
    <SpotlightCard className={`invite-card ${framingBorder.class || ''}`} id="inviteCard">

      {/* Cover Art Section */}
      <div className="cover-art-wrapper">
        <img
          src={artwork.src}
          alt={artwork.title}
          className="cover-art"
          key={artwork.src}
        />
        <div className="cover-art-overlay"></div>

        {/* Badges */}
        <div className="cover-badge-strip">
          <span className="cover-badge badge-live">✦ Live Mehfil</span>
          <span className="cover-badge badge-limited">Limited 40 Seats</span>
        </div>

        {/* Decorative Royal Wax Seal / Monogram Stamp */}
        {seal && seal.id !== 'seal-none' && (
          <div className="royal-wax-seal" title={seal.desc} style={{ '--seal-color': seal.color }}>
            <span className="seal-icon">{seal.icon}</span>
            <span className="seal-label">{seal.name}</span>
          </div>
        )}
      </div>

      {/* Event Details Section */}
      <div className="event-details">

        {/* Host Bar */}
        <div className="host-bar">
          <div className="host-avatar-group">
            <div className="host-avatar" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>
              <span>{hostInitial}</span>
            </div>
            <div className="host-info">
              <span className="host-label">Hosted by</span>
              <span className="host-name">{eventData.host}</span>
            </div>
          </div>
          <div className="host-crown-badge" title="Host VIP">👑</div>
        </div>

        {/* Event Title & Subtitle */}
        <div className="event-title-wrapper">
          <h1 className="event-title shimmer">{eventData.title}</h1>
        </div>
        <p className="event-subtitle">{eventData.subtitle}</p>

        {/* Date, Time & Location Strip */}
        <div className="event-meta-strip">
          <div className="meta-item">
            <div className="meta-icon"><Calendar size={18} /></div>
            <div className="meta-text">
              <span className="meta-primary">{eventData.date}</span>
              <span className="meta-secondary">{eventData.time}</span>
            </div>
          </div>

          <div
            className={`meta-item meta-location ${isVenueUnlocked ? 'location-unlocked shine-border' : ''}`}
            onClick={() => {
              if (!isVenueUnlocked && onToast) onToast('🔒 Please RSVP to unlock the secret venue location!');
            }}
          >
            <div className="meta-icon"><MapPin size={18} /></div>
            <div className="meta-text">
              <span className={`meta-primary ${!isVenueUnlocked ? 'location-locked' : ''}`}>
                {isVenueUnlocked ? '📍 Venue Unlocked!' : '📍 RSVP to unlock secret venue'}
              </span>
              <span className="meta-secondary">
                {isVenueUnlocked ? eventData.venue : 'Private heritage courtyard revealed after RSVP'}
              </span>
            </div>
            {!isVenueUnlocked && <div className="location-lock-icon"><Lock size={15} /></div>}
          </div>
        </div>

        {/* Dress Code Badge (Decorations feature) */}
        {dressCode && (
          <div className="dress-code-strip">
            <span className="dress-code-badge">
              <span className="dress-emoji">{dressCode.emoji}</span>
              <span className="dress-text">Dress Code: <strong>{dressCode.title}</strong></span>
            </span>
          </div>
        )}

        {/* Vibe Tags */}
        <div className="vibe-tags">
          {vibeTagList.map((tag, idx) => (
            <span key={idx} className="vibe-tag">{tag}</span>
          ))}
        </div>

        {/* ========================================================
             RSVP SECTION WITH SENDER-EDITABLE REPLIES
             ======================================================== */}
        <div className="rsvp-section">
          {!rsvpStatus ? (
            <>
              <p className="rsvp-prompt">Will you join the circle?</p>
              <div className="rsvp-buttons">
                {/* YES (Editable by sender) */}
                <button
                  className="rsvp-btn rsvp-going"
                  onClick={() => handleRSVP('going')}
                  title={`Reply: ${rsvpOptions.yes.title}`}
                >
                  <span className="rsvp-emoji">{rsvpOptions.yes.emoji}</span>
                  <span className="rsvp-label">{rsvpOptions.yes.title}</span>
                  <span className="rsvp-sublabel">{rsvpOptions.yes.sub}</span>
                </button>

                {/* MAYBE (Editable by sender) */}
                <button
                  className="rsvp-btn rsvp-maybe"
                  onClick={() => handleRSVP('maybe')}
                  title={`Reply: ${rsvpOptions.maybe.title}`}
                >
                  <span className="rsvp-emoji">{rsvpOptions.maybe.emoji}</span>
                  <span className="rsvp-label">{rsvpOptions.maybe.title}</span>
                  <span className="rsvp-sublabel">{rsvpOptions.maybe.sub}</span>
                </button>

                {/* NO (Editable by sender) */}
                <button
                  className="rsvp-btn rsvp-cant"
                  onClick={() => handleRSVP('cant')}
                  title={`Reply: ${rsvpOptions.no.title}`}
                >
                  <span className="rsvp-emoji">{rsvpOptions.no.emoji}</span>
                  <span className="rsvp-label">{rsvpOptions.no.title}</span>
                  <span className="rsvp-sublabel">{rsvpOptions.no.sub}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="rsvp-confirmed-section">
              <div className="rsvp-confirmed-badge">
                <span className="confirmed-check"><Check size={16} /></span>
                <span className="confirmed-text">
                  {rsvpStatus === 'going' && `${rsvpOptions.yes.title} ✨`}
                  {rsvpStatus === 'maybe' && `${rsvpOptions.maybe.title} 🌙`}
                  {rsvpStatus === 'cant' && `${rsvpOptions.no.title} 🙏`}
                </span>
              </div>
              <div className="rsvp-actions-bar">
                {rsvpStatus === 'going' && (
                  <button className="rsvp-action-pill" onClick={downloadCalendarInvite}>
                    📅 Add to Calendar
                  </button>
                )}
                <button className="rsvp-action-pill" onClick={() => setRsvpStatus(null)}>
                  Change RSVP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guest List Social Stack */}
        <div className="guest-section">
          <div className="guest-header">
            <h3 className="guest-title">Who's Joining the Circle</h3>
            <span className="guest-count">{guestCounts.going} going · {guestCounts.maybe} maybe</span>
          </div>
          <div className="guest-avatar-stack">
            <div className="guest-avatar" style={{ background: '#D4AF37' }}>S</div>
            <div className="guest-avatar" style={{ background: '#8B5CF6' }}>R</div>
            <div className="guest-avatar" style={{ background: '#EC4899' }}>M</div>
            <div className="guest-avatar" style={{ background: '#10B981' }}>K</div>
            <div className="guest-avatar" style={{ background: '#F59E0B' }}>A</div>
            <div className="guest-avatar" style={{ background: '#6366F1' }}>P</div>
            <div className="guest-avatar" style={{ background: '#EF4444' }}>N</div>
            <div className="guest-avatar guest-avatar-more">+{guestCounts.going - 7}</div>
          </div>
          <p className="guest-stalk-hint">👀 Stalk the full guest list ({guestCounts.going} confirmed)</p>
        </div>

        {/* Event Description */}
        <div className="event-description-section">
          <h3 className="desc-title">About This Evening</h3>
          <p className="desc-body">{eventData.description}</p>
        </div>

        {/* Audio Synthesizer */}
        <AudioPlayer onPlayToast={onToast} />

        {/* Wall of Blessings */}
        <div className="comments-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="comments-title">💬 Wall of Blessings</h3>
            <div className="emoji-reactions-bar">
              {['✨', '👏', '🫖', '🌹', '💖'].map(emoji => (
                <button
                  key={emoji}
                  className="emoji-reaction-btn"
                  onClick={() => handleAddComment(`Sent ${emoji} with love`)}
                  title={`Send ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="comments-list">
            {comments.map(c => (
              <div key={c.id} className="comment-item">
                <div className="comment-avatar" style={{ background: c.color }}>
                  {c.name.charAt(0)}
                </div>
                <div className="comment-content">
                  <span className="comment-name">{c.name}</span>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="comment-input-bar">
            <input
              type="text"
              className="comment-input"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(); }}
              placeholder="Send a blessing or message to the host…"
              maxLength={220}
            />
            <button
              className="comment-send-btn"
              onClick={() => handleAddComment()}
              aria-label="Send blessing"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      </div>
    </SpotlightCard>
  );
}
