import React, { useState, useEffect } from 'react';
import { GameState, CareerMilestone } from '../types';
import { Trophy, Star, Crown, Target, Award, TrendingUp, Users, DollarSign } from 'lucide-react';

interface CareerModeProps {
  gameState: GameState;
  onMilestoneComplete: (milestoneId: string) => void;
}

const CareerMode: React.FC<CareerModeProps> = ({ gameState, onMilestoneComplete }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<CareerMilestone | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const careerMilestones: CareerMilestone[] = [
    {
      id: 'first_artist',
      title: 'Premier Talent',
      description: 'Recrutez votre premier artiste',
      requirements: ['Avoir au moins 1 artiste'],
      rewards: ['50000€', 'Badge "Découvreur"', 'Bonus de recrutement +10%'],
      completed: gameState.talents.length >= 1,
      progress: Math.min(100, (gameState.talents.length / 1) * 100),
      difficulty: 'easy',
      category: 'recruitment'
    },
    {
      id: 'millionaire',
      title: 'Premier Million',
      description: 'Atteignez 1 million d\'euros de revenus totaux',
      requirements: ['Gagner 1 000 000€ au total'],
      rewards: ['100000€ bonus', 'Badge "Magnat"', 'Intérêt bancaire +2%'],
      completed: gameState.talents.reduce((sum, t) => sum + t.totalEarnings, 0) >= 1000000,
      progress: Math.min(100, (gameState.talents.reduce((sum, t) => sum + t.totalEarnings, 0) / 1000000) * 100),
      difficulty: 'medium',
      category: 'finance'
    },
    {
      id: 'superstar',
      title: 'Créateur de Superstars',
      description: 'Ayez un artiste avec plus de 1 million de fans',
      requirements: ['1 artiste avec 1 000 000+ fans'],
      rewards: ['200000€', 'Badge "Producteur de Légends"', 'Bonus popularité +15%'],
      completed: gameState.talents.some(t => t.fans >= 1000000),
      progress: Math.min(100, (Math.max(...gameState.talents.map(t => t.fans), 0) / 1000000) * 100),
      difficulty: 'hard',
      category: 'popularity'
    },
    {
      id: 'world_tour',
      title: 'Tournée Mondiale',
      description: 'Organisez des concerts dans 10 villes différentes',
      requirements: ['Concerts dans 10 villes'],
      rewards: ['150000€', 'Badge "Tour Manager"', 'Réduction coûts tournée -20%'],
      completed: gameState.talents.some(t => t.tourCities.length >= 10),
      progress: Math.min(100, (Math.max(...gameState.talents.map(t => t.tourCities.length), 0) / 10) * 100),
      difficulty: 'medium',
      category: 'events'
    },
    {
      id: 'genre_master',
      title: 'Maître des Genres',
      description: 'Ayez des artistes dans tous les genres musicaux',
      requirements: ['Au moins 1 artiste par genre'],
      rewards: ['300000€', 'Badge "Visionnaire"', 'Bonus créativité +25%'],
      completed: new Set(gameState.talents.map(t => t.genre)).size >= 16,
      progress: Math.min(100, (new Set(gameState.talents.map(t => t.genre)).size / 16) * 100),
      difficulty: 'legendary',
      category: 'diversity'
    },
    {
      id: 'collaboration_king',
      title: 'Roi des Collaborations',
      description: 'Réalisez 25 collaborations réussies',
      requirements: ['25 collaborations réussies'],
      rewards: ['250000€', 'Badge "Collaborateur"', 'Chance collaboration +30%'],
      completed: (gameState.completedCollaborations || 0) >= 25,
      progress: Math.min(100, ((gameState.completedCollaborations || 0) / 25) * 100),
      difficulty: 'hard',
      category: 'networking'
    },
    {
      id: 'legendary_artist',
      title: 'Artiste Légendaire',
      description: 'Ayez un artiste niveau 100',
      requirements: ['1 artiste niveau 100'],
      rewards: ['500000€', 'Badge "Légende"', 'Tous les bonus +10%'],
      completed: gameState.talents.some(t => t.level >= 100),
      progress: Math.min(100, (Math.max(...gameState.talents.map(t => t.level), 0) / 100) * 100),
      difficulty: 'legendary',
      category: 'progression'
    },
    {
      id: 'empire_builder',
      title: 'Constructeur d\'Empire',
      description: 'Ayez 20 artistes dans votre label',
      requirements: ['20 artistes actifs'],
      rewards: ['1000000€', 'Badge "Empereur"', 'Revenus passifs +50%'],
      completed: gameState.talents.length >= 20,
      progress: Math.min(100, (gameState.talents.length / 20) * 100),
      difficulty: 'legendary',
      category: 'expansion'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-orange-400 bg-orange-500/20';
      case 'legendary': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recruitment': return <Users className="w-5 h-5" />;
      case 'finance': return <DollarSign className="w-5 h-5" />;
      case 'popularity': return <Star className="w-5 h-5" />;
      case 'events': return <Target className="w-5 h-5" />;
      case 'diversity': return <Award className="w-5 h-5" />;
      case 'networking': return <Users className="w-5 h-5" />;
      case 'progression': return <TrendingUp className="w-5 h-5" />;
      case 'expansion': return <Crown className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      recruitment: 'Recrutement',
      finance: 'Finance',
      popularity: 'Popularité',
      events: 'Événements',
      diversity: 'Diversité',
      networking: 'Réseau',
      progression: 'Progression',
      expansion: 'Expansion'
    };
    return names[category] || category;
  };

  const completedCount = careerMilestones.filter(m => m.completed).length;
  const totalCount = careerMilestones.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  const categories = ['recruitment', 'finance', 'popularity', 'events', 'diversity', 'networking', 'progression', 'expansion'];
  const categoryProgress = categories.map(category => {
    const categoryMilestones = careerMilestones.filter(m => m.category === category);
    const completed = categoryMilestones.filter(m => m.completed).length;
    return {
      category,
      completed,
      total: categoryMilestones.length,
      progress: Math.round((completed / categoryMilestones.length) * 100)
    };
  });

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Crown className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Mode Carrière</h2>
      </div>

      {/* Progression globale */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Progression Carrière</h3>
          <div className="text-sm text-white/60">
            {completedCount}/{totalCount} jalons complétés
          </div>
        </div>

        <div className="glass rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl">{completionRate}%</div>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
            <Trophy className={`w-8 h-8 ${completionRate === 100 ? 'text-yellow-400' : 'text-gray-400'}`} />
          </div>

          {completionRate === 100 && (
            <div className="text-center text-yellow-400 font-bold">
              🎉 FÉLICITATIONS ! Vous avez complété tous les jalons de carrière !
            </div>
          )}
        </div>
      </div>

      {/* Progression par catégorie */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Par Catégorie</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryProgress.map(({ category, completed, total, progress }) => (
            <div key={category} className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(category)}
                <span className="text-sm font-bold text-white">{getCategoryName(category)}</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{completed}/{total}</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-violet-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des jalons */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Jalons de Carrière</h3>
        <div className="space-y-3">
          {careerMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`glass rounded-lg p-4 border transition-all cursor-pointer ${
                milestone.completed
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-white/10 hover:border-violet-500/50'
              }`}
              onClick={() => {
                setSelectedMilestone(milestone);
                setShowDetails(true);
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${milestone.completed ? 'bg-green-500/20 text-green-400' : 'bg-violet-500/20 text-violet-400'}`}>
                  {getCategoryIcon(milestone.category)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-white">{milestone.title}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-bold ${getDifficultyColor(milestone.difficulty)}`}>
                      {milestone.difficulty}
                    </div>
                    {milestone.completed && <Trophy className="w-4 h-4 text-yellow-400" />}
                  </div>

                  <p className="text-white/70 text-sm mb-3">{milestone.description}</p>

                  {!milestone.completed && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progression</span>
                        <span>{Math.floor(milestone.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-violet-500 h-2 rounded-full transition-all"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">
                      {getCategoryName(milestone.category)}
                    </div>
                    <div className="text-sm text-green-400">
                      {milestone.rewards.length} récompense{milestone.rewards.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Détails du jalon */}
      {showDetails && selectedMilestone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedMilestone.title}</h2>
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
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(selectedMilestone.difficulty)}`}>
                  {selectedMilestone.difficulty}
                </div>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(selectedMilestone.category)}
                  <span className="text-white/60">{getCategoryName(selectedMilestone.category)}</span>
                </div>
                {selectedMilestone.completed && <Trophy className="w-6 h-6 text-yellow-400" />}
              </div>

              <p className="text-white/80 mb-6">{selectedMilestone.description}</p>

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-white">Conditions:</h4>
                <ul className="space-y-2">
                  {selectedMilestone.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70">
                      <Target className="w-4 h-4 text-violet-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {!selectedMilestone.completed && (
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-2">Progression:</h4>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-violet-500 h-3 rounded-full transition-all"
                      style={{ width: `${selectedMilestone.progress}%` }}
                    />
                  </div>
                  <div className="text-center text-white/60 text-sm mt-1">
                    {Math.floor(selectedMilestone.progress)}% complété
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <h4 className="font-bold text-white">Récompenses:</h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedMilestone.rewards.map((reward, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Award className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-bold">{reward}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {selectedMilestone.completed ? (
                  <div className="flex-1 text-center py-3 text-green-400 font-bold">
                    ✅ Jalon complété !
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      // Simuler la vérification et complétion
                      if (selectedMilestone.progress >= 100) {
                        onMilestoneComplete(selectedMilestone.id);
                        setShowDetails(false);
                      }
                    }}
                    disabled={selectedMilestone.progress < 100}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    {selectedMilestone.progress >= 100 ? 'Réclamer les récompenses' : 'En cours...'}
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

export default CareerMode;