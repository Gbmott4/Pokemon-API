import { Request, Response } from 'express';
import { CreateTrainerUseCase } from '../../../application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '../../../application/use-cases/GetTrainerByIdUseCase';
import { UpdateTrainerUseCase } from '../../../application/use-cases/UpdateTrainerUseCase';
import { DeleteTrainerUseCase } from '../../../application/use-cases/DeleteTrainerUseCase';

export class TrainerController {
  constructor(
    private createTrainerUseCase: CreateTrainerUseCase,
    private getTrainerByIdUseCase: GetTrainerByIdUseCase,
    private updateTrainerUseCase: UpdateTrainerUseCase,
    private deleteTrainerUseCase: DeleteTrainerUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const { name, email, city } = req.body;

    await this.createTrainerUseCase.execute({
      name,
      email,
      city,
    });

    return res.status(201).json({
      message: 'Treinador cadastrado com sucesso!',
    });
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== 'string') {
      throw new Error('ID do treinador inválido.');
    }

    const trainer = await this.getTrainerByIdUseCase.execute(id);

    return res.status(200).json(trainer);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== 'string') {
      throw new Error('ID do treinador inválido.');
    }

    const { name, email, city } = req.body;

    await this.updateTrainerUseCase.execute({
      id,
      name,
      email,
      city,
    });

    return res.status(200).json({
      message: 'Treinador atualizado com sucesso!',
    });
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== 'string') {
      throw new Error('ID do treinador inválido.');
    }

    await this.deleteTrainerUseCase.execute(id);

    return res.status(204).send();
  }
}
