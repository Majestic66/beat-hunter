import React, { useState, useEffect } from 'react';
import { GameState, WeatherEffect } from '../types';
import { Cloud, Sun, CloudRain, Zap, Snowflake, Wind } from 'lucide-react';

interface WeatherSystemProps {
  gameState: GameState;
  onWeatherChange: (newWeather: WeatherEffect) => void;
}

const WeatherSystem: React.FC<WeatherSystemProps> = ({ gameState, onWeatherChange }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherEffect>(gameState.weather);
  const [forecast, setForecast] = useState<WeatherEffect[]>([]);

  const weatherTypes: WeatherEffect[] = [
    {
      type: 'sunny',
      name: 'Ensoleillé',
      description: 'Temps parfait pour les événements en extérieur',
      icon: <Sun className="w-6 h-6" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      effects: {
        eventBonus: 1.2,
        performanceBonus: 1.1,
        moodBonus: 0.1,
        riskReduction: 0.8
      }
    },
    {
      type: 'cloudy',
      name: 'Nuageux',
      description: 'Temps neutre, pas d\'effets particuliers',
      icon: <Cloud className="w-6 h-6" />,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      effects: {
        eventBonus: 1.0,
        performanceBonus: 1.0,
        moodBonus: 0.0,
        riskReduction: 1.0
      }
    },
    {
      type: 'rainy',
      name: 'Pluvieux',
      description: 'Les événements extérieurs sont affectés',
      icon: <CloudRain className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      effects: {
        eventBonus: 0.7,
        performanceBonus: 0.9,
        moodBonus: -0.1,
        riskReduction: 1.3
      }
    },
    {
      type: 'stormy',
      name: 'Orageux',
      description: 'Conditions dangereuses, risques élevés',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      effects: {
        eventBonus: 0.5,
        performanceBonus: 0.8,
        moodBonus: -0.2,
        riskReduction: 1.5
      }
    },
    {
      type: 'snowy',
      name: 'Neigeux',
      description: 'Temps hivernal, ambiance spéciale',
      icon: <Snowflake className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
      effects: {
        eventBonus: 0.9,
        performanceBonus: 1.0,
        moodBonus: 0.05,
        riskReduction: 1.1
      }
    },
    {
      type: 'windy',
      name: 'Venteux',
      description: 'Vent fort, peut perturber les performances',
      icon: <Wind className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      effects: {
        eventBonus: 0.8,
        performanceBonus: 0.85,
        moodBonus: -0.05,
        riskReduction: 1.2
      }
    }
  ];

  const generateForecast = () => {
    const newForecast = [];
    for (let i = 0; i < 7; i++) {
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      newForecast.push(randomWeather);
    }
    setForecast(newForecast);
  };

  const changeWeather = () => {
    const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setCurrentWeather(newWeather);
    onWeatherChange(newWeather);
  };

  useEffect(() => {
    generateForecast();
    // Changer la météo toutes les 2-4 heures (dans le jeu)
    const interval = setInterval(changeWeather, 10000 + Math.random() * 10000); // 10-20 secondes pour le test
    return () => clearInterval(interval);
  }, []);

  const getWeatherEffectDescription = (weather: WeatherEffect) => {
    const effects = [];
    if (weather.effects.eventBonus > 1) effects.push(`+${Math.round((weather.effects.eventBonus - 1) * 100)}% succès événements`);
    if (weather.effects.eventBonus < 1) effects.push(`${Math.round((1 - weather.effects.eventBonus) * 100)}% malus événements`);
    if (weather.effects.performanceBonus > 1) effects.push(`+${Math.round((weather.effects.performanceBonus - 1) * 100)}% performance`);
    if (weather.effects.performanceBonus < 1) effects.push(`${Math.round((1 - weather.effects.performanceBonus) * 100)}% malus performance`);
    if (weather.effects.moodBonus > 0) effects.push(`+${Math.round(weather.effects.moodBonus * 100)}% humeur`);
    if (weather.effects.moodBonus < 0) effects.push(`${Math.round(Math.abs(weather.effects.moodBonus) * 100)}% malus humeur`);
    return effects;
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Système Météo</h2>
      </div>

      {/* Météo actuelle */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Conditions Actuelles</h3>
        <div className={`p-4 rounded-lg border ${currentWeather.bgColor} border-white/20`}>
          <div className="flex items-center gap-4 mb-3">
            <div className={`p-3 rounded-lg ${currentWeather.bgColor}`}>
              <div className={currentWeather.color}>
                {currentWeather.icon}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">{currentWeather.name}</h4>
              <p className="text-white/70">{currentWeather.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm">Effets:</h5>
            {getWeatherEffectDescription(currentWeather).map((effect, index) => (
              <div key={index} className="text-sm text-white/60">• {effect}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Prévisions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">Prévisions (7 jours)</h3>
          <button
            onClick={generateForecast}
            className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg transition-colors"
          >
            Actualiser
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {forecast.map((weather, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border border-white/10 text-center ${weather.bgColor} hover:border-violet-500/50 transition-all`}
            >
              <div className="text-xs text-white/60 mb-1">J+{index + 1}</div>
              <div className={`mb-2 ${weather.color}`}>
                {React.cloneElement(weather.icon, { className: "w-5 h-5 mx-auto" })}
              </div>
              <div className="text-xs font-bold text-white">{weather.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact sur le jeu */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Impact sur votre Label</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Événements</h4>
            <div className="text-sm text-white/70">
              {currentWeather.effects.eventBonus > 1 && (
                <span className="text-green-400">Bonus de succès: +{Math.round((currentWeather.effects.eventBonus - 1) * 100)}%</span>
              )}
              {currentWeather.effects.eventBonus < 1 && (
                <span className="text-red-400">Malus de succès: -{Math.round((1 - currentWeather.effects.eventBonus) * 100)}%</span>
              )}
              {currentWeather.effects.eventBonus === 1 && (
                <span className="text-gray-400">Aucun effet</span>
              )}
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Performances</h4>
            <div className="text-sm text-white/70">
              {currentWeather.effects.performanceBonus > 1 && (
                <span className="text-green-400">Bonus performance: +{Math.round((currentWeather.effects.performanceBonus - 1) * 100)}%</span>
              )}
              {currentWeather.effects.performanceBonus < 1 && (
                <span className="text-red-400">Malus performance: -{Math.round((1 - currentWeather.effects.performanceBonus) * 100)}%</span>
              )}
              {currentWeather.effects.performanceBonus === 1 && (
                <span className="text-gray-400">Aucun effet</span>
              )}
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Humeur des Artistes</h4>
            <div className="text-sm text-white/70">
              {currentWeather.effects.moodBonus > 0 && (
                <span className="text-green-400">Bonus humeur: +{Math.round(currentWeather.effects.moodBonus * 100)}%</span>
              )}
              {currentWeather.effects.moodBonus < 0 && (
                <span className="text-red-400">Malus humeur: -{Math.round(Math.abs(currentWeather.effects.moodBonus) * 100)}%</span>
              )}
              {currentWeather.effects.moodBonus === 0 && (
                <span className="text-gray-400">Aucun effet</span>
              )}
            </div>
          </div>

          <div className="glass rounded-lg p-4">
            <h4 className="font-bold text-white mb-2">Risques</h4>
            <div className="text-sm text-white/70">
              {currentWeather.effects.riskReduction < 1 && (
                <span className="text-green-400">Réduction risques: -{Math.round((1 - currentWeather.effects.riskReduction) * 100)}%</span>
              )}
              {currentWeather.effects.riskReduction > 1 && (
                <span className="text-red-400">Risques augmentés: +{Math.round((currentWeather.effects.riskReduction - 1) * 100)}%</span>
              )}
              {currentWeather.effects.riskReduction === 1 && (
                <span className="text-gray-400">Risques normaux</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSystem;