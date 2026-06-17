import { useEffect, useState } from 'react';
import { Pencil, Trash2, Search, Plus, SlidersHorizontal } from 'lucide-react';
import { colors, fonts, btnPrimaryStyle } from '../../../theme';
import { foodApi } from '../../../services/api';

const CATEGORIES = ['All', 'Dairy', 'Meat', 'Fruits', 'Vegetable'];

const CATEGORY_COLORS = {
  Dairy: '#3b82f6',
  Meat: '#ef4444',
  Fruits: '#f59e0b',
  Vegetable: '#22c55e',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=80&h=80&fit=crop';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isExpiringSoon(dateStr) {
  if (!dateStr) return false;
  const diff = new Date(dateStr) - new Date();
  return diff >= 0 && diff <= 3 * 24 * 60 * 60 * 1000;
}

function isExpired(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

export default function FoodInventory({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadItems = () => {
    setLoading(true);
    setError('');
    foodApi.getAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this food item?')) return;
    setDeletingId(id);
    try {
      await foodApi.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header row */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 style={{ fontFamily: fonts.display, fontSize: '1.75rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.25rem' }}>
            Food Inventory
          </h1>
          <p className="mb-0" style={{ color: colors.muted }}>
            View and manage all your stored food items.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill px-3 py-2"
            style={{ background: '#eaf5ef', color: colors.greenD, fontWeight: 600 }}>
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            className="btn btn-primary d-inline-flex align-items-center gap-2"
            style={{ ...btnPrimaryStyle, padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            onClick={() => onNavigate?.('add-food')}
          >
            <Plus size={16} />
            Add Food Item
          </button>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <div className="position-relative flex-grow-1" style={{ minWidth: 200, maxWidth: 420 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, pointerEvents: 'none' }} />
          <input type="text" className="form-control" placeholder="Search by name or description…"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.25rem', borderColor: colors.border, borderWidth: '1.5px', borderRadius: 10, fontSize: '0.875rem', height: 40 }} />
        </div>

        <div className="position-relative d-flex align-items-center">
          <SlidersHorizontal size={15} style={{ position: 'absolute', left: '0.85rem', color: colors.muted, pointerEvents: 'none', zIndex: 1 }} />
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ paddingLeft: '2.25rem', borderColor: colors.border, borderWidth: '1.5px', borderRadius: 10, fontSize: '0.875rem', height: 40, minWidth: 150, cursor: 'pointer' }}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger py-2 small mb-4">{error}</div>}

      <div className="bg-white border rounded-4 overflow-hidden" style={{ borderColor: `${colors.border} !important` }}>
        {loading ? (
          <div className="text-center py-5" style={{ color: colors.muted }}>Loading inventory…</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-5" style={{ color: colors.muted }}>
            {items.length === 0 ? 'No food items yet. Add your first item above.' : 'No items match your search or filter.'}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr style={{ background: colors.cream, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.muted }}>
                  <th className="ps-4 py-3 border-0">Food Items</th>
                  <th className="py-3 border-0">Category</th>
                  <th className="py-3 border-0">Quantity</th>
                  <th className="py-3 border-0">Expiry Date</th>
                  <th className="pe-4 py-3 border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.imageUrl || DEFAULT_IMAGE} alt={item.name}
                          className="rounded-3 object-fit-cover flex-shrink-0"
                          style={{ width: 48, height: 48 }} />
                        <div>
                          <div className="fw-semibold" style={{ color: colors.charcoal }}>{item.name}</div>
                          {item.description && (
                            <div style={{ fontSize: '0.78rem', color: colors.muted, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="badge rounded-pill px-3 py-2"
                        style={{ background: `${CATEGORY_COLORS[item.category] || colors.muted}18`, color: CATEGORY_COLORS[item.category] || colors.muted, fontWeight: 600, fontSize: '0.78rem' }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3" style={{ color: colors.charcoal }}>{item.quantity} {item.quantityUnit}</td>
                    <td className="py-3">
                      <span style={{
                        color: isExpired(item.expiryDate) ? '#c0392b' : isExpiringSoon(item.expiryDate) ? '#b96a10' : colors.charcoal,
                        fontWeight: isExpired(item.expiryDate) || isExpiringSoon(item.expiryDate) ? 600 : 400,
                      }}>
                        {formatDate(item.expiryDate)}
                        {isExpired(item.expiryDate) && <span className="ms-1 small">(expired)</span>}
                        {!isExpired(item.expiryDate) && isExpiringSoon(item.expiryDate) && <span className="ms-1 small">(soon)</span>}
                      </span>
                    </td>
                    <td className="pe-4 py-3 text-end">
                      <div className="d-inline-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                          style={{ width: 34, height: 34, borderRadius: 8, borderColor: colors.border }}
                          onClick={() => onNavigate?.('edit-food', item)}
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
                          style={{ width: 34, height: 34, borderRadius: 8 }}
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}