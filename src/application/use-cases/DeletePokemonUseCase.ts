import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app-error'

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado no catálogo.', 404);
    }

    await this.pokemonRepository.delete(id);
  }
}
