import React from 'react';
import { Equipment, EquipmentType, GameState } from '../types';
import { Building2, Guitar, Megaphone, Truck, Shield, Plus } from 'lucide-react';

interface EquipmentShopProps {
  gameState: GameState;
  onPurchaseEquipment: (equipment: Equipment) => void;
  onClose: () => void;
}

const EquipmentShop: React.FC<EquipmentShopProps> = ({ gameState, onPurchaseEquipment, onClose }) => {
  const getEquipmentIcon = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.Studio: return <Building2 className="w-5 h-5" />;
      case EquipmentType.Instruments: return <Guitar className="w-5 h-5" />;
      case EquipmentType.MarketingTools: return <Megaphone className="w-5 h-5" />;
      case EquipmentType.Transportation: return <Truck className="w-5 h-5" />;
      case EquipmentType.Security: return <Shield className="w-5 h-5" />;
    }
  };

  const availableEquipment: Equipment[] = [
    {
      id: 'basic_studio',
      type: EquipmentType.Studio,
      name: 'Studio Basique',
      description: 'Un petit studio d\'enregistrement pour améliorer la qualité de production.',
      cost: 50000,
      effects: { productionBonus: 10 },
      durability: 100
    },
    {
      id: 'professional_instruments',
      type: EquipmentType.Instruments,
      name: 'Instruments Professionnels',
      description: 'Équipement de haute qualité pour des sessions d\'enregistrement exceptionnelles.',
      cost: 75000,
      effects: { productionBonus: 15 },
      durability: 100
    },
    {
      id: 'marketing_suite',
      type: EquipmentType.MarketingTools,
      name: 'Suite Marketing',
      description: 'Outils avancés pour booster la visibilité de vos artistes.',
      cost: 100000,
      effects: { marketingBonus: 20 },
      durability: 100
    },
    {
      id: 'tour_bus',
      type: EquipmentType.Transportation,
      name: 'Bus de Tournée',
      description: 'Transport confortable pour vos artistes en tournée.',
      cost: 150000,
      effects: { reputationBonus: 5 },
      durability: 100
    },
    {
      id: 'security_team',
      type: EquipmentType.Security,
      name: 'Équipe de Sécurité',
      description: 'Protection pour vos événements et vos artistes.',
      cost: 80000,
      effects: { reputationBonus: 10 },
      durability: 100
    }
  ];

  const canAfford = (cost: number) => gameState.budget >= cost;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4">
      <div className="glass rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
              <Building2 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
              <span className="truncate">Boutique d'Équipement</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          <p className="text-white/60 mt-2 text-xs md:text-sm">Améliorez vos installations pour booster vos artistes !</p>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)] md:max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {availableEquipment.map((equipment) => (
              <div
                key={equipment.id}
                className="glass rounded-xl p-4 border border-white/10 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    {getEquipmentIcon(equipment.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{equipment.name}</h3>
                    <p className="text-sm text-white/70 mb-3">{equipment.description}</p>

                    <div className="space-y-2 mb-4">
                      {equipment.effects.productionBonus && (
                        <div className="text-sm text-blue-300">
                          🎵 +{equipment.effects.productionBonus}% Production
                        </div>
                      )}
                      {equipment.effects.marketingBonus && (
                        <div className="text-sm text-purple-300">
                          📈 +{equipment.effects.marketingBonus}% Marketing
                        </div>
                      )}
                      {equipment.effects.reputationBonus && (
                        <div className="text-sm text-yellow-300">
                          ⭐ +{equipment.effects.reputationBonus} Réputation
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-400">
                        {equipment.cost.toLocaleString()}€
                      </div>
                      <button
                        onClick={() => onPurchaseEquipment(equipment)}
                        disabled={!canAfford(equipment.cost)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Acheter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Équipement actuel */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Équipement Actuel</h3>
            {gameState.equipment.length === 0 ? (
              <p className="text-white/50 text-center py-8">Aucun équipement acheté</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameState.equipment.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        {getEquipmentIcon(equipment.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{equipment.name}</h4>
                        <div className="mt-2">
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${equipment.durability}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-white/50 mt-1">
                            Durabilité: {equipment.durability}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentShop;