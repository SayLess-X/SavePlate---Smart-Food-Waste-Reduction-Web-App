// src/components/Body/Hero.jsx
import { useState } from 'react';
import { Utensils, TrendingDown } from 'lucide-react';
import { colors, fonts, btnPrimaryStyle, btnOutlineStyle, shadows } from '../../theme';

export default function Hero() {
  const [stats] = useState({
    mealsRescued: '820K+',
    partnerBusinesses: '3,400',
    co2Prevented: '180t',
    savedToday: '2,140 kg rescued',
  });

  return (
    <section
      className="position-relative overflow-hidden pt-5"
      style={{ background: `linear-gradient(160deg, ${colors.cream} 60%, ${colors.warm} 100%)` }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <span
              className="d-inline-flex align-items-center gap-2 mb-4"
              style={{
                background: colors.warm,
                border: `1px solid ${colors.warmD}`,
                borderRadius: '100px',
                padding: '0.35rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: colors.brown,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 7, height: 7, background: colors.green, borderRadius: '50%' }} />
              Reducing food waste since 2021
            </span>

            <h1
              style={{
                fontFamily: fonts.display,
                fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: colors.charcoal,
                marginBottom: '1.5rem',
              }}
            >
              Rescue food.<br />
              <em style={{ fontStyle: 'italic', color: colors.green }}>Feed community.</em><br />
              Save the planet.
            </h1>

            <p className="mb-4" style={{ fontSize: '1.1rem', color: colors.muted, maxWidth: 480, fontWeight: 300, lineHeight: 1.7 }}>
              ZeroWaste connects surplus food from restaurants, bakeries, and grocery
              stores to the people and charities who need it most — before it hits the bin.
            </p>

            <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
              <a
                href="#"
                className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
                style={{ ...btnPrimaryStyle, padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: 10 }}
              >
                <Utensils size={17} strokeWidth={2.5} />
                Browse surplus food
              </a>
              <a
                href="#how"
                className="btn btn-outline-secondary btn-lg d-inline-flex align-items-center gap-2"
                style={{ ...btnOutlineStyle, padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: 10 }}
              >
                See how it works
              </a>
            </div>

            <div
              className="d-flex flex-wrap gap-5 pt-4 mt-2"
              style={{ borderTop: `1px solid ${colors.border}` }}
            >
              {[
                { num: stats.mealsRescued, label: 'Meals rescued' },
                { num: stats.partnerBusinesses, label: 'Partner businesses' },
                { num: stats.co2Prevented, label: 'CO₂ prevented' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: fonts.display, fontSize: '2rem', fontWeight: 700, color: colors.greenD, lineHeight: 1 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: colors.muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6 position-relative">
            <div
              className="overflow-hidden"
              style={{ borderRadius: 24, aspectRatio: '4/5', boxShadow: shadows.lg }}
            >
              <img
                src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=900&q=80"
                alt="Colourful fresh produce at a market stall"
                className="w-100 h-100 object-fit-cover"
              />
            </div>

            <div
              className="position-absolute d-flex align-items-center gap-3 bg-white"
              style={{
                bottom: '2.5rem',
                left: '-2rem',
                borderRadius: 16,
                padding: '1rem 1.4rem',
                boxShadow: shadows.md,
                minWidth: 220,
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 44, height: 44, background: '#eaf5ef', borderRadius: 12, color: colors.green }}
              >
                <TrendingDown size={20} strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: colors.muted }}>Food saved today</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: colors.charcoal, lineHeight: 1.2 }}>
                  {stats.savedToday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <svg className="d-block w-100" viewBox="0 0 1440 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ lineHeight: 0 }}>
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
