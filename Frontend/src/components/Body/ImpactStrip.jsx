// src/components/Body/ImpactStrip.jsx
import { useEffect, useState } from 'react';
import { colors, fonts } from '../../theme';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const STATIC = [
  { num: '820,000+', label: 'Meals rescued to date' },
  { num: '3,400',   label: 'Partner businesses' },
  { num: '47',      label: 'Cities covered' },
  { num: '180t',    label: 'CO₂ equivalent saved' },
];

export default function ImpactStrip() {
  const [stats, setStats] = useState(STATIC);

  useEffect(() => {
    fetch(`${SPRING_BOOT_URL}/api/stats/impact`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setStats([
        { num: data.mealsRescued,      label: 'Meals rescued to date' },
        { num: data.partnerBusinesses, label: 'Partner businesses' },
        { num: data.citiesCovered,     label: 'Cities covered' },
        { num: data.co2Saved,          label: 'CO₂ equivalent saved' },
      ]))
      .catch(() => {});
  }, []);

  return (
    <section
      className="py-5"
      style={{
        background: colors.warm,
        borderTop: `1px solid ${colors.warmD}`,
        borderBottom: `1px solid ${colors.warmD}`,
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <div className="container" style={{ maxWidth: '1180px' }}>
        <div className="row g-4 text-center">
          {stats.map((s) => (
            <div key={s.label} className="col-6 col-lg-3">
              <div style={{ fontFamily: fonts.display, fontSize: '2.8rem', fontWeight: 900, color: colors.greenD, lineHeight: 1, marginBottom: '0.4rem' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '0.88rem', color: colors.brown }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
