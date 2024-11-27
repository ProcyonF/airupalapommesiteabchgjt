// Utilisation de l'API Web Crypto qui est supportée par Edge Runtime
const tokenCache = new Map();

export const csrf = {
  generateToken: async () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    const expires = Date.now() + 3600000; // 1 heure
    tokenCache.set(token, expires);
    return token;
  },

  verifyToken: async (token) => {
    if (!token) return false;
    
    const expires = tokenCache.get(token);
    if (!expires) return false;
    
    if (Date.now() > expires) {
      tokenCache.delete(token);
      return false;
    }
    
    return true;
  },

  clearExpiredTokens: () => {
    const now = Date.now();
    for (const [token, expires] of tokenCache.entries()) {
      if (now > expires) {
        tokenCache.delete(token);
      }
    }
  }
};

// Nettoyer les tokens expirés toutes les heures
setInterval(() => csrf.clearExpiredTokens(), 3600000);
