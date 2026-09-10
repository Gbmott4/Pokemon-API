import { Pokemon } from '../../domain/entities/pokemon';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { PatchPokemonDTO } from '../dtos/PatchPokemonDTO';

export class PatchPokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: PatchPokemonDTO): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(data.id);

    if (!pokemon) {
      throw new ResourceNotFoundError('Pokémon não encontrado no catálogo.');
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
