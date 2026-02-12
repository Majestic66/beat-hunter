// Service alternatif avec API Grok (quand elle sera disponible)
// ⚠️ xAI n'a pas encore rendu publique son API pour les développeurs externes
// Ce fichier montre comment intégrer Grok si/quand l'API devient disponible

/// <reference types="vite/client" />

import { Talent, Genre, Personality, Release } from "../types";

// Configuration pour l'API Grok (hypothétique)
const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const GROK_API_URL = "https://api.x.ai/v1"; // URL hypothétique

// Client Grok (à adapter selon la vraie API)
class GrokClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string, options?: any): Promise<string> {
    // Simulation d'appel API (à remplacer par la vraie implémentation)
    console.log("🔮 Appel API Grok avec prompt:", prompt);

    // Simulation de réponse (remplacer par vrai appel fetch)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Ici viendrait le vrai appel:
    /*
    const response = await fetch(`${GROK_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: "grok-1", // ou le nom du modèle réel
        messages: [{ role: "user", content: prompt }],
        max_tokens: options?.maxTokens || 1000,
        temperature: options?.temperature || 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
    */

    // Pour l'instant, retourner une réponse mock
    return "Réponse simulée de Grok - API pas encore disponible";
  }
}

const grokClient = new GrokClient(GROK_API_KEY || "demo-key");

