import React, { useState } from 'react';
import { GameState } from '../types';
import { Save, Download, Upload, Trash2, Calendar, HardDrive } from 'lucide-react';

interface SaveLoadSystemProps {
  gameState: GameState;
  onLoadGame: (saveData: GameState) => void;
}

interface SaveSlot {
  id: string;
  name: string;
  timestamp: number;
  gameState: GameState;
  version: string;
}

const SaveLoadSystem: React.FC<SaveLoadSystemProps> = ({ gameState, onLoadGame }) => {
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>(() => {
    const saved = localStorage.getItem('musicGameSaves');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const saveGame = (slotId?: string) => {
    const saveData: SaveSlot = {
      id: slotId || `save_${Date.now()}`,
      name: saveName || `Sauvegarde ${new Date().toLocaleDateString()}`,
      timestamp: Date.now(),
      gameState: { ...gameState },
      version: '1.0.0'
    };

    const updatedSlots = slotId
      ? saveSlots.map(slot => slot.id === slotId ? saveData : slot)
      : [...saveSlots, saveData];

    // Garder seulement les 10 dernières sauvegardes
    const trimmedSlots = updatedSlots
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    setSaveSlots(trimmedSlots);
    localStorage.setItem('musicGameSaves', JSON.stringify(trimmedSlots));
    setShowSaveDialog(false);
    setSaveName('');
  };

  const loadGame = (slot: SaveSlot) => {
    if (window.confirm('Êtes-vous sûr de vouloir charger cette sauvegarde ? Votre progression actuelle sera perdue.')) {
      onLoadGame(slot.gameState);
    }
  };

  const deleteSave = (slotId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) {
      const updatedSlots = saveSlots.filter(slot => slot.id !== slotId);
      setSaveSlots(updatedSlots);
      localStorage.setItem('musicGameSaves', JSON.stringify(updatedSlots));
    }
  };

  const exportSave = (slot: SaveSlot) => {
    const dataStr = JSON.stringify(slot, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `music_game_save_${slot.name.replace(/\s+/g, '_')}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData: SaveSlot = JSON.parse(e.target?.result as string);
        if (saveData.gameState && saveData.version) {
          const newSlot: SaveSlot = {
            ...saveData,
            id: `import_${Date.now()}`,
            timestamp: Date.now()
          };
          const updatedSlots = [newSlot, ...saveSlots].slice(0, 10);
          setSaveSlots(updatedSlots);
          localStorage.setItem('musicGameSaves', JSON.stringify(updatedSlots));
          alert('Sauvegarde importée avec succès !');
        } else {
          alert('Fichier de sauvegarde invalide.');
        }
      } catch (error) {
        alert('Erreur lors de l\'importation du fichier.');
      }
    };
    reader.readAsText(file);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSaveInfo = (slot: SaveSlot) => {
    const state = slot.gameState;
    return {
      talents: state.talents.length,
      budget: state.budget,
      level: Math.max(...state.talents.map(t => t.level), 0),
      achievements: state.achievements.filter(a => a.unlocked).length
    };
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <HardDrive className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Sauvegarde & Chargement</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions de sauvegarde */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Actions</h3>

          <div className="space-y-3">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="w-full flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              <div className="text-left">
                <div className="font-bold">Sauvegarder</div>
                <div className="text-sm text-green-100">Créer une nouvelle sauvegarde</div>
              </div>
            </button>

            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importSave}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-bold">Importer</div>
                  <div className="text-sm text-blue-100">Charger depuis un fichier</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => exportSave({
                id: 'export',
                name: 'Export actuel',
                timestamp: Date.now(),
                gameState,
                version: '1.0.0'
              })}
              className="w-full flex items-center gap-3 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <div className="text-left">
                <div className="font-bold">Exporter</div>
                <div className="text-sm text-purple-100">Télécharger la partie actuelle</div>
              </div>
            </button>
          </div>
        </div>

        {/* Liste des sauvegardes */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Sauvegardes ({saveSlots.length}/10)</h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {saveSlots.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                <HardDrive className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Aucune sauvegarde trouvée</p>
                <p className="text-sm">Créez votre première sauvegarde !</p>
              </div>
            ) : (
              saveSlots.map((slot) => {
                const info = getSaveInfo(slot);
                return (
                  <div
                    key={slot.id}
                    className="glass rounded-lg p-4 border border-white/10 hover:border-violet-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-white">{slot.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4" />
                          {formatDate(slot.timestamp)}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSave(slot.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-white/60">Talents:</span>
                        <span className="text-white ml-2">{info.talents}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Budget:</span>
                        <span className="text-green-400 ml-2">{info.budget.toLocaleString()}€</span>
                      </div>
                      <div>
                        <span className="text-white/60">Niveau max:</span>
                        <span className="text-blue-400 ml-2">{info.level}</span>
                      </div>
                      <div>
                        <span className="text-white/60">Succès:</span>
                        <span className="text-yellow-400 ml-2">{info.achievements}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => loadGame(slot)}
                        className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                      >
                        Charger
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSlot(slot.id);
                          setSaveName(slot.name);
                          setShowSaveDialog(true);
                        }}
                        className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Écraser
                      </button>
                      <button
                        onClick={() => exportSave(slot)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                      >
                        📁
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Dialog de sauvegarde */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedSlot ? 'Écraser la sauvegarde' : 'Nouvelle sauvegarde'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Nom de la sauvegarde</label>
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Ma superbe sauvegarde"
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50"
                  />
                </div>

                <div className="text-sm text-white/60">
                  Sauvegardera: {gameState.talents.length} talents, {gameState.budget.toLocaleString()}€, {gameState.achievements.filter(a => a.unlocked).length} succès
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => saveGame(selectedSlot || undefined)}
                  disabled={!saveName.trim()}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => {
                    setShowSaveDialog(false);
                    setSaveName('');
                    setSelectedSlot(null);
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveLoadSystem;