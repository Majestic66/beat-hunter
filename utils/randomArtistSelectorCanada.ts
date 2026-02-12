// Liste des artistes canadiens fictifs avec leur style musical
const canadaArtists = [
  "Jaxon Rivière – Indie folk nordique",
  "Léa Stormveil – Dream pop / shoegaze",
  "Kael Thunderchild – Post-rock atmosphérique",
  "Marisol Viau – Electro-lounge cinématographique",
  "Declan Frost – Maritime Celtic punk",
  "Soleil Arnaud – Hyperpop francophone",
  "Raven Whitethorn – Dark folk / gothic americana",
  "Milo Chenier – Lo-fi hip-hop jazzy",
  "Aurora Vigneault – Synthwave rétro-futuriste",
  "Theo Black Ice – Nu-metal alternatif",
  "Camille Lefèvre – Chanson québécoise moderne",
  "Nix Hollow – Witch house / darksynth",
  "Elliot Caribou – Indie rock psychédélique",
  "Zara Nightowl – R&B alternatif / alt-soul",
  "Finn MacTaggart – Trad Celtic électro",
  "Vesper Laurent – Baroque pop orchestral",
  "Juniper Sage – Bedroom folktronica",
  "Cassian Grey – Post-hardcore mélodique",
  "Éloise Rivest – French touch / filter house",
  "Tundra Vale – Ambient drone glacial",
  "Remy Laveau – Blues rock sud-canadien",
  "Nova Sterling – Glitch pop expérimental",
  "Isabeau Dumont – Neo-soul / jazz nu",
  "Cypress Boone – Alt-country hanté",
  "Lior Shalev – Électroacoustique minimaliste",
  "Sable Winters – Trap folk",
  "Étienne Moreau – Rock progressif québécois",
  "Lyra Borealis – Ethereal wave / neoclassical darkwave",
  "Knox Harbour – Garage rock revival",
  "Amara Snow – Hyperpop rage",
  "Gideon Frost – Blackgaze",
  "Clara Véranda – Indie pop solaire",
  "Rune Calder – Viking folk metal",
  "Maeve O’Callaghan – Celtic electro-pop",
  "Silas Driftwood – Slowcore mélancolique",
  "Phoenix Leduc – Future bass / melodic dubstep",
  "Velvet Roche – Dark disco",
  "Arlo Pembroke – Skramz / screamo",
  "Sabine Lumiere – Chanson introspective lo-fi",
  "Cobalt Reign – Industrial hip-hop",
  "Liora Vale – Art pop cinématographique",
  "Jasper North – Surf rock psychédélique",
  "Océane Duval – Tropical house francophone",
  "Thane Ironwood – Doom folk",
  "Eira Solvik – Nordic ambient pop",
  "Malik Sparrow – Drill canadien / trap sombre",
  "Violette Rain – Bubblegum bass",
  "Rowan Calderwood – Indie sleaze revival",
  "Bastien Lorrain – Post-punk cold wave",
  "Selene Marrow – Occult rock psychédélique",
  "Kieran Saltwind – Sea shanty punk",
  "Azelie Monet – French indie electronica",
  "Torin Blackwater – Sludge metal",
  "Lina Corbeau – Alt-R&B mystique",
  "Griffin Ember – Emo revival 2020s",
  "Ysmeine Frost – Medieval folktronica",
  "Dax Laurentide – Cloud rap québécois",
  "Brielle Ashwood – Sad girl indie",
  "Rune Vinter – Black metal atmosphérique",
  "Calixte Roy – Hyperpop trap métissé"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomCanadaArtists(count: number = 3): string[] {
  const shuffled = [...canadaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomCanadaArtists(3);
console.log("Artistes canadiens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { canadaArtists, selectRandomCanadaArtists };