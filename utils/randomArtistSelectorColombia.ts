// Liste des artistes colombiens fictifs avec leur style musical
const colombiaArtists = [
  "Jairo Firecumbia – Cumbia rebajada / Cumbia digital",
  "Valeria La Brisa – Champeta urbana",
  "Mateo Ritmo Loco – Salsa choke",
  "Luna Mapalé – Afro-colombian fusion / Bullerengue moderno",
  "Elkin Boom Caribe – Reggaeton costero",
  "Sofía Candela – Vallenato pop",
  "DJ Guayabo – Guaracha colombiana",
  "Rosalba La Negra – Currulao electrónico",
  "Santiago Picante – Picante dembow",
  "Mariana Marañón – Joropo llanero experimental",
  "Kevin Flow 57 – Trap costeño",
  "La Perla del Pacífico – Chirimía futurista",
  "Diego El Rayo – Cumbia villera colombiana",
  "Isabella Sabrosura – Salsa caleña 2.0",
  "Los Gaiteros de Neón – Gaitas + synthwave",
  "Julián Puro Sabor – Porro pelado remix",
  "Camila Noche Caliente – Reggaeton romántico oscuro",
  "El Mago del Pacifico – Tambora afro-tech",
  "Valeria Kandela – Champeta criolla trap",
  "Juancho Marea Alta – Cumbia rebajada psicodélica",
  "Estrella del Sinú – Vallenato electrónico",
  "DJ Candelazo – Dembow + guaracha",
  "Renata Fuego Lento – Salsa sensual / bachata colombiana",
  "El Lobo de la Guajira – Wayuu folk-trap",
  "Sofi La Brava – Bullerengue house",
  "Miguel Sabor Andino – Bambuco chill",
  "La Mona Cumbiambera – Cumbia villera femenina",
  "Nico Terremoto – Salsa choke agresivo",
  "Daniela Río Abajo – Currulao downtempo",
  "El Príncipe del Casanare – Joropo trap",
  "Xiomara Sol Ardiente – Champeta romántica",
  "Los Muchachos del Barrio – Reggaeton old school 2020s",
  "Lina Marea – Cumbia amazónica experimental",
  "DJ Picante Picante – Dembow crudo Medellín",
  "Catalina La Brisa Marina – Porro electrónico",
  "El Tigre del Chocó – Afro-dembow",
  "Valentina Fuego Sagrado – Vallenato urbano",
  "Rasta Choco – Reggae champeta",
  "Mateo La Oscuridad – Trap paisa melancólico",
  "La Reina del Pacífico – Chirimía + drum & bass",
  "Elías Bomba Lenta – Salsa lenta / slow salsa",
  "Sara Cumbia Cósmica – Cumbia psicodélica",
  "DJ Marea Negra – Champeta brava",
  "Lorenzo El Caliente – Reggaeton perreo intenso",
  "Camila Flor de María – Bullerengue spiritual",
  "El Zorro Llanero – Joropo drill",
  "Daniela Pura Candela – Salsa choke femenina",
  "Los Niños del Barrio – Dembow callejero",
  "Aurora del Magdalena – Cumbia sinfónica",
  "Jhonatan Ritmo Salvaje – Guaracha + reggaeton",
  "Katalina Pixel – Cumbia hyperpop",
  "El Cuervo del Cauca – Afro-trap oscuro",
  "Milena EcoVallenato – Vallenato eco-acústico",
  "DJ Selva Dura – Amazonian bass",
  "La Diabla del Caribe – Champeta punk",
  "Santiago NeoGuayaba – Guaracha neoperreo",
  "Luna Emberá – Indigenous techno fusion",
  "El Fantasma de Barranquilla – Cumbia gótica",
  "Valeria 808 – Reggaeton 8-bit",
  "Los Últimos Gaiteros – Gaitas drill"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomColombiaArtists(count: number = 3): string[] {
  const shuffled = [...colombiaArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomColombiaArtists(3);
console.log("Artistes colombiens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { colombiaArtists, selectRandomColombiaArtists };