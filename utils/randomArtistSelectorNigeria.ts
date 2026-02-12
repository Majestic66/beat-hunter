// Liste des artistes nigérians fictifs avec leur style musical
const nigeriaArtists = [
  "Zubby Blaze – Afrobeats / Street-Hop",
  "Láyọ́là – Neo-Highlife / Afro-Soul",
  "Dami Flex – Drill + Afrobeats",
  "Ayọ̀mídé Wave – Amapiano-Afrobeats fusion",
  "Kèmi Gold – Alté / Experimental R&B",
  "Oluwàseun Sizzle – Fuji-Pop",
  "VibeLord Tee – Afro-fusion / Dancehall",
  "Ẹniọlá Starboy – Street Afrobeats",
  "Princess Jhay – Afro-Pop mélodique",
  "Rasaki Vibes – Indigenous Afrobeat (Yoruba heavy)",
  "Chinaza Fire – Afro-Dancehall",
  "Bùsáyọ̀ The Lyrical – Conscious Afro-Hip Hop",
  "Tèmítọ́pẹ́ Bloom – Afro-Soul / Neo-Soul",
  "Young Alàó – Street-Hop / Afro-Drift",
  "Moreniké Honey – Afropop sensuel / R&B",
  "DJ + Artiste : SpinLord Kay – Afro-house / Amapiano",
  "Ìbùkúnlé Savage – Trapiano (Trap + Amapiano)",
  "Seyi Thunder – High-energy Afrobeats",
  "Adéọlá Midnight – Midnight R&B / Afro-fusion",
  "Zara D'Vibe – Afrobeats féminine puissante",
  "Ọlọ́runníyìí – Spiritual Afro-Folk / Apala moderne",
  "Khalidinho – Afro-Latin / Salsa-Afrobeat",
  "Baby Jhaymes – Hyper melodic Afrobeats",
  "Femi Wavvy – Chill Afrobeats / Bedroom pop",
  "Queen Aṣíwájú – Afro-Punk / Alté rock",
  "Ladi Pocolee – Gqom + Afro-drill",
  "Tòkìbíọ – Afro-jùjú revival",
  "Nedu Flame – Afro-Highlife moderne",
  "Viktor Oba – Afro-soul / Jazz-hop",
  "Shalewa Bad – Bad girl Afrobeats / Rap",
  "Korede Vice – Dark Trapiano",
  "Ayànfẹmi Keys – Piano-driven Amapiano",
  "Ẹwatomi Gold – Luxury Afrobeats",
  "Prince Ileri – Melodic street-hop",
  "Doyin Aura – Ethereal Afro-R&B",
  "Baddo Vibez – Party starter Afrobeats",
  "Tiwalọla Echo – Dreamy Afro-pop",
  "Skales Junior – Street Afro-fusion",
  "Mizé Love – Romantic Afro-soul",
  "Ọbá Wave – Royal Afro-trap",
  "Lekan Keys – Afro-jazz / Neo-soul",
  "Chioma Spark – Female rap / Afro-trap",
  "Yung Kuti – Afro-punk spirit",
  "Sànyà Groove – 90s Highlife revival",
  "Jéjé Fire – Fuji-trap fusion",
  "Ayanfeoluwa – Pure Yoruba Afro-folk",
  "Kaffy Drip – Fashion-forward Afrobeats",
  "Olamide Echo – Street legend style (mais fictif)",
  "Nifemi Star – Afro-R&B international",
  "Zamani Blaze – Afro-futurism / Electronic afrobeats",
  "Neon Alausa – Cyber Afrobeats 2028",
  "Lagos Drift – Drift Phonk + Amapiano",
  "Ìyàwó 2.0 – Hyperpop Afrobeats",
  "Ọmọ Oodua – Afro-nationalist trap",
  "Velvet Dami – Velvet Afrobeats (smooth)",
  "Kween Afua – Afro-grime",
  "Solarìs – Solar Afro-house",
  "Ẹlédùmarè Boy – Spiritual trap gospel",
  "VantaBlack Wiz – Dark Amapiano",
  "After Party Temi – After-hours Afrobeats"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomNigeriaArtists(count: number = 3): string[] {
  const shuffled = [...nigeriaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomNigeriaArtists(3);
console.log("Artistes nigérians sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { nigeriaArtists, selectRandomNigeriaArtists };