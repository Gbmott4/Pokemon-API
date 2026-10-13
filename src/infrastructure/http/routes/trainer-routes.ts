import { Router } from 'express';
import { makeTrainerController } from '../../../main/factories/makeTrainerController';
import { validateRequest } from '../middlewares/validate-request';
import { createTrainerSchema } from '../schemas/trainer-schemas';
import { z } from 'zod';

const trainerRoutes = Router();

const trainerController = makeTrainerController();

// Schema para validar o UUID do treinador
const trainerIdParamsSchema = z.object({
  id: z.string().uuid('O ID do treinador deve ser um UUID válido'),
});

// Cadastrar treinador
trainerRoutes.post(
  '/',
  validateRequest({ body: createTrainerSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Cadastra um novo treinador'
      #swagger.description = 'Adiciona um treinador ao banco de dados. O ID é gerado automaticamente pelo PostgreSQL.'

      #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'city'],
              properties: {
                name: { type: 'string', example: 'Ash Ketchum' },
                email: { type: 'string', example: 'ash@example.com' },
                city: { type: 'string', example: 'Pallet' }
              }
            }
          }
        }
      }

      #swagger.responses[201] = {
        description: 'Treinador cadastrado com sucesso'
      }

      #swagger.responses[409] = {
        description: 'Já existe um treinador cadastrado com este e-mail'
      }
    */

    return trainerController.create(req, res);
  },
);

// Buscar treinador por ID
trainerRoutes.get(
  '/:id',
  validateRequest({ params: trainerIdParamsSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Busca um treinador por ID'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'UUID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.responses[200] = {
        description: 'Treinador encontrado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'UUID inválido'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }
    */

    return trainerController.getById(req, res);
  },
);

// Atualizar treinador
trainerRoutes.put(
  '/:id',
  validateRequest({
    params: trainerIdParamsSchema,
    body: createTrainerSchema,
  }),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Atualiza um treinador'
      #swagger.description = 'Atualiza o nome, e-mail e cidade de um treinador existente.'

      #swagger.parameters['id'] = {
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
              required: ['name', 'email', 'city'],
              properties: {
                name: { type: 'string', example: 'Ash Ketchum' },
                email: { type: 'string', example: 'ash.updated@example.com' },
                city: { type: 'string', example: 'Viridian' }
              }
            }
          }
        }
      }

      #swagger.responses[200] = {
        description: 'Treinador atualizado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'UUID ou dados inválidos'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }

      #swagger.responses[409] = {
        description: 'Já existe um treinador cadastrado com este e-mail'
      }
    */

    return trainerController.update(req, res);
  },
);

// Excluir treinador
trainerRoutes.delete(
  '/:id',
  validateRequest({ params: trainerIdParamsSchema }),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Exclui um treinador'
      #swagger.description = 'Remove um treinador cadastrado pelo seu UUID.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'UUID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.responses[204] = {
        description: 'Treinador excluído com sucesso'
      }

      #swagger.responses[400] = {
        description: 'UUID inválido'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }
    */

    return trainerController.delete(req, res);
  },
);

export { trainerRoutes };