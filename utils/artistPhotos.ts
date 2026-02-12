// Mapping des artistes français vers leurs photos
export const frenchArtistPhotos: { [key: string]: string } = {
  "Léo Vossière": "/artist-photos/Leo_Vossiere.png",
  "Clara Luneau": "/artist-photos/Clara_Luneau.png",
  "Malik Solère": "/artist-photos/Malik_Solere.png",
  "Aurore Valtier": "/artist-photos/Aurore_Valtier.png",
  "Théo Marivelle": "/artist-photos/Theo_Marivelle.png",
  "June Écarlate": "/artist-photos/June_Ecarlate.png",
  "Bastien Kael": "/artist-photos/Bastien_Kael.png",
  "Romane Duvivier": "/artist-photos/Romane_Duvivier.png",
  "Saphir Nøir": "/artist-photos/Saphir_Noir.png",
  "Elias Corva": "/artist-photos/Elias_Corva.png",
  "Maëlys Vorace": "/artist-photos/Maely_Vorace.png",
  "Victorien Luth": "/artist-photos/Victorien_Luth.png",
  "Alba Seren": "/artist-photos/Alba_Seren.png",
  "Noxx Velours": "/artist-photos/Noxx_Velours.png",
  "Gaspard Vif-Argent": "/artist-photos/Gaspard_Vif_Argent.png",
  "Lise Amarante": "/artist-photos/Lise_Amarante.png",
  "Kylian Drift": "/artist-photos/Kylian_Drift.png",
  "Solal Ember": "/artist-photos/Solal_Ember.png",
  "Mila Santore": "/artist-photos/Mila_Santore.png",
  "Antonin Brume": "/artist-photos/Antonin_Brume.png",
  "Zélie Tempête": "/artist-photos/Zelie_Tempete.png",
  "Ruben Kalé": "/artist-photos/Ruben_Kale.png",
  "Iris Moire": "/artist-photos/Iris_Moire.png",
  "Jérémy Sang-Froid": "/artist-photos/Jeremy_Sang_Froid.png",
  "Camille d'Ombre": "/artist-photos/Camille_d_Ombre.png",
  "Enzo Vortex": "/artist-photos/Enzo_Vortex.png",
  "Louane Cristal": "/artist-photos/Louane_Cristal.png",
  "Hadrien Lorge": "/artist-photos/Hadrien_Lorge.png",
  "Véra Silencieuse": "/artist-photos/Vera_Silencieuse.png",
  "Soren Astral": "/artist-photos/Soren_Astral.png",
  "Naomie Larme": "/artist-photos/Naomie_Larme.png",
  "Augustin Fiel": "/artist-photos/Augustin_Fiel.png",
  "Pénélope Étoile Noire": "/artist-photos/Penelope_Etoile_Noire.png",
  "Tancrède Luno": "/artist-photos/Tancrede_Luno.png"
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