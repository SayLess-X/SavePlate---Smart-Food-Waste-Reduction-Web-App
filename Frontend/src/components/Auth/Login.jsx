// src/components/Auth/Login.jsx
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AuthBranding from './AuthBranding';
import { colors, fonts } from '../../theme';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const inputStyle = {
  borderColor: colors.border,
  borderWidth: '1.5px',
  borderRadius: 10,
  background: colors.cream,
  fontSize: '0.9rem',
  padding: '0.75rem 1rem',
};

export default function Login({ onNavigate }) {
  const [form, setForm]     = useState({ email: '', password: '', remember: false });
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch(`${SPRING_BOOT_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Invalid email or password.');
      }

      const data = await res.json();
      const store = form.remember ? localStorage : sessionStorage;
      store.setItem('zw_token', data.token);
      store.setItem('zw_user', JSON.stringify(data.user));

      alert(`Welcome back, ${data.user.fullName}!`);
      setStatus('idle');
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="row g-0 min-vh-100" style={{ background: colors.cream }}>
      <div className="col-lg-6">
        <AuthBranding onNavigate={onNavigate} />
      </div>

      <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-lg-5 bg-white">
        <div className="w-100" style={{ maxWidth: 420 }}>
          <button
            className="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-2 border-0 mb-4"
            style={{ fontSize: '0.85rem', color: colors.muted }}
            onClick={() => onNavigate?.('home')}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <h1 style={{ fontFamily: fonts.display, fontSize: '1.9rem', fontWeight: 700, color: colors.charcoal, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h1>
          <p className="mb-4" style={{ fontSize: '0.95rem', color: colors.muted, fontWeight: 300 }}>
            Log in to your ZeroWaste account.
          </p>

          <div className="d-flex flex-column gap-3">
            {status === 'error' && (
              <div
                className="small p-2 rounded"
                style={{ color: '#c0392b', background: '#fdf0ef', border: '1px solid #f5c6c2' }}
              >
                {errMsg}
              </div>
            )}

            <div>
              <label htmlFor="email" className="form-label fw-semibold mb-1" style={{ fontSize: '0.82rem', color: colors.charcoal }}>Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                style={inputStyle}
                placeholder="someone@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label fw-semibold mb-1" style={{ fontSize: '0.82rem', color: colors.charcoal }}>Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                style={inputStyle}
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex align-items-center justify-content-between" style={{ fontSize: '0.84rem' }}>
              <label className="d-flex align-items-center gap-2 mb-0" style={{ color: colors.muted, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="remember"
                  className="form-check-input m-0"
                  style={{ width: 16, height: 16, accentColor: colors.green }}
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <button className="btn btn-link p-0 border-0" style={{ fontSize: '0.84rem', color: colors.muted, textDecoration: 'none' }}>
                Forgot Password?
              </button>
            </div>

            <button
              className="btn w-100 text-uppercase fw-semibold"
              style={{
                padding: '0.9rem',
                background: colors.charcoal,
                color: '#fff',
                borderRadius: 10,
                fontSize: '0.95rem',
                letterSpacing: '0.06em',
                border: 'none',
              }}
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Logging in…' : 'Login'}
            </button>
          </div>

          <p className="text-center mt-4 mb-0" style={{ fontSize: '0.88rem', color: colors.muted }}>
            New here?{' '}
            <button
              className="btn btn-link p-0 border-0 fw-semibold"
              style={{ fontSize: 'inherit', color: colors.charcoal, textDecoration: 'underline', textUnderlineOffset: '2px' }}
              onClick={() => onNavigate?.('signup')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
