
import React from 'react';
import { GameState, Talent } from '../types';
import { DollarSign, Award, Users, Music, TrendingUp, Play } from 'lucide-react';

interface SidebarProps {
  gameState: GameState;
  onSelectArtist: (artist: Talent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ gameState, onSelectArtist }) => {
  return (
    <div className="w-80 h-full glass border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-violet-600 p-2 rounded-lg neon-border">
          <Music className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tighter">
            BEAT HUNTER PRO
          </h1>
          <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider mt-1">Créé par Roseval Design</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Budget Label</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">
            {gameState.budget.toLocaleString()}€
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Réputation</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">
            {gameState.reputation} <span className="text-sm font-normal text-slate-400">Pts</span>
          </p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Mon Roster ({gameState.signedArtists.length})</h2>
        </div>
        
        <div className="space-y-3">
          {gameState.signedArtists.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Aucun artiste signé. Explore la map pour scouter des talents !</p>
          ) : (
            gameState.signedArtists.map(artist => (
              <div 
                key={artist.id} 
                onClick={() => onSelectArtist(artist)}
                className="group relative flex items-center gap-3 p-2 rounded-lg hover:bg-violet-600/20 transition-all cursor-pointer border border-transparent hover:border-violet-500/30"
              >
                <img src={artist.avatar} alt={artist.name} className="w-10 h-10 aspect-square rounded-md object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-200">{artist.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase">{artist.genre} • {artist.potential}% Pot.</p>
                </div>
                <Play className="w-3 h-3 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          <span>Jour {gameState.day}</span>
          <span className="text-violet-400 cursor-pointer hover:underline">Configuration</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
