import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      login(data);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-layout">
        <section className="hero-card">
          <div>
            <div className="hero-eyebrow">🌷 Your fashion cloud</div>
            <h1 className="hero-title">Dress your ideas before you dress yourself.</h1>
            <p className="hero-text">
              The virtual wardrobe helps you store pieces, plan outfits, and let an AI stylist create combinations based on weather, occasion, and mood.
            </p>
          </div>

          <div className="hero-stats">
            <div className="mini-stat"><strong>AI</strong><span>smart outfit suggestions</span></div>
            <div className="mini-stat"><strong>Cloud</strong><span>frontend, backend, DB</span></div>
            <div className="mini-stat"><strong>Style</strong><span>soft pink & violet aesthetic</span></div>
          </div>
        </section>

        <form className="card auth-card form-grid" onSubmit={handleSubmit}>
          <div>
            <div className="panel-eyebrow">Welcome back</div>
            <h2 className="auth-title page-title">Login</h2>
            <p className="page-subtitle">Log in and open your digital wardrobe.</p>
          </div>

          <div className="input-group">
            <label className="label">Email</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </div>

          <button className="primary-btn">Log in</button>
          {message && <p className="message error">{message}</p>}
          <p className="muted">Don’t have an account? <Link to="/register"><strong>Create one here</strong></Link></p>
        </form>
      </div>
    </div>
  );
}