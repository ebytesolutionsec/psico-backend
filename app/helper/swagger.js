import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API PSICO',
      version: '1.0.0',
      description: 'Documentación de mi API',
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
      },
    ],
  },
  apis: ['./app/router/**/*.js'], // 🔥 RUTA CORRECTA
};

export default swaggerJSDoc(options);