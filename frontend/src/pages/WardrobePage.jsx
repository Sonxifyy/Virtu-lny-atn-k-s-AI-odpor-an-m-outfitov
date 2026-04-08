import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';
import ClothingForm from '../components/ClothingForm.jsx';
import ClothingList from '../components/ClothingList.jsx';

export default function WardrobePage() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: '', color: '', season: '', style: '' });

  async function loadItems(activeFilters = filters) {
    const params = new URLSearchParams(Object.entries(activeFilters).filter(([, value]) => value)).toString();
    const data = await apiRequest(`/clothes${params ? `?${params}` : ''}`);
    setItems(data);
  }

  useEffect(() => {
    loadItems().catch(console.error);
  }, []);

  async function handleDelete(id) {
    await apiRequest(`/clothes/${id}`, { method: 'DELETE' });
    loadItems();
  }

  function handleFilterChange(event) {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  function resetFilters() {
    const cleared = { category: '', color: '', season: '', style: '' };
    setFilters(cleared);
    loadItems(cleared);
  }

  return (
    <main className="page">
      <section className="card recommend-hero">
        <div className="page-header">
          <div>
            <div className="panel-eyebrow">Pinterest style wardrobe</div>
            <h1 className="page-title">My Wardrobe</h1>
            <p className="page-subtitle">Add clothing, filter items, and build a clean digital wardrobe in soft pink and violet tones.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-2">
        <ClothingForm onCreated={loadItems} />

        <section className="card form-grid">
          <div>
            <div className="panel-eyebrow">Filter & curate</div>
            <h2 className="section-title">Filter items</h2>
            <p className="section-copy">Choose only the pieces you need right now for a specific vibe.</p>
          </div>

          <div className="filters-grid">
            <div className="input-group">
              <label className="label">Category</label>
              <input name="category" placeholder="e.g. dress" value={filters.category} onChange={handleFilterChange} />
            </div>
            <div className="input-group">
              <label className="label">Color</label>
              <input name="color" placeholder="pink, black, beige..." value={filters.color} onChange={handleFilterChange} />
            </div>
            <div className="input-group">
              <label className="label">Season</label>
              <input name="season" placeholder="summer, winter..." value={filters.season} onChange={handleFilterChange} />
            </div>
            <div className="input-group">
              <label className="label">Style</label>
              <input name="style" placeholder="casual, elegant..." value={filters.style} onChange={handleFilterChange} />
            </div>
          </div>

          <div className="actions-row">
            <button className="primary-btn" onClick={() => loadItems()}>Apply filters</button>
            <button className="secondary-btn" onClick={resetFilters}>Reset</button>
          </div>

          <div className="highlight-box">
            <strong>{items.length}</strong>
            <p className="note">Currently displayed items in your collection.</p>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="split-header">
          <div>
            <h2 className="section-title">Your fashion board</h2>
            <p className="section-copy">A clickable overview of items in a Pinterest-like layout.</p>
          </div>
        </div>
        <div className="divider" />
        <ClothingList items={items} onDelete={handleDelete} />
      </section>
    </main>
  );
}