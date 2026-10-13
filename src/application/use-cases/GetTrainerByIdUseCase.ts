import { Trainer } from '../../domain/entities/trainer';
import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';
import { AppError } from '../../domain/errors/app-error';

export class GetTrainerByIdUseCase {
  constructor(private trainerRepository: IPgTrainerRepository) {}

  async execute(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    return trainer;
  }
}
