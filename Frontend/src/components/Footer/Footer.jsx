// src/components/Footer/Footer.jsx
import { Leaf, Heart } from 'lucide-react';
import { colors, fonts } from '../../theme';

const footerLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Contact us', href: '#contact' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of service', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{ background: colors.charcoal, color: 'rgba(255,255,255,0.55)', padding: '3.5rem 0 2rem' }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row align-items-start justify-content-between g-4 pb-4 mb-4 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-3" style={{ fontFamily: fonts.display, fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
              <span
                className="d-flex align-items-center justify-content-center"
                style={{ width: 34, height: 34, background: colors.green, borderRadius: 9 }}
              >
                <Leaf size={16} strokeWidth={2.5} color="#fff" />
              </span>
              ZeroWaste
            </div>
            <p className="mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 360 }}>
              Fighting food waste together. Connecting surplus food with the people and communities who need it most.
            </p>
          </div>

          <div className="col-lg-auto">
            <ul className="list-unstyled d-flex flex-wrap gap-3 gap-lg-4 mb-0">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-decoration-none"
                    style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = colors.greenL; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2" style={{ fontSize: '0.82rem' }}>
          <span>© 2026 ZeroWaste Ltd. All rights reserved.</span>
          <span>
            Made with{' '}
            <Heart size={13} style={{ display: 'inline', verticalAlign: '-1px', color: colors.greenL, fill: colors.greenL }} />{' '}
            for the planet
          </span>
        </div>
      </div>
    </footer>
  );
}
