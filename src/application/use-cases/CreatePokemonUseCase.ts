import { Pokemon } from '../../domain/entities/pokemon';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '../dtos/CreatePokemonDTO';

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(data.id);

    if (pokemonExists) {
      throw new Error('Pokémon com este ID já está cadastrado.');
    }

    const pokemon = new Pokemon(
      data.id,
      data.name,
      data.type,
      data.hp,
      data.attack,
      data.defense,
    );

    await this.pokemonRepository.create(pokemon);

    return pokemon;
  }
}
