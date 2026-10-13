import { Router } from 'express';
import { makePokemonController } from '../../../main/factories/makePokemonController';
import { validateRequest } from '../middlewares/validate-request';
import {
  createPokemonSchema,
  listPokemonsQuerySchema,
  pokemonIdParamsSchema,
  updatePokemonSchema,
  patchPokemonSchema,
  updatePokemonLevelSchema,
} from '../schemas/pokemon-schemas';

const pokemonRoutes = Router();

const pokemonController = makePokemonController();

// Listar Pokémon
pokemonRoutes.get(
  '/',
  validateRequest({ query: listPokemonsQuerySchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Lista os Pokémon'
      #swagger.description = 'Retorna todos os Pokémon cadastrados no catálogo.'

      #swagger.responses[200] = {
        description: 'Lista de Pokémon retornada com sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/Pokemon' }
            }
          }
        }
      }
    */

    return pokemonController.list(req, res);
  },
);

// Buscar Pokémon por ID
pokemonRoutes.get(
  '/:id',
  validateRequest({ params: pokemonIdParamsSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Busca um Pokémon por ID'
      #swagger.description = 'Retorna um Pokémon específico a partir do seu ID.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico do Pokémon',
        required: true,
        type: 'integer',
        example: 1
      }

      #swagger.responses[200] = {
        description: 'Pokémon encontrado com sucesso',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Pokemon' }
          }
        }
      }

      #swagger.responses[400] = {
        description: 'ID inválido',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    */

    return pokemonController.getById(req, res);
  },
);

// Cadastrar Pokémon
pokemonRoutes.post(
  '/',
  validateRequest({ body: createPokemonSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Cadastra um novo Pokémon'
      #swagger.description = 'Adiciona um novo Pokémon ao catálogo.'

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreatePokemonDto' }
          }
        }
      }

      #swagger.responses[201] = {
        description: 'Pokémon cadastrado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Dados inválidos ou ID já cadastrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    */

    return pokemonController.create(req, res);
  },
);

// Atualizar Pokémon completamente (PUT)
pokemonRoutes.put(
  '/:id',
  validateRequest({
    params: pokemonIdParamsSchema,
    body: updatePokemonSchema,
  }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualiza um Pokémon'
      #swagger.description = 'Atualiza completamente os dados de um Pokémon existente.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico do Pokémon',
        required: true,
        type: 'integer',
        example: 1
      }

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdatePokemonDto' }
          }
        }
      }

      #swagger.responses[200] = {
        description: 'Pokémon atualizado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'ID ou dados inválidos',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    */

    return pokemonController.update(req, res);
  },
);

// Remover Pokémon
pokemonRoutes.delete(
  '/:id',
  validateRequest({ params: pokemonIdParamsSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Remove um Pokémon'
      #swagger.description = 'Remove um Pokémon do catálogo pelo ID.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico do Pokémon',
        required: true,
        type: 'integer',
        example: 1
      }

      #swagger.responses[204] = {
        description: 'Pokémon removido com sucesso'
      }

      #swagger.responses[400] = {
        description: 'ID inválido',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    */

    return pokemonController.delete(req, res);
  },
);

// Atualizar somente o nível
pokemonRoutes.patch(
  '/:id/level',
  validateRequest({
    params: pokemonIdParamsSchema,
    body: updatePokemonLevelSchema,
  }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualiza o nível de um Pokémon'
      #swagger.description = 'Atualiza somente o nível de um Pokémon existente.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico do Pokémon',
        required: true,
        type: 'integer',
        example: 1
      }

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['level'],
              properties: {
                level: {
                  type: 'integer',
                  minimum: 1,
                  maximum: 100,
                  example: 10,
                  description: 'Novo nível do Pokémon'
                }
              }
            }
          }
        }
      }

      #swagger.responses[200] = {
        description: 'Nível atualizado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'ID ou nível inválido',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado'
      }
    */

    return pokemonController.updateLevel(req, res);
  },
);

// Atualizar parcialmente um Pokémon
pokemonRoutes.patch(
  '/:id',
  validateRequest({
    params: pokemonIdParamsSchema,
    body: patchPokemonSchema,
  }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualiza parcialmente um Pokémon'
      #swagger.description = 'Atualiza apenas os campos informados de um Pokémon existente.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID numérico do Pokémon',
        required: true,
        type: 'integer',
        example: 1
      }

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PatchPokemonDto' }
          }
        }
      }

      #swagger.responses[200] = {
        description: 'Pokémon atualizado parcialmente com sucesso'
      }

      #swagger.responses[400] = {
        description: 'ID ou dados inválidos',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' }
          }
        }
      }
    */

    return pokemonController.patch(req, res);
  },
);

export { pokemonRoutes };