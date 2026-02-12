// Liste des artistes australiens fictifs avec leur style musical
const australiaArtists = [
  "Kael Sundown – Desert psych-rock",
  "Lara Saltbush – Indie-folk cinématographique",
  "Rogue Mulga – Outback blues-punk",
  "Talia Wavebreaker – Sunshine coast surf-pop",
  "Jasper Ironbark – Dark folk / gothic country",
  "Neon Billabong – Synthwave / retrowave austral",
  "Shae Coralith – Dreamy bedroom pop",
  "Dingo Circuit – Stoner rock / heavy psych",
  "Mira Nullarbor – Ambient drone / field recordings",
  "Cody Blackbutt – Aussie pub-rock revival",
  "Vesper Taipan – Dark electro-pop",
  "Finn Macadamia – Lo-fi indie surf",
  "Ash Wednesday – Post-punk noisy",
  "Sienna Ghostgum – Ethereal indie-folk",
  "Rusty Brumby – Alt-country / red dirt",
  "Luna Paperbark – Neo-soul / downtempo",
  "Jax Reefshadow – Tropical house / balearic beat",
  "Ember Wattle – Indie rock shoegaze",
  "Kai Sandstone – Garage rock / neo-psychedelia",
  "Zara Coolabah – Alt-R&B / future soul",
  "Thorne Devilwood – Doom metal austral",
  "Phoebe King tide – Coastal indie-pop",
  "Mitch Waratah – Grunge revival",
  "Elara Spinifex – Experimental electronica",
  "Brodie Saltpan – Trap / outback hip-hop",
  "Nova Coral – Hyperpop australien",
  "Griffin Bloodwood – Sludge / stoner doom",
  "Saffron Monsoon – Psytrance / forest techno",
  "Declan Jarrah – Modern bush balladeer",
  "Indigo Starling – Dream-pop / chillwave",
  "Rafferty Ochre – Acid folk / psych-folk",
  "Marlee Ghostnet – Hauntology / witch house",
  "Tyson Bluebush – Hard rock / classic Aussie pub anthems",
  "Ayla Firewheel – Art-pop / baroque indie",
  "Kieran Thunderbox – Big beat / breakcore austral",
  "Selene Mangrove – Neo-jazz / spiritual jazz",
  "Baxter Ironstone – Post-hardcore / math rock",
  "Freya Banksia – Sunshine indie-pop",
  "Cassian Dustveil – Desert rock / kyuss-core",
  "Liora Sheoak – Melodic post-rock",
  "Rohan Flatline – Darkwave / synth-punk",
  "Juniper Mallee – Alt-folk / anti-folk",
  "Zeke Currumbin – Aussie hip-hop / drill sud",
  "Marigold Seagrass – Lo-fi house",
  "Torin Black opal – Glam rock revival",
  "Echo Warrego – Slowcore / sad indie",
  "Sable Nightjar – Gothic blues",
  "Arlo Paper Daisy – Bubblegum bass / PC Music style",
  "Vera Saltlick – Krautrock australien",
  "Dax Ironclad – Heavy psych / doomgaze",
  "Nyx Brumby Dust – Trap-metal / rage",
  "Callan Reefbreak – Power-pop punk",
  "Seraphina Ochre Sky – Cinematic folktronica",
  "Bodie Spinifex Wire – Industrial techno",
  "Lennox Ghost Range – Noir jazz-rap"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomAustraliaArtists(count: number = 3): string[] {
  const shuffled = [...australiaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomAustraliaArtists(3);
console.log("Artistes australiens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { australiaArtists, selectRandomAustraliaArtists };