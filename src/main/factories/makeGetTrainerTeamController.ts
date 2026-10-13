import { GetTrainerTeamUseCase } from '../../application/use-cases/GetTrainerTeamUseCase';
import { PgTrainerRepository } from '../../infrastructure/database/postgres/PgTrainerRepository';
import { PgTrainerCaptureRepository } from '../../infrastructure/database/postgres/PgTrainerCaptureRepository';

export function makeGetTrainerTeamController() {
  const trainerRepository = new PgTrainerRepository();
  const captureRepository = new PgTrainerCaptureRepository();

  return new GetTrainerTeamUseCase(trainerRepository, captureRepository);
}
