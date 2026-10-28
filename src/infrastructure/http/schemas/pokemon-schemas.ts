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

// Aceita o tipo em qualquer formato ("Electric", "electric", "ELECTRIC")
// e o normaliza para maiúsculas antes de validar.
const pokemonTypeInputSchema = z
  .string()
  .trim()
  .toUpperCase()
  .pipe(pokemonTypeSchema);

// Atributos de batalha (HP, ataque e defesa)
const statSchema = (label: string) =>
  z
    .number()
    .int(`${label} deve ser um número inteiro`)
    .positive(`${label} deve ser maior que zero`);

const levelSchema = z
  .number()
  .int('O nível deve ser um número inteiro')
  .min(1, 'O nível mínimo é 1')
  .max(100, 'O nível máximo é 100');

// Parâmetro de ID nas rotas
export const pokemonIdParamsSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/, 'O ID do Pokémon deve ser um número inteiro positivo')
    .transform(Number),
});

// Campos comuns de um Pokémon (sem o ID, que vem da URL no PUT/PATCH)
const pokemonDataSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  type: pokemonTypeInputSchema,
  hp: statSchema('HP'),
  attack: statSchema('Attack'),
  defense: statSchema('Defense'),
  level: levelSchema,
});

// Criação de Pokémon (POST): o ID é informado no corpo
export const createPokemonSchema = pokemonDataSchema.extend({
  id: z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, 'O ID do Pokémon deve ser um número inteiro positivo'),
  level: levelSchema.default(1),
});

export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;

// Atualização completa (PUT)
export const updatePokemonSchema = pokemonDataSchema.extend({
  level: levelSchema.default(1),
});

// Atualização parcial (PATCH)
export const patchPokemonSchema = pokemonDataSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Informe pelo menos um campo para atualizar',
  );

export type UpdatePokemonInput = z.infer<typeof updatePokemonSchema>;
export type PatchPokemonInput = z.infer<typeof patchPokemonSchema>;

// Atualização somente do nível
export const updatePokemonLevelSchema = z.object({
  level: levelSchema,
});

// Listagem e filtros
export const listPokemonsQuerySchema = z.object({
  type: pokemonTypeInputSchema.optional(),

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
