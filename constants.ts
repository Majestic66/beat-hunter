
export const INITIAL_BUDGET = 500000;
export const INITIAL_REPUTATION = 10;
export const COUNTRIES = [
  { id: 'USA', name: 'United States', coords: [35, -100] },
  { id: 'FRA', name: 'France', coords: [46, 2] },
  { id: 'JPN', name: 'Japan', coords: [36, 138] },
  { id: 'BRA', name: 'Brazil', coords: [-14, -51] },
  { id: 'NGA', name: 'Nigeria', coords: [9, 8] },
  { id: 'KOR', name: 'South Korea', coords: [36, 127] },
  { id: 'GBR', name: 'United Kingdom', coords: [55, -3] },
  { id: 'COL', name: 'Colombia', coords: [4, -74] },
  { id: 'DEU', name: 'Germany', coords: [51, 10] },
  { id: 'ZAF', name: 'South Africa', coords: [-30, 25] },
  { id: 'CAN', name: 'Canada', coords: [56, -106] },
  { id: 'AUS', name: 'Australia', coords: [-25, 133] },
  { id: 'IND', name: 'India', coords: [20, 78] },
  { id: 'MEX', name: 'Mexico', coords: [23, -102] },
  { id: 'ITA', name: 'Italy', coords: [41, 12] },
  { id: 'ESP', name: 'Spain', coords: [40, -4] }
];

export const GENRES = [
  "Pop", "Hip-Hop", "Electro", "Rock", "Jazz", "Reggaeton", "K-Pop", "Afrobeat",
  "Classical", "Country", "Metal", "Punk", "Blues", "Folk", "EDM", "Trap"
];

export const PERSONALITIES = [
  "Ambitious", "Humble", "Stubborn", "Greedy", "Visionary", "Creative",
  "Rebellious", "Charismatic", "Perfectionist", "Social"
];

export const SKILL_TYPES = [
  "Production", "Songwriting", "Performance", "Marketing", "Networking", "Innovation"
];

export const EVENT_TYPES = [
  "Concert", "Festival", "Award Show", "Collaboration", "Scandal", "Breakthrough", "Tour", "Album Release"
];

export const EQUIPMENT_TYPES = [
  "Studio", "Instruments", "Marketing Tools", "Transportation", "Security"
];

export const ACHIEVEMENTS = [
  {
    id: "first_artist",
    name: "Premier Signe",
    description: "Signez votre premier artiste",
    icon: "🎤",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewards: { reputation: 5 }
  },
  {
    id: "million_streams",
    name: "Millions de Streams",
    description: "Atteignez 1 million de streams totaux",
    icon: "📈",
    unlocked: false,
    progress: 0,
    maxProgress: 1000000,
    rewards: { budget: 100000 }
  },
  {
    id: "world_tour",
    name: "Tournée Mondiale",
    description: "Organisez une tournée mondiale complète",
    icon: "🌍",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewards: { reputation: 20 }
  },
  {
    id: "legendary_artist",
    name: "Artiste Légendaire",
    description: "Développez un artiste jusqu'au niveau 50",
    icon: "👑",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewards: { reputation: 50, title: "Producteur Légendaire" }
  }
];

export const MARKET_TRENDS = {
  popularGenres: ["Pop", "Hip-Hop", "EDM"],
  emergingArtists: [],
  economicClimate: "normal" as const
};
