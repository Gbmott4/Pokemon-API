import { Pokemon } from '../../domain/entities/pokemon';
import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '../dtos/CreatePokemonDTO';
import { AppError } from '@domain/errors/app-error'

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonExists = await this.pokemonRepository.findById(data.id);

    if (pokemonExists) {
      throw new AppError('Usuário com este e-mail já está cadastrado.', 400);
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
