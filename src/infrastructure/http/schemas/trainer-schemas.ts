import { z } from 'zod';

export const createTrainerSchema = z.object({
  name: z.string().trim().min(3, 'O nome deve ter no mínimo 3 caracteres'),

  email: z.string().email('Informe um e-mail válido').toLowerCase(),

  city: z.string().min(2, 'A cidade deve ter no mínimo 2 caracteres'),
});

export type CreateTrainerInput = z.infer<typeof createTrainerSchema>;
