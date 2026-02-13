
import React from 'react';
import { COUNTRIES } from '../constants';
import { MapPin } from 'lucide-react';

interface WorldMapProps {
  onCountryClick: (country: string) => void;
  selectedCountry: string | null;
}

const WorldMap: React.FC<WorldMapProps> = ({ onCountryClick, selectedCountry }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative w-full max-w-6xl aspect-[2/1] bg-slate-900/40 rounded-2xl md:rounded-[2rem] border border-white/5 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center w-full">
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-slate-300">SCANNER DE TALENTS MONDIAL</h2>
            <p className="text-xs md:text-base text-slate-500 mb-6 md:mb-12">Clique sur une zone pour déployer tes scouts</p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
                {COUNTRIES.map((country) => (
                    <button
                        key={country.id}
                        onClick={() => onCountryClick(country.name)}
                        className={`group relative flex flex-col items-center transition-all duration-300 transform hover:scale-110 active:scale-105 touch-manipulation ${
                            selectedCountry === country.name ? 'scale-110 md:scale-125' : ''
                        }`}
                    >
                        <div className={`p-3 md:p-4 rounded-full transition-all duration-500 min-w-[60px] min-h-[60px] md:min-w-0 md:min-h-0 flex items-center justify-center ${
                            selectedCountry === country.name 
                                ? 'bg-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)]' 
                                : 'bg-slate-800 hover:bg-slate-700 active:bg-slate-600'
                        }`}>
                            <MapPin className={`w-6 h-6 md:w-8 md:h-8 ${
                                selectedCountry === country.name ? 'text-white' : 'text-slate-500 group-hover:text-violet-400'
                            }`} />
                        </div>
                        <span className={`mt-2 md:mt-3 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors ${
                            selectedCountry === country.name ? 'text-violet-300' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                            {country.name}
                        </span>
                        
                        {selectedCountry === country.name && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none">
                              <div className="absolute inset-0 rounded-full border border-violet-500/30 animate-ping"></div>
                          </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
