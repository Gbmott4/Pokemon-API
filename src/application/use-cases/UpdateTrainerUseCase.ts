import { Trainer } from '../../domain/entities/trainer';
import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';
import { AppError } from '../../domain/errors/app-error';

interface UpdateTrainerDTO {
  id: string;
  name: string;
  email: string;
  city: string;
}

export class UpdateTrainerUseCase {
  constructor(
    private trainerRepository: IPgTrainerRepository,
  ) {}

  async execute(data: UpdateTrainerDTO): Promise<void> {
    const existingTrainer = await this.trainerRepository.findById(
      data.id,
    );

    if (!existingTrainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    const trainer = new Trainer(
      data.id,
      data.name,
      data.email,
      data.city,
      existingTrainer.createdAt,
    );

    await this.trainerRepository.update(trainer);
  }
}
