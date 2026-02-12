// Liste des artistes italiens fictifs avec leur style musical
const italyArtists = [
  "Lorenzo Velluto – Hyperpop / Glitch Pop",
  "Bianca Ferragni – Indie Electro-Pop",
  "Matteo Scintilla – Tech House / Melodic Techno",
  "Sofia Ramazzotti – Neo-Soul / Italian R&B",
  "Giulio Nottebuio – Darkwave / Synth-Rock",
  "Aurora Vespero – Dream Pop / Shoegaze",
  "Davide Calabrone – Trap Metal / Rage",
  "Valeria Ombrosa – Alternative R&B / Alt-Pop",
  "Nico Zafferano – Italo Disco revival / Nu-Disco",
  "Ginevra Lambrusco – Indie Folk / Chamber Folk",
  "Rocco Ventimiglia – Drill italien / Street Rap",
  "Elettra Fiorentino – Future Bass / Kawaii Future Bass",
  "Salvatore Brivido – Post-Punk / Coldwave",
  "Luna Caprese – Bedroom Pop / Lo-Fi Indie",
  "Fabio Temporale – Progressive Trance / Uplifting Trance",
  "Isabella Notturno – Dark Pop / Electropop sinistre",
  "Tommaso Riviera – Mediterranean House / Balearic Beat",
  "Chiara Velena – Hyper-Italian Trap / Auto-Tune melodic",
  "Enzo Smeraldo – Neo-Psychedelia / Psych Rock italien",
  "Martina Cenere – Grunge Pop / Alt-Rock 2020s",
  "Raffaele Ombra – Emo Rap / Sad Trap",
  "Vittoria Salice – Indie Electronica / Art Pop",
  "Carlo Burrasca – Hard Techno / Industrial Techno",
  "Serena Ligure – Chillwave / Vaporwave italien",
  "Diego Fiamma – Latin Trap / Reggaeton italien",
  "Alessandra Vento – Synthwave / Retrowave",
  "Bruno Calderone – Jazz Rap / Nu Jazz",
  "Flavia Crepuscolo – Witch House / Slowed + Reverb Pop",
  "Gabriele Arancino – UK Drill italien / Drill melodico",
  "Noemi Zampogna – Glam Pop / Hyper feminine pop",
  "Simone Lupo Nero – Gothic Trap / Dark Trap",
  "Camilla Stellare – Cosmic Pop / Space Pop",
  "Antonio Marea – Deep House / Organic House",
  "Lavinia Porpora – Baroque Pop / Art Pop orchestral",
  "Riccardo Fulmine – Punk Rap / Rapcore",
  "Giulia Sussurro – Whisper Pop / ASMR Pop",
  "Marco Velluto Rosso – Dark Italo Disco",
  "Beatrice Notte Stellata – Ethereal Wave / Neoclassical Darkwave",
  "Vito Scintilla Nera – Cloud Rap / PluggnB",
  "Stella d’Inverno – Sad Girl Winter Indie",
  "Kylo Romano – Sigilkore / Drain Gang italien",
  "Nova Bellini – Glitchcore / Digicore",
  "Zeno Afterlife – Afterlife-style Melodic Techno",
  "Mia Plastica – Plastik Pop / Bubblegum Bass",
  "Ludo Ferrite – Bitpop / Chiptune Trap",
  "Ambra Void – Voidwave / Depressive Synthpop",
  "Jace Sangiovanni – Jersey Club italien / Jerey Bounce",
  "Sole Eclissi – Eclipsecore / Hyperemotional Breakcore",
  "Rino Ketama – Ketama21 (Andalou Trap italien)",
  "Vera Limelight – Limelight Pop / TikTok hyperpop italien"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomItalyArtists(count: number = 3): string[] {
  const shuffled = [...italyArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomItalyArtists(3);
console.log("Artistes italiens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { italyArtists, selectRandomItalyArtists };