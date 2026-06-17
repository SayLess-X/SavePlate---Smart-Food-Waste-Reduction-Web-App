import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Bell,
  CalendarDays,
  BarChart2,
  Settings,
  Leaf,
} from 'lucide-react';
import { colors, fonts } from '../../theme';

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Food Inventory', icon: Package },
  { id: 'add-food', label: 'Add Food Item', icon: PlusCircle },
  { id: 'expiry', label: 'Expiry Alerts', icon: Bell },
  { id: 'meal-planner', label: 'Meal Planner', icon: CalendarDays },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, disabled: true },
  { id: 'settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function DashboardSidebar({ activePage, onNavigate }) {
  const effectivePage = activePage === 'edit-food' ? 'inventory' : activePage;

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 border-end bg-white"
      style={{ width: 260, borderColor: `${colors.border} !important`, minHeight: '100vh' }}
    >
      <div className="d-flex align-items-center gap-2 px-4 py-4 border-bottom"
        style={{ borderColor: `${colors.border} !important` }}>
        <span className="d-flex align-items-center justify-content-center text-white"
          style={{ width: 36, height: 36, background: colors.green, borderRadius: 10 }}>
          <Leaf size={18} strokeWidth={2.5} />
        </span>
        <span style={{ fontFamily: fonts.display, fontSize: '1.2rem', fontWeight: 700, color: colors.greenD }}>
          ZeroWaste
        </span>
      </div>

      <nav className="flex-grow-1 p-3">
        <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
          {NAV_ITEMS.map(({ id, label, icon: Icon, disabled }) => {
            const isActive = effectivePage === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  className="btn w-100 d-flex align-items-center gap-3 border-0 text-start"
                  disabled={disabled}
                  onClick={() => !disabled && onNavigate(id)}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: 10,
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    color: disabled ? colors.muted : isActive ? colors.greenD : colors.charcoal,
                    background: isActive ? '#eaf5ef' : 'transparent',
                    opacity: disabled ? 0.45 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}