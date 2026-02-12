// Service de simulation avec "Grok AI" intégré
// Génère des rookies fictifs avec des noms originaux et des personnalités variées

import { Talent, Genre, Personality, Release } from "../types";
import { frenchArtists } from "../utils/randomArtistSelector";

// Générateur de noms fictifs inspiré par Grok (logique créative et variée)
function generateArtistName(countryName: string, seed: number): string {
  if (countryName === 'France') {
    // Utiliser la liste des artistes français fournie
    const index = seed % frenchArtists.length;
    return frenchArtists[index].split(' – ')[0]; // Prendre seulement le nom, pas le style
  }

  const prefixes = {
    'France': ['Étoile', 'Lune', 'Soleil', 'Vent', 'Mer', 'Montagne', 'Rivière', 'Forêt', 'Ville', 'Art'],
    'United States': ['Star', 'Dream', 'Soul', 'Heart', 'Fire', 'Wind', 'Ocean', 'Mountain', 'City', 'Light'],
    'Japan': ['Sakura', 'Tsuki', 'Hoshi', 'Kaze', 'Umi', 'Yama', 'Mori', 'Kawa', 'Hana', 'Yume'],
    'Brazil': ['Sol', 'Mar', 'Coração', 'Fogo', 'Vento', 'Montanha', 'Floresta', 'Rio', 'Estrela', 'Lua'],
    'Nigeria': ['Lion', 'Eagle', 'Sun', 'Moon', 'River', 'Mountain', 'Forest', 'Star', 'Fire', 'Wind'],
    'South Korea': ['Byeol', 'Dal', 'Haet', 'Baram', 'Bada', 'San', 'Sup', 'Gang', 'Kkot', 'Kkum'],
    'United Kingdom': ['Rose', 'Thorn', 'Storm', 'Light', 'Shadow', 'Fire', 'Wind', 'Sea', 'Mountain', 'Star'],
    'Colombia': ['Sol', 'Luna', 'Estrella', 'Mar', 'Río', 'Montaña', 'Fuego', 'Viento', 'Flor', 'Sueño'],
    'Germany': ['Stern', 'Mond', 'Sonne', 'Wind', 'Meer', 'Berg', 'Wald', 'Fluss', 'Blume', 'Traum'],
    'South Africa': ['Lion', 'Eagle', 'Sun', 'Moon', 'River', 'Mountain', 'Forest', 'Star', 'Fire', 'Wind']
  };

  const suffixes = ['Beat', 'Wave', 'Flow', 'Sound', 'Vibe', 'Echo', 'Pulse', 'Rhythm', 'Groove', 'Harmony'];

  const countryPrefixes = prefixes[countryName as keyof typeof prefixes] || prefixes['United States'];
  const prefix = countryPrefixes[seed % countryPrefixes.length];
  const suffix = suffixes[(seed * 7) % suffixes.length];

  return `${prefix} ${suffix}`;
}

// Générateur de personnalités variées (inspiré par Grok - penseur créatif)
function generatePersonality(seed: number): Personality {
  const personalities: Personality[] = ['Ambitious', 'Humble', 'Stubborn', 'Greedy', 'Visionary'];
  return personalities[seed % personalities.length];
}

