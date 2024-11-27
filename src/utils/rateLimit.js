const rateLimit = new Map();

export const rateLimiter = {
  checkRateLimit: (ip, limit = 100, window = 900000) => { // 15 minutes par défaut
    const now = Date.now();
    const windowStart = now - window;
    
    // Nettoyer les anciennes entrées
    for (const [key, timestamps] of rateLimit.entries()) {
      const filtered = timestamps.filter(ts => ts > windowStart);
      if (filtered.length === 0) {
        rateLimit.delete(key);
      } else {
        rateLimit.set(key, filtered);
      }
    }
    
    // Vérifier et mettre à jour le rate limit
    const timestamps = rateLimit.get(ip) || [];
    const recentRequests = timestamps.filter(ts => ts > windowStart);
    
    if (recentRequests.length >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(timestamps[0] + window)
      };
    }
    
    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
    
    return {
      allowed: true,
      remaining: limit - recentRequests.length,
      resetAt: new Date(now + window)
    };
  },

  // Réinitialiser le rate limit pour un IP
  resetLimit: (ip) => {
    rateLimit.delete(ip);
  },

  // Obtenir l'état actuel du rate limit pour un IP
  getStatus: (ip) => {
    const timestamps = rateLimit.get(ip) || [];
    return {
      requests: timestamps.length,
      timestamps: [...timestamps]
    };
  }
};

// Nettoyer périodiquement les anciennes entrées (toutes les heures)
setInterval(() => {
  const windowStart = Date.now() - 3600000;
  for (const [key, timestamps] of rateLimit.entries()) {
    const filtered = timestamps.filter(ts => ts > windowStart);
    if (filtered.length === 0) {
      rateLimit.delete(key);
    } else {
      rateLimit.set(key, filtered);
    }
  }
}, 3600000);
