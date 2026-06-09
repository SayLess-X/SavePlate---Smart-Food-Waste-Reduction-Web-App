// src/components/Auth/Signup.jsx
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AuthBranding from './AuthBranding';
import { colors, fonts } from '../../theme';

const SPRING_BOOT_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const INITIAL = { fullName: '', email: '', password: '', confirmPassword: '' };

const inputStyle = {
  borderColor: colors.border,
  borderWidth: '1.5px',
  borderRadius: 10,
  background: colors.cream,
  fontSize: '0.9rem',
  padding: '0.75rem 1rem',
};

export default function Signup({ onNavigate }) {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState('idle');
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
      sessionStorage.setItem('zw_token', data.token);
      sessionStorage.setItem('zw_user', JSON.stringify(data.user));

      setStatus('success');
      setForm(INITIAL);
      alert(`Account created! Welcome, ${data.user.fullName}!`);
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
            Create your account
          </h1>
          <p className="mb-4" style={{ fontSize: '0.95rem', color: colors.muted, fontWeight: 300 }}>
            Start reducing food waste in under a minute.
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

            {[
              { id: 'fullName', label: 'Full Name:', type: 'text', placeholder: 'John Doe' },
              { id: 'email', label: 'Email:', type: 'email', placeholder: 'someone@gmail.com' },
              { id: 'password', label: 'Password:', type: 'password' },
              { id: 'confirmPassword', label: 'Confirm Password:', type: 'password' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="form-label fw-semibold mb-1" style={{ fontSize: '0.82rem', color: colors.charcoal }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  className="form-control"
                  style={inputStyle}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={handleChange}
                />
              </div>
            ))}

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
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Creating account…'
                : status === 'success' ? '✓ Account created!'
                : 'Create Account'}
            </button>

            <p className="text-center small mb-0" style={{ color: colors.muted, lineHeight: 1.6 }}>
              By signing up you agree to our{' '}
              <a href="#" className="text-decoration-underline" style={{ color: colors.charcoal }}>terms &amp; privacy policy</a>.
            </p>
          </div>

          <p className="text-center mt-4 mb-0" style={{ fontSize: '0.88rem', color: colors.muted }}>
            Already have an account?{' '}
            <button
              className="btn btn-link p-0 border-0 fw-semibold"
              style={{ fontSize: 'inherit', color: colors.charcoal, textDecoration: 'underline', textUnderlineOffset: '2px' }}
              onClick={() => onNavigate?.('login')}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
