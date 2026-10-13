import { SearchPokemonUseCase } from '../../application/use-cases/SearchPokemonUseCase';
import { PokeApiGateway } from '../../infrastructure/providers/PokeApiGateway';
import { PokedexController } from '../../infrastructure/http/controllers/PokedexController';

export function makePokedexController() {
  const pokeApiGateway = new PokeApiGateway();

  const searchPokemonUseCase = new SearchPokemonUseCase(
    pokeApiGateway,
  );

  return new PokedexController(searchPokemonUseCase);
}