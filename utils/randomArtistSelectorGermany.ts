// Liste des artistes allemands fictifs avec leur style musical
const germanyArtists = [
  "Lukas Schatten – Darkwave / Coldwave",
  "NEONKINDER – Futurepop / Synthwave",
  "Sturm 808 – Industrial Techno / EBM",
  "Juli Sternstaub – Indie-Folktronica",
  "Kältewolf – Dark Ambient / Neoclassical Dark Wave",
  "Elektrohexe – Witch House / Occult Synth",
  "Berliner Dämmerung – Melancholic Post-Punk",
  "Acid Schwester – Acid House / Psytrance",
  "Grauzone Kollektiv – Minimal Techno",
  "Finn Wolkenbruch – Lo-Fi Indie Pop",
  "Nachtmahr – Hardtechno / Uptempo",
  "Silbersee – Dream Pop / Shoegaze",
  "Rammherz – Neue Deutsche Härte / Industrial Metal",
  "Polarlichter – Ambient Chillout / Nordic Electronica",
  "Broken Autobahn – Retrowave / Cyberpunk Synth",
  "Die Letzten Neonlichter – Synth-Pop / 80s Revival",
  "Eisenkinder – Post-Industrial / Noise",
  "Leni Frost – Hyperpop / Glitch Pop",
  "Schwarzwaldrauschen – Dark Folk / Neofolk",
  "Fluxus 3000 – Experimental IDM / Glitch",
  "Velvet Nebel – Dark Synthpop",
  "Ruhrpott Pulse – Hardstyle / Rawstyle",
  "Mondsucht – Psychedelic Trance",
  "Asche & Echo – Post-Rock / Post-Metal",
  "DJ Frostbite – Drum & Bass / Liquid",
  "Tristesse Elektronik – Downtempo / Trip-Hop",
  "Stahlregen – Aggrotech / Harsh EBM",
  "Lila Polaroid – Bedroom Pop / Pluggnb",
  "Ostwind Kollektiv – Krautrock Revival / Motorik",
  "Phantom DDR – Sovietwave / East German nostalgia synth",
  "Kaskaden – Progressive Trance",
  "Totenpass – Blackgaze / Post-Black Metal",
  "Neonleere – Vaporwave / Future Funk",
  "Schallmauer – Speedcore / Frenchcore",
  "Elias Nacht – Gothic Rock / Darkwave",
  "Glashimmel – Ethereal Wave / Heavenly Voices",
  "Ruinen Synth – Dungeon Synth / Medieval Ambient",
  "Bittere Himbeere – Hypertechno / Ghetto House",
  "Die Grauen Herren – Dark Electro / Oldschool EBM",
  "Nordlichtkid – Cloud Rap / German Trap",
  "Echo der Elbe – Post-Punk / Coldwave",
  "Kristalline Jugend – Future Bass / Kawaii Future Bass",
  "Stahlwittchen – Industrial Pop",
  "Mitternachtsautobahn – Night Synthwave / Darksynth",
  "Frequenz der Verlorenen – Witchcore / Sigilwave",
  "Rostkind – Cyber Metal / Nu-Metal revival",
  "Blaue Stunde – Chillwave / Balearic Beat",
  "Sturmgeist – Pagan Folk / Mittelalter Metal",
  "Pixelrauschen – Chiptune / 8-bit Techno",
  "Letzter Zug nach Nirgendwo – Melancholic Indie / Slowcore"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomGermanyArtists(count: number = 3): string[] {
  const shuffled = [...germanyArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomGermanyArtists(3);
console.log("Artistes allemands sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { germanyArtists, selectRandomGermanyArtists };