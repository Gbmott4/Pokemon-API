
import { Trainer } from '../../../domain/entities/trainer';
import { IPgTrainerRepository } from '../../../domain/repositories/IPgTrainerRepository';
import { AppError } from '../../../domain/errors/app-error';
import { prisma } from '../prisma/client';
import { Prisma } from '@prisma/client';

export class PgTrainerRepository implements IPgTrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    try {
      await prisma.trainers.create({
        data: {
          name: trainer.name,
          email: trainer.email,
          city: trainer.city,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }

      throw error;
    }
  }

  async update(trainer: Trainer): Promise<void> {
    try {
      await prisma.trainers.update({
        where: { id: trainer.id },
        data: {
          name: trainer.name,
          email: trainer.email,
          city: trainer.city,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }

      throw error;
    }
  }

  async findById(id: string): Promise<Trainer | null> {
    const row = await prisma.trainers.findUnique({
      where: { id },
    });

    if (!row) {
      return null;
    }

    return new Trainer(
      row.id,
      row.name,
      row.email,
      row.city,
      row.created_at?? undefined,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.trainers.delete({
      where: { id },
    });
  }
}
