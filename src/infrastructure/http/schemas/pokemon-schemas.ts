import { z } from 'zod';

// Tipos oficiais de Pokémon
export const pokemonTypeSchema = z.enum([
  'NORMAL',
  'FIRE',
  'WATER',
  'ELECTRIC',
  'GRASS',
  'ICE',
  'FIGHTING',
  'POISON',
  'GROUND',
  'FLYING',
  'PSYCHIC',
  'BUG',
  'ROCK',
  'GHOST',
  'DRAGON',
  'DARK',
  'STEEL',
  'FAIRY',
]);

// Parâmetro de ID nas rotas
export const pokemonIdParamsSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, 'O ID do Pokémon deve ser um número inteiro positivo')
    .transform(Number),
});

// Criação de Pokémon
export const createPokemonSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  type: pokemonTypeSchema,
  level: z
    .number()
    .int('O nível deve ser um número inteiro')
    .min(1, 'O nível mínimo é 1')
    .max(100, 'O nível máximo é 100'),
  trainerId: z.string().uuid('O trainerId deve ser um UUID válido').optional(),
});

export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;

// Atualização completa (PUT)
export const updatePokemonSchema = createPokemonSchema;

// Atualização parcial (PATCH)
export const patchPokemonSchema = createPokemonSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Informe pelo menos um campo para atualizar',
  );

export type UpdatePokemonInput = z.infer<typeof updatePokemonSchema>;
export type PatchPokemonInput = z.infer<typeof patchPokemonSchema>;

// Atualização somente do nível
export const updatePokemonLevelSchema = z.object({
  level: z
    .number()
    .int('O nível deve ser um número inteiro')
    .min(1, 'O nível mínimo é 1')
    .max(100, 'O nível máximo é 100'),
});

// Listagem e filtros
export const listPokemonsQuerySchema = z.object({
  type: pokemonTypeSchema.optional(),

  minLevel: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? 1 : Number(value)))
    .pipe(z.number().int().min(1).max(100)),

  maxLevel: z
    .string()
    .optional()
    .transform((value) => (value === undefined ? 100 : Number(value)))
    .pipe(z.number().int().min(1).max(100)),
});

export type ListPokemonsQuery = z.infer<typeof listPokemonsQuerySchema>;

// Captura de Pokémon
export const capturePokemonSchema = z.object({
  params: z.object({
    trainerId: z.string().uuid('O trainerId deve ser um UUID válido'),
  }),
  body: z.object({
    pokemonName: z
      .string()
      .trim()
      .min(1, 'O nome do Pokémon é obrigatório')
      .toLowerCase(),
  }),
});

export type CapturePokemonInput = z.infer<typeof capturePokemonSchema>;

// Pesquisa na PokéAPI
export const searchPokemonQuerySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome do Pokémon é obrigatório')
    .toLowerCase(),
});

export type SearchPokemonQuery = z.infer<typeof searchPokemonQuerySchema>;
