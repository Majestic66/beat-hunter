
import React, { useState, useEffect, useRef } from 'react';
import { Talent, GameState } from '../types';
import { getNegotiationResponse } from '../services/geminiService';
import { X, Send, DollarSign, Percent, CheckCircle, AlertCircle } from 'lucide-react';

interface NegotiationModalProps {
  talent: Talent;
  gameState: GameState;
  onClose: () => void;
  onSuccess: (advance: number, royalty: number) => void;
}

const NegotiationModal: React.FC<NegotiationModalProps> = ({ talent, gameState, onClose, onSuccess }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: `Salut, je suis ${talent.name}. Mon manager m'a dit que tu cherchais du sang neuf. C'est quoi ta proposition ?` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [offerAdvance, setOfferAdvance] = useState(talent.requestedAdvance);
  const [offerRoyalty, setOfferRoyalty] = useState(talent.requestedRoyalty);
  const [isTyping, setIsTyping] = useState(false);
  const [dealStatus, setDealStatus] = useState<'negotiating' | 'accepted' | 'rejected'>('negotiating');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isTyping || dealStatus !== 'negotiating') return;

    const newMessages = [...messages, { role: 'user' as const, text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await getNegotiationResponse(talent, offerAdvance, offerRoyalty, newMessages);
      
      setMessages(prev => [...prev, { role: 'model' as const, text: response.reply }]);
      
      if (response.accepted) {
        setDealStatus('accepted');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model' as const, text: "Désolé, j'ai besoin d'un moment pour réfléchir. Reparlons plus tard." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSignContract = () => {
    onSuccess(offerAdvance, offerRoyalty);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[85vh] glass rounded-[2.5rem] border border-white/10 overflow-hidden flex shadow-2xl">
        
        <div className="flex-1 flex flex-col bg-slate-900/30">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
            <div className="flex items-center gap-4">
              <img src={talent.avatar} className="w-12 h-12 rounded-full border-2 border-violet-500" />
              <div>
                <h3 className="font-bold text-lg text-white">{talent.name}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Négociation en direct</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-violet-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            {dealStatus === 'accepted' && (
              <div className="flex justify-center py-8">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-3xl flex flex-col items-center gap-4 text-center max-w-sm animate-in fade-in zoom-in duration-500">
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                  <div>
                    <h4 className="text-lg font-bold text-emerald-400 uppercase tracking-widest">Accord trouvé !</h4>
                    <p className="text-sm text-slate-300">L'artiste est prêt à signer. Confirme le contrat pour finaliser.</p>
                  </div>
                  <button 
                    onClick={handleSignContract}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20"
                  >
                    SIGNER LE CONTRAT
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-slate-900/50">
            <div className="flex gap-4">
              <input 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={dealStatus === 'negotiating' ? "Discute avec l'artiste..." : "Négociation terminée"}
                disabled={dealStatus !== 'negotiating' || isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50"
              />
              <button 
                onClick={handleSendMessage}
                disabled={dealStatus !== 'negotiating' || isTyping || !userInput.trim()}
                className="bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 p-4 rounded-2xl text-white transition-all transform active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-80 bg-slate-900 border-l border-white/10 p-8 flex flex-col gap-8">
          <h2 className="text-xl font-bold text-white tracking-tight uppercase">Termes du Contrat</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> Avance (€)
                </span>
                <span className="text-sm font-bold text-violet-400">{offerAdvance.toLocaleString()}€</span>
              </div>
              <input 
                type="range"
                min="0"
                max={gameState.budget}
                step="5000"
                value={offerAdvance}
                onChange={(e) => setOfferAdvance(Number(e.target.value))}
                disabled={dealStatus !== 'negotiating'}
                className="w-full accent-violet-600 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Royalties (%)
                </span>
                <span className="text-sm font-bold text-violet-400">{offerRoyalty}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="50"
                step="1"
                value={offerRoyalty}
                onChange={(e) => setOfferRoyalty(Number(e.target.value))}
                disabled={dealStatus !== 'negotiating'}
                className="w-full accent-violet-600 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-slate-400 mt-1" />
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                Une offre généreuse facilite l'accord mais réduit tes profits à long terme.
              </p>
            </div>
            
            <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                    <span>Attentes Artiste</span>
                    <span className="text-slate-300">{talent.requestedAdvance.toLocaleString()}€ / {talent.requestedRoyalty}%</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationModal;
