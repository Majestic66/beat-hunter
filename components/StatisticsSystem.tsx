import React, { useState, useMemo } from 'react';
import { GameState } from '../types';
import { BarChart3, TrendingUp, Award, Users, DollarSign, Calendar, Target, Zap } from 'lucide-react';

interface StatisticsSystemProps {
  gameState: GameState;
}

const StatisticsSystem: React.FC<StatisticsSystemProps> = ({ gameState }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'month' | 'week'>('all');

  const stats = useMemo(() => {
    const talents = gameState.talents;
    const events = gameState.completedEvents || [];
    const achievements = gameState.achievements.filter(a => a.unlocked);

    // Statistiques générales
    const totalRevenue = talents.reduce((sum, t) => sum + t.totalEarnings, 0);
    const totalFans = talents.reduce((sum, t) => sum + t.fans, 0);
    const averageLevel = talents.length > 0 ? talents.reduce((sum, t) => sum + t.level, 0) / talents.length : 0;
    const topGenre = talents.length > 0 ?
      talents.reduce((acc, t) => {
        acc[t.genre] = (acc[t.genre] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) : {};

    const mostPopularGenre = Object.entries(topGenre).sort(([,a]: [string, number], [,b]: [string, number]) => b - a)[0]?.[0] || 'Aucun';

    // Statistiques par genre
    const genreStats = talents.reduce((acc, talent) => {
      if (!acc[talent.genre]) {
        acc[talent.genre] = {
          count: 0,
          totalFans: 0,
          totalRevenue: 0,
          averageLevel: 0
        };
      }
      acc[talent.genre].count++;
      acc[talent.genre].totalFans += talent.fame;
      acc[talent.genre].totalRevenue += talent.totalRevenue || 0;
      return acc;
    }, {} as Record<string, any>);

    Object.keys(genreStats).forEach(genre => {
      genreStats[genre].averageLevel = talents
        .filter(t => t.genre === genre)
        .reduce((sum, t) => sum + t.level, 0) / genreStats[genre].count;
    });

    // Statistiques d'événements
    const eventStats = events.reduce((acc, event) => {
      acc.total++;
      if (event.success) acc.successful++;
      acc.totalRevenue += event.revenue || 0;
      return acc;
    }, { total: 0, successful: 0, totalRevenue: 0 });

    // Statistiques de progression
    const progressionStats = {
      totalXP: talents.reduce((sum, t) => sum + t.experience, 0),
      maxLevel: Math.max(...talents.map(t => t.level), 0),
      skillsLearned: talents.reduce((sum, t) => sum + t.skills.filter(s => s.level > 1).length, 0),
      collaborationsDone: gameState.completedCollaborations || 0
    };

    return {
      general: {
        totalTalents: talents.length,
        totalRevenue,
        totalFans,
        averageLevel: Math.round(averageLevel * 10) / 10,
        mostPopularGenre,
        budget: gameState.budget
      },
      genres: genreStats,
      events: eventStats,
      progression: progressionStats,
      achievements: {
        total: achievements.length,
        completionRate: achievements.length / gameState.achievements.length * 100
      }
    };
  }, [gameState]);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, color, subtitle }) => (
    <div className="glass rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{title}</h4>
          {subtitle && <p className="text-white/60 text-xs">{subtitle}</p>}
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-bold text-white">Statistiques Détaillées</h2>
      </div>

      {/* Période de filtrage */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: 'Tout' },
          { key: 'month', label: 'Ce mois' },
          { key: 'week', label: 'Cette semaine' }
        ].map((period) => (
          <button
            key={period.key}
            onClick={() => setSelectedPeriod(period.key as any)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedPeriod === period.key
                ? 'bg-violet-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Statistiques générales */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Vue d'ensemble
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Talents"
            value={stats.general.totalTalents}
            icon={<Users className="w-5 h-5" />}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatCard
            title="Revenus Totaux"
            value={`${stats.general.totalRevenue.toLocaleString()}€`}
            icon={<DollarSign className="w-5 h-5" />}
            color="bg-green-500/20 text-green-400"
          />
          <StatCard
            title="Fans Totaux"
            value={stats.general.totalFans.toLocaleString()}
            icon={<Award className="w-5 h-5" />}
            color="bg-purple-500/20 text-purple-400"
          />
          <StatCard
            title="Niveau Moyen"
            value={stats.general.averageLevel}
            icon={<Target className="w-5 h-5" />}
            color="bg-yellow-500/20 text-yellow-400"
          />
        </div>
      </div>

      {/* Statistiques par genre */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Par Genre Musical</h3>
        <div className="space-y-3">
          {Object.entries(stats.genres).map(([genre, data]: [string, any]) => (
            <div key={genre} className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{genre}</h4>
                <div className="text-sm text-white/60">{data.count} artiste{data.count > 1 ? 's' : ''}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Fans:</span>
                  <div className="text-white font-bold">{data.totalFans.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-white/60">Revenus:</span>
                  <div className="text-green-400 font-bold">{data.totalRevenue.toLocaleString()}€</div>
                </div>
                <div>
                  <span className="text-white/60">Niveau moyen:</span>
                  <div className="text-blue-400 font-bold">{Math.round(data.averageLevel * 10) / 10}</div>
                </div>
                <div>
                  <span className="text-white/60">% du total:</span>
                  <div className="text-purple-400 font-bold">
                    {Math.round((data.count / stats.general.totalTalents) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques d'événements */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Événements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Événements Totaux"
            value={stats.events.total}
            icon={<Calendar className="w-5 h-5" />}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatCard
            title="Taux de Réussite"
            value={stats.events.total > 0 ? `${Math.round((stats.events.successful / stats.events.total) * 100)}%` : '0%'}
            icon={<Target className="w-5 h-5" />}
            color="bg-green-500/20 text-green-400"
          />
          <StatCard
            title="Revenus Événements"
            value={`${stats.events.totalRevenue.toLocaleString()}€`}
            icon={<DollarSign className="w-5 h-5" />}
            color="bg-yellow-500/20 text-yellow-400"
          />
        </div>
      </div>

      {/* Statistiques de progression */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Progression
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="XP Total"
            value={stats.progression.totalXP.toLocaleString()}
            icon={<TrendingUp className="w-5 h-5" />}
            color="bg-purple-500/20 text-purple-400"
          />
          <StatCard
            title="Niveau Maximum"
            value={stats.progression.maxLevel}
            icon={<Award className="w-5 h-5" />}
            color="bg-yellow-500/20 text-yellow-400"
          />
          <StatCard
            title="Compétences Apprises"
            value={stats.progression.skillsLearned}
            icon={<Target className="w-5 h-5" />}
            color="bg-blue-500/20 text-blue-400"
          />
          <StatCard
            title="Collaborations"
            value={stats.progression.collaborationsDone}
            icon={<Users className="w-5 h-5" />}
            color="bg-green-500/20 text-green-400"
          />
        </div>
      </div>

      {/* Succès */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Succès
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Succès Débloqués"
            value={stats.achievements.total}
            icon={<Award className="w-5 h-5" />}
            color="bg-yellow-500/20 text-yellow-400"
            subtitle={`${gameState.achievements.length} succès au total`}
          />
          <StatCard
            title="Taux de Complétion"
            value={`${Math.round(stats.achievements.completionRate)}%`}
            icon={<Target className="w-5 h-5" />}
            color="bg-green-500/20 text-green-400"
            subtitle="De tous les succès disponibles"
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsSystem;