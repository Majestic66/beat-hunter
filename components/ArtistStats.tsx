import React, { useState, useMemo } from 'react';
import { Talent, GameState, Release } from '../types';
import { generateReleaseResult, generateCoverArt } from '../services/geminiService';
import {
  Music, TrendingUp, DollarSign, Award, Users, Heart, Calendar,
  Star, Target, Zap, Disc, Play, BarChart3, Clock, Crown,
  Loader2, Sparkles, Minus, ChevronUp, ChevronDown
} from 'lucide-react';

interface ArtistStatsProps {
  artist: Talent;
  gameState: GameState;
  onUpdateState: (update: any) => void;
}

const ArtistStats: React.FC<ArtistStatsProps> = ({ artist, gameState, onUpdateState }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'releases'>('stats');
  const [isCreating, setIsCreating] = useState(false);
  const [releaseType, setReleaseType] = useState<'single' | 'album'>('single');
  const [releaseTitle, setReleaseTitle] = useState('');
  const [strategy, setStrategy] = useState('Marketing Digital');
  const [trackCount, setTrackCount] = useState(1);

  // Calcul des statistiques avancées
  const stats = useMemo(() => {
    const totalReleases = artist.releaseHistory.length;
    const totalRevenue = artist.releaseHistory.reduce((sum, r) => sum + (r.revenue || 0), 0);
    const averageBuzz = totalReleases > 0 ? artist.releaseHistory.reduce((sum, r) => sum + (r.buzz || 0), 0) / totalReleases : 0;
    const totalStreams = artist.releaseHistory.reduce((sum, r) => sum + (r.streams || 0), 0);
    const monthlyIncome = calculateMonthlyIncome(artist);
    const careerProgress = Math.min(100, ((artist.level || 1) / 100) * 100);

    return {
      totalReleases,
      totalRevenue,
      averageBuzz,
      totalStreams,
      monthlyIncome,
      careerProgress,
      popularityTrend: calculatePopularityTrend(artist),
      age: new Date().getFullYear() - (artist.age || 20),
      yearsActive: Math.max(1, Math.floor(totalReleases / 4))
    };
  }, [artist]);

  function calculateMonthlyIncome(artist: Talent): number {
    // Revenus SACEM basés sur la popularité et les streams
    const fans = artist.fame || 0;
    const baseIncome = fans * 0.001; // 0.1% des fans en revenus mensuels
    const streamBonus = artist.releaseHistory.reduce((sum, r) => sum + (r.streams || 0), 0) * 0.0001;
    const popularityMultiplier = Math.max(0.5, (artist.popularity || 0) / 50);
    return Math.floor((baseIncome + streamBonus) * popularityMultiplier);
  }

  function calculatePopularityTrend(artist: Talent): 'up' | 'down' | 'stable' {
    if (artist.releaseHistory.length < 2) return 'stable';
    const recent = artist.releaseHistory.slice(-2);
    const trend = (recent[1].buzz || 0) - (recent[0].buzz || 0);
    if (trend > 10) return 'up';
    if (trend < -10) return 'down';
    return 'stable';
  }

  const handleCreateRelease = async () => {
    if (!releaseTitle.trim()) return;

    setIsCreating(true);
    try {
      const collaborators = releaseType === 'album' ? [] : undefined;
      const release = await generateReleaseResult(artist, strategy, collaborators);

      // Personnaliser la release selon le type
      const customizedRelease: Release = {
        ...release,
        songTitle: releaseTitle,
        type: releaseType,
        trackCount: releaseType === 'album' ? trackCount : 1,
        releaseDate: new Date().toISOString(),
        streams: 0,
        monthlyStreams: Math.floor(Math.random() * 1000000) + 100000,
        sacemRevenue: 0
      };

      // Calculer les revenus initiaux
      const initialRevenue = releaseType === 'album'
        ? customizedRelease.revenue * trackCount * 0.8
        : customizedRelease.revenue;

      onUpdateState({
        type: 'NEW_RELEASE',
        artistId: artist.id,
        release: {
          ...customizedRelease,
          revenue: initialRevenue
        }
      });

      setReleaseTitle('');
      setActiveTab('releases');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const strategies = [
    { id: 'digital', name: 'Marketing Digital', cost: 5000, effectiveness: 1.0 },
    { id: 'radio', name: 'Promotion Radio', cost: 15000, effectiveness: 1.3 },
    { id: 'viral', name: 'Campagne Virale', cost: 8000, effectiveness: 1.2 },
    { id: 'traditional', name: 'Médias Traditionnels', cost: 25000, effectiveness: 1.5 },
    { id: 'streaming', name: 'Focus Streaming', cost: 10000, effectiveness: 1.1 }
  ];

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{artist.name}</h2>
          <p className="text-white/60">{artist.genre} • {stats.age} ans • {stats.yearsActive} ans de carrière</p>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'stats', label: 'Statistiques', icon: BarChart3 },
          { id: 'releases', label: 'Releases', icon: Disc }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Métriques principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/60">Fans</span>
              </div>
              <div className="text-2xl font-bold text-white">{(artist.fame || 0).toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                {stats.popularityTrend === 'up' && <ChevronUp className="w-3 h-3 text-green-400" />}
                {stats.popularityTrend === 'down' && <ChevronDown className="w-3 h-3 text-red-400" />}
                <span className={`text-xs ${
                  stats.popularityTrend === 'up' ? 'text-green-400' :
                  stats.popularityTrend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stats.popularityTrend === 'up' ? 'En hausse' :
                   stats.popularityTrend === 'down' ? 'En baisse' : 'Stable'}
                </span>
              </div>
            </div>

            <div className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/60">Revenus Totaux</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalRevenue.toLocaleString()}€</div>
              <div className="text-xs text-green-400 mt-1">+{stats.monthlyIncome}€/mois</div>
            </div>

            <div className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/60">Streams</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalStreams.toLocaleString()}</div>
              <div className="text-xs text-purple-400 mt-1">Total carrière</div>
            </div>

            <div className="glass rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/60">Popularité</span>
              </div>
              <div className="text-2xl font-bold text-white">{artist.popularity || 0}/100</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full"
                  style={{ width: `${artist.popularity || 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-lg p-4 border border-white/10">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Carrière
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Niveau</span>
                  <span className="text-white font-bold">{artist.level || 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Expérience</span>
                  <span className="text-white font-bold">{artist.experience || 0}/1000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Releases</span>
                  <span className="text-white font-bold">{stats.totalReleases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Buzz Moyen</span>
                  <span className="text-white font-bold">{Math.round(stats.averageBuzz)}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4 border border-white/10">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                État Actuel
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60">Humeur</span>
                    <span className="text-white font-bold">{artist.mood || 80}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (artist.mood || 80) > 70 ? 'bg-green-500' :
                        (artist.mood || 80) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${artist.mood || 80}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60">Énergie</span>
                    <span className="text-white font-bold">{artist.energy || 100}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (artist.energy || 100) > 70 ? 'bg-blue-500' :
                        (artist.energy || 100) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${artist.energy || 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Relation</span>
                  <span className="text-white font-bold">{artist.relationship || 60}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div className="glass rounded-lg p-4 border border-white/10">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Compétences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(artist.skills || []).map((skill) => (
                <div key={skill.type} className="flex items-center justify-between">
                  <span className="text-white/60">{skill.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{skill.level}/10</span>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-violet-500 h-2 rounded-full"
                        style={{ width: `${(skill.level / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'releases' && (
        <div className="space-y-4">
          <h3 className="font-bold text-white mb-4">Historique des Releases</h3>
          {artist.releaseHistory.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Disc className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune release pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {artist.releaseHistory.map((release, index) => (
                <div key={index} className="glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white">{release.songTitle}</h4>
                      <p className="text-sm text-white/60">
                        {release.type || 'Single'} • {new Date(release.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{(release.revenue || 0).toLocaleString()}€</div>
                      <div className="text-sm text-white/60">Buzz: {release.buzz}/100</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Streams:</span>
                      <div className="text-white font-bold">{(release.streams || 0).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Impact:</span>
                      <div className="text-white font-bold">{release.impact}</div>
                    </div>
                    <div>
                      <span className="text-white/60">SACEM:</span>
                      <div className="text-blue-400 font-bold">{(release.sacemRevenue || 0).toLocaleString()}€</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      
    </div>
  );
};

export default ArtistStats;