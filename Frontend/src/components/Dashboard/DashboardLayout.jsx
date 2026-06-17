import { LogOut } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { colors } from '../../theme';
import { clearAuth, getStoredUser } from '../../utils/auth';

export default function DashboardLayout({ activePage, onPageChange, onNavigate, children }) {
  const user = getStoredUser();

  const handleLogout = () => {
    clearAuth();
    onNavigate?.('home');
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: colors.cream }}>
      <DashboardSidebar activePage={activePage} onNavigate={onPageChange} />

      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <header
          className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white"
          style={{ borderColor: `${colors.border} !important` }}
        >
          <div>
            <p className="mb-0 small" style={{ color: colors.muted }}>Welcome back</p>
            <p className="mb-0 fw-semibold" style={{ color: colors.charcoal }}>
              {user?.fullName || 'User'}
            </p>
          </div>
          <button
            className="btn btn-outline-secondary d-inline-flex align-items-center gap-2"
            style={{ borderColor: colors.border, borderRadius: 8 }}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log out
          </button>
        </header>

        <main className="flex-grow-1 p-4 p-lg-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
