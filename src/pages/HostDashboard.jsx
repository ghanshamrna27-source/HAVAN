import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Users, Eye, ArrowLeft } from 'lucide-react';

export default function HostDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const shareUrl = `${window.location.origin}/invite/${id}`;

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setToast('Link copied to clipboard!');
      setTimeout(() => setToast(''), 2000);
    }
  }

  return (
    <div className="host-dashboard" style={{
      background: 'var(--sand, #E6D5AE)',
      minHeight: '100vh',
      fontFamily: "'Mukta', sans-serif",
      color: '#19140F'
    }}>
      <header style={{
        background: '#1C2A4B',
        color: '#E6D5AE',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#E6D5AE', cursor: 'pointer' }}>
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ margin: 0, fontFamily: "'Clash Display', sans-serif" }}>Dashboard</h2>
        </div>
        <div>
          <button 
            onClick={handleCopy}
            style={{
              background: '#C0922E',
              color: '#19140F',
              border: 'none',
              padding: '10px 20px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)'
            }}
          >
            <Share2 size={16} /> Copy Invite Link
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '42px', marginBottom: '8px' }}>
          Mehfil-e-Samaa
        </h1>
        <p style={{ color: '#5B4F40', fontSize: '18px', marginBottom: '32px' }}>
          Your invite is live at: <a href={shareUrl} target="_blank" rel="noreferrer" style={{ color: '#4E8B7C' }}>{shareUrl}</a>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{
            background: '#fff',
            padding: '24px',
            border: '2px solid #19140F',
            borderBottomWidth: '4px',
            borderRightWidth: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5B4F40', marginBottom: '12px' }}>
              <Eye size={20} />
              <span style={{ fontWeight: 600 }}>Total Views</span>
            </div>
            <div style={{ fontSize: '48px', fontFamily: "'Clash Display', sans-serif", fontWeight: 600 }}>
              42
            </div>
          </div>
          
          <div style={{
            background: '#fff',
            padding: '24px',
            border: '2px solid #19140F',
            borderBottomWidth: '4px',
            borderRightWidth: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5B4F40', marginBottom: '12px' }}>
              <Users size={20} />
              <span style={{ fontWeight: 600 }}>Attending</span>
            </div>
            <div style={{ fontSize: '48px', fontFamily: "'Clash Display', sans-serif", fontWeight: 600 }}>
              24 <span style={{ fontSize: '18px', color: '#5B4F40' }}>/ 40</span>
            </div>
          </div>
        </div>

        <section>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '28px', marginBottom: '20px' }}>Guest List</h2>
          <div style={{
            background: '#fff',
            border: '2px solid #19140F',
          }}>
            {['Rumi K. (Going)', 'Meera S. (Going)', 'Kabir D. (Going)', 'Ayesha M. (Maybe)'].map((guest, i) => (
              <div key={i} style={{
                padding: '16px 20px',
                borderBottom: i < 3 ? '1px solid #E6D5AE' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 500 }}>{guest.split(' (')[0]}</span>
                <span style={{ 
                  background: guest.includes('Going') ? '#4E8B7C' : '#C0922E', 
                  color: guest.includes('Going') ? '#fff' : '#19140F',
                  padding: '4px 12px', 
                  borderRadius: '100px', 
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {guest.includes('Going') ? 'Going ✨' : 'Maybe 🌙'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#19140F',
          color: '#E6D5AE',
          padding: '12px 24px',
          borderRadius: '100px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
