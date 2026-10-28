import { Trainer } from '../../domain/entities/trainer';
import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';

interface CreateTrainerDTO {
  name: string;
  email: string;
  city: string;
}

export class CreateTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    const trainer = new Trainer('', data.name, data.email, data.city);

    return this.trainerRepository.create(trainer);
  }
}
