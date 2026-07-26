import type { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],

      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://cdn.jsdelivr.net',
        'https://*.jsdelivr.net',
      ],

      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net', 'https://*.jsdelivr.net'],

      fontSrc: [
        "'self'",
        'data:',
        'https://cdn.jsdelivr.net',
        'https://*.jsdelivr.net',
        'https://fonts.scalar.com',
      ],

      connectSrc: ["'self'", 'https://api.scalar.com', 'https://cdn.jsdelivr.net'],

      imgSrc: ["'self'", 'data:', 'https:'],

      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};
