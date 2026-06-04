// src/App.jsx
import { useState } from 'react';
import './App.css';

import Header      from './components/Header/Header';
import Hero        from './components/Body/Hero';
import HowItWorks  from './components/Body/HowItWorks';
import Features    from './components/Body/Features';
import ImpactStrip from './components/Body/ImpactStrip';
import About       from './components/Body/About';
import Contact     from './components/Body/Contact';
import Footer      from './components/Footer/Footer';
import Login       from './components/Auth/Login';
import Signup      from './components/Auth/Signup';

// Simple client-side page state — swap for React Router once you add routing
// e.g. npm install react-router-dom  then use <BrowserRouter> + <Routes>
export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'login' | 'signup'

  if (page === 'login')  return <Login  onNavigate={setPage} />;
  if (page === 'signup') return <Signup onNavigate={setPage} />;

  return (
    <>
      {/* Pass setPage so Header buttons can navigate */}
      <Header onNavigate={setPage} />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ImpactStrip />
        <About onNavigate={setPage} />
        <Contact />
      </main>

      <Footer />
    </>
  );
}