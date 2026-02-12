// Liste des artistes français fictifs avec leur style musical
const frenchArtists = [
  "Léo Vossière – Électro-pop mélancolique",
  "Clara Luneau – Indie folk cinématographique",
  "Malik Solère – Rap cloud / trap mélodique",
  "Aurore Valtier – Chanson française moderne / soul",
  "Théo Marivelle – French touch / nu-disco",
  "June Écarlate – Dark synthwave / retrowave",
  "Bastien Kael – Hyperpop francophone",
  "Romane Duvivier – Variété introspective 2020s",
  "Saphir Nøir – Drill français / drill mélodique",
  "Elias Corva – Lo-fi hip-hop / beatmaking nocturne",
  "Maëlys Vorace – Electropunk / glitch-pop",
  "Victorien Luth – Neo-soul / jazz rap",
  "Alba Seren – Dream pop / shoegaze léger",
  "Noxx Velours – Dark R&B / alt-trap",
  "Gaspard Vif-Argent – Rap alternatif / boom bap littéraire",
  "Lise Amarante – Chanson à texte / pop baroque",
  "Kylian Drift – Jersey club français / baile funk",
  "Solal Ember – Post-punk revival / cold wave",
  "Mila Santore – Italo-disco revival / synth-pop",
  "Antonin Brume – Ambient folk / post-rock doux",
  "Zélie Tempête – Punk-pop / pop-punk français",
  "Ruben Kalé – Afrobeats / amapiano francophone",
  "Iris Moire – Art-pop expérimental",
  "Jérémy Sang-Froid – Trap métal / rage",
  "Camille d’Ombre – Gothic folk / dark folk",
  "Enzo Vortex – French rap old school 2025",
  "Louane Cristal – Bedroom pop / indie sleaze",
  "Hadrien Lorge – Jazztronica / nu jazz",
  "Véra Silencieuse – Minimal techno / deep techno",
  "Soren Astral – Synthwave narratif / cyberpunk",
  "Naomie Larme – Emo rap / sad trap",
  "Augustin Fiel – Chanson réaliste moderne",
  "Pénélope Étoile Noire – Witch house / dark pop",
  "Tancrède Luno – Rock psychédélique français"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomArtists(count: number = 3): string[] {
  const shuffled = [...frenchArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomArtists(3);
console.log("Artistes sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { frenchArtists, selectRandomArtists };