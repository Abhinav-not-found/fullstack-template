import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.1.0',

    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },

    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],

    tags: [
      {
        name: 'Authentication',
        description: 'Authentication related APIs',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name', 'email'],
          properties: {
            id: {
              type: 'string',
              example: '6a8f0bbc7b147839f36243f4',
            },
            name: {
              type: 'string',
              example: 'Abhinav',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'abhinav@gmail.com',
            },
            avatar: {
              type: 'string',
              nullable: true,
              example: null,
            },
          },
        },

        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Abhinav',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'abhinav@gmail.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'Password@123',
            },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'abhinav@gmail.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'Password@123',
            },
          },
        },

        UserResponse: {
          type: 'object',
          required: ['statusCode', 'message', 'data', 'success'],
          properties: {
            statusCode: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Fetched user info',
            },
            data: {
              $ref: '#/components/schemas/User',
            },
            success: {
              type: 'boolean',
              example: true,
            },
          },
        },

        AuthResponse: {
          type: 'object',
          required: ['statusCode', 'message', 'data', 'success'],
          properties: {
            statusCode: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Login successful',
            },
            data: {
              type: 'object',
              required: ['user'],
              properties: {
                user: {
                  $ref: '#/components/schemas/User',
                },
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIs...',
                },
                refreshToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIs...',
                },
              },
            },
            success: {
              type: 'boolean',
              example: true,
            },
          },
        },

        RefreshTokenResponse: {
          type: 'object',
          required: ['statusCode', 'message', 'data', 'success'],
          properties: {
            statusCode: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Token refreshed successfully',
            },
            data: {
              type: 'object',
              required: ['accessToken'],
              properties: {
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIs...',
                },
              },
            },
            success: {
              type: 'boolean',
              example: true,
            },
          },
        },

        ApiError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'User already exists',
            },
            errors: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },

  apis: ['./src/module/**/*.ts'],
});

export default swaggerSpec;
