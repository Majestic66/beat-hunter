// Liste des artistes américains fictifs avec leur style musical
const usArtists = [
  "Jaxon Creed – Trap Metal / Screamo Rap",
  "Kiera Voss – Darkwave / Synth-Pop",
  "Malik J. Ruin – Drill / Chicago Drill",
  "Nova Saint – Hyperpop / Glitch Pop",
  "Caleb Thorn – Southern Gothic Country",
  "Echo Valentine – Dream Pop / Shoegaze",
  "Zane Stryker – Nu-Metal Revival",
  "Riley Ashwood – Bedroom Pop / Indie Folk",
  "Dante Cross – Emo Rap / SoundCloud Rap",
  "Sienna Blaze – Alt-R&B / Trap-Soul",
  "Jericho Kane – Outlaw Country / Red Dirt",
  "Lyla Neon – Electropop / Future Bass",
  "Maddox Riven – Post-Hardcore / Metalcore",
  "Aurora Kane – Indie Synthwave / Retrowave",
  "Travis Wolffe – Modern Outlaw Rap",
  "Sage Holloway – Alt-Country / Americana",
  "Vesper Quinn – Witch House / Dark Electronic",
  "Colt Ramsey – Bro-Country / Modern Nashville",
  "Indigo Frost – Lo-Fi Hip Hop / Chillhop",
  "Roman Vice – Industrial Hip-Hop",
  "Harper Sloan – Midwest Emo / Math Rock",
  "Knox Rivera – Latin Trap / Reggaeton",
  "Juniper Vale – Folk-Pop / Indie Folk",
  "Blaze Harlan – Crunk Revival / Southern Hip-Hop",
  "Seraphine Noir – Dark R&B / Alternative R&B",
  "Gunner Holt – Deathcore / Beatdown",
  "Ivy Marlowe – Sad Girl Indie / Chamber Pop",
  "Phoenix Draven – Cyberpunk Rap / Trap Metal",
  "Tatum Grey – Glitchcore / Digicore",
  "Wilder Boone – Stoner Rock / Desert Rock",
  "Lyric Storm – Pop Punk 2020s",
  "Caspian Reed – Progressive House / Melodic Techno",
  "Raven Solace – Gothic Folk / Neofolk",
  "Jett Maverick – Skate Punk / Pop-Punk",
  "Opal Kingsley – Neo-Soul / Jazz Rap",
  "Diesel Vance – Hard Trap / Rage Beats",
  "Luna Sterling – Ethereal Wave / Ambient Pop",
  "Barrett Slade – Heartland Rock",
  "Nova Rykker – Cloud Rap / Pluggnb",
  "Shiloh Reign – Christian Trap / Holy Hip-Hop",
  "Cruz Navarro – Chicano Rap / West Coast Hip-Hop",
  "Winter Ashe – Sadcore / Slowcore",
  "Talon Jericho – Nu Jazz / Jazztronica",
  "Ember Lux – Hyperpop Rap",
  "Gideon Black – Doom Trap / Phonk",
  "Scarlett Vibe – Disco-Pop / Nu-Disco",
  "Boone Carver – Swamp Rock / Southern Rock Revival",
  "Zephyr Kane – Vaporwave / Future Funk",
  "Marlowe Sage – Indie Rock / Post-Punk Revival",
  "Azrael Dawn – Blackgaze / Post-Black Metal",
  "Kairo glitch – Signwave / Flashcore",
  "Monroe Drift – Memphis Phonk / Drift Phonk",
  "Saffron Pulse – Jersey Club / Baltimore Club",
  "Jericho Flux – Breakcore / Extratone",
  "Nova Killjoy – Scene Revival / Crunkcore",
  "Aspen Void – Depressive Lo-Fi",
  "Riven Cole – Midwest Rap / Chopped & Screwed",
  "Lux Ventura – Miami Bass 2.0",
  "Sterling Crowe – Dark Pop / Alt-Pop",
  "Jaxon Grave – Horrorcore / Trap Metal"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomUSArtists(count: number = 3): string[] {
  const shuffled = [...usArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomUSArtists(3);
console.log("Artistes américains sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { usArtists, selectRandomUSArtists };