import { Router } from 'express';
import { makePokedexController } from '../../../main/factories/makePokedexController';
import { validateRequest } from '../middlewares/validate-request';
import { searchPokemonQuerySchema } from '../schemas/pokemon-schemas';

const pokedexRoutes = Router();

const pokedexController = makePokedexController();

pokedexRoutes.get(
  '/search',
  validateRequest({ query: searchPokemonQuerySchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Pokedex']
      #swagger.summary = 'Pesquisa um Pokémon'
      #swagger.description = 'Pesquisa um Pokémon pelo nome na PokéAPI oficial.'

      #swagger.parameters['name'] = {
        in: 'query',
        description: 'Nome do Pokémon que deseja pesquisar',
        required: true,
        type: 'string',
        example: 'pikachu'
      }

      #swagger.responses[200] = {
        description: 'Pokémon encontrado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Nome inválido ou não informado'
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado na PokéAPI'
      }
    */

    return pokedexController.search(req, res);
  },
);

export { pokedexRoutes };
