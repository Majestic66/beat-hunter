// Mapping des artistes français vers leurs photos
export const frenchArtistPhotos: { [key: string]: string } = {
  "Léo Vossière": "/artist-photos/léo Vossière.png",
  "Clara Luneau": "/artist-photos/Clara Luneau.png",
  "Malik Solère": "/artist-photos/Malik Solère.png",
  "Aurore Valtier": "/artist-photos/Aurore Valtier.png",
  "Théo Marivelle": "/artist-photos/Théo Marivelle.png",
  "June Écarlate": "/artist-photos/June Écarlate.png",
  "Bastien Kael": "/artist-photos/Bastien Kael.png",
  "Romane Duvivier": "/artist-photos/Romane Duvivier.png",
  "Saphir Nøir": "/artist-photos/Saphir Nøir.png",
  "Elias Corva": "/artist-photos/Elias Corva.png",
  "Maëlys Vorace": "/artist-photos/Maëlys Vorace.png",
  "Victorien Luth": "/artist-photos/Victorien Luth.png",
  "Alba Seren": "/artist-photos/Alba Seren.png",
  "Noxx Velours": "/artist-photos/Noxx Velours.png",
  "Gaspard Vif-Argent": "/artist-photos/Gaspard Vif-Argent.png",
  "Lise Amarante": "/artist-photos/Lise Amarante.png",
  "Kylian Drift": "/artist-photos/Kylian Drift.png",
  "Solal Ember": "/artist-photos/Solal Ember.png",
  "Mila Santore": "/artist-photos/Mila Santore.png",
  "Antonin Brume": "/artist-photos/Antonin Brume.png",
  "Zélie Tempête": "/artist-photos/Zélie Tempête.png",
  "Ruben Kalé": "/artist-photos/Ruben Kalé.png",
  "Iris Moire": "/artist-photos/Iris Moire.png",
  "Jérémy Sang-Froid": "/artist-photos/Jérémy Sang-Froid.png",
  "Camille d'Ombre": "/artist-photos/Camille d'Ombre.png",
  "Enzo Vortex": "/artist-photos/Enzo Vortex.png",
  "Louane Cristal": "/artist-photos/Louane Cristal.png",
  "Hadrien Lorge": "/artist-photos/Hadrien Lorge.png",
  "Véra Silencieuse": "/artist-photos/Véra Silencieuse.png",
  "Soren Astral": "/artist-photos/Soren Astral.png",
  "Naomie Larme": "/artist-photos/Naomie Larme.png",
  "Augustin Fiel": "/artist-photos/Augustin Fiel.png",
  "Pénélope Étoile Noire": "/artist-photos/Pénélope Étoile Noire.png",
  "Tancrède Luno": "/artist-photos/Tancrède Luno.png"
};

// Fonction pour obtenir l'avatar d'un artiste
export const getArtistAvatar = (artistName: string): string => {
  // Nettoyer le nom de l'artiste (enlever le style musical)
  const cleanName = artistName.split(' – ')[0].trim();

  // Vérifier si on a une photo pour cet artiste
  if (frenchArtistPhotos[cleanName]) {
    return frenchArtistPhotos[cleanName];
  }

  // Sinon, utiliser l'avatar générique
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanName)}`;
};