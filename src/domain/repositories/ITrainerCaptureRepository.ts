import { TrainerCapture } from '../entities/trainer-capture';

export interface ITrainerCaptureRepository {
  create(capture: TrainerCapture): Promise<void>;

  findByTrainerId(trainerId: string): Promise<TrainerCapture[]>;

  countByTrainerId(trainerId: string): Promise<number>;
}
