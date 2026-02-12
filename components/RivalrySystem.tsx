import React, { useState, useEffect } from 'react';
import { GameState, RivalLabel } from '../types';
import { Crown, Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

interface RivalrySystemProps {
  gameState: GameState;
  onRivalryAction: (action: string, rivalId: string) => void;
}

const RivalrySystem: React.FC<RivalrySystemProps> = ({ gameState, onRivalryAction }) => {
  const [selectedRival, setSelectedRival] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(false);

  const rivalActions = [
    {
      id: 'sabotage',
      name: 'Sabotage',
      description: 'Tente de saboter un événement rival',
      cost: 50000,
      risk: 'high',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: 'poach',
      name: 'Débaucher',
      description: 'Essaie de voler un talent rival',
      cost: 100000,
      risk: 'medium',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'marketing',
      name: 'Guerre Marketing',
      description: 'Lance une campagne contre un rival',
      cost: 75000,
      risk: 'low',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'alliance',
      name: 'Alliance Temporaire',
      description: 'Propose une collaboration',
      cost: 25000,
      risk: 'low',
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const getRivalryLevel = (rival: RivalLabel) => {
    if (rival.rivalryLevel >= 80) return { level: 'Mortel', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (rival.rivalryLevel >= 60) return { level: 'Intense', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    if (rival.rivalryLevel >= 40) return { level: 'Modéré', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (rival.rivalryLevel >= 20) return { level: 'Léger', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { level: 'Aucun', color: 'text-gray-400', bg: 'bg-gray-500/20' };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleAction = (actionId: string, rivalId: string) => {
    const action = rivalActions.find(a => a.id === actionId);
    if (!action || gameState.budget < action.cost) return;

    onRivalryAction(actionId, rivalId);
    setShowActions(false);
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Crown className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Système de Rivalité</h2>
      </div>

      <div className="space-y-4">
        {gameState.rivalLabels.map((rival) => {
          const rivalryInfo = getRivalryLevel(rival);
          return (
            <div
              key={rival.id}
              className="glass rounded-lg p-4 border border-white/10 hover:border-violet-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white">{rival.name}</h3>
                  <p className="text-sm text-white/60">{rival.specialty} • {rival.country}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${rivalryInfo.bg} ${rivalryInfo.color}`}>
                  {rivalryInfo.level}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-white/60">Popularité</div>
                  <div className="text-sm font-bold text-white">{rival.popularity.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-white/60">Rivalité</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${rival.rivalryLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">
                  Talents: {rival.talents.length} • Revenus: {rival.revenue.toLocaleString()}€
                </div>
                <button
                  onClick={() => {
                    setSelectedRival(rival.id);
                    setShowActions(true);
                  }}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg transition-colors"
                >
                  Actions
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showActions && selectedRival && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Actions contre {gameState.rivalLabels.find(r => r.id === selectedRival)?.name}
                </h2>
                <button
                  onClick={() => setShowActions(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rivalActions.map((action) => (
                  <div
                    key={action.id}
                    className="glass rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-violet-500/20 rounded-lg text-violet-300">
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{action.name}</h3>
                        <p className="text-xs text-white/50">Risque: <span className={getRiskColor(action.risk)}>{action.risk}</span></p>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 mb-3">{action.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-green-400 font-bold">{action.cost.toLocaleString()}€</div>
                      <button
                        onClick={() => handleAction(action.id, selectedRival)}
                        disabled={gameState.budget < action.cost}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                      >
                        {gameState.budget < action.cost ? 'Fonds insuffisants' : 'Lancer'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-1">Avertissement</h4>
                    <p className="text-sm text-white/80">
                      Les actions de rivalité peuvent échouer et avoir des conséquences imprévisibles.
                      Une rivalité trop intense peut mener à des événements négatifs pour votre label.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RivalrySystem;