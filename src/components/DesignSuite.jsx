import React, { useState } from 'react';
import { ARTWORKS } from '../data/artworks';
import { THEMES } from '../data/themes';
import { WAX_SEALS, FRAMING_BORDERS, DRESS_CODES, RSVP_PRESETS } from '../data/decorations';
import { Palette, Sparkles, MessageSquareHeart, Award, Edit3, Image as ImageIcon, Flame, Flower2, Star, Moon, Music, XCircle } from 'lucide-react';

export default function DesignSuite({
  currentArtwork,
  onSelectArtwork,
  currentTheme,
  onSelectTheme,
  currentEffect,
  onSelectEffect,
  density,
  onSelectDensity,
  speed,
  onSelectSpeed,
  currentSeal,
  onSelectSeal,
  currentBorder,
  onSelectBorder,
  currentDressCode,
  onSelectDressCode,
  eventData,
  onChangeEventData,
  rsvpOptions,
  onChangeRsvpOptions,
  onToast
}) {
  const [activeTab, setActiveTab] = useState('artwork');
  const [artCategory, setArtCategory] = useState('all');

  const filteredArtworks = artCategory === 'all'
    ? ARTWORKS
    : ARTWORKS.filter(a => a.category === artCategory);

  const TABS = [
    { id: 'artwork', label: 'Cover Art', icon: <ImageIcon size={16} strokeWidth={1.5} /> },
    { id: 'rsvp', label: 'Scene Hai?', icon: <MessageSquareHeart size={16} strokeWidth={1.5} /> },
    { id: 'decorations', label: 'Seals & Borders', icon: <Award size={16} strokeWidth={1.5} /> },
    { id: 'themes', label: 'Themes', icon: <Palette size={16} strokeWidth={1.5} /> },
    { id: 'effects', label: 'Visual FX', icon: <Sparkles size={16} strokeWidth={1.5} /> },
    { id: 'copy', label: 'Event Info', icon: <Edit3 size={16} strokeWidth={1.5} /> }
  ];

  return (
    <div className="studio-editor-col">

      {/* Navigation Tabs Header */}
      <div className="editor-nav-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`editor-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================
           TAB 1: COVER ARTWORK GALLERY
           ======================================================== */}
      {activeTab === 'artwork' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">1. Cover Artwork</h3>
              <p className="editor-subtitle">Choose from 15 curated Sufi paintings & heritage pieces</p>
            </div>
            <span className="editor-counter-tag">{filteredArtworks.length} of {ARTWORKS.length} Shown</span>
          </div>

          <div className="category-tabs">
            {[
              { id: 'all', label: 'All (15)' },
              { id: 'mystic', label: 'Mystic Dervish' },
              { id: 'tribal', label: 'Tribal & Warli' },
              { id: 'retro', label: 'Retro Pop' },
              { id: 'classical', label: 'Classical & Jade' }
            ].map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${artCategory === cat.id ? 'active' : ''}`}
                onClick={() => setArtCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="cover-grid">
            {filteredArtworks.map(art => (
              <div
                key={art.id}
                className={`cover-grid-item ${art.id === currentArtwork.id ? 'active' : ''}`}
                onClick={() => onSelectArtwork(art)}
                title={art.title}
              >
                <img src={art.src} alt={art.title} loading="lazy" />
                <span className="cover-badge-mini">{art.tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
           TAB 2: HOST-EDITABLE RSVP REPLIES ("Yes, No, Maybe")
           ======================================================== */}
      {activeTab === 'rsvp' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">2. Customizable 'Scene Hai?' Options</h3>
              <p className="editor-subtitle">
                As the invitation sender, customize the exact replies guests see and click for Yes, Maybe, and No.
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="rsvp-presets-strip">
            <span className="rsvp-preset-label">Quick Presets:</span>
            <div className="rsvp-preset-buttons">
              {RSVP_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  className="rsvp-preset-pill"
                  onClick={() => {
                    onChangeRsvpOptions({
                      yes: { ...preset.yes },
                      maybe: { ...preset.maybe },
                      no: { ...preset.no }
                    });
                    if (onToast) onToast(`Applied "${preset.name}" RSVP reply style`);
                  }}
                >
                  {preset.yes.emoji} {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Reply Customizer Grid */}
          <div className="rsvp-customizer-grid">

            {/* YES OPTION */}
            <div className="rsvp-custom-box yes-box">
              <div className="rsvp-box-header">
                <span className="rsvp-status-tag tag-yes">1. Positive Reply (Yes / Going)</span>
              </div>
              <div className="rsvp-inputs-row">
                <div className="form-group emoji-col">
                  <label className="form-label">Icon</label>
                  <div className="form-input emoji-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rsvpOptions.yes.emoji}
                  </div>
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Button Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.yes.title}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      yes: { ...rsvpOptions.yes, title: e.target.value }
                    })}
                    placeholder="E.g. Aana Hi Hai, I'll be there!"
                  />
                </div>
                <div className="form-group sublabel-col">
                  <label className="form-label">Sublabel</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.yes.sub}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      yes: { ...rsvpOptions.yes, sub: e.target.value }
                    })}
                    placeholder="Going"
                  />
                </div>
              </div>
            </div>

            {/* MAYBE OPTION */}
            <div className="rsvp-custom-box maybe-box">
              <div className="rsvp-box-header">
                <span className="rsvp-status-tag tag-maybe">2. Tentative Reply (Maybe)</span>
              </div>
              <div className="rsvp-inputs-row">
                <div className="form-group emoji-col">
                  <label className="form-label">Icon</label>
                  <div className="form-input emoji-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rsvpOptions.maybe.emoji}
                  </div>
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Button Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.maybe.title}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      maybe: { ...rsvpOptions.maybe, title: e.target.value }
                    })}
                    placeholder="E.g. Dil Hai, Thinking about it"
                  />
                </div>
                <div className="form-group sublabel-col">
                  <label className="form-label">Sublabel</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.maybe.sub}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      maybe: { ...rsvpOptions.maybe, sub: e.target.value }
                    })}
                    placeholder="Maybe"
                  />
                </div>
              </div>
            </div>

            {/* NO OPTION */}
            <div className="rsvp-custom-box no-box">
              <div className="rsvp-box-header">
                <span className="rsvp-status-tag tag-no">3. Decline Reply (No)</span>
              </div>
              <div className="rsvp-inputs-row">
                <div className="form-group emoji-col">
                  <label className="form-label">Icon</label>
                  <div className="form-input emoji-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rsvpOptions.no.emoji}
                  </div>
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">Button Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.no.title}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      no: { ...rsvpOptions.no, title: e.target.value }
                    })}
                    placeholder="E.g. Alvida, Can't Make It"
                  />
                </div>
                <div className="form-group sublabel-col">
                  <label className="form-label">Sublabel</label>
                  <input
                    type="text"
                    className="form-input"
                    value={rsvpOptions.no.sub}
                    onChange={(e) => onChangeRsvpOptions({
                      ...rsvpOptions,
                      no: { ...rsvpOptions.no, sub: e.target.value }
                    })}
                    placeholder="Can't Go"
                  />
                </div>
              </div>
            </div>

          </div>
          <p className="rsvp-helper-hint">
            💡 As you type or pick a preset above, the Scene Hai? buttons on your invitation card to the left update simultaneously in real time.
          </p>
        </div>
      )}

      {/* ========================================================
           TAB 3: DECORATIONS (WAX SEALS, BORDERS & DRESS CODES)
           ======================================================== */}
      {activeTab === 'decorations' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">3. Invitation Embellishments</h3>
              <p className="editor-subtitle">Add royal wax stamps, ornamental borders, and dress codes</p>
            </div>
          </div>

          {/* Section A: Wax Seals */}
          <div className="deco-sub-section">
            <h4 className="deco-sub-title">Royal Wax Seals & Monogram Stamps</h4>
            <div className="deco-grid">
              {WAX_SEALS.map(s => (
                <button
                  key={s.id}
                  className={`deco-btn ${s.id === currentSeal.id ? 'active' : ''}`}
                  onClick={() => onSelectSeal(s)}
                >
                  <span className="deco-icon">{s.icon}</span>
                  <div className="deco-info">
                    <span className="deco-name">{s.name}</span>
                    <span className="deco-desc">{s.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Framing Borders */}
          <div className="deco-sub-section" style={{ marginTop: 24 }}>
            <h4 className="deco-sub-title">Framing Card Borders</h4>
            <div className="deco-grid">
              {FRAMING_BORDERS.map(b => (
                <button
                  key={b.id}
                  className={`deco-btn ${b.id === currentBorder.id ? 'active' : ''}`}
                  onClick={() => onSelectBorder(b)}
                >
                  <div className="deco-info">
                    <span className="deco-name">{b.name}</span>
                    <span className="deco-desc">{b.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section C: Dress Codes */}
          <div className="deco-sub-section" style={{ marginTop: 24 }}>
            <h4 className="deco-sub-title">Dress Code Suggestion</h4>
            <div className="deco-grid">
              {DRESS_CODES.map(d => (
                <button
                  key={d.id}
                  className={`deco-btn ${currentDressCode && d.id === currentDressCode.id ? 'active' : ''}`}
                  onClick={() => onSelectDressCode(d)}
                >
                  <span className="deco-icon">{d.emoji}</span>
                  <div className="deco-info">
                    <span className="deco-name">{d.title}</span>
                    <span className="deco-desc">{d.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
           TAB 4: HERITAGE THEMES
           ======================================================== */}
      {activeTab === 'themes' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">4. Heritage Color Themes</h3>
              <p className="editor-subtitle">Instant switching of ambient lighting, glass borders, and accents</p>
            </div>
          </div>

          <div className="theme-preset-list">
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`theme-preset ${t.id === currentTheme ? 'active' : ''}`}
                onClick={() => onSelectTheme(t.id)}
              >
                <span className="theme-swatch" style={{ background: t.swatch }} />
                <div className="theme-info">
                  <span className="theme-name">{t.name}</span>
                  <span className="theme-desc">{t.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
           TAB 5: ATMOSPHERIC VISUAL EFFECTS
           ======================================================== */}
      {activeTab === 'effects' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">5. Atmospheric Floating Particles</h3>
              <p className="editor-subtitle">60fps interactive canvas particles that drift and react to your mouse</p>
            </div>
          </div>

          <div className="effect-list">
            {[
              { id: 'stardust', name: 'Cosmic Stardust', emoji: <Sparkles size={16} strokeWidth={1.5} /> },
              { id: 'embers', name: 'Lantern Embers', emoji: <Flame size={16} strokeWidth={1.5} /> },
              { id: 'petals', name: 'Sufi Rose Petals', emoji: <Flower2 size={16} strokeWidth={1.5} /> },
              { id: 'meteors', name: 'Shooting Stars', emoji: <Star size={16} strokeWidth={1.5} /> },
              { id: 'bokeh', name: 'Mystic Bokeh', emoji: <Moon size={16} strokeWidth={1.5} /> },
              { id: 'aurora', name: 'Aurora Rays', emoji: <Sparkles size={16} strokeWidth={1.5} /> },
              { id: 'jasmine', name: 'Mogra Blossoms', emoji: <Flower2 size={16} strokeWidth={1.5} /> },
              { id: 'soundwaves', name: 'Sound Waves', emoji: <Music size={16} strokeWidth={1.5} /> },
              { id: 'none', name: 'Off / Clean', emoji: <XCircle size={16} strokeWidth={1.5} /> }
            ].map(fx => (
              <button
                key={fx.id}
                className={`effect-btn ${fx.id === currentEffect ? 'active' : ''}`}
                onClick={() => onSelectEffect(fx.id)}
              >
                <span className="effect-emoji">{fx.emoji}</span>
                <span className="effect-name">{fx.name}</span>
              </button>
            ))}
          </div>

          {/* Density & Speed Sliders */}
          <div className="fx-control-group" style={{ marginTop: 20 }}>
            <div className="fx-control-row">
              <span className="fx-control-label">Particle Density</span>
              <div className="fx-pill-toggle-group">
                {[
                  { val: 0.5, label: 'Subtle' },
                  { val: 1, label: 'Standard' },
                  { val: 1.8, label: 'Euphoric' }
                ].map(d => (
                  <button
                    key={d.val}
                    className={`fx-pill-toggle ${density === d.val ? 'active' : ''}`}
                    onClick={() => onSelectDensity(d.val)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="fx-control-row">
              <span className="fx-control-label">Drift Speed</span>
              <div className="fx-pill-toggle-group">
                {[
                  { val: 0.5, label: 'Zen' },
                  { val: 1, label: 'Normal' },
                  { val: 1.7, label: 'Vivid' }
                ].map(s => (
                  <button
                    key={s.val}
                    className={`fx-pill-toggle ${speed === s.val ? 'active' : ''}`}
                    onClick={() => onSelectSpeed(s.val)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
           TAB 6: EVENT COPY & DETAILS
           ======================================================== */}
      {activeTab === 'copy' && (
        <div className="editor-card">
          <div className="editor-card-header">
            <div>
              <h3 className="editor-title">6. Event Details & Copy</h3>
              <p className="editor-subtitle">Type in any field to simultaneously update the live invitation card</p>
            </div>
          </div>

          <div className="editor-form-grid">
            <div className="form-group full-width">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                value={eventData.title}
                onChange={(e) => onChangeEventData({ ...eventData, title: e.target.value })}
                placeholder="E.g. Mehfil-e-Samaa"
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Subtitle / Hook</label>
              <input
                type="text"
                className="form-input"
                value={eventData.subtitle}
                onChange={(e) => onChangeEventData({ ...eventData, subtitle: e.target.value })}
                placeholder="Short spiritual tagline"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Host Name</label>
              <input
                type="text"
                className="form-input"
                value={eventData.host}
                onChange={(e) => onChangeEventData({ ...eventData, host: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="text"
                className="form-input"
                value={eventData.date}
                onChange={(e) => onChangeEventData({ ...eventData, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="text"
                className="form-input"
                value={eventData.time}
                onChange={(e) => onChangeEventData({ ...eventData, time: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Secret Venue</label>
              <input
                type="text"
                className="form-input"
                value={eventData.venue}
                onChange={(e) => onChangeEventData({ ...eventData, venue: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">About This Evening</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={eventData.description}
                onChange={(e) => onChangeEventData({ ...eventData, description: e.target.value })}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Vibe Tags (Comma Separated)</label>
              <input
                type="text"
                className="form-input"
                value={eventData.vibeTags}
                onChange={(e) => onChangeEventData({ ...eventData, vibeTags: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
