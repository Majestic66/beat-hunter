// Liste des artistes britanniques fictifs avec leur style musical
const ukArtists = [
  "Calum Vex – Future Garage / Melodic Drum & Bass",
  "Elara Wren – Dream Pop / Ethereal Indie",
  "Knox Harrow – Darkwave / Post-Punk Revival",
  "Jaya Bleach – Hyperpop / Glitchcore",
  "The Salt Collective – Cinematic Folktronica",
  "Riley Voss – Liquid Drum & Bass",
  "Marlowe Grey – Indie Folk / Chamber Pop",
  "Sable Circuit – Synthwave / Retrowave",
  "Dizzee Flux – Grime / Drill fusion",
  "Aurora Veil – Ambient Pop / Shoegaze",
  "Tommy Kessler – Britpop revival / Indie Rock",
  "Nova Kestrel – UK Garage 2.0 / Bassline",
  "Wren & the Embers – Alt-R&B / Neo-Soul",
  "Caspian Reed – Post-Rock / Slowcore",
  "Byte Mistress – Experimental Electronica / IDM",
  "The Lads from Lewisham – Ladwave / Indie Sleaze revival",
  "Ivy Morgue – Gothic Trap / Dark Pop",
  "Declan Rush – Indie Dance / Nu-Disco",
  "Echo Pullman – Lo-Fi House",
  "Saffron Quill – Modern Folk / Indie Singer-Songwriter",
  "404 Saint – Cloud Rap / Trapsoul",
  "Velvet Kicks – Indie Rock / Power Pop",
  "Luka Thorne – UK Funky / Speed Garage",
  "Pale Sovereign – Blackgaze / Atmospheric Black Metal",
  "Mimi Luxe – Glam Rap / Bubblegum Bass",
  "The Northern Quell – Post-Britpop / Alternative Rock",
  "Juniper Code – Witch House / Drag",
  "Rory Kane – Acoustic Indie / Bedroom Pop",
  "Neon Shrike – Cyberpunk Synthpop",
  "Ghostwood – Dreampop / Slowed + Reverb",
  "McKoy & the Outlaws – UK Drill / Road Rap",
  "Florence Ash – Art Pop / Experimental",
  "Broken String – Math Rock / Post-Hardcore",
  "Zephyr Bloom – Chillwave / Balearic Beat",
  "Razor Parish – Industrial Techno",
  "Ellis Dawn – Indie Soul / Neo-Soul",
  "Vantablack Summer – Dark Synthpop / Coldwave",
  "The Brixton Jars – Ska-Punk / 2 Tone revival",
  "Lumen Drift – Progressive House",
  "Kael Vortex – UK Hardcore / Happy Hardcore revival",
  "Sparrow & Cinder – Alt-Country / Americana UK",
  "Cyanide Lullaby – Emo Rap / Trap",
  "Portobello Static – Indie Electronic / Wonky",
  "Maeve Hollow – Dark Folk / Nordic Noir vibes",
  "Glitch Minister – Breakcore / Jungle revival",
  "Alfie Crowe – Pub Rock / Classic Indie",
  "Opal Static – Hypnagogic Pop",
  "The Croydon Cutters – 140 BPM Grime / System Music",
  "Seraphine Frost – Baroque Pop / Art Rock",
  "Jude Mariner – Singer-Songwriter / Alt-Folk",
  "Nixie Vale – Bubblegum Bass / PC Music style",
  "The Manchester Fog – Post-Punk / Gothic Rock",
  "Theo Quill – UK Funk / Acid Jazz revival",
  "Raven Pulse – Drum & Bass / Neurofunk",
  "Lacey Thorn – Alt-Pop / Glitch Pop"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomUKArtists(count: number = 3): string[] {
  const shuffled = [...ukArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomUKArtists(3);
console.log("Artistes britanniques sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { ukArtists, selectRandomUKArtists };