import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';
import { AppError } from '../../domain/errors/app-error';

export class DeleteTrainerUseCase {
  constructor(private trainerRepository: IPgTrainerRepository) {}

  async execute(id: string): Promise<void> {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    await this.trainerRepository.delete(id);
  }
}
