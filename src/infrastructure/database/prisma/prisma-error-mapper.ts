import { Prisma } from '@prisma/client';
import { AppError } from '@domain/errors/app-error';
import { ConflictError } from '@domain/errors/conflict-error';
import { NotFoundError } from '@domain/errors/not-found-error';

export class PrismaErrorMapper {
  static map(error: unknown): AppError | null {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return new ConflictError('Já existe um registro com esses dados.');

        case 'P2025':
          return new NotFoundError('Registro não encontrado.');

        case 'P2003':
          return new ConflictError(
            'Não foi possível realizar a operação devido a uma referência inválida.',
          );

        default:
          return null;
      }
    }

    return null;
  }
}
