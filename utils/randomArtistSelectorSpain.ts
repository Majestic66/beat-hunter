// Liste des artistes espagnols fictifs avec leur style musical
const spainArtists = [
  "Lola Vendaval – Flamenco fusion / rumba catalana",
  "Nico Crestaño – Indie pop mediterráneo",
  "Mar de Sangre – Dark flamenco / post-flamenco",
  "Alejandro Vértice – Tech-house balearic",
  "La Niña de los Mil Suspiros – Copla contemporánea",
  "Rayo Eclipse – Trap flamenco",
  "Sombra y Sal – Neo-rumba / chill flamenco",
  "Javi Marea – Reggaetón canario",
  "Carmen Zarza – Indie folk andaluz",
  "Elías Ceniza – Rock psicodélico manchego",
  "Luz Malva – Dream pop valenciano",
  "Kiko Relámpago – Electrónica folclórica",
  "La Perla Gitana – Nuevo flamenco experimental",
  "Diego Brasas – Urban bachata española",
  "Alma Quebrá – Flamenco trap / drill flamenco",
  "Rita Calima – Pop electrónico mediterráneo",
  "Los Hijos del Viento – Rock rural extremeño",
  "Sofía Carbón – Cantautor dark-folk",
  "Milo Marea Baja – Lo-fi balearic house",
  "La Brisa Negra – Post-punk andaluz",
  "Txema Lucero – Indie rock gallego-español",
  "Nerea Salitre – Hyperpop flamenco",
  "El Duende Eléctrico – Flamencotrónica",
  "Valeria Candil – Bedroom pop valenciano",
  "Jota Ferralla – Hard techno gitano",
  "Luna Endrina – Bolero oscuro / neo-copla",
  "Raúl Ceniza Fría – Grime flamenco",
  "Las Sombras de Triana – Flamenco psicodélico",
  "Izan Marea Alta – Surf rock canario",
  "Paloma Hierro – Alt-country andaluz",
  "Neón Gitano – Synthwave flamenco",
  "Cruz de Almendra – Slowcore mediterráneo",
  "La Voz del Barranco – Post-rock manchego",
  "Malena Tormenta – Pop punk balear",
  "Sergio Brasero – Latin trap madrileño",
  "Carmencita Ros – R&B flamenco",
  "Los Ecos del Guadalquivir – Shoegaze andaluz",
  "Vera Salazón – Indie dance catalana",
  "El Niño de las Mil Luces – Hypertechno gitano",
  "Clara Vaho – Ambient folclórico",
  "Rocío Candente – Flamenco pop comercial",
  "Mateo Carbunclo – Garage rock asturiano-andaluz",
  "La Luna de Yeso – Dream folk ibérico",
  "Xavi Brasas – Reggaetón mallorquín",
  "Sangre de Níspero – Emo rap flamenco"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomSpainArtists(count: number = 3): string[] {
  const shuffled = [...spainArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomSpainArtists(3);
console.log("Artistes espagnols sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { spainArtists, selectRandomSpainArtists };