export const WAX_SEALS = [
  { id: 'seal-noor', name: 'Noor Crescent', icon: '☽', desc: 'Mystic moon stamp with golden aura', color: '#D4AF37' },
  { id: 'seal-peacock', name: 'Mor Pankh', icon: '🦚', desc: 'Peacock feather of devotion', color: '#10B981' },
  { id: 'seal-lotus', name: 'Kamal Lotus', icon: '🪷', desc: 'Sacred blooming lotus seal', color: '#F472B6' },
  { id: 'seal-mughal', name: 'Shahi Crest', icon: '👑', desc: 'Royal Mughal imperial emblem', color: '#F59E0B' },
  { id: 'seal-chirag', name: 'Sufi Chirag', icon: '🕯️', desc: 'Eternal flame of divine love', color: '#E85D3A' },
  { id: 'seal-none', name: 'No Stamp', icon: '🚫', desc: 'Clean minimalist look', color: 'transparent' }
];

export const FRAMING_BORDERS = [
  { id: 'border-filigree', name: 'Gold Filigree', class: 'border-filigree', desc: 'Ornamental royal golden lace trim' },
  { id: 'border-jali', name: 'Mughal Jali', class: 'border-jali', desc: 'Geometric lattice arch border' },
  { id: 'border-minimal', name: 'Glass Line', class: 'border-minimal', desc: 'Sleek frosted edge with subtle glow' },
  { id: 'border-neon', name: 'Cyber Neon', class: 'border-neon', desc: 'Pulsing iridescent neon rim' },
  { id: 'border-none', name: 'Simple', class: 'border-none', desc: 'Standard borderless card' }
];

export const DRESS_CODES = [
  { id: 'dress-white', title: 'Royal White Kurtas & Chikan', emoji: '👘', sub: 'Traditional baithak attire' },
  { id: 'dress-shawl', title: 'Velvet Shawls & Pashmina', emoji: '🧣', sub: 'Warm winter soul gathering' },
  { id: 'dress-ethnic', title: 'Vibrant Festive Ethnic', emoji: '✨', sub: 'Rich silks, kurtas & lehengas' },
  { id: 'dress-boho', title: 'Soulful Bohemian / Linen', emoji: '🌿', sub: 'Earthy, relaxed comfort' }
];

export const RSVP_PRESETS = [
  {
    id: 'sufi',
    name: 'Sufi Baithak',
    yes: { emoji: '✨', title: 'Aana Hi Hai', sub: 'Going' },
    maybe: { emoji: '🌙', title: 'Dil Hai', sub: 'Maybe' },
    no: { emoji: '🙏', title: 'Alvida', sub: "Can't Go" }
  },
  {
    id: 'royal',
    name: 'Royal Courtyard',
    yes: { emoji: '👑', title: 'Qubool Hai', sub: 'Attending' },
    maybe: { emoji: '🫖', title: 'Inshallah', sub: 'Tentative' },
    no: { emoji: '🕊️', title: 'Maaf Kijiye', sub: 'Regrets' },
  },
  {
    id: 'classic',
    name: 'Classic Party',
    yes: { emoji: '🎉', title: 'Hell Yes!', sub: 'Going' },
    maybe: { emoji: '🤔', title: 'Might Swing By', sub: 'Maybe' },
    no: { emoji: '😢', title: "Can't Make It", sub: 'No' },
  },
  {
    id: 'poetic',
    name: 'Ghazal & Shayari',
    yes: { emoji: '🌹', title: 'Hazir Honge', sub: 'Presence Confirmed' },
    maybe: { emoji: '🕯️', title: 'Koshish Hai', sub: 'In Thought' },
    no: { emoji: '💔', title: 'Majboori Hai', sub: 'In Spirit Only' },
  }
];
