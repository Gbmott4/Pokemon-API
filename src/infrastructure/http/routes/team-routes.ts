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