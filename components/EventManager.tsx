import React, { useState } from 'react';
import { GameEvent, EventType, GameState } from '../types';
import { Calendar, Trophy, Users, Music, Award, Zap } from 'lucide-react';

interface EventManagerProps {
  gameState: GameState;
  onEventAction: (eventId: string, action: 'join' | 'decline') => void;
  onClose: () => void;
}

const EventManager: React.FC<EventManagerProps> = ({ gameState, onEventAction, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState<GameEvent | null>(null);

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case EventType.Concert: return <Music className="w-5 h-5" />;
      case EventType.Festival: return <Users className="w-5 h-5" />;
      case EventType.AwardShow: return <Award className="w-5 h-5" />;
      case EventType.Collaboration: return <Users className="w-5 h-5" />;
      case EventType.Tour: return <Zap className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const canJoinEvent = (event: GameEvent) => {
    if (event.requirements.minReputation && gameState.reputation < event.requirements.minReputation) return false;
    if (event.requirements.minBudget && gameState.budget < event.requirements.minBudget!) return false;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-8 h-8 text-violet-400" />
              Événements & Opportunités
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameState.activeEvents.map((event) => (
              <div
                key={event.id}
                className="glass rounded-xl p-4 border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-violet-500/20 rounded-lg">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{event.title}</h3>
                    <p className="text-sm text-white/70 mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>📍 {event.location || 'Mondial'}</span>
                      <span>👥 {event.participants.length} participants</span>
                    </div>
                    {event.rewards.budget && (
                      <div className="mt-2 text-sm text-green-400">
                        💰 Récompense: {event.rewards.budget.toLocaleString()}€
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedEvent && (
            <div className="mt-6 glass rounded-xl p-6 border border-violet-500/30">
              <h3 className="text-xl font-bold text-white mb-4">{selectedEvent.title}</h3>
              <p className="text-white/80 mb-4">{selectedEvent.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Récompenses</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    {selectedEvent.rewards.budget && <li>💰 {selectedEvent.rewards.budget.toLocaleString()}€</li>}
                    {selectedEvent.rewards.reputation && <li>⭐ {selectedEvent.rewards.reputation} réputation</li>}
                    {selectedEvent.rewards.experience && <li>🎯 {selectedEvent.rewards.experience} XP</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Exigences</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    {selectedEvent.requirements.minReputation && <li>⭐ Min {selectedEvent.requirements.minReputation} réputation</li>}
                    {selectedEvent.requirements.minBudget && <li>💰 Min {selectedEvent.requirements.minBudget!.toLocaleString()}€</li>}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEventAction(selectedEvent.id, 'join')}
                  disabled={!canJoinEvent(selectedEvent)}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Participer
                </button>
                <button
                  onClick={() => onEventAction(selectedEvent.id, 'decline')}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Refuser
                </button>
              </div>
            </div>
          )}

          {/* Achievements Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameState.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`glass rounded-xl p-4 border ${
                    achievement.unlocked
                      ? 'border-yellow-500/50 bg-yellow-500/10'
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{achievement.name}</h4>
                      <p className="text-sm text-white/70">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <div className="mt-2">
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-violet-500 h-2 rounded-full transition-all"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-white/50 mt-1">
                            {achievement.progress}/{achievement.maxProgress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManager;