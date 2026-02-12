import React, { useState, useEffect } from 'react';
import { GameState, Quest } from '../types';
import { Scroll, CheckCircle, Clock, Star, Trophy, Target } from 'lucide-react';

interface QuestSystemProps {
  gameState: GameState;
  onQuestAccept: (questId: string) => void;
  onQuestComplete: (questId: string) => void;
}

const QuestSystem: React.FC<QuestSystemProps> = ({ gameState, onQuestAccept, onQuestComplete }) => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getQuestStatus = (quest: Quest) => {
    if (quest.completed) return { status: 'Terminée', color: 'text-green-400', icon: <CheckCircle className="w-4 h-4" /> };
    if (quest.accepted) return { status: 'En cours', color: 'text-blue-400', icon: <Clock className="w-4 h-4" /> };
    return { status: 'Disponible', color: 'text-yellow-400', icon: <Star className="w-4 h-4" /> };
  };

  const getQuestTypeIcon = (type: string) => {
    switch (type) {
      case 'career': return <Trophy className="w-5 h-5" />;
      case 'collaboration': return <Star className="w-5 h-5" />;
      case 'achievement': return <Target className="w-5 h-5" />;
      default: return <Scroll className="w-5 h-5" />;
    }
  };

  const getQuestDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-orange-400 bg-orange-500/20';
      case 'legendary': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const checkQuestProgress = (quest: Quest) => {
    // Simuler la vérification de progression basée sur l'état du jeu
    switch (quest.id) {
      case 'first_hit':
        return gameState.talents.some(t => t.popularity > 50) ? 100 : 0;
      case 'millionaire':
        return Math.min(100, (gameState.budget / 1000000) * 100);
      case 'world_tour':
        return Math.min(100, (gameState.talents.reduce((sum, t) => sum + t.tourCities.length, 0) / 10) * 100);
      case 'legendary_artist':
        return gameState.talents.some(t => t.level >= 50) ? 100 : Math.max(0, gameState.talents.reduce((max, t) => Math.max(max, t.level), 0) * 2);
      case 'genre_master':
        const genres = new Set(gameState.talents.map(t => t.genre));
        return Math.min(100, (genres.size / 5) * 100);
      case 'collaboration_king':
        return Math.min(100, gameState.completedCollaborations * 20);
      default:
        return quest.progress || 0;
    }
  };

  const availableQuests = gameState.quests.filter(quest =>
    !quest.completed && (!quest.accepted || quest.accepted)
  );

  const activeQuests = gameState.quests.filter(quest =>
    quest.accepted && !quest.completed
  );

  const completedQuests = gameState.quests.filter(quest => quest.completed);

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Scroll className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Système de Quêtes</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quêtes disponibles */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Disponibles ({availableQuests.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availableQuests.map((quest) => {
              const status = getQuestStatus(quest);
              return (
                <div
                  key={quest.id}
                  className="glass rounded-lg p-4 border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedQuest(quest);
                    setShowDetails(true);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-violet-500/20 rounded-lg text-violet-300">
                      {getQuestTypeIcon(quest.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">{quest.title}</h4>
                      <p className="text-xs text-white/60 mt-1">{quest.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${getQuestDifficultyColor(quest.difficulty)}`}>
                          {quest.difficulty}
                        </div>
                        {status.icon}
                        <span className={`text-xs ${status.color}`}>{status.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quêtes actives */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            En cours ({activeQuests.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activeQuests.map((quest) => {
              const progress = checkQuestProgress(quest);
              return (
                <div key={quest.id} className="glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                      {getQuestTypeIcon(quest.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">{quest.title}</h4>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>Progression</span>
                          <span>{Math.floor(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {progress >= 100 && (
                        <button
                          onClick={() => onQuestComplete(quest.id)}
                          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                        >
                          Réclamer la récompense
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quêtes terminées */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Terminées ({completedQuests.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {completedQuests.map((quest) => (
              <div key={quest.id} className="glass rounded-lg p-4 border border-green-500/20 bg-green-500/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-300">
                    {getQuestTypeIcon(quest.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">{quest.title}</h4>
                    <p className="text-xs text-green-400 mt-1">✓ Terminée</p>
                    <div className="text-xs text-white/60 mt-2">
                      Récompenses reçues: {quest.rewards.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails de quête */}
      {showDetails && selectedQuest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedQuest.title}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getQuestDifficultyColor(selectedQuest.difficulty)}`}>
                  {selectedQuest.difficulty}
                </div>
                <div className="flex items-center gap-2">
                  {getQuestTypeIcon(selectedQuest.type)}
                  <span className="text-white/60">{selectedQuest.type}</span>
                </div>
              </div>

              <p className="text-white/80 mb-6">{selectedQuest.description}</p>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-white">Objectifs:</h4>
                <ul className="space-y-2">
                  {selectedQuest.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70">
                      <Target className="w-4 h-4 text-violet-400" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-white">Récompenses:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedQuest.rewards.map((reward, index) => (
                    <div key={index} className="flex items-center gap-2 text-green-400">
                      <Trophy className="w-4 h-4" />
                      {reward}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {!selectedQuest.accepted && (
                  <button
                    onClick={() => {
                      onQuestAccept(selectedQuest.id);
                      setShowDetails(false);
                    }}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Accepter la quête
                  </button>
                )}
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestSystem;