import { CapturePokemonUseCase } from '../../application/use-cases/CapturePokemonUseCase';
import { PrismaTrainerRepository } from '../../infrastructure/database/prisma/PrismaTrainerRepository';
import { PrismaTrainerCaptureRepository } from '../../infrastructure/database/prisma/PrismaTrainerCaptureRepository';
import { PokeApiGateway } from '../../infrastructure/providers/PokeApiGateway';

export function makeCapturePokemonController() {
  const trainerRepository = new PrismaTrainerRepository();
  const captureRepository = new PrismaTrainerCaptureRepository();
  const pokeApiGateway = new PokeApiGateway();

  return new CapturePokemonUseCase(
    trainerRepository,
    captureRepository,
    pokeApiGateway,
  );
}
