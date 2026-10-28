import { NotFoundError } from '../../domain/errors/not-found-error';
import { TrainerCapture } from '../../domain/entities/trainer-capture';
import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';
import { ITrainerCaptureRepository } from '../../domain/repositories/ITrainerCaptureRepository';

export class GetTrainerTeamUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private captureRepository: ITrainerCaptureRepository,
  ) {}

  async execute(trainerId: string): Promise<TrainerCapture[]> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    return this.captureRepository.findByTrainerId(trainerId);
  }
}
