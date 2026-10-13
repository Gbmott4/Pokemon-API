
import { TrainerCapture } from '../../../domain/entities/trainer-capture';
import { ITrainerCaptureRepository } from '../../../domain/repositories/ITrainerCaptureRepository';
import { prisma } from '../prisma/client';

export class PgTrainerCaptureRepository
  implements ITrainerCaptureRepository
{
  async create(capture: TrainerCapture): Promise<void> {
    await prisma.trainer_captures.create({
      data: {
        trainer_id: capture.trainerId,
        pokemon_id: capture.pokemonId,
        pokemon_name: capture.pokemonName,
        image: capture.image,
        types: capture.types,
        hp: capture.hp,
        attack: capture.attack,
        defense: capture.defense,
      },
    });
  }

  async findByTrainerId(
    trainerId: string,
  ): Promise<TrainerCapture[]> {
    const rows = await prisma.trainer_captures.findMany({
      where: { trainer_id: trainerId },
      orderBy: { captured_at: 'asc' },
    });

    return rows.map(
      (row) =>
        new TrainerCapture(
          row.id,
          row.trainer_id,
          row.pokemon_id,
          row.pokemon_name,
          row.image,
          row.types,
          row.hp,
          row.attack,
          row.defense,
          row.captured_at ?? undefined,
        ),
    );
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return prisma.trainer_captures.count({
      where: { trainer_id: trainerId },
    });
  }
}