// Générateur de genres avec logique culturelle (Grok-style reasoning)
function generateGenre(countryName: string, seed: number): Genre {
  const countryGenres = {
    'France': ['Pop', 'Electro', 'Rock', 'Jazz', 'Hip-Hop'],
    'United States': ['Pop', 'Hip-Hop', 'Rock', 'R&B', 'Electro'],
    'Japan': ['J-Pop', 'Electro', 'Rock', 'Hip-Hop', 'Jazz'],
    'Brazil': ['Reggaeton', 'Pop', 'Hip-Hop', 'Afrobeat', 'Electro'],
    'Nigeria': ['Afrobeat', 'Hip-Hop', 'R&B', 'Pop', 'Electro'],
    'South Korea': ['K-Pop', 'Hip-Hop', 'R&B', 'Pop', 'Rock'],
    'United Kingdom': ['Pop', 'Rock', 'Hip-Hop', 'Electro', 'Jazz'],
    'Colombia': ['Reggaeton', 'Pop', 'Hip-Hop', 'R&B', 'Electro'],
    'Germany': ['Rock', 'Electro', 'Hip-Hop', 'Pop', 'Jazz'],
    'South Africa': ['Afrobeat', 'Hip-Hop', 'Rock', 'Electro', 'Pop']
  };

  const genres = countryGenres[countryName as keyof typeof countryGenres] || ['Pop', 'Hip-Hop', 'Electro', 'Rock', 'Jazz'];
  return genres[seed % genres.length] as Genre;
}

// Cache pour éviter de regénérer les mêmes artistes lors de visites répétées
const artistCache = new Map<string, Partial<Talent>[]>();

