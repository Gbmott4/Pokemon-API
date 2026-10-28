import { Pokemon } from '../../domain/entities/pokemon';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '../dtos/CreatePokemonDTO';
import { ConflictError } from '../../domain/errors/conflict-error';

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(data.id);

    if (pokemonExists) {
      throw new ConflictError('Já existe um Pokémon cadastrado com este ID.');
    }

    const pokemon = new Pokemon(
      data.id,
      data.name,
      data.type,
      data.hp,
      data.attack,
      data.defense,
      data.level,
    );

    await this.pokemonRepository.create(pokemon);

    return pokemon;
  }
}
