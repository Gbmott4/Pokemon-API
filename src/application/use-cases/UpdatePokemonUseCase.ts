import { Pokemon } from '../../domain/entities/pokemon';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { UpdatePokemonDTO } from '../dtos/UpdatePokemonDTO';
import { NotFoundError } from '../../domain/errors/not-found-error';

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: UpdatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(data.id);

    if (!pokemonExists) {
      throw new NotFoundError('Pokémon não encontrado no catálogo.');
    }

    const updatedPokemon = new Pokemon(
      data.id,
      data.name,
      data.type,
      data.hp,
      data.attack,
      data.defense,
      data.level,
    );

    await this.pokemonRepository.update(updatedPokemon);

    return updatedPokemon;
  }
}
