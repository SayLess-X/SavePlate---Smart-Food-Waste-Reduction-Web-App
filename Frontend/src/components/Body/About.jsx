// src/components/Body/About.jsx
import { Heart, Eye, Sprout, Handshake, ArrowRight } from 'lucide-react';
import { colors, sectionTagStyle, sectionHeadingStyle, btnPrimaryStyle, shadows } from '../../theme';

const values = [
  {
    icon: <Heart size={17} strokeWidth={2} />,
    title: 'Community first',
    text: 'Every decision is measured by its impact on people and planet.',
  },
  {
    icon: <Eye size={17} strokeWidth={2} />,
    title: 'Full transparency',
    text: 'Open reporting on food rescued, carbon saved, and funds donated.',
  },
  {
    icon: <Sprout size={17} strokeWidth={2} />,
    title: 'Sustainable design',
    text: 'Built to grow without extracting more than we give back.',
  },
  {
    icon: <Handshake size={17} strokeWidth={2} />,
    title: 'Fair partnerships',
    text: 'We succeed only when our business partners and customers do too.',
  },
];

export default function About({ onNavigate }) {
  return (
    <section
      className="position-relative overflow-hidden text-white py-5"
      id="about"
      style={{ paddingTop: '7rem', paddingBottom: '7rem', background: colors.greenXd }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=60')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      <div className="container position-relative" style={{ maxWidth: '1180px' }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="overflow-hidden" style={{ borderRadius: 20, aspectRatio: '3/4', boxShadow: shadows.lg }}>
              <img
                src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=800&q=80"
                alt="Community kitchen volunteers preparing food"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <p className="mb-3" style={{ ...sectionTagStyle, color: colors.warmD }}>Our mission</p>
            <h2 style={{ ...sectionHeadingStyle, color: colors.white }}>
              We believe no good food should go to waste
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.2rem', fontWeight: 300, lineHeight: 1.75 }}>
              ZeroWaste was born in 2021 from a simple observation: grocery stores discard
              tonnes of perfectly edible food every day while neighbours go hungry. We set
              out to close that gap — and we're just getting started.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.2rem', fontWeight: 300, lineHeight: 1.75 }}>
              Our team of 40 food-tech enthusiasts works across engineering, partnerships,
              and community outreach to make sure every surplus meal finds a grateful home.
            </p>

            <div className="row g-3 mt-4">
              {values.map((v) => (
                <div key={v.title} className="col-sm-6">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.12)', borderRadius: 10, color: colors.warmD }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: 4 }}>{v.title}</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{v.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button
                className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
                style={{ ...btnPrimaryStyle, padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: 10 }}
                onClick={() => onNavigate?.('signup')}
              >
                Partner with us
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
