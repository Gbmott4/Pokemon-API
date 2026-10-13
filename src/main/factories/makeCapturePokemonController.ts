import { CapturePokemonUseCase } from '../../application/use-cases/CapturePokemonUseCase';
import { PgTrainerRepository } from '../../infrastructure/database/postgres/PgTrainerRepository';
import { PgTrainerCaptureRepository } from '../../infrastructure/database/postgres/PgTrainerCaptureRepository';
import { PokeApiGateway } from '../../infrastructure/providers/PokeApiGateway';

export function makeCapturePokemonController() {
  const trainerRepository = new PgTrainerRepository();
  const captureRepository = new PgTrainerCaptureRepository();
  const pokeApiGateway = new PokeApiGateway();

  return new CapturePokemonUseCase(
    trainerRepository,
    captureRepository,
    pokeApiGateway,
  );
}
