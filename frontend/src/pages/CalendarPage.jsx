import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';

export default function CalendarPage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    apiRequest('/calendar').then(setPlans).catch(console.error);
  }, []);

  return (
    <main className="page">
      <section className="card recommend-hero">
        <div className="panel-eyebrow">Outfit planner</div>
        <h1 className="page-title">Outfit calendar</h1>
        <p className="page-subtitle">Planned combinations for each day.</p>
      </section>

      <section className="card">
        {plans.length ? (
          <div className="calendar-list">
            {plans.map((plan) => (
              <div className="list-row" key={plan.id}>
                <div>
                  <strong>{plan.outfit_name}</strong>
                  <div className="muted">Planned look</div>
                </div>
                <div className="chip-date">{new Date(plan.planned_date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">The calendar is empty for now.</div>
        )}
      </section>
    </main>
  );
}