// Fonction principale utilisant "Grok AI" pour générer des rookies
export async function generateTalentsForCountry(countryName: string): Promise<Partial<Talent>[]> {
  // Simulation de délai réseau (comme un appel API Grok)
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

  const cacheKey = `${countryName}-${Date.now()}`;
  const numArtists = 5 + Math.floor(Math.random() * 3); // 5-7 artistes

  // Génère des artistes frais à chaque visite (inspiré par la créativité de Grok)
  const artists: Partial<Talent>[] = [];

  for (let i = 0; i < numArtists; i++) {
    const seed = Date.now() + i * 1000 + Math.floor(Math.random() * 1000);
    const name = generateArtistName(countryName, seed);
    const personality = generatePersonality(seed);
    const genre = generateGenre(countryName, seed);

    // Stats basées sur la personnalité et le genre (logique Grok-esque)
    const baseStats = {
      potential: 60 + Math.floor(Math.random() * 30), // 60-90
      fame: 5 + Math.floor(Math.random() * 20), // 5-25
      charisma: 60 + Math.floor(Math.random() * 35), // 60-95
      age: 18 + Math.floor(Math.random() * 12) // 18-30
    };

    // Ajustements selon personnalité
    if (personality === 'Ambitious') baseStats.potential += 10;
    if (personality === 'Visionary') baseStats.charisma += 5;
    if (personality === 'Humble') baseStats.fame -= 5;

    // Ajustements selon genre
    if (genre === 'K-Pop' || genre === 'J-Pop') baseStats.charisma += 10;
    if (genre === 'Rock') baseStats.potential += 5;
    if (genre === 'Jazz') baseStats.fame += 5;

    // Calcul des demandes financières (logique économique réaliste)
    const advanceBase = 20000 + (baseStats.potential * 200) + (baseStats.fame * 500);
    const royaltyBase = 8 + (baseStats.charisma / 20);

    const artist: Partial<Talent> = {
      name,
      age: baseStats.age,
      genre,
      potential: Math.min(100, baseStats.potential),
      fame: Math.min(50, baseStats.fame),
      charisma: Math.min(100, baseStats.charisma),
      personality,
      bio: generateBio(name, countryName, genre, personality, seed),
      requestedAdvance: Math.round(advanceBase * (0.8 + Math.random() * 0.4)),
      requestedRoyalty: Math.round(royaltyBase * 10) / 10,
      id: `${countryName}-${name.replace(/\s+/g, '-').toLowerCase()}-${seed}`,
      country: countryName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name + seed)}`,
      totalRevenue: 0,
      popularity: baseStats.fame,
      relationship: 50,
      releaseHistory: []
    };

    artists.push(artist);
  }

  // Cache pour cette session
  artistCache.set(cacheKey, artists);

  return artists;
}

// Générateur de bio créative (style Grok - descriptif et engageant)
function generateBio(name: string, country: string, genre: string, personality: string, seed: number): string {
  const bioTemplates = [
    `Jeune prodige ${genre.toLowerCase()} originaire de ${country}, connu pour son style unique et son charisme naturel.`,
    `Artiste émergent de ${country} qui révolutionne la scène ${genre.toLowerCase()} avec sa vision ${personality.toLowerCase()}.`,
    `Talent brut de ${country}, ${name} apporte une fraîcheur nouvelle au genre ${genre.toLowerCase()}.`,
    `Originaire de ${country}, ce ${genre.toLowerCase()}er ${personality.toLowerCase()} est prêt à conquérir le monde.`,
    `La révélation ${genre.toLowerCase()} de ${country}, ${name} séduit par son authenticité et son talent.`,
    `Artiste ${personality.toLowerCase()} de ${country} qui repousse les limites du ${genre.toLowerCase()}.`,
    `Nouveau venu talentueux de ${country}, ${name} apporte une touche innovante au ${genre.toLowerCase()}.`
  ];

  return bioTemplates[seed % bioTemplates.length];
}

// Négociations dynamiques avec réponses variées (style Grok - conversationnel)
export async function getNegotiationResponse(
  talent: Talent,
  offerAdvance: number,
  offerRoyalty: number,
  chatHistory: { role: 'user' | 'model', text: string }[]
): Promise<{ reply: string, accepted: boolean }> {
  // Simulation de négociation avec réponses variées
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

  const advanceRatio = offerAdvance / talent.requestedAdvance;
  const royaltyRatio = offerRoyalty / talent.requestedRoyalty;
  const averageRatio = (advanceRatio + royaltyRatio) / 2;

  // Réponses variées selon la personnalité
  const responses = {
    Ambitious: {
      accept: [
        "Parfait ! Cette offre montre que vous croyez en mon potentiel. Allons conquérir les charts !",
        "Excellent ! Je sens que c'est le début de quelque chose de grand. Je signe !",
        "Ça marche ! Avec cette avance, je vais pouvoir investir dans ma carrière. Top !"
      ],
      reject: [
        "Je vise les sommets, et cette offre ne reflète pas mes ambitions. On peut faire mieux.",
        "Mon potentiel mérite une meilleure reconnaissance. Augmentons un peu l'avance.",
        "Je suis ambitieux, et j'ai besoin d'un contrat qui me permette de briller vraiment."
      ],
      low: [
        "Pour quelqu'un d'ambitieux comme moi, cette offre est trop modeste. Parlons sérieusement.",
        "Mes objectifs sont élevés, et j'ai besoin d'un contrat qui me permette de les atteindre."
      ]
    },
    Humble: {
      accept: [
        "Je suis honoré par cette offre. Merci de croire en moi. Je signe avec plaisir !",
        "C'est plus que ce que j'espérais. Je suis reconnaissant et j'accepte.",
        "Je suis touché par votre confiance. Allons travailler ensemble !"
      ],
      reject: [
        "Je suis flatté, mais je pense que mon travail vaut un peu plus. Qu'en dites-vous ?",
        "Je reste humble, mais je sais que je mérite mieux. Pouvons-nous rediscuter ?",
        "Votre offre me touche, mais elle ne reflète pas complètement ma valeur."
      ],
      low: [
        "Je suis quelqu'un d'humble, mais même moi je sais que cette offre est trop basse.",
        "Je reste modeste, mais mon talent mérite une meilleure compensation."
      ]
    },
    Stubborn: {
      accept: [
        "Bon, d'accord. Mais c'est parce que je crois en ce projet. Ne me faites pas regretter.",
        "Très bien, je signe. Mais je fais les choses à ma façon, c'est clair ?",
        "Ok, ça passe. Mais ne touchez pas à ma vision artistique."
      ],
      reject: [
        "Je ne transige pas sur mes principes. Cette offre ne me convient pas.",
        "Je suis têtu, et je sais ce que je vaux. On peut faire mieux.",
        "Non, ça ne va pas. Je ne signe que si c'est à mes conditions."
      ],
      low: [
        "Ma détermination a un prix. Cette offre est insultante.",
        "Je suis inflexible sur mes valeurs. Il faut revaloriser cette proposition."
      ]
    },
    Greedy: {
      accept: [
        "Parfait ! Cette avance va me permettre de vivre comme je le mérite. Affaire conclue !",
        "Excellent ! Les royalties sont bonnes, l'avance aussi. Je signe immédiatement.",
        "Ça me va ! Avec cet argent, je vais pouvoir m'équiper comme il faut."
      ],
      reject: [
        "L'argent est important pour moi. Cette offre ne suffit pas à me motiver.",
        "Je suis pragmatique : il me faut plus pour que ça vaille le coup.",
        "Les chiffres ne sont pas là. Augmentons l'avance et on en reparle."
      ],
      low: [
        "Je ne suis pas du genre à travailler pour rien. Cette offre est ridicule.",
        "L'argent motive mes décisions. Il faut sérieusement revaloriser ça."
      ]
    },
    Visionary: {
      accept: [
        "Magnifique ! Cette collaboration va permettre à ma vision de prendre vie. J'accepte !",
        "Parfait ! Ensemble, nous allons créer quelque chose d'unique. Je signe !",
        "Cette offre me permet de réaliser mes rêves artistiques. Allons-y !"
      ],
      reject: [
        "Ma vision artistique mérite mieux. Pouvons-nous trouver un terrain d'entente ?",
        "Je vois loin, et cette offre ne correspond pas à l'impact que je veux avoir.",
        "Pour innover comme je l'entends, j'ai besoin d'un meilleur soutien financier."
      ],
      low: [
        "Mes idées révolutionnaires ont besoin de moyens. Cette offre est insuffisante.",
        "Pour changer l'industrie musicale, il me faut un contrat plus solide."
      ]
    }
  };

  const personalityResponses = responses[talent.personality as keyof typeof responses] || responses.Ambitious;

  let accepted = false;
  let reply = "";

  if (averageRatio >= 0.9) {
    accepted = true;
    reply = personalityResponses.accept[Math.floor(Math.random() * personalityResponses.accept.length)];
  } else if (averageRatio >= 0.7) {
    accepted = Math.random() > 0.4; // 60% chance d'accepter
    if (accepted) {
      reply = personalityResponses.accept[Math.floor(Math.random() * personalityResponses.accept.length)];
    } else {
      reply = personalityResponses.reject[Math.floor(Math.random() * personalityResponses.reject.length)];
    }
  } else {
    accepted = false;
    reply = personalityResponses.low[Math.floor(Math.random() * personalityResponses.low.length)];
  }

  return { reply, accepted };
}

// Conversations dynamiques avec les artistes (style Grok - conversationnel et varié)
export async function getArtistChatResponse(
  talent: Talent,
  chatHistory: { role: 'user' | 'model', text: string }[],
  actionType: 'chat' | 'renegotiate' | 'collab' = 'chat',
  context?: any
): Promise<{ reply: string, action?: any, relationshipChange: number }> {
  // Simulation de conversation avec réponses variées
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300));

  // Base de réponses selon la personnalité
  const personalityChats = {
    Ambitious: [
      "Je travaille dur tous les jours pour atteindre les sommets. La réussite ne vient pas toute seule !",
      "Mon objectif est clair : devenir une légende. Chaque décision compte.",
      "Je suis déterminé à laisser ma marque dans l'histoire de la musique.",
      "L'ambition me motive. Je ne m'arrête jamais avant d'avoir réussi.",
      "Chaque succès me rapproche de mon rêve ultime : dominer les charts mondiaux."
    ],
    Humble: [
      "Je suis reconnaissant pour chaque opportunité qui m'est donnée.",
      "Mes fans sont ma plus grande motivation. Leur soutien me touche énormément.",
      "Je reste fidèle à mes racines, peu importe le succès que j'obtiens.",
      "La musique est un cadeau que je partage avec plaisir.",
      "Je suis honoré d'avoir cette carrière, et je n'oublie jamais d'où je viens."
    ],
    Stubborn: [
      "Je fais les choses à ma façon, et ça a toujours marché pour moi.",
      "L'intégrité artistique passe avant tout. Je ne compromets pas mes valeurs.",
      "Je suis inflexible sur mes principes musicaux. C'est ce qui me définit.",
      "Les compromis ? Très peu pour moi. Je sais ce que je veux.",
      "Ma détermination m'a toujours mené là où je voulais aller."
    ],
    Greedy: [
      "Dans cette industrie, il faut savoir négocier pour obtenir ce qu'on mérite.",
      "L'argent est important, mais c'est aussi une reconnaissance de mon talent.",
      "Je sais ce que je vaux, et je m'assure que les contrats reflètent ça.",
      "Le succès se mesure aussi en chiffres. Je veille à ce qu'ils soient bons.",
      "Une carrière rentable est une carrière réussie, à mes yeux."
    ],
    Visionary: [
      "Je vois l'avenir de la musique différemment. L'innovation est ma passion.",
      "Chaque projet est une opportunité de repousser les limites artistiques.",
      "Je veux créer quelque chose qui marquera l'histoire de la musique.",
      "Ma vision transcende les genres traditionnels. C'est ça qui est excitant !",
      "L'art doit évoluer, et je suis là pour guider cette évolution."
    ]
  };

  const renegotiateResponses = {
    Ambitious: "Avec mes derniers succès, je pense qu'il est temps de rediscuter mon contrat. Je mérite plus !",
    Humble: "Je suis content de notre collaboration, mais peut-être qu'on pourrait ajuster un peu les termes ?",
    Stubborn: "Je ne transige pas sur mes conditions. Il faut renégocier maintenant.",
    Greedy: "Parlons argent. Mes performances récentes justifient une revalorisation.",
    Visionary: "Pour réaliser ma vision artistique complète, j'ai besoin d'un meilleur soutien."
  };

  const collabResponses = {
    Ambitious: "Une collaboration ? Seulement si ça m'aide à atteindre les sommets !",
    Humble: "J'aime travailler avec d'autres artistes. Ça enrichit toujours le projet.",
    Stubborn: "Ça dépend du projet. Il faut que ça corresponde à ma vision.",
    Greedy: "Si la collab rapporte bien, pourquoi pas ? Les synergies peuvent être profitables.",
    Visionary: "Une collaboration créative ? Voilà une idée qui pourrait être révolutionnaire !"
  };

  let reply = "";
  let relationshipChange = 0;

  switch (actionType) {
    case 'chat':
      const chats = personalityChats[talent.personality as keyof typeof personalityChats] || personalityChats.Ambitious;
      reply = chats[Math.floor(Math.random() * chats.length)];
      relationshipChange = Math.random() > 0.5 ? 1 : -1;
      break;

    case 'renegotiate':
      reply = renegotiateResponses[talent.personality as keyof typeof renegotiateResponses] || renegotiateResponses.Ambitious;
      relationshipChange = talent.personality === 'Stubborn' ? -2 : (talent.personality === 'Greedy' ? -1 : 0);
      break;

    case 'collab':
      reply = collabResponses[talent.personality as keyof typeof collabResponses] || collabResponses.Ambitious;
      relationshipChange = 1;
      break;
  }

  return { reply, relationshipChange };
}

// Résultats de sortie d'album dynamiques
export async function generateReleaseResult(
  talent: Talent,
  strategy: string,
  collaborators: Talent[] = []
): Promise<Release> {
  // Simulation de sortie d'album avec résultats variés
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

  const songTitles = [
    "Rêves Éveillés", "Coeur Sauvage", "Nuit Étoilée", "Danse Cosmique",
    "Âme Vagabonde", "Feu Intérieur", "Océan d'Émotions", "Tempête Créative",
    "Lumière Intérieure", "Mystère Universel", "Révolution Silencieuse", "Harmonie Chaotique",
    "Passion Dévorante", "Liberté Sauvage", "Avenir Incertain", "Échos du Passé",
    "Voix Interdite", "Rythme Tribal", "Mélodie Oubliée", "Vibration Éternelle"
  ];

  const impacts = [
    "Succès viral inattendu, les streams explosent !",
    "Critique unanime, reconnaissance artistique majeure",
    "Performance live exceptionnelle, tournée complète",
    "Collaboration remarquée, crossover réussi",
    "Innovation technique acclamée par la presse",
    "Croissance organique impressionnante",
    "Récompense surprise aux charts indépendants",
    "Buzz médiatique important, couverture presse",
    "Fanbase consolidée, engagement record",
    "Impact culturel notable dans la communauté"
  ];

  const songTitle = songTitles[Math.floor(Math.random() * songTitles.length)];
  const impact = impacts[Math.floor(Math.random() * impacts.length)];

  // Calcul basé sur le talent, la stratégie et les collaborateurs
  const baseBuzz = Math.min(100, talent.popularity + talent.potential / 3 + Math.random() * 25);
  const strategyMultiplier = strategy.includes('viral') ? 1.3 : strategy.includes('radio') ? 1.1 : 1.0;
  const buzz = Math.round(baseBuzz * strategyMultiplier + (collaborators.length * 8));

  const baseRevenue = 30000 + (talent.popularity * 150) + (buzz * 80) + (collaborators.length * 15000);
  const revenue = Math.round(baseRevenue * (0.7 + Math.random() * 0.6)); // Variation importante

  const reputationGain = Math.round(buzz / 12) + (collaborators.length * 3) + Math.floor(Math.random() * 5);

  return {
    id: `rel-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    songTitle,
    impact,
    revenue,
    reputationGain,
    buzz,
    date: Date.now(),
    collaborators: collaborators.map(c => c.id)
  };
}

