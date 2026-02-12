// Liste des artistes sud-africains fictifs avec leur style musical
const southAfricaArtists = [
  "Zanele Khumalo – Amapiano",
  "Thabo Deepstep – 3-Step",
  "Lindiwe Maskandi Queen – Maskandi moderne",
  "Sipho Gqomfire – Gqom",
  "Nokwanda Afrohouse – Afro House",
  "Vusi 3Step Lord – 3-Step / Amapiano",
  "Nomvula Basskazi – Amapiano deep",
  "Kagiso Lekompo – Lekompo",
  "Zinhle Soulfire – Afro-soul / Neo-soul",
  "Mthunzi Trapiano – Trap + Amapiano",
  "Hlengiwe Vocalz – Isicathamiya / Gospel house",
  "Banele Bacardi – Bacardi house",
  "Sbu Log Drum King – Amapiano",
  "Themba Afro Tech – Afro Tech",
  "Nandi Maskandi Heart – Maskandi",
  "Jabulani Gqomflex – Gqom / Broken beat",
  "Lungelo 3Step Wave – 3-Step",
  "Zandile Piano Princess – Amapiano",
  "Siyabonga Street Soul – Kwaito revival",
  "Phindiwe Afro Pop – Afropop sud-africain",
  "Mandla Deep House – SA Deep House",
  "Nompumelelo Vocal Queen – Afro-soul",
  "Bongani Maskandi Rebel – Maskandi fusion",
  "Thulisile Amapiano Rose – Amapiano féminin",
  "Sizwe Gqom Beast – Gqom",
  "Ntombi 3Step Diva – 3-Step",
  "Vuyo Log God – Amapiano",
  "Zodwa Township Groove – Kwaito / Bubblegum",
  "Musa Afro Jazz – Afro-jazz contemporain",
  "Nokuthula Soul Mama – Neo-soul / R&B",
  "Sanele Broken Bass – Gqom-tech",
  "Lethabo Piano Prince – Amapiano",
  "Nomthandazo Gospel Step – Gospel + 3-Step",
  "Khaya Maskandi Star – Maskandi",
  "Ayanda Afroswing – Afro-swing / Amapiano",
  "Dumile Deep Piano – Amapiano deep",
  "Zweli Gqom Warrior – Gqom",
  "Busisiwe 3Step Queen – 3-Step",
  "Mzikayise Trap Zulu – Trap sud-africain",
  "Ncediswa Vocal Waves – Afro-soul",
  "Sphiwe House Dreamer – Afro House",
  "Thandeka Maskandi Flow – Maskandi moderne",
  "Lwandile Amapiano Ghost – Amapiano mélancolique",
  "Nqobile Lekompo Energy – Lekompo",
  "Bhekumuzi Street King – Kwaito / Hip-hop",
  "Zanele 3Step Butterfly – 3-Step",
  "Mbalenhle Piano Soul – Amapiano / Soul",
  "Sandile Gqom Shadow – Gqom dark",
  "Nomfundo Afro Roots – Afro-fusion",
  "Vumile Maskandi Legend – Maskandi",
  "Sthandiwe Deep Vibes – Deep House / Amapiano",
  "Jabulile 3Step Fire – 3-Step",
  "Lungisani Bass Prophet – Amapiano",
  "Thobile Vocal Storm – Afro-soul puissant",
  "Siyanda Piano Warrior – Amapiano",
  "Nokukhanya Maskandi Light – Maskandi",
  "Mfanafuthi Gqom Lord – Gqom",
  "Zinhle 3Step Empress – 3-Step",
  "Bonginkosi Afro Future – Afro-futurism / Amapiano",
  "Nombuso Soul Echo – Neo-soul"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomSouthAfricaArtists(count: number = 3): string[] {
  const shuffled = [...southAfricaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomSouthAfricaArtists(3);
console.log("Artistes sud-africains sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { southAfricaArtists, selectRandomSouthAfricaArtists };