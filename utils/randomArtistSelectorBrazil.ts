// Liste des artistes brésiliens fictifs avec leur style musical
const brazilArtists = [
  "Lucas Foguinho – Funk 150 BPM / 130 bpm pancadão",
  "Manuella Coração de Gelo – Trap funk / funk ostentação",
  "DJ Venom 011 – Drill funk carioca",
  "Vitória Preta – Afrobeats brasileiro / pisadinha 2.0",
  "Rafael Matuto – Forró universitário 2025",
  "Bia do Beco – Rap de quebrada / trap nacional",
  "MC Trovão – Funk melody melancólico",
  "Jade Amazônia – MPB psicodélica / neotropical",
  "Thiago 3000 – Sertanejo universitário + synthwave",
  "Larissa Trovão – Piseiro eletrônico",
  "Nego Júnior 777 – Funk proibidão old school revival",
  "Sofia Lua – Indie MPB / bedroom pop tropical",
  "DJ Saravá – Baile funk 150 + rave carioca",
  "Gabriel do Cerrado – Sertanejo roots 2.0",
  "Mariana Veneno – Pop pagode 2020s",
  "KVello – Hyperpop funk carioca",
  "Preto Velho Beats – Lo-fi samba / chill bossa",
  "Anitta do Interior – Forró eletrônico / pisadinha pop",
  "MC Caveira 2K – Funk 150 vertiginoso",
  "Léo Garoa – Samba-jazz contemporâneo",
  "Bruna Furacão – Funk pop girls",
  "DJ Matuta – Arrocha + pisadinha remix culture",
  "Nina do Mangue – Manguebeat revival / mangue digital",
  "Rasta Rael – Reggae roots brasileiro",
  "Clara Cerrado – Alt-country nordestino",
  "MC Fluxo 777 – Funk melody + plugg brasileiro",
  "Vitor Maré – Bossa nova eletrônica / nu jazz",
  "Tainá 300 – Afrobeat carioca / baile afro",
  "João do Fluxo – Funk ostentação old school",
  "Luna Caramelo – Pop tropical psicodélico",
  "DJ Chama – Funk 130 + Brazilian bass",
  "Yasmin do Morro – Rap feminino consciente",
  "Pedro Cantareira – Samba de roda moderno",
  "Bella Venenosa – Dark pop + trap funk",
  "MC Rajada – Funk 150 bala",
  "Estela do Sol – MPB solar / folk tropical",
  "DJ Piseiro 3000 – Piseiro acelerado + vaquejada beats",
  "Rafa Trem Bala – Emo-rap brasileiro",
  "Marina Abismo – Dream pop + bossa triste",
  "MC Veneno Preto – Drill + proibidão",
  "Sofia Mangueira – Samba eletrônico / tech-samba",
  "Luan do Piseiro – Piseiro sofrência 2026",
  "DJ Água de Coco – Chill baile funk",
  "Negra Gata – R&B brasileiro / afrobeats carioca",
  "Caio do Cerrado – Sertanejo melódico + trap",
  "Babi Furacão – Funk pop ostentação",
  "DJ 011 Fire – Brazilian phonk + funk",
  "Ísis do Mar – MPB oceânica / ambient tropical",
  "MC Tropa do 7 – Funk melody + auto-tune pesado",
  "Valentina Raiz – Neo-samba / samba de coco moderno",
  "DJ Krl 150 – Hyper-funk 160 bpm",
  "Mila do Fluxo – Girls trap / funk ostentação feminina",
  "Nattan Beats – Forró + phonk brasileiro",
  "Lua Preta – Afrofuturismo carioca",
  "MC Fumaça 2.0 – Funk proibidão + cloud rap",
  "DJ Vaquejada – Piseiro + Brazilian bass",
  "Ravi Sol – MPB lo-fi / sunset vibes",
  "Tati 300 – Trap funk girls power",
  "Gabriel Mangue – Manguebeat + hyperpop",
  "MC Noia 777 – Funk psicodélico / plugg funk"
];

// Fonction pour sélectionner aléatoirement 3 artistes
function selectRandomBrazilArtists(count: number = 3): string[] {
  const shuffled = [...brazilArtists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Exemple d'utilisation : sortir 3 noms aléatoires
const selectedArtists = selectRandomBrazilArtists(3);
console.log("Artistes brésiliens sélectionnés aléatoirement :");
selectedArtists.forEach(artist => console.log(artist));

export { brazilArtists, selectRandomBrazilArtists };