// src/components/Body/Features.jsx
import { MapPin, Bell, BarChart2, Users, ShieldCheck, Zap } from 'lucide-react';
import { colors, fonts, sectionTagStyle, sectionHeadingStyle, sectionSubStyle, shadows } from '../../theme';

const features = [
  {
    icon: <MapPin size={22} strokeWidth={2} />,
    bg: '#eaf5ef',
    color: colors.green,
    title: 'Live local map',
    desc: 'See every available food rescue within your area in real time. Filter by cuisine, dietary needs, or collection time.',
  },
  {
    icon: <Bell size={22} strokeWidth={2} />,
    bg: '#fdf3e7',
    color: '#b96a10',
    title: 'Smart alerts',
    desc: 'Get notified the moment your favourite spots post surplus. Set preferences once and never miss a deal again.',
  },
  {
    icon: <BarChart2 size={22} strokeWidth={2} />,
    bg: '#f4ede4',
    color: colors.brown,
    title: 'Impact dashboard',
    desc: 'Track your personal CO₂ savings, meals rescued, and money saved — all in a beautiful at-a-glance snapshot.',
  },
  {
    icon: <Users size={22} strokeWidth={2} />,
    bg: '#eaf5ef',
    color: colors.green,
    title: 'Charity integration',
    desc: 'Businesses can donate unsold stock directly to verified local charities with a single click — fully tracked.',
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    bg: '#fdf3e7',
    color: '#b96a10',
    title: 'Safe & certified',
    desc: 'All partners pass our food-hygiene checks. Every listing includes allergen info, preparation time, and expiry details.',
  },
  {
    icon: <Zap size={22} strokeWidth={2} />,
    bg: '#f4ede4',
    color: colors.brown,
    title: 'Instant checkout',
    desc: 'Frictionless in-app payment, digital receipt, and QR pickup code — the whole flow takes under 30 seconds.',
  },
];

export default function Features() {
  return (
    <section className="py-5" id="features" style={{ paddingTop: '7rem', paddingBottom: '7rem', background: colors.cream }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 580 }}>
          <p style={sectionTagStyle}>Platform features</p>
          <h2 style={sectionHeadingStyle}>Everything you need to fight food waste</h2>
          <p className="mx-auto" style={{ ...sectionSubStyle, margin: '0 auto' }}>
            From real-time inventory tools to community impact dashboards,
            ZeroWaste is built for everyone in the chain.
          </p>
        </div>

        <div className="row g-4">
          {features.map((f) => (
            <div key={f.title} className="col-md-6 col-lg-4">
              <div
                className="h-100 p-4 bg-white border"
                style={{
                  borderColor: colors.border,
                  borderRadius: 20,
                  padding: '2.2rem',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{ width: 54, height: 54, borderRadius: 14, background: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: fonts.display, fontSize: '1.15rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.7rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: colors.muted, lineHeight: 1.65, marginBottom: 0 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
