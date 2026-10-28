import { Trainer } from '../entities/trainer';

export interface ITrainerRepository {
  create(trainer: Trainer): Promise<Trainer>;
  update(trainer: Trainer): Promise<void>;
  findById(id: string): Promise<Trainer | null>;
  delete(id: string): Promise<void>;
}
