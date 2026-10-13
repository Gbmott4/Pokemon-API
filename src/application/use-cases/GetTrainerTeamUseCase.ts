
import { AppError } from '../../domain/errors/app-error';
import { TrainerCapture } from '../../domain/entities/trainer-capture';
import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';
import { ITrainerCaptureRepository } from '../../domain/repositories/ITrainerCaptureRepository';

export class GetTrainerTeamUseCase {
  constructor(
    private trainerRepository: IPgTrainerRepository,
    private captureRepository: ITrainerCaptureRepository,
  ) {}

  async execute(trainerId: string): Promise<TrainerCapture[]> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    return this.captureRepository.findByTrainerId(trainerId);
  }
}
