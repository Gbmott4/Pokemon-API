import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '2.0.0',
    title: 'PokéManager API',
    description:
      'API para gerenciamento de Pokémon, treinadores e capturas, integrada à PokéAPI oficial.',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Catálogo de Pokémon cadastrados no banco',
    },
    {
      name: 'Trainers',
      description: 'Cadastro de treinadores',
    },
    {
      name: 'Pokedex',
      description: 'Pesquisa de Pokémon na PokéAPI oficial',
    },
    {
      name: 'Captures',
      description: 'Captura de Pokémon e equipe dos treinadores',
    },
  ],
  definitions: {
    Pokemon: {
      id: '25',
      name: 'Pikachu',
      type: 'ELECTRIC',
      hp: 35,
      attack: 55,
      defense: 40,
      level: 1,
    },
    CreatePokemonDto: {
      $id: '25',
      $name: 'Pikachu',
      $type: 'ELECTRIC',
      $hp: 35,
      $attack: 55,
      $defense: 40,
      level: 5,
    },
    UpdatePokemonDto: {
      $name: 'Pikachu Fortalecido',
      $type: 'ELECTRIC',
      $hp: 50,
      $attack: 65,
      $defense: 45,
      level: 10,
    },
    PatchPokemonDto: {
      hp: 70,
    },
    ErrorResponse: {
      status: 'error',
      statusCode: 404,
      message: 'Pokémon não encontrado no catálogo.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

// Apontar para o server.ts faz o swagger-autogen seguir os app.use() e
// documentar todas as rotas já com os prefixos corretos (/api/v1/...).
// O caminho precisa usar "/": no Windows o path.resolve usa barra invertida
// e o swagger-autogen deixa de seguir os imports do server.ts.
const endpointsFiles = [
  path.resolve(__dirname, '../server.ts').split(path.sep).join('/'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
