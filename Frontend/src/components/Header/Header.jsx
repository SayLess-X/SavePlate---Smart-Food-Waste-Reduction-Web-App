// src/components/Header/Header.jsx
import { Leaf, ArrowRight } from 'lucide-react';
import { colors, fonts, btnPrimaryStyle, btnOutlineStyle } from '../../theme';

export default function Header({ onNavigate }) {
  return (
    <header
      className="sticky-top border-bottom"
      style={{
        background: 'rgba(250, 247, 242, 0.92)',
        backdropFilter: 'blur(12px)',
        borderColor: `${colors.border} !important`,
        zIndex: 100,
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <nav className="d-flex align-items-center justify-content-between gap-4" style={{ height: '68px' }}>
          <a href="#" className="d-flex align-items-center gap-2 text-decoration-none" style={{ fontFamily: fonts.display, fontSize: '1.5rem', fontWeight: 700, color: colors.greenD, letterSpacing: '-0.02em' }}>
            <span
              className="d-flex align-items-center justify-content-center text-white"
              style={{ width: 36, height: 36, background: colors.green, borderRadius: 10 }}
            >
              <Leaf size={18} strokeWidth={2.5} />
            </span>
            ZeroWaste
          </a>

          <ul className="d-none d-lg-flex align-items-center gap-5 list-unstyled mb-0">
            {['How it works', 'Features', 'About', 'Contact'].map((label, i) => (
              <li key={label}>
                <a
                  href={['#how', '#features', '#about', '#contact'][i]}
                  className="text-decoration-none"
                  style={{ fontSize: '0.9rem', fontWeight: 500, color: colors.muted }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.green; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = colors.muted; }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
              style={btnOutlineStyle}
              onClick={() => onNavigate?.('login')}
            >
              Log in
            </button>
            <button
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              style={btnPrimaryStyle}
              onClick={() => onNavigate?.('signup')}
            >
              <ArrowRight size={15} strokeWidth={2.5} />
              Join free
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
