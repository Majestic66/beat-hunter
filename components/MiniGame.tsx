import React, { useState, useEffect } from 'react';
import { Talent, GameState } from '../types';
import { Music, Zap, Target, Clock, Trophy, Star } from 'lucide-react';

interface MiniGameProps {
  talent: Talent;
  gameState: GameState;
  onGameComplete: (result: { success: boolean; reward: number; experience: number }) => void;
  onClose: () => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ talent, gameState, onGameComplete, onClose }) => {
  const [gameType, setGameType] = useState<'rhythm' | 'lyrics' | 'performance' | null>(null);
  const [gameStateInternal, setGameStateInternal] = useState<'menu' | 'playing' | 'result'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetSequence, setTargetSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const games = [
    {
      id: 'rhythm',
      name: 'Rythme Parfait',
      description: 'Suis le rythme et appuie au bon moment !',
      icon: <Music className="w-6 h-6" />,
      difficulty: talent.skills.find(s => s.type === 'Performance')?.level || 1
    },
    {
      id: 'lyrics',
      name: 'Création Lyrique',
      description: 'Compose des paroles créatives en un temps limité.',
      icon: <Zap className="w-6 h-6" />,
      difficulty: talent.skills.find(s => s.type === 'Songwriting')?.level || 1
    },
    {
      id: 'performance',
      name: 'Show Spectaculaire',
      description: 'Gère une performance live parfaite.',
      icon: <Target className="w-6 h-6" />,
      difficulty: talent.skills.find(s => s.type === 'Performance')?.level || 1
    }
  ];

  const startGame = (type: 'rhythm' | 'lyrics' | 'performance') => {
    setGameType(type);
    setGameStateInternal('playing');
    setScore(0);
    setTimeLeft(30);

    if (type === 'rhythm') {
      // Générer une séquence rythmique
      const sequence = Array.from({ length: 8 }, () => Math.floor(Math.random() * 4));
      setTargetSequence(sequence);
      setPlayerSequence([]);
      setCurrentStep(0);
    }
  };

  const handleRhythmClick = (buttonIndex: number) => {
    if (gameType !== 'rhythm') return;

    const newSequence = [...playerSequence, buttonIndex];
    setPlayerSequence(newSequence);

    if (newSequence[currentStep] === targetSequence[currentStep]) {
      setScore(prev => prev + 10);
      setCurrentStep(prev => prev + 1);

      if (currentStep + 1 >= targetSequence.length) {
        // Séquence complète réussie
        setScore(prev => prev + 50);
        setTargetSequence(prev => [...prev, Math.floor(Math.random() * 4)]);
        setPlayerSequence([]);
        setCurrentStep(0);
      }
    } else {
      // Erreur
      setScore(prev => Math.max(0, prev - 5));
      setPlayerSequence([]);
      setCurrentStep(0);
    }
  };

  const handleLyricsSubmit = (lyrics: string) => {
    // Simuler l'évaluation des paroles
    const creativity = Math.random();
    const rhyme = Math.random();
    const emotional = Math.random();
    const totalScore = (creativity + rhyme + emotional) / 3;

    setScore(Math.floor(totalScore * 100));
    setGameStateInternal('result');
  };

  const handlePerformanceAction = (action: string) => {
    // Simuler les actions de performance
    const success = Math.random() > 0.3;
    if (success) {
      setScore(prev => prev + 20);
    } else {
      setScore(prev => Math.max(0, prev - 10));
    }
  };

  useEffect(() => {
    if (gameStateInternal === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStateInternal === 'playing') {
      setGameStateInternal('result');
    }
  }, [timeLeft, gameStateInternal]);

  const calculateReward = () => {
    const baseReward = score * 10;
    const experience = Math.floor(score / 2);
    const success = score > 50;
    return { success, reward: success ? baseReward : baseReward / 2, experience };
  };

  const renderGame = () => {
    switch (gameType) {
      case 'rhythm':
        return (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold text-white">Rythme Parfait</div>
            <div className="text-lg text-white/80">Répète la séquence !</div>

            {/* Séquence cible */}
            <div className="flex justify-center gap-2 mb-4">
              {targetSequence.map((note, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg border-2 ${
                    index < currentStep
                      ? 'bg-green-500 border-green-400'
                      : index === currentStep
                      ? 'bg-yellow-500 border-yellow-400 animate-pulse'
                      : 'bg-gray-600 border-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Boutons de jeu */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => handleRhythmClick(index)}
                  className="w-16 h-16 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl transition-colors"
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        );

      case 'lyrics':
        return (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold text-white">Création Lyrique</div>
            <div className="text-white/80">
              Écris des paroles créatives sur le thème : "{talent.genre} {talent.personality.toLowerCase()}"
            </div>
            <textarea
              className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50"
              placeholder="Écris tes paroles ici..."
              onChange={(e) => {
                if (e.target.value.length > 10) {
                  handleLyricsSubmit(e.target.value);
                }
              }}
            />
          </div>
        );

      case 'performance':
        return (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold text-white">Show Spectaculaire</div>
            <div className="text-white/80">Gère ta performance live !</div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => handlePerformanceAction('dance')}
                className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
              >
                🕺 Danser
              </button>
              <button
                onClick={() => handlePerformanceAction('sing')}
                className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
              >
                🎤 Chanter
              </button>
              <button
                onClick={() => handlePerformanceAction('interact')}
                className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
              >
                👥 Interagir
              </button>
              <button
                onClick={() => handlePerformanceAction('special')}
                className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-semibold"
              >
                ✨ Coup spécial
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (gameStateInternal === 'menu') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Mini-Jeux avec {talent.name}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="glass rounded-xl p-4 border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer"
                  onClick={() => startGame(game.id as any)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-500/20 rounded-lg text-violet-300">
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{game.name}</h3>
                      <p className="text-xs text-white/50">Difficulté: {game.difficulty}/10</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">{game.description}</p>
                  <div className="mt-3 text-xs text-green-400">
                    Récompenses: 💰 Argent, 🎯 XP, ⭐ Bonus
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameStateInternal === 'result') {
    const result = calculateReward();
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="glass rounded-2xl max-w-md w-full">
          <div className="p-6 text-center">
            <div className={`text-6xl mb-4 ${result.success ? 'text-green-400' : 'text-red-400'}`}>
              {result.success ? '🎉' : '😔'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {result.success ? 'Victoire !' : 'Défaite'}
            </h2>
            <div className="space-y-2 mb-6">
              <div className="text-white/80">Score: <span className="text-yellow-400 font-bold">{score}</span></div>
              <div className="text-white/80">Récompense: <span className="text-green-400 font-bold">{result.reward.toLocaleString()}€</span></div>
              <div className="text-white/80">Expérience: <span className="text-blue-400 font-bold">{result.experience} XP</span></div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onGameComplete(result)}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Continuer
              </button>
              <button
                onClick={() => setGameStateInternal('menu')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Rejouer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-2xl w-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{talent.name} - Mini-Jeu</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-white font-mono">{timeLeft}s</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

export default MiniGame;