import { Pokemon } from '../../domain/entities/pokemon';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { UpdatePokemonDTO } from '../dtos/UpdatePokemonDTO';
import { AppError } from '@domain/errors/app-error'

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: UpdatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(data.id);

    if (!pokemonExists) {
      throw new AppError('Pokémon não encontrado no catálogo.', 404);
    }

    const updatedPokemon = new Pokemon(
      data.id,
      data.name,
      data.type,
      data.hp,
      data.attack,
      data.defense,
    );

    await this.pokemonRepository.update(updatedPokemon);

    return updatedPokemon;
  }
}
