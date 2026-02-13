import React, { useState } from 'react';
import { Talent, GameState } from '../types';
import { X, Calendar, MapPin, DollarSign } from 'lucide-react';

interface Props {
  gameState: GameState;
  onCreateTour: (tour: any) => void;
  onClose: () => void;
}

const TourPlanner: React.FC<Props> = ({ gameState, onCreateTour, onClose }) => {
  const [artistId, setArtistId] = useState<string | undefined>(gameState.signedArtists[0]?.id);
  const [destinationsText, setDestinationsText] = useState('Paris, London');
  const [nightsPerCity, setNightsPerCity] = useState(1);

  const signed = gameState.signedArtists || [];

  const destinations = destinationsText.split(',').map(s => s.trim()).filter(Boolean);

  const estimateCost = () => {
    const base = 20000; // base production / transport
    const perCity = 8000; // per stop
    return base + perCity * destinations.length * nightsPerCity;
  };

  const estimateRevenue = () => {
    const popularity = signed.find(s => s.id === artistId)?.popularity || 20;
    const multiplier = 1 + (popularity / 200); // small boost for popularity
    return Math.round(estimateCost() * 1.6 * multiplier);
  };

  const handleStart = () => {
    if (!artistId) return;
    const tour = {
      id: `tour-${Date.now()}`,
      artistId,
      destinations,
      nightsPerCity,
      cost: estimateCost(),
      revenueEstimate: estimateRevenue(),
      startDate: Date.now(),
      endDate: Date.now() + destinations.length * nightsPerCity * 24 * 3600 * 1000,
      progress: 0,
      status: 'planned'
    };
    onCreateTour(tour);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="max-w-xl w-full bg-slate-900 rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Planificateur de Tournée</h3>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3">
          <label className="text-sm text-white/60">Artiste</label>
          <select value={artistId} onChange={(e) => setArtistId(e.target.value)} className="w-full p-2 rounded bg-white/5">
            {signed.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>

          <label className="text-sm text-white/60">Destinations (séparées par des virgules)</label>
          <input value={destinationsText} onChange={(e) => setDestinationsText(e.target.value)} className="w-full p-2 rounded bg-white/5" />

          <label className="text-sm text-white/60">Nuits par ville</label>
          <input type="number" min={1} value={nightsPerCity} onChange={(e) => setNightsPerCity(Number(e.target.value))} className="w-24 p-2 rounded bg-white/5" />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-white/5 rounded">
              <div className="text-xs text-white/60">Coût estimé</div>
              <div className="text-lg font-bold">{estimateCost().toLocaleString()}€</div>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <div className="text-xs text-white/60">Revenu estimé</div>
              <div className="text-lg font-bold">{estimateRevenue().toLocaleString()}€</div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-white/5 rounded">Annuler</button>
            <button onClick={handleStart} className="px-4 py-2 bg-emerald-600 rounded text-white font-bold">Lancer la tournée</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanner;
