import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@domain/errors/app-error';
import { PrismaErrorMapper } from '@infrastructure/database/prisma/prisma-error-mapper';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  // 1. Erros de validação do Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Dados de entrada inválidos.',
      details: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // 2. Erros conhecidos do Prisma
  const prismaError = PrismaErrorMapper.map(error);

  if (prismaError) {
    return res.status(prismaError.statusCode).json({
      status: 'error',
      statusCode: prismaError.statusCode,
      message: prismaError.message,
    });
  }

  // 3. Erros operacionais da aplicação
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  // 4. Erros inesperados: não expor detalhes internos
  console.error('💥 [Uncaught Exception]:', error);

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Erro interno no servidor.',
  });
}
