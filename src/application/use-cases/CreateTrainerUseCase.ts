import { Trainer } from '../../domain/entities/trainer';
import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';

interface CreateTrainerDTO {
  name: string;
  email: string;
  city: string;
}

export class CreateTrainerUseCase {
  constructor(private trainerRepository: IPgTrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<void> {
    const trainer = new Trainer(
      '',
      data.name,
      data.email,
      data.city,
    );

    await this.trainerRepository.create(trainer);
  }
}
