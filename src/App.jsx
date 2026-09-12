import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Landing from './pages/Landing';
import GuestInvite from './pages/GuestInvite';
import HostDashboard from './pages/HostDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create/:themeId" element={<CreateEvent />} />
        <Route path="/invite/:id" element={<GuestInvite />} />
        <Route path="/dashboard/:id" element={<HostDashboard />} />
      </Routes>
    </Router>
  );
}
