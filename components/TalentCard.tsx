
import React from 'react';
import { Talent } from '../types';
import { Star, Zap, MessageSquare } from 'lucide-react';

interface TalentCardProps {
  talent: Talent;
  onNegotiate: (talent: Talent) => void;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent, onNegotiate }) => {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/10 group hover:border-violet-500/50 transition-all duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img src={talent.avatar} alt={talent.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{talent.name}</h3>
          <p className="text-xs text-violet-300 font-semibold uppercase tracking-wider">{talent.genre} • {talent.age} ANS</p>
        </div>
      </div>

      <div className="p-5 space-y-4 flex-1">
        <p className="text-sm text-slate-400 leading-relaxed italic">"{talent.bio}"</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] uppercase font-bold text-slate-500">Potentiel</span>
            </div>
            <p className="text-lg font-bold text-slate-200">{talent.potential}%</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] uppercase font-bold text-slate-500">Charisme</span>
            </div>
            <p className="text-lg font-bold text-slate-200">{talent.charisma}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] py-2 px-3 bg-violet-500/10 rounded-lg border border-violet-500/20 uppercase font-bold tracking-tighter">
            <span className="text-violet-300">Personnalité : {talent.personality}</span>
            <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full ${talent.fame > 40 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-2 h-2 rounded-full ${talent.fame > 20 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-2 h-2 rounded-full bg-emerald-500`}></div>
            </div>
        </div>
      </div>

      <button 
        onClick={() => onNegotiate(talent)}
        className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
      >
        <MessageSquare className="w-4 h-4" />
        NÉGOCIER LE CONTRAT
      </button>
    </div>
  );
};

export default TalentCard;
