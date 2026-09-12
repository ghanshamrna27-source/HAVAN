import React from 'react';
import { 
  Moon, Feather, Flower2, Crown, Flame, XCircle, Sparkles, X, Heart, HelpCircle, AlertCircle, Bird, Music, Shield, Check, ThumbsUp, Star
} from 'lucide-react';

export const WAX_SEALS = [
  { id: 'seal-noor', name: 'Noor Crescent', icon: <Moon size={24} strokeWidth={1.5} />, desc: 'Mystic moon stamp with golden aura', color: '#D4AF37' },
  { id: 'seal-peacock', name: 'Mor Pankh', icon: <Feather size={24} strokeWidth={1.5} />, desc: 'Peacock feather of devotion', color: '#10B981' },
  { id: 'seal-lotus', name: 'Kamal Lotus', icon: <Flower2 size={24} strokeWidth={1.5} />, desc: 'Sacred blooming lotus seal', color: '#F472B6' },
  { id: 'seal-mughal', name: 'Shahi Crest', icon: <Crown size={24} strokeWidth={1.5} />, desc: 'Royal Mughal imperial emblem', color: '#F59E0B' },
  { id: 'seal-chirag', name: 'Sufi Chirag', icon: <Flame size={24} strokeWidth={1.5} />, desc: 'Eternal flame of divine love', color: '#E85D3A' },
  { id: 'seal-none', name: 'No Stamp', icon: <XCircle size={24} strokeWidth={1.5} />, desc: 'Clean minimalist look', color: 'transparent' }
];

export const FRAMING_BORDERS = [
  { id: 'border-filigree', name: 'Gold Filigree', class: 'border-filigree', desc: 'Ornamental royal golden lace trim' },
  { id: 'border-jali', name: 'Mughal Jali', class: 'border-jali', desc: 'Geometric lattice arch border' },
  { id: 'border-minimal', name: 'Glass Line', class: 'border-minimal', desc: 'Sleek frosted edge with subtle glow' },
  { id: 'border-neon', name: 'Cyber Neon', class: 'border-neon', desc: 'Pulsing iridescent neon rim' },
  { id: 'border-none', name: 'Simple', class: 'border-none', desc: 'Standard borderless card' }
];

export const DRESS_CODES = [
  { id: 'dress-white', title: 'Royal White Kurtas & Chikan', emoji: <Crown size={16} strokeWidth={1.5} />, sub: 'Traditional baithak attire' },
  { id: 'dress-shawl', title: 'Velvet Shawls & Pashmina', emoji: <Star size={16} strokeWidth={1.5} />, sub: 'Warm winter soul gathering' },
  { id: 'dress-ethnic', title: 'Vibrant Festive Ethnic', emoji: <Sparkles size={16} strokeWidth={1.5} />, sub: 'Rich silks, kurtas & lehengas' },
  { id: 'dress-boho', title: 'Soulful Bohemian / Linen', emoji: <Flower2 size={16} strokeWidth={1.5} />, sub: 'Earthy, relaxed comfort' }
];

export const RSVP_PRESETS = [
  {
    id: 'sufi',
    name: 'Sufi Baithak',
    yes: { emoji: <Sparkles size={16} strokeWidth={1.5} />, title: 'Aana Hi Hai', sub: 'Going' },
    maybe: { emoji: <Moon size={16} strokeWidth={1.5} />, title: 'Dil Hai', sub: 'Maybe' },
    no: { emoji: <X size={16} strokeWidth={1.5} />, title: 'Alvida', sub: "Can't Go" }
  },
  {
    id: 'royal',
    name: 'Royal Courtyard',
    yes: { emoji: <Crown size={16} strokeWidth={1.5} />, title: 'Qubool Hai', sub: 'Attending' },
    maybe: { emoji: <HelpCircle size={16} strokeWidth={1.5} />, title: 'Inshallah', sub: 'Tentative' },
    no: { emoji: <Bird size={16} strokeWidth={1.5} />, title: 'Maaf Kijiye', sub: 'Regrets' },
  },
  {
    id: 'classic',
    name: 'Classic Party',
    yes: { emoji: <Check size={16} strokeWidth={1.5} />, title: 'Hell Yes!', sub: 'Going' },
    maybe: { emoji: <ThumbsUp size={16} strokeWidth={1.5} />, title: 'Might Swing By', sub: 'Maybe' },
    no: { emoji: <XCircle size={16} strokeWidth={1.5} />, title: "Can't Make It", sub: 'No' },
  },
  {
    id: 'poetic',
    name: 'Ghazal & Shayari',
    yes: { emoji: <Heart size={16} strokeWidth={1.5} />, title: 'Hazir Honge', sub: 'Presence Confirmed' },
    maybe: { emoji: <Flame size={16} strokeWidth={1.5} />, title: 'Koshish Hai', sub: 'In Thought' },
    no: { emoji: <Shield size={16} strokeWidth={1.5} />, title: 'Majboori Hai', sub: 'In Spirit Only' },
  }
];
