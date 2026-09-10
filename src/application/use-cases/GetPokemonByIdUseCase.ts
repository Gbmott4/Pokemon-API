import { Pokemon } from '../../domain/entities/pokemon';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';

export class GetPokemonByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new ResourceNotFoundError('Pokémon não encontrado no catálogo.');
    }

    return pokemon;
  }
}
