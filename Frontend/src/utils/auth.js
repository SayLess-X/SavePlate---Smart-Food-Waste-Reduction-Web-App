export function getStoredUser() {
  const raw = localStorage.getItem('zw_user') || sessionStorage.getItem('zw_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem('zw_token') || sessionStorage.getItem('zw_token');
}

export function clearAuth() {
  localStorage.removeItem('zw_token');
  localStorage.removeItem('zw_user');
  sessionStorage.removeItem('zw_token');
  sessionStorage.removeItem('zw_user');
}

export function isLoggedIn() {
  return Boolean(getStoredToken() && getStoredUser());
}
