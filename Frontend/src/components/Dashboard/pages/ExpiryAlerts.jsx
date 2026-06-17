    import { useEffect, useState, useMemo } from 'react';
import { Bell, Trash2, RefreshCw } from 'lucide-react';
import { colors, fonts } from '../../../theme';
import { foodApi } from '../../../services/api';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=64&h=64&fit=crop';

function getDaysLeft(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const FILTERS = ['All', 'Expiring Soon', 'Expired'];

// Items expiring within 7 days (but not yet expired) count as "Expiring Soon"
function getStatus(daysLeft) {
  if (daysLeft === null) return null;
  if (daysLeft < 0) return 'Expired';
  if (daysLeft <= 7) return 'Expiring Soon';
  return 'Fresh';
}

export default function ExpiryAlerts({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const loadItems = () => {
    setLoading(true);
    setError('');
    foodApi
      .getAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this item from inventory?')) return;
    setDeletingId(id);
    try {
      await foodApi.delete(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Only show items that are expiring soon or already expired
  const alertItems = useMemo(() => {
    return items
      .map((item) => ({ ...item, daysLeft: getDaysLeft(item.expiryDate) }))
      .filter((item) => item.daysLeft !== null && item.daysLeft <= 7)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return alertItems;
    return alertItems.filter((item) => getStatus(item.daysLeft) === activeFilter);
  }, [alertItems, activeFilter]);

  const expiringSoonCount = alertItems.filter((i) => getStatus(i.daysLeft) === 'Expiring Soon').length;
  const expiredCount = alertItems.filter((i) => getStatus(i.daysLeft) === 'Expired').length;

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between mb-4 gap-3 flex-wrap">
        <div>
          <h1 style={{ fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.25rem' }}>
            Expiry Alerts
          </h1>
          <p className="mb-0" style={{ color: colors.muted }}>
            Never let good food go to waste with timely expiry reminders.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-sm d-inline-flex align-items-center gap-2"
          onClick={loadItems}
          style={{ border: `1.5px solid ${colors.border}`, borderRadius: 8, color: colors.muted, background: 'white', padding: '0.4rem 0.9rem', fontSize: '0.825rem' }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Summary badges */}
      {!loading && alertItems.length > 0 && (
        <div className="d-flex gap-3 mb-4 flex-wrap">
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{ background: '#fff7ed', border: '1.5px solid #fed7aa' }}>
            <Bell size={14} color="#c2410c" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c2410c' }}>
              {expiringSoonCount} expiring soon
            </span>
          </div>
          {expiredCount > 0 && (
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
              style={{ background: '#fef2f2', border: '1.5px solid #fecaca' }}>
              <Bell size={14} color="#b91c1c" />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#b91c1c' }}>
                {expiredCount} expired
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="d-flex gap-2 mb-4">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.4rem 1.1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: `1.5px solid ${isActive ? colors.charcoal : colors.border}`,
                borderRadius: 8,
                background: isActive ? colors.charcoal : 'white',
                color: isActive ? 'white' : colors.muted,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {error && <div className="alert alert-danger py-2 small mb-4">{error}</div>}

      {/* Table card */}
      <div className="bg-white rounded-4 overflow-hidden" style={{ border: `1.5px solid ${colors.border}` }}>
        {loading ? (
          <div className="text-center py-5" style={{ color: colors.muted }}>Loading alerts…</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-5">
            <Bell size={36} color={colors.border} className="mb-3 d-block mx-auto" />
            <p className="mb-1 fw-semibold" style={{ color: colors.charcoal }}>
              {activeFilter === 'All' ? 'All your food is fresh!' : `No items with status "${activeFilter}"`}
            </p>
            <p className="mb-0 small" style={{ color: colors.muted }}>
              {activeFilter === 'All' && 'Items expiring within 7 days will appear here.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr style={{ background: colors.cream, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.muted }}>
                  <th className="ps-4 py-3 border-0">Food Items</th>
                  <th className="py-3 border-0">Expiry Date</th>
                  <th className="py-3 border-0">Days Left</th>
                  <th className="py-3 border-0">Status</th>
                  <th className="pe-4 py-3 border-0 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const status = getStatus(item.daysLeft);
                  const isExpired = status === 'Expired';

                  const statusStyle = isExpired
                    ? { background: '#fef2f2', color: '#b91c1c', border: '1.5px solid #fecaca' }
                    : { background: '#fff7ed', color: '#c2410c', border: '1.5px solid #fed7aa' };

                  const daysLabel = item.daysLeft < 0
                    ? `${item.daysLeft} days`
                    : item.daysLeft === 0
                    ? 'Today'
                    : `${item.daysLeft} day${item.daysLeft !== 1 ? 's' : ''}`;

                  return (
                    <tr key={item.id}>
                      {/* Food item */}
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={item.imageUrl || DEFAULT_IMAGE}
                            alt={item.name}
                            className="rounded-3 object-fit-cover flex-shrink-0"
                            style={{ width: 44, height: 44 }}
                          />
                          <div>
                            <div className="fw-semibold" style={{ color: colors.charcoal }}>{item.name}</div>
                            {item.description && (
                              <div style={{ fontSize: '0.75rem', color: colors.muted, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Expiry date */}
                      <td className="py-3" style={{ color: colors.charcoal, fontSize: '0.9rem' }}>
                        {formatDate(item.expiryDate)}
                      </td>

                      {/* Days left */}
                      <td className="py-3">
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: isExpired ? '#b91c1c' : item.daysLeft <= 3 ? '#c2410c' : colors.charcoal,
                        }}>
                          {daysLabel}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="py-3">
                        <span
                          className="px-3 py-1 rounded-pill"
                          style={{ ...statusStyle, fontSize: '0.78rem', fontWeight: 600, display: 'inline-block' }}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="pe-4 py-3 text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-sm d-inline-flex align-items-center justify-content-center"
                            title="Edit item"
                            onClick={() => onNavigate?.('edit-food', item)}
                            style={{ width: 34, height: 34, borderRadius: 8, border: `1.5px solid ${colors.border}`, background: 'white', color: colors.charcoal }}
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
                            title="Delete item"
                            style={{ width: 34, height: 34, borderRadius: 8 }}
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}