import { InMemoryPokemonRepository } from '../../infrastructure/database/in-memory/InMemoryPokemonRepository';
import { PokemonController } from '../../infrastructure/http/controllers/PokemonController';
import { ListPokemonsUseCase } from '../../application/use-cases/ListPokemonsUseCase';
import { GetPokemonByIdUseCase } from '../../application/use-cases/GetPokemonByIdUseCase';
import { CreatePokemonUseCase } from '../../application/use-cases/CreatePokemonUseCase';
import { UpdatePokemonUseCase } from '../../application/use-cases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '../../application/use-cases/DeletePokemonUseCase';
import { PatchPokemonUseCase } from '../../application/use-cases/PatchPokemonUseCase';

export function makePokemonController() {
  const pokemonRepository = new InMemoryPokemonRepository();

  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);

  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);

  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);
  const patchPokemonUseCase = new PatchPokemonUseCase(pokemonRepository);

  const pokemonController = new PokemonController(
    listPokemonsUseCase,
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
    patchPokemonUseCase,
  );

  return pokemonController;
}
