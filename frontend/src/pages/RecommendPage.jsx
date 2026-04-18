import { useState } from 'react';
import { apiRequest } from '../api/client.js';
import OutfitCard from '../components/OutfitCard.jsx';

const initialForm = { occasion: '', weatherType: '', style: '', season: '' };

export default function RecommendPage() {
  const [form, setForm] = useState(initialForm);
  const [recommendation, setRecommendation] = useState(null);
  const [message, setMessage] = useState('');
  const [plannedDate, setPlannedDate] = useState('');
  const [savedOutfitId, setSavedOutfitId] = useState(null);

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleRecommend(event) {
    event.preventDefault();
    setMessage('');
    setSavedOutfitId(null);

    try {
      const data = await apiRequest('/outfits/recommend', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setRecommendation(data);
      if (!data.items?.length) {
        setMessage('First, add a few items to your wardrobe so the AI can create an outfit.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveRecommendation() {
    if (!recommendation?.items?.length) return;

    try {
      const outfit = await apiRequest('/outfits', {
        method: 'POST',
        body: JSON.stringify({
          name: recommendation.name,
          occasion: form.occasion,
          season: form.season,
          weatherType: form.weatherType,
          aiGenerated: true,
          explanation: recommendation.explanation,
          itemIds: recommendation.items.map((item) => item.id)
        })
      });

      setSavedOutfitId(outfit.id);
      setMessage(`Outfit "${outfit.name}" has been saved.`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function addToFavorites() {
    if (!savedOutfitId) {
      setMessage('Save the outfit first.');
      return;
    }
    await apiRequest(`/favorites/${savedOutfitId}`, { method: 'POST' });
    setMessage('The outfit has been added to favorites.');
  }

  async function planLatest() {
    if (!savedOutfitId) {
      setMessage('Save the outfit first.');
      return;
    }
    if (!plannedDate) {
      setMessage('Select a date.');
      return;
    }
    await apiRequest('/calendar', {
      method: 'POST',
      body: JSON.stringify({ outfitId: savedOutfitId, plannedDate })
    });
    setMessage('The outfit has been added to the calendar.');
  }

  return (
    <main className="page">
      <div className="outfit-layout">
        <form className="card form-grid" onSubmit={handleRecommend}>
          <div>
            <div className="panel-eyebrow">AI stylist studio</div>
            <h1 className="page-title">AI Screen try change</h1>
            <p className="page-subtitle">Fill in the context and let the AI create an outfit from what you already own.</p>
          </div>

          <div className="input-group">
            <label className="label">Occasion</label>
            <input name="occasion" placeholder="school, work, coffee date..." value={form.occasion} onChange={handleChange} />
          </div>

          <div className="filters-grid">
            <div className="input-group">
              <label className="label">Weather</label>
              <input name="weatherType" placeholder="rain, cold, hot..." value={form.weatherType} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="label">Style</label>
              <input name="style" placeholder="romantic, casual, elegant..." value={form.style} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="label">Season</label>
              <input name="season" placeholder="spring, summer..." value={form.season} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="label">Calendar date</label>
              <input type="date" value={plannedDate} onChange={(e) => setPlannedDate(e.target.value)} />
            </div>
          </div>

          <button className="primary-btn">Generate outfit </button>

          <div className="highlight-box">
            <strong>How it works</strong>
            <p className="note">The app sends your wardrobe to the backend. It then uses the Gemini API or fallback logic and returns the most suitable combination.</p>
          </div>
        </form>

        <section>
          {!recommendation ? (
            <div className="card recommend-hero">
              <div className="panel-eyebrow">Ready for a look?</div>
              <h2 className="section-title">Your recommendation will appear here</h2>
              <p className="section-copy">First fill out the form and click Generate outfit.</p>
            </div>
          ) : (
            <OutfitCard outfit={recommendation} />
          )}

          {recommendation && (
            <div className="card">
              <div className="section-header">
                <div>
                  <h2 className="section-title">What do you want to do next?</h2>
                  <p className="section-copy">Save the outfit, add it to favorites, or schedule it.</p>
                </div>
              </div>

              <div className="actions-row">
                <button className="primary-btn" onClick={saveRecommendation}>Save outfit</button>
                <button className="secondary-btn" onClick={addToFavorites}>Add to favorites</button>
                <button className="ghost-btn" onClick={planLatest}>Schedule</button>
              </div>

              {message && <p className="message success">{message}</p>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}