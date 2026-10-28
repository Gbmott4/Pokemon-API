import { GetTrainerTeamUseCase } from '../../application/use-cases/GetTrainerTeamUseCase';
import { PrismaTrainerRepository } from '../../infrastructure/database/prisma/PrismaTrainerRepository';
import { PrismaTrainerCaptureRepository } from '../../infrastructure/database/prisma/PrismaTrainerCaptureRepository';

export function makeGetTrainerTeamController() {
  const trainerRepository = new PrismaTrainerRepository();
  const captureRepository = new PrismaTrainerCaptureRepository();

  return new GetTrainerTeamUseCase(trainerRepository, captureRepository);
}
