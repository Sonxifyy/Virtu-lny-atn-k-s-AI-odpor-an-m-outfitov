import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';
import OutfitCard from '../components/OutfitCard.jsx';

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    apiRequest('/outfits').then(setOutfits).catch(console.error);
  }, []);

  return (
    <main className="page">
      <section className="card recommend-hero">
        <div className="panel-eyebrow">Saved looks</div>
        <h1 className="page-title">Saved outfits</h1>
        <p className="page-subtitle">All combinations you have saved from the AI stylist or created in the app.</p>
      </section>

      <section className="outfit-list">
        {outfits.length ? outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} />) : <div className="card empty-state">You don’t have any saved outfits yet.</div>}
      </section>
    </main>
  );
}