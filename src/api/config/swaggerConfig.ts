/**
 * @summary -Swagger configuration for Express API
 *          -Gathers all *.yaml files in public folder
 */
const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CHADvisory',
      version: '1.0.0',
      description: 'Documentation for the CHADvisory API',
    },
    servers: [{ url: '/api' }],
  },
  apis: ['./public/**/*.yaml'],
};

export default swaggerConfig;
