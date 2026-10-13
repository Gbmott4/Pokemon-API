import { Pokemon } from '../../../domain/entities/pokemon';
import { IPokemonRepository } from '../../../domain/repositories/IPokemonRepository';
import { prisma } from '../prisma/client';

export class PgPokemonRepository implements IPokemonRepository {
  async findAll(): Promise<Pokemon[]> {
    const rows = await prisma.pokemons.findMany({
      orderBy: { name: 'asc' },
    });

    return rows.map(
      (row) =>
        new Pokemon(
          row.id,
          row.name,
          row.type,
          row.hp,
          row.attack,
          row.defense,
          row.level,
        ),
    );
  }

  async findByType(type: string): Promise<Pokemon[]> {
    const rows = await prisma.pokemons.findMany({
      where: {
        type: {
          equals: type,
          mode: 'insensitive',
        },
      },
      orderBy: { name: 'asc' },
    });

    return rows.map(
      (row) =>
        new Pokemon(
          row.id,
          row.name,
          row.type,
          row.hp,
          row.attack,
          row.defense,
          row.level,
        ),
    );
  }

  async findById(id: string): Promise<Pokemon | null> {
    const row = await prisma.pokemons.findUnique({
      where: { id },
    });

    if (!row) {
      return null;
    }

    return new Pokemon(
      row.id,
      row.name,
      row.type,
      row.hp,
      row.attack,
      row.defense,
      row.level,
    );
  }

  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemons.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        level: pokemon.level,
      },
    });
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemons.update({
      where: { id: pokemon.id },
      data: {
        name: pokemon.name,
        type: pokemon.type,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        level: pokemon.level,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.pokemons.delete({
      where: { id },
    });
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    await prisma.pokemons.update({
      where: { id },
      data: { level: newLevel },
    });
  }
}
