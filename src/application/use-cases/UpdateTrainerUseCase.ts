import { Trainer } from '../../domain/entities/trainer';
import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';
import { NotFoundError } from '../../domain/errors/not-found-error';

interface UpdateTrainerDTO {
  id: string;
  name: string;
  email: string;
  city: string;
}

export class UpdateTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: UpdateTrainerDTO): Promise<void> {
    const existingTrainer = await this.trainerRepository.findById(data.id);

    if (!existingTrainer) {
      throw new NotFoundError('Treinador não encontrado.');
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
