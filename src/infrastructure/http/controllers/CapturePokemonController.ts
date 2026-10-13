
import { Request, Response } from 'express';
import { CapturePokemonUseCase } from '../../../application/use-cases/CapturePokemonUseCase';

export class CapturePokemonController {
  constructor(
    private capturePokemonUseCase: CapturePokemonUseCase,
  ) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;
    const { pokemonName } = req.body;

    if (typeof trainerId !== 'string') {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'ID do treinador inválido.',
      });
    }

    if (typeof pokemonName !== 'string' || !pokemonName.trim()) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Informe o nome do Pokémon no campo pokemonName.',
      });
    }

    const capture = await this.capturePokemonUseCase.execute({
      trainerId,
      pokemonName,
    });

    return res.status(201).json({
      message: 'Pokémon capturado com sucesso!',
      capture,
    });
  }
}
