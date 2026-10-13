import { CreateTrainerUseCase } from '../../application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '../../application/use-cases/GetTrainerByIdUseCase';
import { UpdateTrainerUseCase } from '../../application/use-cases/UpdateTrainerUseCase';
import { DeleteTrainerUseCase } from '../../application/use-cases/DeleteTrainerUseCase';
import { PgTrainerRepository } from '../../infrastructure/database/postgres/PgTrainerRepository';
import { TrainerController } from '../../infrastructure/http/controllers/TrainerController';

export function makeTrainerController() {
  const trainerRepository = new PgTrainerRepository();

  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);

  const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerRepository);

  const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository);

  const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository);

  return new TrainerController(
    createTrainerUseCase,
    getTrainerByIdUseCase,
    updateTrainerUseCase,
    deleteTrainerUseCase,
  );
}
