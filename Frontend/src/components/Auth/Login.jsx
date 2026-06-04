// src/components/Auth/Login.jsx
import { useState } from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import './Auth.css';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function Login({ onNavigate }) {
  const [form, setForm]     = useState({ email: '', password: '', remember: false });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    setStatus('loading');
    setErrMsg('');
    try {
      // POST http://localhost:8080/api/auth/login
      // Spring Boot returns: { token, user: { id, fullName, email, role } }
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

      // Store JWT token — use sessionStorage or localStorage depending on "Remember me"
      const store = form.remember ? localStorage : sessionStorage;
      store.setItem('sp_token', data.token);
      store.setItem('sp_user', JSON.stringify(data.user));

      // TODO: redirect to dashboard, e.g. navigate('/dashboard')
      alert(`Welcome back, ${data.user.fullName}!`);
      setStatus('idle');
    } catch (err) {
      setErrMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="auth-page">

      {/* ── Left branding panel ── */}
      <div className="auth-left">
        <div className="auth-left-bg">
          <img
            src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=900&q=80"
            alt="Fresh produce"
          />
        </div>

        <div className="auth-left-content">
          {/* Logo */}
          <button type="button" className="auth-logo" onClick={() => onNavigate?.('home')}>
            <span className="auth-logo-icon">
              <Leaf size={18} strokeWidth={2.5} color="#fff" />
            </span>
            SavePlate
          </button>

          {/* Brand copy */}
          <div className="auth-brand-copy">
            <p className="auth-brand-eyebrow">A Quiet Revolution</p>
            <h2 className="auth-brand-heading">
              Every Saved plate is<br />a small kindness.
            </h2>
            <p className="auth-brand-sub">
              Join thousands of households turning surplus into shared meals.
            </p>
          </div>

          <p className="auth-left-footer">© 2026 SavePlate Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          <button className="auth-back" onClick={() => onNavigate?.('home')}>
            <ArrowLeft size={15} /> Back
          </button>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Log in to your SavePlate account.</p>

          <div className="auth-form">
            {status === 'error' && (
              <div className="auth-error">{errMsg}</div>
            )}

            <div className="auth-field">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="someone@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="auth-extras">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              {/* TODO: wire up to /api/auth/forgot-password */}
              <button className="auth-forgot">Forgot Password?</button>
            </div>

            <button
              className="auth-submit"
              onClick={handleSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Logging in…' : 'Login'}
            </button>
          </div>

          <p className="auth-switch">
            New here?{' '}
            <button onClick={() => onNavigate?.('signup')}>Create an account</button>
          </p>

        </div>
      </div>
    </div>
  );
}