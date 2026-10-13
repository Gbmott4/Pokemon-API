import { PokemonApiDTO } from '@application/dtos/PokemonApiDTO';
import { IPokeApiGateway } from '@domain/gateways/IPokeApiGateway';

interface PokeApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export class PokeApiGateway implements IPokeApiGateway {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async searchByName(name: string): Promise<PokemonApiDTO | null> {
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
      return null;
    }

    const response = await fetch(
      `${this.baseUrl}/${encodeURIComponent(normalizedName)}`,
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Não foi possível consultar a PokéAPI.');
    }

    const data = (await response.json()) as PokeApiResponse;

    const getStat = (statName: string): number =>
      data.stats.find((stat) => stat.stat.name === statName)?.base_stat ?? 0;

    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other?.['official-artwork']?.front_default ??
        data.sprites.front_default,
      types: data.types.map((item) => item.type.name),
      hp: getStat('hp'),
      attack: getStat('attack'),
      defense: getStat('defense'),
    };
  }
}
