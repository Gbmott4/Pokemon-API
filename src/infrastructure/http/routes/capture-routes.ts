import { Router } from 'express';
import { CapturePokemonController } from '../controllers/CapturePokemonController';
import { makeCapturePokemonController } from '../../../main/factories/makeCapturePokemonController';
import { validateRequest } from '../middlewares/validate-request';
import { capturePokemonSchema } from '../schemas/pokemon-schemas';

const captureRoutes = Router();

captureRoutes.post(
  '/:trainerId/captures',
  validateRequest({
    params: capturePokemonSchema.shape.params,
    body: capturePokemonSchema.shape.body,
  }),
  async (req, res, next) => {
    /*
      #swagger.tags = ['Captures']
      #swagger.summary = 'Captura um Pokémon'
      #swagger.description = 'Busca o Pokémon na PokéAPI oficial e registra a captura na equipe do treinador. Cada treinador pode ter no máximo 6 Pokémon.'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        description: 'UUID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['pokemonName'],
              properties: {
                pokemonName: { type: 'string', example: 'pikachu' }
              }
            }
          }
        }
      }

      #swagger.responses[201] = {
        description: 'Pokémon capturado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Dados de entrada inválidos'
      }

      #swagger.responses[404] = {
        description: 'Treinador ou Pokémon não encontrado'
      }

      #swagger.responses[409] = {
        description: 'O treinador já possui seis Pokémon na equipe'
      }
    */

    try {
      const useCase = makeCapturePokemonController();
      const controller = new CapturePokemonController(useCase);

      await controller.handle(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export { captureRoutes };
