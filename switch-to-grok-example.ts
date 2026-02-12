// Exemple : Comment basculer vers l'API Grok quand elle sera disponible
// Dans App.tsx, remplace l'import :

/*
// VERSION ACTUELLE (procédurale) :
import { generateTalentsForCountry, generateGlobalNews } from './services/geminiService';
*/

// VERSION GROK (quand API disponible) :
/*
import {
  generateTalentsForCountryWithGrok as generateTalentsForCountry,
  generateGlobalNewsWithGrok as generateGlobalNews,
  getNegotiationResponseWithGrok as getNegotiationResponse,
  getArtistChatResponseWithGrok as getArtistChatResponse,
  generateReleaseResultWithGrok as generateReleaseResult
} from './services/grokService';
*/

// Puis dans .env, ajoute :
// VITE_GROK_API_KEY=votre_clé_api_xai_ici

export const SWITCH_TO_GROK_INSTRUCTIONS = `
📋 Instructions pour passer à Grok :

1. Obtiens une clé API de xAI (quand disponible)
2. Ajoute VITE_GROK_API_KEY=ta_clé dans .env
3. Modifie les imports dans App.tsx (voir ci-dessus)
4. Modifie les imports dans les composants qui utilisent ces fonctions
5. Reconstruis avec npm run build
6. Teste !

⚠️ Actuellement, xAI n'a pas rendu publique son API pour les développeurs externes.
`;