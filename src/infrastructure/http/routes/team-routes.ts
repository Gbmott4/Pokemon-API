import { Router } from 'express';
import { z } from 'zod';

import { GetTrainerTeamController } from '../controllers/GetTrainerTeamController';
import { makeGetTrainerTeamController } from '../../../main/factories/makeGetTrainerTeamController';
import { validateRequest } from '../middlewares/validate-request';

const teamRoutes = Router();

const trainerIdParamsSchema = z.object({
  trainerId: z.string().uuid('O ID do treinador deve ser um UUID válido'),
});

teamRoutes.get(
  '/:trainerId/team',
  validateRequest({ params: trainerIdParamsSchema }),
  async (req, res, next) => {
    /*
      #swagger.tags = ['Captures']
      #swagger.summary = 'Lista a equipe de um treinador'
      #swagger.description = 'Retorna os Pokémon capturados pelo treinador (no máximo 6).'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        description: 'UUID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.responses[200] = {
        description: 'Equipe retornada com sucesso'
      }

      #swagger.responses[400] = {
        description: 'UUID inválido'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }
    */

    try {
      const useCase = makeGetTrainerTeamController();
      const controller = new GetTrainerTeamController(useCase);

      await controller.handle(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export { teamRoutes };
