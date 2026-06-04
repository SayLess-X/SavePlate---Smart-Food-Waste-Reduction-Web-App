// src/components/Auth/Signup.jsx
import { useState } from 'react';
import { ArrowLeft, Leaf } from 'lucide-react';
import './Auth.css';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const INITIAL = { fullName: '', email: '', password: '', confirmPassword: '' };

export default function Signup({ onNavigate }) {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.fullName.trim())                  return 'Full name is required.';
    if (!form.email.includes('@'))              return 'Enter a valid email address.';
    if (form.password.length < 8)              return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) { setErrMsg(validationError); setStatus('error'); return; }

    setStatus('loading');
    setErrMsg('');
    try {
      // POST http://localhost:8080/api/auth/register
      // Spring Boot expects: { fullName, email, password }
      // Returns: { token, user: { id, fullName, email, role } }
      const res = await fetch(`${SPRING_BOOT_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Registration failed. Please try again.');
      }

      const data = await res.json();

      // Store JWT token in sessionStorage by default
      sessionStorage.setItem('sp_token', data.token);
      sessionStorage.setItem('sp_user', JSON.stringify(data.user));

      setStatus('success');
      setForm(INITIAL);

      // TODO: redirect to dashboard, e.g. navigate('/dashboard')
      alert(`Account created! Welcome, ${data.user.fullName}!`);
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

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start reducing food waste in under a minute.</p>

          <div className="auth-form">
            {status === 'error' && (
              <div className="auth-error">{errMsg}</div>
            )}

            <div className="auth-field">
              <label htmlFor="fullName">Full Name:</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

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

            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              className="auth-submit"
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Creating account…'
                : status === 'success' ? '✓ Account created!'
                : 'Create Account'}
            </button>

            <p className="auth-legal">
              By signing up you agree to our{' '}
              <a href="#">terms &amp; privacy policy</a>.
            </p>
          </div>

          <p className="auth-switch">
            Already have an account?{' '}
            <button onClick={() => onNavigate?.('login')}>Login</button>
          </p>

        </div>
      </div>
    </div>
  );
}