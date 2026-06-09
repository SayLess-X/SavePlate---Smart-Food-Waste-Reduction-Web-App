// src/components/Body/HowItWorks.jsx
import { Store, Search, PackageCheck } from 'lucide-react';
import { colors, fonts, sectionTagStyle, sectionHeadingStyle, sectionSubStyle } from '../../theme';

const steps = [
  {
    num: '01',
    icon: <Store size={22} strokeWidth={2} />,
    title: 'Partners list surplus',
    desc: 'Restaurants, bakeries, and grocers post same-day surplus items at reduced prices — easily via our dashboard or mobile app.',
  },
  {
    num: '02',
    icon: <Search size={22} strokeWidth={2} />,
    title: 'Customers discover & reserve',
    desc: 'Browse mystery bags or specific items nearby. Reserve in one tap and pay securely through the app — no cash needed.',
  },
  {
    num: '03',
    icon: <PackageCheck size={22} strokeWidth={2} />,
    title: 'Pick up & enjoy',
    desc: 'Collect your bag during the pickup window. Every transaction automatically offsets carbon and donates to a local charity.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-5" id="how" style={{ paddingTop: '7rem', paddingBottom: '7rem', background: colors.white }}>
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row align-items-end g-5 mb-5">
          <div className="col-lg-6">
            <p className="mb-3" style={sectionTagStyle}>How it works</p>
            <h2 style={sectionHeadingStyle}>Three simple steps to zero waste</h2>
          </div>
          <div className="col-lg-6">
            <p style={sectionSubStyle}>
              Whether you're a business with surplus stock or someone looking for an
              affordable, sustainable meal — getting started takes under two minutes.
            </p>
          </div>
        </div>

        <div className="row g-0">
          {steps.map((step, i) => (
            <div key={step.num} className="col-lg-4">
              <div
                className="h-100 p-4"
                style={{
                  background: colors.cream,
                  padding: '2.5rem 2rem',
                  borderRadius: i === 0 ? '20px 0 0 20px' : i === steps.length - 1 ? '0 20px 20px 0' : 0,
                }}
              >
                <div style={{ fontFamily: fonts.display, fontSize: '4rem', fontWeight: 900, color: colors.border, lineHeight: 1, marginBottom: '1rem' }}>
                  {step.num}
                </div>
                <div
                  className="d-flex align-items-center justify-content-center text-white mb-4"
                  style={{ width: 52, height: 52, background: colors.green, borderRadius: 14 }}
                >
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: fonts.display, fontSize: '1.2rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: colors.muted, lineHeight: 1.65, marginBottom: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
