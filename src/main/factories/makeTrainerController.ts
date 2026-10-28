import { CreateTrainerUseCase } from '../../application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '../../application/use-cases/GetTrainerByIdUseCase';
import { UpdateTrainerUseCase } from '../../application/use-cases/UpdateTrainerUseCase';
import { DeleteTrainerUseCase } from '../../application/use-cases/DeleteTrainerUseCase';
import { PrismaTrainerRepository } from '../../infrastructure/database/prisma/PrismaTrainerRepository';
import { TrainerController } from '../../infrastructure/http/controllers/TrainerController';

export function makeTrainerController() {
  const trainerRepository = new PrismaTrainerRepository();

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
