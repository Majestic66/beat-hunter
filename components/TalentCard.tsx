
import React from 'react';
import { Talent } from '../types';
import { Star, Zap, MessageSquare } from 'lucide-react';

interface TalentCardProps {
  talent: Talent;
  onNegotiate: (talent: Talent) => void;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent, onNegotiate }) => {
  return (
    <div className="glass rounded-2xl md:rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="relative h-56 md:h-72 overflow-hidden">
        {/* Blurred background fills the card so there are no side gaps */}
        <img src={talent.avatar} alt={`bg-${talent.name}`} className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105" />

        {/* Foreground image centered and fully visible (no cropping) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={talent.avatar} alt={talent.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Small translucent name panel to avoid covering the image */}
        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
          <div className="bg-black/40 backdrop-blur-sm px-2.5 md:px-3 py-1.5 md:py-2 rounded-md">
            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{talent.name}</h3>
            <p className="text-[10px] md:text-xs text-white/70 font-semibold uppercase tracking-wider mt-0.5">{talent.genre} • {talent.age} ANS</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-3 md:space-y-4 flex-1">
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed italic line-clamp-2">"{talent.bio}"</p>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white/5 p-2.5 md:p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] uppercase font-bold text-slate-500">Potentiel</span>
            </div>
            <p className="text-base md:text-lg font-bold text-slate-200">{talent.potential}%</p>
          </div>
          <div className="bg-white/5 p-2.5 md:p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] uppercase font-bold text-slate-500">Charisme</span>
            </div>
            <p className="text-base md:text-lg font-bold text-slate-200">{talent.charisma}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] md:text-[10px] py-2 px-2.5 md:px-3 bg-violet-500/10 rounded-lg border border-violet-500/20 uppercase font-bold tracking-tighter">
            <span className="text-violet-300 truncate flex-1">Personnalité : {talent.personality}</span>
            <div className="flex gap-1 flex-shrink-0 ml-2">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${talent.fame > 40 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${talent.fame > 20 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500`}></div>
            </div>
        </div>
      </div>

      <button 
        onClick={() => onNegotiate(talent)}
        className="w-full py-4 md:py-4 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-bold flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest touch-manipulation min-h-[56px]"
      >
        <MessageSquare className="w-4 h-4" />
        NÉGOCIER LE CONTRAT
      </button>
    </div>
  );
};

export default TalentCard;
