const swaggerJsDoc = require(
  "swagger-jsdoc"
);

const options = {

  definition: {

    openapi: "3.0.0",

    info: {

      title:
        "Tutor Adda API",

      version: "1.0.0",

      description:
        "Tutor Adda Backend API Documentation",

    },

    servers: [
  {
    url: "https://tutor-adda-backend.onrender.com",
  },
],

    components: {

      securitySchemes: {

        bearerAuth: {

          type: "http",

          scheme: "bearer",

          bearerFormat: "JWT",

        },

      },

    },

    security: [
      {
        bearerAuth: [],
      },
    ],

  },

  apis: ["./routes/*.js"],

};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;