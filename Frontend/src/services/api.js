import { getStoredToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STORAGE_KEY = 'zw_food_inventory';

function buildHeaders(extra = {}) {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

function readStoredItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStoredItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

async function request(path, options = {}, fallback) {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: buildHeaders(options.headers),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Request failed (${response.status})`);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    if (typeof fallback === 'function') return fallback(error);
    throw error;
  }
}

export const foodApi = {
  async getAll() {
    return request('/api/food-items', { method: 'GET' }, () => readStoredItems());
  },

  async create(item) {
    return request(
      '/api/food-items',
      { method: 'POST', body: JSON.stringify(item) },
      () => {
        const items = readStoredItems();
        const savedItem = {
          id: Date.now(),
          ...item,
          expiryDate: item.expiryDate || null,
          imageUrl: item.imageUrl || null,
        };
        writeStoredItems([...items, savedItem]);
        return savedItem;
      }
    );
  },

  async update(id, item) {
    return request(
      `/api/food-items/${id}`,
      { method: 'PUT', body: JSON.stringify(item) },
      () => {
        const items = readStoredItems().map((i) =>
          i.id === id ? { ...i, ...item } : i
        );
        writeStoredItems(items);
        return { id, ...item };
      }
    );
  },

  async delete(id) {
    return request(
      `/api/food-items/${id}`,
      { method: 'DELETE' },
      () => {
        const items = readStoredItems().filter((item) => item.id !== id);
        writeStoredItems(items);
        return null;
      }
    );
  },
};