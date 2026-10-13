import { Router } from 'express';
import { CapturePokemonController } from '../controllers/CapturePokemonController';
import { makeCapturePokemonController } from '../../../main/factories/makeCapturePokemonController';
import { validateRequest } from '../middlewares/validate-request';
import { capturePokemonSchema } from '../schemas/pokemon-schemas';

const captureRoutes = Router();

/**
 * @swagger
 * /api/v1/trainers/{trainerId}/captures:
 *   post:
 *     tags:
 *       - Captures
 *     summary: Captura um Pokémon
 *     description: Busca um Pokémon na PokéAPI e registra sua captura para um treinador.
 *     parameters:
 *       - in: path
 *         name: trainerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID do treinador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pokemonName
 *             properties:
 *               pokemonName:
 *                 type: string
 *                 example: pikachu
 *     responses:
 *       201:
 *         description: Pokémon capturado com sucesso
 *       400:
 *         description: Dados de entrada inválidos
 *       404:
 *         description: Treinador ou Pokémon não encontrado
 *       409:
 *         description: Pokémon já capturado pelo treinador
 */
captureRoutes.post(
  '/:trainerId/captures',
  validateRequest({
    params: capturePokemonSchema.shape.params,
    body: capturePokemonSchema.shape.body,
  }),
  async (req, res, next) => {
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
