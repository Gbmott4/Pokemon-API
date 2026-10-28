import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { NotFoundError } from '../../domain/errors/not-found-error';
import { BadRequestError } from '../../domain/errors/bad-request-error';

export class UpdatePokemonLevelUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string, newLevel: number): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError('Pokémon não encontrado no catálogo.');
    }

    if (!Number.isInteger(newLevel) || newLevel <= 0) {
      throw new BadRequestError(
        'O nível deve ser um número inteiro maior que zero.',
      );
    }

    await this.pokemonRepository.updateLevel(id, newLevel);
  }
}
