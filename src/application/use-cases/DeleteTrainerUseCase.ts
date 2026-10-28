import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';
import { NotFoundError } from '../../domain/errors/not-found-error';

export class DeleteTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(id: string): Promise<void> {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    await this.trainerRepository.delete(id);
  }
}
