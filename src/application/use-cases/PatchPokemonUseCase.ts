import { Pokemon } from '../../domain/entities/pokemon';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { PatchPokemonDTO } from '../dtos/PatchPokemonDTO';
import { AppError } from '@domain/errors/app-error'

export class PatchPokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: PatchPokemonDTO): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(data.id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado no catálogo.', 404);
    }

    const patchedPokemon = new Pokemon(
      pokemon.id,
      data.name ?? pokemon.name,
      data.type ?? pokemon.type,
      data.hp ?? pokemon.hp,
      data.attack ?? pokemon.attack,
      data.defense ?? pokemon.defense,
    );

    await this.pokemonRepository.update(patchedPokemon);

    return patchedPokemon;
  }
}
