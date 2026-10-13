import { PokemonApiDTO } from '../dtos/PokemonApiDTO';
import { IPokeApiGateway } from '../../domain/gateways/IPokeApiGateway';
import { AppError } from '../../domain/errors/app-error';

export class SearchPokemonUseCase {
  constructor(
    private pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute(name: string): Promise<PokemonApiDTO> {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new AppError('O nome do Pokémon é obrigatório.', 400);
    }

    const pokemon = await this.pokeApiGateway.searchByName(
      normalizedName,
    );

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado na PokéAPI.', 404);
    }

    return pokemon;
  }
}