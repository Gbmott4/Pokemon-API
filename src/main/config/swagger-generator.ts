import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'PokéManager API',
    description: 'API para gerenciamento de catálogo de Pokémon',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de Pokémon',
    },
  ],
  definitions: {
    Pokemon: {
      id: '25',
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      attack: 55,
      defense: 40,
    },
    CreatePokemonDto: {
      $id: '25',
      $name: 'Pikachu',
      $type: 'Electric',
      $hp: 35,
      $attack: 55,
      $defense: 40,
    },
    UpdatePokemonDto: {
      $name: 'Pikachu Fortalecido',
      $type: 'Electric',
      $hp: 50,
      $attack: 65,
      $defense: 45,
    },
    PatchPokemonDto: {
      name: 'Pikachu Turbo',
      type: 'Electric',
      hp: 70,
      attack: 75,
      defense: 45,
    },
    ErrorResponse: {
      error: 'Pokémon não encontrado no catálogo.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon-routes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
