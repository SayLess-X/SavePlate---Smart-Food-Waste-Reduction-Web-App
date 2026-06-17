import { colors, fonts } from '../../../theme';

export default function DashboardHome() {
  return (
    <div>
      <h1 style={{ fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 700, color: colors.charcoal }}>
        Dashboard
      </h1>
      <p style={{ color: colors.muted }}>
        Use the sidebar to manage your food inventory and reduce waste.
      </p>
    </div>
  );
}
