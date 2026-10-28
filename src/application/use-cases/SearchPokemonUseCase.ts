import { PokemonApiDTO } from '../dtos/PokemonApiDTO';
import { IPokeApiGateway } from '../../domain/gateways/IPokeApiGateway';
import { NotFoundError } from '../../domain/errors/not-found-error';
import { BadRequestError } from '../../domain/errors/bad-request-error';

export class SearchPokemonUseCase {
  constructor(private pokeApiGateway: IPokeApiGateway) {}

  async execute(name: string): Promise<PokemonApiDTO> {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new BadRequestError('O nome do Pokémon é obrigatório.');
    }

    const pokemon = await this.pokeApiGateway.searchByName(normalizedName);

    if (!pokemon) {
      throw new NotFoundError('Pokémon não encontrado na PokéAPI.');
    }

    return pokemon;
  }
}
