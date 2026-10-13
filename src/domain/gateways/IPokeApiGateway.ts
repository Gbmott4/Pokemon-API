import { PokemonApiDTO } from '../../application/dtos/PokemonApiDTO';

export interface IPokeApiGateway {
  searchByName(name: string): Promise<PokemonApiDTO | null>;
}