import { Prisma } from '@prisma/client';
import { AppError } from '@domain/errors/app-error';

export class PrismaErrorMapper {
  static map(error: unknown): AppError | null {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return new AppError('Já existe um registro com esses dados.', 409);

        case 'P2025':
          return new AppError('Registro não encontrado.', 404);

        case 'P2003':
          return new AppError(
            'Não foi possível realizar a operação devido a uma referência inválida.',
            409,
          );

        default:
          return null;
      }
    }

    return null;
  }
}
