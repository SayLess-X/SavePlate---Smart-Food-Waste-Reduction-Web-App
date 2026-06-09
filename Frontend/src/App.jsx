// src/App.jsx
import { useState, useEffect } from 'react';

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
import { colors, fonts } from './theme';

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.fontFamily = fonts.body;
    document.body.style.backgroundColor = colors.cream;
    document.body.style.color = colors.charcoal;
    document.body.style.fontSize = '16px';
    document.body.style.lineHeight = '1.65';
    document.body.style.webkitFontSmoothing = 'antialiased';
  }, []);

  if (page === 'login')  return <Login  onNavigate={setPage} />;
  if (page === 'signup') return <Signup onNavigate={setPage} />;

  return (
    <>
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