// Fonction pour générer des talents avec Grok (version API)
export async function generateTalentsForCountryWithGrok(countryName: string): Promise<Partial<Talent>[]> {
  if (!GROK_API_KEY) {
    console.warn("⚠️ Clé API Grok manquante - utilisation du mode simulation");
    // Fallback vers la génération procédurale
    return generateTalentsForCountryFallback(countryName);
  }

  try {
    const prompt = `Tu es un expert en musique. Génère 6 artistes émergents fictifs de ${countryName}.
    Chaque artiste doit avoir:
    - Un nom original et créatif
    - Un âge entre 18-30 ans
    - Un genre musical populaire dans ce pays
    - Une personnalité (Ambitious, Humble, Stubborn, Greedy, Visionary)
    - Un potentiel (60-90)
    - Une célébrité (5-25)
    - Un charisme (60-95)
    - Une bio courte et accrocheuse
    - Une demande d'avance réaliste (20000-80000€)
    - Un pourcentage de royalties demandé (8-18%)

    Réponds en JSON valide avec un tableau d'artistes.`;

    const response = await grokClient.generateText(prompt, {
      maxTokens: 2000,
      temperature: 0.8 // Créativité pour des noms variés
    });

    const artists = JSON.parse(response);

    return artists.map((artist: any, index: number) => ({
      ...artist,
      id: `${countryName}-${artist.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}-${index}`,
      country: countryName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(artist.name)}`,
      totalRevenue: 0,
      popularity: artist.fame,
      relationship: 50,
      releaseHistory: []
    }));

  } catch (error) {
    console.error("❌ Erreur API Grok:", error);
    // Fallback en cas d'erreur
    return generateTalentsForCountryFallback(countryName);
  }
}

// Fonction de fallback (génération procédurale actuelle)
function generateTalentsForCountryFallback(countryName: string): Promise<Partial<Talent>[]> {
  // Copie de la logique procédurale actuelle
  return generateTalentsForCountry(countryName);
}

// Fonction pour négociations avec Grok
export async function getNegotiationResponseWithGrok(
  talent: Talent,
  offerAdvance: number,
  offerRoyalty: number,
  chatHistory: { role: 'user' | 'model', text: string }[]
): Promise<{ reply: string, accepted: boolean }> {

  if (!GROK_API_KEY) {
    return getNegotiationResponse(talent, offerAdvance, offerRoyalty, chatHistory);
  }

  try {
    const prompt = `Tu es ${talent.name}, un artiste ${talent.genre} ${talent.personality} de ${talent.country}.
    Ta demande initiale était ${talent.requestedAdvance}€ d'avance et ${talent.requestedRoyalty}% de royalties.
    L'offre proposée est ${offerAdvance}€ d'avance et ${offerRoyalty}% de royalties.

    En tant qu'artiste ${talent.personality}, réponds à cette offre de négociation.
    Sois cohérent avec ta personnalité:
    - Ambitious: Confiant et déterminé
    - Humble: Reconnaissant et modeste
    - Stubborn: Inflexible et direct
    - Greedy: Focalisé sur l'argent
    - Visionary: Idéaliste et créatif

    Réponds en français de manière naturelle et immersive.
    Décide si tu acceptes ou refuses l'offre.
    Format JSON: {"reply": "ta réponse", "accepted": true/false}`;

    const response = await grokClient.generateText(prompt, {
      maxTokens: 300,
      temperature: 0.7
    });

    return JSON.parse(response);

  } catch (error) {
    console.error("❌ Erreur négociation Grok:", error);
    return getNegotiationResponse(talent, offerAdvance, offerRoyalty, chatHistory);
  }
}

// Fonction pour conversations avec Grok
export async function getArtistChatResponseWithGrok(
  talent: Talent,
  chatHistory: { role: 'user' | 'model', text: string }[],
  actionType: 'chat' | 'renegotiate' | 'collab' = 'chat',
  context?: any
): Promise<{ reply: string, action?: any, relationshipChange: number }> {

  if (!GROK_API_KEY) {
    return getArtistChatResponse(talent, chatHistory, actionType, context);
  }

  try {
    let prompt = `Tu es ${talent.name}, un artiste ${talent.genre} ${talent.personality} de ${talent.country}.
    Relation actuelle avec le label: ${talent.relationship}/100.
    `;

    switch (actionType) {
      case 'chat':
        prompt += "Le producteur te dit bonjour et veut discuter. Réponds naturellement en français.";
        break;
      case 'renegotiate':
        prompt += "Le producteur veut rediscuter de ton contrat. Comment réagis-tu selon ta personnalité ?";
        break;
      case 'collab':
        prompt += `Le producteur propose une collaboration avec ${context?.collabArtist?.name || 'un autre artiste'}. Quel est ton avis ?`;
        break;
    }

    prompt += `
    Sois cohérent avec ta personnalité ${talent.personality}.
    Réponds en français de manière immersive et naturelle.
    Format JSON: {"reply": "ta réponse", "relationshipChange": nombre entre -5 et +5}`;

    const response = await grokClient.generateText(prompt, {
      maxTokens: 250,
      temperature: 0.8
    });

    return JSON.parse(response);

  } catch (error) {
    console.error("❌ Erreur conversation Grok:", error);
    return getArtistChatResponse(talent, chatHistory, actionType, context);
  }
}

// Fonction pour résultats d'album avec Grok
export async function generateReleaseResultWithGrok(
  talent: Talent,
  strategy: string,
  collaborators: Talent[] = []
): Promise<Release> {

  if (!GROK_API_KEY) {
    return generateReleaseResult(talent, strategy, collaborators);
  }

  try {
    const collabText = collaborators.length > 0 ? ` en collaboration avec ${collaborators.map(c => c.name).join(', ')}` : "";
    const prompt = `Génère le résultat d'une sortie single pour ${talent.name}${collabText}.
    Stratégie utilisée: ${strategy}
    Artiste: ${talent.genre}, popularité ${talent.popularity}/100, potentiel ${talent.potential}/100

    Crée un titre de chanson accrocheur, décris l'impact, estime les revenus réalistes,
    calcule le gain de réputation et le buzz généré.

    Format JSON: {
      "songTitle": "titre accrocheur",
      "impact": "description de l'impact",
      "revenue": nombre réaliste,
      "reputationGain": nombre entre 1-15,
      "buzz": nombre entre 10-100
    }`;

    const response = await grokClient.generateText(prompt, {
      maxTokens: 400,
      temperature: 0.6
    });

    const data = JSON.parse(response);
    return {
      ...data,
      id: `rel-${Date.now()}`,
      date: Date.now(),
      collaborators: collaborators.map(c => c.id)
    };

  } catch (error) {
    console.error("❌ Erreur génération album Grok:", error);
    return generateReleaseResult(talent, strategy, collaborators);
  }
}

// Fonction pour news avec Grok
export async function generateGlobalNewsWithGrok(): Promise<string> {
  if (!GROK_API_KEY) {
    return generateGlobalNews();
  }

  try {
    const prompt = "Génère une news flash originale sur l'industrie musicale actuelle. Fais-la concise, accrocheuse et en français. Maximum 15 mots.";

    const response = await grokClient.generateText(prompt, {
      maxTokens: 50,
      temperature: 0.9 // Plus créatif pour les news
    });

    return response.trim();

  } catch (error) {
    console.error("❌ Erreur génération news Grok:", error);
    return generateGlobalNews();
  }
}

// =====================================================================================
// FONCTIONS DE FALLBACK (versions procédurales actuelles)
// =====================================================================================

// Import des fonctions actuelles pour fallback
// (Ces fonctions sont définies plus bas dans le fichier actuel)

declare function generateTalentsForCountry(countryName: string): Promise<Partial<Talent>[]>;
declare function getNegotiationResponse(talent: Talent, offerAdvance: number, offerRoyalty: number, chatHistory: any[]): Promise<{ reply: string, accepted: boolean }>;
declare function getArtistChatResponse(talent: Talent, chatHistory: any[], actionType: string, context?: any): Promise<{ reply: string, action?: any, relationshipChange: number }>;
declare function generateReleaseResult(talent: Talent, strategy: string, collaborators?: Talent[]): Promise<Release>;
declare function generateGlobalNews(): Promise<string>;

// =====================================================================================
// COMMENT UTILISER CE FICHIER
// =====================================================================================

/*
Pour utiliser l'API Grok quand elle sera disponible :

1. Ajouter VITE_GROK_API_KEY dans le fichier .env
2. Modifier les imports dans App.tsx pour utiliser ces fonctions :
   import {
     generateTalentsForCountryWithGrok as generateTalentsForCountry,
     getNegotiationResponseWithGrok as getNegotiationResponse,
     getArtistChatResponseWithGrok as getArtistChatResponse,
     generateReleaseResultWithGrok as generateReleaseResult,
     generateGlobalNewsWithGrok as generateGlobalNews
   } from './services/grokService';

3. Quand l'API sera disponible, remplacer la simulation dans GrokClient.generateText()
   par le vrai appel fetch vers l'API xAI.

4. Adapter les paramètres selon la documentation officielle de xAI.
*/