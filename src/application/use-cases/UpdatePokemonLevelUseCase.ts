import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app-error';

export class UpdatePokemonLevelUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string, newLevel: number): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado no catálogo.', 404);
    }

    if (!Number.isInteger(newLevel) || newLevel <= 0) {
      throw new AppError(
        'O nível deve ser um número inteiro maior que zero.',
        400,
      );
    }

    await this.pokemonRepository.updateLevel(id, newLevel);
  }
}
