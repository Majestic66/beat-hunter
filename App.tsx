
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WorldMap from './components/WorldMap';
import TalentCard from './components/TalentCard';
import NegotiationModal from './components/NegotiationModal';
import ArtistManager from './components/ArtistManager';
import NewsTicker from './components/NewsTicker';
import EventManager from './components/EventManager';
import EquipmentShop from './components/EquipmentShop';
import SkillTree from './components/SkillTree';
import MiniGame from './components/MiniGame';
import RivalrySystem from './components/RivalrySystem';
import QuestSystem from './components/QuestSystem';
import WeatherSystem from './components/WeatherSystem';
import SaveLoadSystem from './components/SaveLoadSystem';
import StatisticsSystem from './components/StatisticsSystem';
import CareerMode from './components/CareerMode';
import TourPlanner from './components/TourPlanner';
import { GameState, Talent, Release, GameEvent, Equipment, Achievement, Skill, SkillType, RivalLabel, Quest, WeatherEffect, CareerMilestone, MiniGameResult, Contract } from './types';
import { generateTalentsForCountry, generateGlobalNews, generateRandomEvent, generateCollaboration, generateSpecialization, generateExtendedChatResponse, updateAllSACEMRevenues, ageArtists, calculateSACEMRevenue } from './services/geminiService';
import { INITIAL_BUDGET, INITIAL_REPUTATION, ACHIEVEMENTS, MARKET_TRENDS } from './constants';
import { Loader2, Music, Building2, Calendar, ShoppingBag, Zap, Gamepad2, Crown, Scroll, Cloud, Save, BarChart3, Trophy, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    labelName: "EMPIRE RECORDS",
    budget: INITIAL_BUDGET,
    reputation: INITIAL_REPUTATION,
    day: 1,
    signedArtists: [],
    notifications: ['Bienvenue, Producteur ! Scanne le monde pour trouver ta première pépite.'],
    news: "",
    equipment: [],
    achievements: ACHIEVEMENTS.map(a => ({ ...a })),
    activeEvents: [],
    completedEvents: [],
    gameMode: 'single',
    marketTrends: { ...MARKET_TRENDS },
    worldTour: {
      active: false,
      destinations: [],
      progress: 0
    },
    // Nouveaux systèmes
    talents: [],
    rivalLabels: [
      {
        id: 'rival_1',
        name: 'STARLIGHT ENTERTAINMENT',
        specialty: 'Pop' as any,
        country: 'USA',
        popularity: 75,
        revenue: 5000000,
        talents: [],
        rivalryLevel: 0
      },
      {
        id: 'rival_2',
        name: 'UNDERGROUND BEATS',
        specialty: 'HipHop' as any,
        country: 'France',
        popularity: 60,
        revenue: 3000000,
        talents: [],
        rivalryLevel: 0
      },
      {
        id: 'rival_3',
        name: 'ELECTRIC SOUNDS',
        specialty: 'Electro' as any,
        country: 'Germany',
        popularity: 55,
        revenue: 2500000,
        talents: [],
        rivalryLevel: 0
      }
    ],
    quests: [
      {
        id: 'first_hit',
        title: 'Premier Hit',
        description: 'Faites en sorte qu\'un artiste atteigne 50 000 fans',
        objectives: ['Atteindre 50 000 fans avec un artiste'],
        rewards: ['50000€', 'Badge "Découvreur de Talents"'],
        accepted: false,
        completed: false,
        type: 'achievement',
        difficulty: 'easy'
      },
      {
        id: 'millionaire',
        title: 'Premier Million',
        description: 'Atteignez 1 million d\'euros de revenus totaux',
        objectives: ['Gagner 1 000 000€ au total'],
        rewards: ['100000€ bonus', 'Badge "Magnat"'],
        accepted: false,
        completed: false,
        type: 'achievement',
        difficulty: 'medium'
      }
    ],
    weather: {
      type: 'sunny',
      name: 'Ensoleillé',
      description: 'Temps parfait pour les événements',
      icon: null,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      effects: {
        eventBonus: 1.2,
        performanceBonus: 1.1,
        moodBonus: 0.1,
        riskReduction: 0.8
      }
    },
    completedCollaborations: 0,
    totalEarnings: 0,
    fans: 0,
    experience: 0
  });

  const [scoutingResults, setScoutingResults] = useState<Partial<Talent>[]>([]);
  const [isScouting, setIsScouting] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [activeNegotiation, setActiveNegotiation] = useState<Partial<Talent> | null>(null);
  const [managedArtistId, setManagedArtistId] = useState<string | null>(null);
  const [showLabelSetup, setShowLabelSetup] = useState(true);
  const [showEventManager, setShowEventManager] = useState(false);
  const [showEquipmentShop, setShowEquipmentShop] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);
  const [selectedArtistForSkills, setSelectedArtistForSkills] = useState<Talent | null>(null);
  // Nouveaux états pour les composants
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedArtistForGame, setSelectedArtistForGame] = useState<Talent | null>(null);
  const [showRivalrySystem, setShowRivalrySystem] = useState(false);
  const [showQuestSystem, setShowQuestSystem] = useState(false);
  const [showWeatherSystem, setShowWeatherSystem] = useState(false);
  const [showSaveLoadSystem, setShowSaveLoadSystem] = useState(false);
  const [showStatisticsSystem, setShowStatisticsSystem] = useState(false);
  const [showCareerMode, setShowCareerMode] = useState(false);
  const [showTourPlanner, setShowTourPlanner] = useState(false);

  const handleUpdateState = (update: any) => {
    setGameState(prev => {
      let newState = { ...prev };
      switch(update.type) {
        case 'NEW_RELEASE': {
          const { artistId, release } = update;
          // Apply recoupment logic: label receives release revenue but a portion may be used to recoup the artist advance
          newState.reputation += release.reputationGain || 5;
          newState.signedArtists = newState.signedArtists.map(a => {
            if (a.id === artistId) {
              const contract = a.currentContract;
              let recoupedFromThisRelease = 0;
              if (contract && (contract.advance || 0) > 0) {
                const recoupmentRate = contract.recoupmentRate ?? 1;
                const already = contract.recoupedAmount ?? 0;
                const remaining = Math.max(0, (contract.advance || 0) - already);
                if (remaining > 0) {
                  const recoupable = (release.revenue || 0) * (recoupmentRate);
                  const amountToRecoup = Math.min(recoupable, remaining);
                  recoupedFromThisRelease = amountToRecoup;
                  // update contract's recoupedAmount
                  contract.recoupedAmount = (contract.recoupedAmount || 0) + amountToRecoup;
                  // record recoup history
                  contract.recoupHistory = contract.recoupHistory || [];
                  contract.recoupHistory.unshift({ releaseId: release.id, amount: amountToRecoup, date: Date.now() });
                }
              }

              // Budget increases by revenue minus the amount taken to recoup the advance
              newState.budget += (release.revenue || 0) - recoupedFromThisRelease;

              const updatedArtist = {
                ...a,
                totalRevenue: (a.totalRevenue || 0) + (release.revenue || 0),
                popularity: Math.min(100, (a.popularity || 0) + (release.buzz / 12)),
                releaseHistory: [release, ...a.releaseHistory],
                relationship: Math.min(100, a.relationship + (release.buzz > 40 ? 4 : -6)),
                experience: a.experience + 50,
                mood: Math.min(100, a.mood + 10),
                energy: Math.max(0, a.energy - 20),
                currentContract: contract
              };

              // If recoup complete, notify
              if (contract && (contract.recoupedAmount || 0) >= (contract.advance || 0) && (contract.advance || 0) > 0) {
                newState.notifications = [...newState.notifications, `${updatedArtist.name} : avance entièrement recouvrée`].slice(-5);
              }

              return updatedArtist;
            }
            if (release.collaborators?.includes(a.id)) {
              // collaborators get a share, no recoup against their contracts here
              return {
                ...a,
                totalRevenue: (a.totalRevenue || 0) + (release.revenue * 0.2),
                popularity: Math.min(100, (a.popularity || 0) + (release.buzz / 18)),
                relationship: Math.min(100, a.relationship + 3)
              };
            }
            return a;
          });
          newState.notifications = [...newState.notifications, `Succès ! ${release.songTitle} rapporte ${release.revenue}€`].slice(-5);
          break;
        }
        case 'RELATIONSHIP_CHANGE': {
          newState.signedArtists = newState.signedArtists.map(a => 
            a.id === update.artistId ? { ...a, relationship: Math.max(0, Math.min(100, a.relationship + update.amount)) } : a
          );
          break;
        }
        case 'RENEGOTIATE_CONTRACT': {
          newState.signedArtists = newState.signedArtists.map(a => 
            a.id === update.artistId ? { ...a, currentContract: { ...a.currentContract, royalty: update.newRoyalty } } : a
          );
          newState.notifications = [...newState.notifications, `Contrat renégocié pour ${update.artistName}`].slice(-5);
          break;
        }
        default: break;
      }
      return newState;
    });
  };

  const handleCountryClick = async (countryName: string) => {
    if (isScouting) return;
    setSelectedCountry(countryName);
    setIsScouting(true);
    setScoutingResults([]);
    try {
      const talents = await generateTalentsForCountry(countryName);
      // Remove duplicates: artists already signed or repeated in the result
      const existingIds = new Set(gameState.signedArtists.map(a => a.id));
      const seen = new Set<string>();
      const unique = talents.filter(t => {
        if (!t.id) return false;
        if (existingIds.has(t.id)) return false; // already signed
        if (seen.has(t.id)) return false; // duplicate in this batch
        seen.add(t.id);
        return true;
      });
      setScoutingResults(unique);
    } catch (error) {
      setGameState(prev => ({ ...prev, notifications: [...prev.notifications, "Erreur quota API. Réessayez bientôt."] }));
    } finally {
      setIsScouting(false);
    }
  };

  const finalizeContract = (contract: Contract) => {
    if (!activeNegotiation) return;
    const newArtist: Talent = {
      ...activeNegotiation as Talent,
      level: 1,
      experience: 0,
      skills: [
        { type: SkillType.Production, level: 1, experience: 0 },
        { type: SkillType.Songwriting, level: 1, experience: 0 },
        { type: SkillType.Performance, level: 1, experience: 0 },
        { type: SkillType.Marketing, level: 1, experience: 0 },
        { type: SkillType.Networking, level: 1, experience: 0 },
        { type: SkillType.Innovation, level: 1, experience: 0 }
      ],
      mood: 80,
      energy: 100,
      achievements: [],
      collaborations: [],
      relationship: 60,
      releaseHistory: [],
      currentContract: {
        artistId: contract.artistId,
        advance: contract.advance,
        royalty: contract.royalty,
        duration: contract.duration ?? 24,
        status: contract.status || 'active',
        recoupmentRate: contract.recoupmentRate ?? 1,
        exclusivity: contract.exclusivity ?? true,
        optionPeriods: contract.optionPeriods ?? 0,
        buyout: contract.buyout ?? 0,
        recoupedAmount: 0
      }
    };
    setGameState(prev => ({
      ...prev,
      budget: prev.budget - contract.advance,
      reputation: prev.reputation + 5,
      signedArtists: [...prev.signedArtists, newArtist],
      notifications: [...prev.notifications, `${newArtist.name} a signé !`].slice(-5)
    }));
    setActiveNegotiation(null);
    setScoutingResults(prev => prev.filter(t => t.id !== activeNegotiation.id));
  };

  // Gestion des événements
  const handleEventAction = async (eventId: string, action: 'join' | 'decline') => {
    if (action === 'decline') {
      setGameState(prev => ({
        ...prev,
        activeEvents: prev.activeEvents.filter(e => e.id !== eventId)
      }));
      return;
    }

    const event = gameState.activeEvents.find(e => e.id === eventId);
    if (!event) return;

    // Participer à l'événement
    setGameState(prev => {
      const newState = { ...prev };
      if (event.rewards.budget) newState.budget += event.rewards.budget;
      if (event.rewards.reputation) newState.reputation += event.rewards.reputation;

      // Distribuer l'XP aux artistes participants
      if (event.rewards.experience) {
        newState.signedArtists = newState.signedArtists.map(artist => {
          if (event.participants.includes(artist.id)) {
            return { ...artist, experience: artist.experience + event.rewards.experience! };
          }
          return artist;
        });
      }

      newState.activeEvents = newState.activeEvents.filter(e => e.id !== eventId);
      newState.completedEvents.push(eventId);
      newState.notifications = [...newState.notifications, `Événement "${event.title}" terminé avec succès !`].slice(-5);

      return newState;
    });
  };

  // Achat d'équipement
  const handlePurchaseEquipment = (equipment: Equipment) => {
    setGameState(prev => ({
      ...prev,
      budget: prev.budget - equipment.cost,
      equipment: [...prev.equipment, equipment],
      notifications: [...prev.notifications, `Équipement "${equipment.name}" acheté !`].slice(-5)
    }));
  };

  // Amélioration de compétence
  const handleSkillUpgrade = async (skillType: SkillType) => {
    if (!selectedArtistForSkills) return;

    const skill = selectedArtistForSkills.skills.find(s => s.type === skillType);
    if (!skill || skill.level >= 10) return;

    const cost = skill.level * 10000 + 5000;
    if (selectedArtistForSkills.experience < cost) return;

    setGameState(prev => ({
      ...prev,
      signedArtists: prev.signedArtists.map(artist => {
        if (artist.id === selectedArtistForSkills.id) {
          const updatedSkills = artist.skills.map(s =>
            s.type === skillType
              ? { ...s, level: s.level + 1, experience: 0 }
              : s
          );
          return {
            ...artist,
            skills: updatedSkills,
            experience: artist.experience - cost
          };
        }
        return artist;
      })
    }));
  };

  // Gestionnaire pour les mini-jeux
  const handleMiniGameComplete = (result: MiniGameResult) => {
    if (!selectedArtistForGame) return;

    setGameState(prev => ({
      ...prev,
      budget: prev.budget + result.reward,
      signedArtists: prev.signedArtists.map(artist =>
        artist.id === selectedArtistForGame.id
          ? { ...artist, experience: artist.experience + result.experience }
          : artist
      ),
      notifications: [...prev.notifications, `Mini-jeu terminé ! +${result.reward}€ et +${result.experience} XP`].slice(-5)
    }));
    setShowMiniGame(false);
    setSelectedArtistForGame(null);
  };

  // Gestionnaire pour les actions de rivalité
  const handleRivalryAction = (action: string, rivalId: string) => {
    const rival = gameState.rivalLabels.find(r => r.id === rivalId);
    if (!rival) return;

    let cost = 0;
    let successChance = 0.5;

    switch (action) {
      case 'sabotage':
        cost = 50000;
        successChance = 0.4;
        break;
      case 'poach':
        cost = 100000;
        successChance = 0.3;
        break;
      case 'marketing':
        cost = 75000;
        successChance = 0.6;
        break;
      case 'alliance':
        cost = 25000;
        successChance = 0.8;
        break;
    }

    if (gameState.budget < cost) return;

    const success = Math.random() < successChance;

    setGameState(prev => ({
      ...prev,
      budget: prev.budget - cost,
      rivalLabels: prev.rivalLabels.map(r =>
        r.id === rivalId
          ? {
              ...r,
              rivalryLevel: success ? Math.min(100, r.rivalryLevel + 10) : Math.max(0, r.rivalryLevel - 5)
            }
          : r
      ),
      notifications: [...prev.notifications,
        success
          ? `Action de rivalité réussie contre ${rival.name} !`
          : `Action de rivalité échouée contre ${rival.name}...`
      ].slice(-5)
    }));
  };

  // Gestionnaire pour l'acceptation de quête
  const handleQuestAccept = (questId: string) => {
    setGameState(prev => ({
      ...prev,
      quests: prev.quests.map(quest =>
        quest.id === questId ? { ...quest, accepted: true } : quest
      )
    }));
  };

  // Gestionnaire pour la complétion de quête
  const handleQuestComplete = (questId: string) => {
    setGameState(prev => ({
      ...prev,
      quests: prev.quests.map(quest =>
        quest.id === questId ? { ...quest, completed: true } : quest
      ),
      budget: prev.budget + 50000, // Récompense exemple
      notifications: [...prev.notifications, 'Quête complétée ! Récompenses reçues.'].slice(-5)
    }));
  };

  // Gestionnaire pour le changement de météo
  const handleWeatherChange = (newWeather: WeatherEffect) => {
    setGameState(prev => ({
      ...prev,
      weather: newWeather
    }));
  };

  // Gestionnaire pour le chargement de sauvegarde
  const handleLoadGame = (saveData: GameState) => {
    setGameState(saveData);
    setShowSaveLoadSystem(false);
  };

  // Gestionnaire pour la complétion de jalon de carrière
  const handleMilestoneComplete = (milestoneId: string) => {
    setGameState(prev => ({
      ...prev,
      budget: prev.budget + 100000, // Récompense exemple
      reputation: prev.reputation + 10,
      notifications: [...prev.notifications, 'Jalon de carrière complété ! Félicitations !'].slice(-5)
    }));
  };

  // Générer un événement aléatoire
  const generateNewEvent = async () => {
    try {
      const newEvent = await generateRandomEvent();
      setGameState(prev => ({
        ...prev,
        activeEvents: [...prev.activeEvents, newEvent].slice(-5), // Max 5 événements actifs
        notifications: [...prev.notifications, `Nouvel événement disponible : ${newEvent.title}`].slice(-5)
      }));
    } catch (error) {
      console.error('Erreur génération événement:', error);
    }
  };

  useEffect(() => {
    // Générer un événement toutes les 10 minutes
    const eventTimer = setInterval(generateNewEvent, 600000);
    return () => clearInterval(eventTimer);
  }, []);

  useEffect(() => {
    // Augmentation à 5 minutes (300000ms) pour préserver le quota
    const timer = setInterval(async () => {
      const newNews = await generateGlobalNews();
      setGameState(prev => ({ ...prev, day: prev.day + 1, news: newNews }));
    }, 300000);
    return () => clearInterval(timer);
  }, []);

  // Mise à jour périodique des revenus SACEM et vieillissement des artistes
  useEffect(() => {
    const monthlyTimer = setInterval(() => {
      setGameState(prev => {
        // Mettre à jour les revenus SACEM
        const updatedArtistsWithSACEM = updateAllSACEMRevenues(prev.signedArtists);

        // Calculer les revenus SACEM totaux du mois
        const totalMonthlySACEM = updatedArtistsWithSACEM.reduce((total, artist) => {
          return total + artist.releaseHistory.reduce((artistTotal, release) => {
            const monthlySACEM = calculateSACEMRevenue(release, artist.popularity || 0);
            return artistTotal + monthlySACEM;
          }, 0);
        }, 0);

        // Faire vieillir les artistes (tous les 30 jours simulés)
        const shouldAgeArtists = prev.day % 30 === 0;
        const agedArtists = shouldAgeArtists ? ageArtists(updatedArtistsWithSACEM) : updatedArtistsWithSACEM;

        // Retirer les artistes retraités
        const activeArtists = agedArtists.filter(artist => !artist.retired);
        const retiredArtists = agedArtists.filter(artist => artist.retired);

        let notifications = [...prev.notifications];
        if (totalMonthlySACEM > 0) {
          notifications.push(`Revenus SACEM du mois : +${totalMonthlySACEM.toLocaleString()}€`);
        }
        if (retiredArtists.length > 0) {
          retiredArtists.forEach(artist => {
            notifications.push(`${artist.name} a pris sa retraite.`);
          });
        }

        return {
          ...prev,
          signedArtists: activeArtists,
          budget: prev.budget + totalMonthlySACEM,
          notifications: notifications.slice(-5)
        };
      });
    }, 300000); // Toutes les 5 minutes = 1 mois simulé

    return () => clearInterval(monthlyTimer);
  }, []);

  if (showLabelSetup) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-10 rounded-[3rem] border border-white/10 space-y-8 relative shadow-2xl">
          <div className="text-center space-y-2">
            <Building2 className="w-16 h-16 text-violet-500 mx-auto mb-4" />
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Fonde ton label</h1>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Créé par Roseval Design</span>
          </div>
          <div className="space-y-4">
            <input 
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:border-violet-500 font-bold text-white text-center uppercase"
              value={gameState.labelName}
              onChange={(e) => setGameState(prev => ({ ...prev, labelName: e.target.value.toUpperCase() }))}
              placeholder="NOM DU LABEL"
            />
            <button 
              onClick={() => setShowLabelSetup(false)}
              className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-violet-600/30"
            >
              LANCER LA CARRIÈRE
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentManagedArtist = gameState.signedArtists.find(a => a.id === managedArtistId);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          gameState={gameState} 
          onSelectArtist={(artist) => setManagedArtistId(artist.id)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {showSidebarMobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSidebarMobile(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-full">
            <Sidebar gameState={gameState} onSelectArtist={(artist) => { setManagedArtistId(artist.id); setShowSidebarMobile(false); }} />
          </div>
        </div>
      )}

      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        <div className="min-h-16 px-3 md:px-8 py-3 border-b border-white/10 flex flex-wrap items-center justify-between glass z-10 shrink-0 gap-3">
          <div className="flex items-center gap-2 md:gap-6 flex-1 min-w-0">
            {/* Mobile menu button */}
            <button onClick={() => setShowSidebarMobile(true)} className="md:hidden p-3 bg-white/5 rounded-lg hover:bg-white/10 active:scale-95 transition-all touch-manipulation">
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] md:text-xs font-black text-violet-500 uppercase tracking-widest truncate">{gameState.labelName}</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase">Connecté</span>
              </div>
            </div>
            {selectedCountry && (
                <div className="hidden sm:block text-sm bg-white/5 px-3 md:px-4 py-1.5 rounded-full border border-white/5 uppercase font-bold text-[10px] text-slate-300">
                    <span className="text-slate-500 mr-2">Localisation :</span> {selectedCountry}
                </div>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
             <div className="px-3 py-1 bg-violet-600 rounded-lg text-[10px] font-black uppercase">Jour {gameState.day}</div>
             <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg">Budget: {gameState.budget.toLocaleString()}€</div>
             <div className="hidden sm:flex gap-2">
               <button
                 onClick={() => setShowEventManager(true)}
                 className="p-2.5 md:p-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                 title="Événements & Achievements"
               >
                 <Calendar className="w-5 h-5 md:w-4 md:h-4" />
               </button>
               <button
                 onClick={() => setShowEquipmentShop(true)}
                 className="p-2.5 md:p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                 title="Boutique d'Équipement"
               >
                 <ShoppingBag className="w-5 h-5 md:w-4 md:h-4" />
               </button>
               {gameState.signedArtists.length > 0 && (
                 <button
                   onClick={() => {
                     setSelectedArtistForSkills(gameState.signedArtists[0]);
                     setShowSkillTree(true);
                   }}
                   className="p-2.5 md:p-2 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                   title="Arbre de Compétences"
                 >
                   <Zap className="w-5 h-5 md:w-4 md:h-4" />
                 </button>
               )}
               {/* Nouveaux boutons pour les systèmes avancés */}
               {gameState.signedArtists.length > 0 && (
                 <button
                   onClick={() => {
                     setSelectedArtistForGame(gameState.signedArtists[0]);
                     setShowMiniGame(true);
                   }}
                   className="p-2.5 md:p-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                   title="Mini-Jeux"
                 >
                   <Gamepad2 className="w-5 h-5 md:w-4 md:h-4" />
                 </button>
               )}
               <button
                 onClick={() => setShowRivalrySystem(true)}
                 className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                 title="Système de Rivalité"
               >
                 <Crown className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setShowQuestSystem(true)}
                 className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                 title="Système de Quêtes"
               >
                 <Scroll className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setShowWeatherSystem(true)}
                 className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                 title="Météo"
               >
                 <Cloud className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setShowSaveLoadSystem(true)}
                 className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                 title="Sauvegarde/Chargement"
               >
                 <Save className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setShowStatisticsSystem(true)}
                 className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                 title="Statistiques"
               >
                 <BarChart3 className="w-4 h-4" />
               </button>
               <button
                 onClick={() => setShowCareerMode(true)}
                 className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                 title="Mode Carrière"
               >
                 <Trophy className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        <NewsTicker news={gameState.news} />

        <div className="flex-1 relative overflow-hidden">
          {managedArtistId && currentManagedArtist ? (
              <ArtistManager 
                artist={currentManagedArtist} 
                gameState={gameState}
                onBack={() => setManagedArtistId(null)} 
                onUpdateState={handleUpdateState}
              />
          ) : scoutingResults.length === 0 && !isScouting ? (
            <div className="h-full overflow-y-auto">
               <WorldMap onCountryClick={handleCountryClick} selectedCountry={selectedCountry} />
            </div>
          ) : (
            <div className="p-4 md:p-10 h-full overflow-y-auto">
              <div className="max-w-6xl mx-auto space-y-6 md:space-y-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white italic uppercase">Talents détectés</h2>
                  <button onClick={() => {setScoutingResults([]); setSelectedCountry(null);}} className="px-6 md:px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-slate-300 hover:bg-white/10 active:scale-95 transition-all touch-manipulation">Quitter le scanner</button>
                </div>

                {isScouting ? (
                  <div className="h-[50vh] flex flex-col items-center justify-center gap-8">
                    <Loader2 className="w-12 md:w-16 h-12 md:h-16 text-violet-500 animate-spin" />
                    <p className="text-lg md:text-xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] animate-pulse text-center">Scan des fréquences...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-12 md:pb-20">
                    {scoutingResults.map(talent => (
                      <TalentCard key={talent.id} talent={talent as Talent} onNegotiate={(t) => setActiveNegotiation(t)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {activeNegotiation && (
          <NegotiationModal 
            talent={activeNegotiation as Talent} 
            gameState={gameState} 
            onClose={() => setActiveNegotiation(null)}
            onSuccess={finalizeContract}
          />
        )}

        {showTourPlanner && (
          <TourPlanner
            gameState={gameState}
            onClose={() => setShowTourPlanner(false)}
            onCreateTour={(tour) => {
              // create tour: deduct cost, add to tours, add an event
              setGameState(prev => {
                if (prev.budget < tour.cost) {
                  return { ...prev, notifications: [...prev.notifications, 'Budget insuffisant pour lancer la tournée'].slice(-5) };
                }
                const newState = { ...prev } as GameState;
                newState.budget = newState.budget - tour.cost;
                newState.tours = [...(newState.tours || []), tour];
                // create a simple event for the tour
                const event = {
                  id: `evt-${tour.id}`,
                  type: 'Tour' as any,
                  title: `Tournée: ${tour.destinations.join(', ')}`,
                  description: `Tournée de ${tour.destinations.length} villes`,
                  date: tour.startDate,
                  location: tour.destinations[0],
                  participants: [tour.artistId],
                  rewards: { budget: tour.revenueEstimate, reputation: 8, experience: 100 },
                  requirements: {}
                } as any;
                newState.activeEvents = [...newState.activeEvents, event];
                newState.notifications = [...newState.notifications, `Tournée planifiée: ${tour.destinations.length} villes`].slice(-5);
                // reduce artist energy
                newState.signedArtists = newState.signedArtists.map(a => a.id === tour.artistId ? { ...a, energy: Math.max(0, (a.energy || 100) - tour.destinations.length * 10) } : a);
                return newState;
              });
            }}
          />
        )}

        {showEventManager && (
          <EventManager
            gameState={gameState}
            onEventAction={handleEventAction}
            onClose={() => setShowEventManager(false)}
          />
        )}

        {/* Floating tour planner button */}
        <button onClick={() => setShowTourPlanner(true)} className="fixed bottom-6 right-6 z-40 bg-emerald-600 p-3 rounded-full shadow-lg text-white">📅</button>

        {showEquipmentShop && (
          <EquipmentShop
            gameState={gameState}
            onPurchaseEquipment={handlePurchaseEquipment}
            onClose={() => setShowEquipmentShop(false)}
          />
        )}

        {showSkillTree && selectedArtistForSkills && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3 min-w-0">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 flex-shrink-0" />
                    <span className="truncate">Développement de {selectedArtistForSkills.name}</span>
                  </h2>
                  <button
                    onClick={() => {
                      setShowSkillTree(false);
                      setSelectedArtistForSkills(null);
                    }}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nouvelles modales pour les systèmes avancés */}
        {showMiniGame && selectedArtistForGame && (
          <MiniGame
            talent={selectedArtistForGame}
            gameState={gameState}
            onGameComplete={handleMiniGameComplete}
            onClose={() => {
              setShowMiniGame(false);
              setSelectedArtistForGame(null);
            }}
          />
        )}

        {showRivalrySystem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                    <span className="truncate">Système de Rivalité</span>
                  </h2>
                  <button
                    onClick={() => setShowRivalrySystem(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <RivalrySystem
                  gameState={gameState}
                  onRivalryAction={handleRivalryAction}
                />
              </div>
            </div>
          </div>
        )}

        {showQuestSystem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Scroll className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                    <span className="truncate">Système de Quêtes</span>
                  </h2>
                  <button
                    onClick={() => setShowQuestSystem(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <QuestSystem
                  gameState={gameState}
                  onQuestAccept={handleQuestAccept}
                  onQuestComplete={handleQuestComplete}
                />
              </div>
            </div>
          </div>
        )}

        {showWeatherSystem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Cloud className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                    <span className="truncate">Système Météo</span>
                  </h2>
                  <button
                    onClick={() => setShowWeatherSystem(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <WeatherSystem
                  gameState={gameState}
                  onWeatherChange={handleWeatherChange}
                />
              </div>
            </div>
          </div>
        )}

        {showSaveLoadSystem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Save className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                    <span className="truncate">Sauvegarde & Chargement</span>
                  </h2>
                  <button
                    onClick={() => setShowSaveLoadSystem(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <SaveLoadSystem
                  gameState={gameState}
                  onLoadGame={handleLoadGame}
                />
              </div>
            </div>
          </div>
        )}

        {showStatisticsSystem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                    <span className="truncate">Statistiques Détaillées</span>
                  </h2>
                  <button
                    onClick={() => setShowStatisticsSystem(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <StatisticsSystem gameState={gameState} />
              </div>
            </div>
          </div>
        )}

        {showCareerMode && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
            <div className="glass rounded-xl md:rounded-2xl max-w-6xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
              <div className="p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                    <span className="truncate">Mode Carrière</span>
                  </h2>
                  <button
                    onClick={() => setShowCareerMode(false)}
                    className="text-white/60 hover:text-white active:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6 max-h-[calc(90vh-100px)] md:max-h-[60vh] overflow-y-auto">
                <CareerMode
                  gameState={gameState}
                  onMilestoneComplete={handleMilestoneComplete}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