// Génération de couvertures d'album
export async function generateCoverArt(songTitle: string, genre: string): Promise<string> {
  // Simulation de génération d'art
  await new Promise(resolve => setTimeout(resolve, 400));

  // Utilise DiceBear avec des paramètres variés pour des covers uniques
  const seed = encodeURIComponent(songTitle + genre + Date.now());
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=0f172a&foregroundColor=3b82f6`;
}

// News musicales dynamiques
export async function generateGlobalNews(): Promise<string> {
  // Simulation de news avec rotation variée
  const mockNews = [
    "Nouvelle vague de talents émergents secoue la scène musicale internationale !",
    "Streaming musical atteint des records historiques ce trimestre.",
    "Festival virtuel révolutionne l'expérience des concerts en ligne.",
    "Fusion improbable entre deux genres crée un phénomène viral.",
    "Intelligence artificielle compose son premier hit certifié platine.",
    "Artiste mystère dévoile son identité lors d'une performance légendaire.",
    "Tendance néo-soul domine les playlists des millennials.",
    "Collaboration intercontinentale bat tous les records de streams.",
    "Jeune prodige remporte tous les prix lors d'une cérémonie surprise.",
    "Mouvement underground devient mainstream en quelques semaines.",
    "Innovation technologique transforme la production musicale.",
    "Retour inattendu d'une légende oubliée crée l'événement.",
    "Prix musicaux récompensent l'innovation et la diversité.",
    "Plateforme de streaming lance un concours de talents mondial.",
    "Documentaire musical révèle les coulisses d'une carrière légendaire."
  ];

  // Simulation de délai réseau
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

  return mockNews[Math.floor(Math.random() * mockNews.length)];
}

// =====================================================================================
// ÉVÉNEMENTS ET COLLABORATIONS
// =====================================================================================

export async function generateRandomEvent(): Promise<GameEvent> {
  // Simulation d'événement aléatoire
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

  const eventTypes: GameEvent[] = [
    {
      id: 'event_' + Date.now(),
      type: 'Concert',
      title: 'Concert Surprise',
      description: 'Un concert improvisé attire une foule inattendue !',
      date: Date.now(),
      location: 'Ville aléatoire',
      participants: [],
      rewards: {
        budget: 15000,
        reputation: 5,
        experience: 20
      },
      requirements: {
        minReputation: 20
      }
    },
    {
      id: 'event_' + Date.now(),
      type: 'Festival',
      title: 'Festival Underground',
      description: 'Un petit festival local cherche des artistes émergents.',
      date: Date.now(),
      location: 'Festival Grounds',
      participants: [],
      rewards: {
        budget: 25000,
        reputation: 8,
        experience: 30
      },
      requirements: {
        minReputation: 15
      }
    },
    {
      id: 'event_' + Date.now(),
      type: 'AwardShow',
      title: 'Cérémonie de Remise de Prix',
      description: 'Une cérémonie locale récompense les talents musicaux.',
      date: Date.now(),
      location: 'Théâtre Municipal',
      participants: [],
      rewards: {
        budget: 10000,
        reputation: 12,
        experience: 25
      },
      requirements: {
        minReputation: 25
      }
    }
  ];

  return eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

export async function generateCollaboration(artist1: Talent, artist2: Talent): Promise<GameEvent> {
  // Simulation de collaboration
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

  const collaborationTitles = [
    `${artist1.name} x ${artist2.name} - Duo Explosif`,
    `Fusion ${artist1.genre}/${artist2.genre}`,
    `${artist1.name} featuring ${artist2.name}`,
    `Collaboration Surprise: ${artist1.name} & ${artist2.name}`
  ];

  return {
    id: 'collab_' + Date.now(),
    type: 'Collaboration',
    title: collaborationTitles[Math.floor(Math.random() * collaborationTitles.length)],
    description: `Une collaboration inattendue entre ${artist1.name} et ${artist2.name} crée des étincelles !`,
    date: Date.now(),
    location: 'Studio Secret',
    participants: [artist1.id, artist2.id],
    rewards: {
      budget: 30000,
      reputation: 15,
      experience: 40
    },
    requirements: {
      minReputation: 30
    }
  };
}

export async function generateSpecialization(talent: Talent): Promise<string> {
  // Simulation de spécialisation
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 300));

  const specializations = [
    'Maître du Flow Rap',
    'Reine des Ballades Émotionnelles',
    'Virtuose de la Guitare Électrique',
    'Producteur de Beats Innovants',
    'Chanteuse Soul Puissante',
    'DJ Techno Underground',
    'Auteur-Compositrice Folk Authentique',
    'Rockeur Rebelle',
    'Pop Star Charismatique',
    'Jazzman Improvisateur'
  ];

  return specializations[Math.floor(Math.random() * specializations.length)];
}

export async function generateExtendedChatResponse(
  artistName: string,
  personality: Personality,
  message: string,
  conversationHistory: string[],
  context: {
    mood: number;
    energy: number;
    recentEvents: string[];
    relationship: number;
  }
): Promise<string> {
  // Simulation de réponse étendue
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));

  const responses = {
    Ambitious: [
      `Écoute, ${message.toLowerCase().includes('argent') ? 'l\'argent est important mais' : 'je suis déterminé à'} réussir. Avec ${context.energy}% d'énergie, je suis prêt à tout donner !`,
      `Mon ambition me porte vers les sommets. ${context.mood > 70 ? 'Je me sens invincible !' : 'Je dois rester focus.'} Qu'est-ce qu'on fait maintenant ?`
    ],
    Creative: [
      `Ma créativité bouillonne ! ${context.energy > 50 ? 'Inspirons-nous de ce message pour créer quelque chose d\'incroyable.' : 'J\'ai besoin d\'un peu de repos pour retrouver mon inspiration.'}`,
      `L'art n'attend pas ! Avec mon imagination à ${context.mood}%, imaginons des concepts révolutionnaires ensemble.`
    ],
    Rebellious: [
      `Je refuse de suivre les règles établies. ${context.relationship < 50 ? 'On a nos différends, mais' : ''} je vais faire les choses à ma façon !`,
      `La rébellion est dans mon ADN. ${context.energy > 60 ? 'Préparons un coup d\'éclat !' : 'Je suis fatigué de me battre contre le système.'}`
    ]
  };

  const personalityResponses = responses[personality] || responses['Ambitious'];
  return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
}

