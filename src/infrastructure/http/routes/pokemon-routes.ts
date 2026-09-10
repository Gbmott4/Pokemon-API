import { Router } from 'express';
import { makePokemonController } from '../../../main/factories/makePokemonController';

const pokemonRoutes = Router();

const pokemonController = makePokemonController();

pokemonRoutes.get('/', (req, res) => {
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
});

pokemonRoutes.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Busca um Pokémon por ID'
    #swagger.description = 'Retorna um Pokémon específico a partir do seu ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Pokémon encontrado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Pokemon' }
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
});

pokemonRoutes.post('/', (req, res) => {
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
});

pokemonRoutes.put('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza um Pokémon'
    #swagger.description = 'Atualiza completamente os dados de um Pokémon existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string'
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
      description: 'Dados inválidos',
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
});

pokemonRoutes.delete('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remove um Pokémon'
    #swagger.description = 'Remove um Pokémon do catálogo pelo ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Pokémon removido com sucesso'
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
});

pokemonRoutes.patch('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualiza parcialmente um Pokémon'
    #swagger.description = 'Atualiza apenas os campos informados de um Pokémon existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string'
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
      description: 'Dados inválidos',
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
});

export { pokemonRoutes };
