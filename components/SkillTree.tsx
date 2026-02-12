import React from 'react';
import { Talent, Skill, SkillType } from '../types';
import { Zap, Music, Mic, TrendingUp, Users, Lightbulb } from 'lucide-react';

interface SkillTreeProps {
  talent: Talent;
  onSkillUpgrade: (skillType: SkillType) => void;
}

const SkillTree: React.FC<SkillTreeProps> = ({ talent, onSkillUpgrade }) => {
  const getSkillIcon = (type: SkillType) => {
    switch (type) {
      case SkillType.Production: return <Music className="w-4 h-4" />;
      case SkillType.Songwriting: return <Zap className="w-4 h-4" />;
      case SkillType.Performance: return <Mic className="w-4 h-4" />;
      case SkillType.Marketing: return <TrendingUp className="w-4 h-4" />;
      case SkillType.Networking: return <Users className="w-4 h-4" />;
      case SkillType.Innovation: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getSkillColor = (level: number) => {
    if (level >= 8) return 'text-purple-400';
    if (level >= 6) return 'text-blue-400';
    if (level >= 4) return 'text-green-400';
    if (level >= 2) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getUpgradeCost = (currentLevel: number) => {
    return currentLevel * 10000 + 5000; // Coût croissant
  };

  const canUpgrade = (skill: Skill) => {
    return skill.level < 10 && talent.experience >= getUpgradeCost(skill.level);
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Zap className="w-6 h-6 text-yellow-400" />
        Arbre de Compétences - Niveau {talent.level}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {talent.skills.map((skill) => (
          <div
            key={skill.type}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-violet-500/50 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${getSkillColor(skill.level)} bg-current/20`}>
                {getSkillIcon(skill.type)}
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">{skill.type}</h4>
                <p className={`text-xs ${getSkillColor(skill.level)}`}>
                  Niveau {skill.level}/10
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-violet-500 h-2 rounded-full transition-all"
                  style={{ width: `${(skill.experience / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/50 mt-1">
                XP: {skill.experience}/100
              </p>
            </div>

            {canUpgrade(skill) && (
              <button
                onClick={() => onSkillUpgrade(skill.type)}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xs py-2 px-3 rounded-lg transition-colors"
              >
                Améliorer ({getUpgradeCost(skill.level).toLocaleString()}€)
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <h4 className="font-semibold text-white mb-2">Spécialisation</h4>
        {talent.specialization ? (
          <p className="text-violet-300 font-medium">{talent.specialization}</p>
        ) : (
          <p className="text-white/50">Aucune spécialisation (se débloque au niveau 25)</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{talent.mood}%</div>
          <div className="text-xs text-white/50">Humeur</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{talent.energy}%</div>
          <div className="text-xs text-white/50">Énergie</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-2xl font-bold text-white">{talent.experience}</div>
          <div className="text-xs text-white/50">XP Total</div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;