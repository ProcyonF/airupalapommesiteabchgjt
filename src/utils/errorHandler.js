export const errorHandler = {
  handleError: (error, type = 'general') => {
    // Log l'erreur de manière sécurisée
    console.error(`Type: ${type}, Error: ${error.message}`);
    
    // Ne pas exposer les détails sensibles en production
    if (process.env.NODE_ENV === 'production') {
      return {
        message: 'Une erreur est survenue',
        code: error.code || 500
      };
    }
    
    return {
      message: error.message,
      code: error.code || 500,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  },

  isOperationalError: (error) => {
    if (error.isOperational) {
      return true;
    }
    return false;
  },

  logError: (err) => {
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      time: new Date().toISOString(),
      // Ne pas logger la stack trace en production
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};
