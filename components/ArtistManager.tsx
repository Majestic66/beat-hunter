
import React, { useState, useEffect, useRef } from 'react';
import { Talent, GameState, Release } from '../types';
import { generateReleaseResult, generateCoverArt, getArtistChatResponse } from '../services/geminiService';
import ArtistStats from './ArtistStats';
import {
  Music, TrendingUp, DollarSign, Award, Loader2, Sparkles,
  ArrowLeft, Target, Share2, Rocket, MessageSquare, Users,
  Heart, History, Send, Percent, X, BarChart3
} from 'lucide-react';

interface ArtistManagerProps {
  artist: Talent;
  gameState: GameState;
  onBack: () => void;
  onUpdateState: (update: any) => void;
}

const ArtistManager: React.FC<ArtistManagerProps> = ({ artist, gameState, onBack, onUpdateState }) => {
  const [activeTab, setActiveTab] = useState<'studio' | 'chat' | 'history' | 'stats'>('stats');
  const [isReleasing, setIsReleasing] = useState(false);
  const [strategy, setStrategy] = useState("Virale (TikTok/Reels)");
  const [lastRelease, setLastRelease] = useState<Release | null>(null);
  const [releaseType, setReleaseType] = useState<'single' | 'album'>('single');
  const [albumTitle, setAlbumTitle] = useState('');
  const [trackCount, setTrackCount] = useState(8);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: `Yo boss ! Content de te voir. Qu'est-ce qu'on prépare aujourd'hui ?` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatContext, setChatContext] = useState<'chat' | 'renegotiate' | 'collab'>('chat');
  
  // Collaboration state
  const [showCollabSelector, setShowCollabSelector] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState<Talent | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatMessages, isTyping]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isTyping) return;
    const newMsgs = [...chatMessages, { role: 'user' as const, text: userInput }];
    setChatMessages(newMsgs);
    setUserInput("");
    setIsTyping(true);

    try {
      const res = await getArtistChatResponse(artist, newMsgs, chatContext, { 
        labelName: gameState.labelName,
        collabArtist: selectedCollab 
      });
      setChatMessages(prev => [...prev, { role: 'model' as const, text: res.reply }]);
      onUpdateState({ 
        type: 'RELATIONSHIP_CHANGE', 
        artistId: artist.id, 
        amount: res.relationshipChange 
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRelease = async () => {
    setIsReleasing(true);
    try {
      const collaborators = selectedCollab ? [selectedCollab] : [];
      const release = await generateReleaseResult(artist, strategy, collaborators);

      // If creating an album, adapt the release object accordingly
      if (releaseType === 'album') {
        const title = albumTitle.trim() || `${artist.name} - Album ${new Date().getFullYear()}`;
        const cover = await generateCoverArt(title, artist.genre);

        const albumRelease: Release = {
          ...release,
          songTitle: title,
          type: 'album',
          trackCount,
          cover,
          streams: 0,
          monthlyStreams: Math.floor(Math.random() * 1000000) + 100000,
          releaseDate: new Date().toISOString(),
          // initial revenue scaled for albums
          revenue: Math.round((release.revenue || 0) * trackCount * 0.8)
        };

        setLastRelease(albumRelease);
        onUpdateState({ type: 'NEW_RELEASE', artistId: artist.id, release: albumRelease });
        setSelectedCollab(null);
      } else {
        const cover = await generateCoverArt(release.songTitle, artist.genre);
        const finalRelease = { ...release, cover };

        setLastRelease(finalRelease);
        onUpdateState({ type: 'NEW_RELEASE', artistId: artist.id, release: finalRelease });
        setSelectedCollab(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsReleasing(false);
    }
  };

  const tabs = [
    { id: 'stats', label: 'Statistiques', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'studio', label: 'Studio', icon: <Music className="w-4 h-4" /> },
    { id: 'chat', label: 'Discuter', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'history', label: 'Discographie', icon: <History className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Header Profile */}
      <div className="p-4 md:p-8 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between glass shrink-0 gap-4">
        <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
          <button onClick={onBack} className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img src={artist.avatar} className="w-16 h-16 md:w-20 md:h-20 aspect-square rounded-xl md:rounded-2xl object-cover border-0 shadow-lg flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-3xl font-black italic tracking-tighter text-white truncate">{artist.name}</h1>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-[10px] md:text-xs font-bold text-violet-400 uppercase">{artist.genre}</span>
              <span className="text-slate-500 text-xs hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Heart className={`w-3 h-3 ${artist.relationship > 70 ? 'text-rose-500 fill-rose-500' : 'text-slate-500'}`} />
                <span className="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase whitespace-nowrap">{artist.relationship}% Loyauté</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl md:rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all whitespace-nowrap touch-manipulation flex-1 md:flex-none ${
                activeTab === t.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-white active:bg-white/5'
              }`}
            >
              {t.icon} <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {/* Stats View */}
        {activeTab === 'stats' && (
          <div className="p-4 md:p-6 h-full overflow-y-auto">
            <ArtistStats artist={artist} gameState={gameState} onUpdateState={onUpdateState} />
          </div>
        )}

        {/* Studio View */}
        {activeTab === 'studio' && (
          <div className="p-4 md:p-10 h-full overflow-y-auto space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-widest text-slate-200 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-violet-500" /> Préparer une sortie
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <label className={`px-3 py-2 rounded-2xl cursor-pointer ${releaseType === 'single' ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                        <input type="radio" name="releaseType" className="hidden" value="single" checked={releaseType === 'single'} onChange={() => setReleaseType('single')} />
                        Single
                      </label>
                      <label className={`px-3 py-2 rounded-2xl cursor-pointer ${releaseType === 'album' ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                        <input type="radio" name="releaseType" className="hidden" value="album" checked={releaseType === 'album'} onChange={() => setReleaseType('album')} />
                        Album
                      </label>
                    </div>

                    {releaseType === 'album' && (
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase">Titre de l'album</label>
                        <input value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} placeholder="Titre de l'album" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-white" />

                        <div className="flex items-center gap-3">
                          <label className="text-xs font-bold text-slate-500 uppercase">Nombre de titres</label>
                          <input type="number" min={4} max={30} value={trackCount} onChange={(e) => setTrackCount(Number(e.target.value))} className="w-20 px-3 py-2 rounded-2xl bg-white/5 border border-white/5 text-white" />
                        </div>
                      </div>
                    )}
                    <p className="text-xs font-bold text-slate-500 uppercase">Stratégie</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {["Virale (TikTok)", "Studio (Hi-Fi)", "Buzz de Rue", "Niche Artistique"].map(s => (
                        <button
                          key={s}
                          onClick={() => setStrategy(s)}
                          className={`p-3 md:p-4 rounded-xl md:rounded-2xl border text-left transition-all touch-manipulation min-h-[52px] ${
                            strategy === s ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 active:bg-white/10'
                          }`}
                        >
                          <span className="text-xs md:text-sm font-bold">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase">Collaboration</p>
                    {selectedCollab ? (
                      <div className="flex items-center justify-between bg-violet-600/20 border border-violet-500/30 p-4 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <img src={selectedCollab.avatar} className="w-8 h-8 aspect-square rounded-full object-cover" />
                          <span className="font-bold text-white">{selectedCollab.name}</span>
                        </div>
                        <button onClick={() => setSelectedCollab(null)} className="p-1 hover:bg-white/10 rounded-full">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowCollabSelector(true)}
                        className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:border-white/10 flex items-center justify-center gap-2 font-bold text-sm"
                      >
                        <Users className="w-4 h-4" /> Ajouter un invité du label
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={handleRelease}
                    disabled={isReleasing}
                    className="w-full py-4 md:py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl md:rounded-3xl text-white font-black text-base md:text-xl shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 touch-manipulation min-h-[56px]"
                  >
                    {isReleasing ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : <Music className="w-5 h-5 md:w-6 md:h-6" />}
                    {isReleasing ? "ENREGISTREMENT..." : "LANCER LE SINGLE"}
                  </button>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {lastRelease ? (
                  <div className="bg-slate-900 border-2 border-violet-500/30 p-4 md:p-8 rounded-2xl md:rounded-[3rem] animate-in zoom-in-95 duration-700 shadow-2xl">
                    <img src={lastRelease.cover} className="w-full aspect-square rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-2xl" />
                    <h2 className="text-2xl md:text-3xl font-black text-white italic break-words">"{lastRelease.songTitle}"</h2>
                    <p className="text-slate-400 mt-2 text-xs md:text-sm leading-relaxed">{lastRelease.impact}</p>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
                       <div className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl">
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Revenu</p>
                         <p className="text-lg md:text-xl font-bold text-emerald-400">+{lastRelease.revenue.toLocaleString()}€</p>
                       </div>
                       <div className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl">
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Buzz</p>
                         <p className="text-lg md:text-xl font-bold text-amber-400">{lastRelease.buzz}/100</p>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 md:h-full flex flex-col items-center justify-center text-slate-600 opacity-50 border-2 border-dashed border-white/5 rounded-2xl md:rounded-[3rem] p-4">
                    <Sparkles className="w-12 h-12 md:w-16 md:h-16 mb-4" />
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-center">En attente d'une sortie</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chat View */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col p-3 md:p-6 animate-in fade-in duration-300">
             <div className="flex gap-2 mb-4 md:mb-6 justify-center overflow-x-auto pb-2">
                {['chat', 'renegotiate', 'collab'].map((c: any) => (
                  <button
                    key={c}
                    onClick={() => setChatContext(c)}
                    className={`px-3 md:px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap touch-manipulation ${
                      chatContext === c ? 'bg-violet-600 border-violet-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 active:bg-white/10'
                    }`}
                  >
                    {c === 'chat' ? 'Discussion' : c === 'renegotiate' ? 'Contrat' : 'Collaboration'}
                  </button>
                ))}
             </div>
             
             <div
               ref={scrollRef}
               className="flex-1 overflow-y-auto space-y-4 md:space-y-6 px-2 md:px-10"
               style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' as any }}
             >
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] p-3 md:p-5 rounded-2xl md:rounded-3xl text-sm md:text-base ${
                      m.role === 'user' ? 'bg-violet-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-xs text-slate-500 animate-pulse italic">{artist.name} est en train d'écrire...</div>}
             </div>

             <div className="p-6 bg-slate-900/50 rounded-b-[3rem] mt-6">
                <div className="flex gap-4 max-w-4xl mx-auto">
                   <input 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tapez votre message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet-500"
                   />
                   <button onClick={handleSendMessage} className="p-4 bg-violet-600 rounded-2xl hover:bg-violet-500 transition-all">
                      <Send className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Discography View */}
        {activeTab === 'history' && (
          <div className="p-10 h-full overflow-y-auto animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artist.releaseHistory.length === 0 ? (
                  <p className="col-span-full text-center text-slate-600 py-20 font-bold uppercase">Aucune sortie enregistrée.</p>
                ) : (
                  artist.releaseHistory.map(r => (
                    <div key={r.id} className="glass p-6 rounded-3xl border border-white/5 flex gap-4 hover:border-white/10 transition-all">
                       <img src={r.cover} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                       <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate">"{r.songTitle}"</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <TrendingUp className="w-3 h-3 text-amber-500" />
                             <span className="text-[10px] font-bold text-slate-400">{r.buzz}/100 Buzz</span>
                          </div>
                          <p className="text-[10px] text-emerald-500 font-bold mt-2">+{r.revenue.toLocaleString()}€ gagnés</p>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        )}
      </div>

      {/* Collab Selector Modal */}
      {showCollabSelector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm">
          <div className="max-w-md w-full glass p-8 rounded-[3rem] border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white italic">CHOISIR UN PARTENAIRE</h2>
              <button onClick={() => setShowCollabSelector(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {gameState.signedArtists
                .filter(a => a.id !== artist.id)
                .map(a => (
                <button
                  key={a.id}
                  onClick={() => { setSelectedCollab(a); setShowCollabSelector(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                >
                  <img src={a.avatar} className="w-10 h-10 rounded-full" />
                  <div className="text-left">
                    <p className="font-bold text-white">{a.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{a.genre} • {a.popularity}% Pop.</p>
                  </div>
                </button>
              ))}
              {gameState.signedArtists.length <= 1 && <p className="text-center text-slate-500 text-sm italic">Vous avez besoin d'autres artistes dans votre label.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistManager;
