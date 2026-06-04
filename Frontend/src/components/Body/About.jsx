// src/components/Body/About/About.jsx
import { Heart, Eye, Sprout, Handshake, ArrowRight } from 'lucide-react';
import './About.css';

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
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">

          {/* Image */}
          <div className="about-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=800&q=80"
              alt="Community kitchen volunteers preparing food"
            />
          </div>

          {/* Content */}
          <div className="about-content">
            <p className="section-tag">Our mission</p>
            <h2 className="section-heading">We believe no good food should go to waste</h2>

            <p className="about-desc">
              SavePlate was born in 2021 from a simple observation: grocery stores discard
              tonnes of perfectly edible food every day while neighbours go hungry. We set
              out to close that gap — and we're just getting started.
            </p>
            <p className="about-desc">
              Our team of 40 food-tech enthusiasts works across engineering, partnerships,
              and community outreach to make sure every surplus plate finds a grateful home.
            </p>

            <div className="about-values">
              {values.map((v) => (
                <div key={v.title} className="about-val">
                  <div className="about-val-icon">{v.icon}</div>
                  <div>
                    <div className="about-val-title">{v.title}</div>
                    <div className="about-val-text">{v.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta">
              <button className="btn btn-primary btn-lg" onClick={() => onNavigate?.('signup')}>
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
