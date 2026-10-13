import { Trainer } from '../entities/trainer';

export interface IPgTrainerRepository {
  create(trainer: Trainer): Promise<void>;
  update(trainer: Trainer): Promise<void>;
  findById(id: string): Promise<Trainer | null>;
  delete(id: string): Promise<void>;
}
