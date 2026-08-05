import type { SwaggerOptions } from 'swagger-ui-express';

export const swaggerUiConfig: SwaggerOptions = {
  customSiteTitle: 'Chasha API Documention | V1',
  customCss: `
    /* Hide Schemas Section */
    .models {
        display: none !important;
    }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
    displayRequestDuration: true,
  },
};
