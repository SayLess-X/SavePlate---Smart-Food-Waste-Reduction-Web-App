import { Leaf } from 'lucide-react';
import { colors, fonts } from '../../theme';

export default function AuthBranding({ onNavigate }) {
  return (
    <div
      className="position-relative d-none d-lg-flex flex-column justify-content-between p-5 overflow-hidden"
      style={{ background: colors.greenXd, minHeight: '100vh' }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=900&q=80"
          alt="Fresh produce"
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.18 }}
        />
      </div>

      <div className="position-relative d-flex flex-column justify-content-between h-100" style={{ zIndex: 1 }}>
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-2 border-0"
          style={{ fontFamily: fonts.display, fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}
          onClick={() => onNavigate?.('home')}
        >
          <span
            className="d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36, background: colors.greenL, borderRadius: 10 }}
          >
            <Leaf size={18} strokeWidth={2.5} color="#fff" />
          </span>
          ZeroWaste
        </button>

        <div className="mt-auto pb-3">
          <p
            className="text-uppercase mb-3"
            style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', color: colors.warmD }}
          >
            A Quiet Revolution
          </p>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '1.5rem',
            }}
          >
            Zero waste starts<br />with one rescue.
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.7, maxWidth: 360 }}>
            Join thousands of households turning surplus into shared meals.
          </p>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', paddingTop: '2rem' }}>
          © 2026 ZeroWaste Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}