// Fonction pour calculer les revenus SACEM mensuels
export function calculateSACEMRevenue(release: Release, artistPopularity: number): number {
  if (!release.streams || release.streams === 0) return 0;

  // Taux SACEM approximatif: environ 0.001€ par stream pour les artistes
  const baseRatePerStream = 0.001;

  // Multiplicateur basé sur la popularité de l'artiste (plus populaire = meilleurs taux)
  const popularityMultiplier = Math.max(0.5, artistPopularity / 50);

  // Bonus pour les albums vs singles
  const albumBonus = release.type === 'album' ? 1.2 : 1.0;

  // Calcul des streams mensuels (estimation basée sur le total)
  const monthlyStreams = release.monthlyStreams || Math.floor(release.streams / 12);

  // Revenus mensuels
  const monthlyRevenue = monthlyStreams * baseRatePerStream * popularityMultiplier * albumBonus;

  return Math.floor(monthlyRevenue);
}

// Fonction pour mettre à jour les revenus SACEM pour tous les artistes
export function updateAllSACEMRevenues(artists: Talent[]): Talent[] {
  return artists.map(artist => {
    const updatedReleases = artist.releaseHistory.map(release => {
      const monthlySACEM = calculateSACEMRevenue(release, artist.popularity || 0);
      const currentSACEM = release.sacemRevenue || 0;

      return {
        ...release,
        sacemRevenue: currentSACEM + monthlySACEM,
        // Simuler l'évolution des streams mensuels
        monthlyStreams: release.monthlyStreams || Math.floor(Math.random() * 100000) + 10000
      };
    });

    return {
      ...artist,
      releaseHistory: updatedReleases
    };
  });
}

