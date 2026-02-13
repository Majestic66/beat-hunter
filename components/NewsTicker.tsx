
import React from 'react';
import { Radio } from 'lucide-react';

interface NewsTickerProps {
  news: string;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  return (
    <div className="bg-violet-950/50 border-y border-violet-500/20 py-1 md:py-1.5 overflow-hidden flex items-center">
      <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 bg-violet-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-tighter z-10 whitespace-nowrap">
        <Radio className="w-2.5 h-2.5 md:w-3 md:h-3 animate-pulse" /> <span className="hidden sm:inline">LIVE </span>INDUSTRY NEWS
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap text-[10px] md:text-xs font-medium text-violet-200 py-1">
          {news || "Scannez les ondes mondiales pour découvrir les prochaines superstars..."} — {news || "Le marché du vinyle est en hausse de 12% cette semaine."} — {news || "Une nouvelle tendance TikTok booste le Reggaeton."}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
