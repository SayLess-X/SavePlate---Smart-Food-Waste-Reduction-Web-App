// src/components/Header/Header.jsx
import { Leaf, ArrowRight } from 'lucide-react';
import './Header.css';

export default function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="container">
        <nav>
          {/* Logo */}
          <a href="#" className="nav-logo">
            <span className="nav-logo-icon">
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            SavePlate
          </a>

          {/* Nav links */}
          <ul className="nav-links">
            <li><a href="#how">How it works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* CTA buttons */}
          <div className="nav-cta">
            <button className="btn btn-outline" onClick={() => onNavigate?.('login')}>
              Log in
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate?.('signup')}>
              <ArrowRight size={15} strokeWidth={2.5} />
              Join free
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
