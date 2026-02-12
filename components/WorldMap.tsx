
import React from 'react';
import { COUNTRIES } from '../constants';
import { MapPin } from 'lucide-react';

interface WorldMapProps {
  onCountryClick: (country: string) => void;
  selectedCountry: string | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountryClick, selectedCountry }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative w-full max-w-6xl aspect-[2/1] bg-slate-900/40 rounded-[2rem] border border-white/5 p-4 flex items-center justify-center">
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-slate-300">SCANNER DE TALENTS MONDIAL</h2>
            <p className="text-slate-500 mb-12">Clique sur une zone pour déployer tes scouts</p>
            
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
                {COUNTRIES.map((country) => (
                    <button
                        key={country.id}
                        onClick={() => onCountryClick(country.name)}
                        className={`group relative flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
                            selectedCountry === country.name ? 'scale-125' : ''
                        }`}
                    >
                        <div className={`p-4 rounded-full transition-all duration-500 ${
                            selectedCountry === country.name 
                                ? 'bg-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)]' 
                                : 'bg-slate-800 hover:bg-slate-700'
                        }`}>
                            <MapPin className={`w-8 h-8 ${
                                selectedCountry === country.name ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'
                            }`} />
                        </div>
                        <span className={`mt-3 font-bold text-xs uppercase tracking-widest transition-colors ${
                            selectedCountry === country.name ? 'text-violet-300' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                            {country.name}
                        </span>
                        
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none">
                            <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping"></div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass px-8 py-3 rounded-full border border-white/10 flex items-center gap-12 text-sm font-medium">
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-400">Satellites Actifs</span>
          </div>
          <div className="flex items-center gap-2">
              <span className="text-slate-500">Latence Réseau :</span>
              <span className="text-violet-400">14ms</span>
          </div>
          <div className="flex items-center gap-2">
              <span className="text-slate-500">Tendance Marché :</span>
              <span className="text-emerald-400 font-bold uppercase">Favorable</span>
          </div>
      </div>
    </div>
  );
};

export default WorldMap;
