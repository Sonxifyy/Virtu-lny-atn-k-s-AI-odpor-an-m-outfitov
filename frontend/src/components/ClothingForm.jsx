import { useState } from 'react';
import { apiRequest } from '../api/client.js';

const initialState = {
  name: '',
  category: '',
  color: '',
  season: '',
  style: '',
  formality: '',
  brand: '',
  imageUrl: ''
};

const categoryOptions = ['t-shirt', 'shirt', 'blouse', 'sweater', 'hoodie', 'jeans', 'trousers', 'skirt', 'dress', 'shoes', 'sneakers', 'boots', 'jacket', 'coat', 'bag', 'accessory'];
const seasonOptions = ['spring', 'summer', 'autumn', 'winter'];
const styleOptions = ['casual', 'elegant', 'streetwear', 'minimal', 'romantic', 'sporty', 'formal'];
const formalityOptions = ['casual', 'smart-casual', 'formal'];

export default function ClothingForm({ onCreated }) {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = form.imageUrl;

      if (file) {
        const body = new FormData();
        body.append('image', file);

        const uploadResult = await apiRequest('/upload', {
          method: 'POST',
          body
        });

        imageUrl = uploadResult.imageUrl;
      }

      await apiRequest('/clothes', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          imageUrl
        })
      });

      setForm(initialState);
      setFile(null);
      setMessage('The item has been successfully added to the wardrobe.');
      onCreated?.();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <div className="section-header">
        <div>
          <div className="panel-eyebrow">➕ Add a new piece</div>
          <h2 className="section-title">Add clothing</h2>
          <p className="section-copy">Upload a photo or URL and create your own digital Pinterest-like wardrobe.</p>
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label className="label">Item name</label>
          <input name="name" placeholder="e.g. Pink cardigan" value={form.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label className="label">Category</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters-grid">
        <div className="input-group">
          <label className="label">Color</label>
          <input name="color" placeholder="e.g. blush pink" value={form.color} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="label">Season</label>
          <select name="season" value={form.season} onChange={handleChange}>
            <option value="">Select a season</option>
            {seasonOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label className="label">Style</label>
          <select name="style" value={form.style} onChange={handleChange}>
            <option value="">Select a style</option>
            {styleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label className="label">Formality</label>
          <select name="formality" value={form.formality} onChange={handleChange}>
            <option value="">Select a level</option>
            {formalityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label className="label">Brand</label>
          <input name="brand" placeholder="e.g. Zara" value={form.brand} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="label">Image URL</label>
          <input name="imageUrl" placeholder="https://..." value={form.imageUrl} onChange={handleChange} />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Upload your own photo</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>

      <div className="actions-row">
        <button className="primary-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Add to wardrobe'}
        </button>
        {message && <span className="message">{message}</span>}
      </div>
    </form>
  );
}