// Liste des artistes coréens fictifs avec leur style musical
const southKoreaArtists = [
  "KYEJIN – Dark synth-pop / hyperpop",
  "LUNAR9 – Melodic trap / R&B",
  "SEOYUL – Indie folktronica",
  "VANTABLACK – Cyberpunk hip-hop",
  "JIHEON – Emotional hip-hop / lo-fi",
  "NEONWISH – Future bass / k-electro",
  "HAEWON – Dreamy city pop / synthwave",
  "CRIMSONVIBE – Alternative R&B / neo-soul",
  "NIGHTS – Darkwave / witch house",
  "MINSEO – Bubblegum bass / hyperpop",
  "DUSKBOY – Emo rap / sad trap",
  "YEORUM – Tropical house / summer pop",
  "NOIRBIT – Glitch-hop / experimental hip-hop",
  "SERYUNG – Bedroom pop / soft indie",
  "ECLIPSE7 – Boy group style – intense EDM-trap",
  "IVORYMOON – Ethereal wave / ambient pop",
  "KANGJOO – Boom bap revival / old-school hip-hop",
  "FLUOY – 2K pop / eurodance revival",
  "JAEYOON – Acoustic ballad / singer-songwriter",
  "SHADOWPLAY – Alternative R&B / dark pop",
  "AERI – Kawaii future bass / bubblegum hyperpop",
  "GRAYSCALE – Melancholic lo-fi hip-hop",
  "NEXXUS – Cyber-rap / drill K-hiphop",
  "SOHEE – Retro synth-pop 80s inspired",
  "MIDNIGHT K – Nightcore / speedcore pop",
  "YUNSEO – Indie rock / shoegaze",
  "PHANTOMIX – Trap metal / rage beat",
  "BLUEBERRY – Cute concept – sugary electropop",
  "SEOJUN – UK garage / 2-step influenced K-R&B",
  "VELVET ASH – Gothic pop / dark synth",
  "R1ZE – High-energy boy group dance-pop",
  "HANEUL – Healing ballad / piano R&B",
  "NEONHEART – Synth-pop / city pop moderne",
  "JUNGWOO – Lofi jazz hip-hop",
  "CRY.B – Sad girl indie pop",
  "Z3RO – Cyberpunk EDM / hardstyle influences",
  "MIYOUNG – Dream pop / shoegaze",
  "KILLJOY – Nu-metal trap / aggressive hip-hop",
  "DAHLIA – Elegant vocal R&B / diva style",
  "FROSTBYTE – Glitchcore / digicore",
  "TAEYANG – Old-school K-hiphop / storytelling",
  "AURORA V – Girl group – ethereal dance-pop",
  "404NOTFOUND – Deconstructed club / hyperpop extrême",
  "SEOWON – Folktronica / indietronica",
  "OBSIDIAN – Dark pop / industrial influences",
  "LUCID – Chillwave / vaporwave revival",
  "JIWOO – Teen crush pop / school concept",
  "BLACK IRIS – Mystery / cinematic dark pop",
  "RAINY8 – Rainy lo-fi / emotional hip-hop",
  "NEX7 – Next-gen boy group – intense EDM-hiphop"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomSouthKoreaArtists(count: number = 3): string[] {
  const shuffled = [...southKoreaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomSouthKoreaArtists(3);
console.log("Artistes coréens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { southKoreaArtists, selectRandomSouthKoreaArtists };