// Fonction pour faire vieillir les artistes et gérer leur carrière
export function ageArtists(artists: Talent[]): Talent[] {
  return artists.map(artist => {
    const newAge = artist.age + 1;
    let updatedArtist = { ...artist, age: newAge };

    // Effets du vieillissement sur les statistiques
    if (newAge > 25 && newAge <= 35) {
      // Pic de carrière - bonus de popularité
      updatedArtist.popularity = Math.min(100, (updatedArtist.popularity || 0) + 2);
      updatedArtist.energy = Math.max(20, updatedArtist.energy - 1);
    } else if (newAge > 35 && newAge <= 45) {
      // Milieu de carrière - stabilité
      updatedArtist.energy = Math.max(15, updatedArtist.energy - 2);
      updatedArtist.mood = Math.max(20, updatedArtist.mood - 1);
    } else if (newAge > 45) {
      // Fin de carrière - déclin
      updatedArtist.energy = Math.max(10, updatedArtist.energy - 3);
      updatedArtist.popularity = Math.max(10, (updatedArtist.popularity || 0) - 1);
      updatedArtist.relationship = Math.max(10, updatedArtist.relationship - 2);
    }

    // Chance de retraite pour les artistes très âgés
    if (newAge > 50 && Math.random() < 0.1) {
      updatedArtist.retired = true;
    }

    return updatedArtist;
  });
}