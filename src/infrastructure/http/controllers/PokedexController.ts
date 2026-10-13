import { Request, Response } from 'express';
import { SearchPokemonUseCase } from '../../../application/use-cases/SearchPokemonUseCase';

export class PokedexController {
  constructor(
    private searchPokemonUseCase: SearchPokemonUseCase,
  ) {}

  async search(req: Request, res: Response) {
    const name = req.query.name;

    if (typeof name !== 'string') {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Informe o nome do Pokémon no parâmetro name.',
      });
    }

    const pokemon = await this.searchPokemonUseCase.execute(name);

    return res.status(200).json(pokemon);
  }
}