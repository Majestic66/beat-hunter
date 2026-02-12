
export enum Genre {
  Pop = "Pop",
  HipHop = "Hip-Hop",
  Electro = "Electro",
  Rock = "Rock",
  Jazz = "Jazz",
  Reggaeton = "Reggaeton",
  KPop = "K-Pop",
  Afrobeat = "Afrobeat",
  Classical = "Classical",
  Country = "Country",
  Metal = "Metal",
  Punk = "Punk",
  Blues = "Blues",
  Folk = "Folk",
  EDM = "EDM",
  Trap = "Trap"
}

export enum EquipmentType {
  Studio = "Studio",
  Instruments = "Instruments",
  MarketingTools = "Marketing Tools",
  Transportation = "Transportation",
  Security = "Security"
}

export enum Personality {
  Ambitious = "Ambitious",
  Humble = "Humble",
  Stubborn = "Stubborn",
  Greedy = "Greedy",
  Visionary = "Visionary",
  Creative = "Creative",
  Rebellious = "Rebellious",
  Charismatic = "Charismatic",
  Perfectionist = "Perfectionist",
  Social = "Social"
}

export enum SkillType {
  Production = "Production",
  Songwriting = "Songwriting",
  Performance = "Performance",
  Marketing = "Marketing",
  Networking = "Networking",
  Innovation = "Innovation"
}

export enum EventType {
  Concert = "Concert",
  Festival = "Festival",
  AwardShow = "Award Show",
  Collaboration = "Collaboration",
  Scandal = "Scandal",
  Breakthrough = "Breakthrough",
  Tour = "Tour",
  AlbumRelease = "Album Release"
}

export interface Skill {
  type: SkillType;
  level: number; // 1-10
  experience: number; // 0-100
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  date: number;
  location?: string;
  participants: string[]; // Artist IDs
  rewards: {
    budget?: number;
    reputation?: number;
    experience?: number;
  };
  requirements: {
    minReputation?: number;
    minBudget?: number;
    skills?: SkillType[];
  };
}

export interface Equipment {
  id: string;
  type: EquipmentType;
  name: string;
  description: string;
  cost: number;
  effects: {
    productionBonus?: number;
    marketingBonus?: number;
    reputationBonus?: number;
    skillBonus?: SkillType;
  };
  durability: number; // 0-100
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewards: {
    budget?: number;
    reputation?: number;
    title?: string;
  };
}

export interface Release {
  id: string;
  songTitle: string;
  revenue: number;
  buzz: number;
  impact: string;
  date: number;
  cover?: string;
  collaborators?: string[]; // IDs des artistes
  type?: 'single' | 'album'; // Type de release
  trackCount?: number; // Nombre de pistes pour les albums
  streams?: number; // Nombre de streams total
  monthlyStreams?: number; // Streams mensuels
  releaseDate?: string; // Date de sortie format ISO
  sacemRevenue?: number; // Revenus SACEM cumulés
}

export interface Talent {
  id: string;
  name: string;
  age: number;
  country: string;
  genre: Genre;
  potential: number;
  fame: number;
  charisma: number;
  personality: Personality;
  bio: string;
  avatar: string;
  requestedAdvance: number;
  requestedRoyalty: number;
  totalRevenue?: number;
  popularity?: number;
  relationship: number; // 0-100 (Loyauté envers le label)
  releaseHistory: Release[];
  currentContract: Contract;
  level: number; // 1-50
  experience: number; // 0-1000
  skills: Skill[];
  mood: number; // 0-100 (Humeur générale)
  energy: number; // 0-100 (Énergie pour travailler)
  specialization?: string; // Spécialisation unique
  achievements: string[]; // IDs des achievements débloqués
  collaborations: string[]; // IDs des artistes avec qui il a collaboré
  retired?: boolean; // Si l'artiste a pris sa retraite
}

export interface Contract {
  artistId: string;
  advance: number;
  royalty: number;
  duration: number;
  status: 'active' | 'expired' | 'terminated';
}

export interface Player {
  id: string;
  name: string;
  labelName: string;
  budget: number;
  reputation: number;
  signedArtists: Talent[];
  score: number;
  achievements: Achievement[];
}

export interface GameState {
  labelName: string;
  budget: number;
  reputation: number;
  day: number;
  signedArtists: Talent[];
  notifications: string[];
  news: string;
  equipment: Equipment[];
  achievements: Achievement[];
  activeEvents: GameEvent[];
  completedEvents: string[]; // Event IDs
  gameMode: 'single' | 'multiplayer';
  players?: Player[]; // Pour le mode multijoueur
  marketTrends: {
    popularGenres: Genre[];
    emergingArtists: string[]; // Artist IDs
    economicClimate: 'boom' | 'normal' | 'recession';
  };
  worldTour: {
    active: boolean;
    currentLocation?: string;
    destinations: string[];
    progress: number;
  };
  // Nouveaux systèmes
  talents: Talent[]; // Liste complète des talents
  rivalLabels: RivalLabel[];
  quests: Quest[];
  weather: WeatherEffect;
  completedCollaborations: number;
  totalEarnings: number;
  fans: number;
  experience: number;
}

// Nouveaux types pour les systèmes ajoutés

export interface RivalLabel {
  id: string;
  name: string;
  specialty: Genre;
  country: string;
  popularity: number;
  revenue: number;
  talents: Talent[];
  rivalryLevel: number; // 0-100
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  rewards: string[];
  accepted: boolean;
  completed: boolean;
  progress?: number;
  type: 'career' | 'collaboration' | 'achievement';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
}

export interface WeatherEffect {
  type: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'windy';
  name: string;
  description: string;
  icon: any; // React component
  color: string;
  bgColor: string;
  effects: {
    eventBonus: number; // Multiplicateur pour les événements
    performanceBonus: number; // Multiplicateur pour les performances
    moodBonus: number; // Bonus/malus d'humeur
    riskReduction: number; // Multiplicateur des risques
  };
}

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  rewards: string[];
  completed: boolean;
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  category: 'recruitment' | 'finance' | 'popularity' | 'events' | 'diversity' | 'networking' | 'progression' | 'expansion';
}

export interface MiniGameResult {
  success: boolean;
  reward: number;
  experience: number;
}
