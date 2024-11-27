export const validateUserInput = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email invalide');
    }
    return email;
  },
  
  password: (password) => {
    if (password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Le mot de passe doit contenir au moins une majuscule');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Le mot de passe doit contenir au moins un chiffre');
    }
    return password;
  },
  
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>]/g, '').trim();
  }
};
