import { Request, Response } from 'express';
import { GetTrainerTeamUseCase } from '../../../application/use-cases/GetTrainerTeamUseCase';

export class GetTrainerTeamController {
  constructor(private getTrainerTeamUseCase: GetTrainerTeamUseCase) {}

  async handle(req: Request, res: Response) {
    const trainerId = req.params.trainerId;

    if (typeof trainerId !== 'string') {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'ID do treinador inválido.',
      });
    }

    const team = await this.getTrainerTeamUseCase.execute(trainerId);

    return res.status(200).json({
      trainerId,
      total: team.length,
      team,
    });
  }
}
