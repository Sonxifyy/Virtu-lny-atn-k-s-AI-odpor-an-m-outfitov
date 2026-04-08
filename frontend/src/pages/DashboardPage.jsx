import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ clothes: 0, outfits: 0, favorites: 0, calendar: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [clothes, outfits, favorites, calendar] = await Promise.all([
          apiRequest('/clothes'),
          apiRequest('/outfits'),
          apiRequest('/favorites'),
          apiRequest('/calendar')
        ]);

        setStats({
          clothes: clothes.length,
          outfits: outfits.length,
          favorites: favorites.length,
          calendar: calendar.length
        });
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  const quickLinks = [
    { to: '/wardrobe', icon: '👗', title: 'My wardrobe', text: 'Add new pieces and create your own fashion board.' },
    { to: '/recommend', icon: '✨', title: 'AI stylist', text: 'Generate an outfit based on the weather and occasion.' },
    { to: '/outfits', icon: '🪄', title: 'Saved outfits', text: 'View saved combinations and their details.' },
    { to: '/calendar', icon: '🗓️', title: 'Planner', text: 'Plan what you will wear for a specific day.' }
  ];

  return (
    <main className="page">
      <section className="card recommend-hero">
        <div className="page-header">
          <div>
            <div className="panel-eyebrow">Hi {user?.name || 'fashion lover'} ✨</div>
            <h1 className="page-title">Your elegant fashion dashboard</h1>
            <p className="page-subtitle">
              Manage your pieces, discover combinations, and let the AI stylist suggest an outfit that matches your mood and the weather.
            </p>
          </div>
        </div>
      </section>

      <section className="grid stats-grid">
        <div className="card stat-card"><div className="stat-label">Items in wardrobe</div><div className="stat-value">{stats.clothes}</div></div>
        <div className="card stat-card"><div className="stat-label">Saved outfits</div><div className="stat-value">{stats.outfits}</div></div>
        <div className="card stat-card"><div className="stat-label">Favorites</div><div className="stat-value">{stats.favorites}</div></div>
        <div className="card stat-card"><div className="stat-label">Calendar plans</div><div className="stat-value">{stats.calendar}</div></div>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <div className="panel-eyebrow">Quick actions</div>
            <h2 className="section-title">Go straight where you want</h2>
            <p className="section-copy">The most common steps for quick work in the app.</p>
          </div>
        </div>

        <div className="quick-grid">
          {quickLinks.map((item) => (
            <Link key={item.to} to={item.to} className="quick-link">
              <div className="quick-link-icon">{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <div className="muted">{item.text}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}