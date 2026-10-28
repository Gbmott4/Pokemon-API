import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { NotFoundError } from '../../domain/errors/not-found-error';

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError('Pokémon não encontrado no catálogo.');
    }

    await this.pokemonRepository.delete(id);
  }
}
