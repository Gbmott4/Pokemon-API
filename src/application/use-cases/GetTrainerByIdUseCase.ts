import { Trainer } from '../../domain/entities/trainer';
import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';
import { NotFoundError } from '../../domain/errors/not-found-error';

export class GetTrainerByIdUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    return trainer;
  }
}
