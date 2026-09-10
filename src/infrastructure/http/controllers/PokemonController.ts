import { Request, Response } from 'express';
import { ListPokemonsUseCase } from '../../../application/use-cases/ListPokemonsUseCase';
import { GetPokemonByIdUseCase } from '../../../application/use-cases/GetPokemonByIdUseCase';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { CreatePokemonUseCase } from '../../../application/use-cases/CreatePokemonUseCase';
import { UpdatePokemonUseCase } from '../../../application/use-cases/UpdatePokemonUseCase';
import { DeletePokemonUseCase } from '../../../application/use-cases/DeletePokemonUseCase';
import { PatchPokemonUseCase } from '../../../application/use-cases/PatchPokemonUseCase';

export class PokemonController {
  constructor(
    private listPokemonsUseCase: ListPokemonsUseCase,
    private getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private createPokemonUseCase: CreatePokemonUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase,
    private patchPokemonUseCase: PatchPokemonUseCase,
  ) {}

  async list(req: Request, res: Response) {
    const type = req.query.type ? String(req.query.type) : undefined;

    const pokemons = await this.listPokemonsUseCase.execute({
      type,
    });

    return res.status(200).json(pokemons);
  }

  async getById(req: Request, res: Response) {
    const id = String(req.params.id);

    try {
      const pokemon = await this.getPokemonByIdUseCase.execute(id);
      return res.status(200).json(pokemon);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({
          error: error.message,
        });
      }

      throw error;
    }
  }
  async create(req: Request, res: Response) {
    const { id, name, type, hp, attack, defense } = req.body;

    try {
      const pokemon = await this.createPokemonUseCase.execute({
        id,
        name,
        type,
        hp,
        attack,
        defense,
      });

      return res.status(201).json({
        message: 'Pokémon cadastrado com sucesso!',
        data: pokemon,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      throw error;
    }
  }

  async update(req: Request, res: Response) {
    const id = String(req.params.id);
    const { name, type, hp, attack, defense } = req.body;

    try {
      const pokemon = await this.updatePokemonUseCase.execute({
        id,
        name,
        type,
        hp,
        attack,
        defense,
      });

      return res.status(200).json({
        message: 'Pokémon atualizado com sucesso!',
        data: pokemon,
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({
          error: error.message,
        });
      }

      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      throw error;
    }
  }
  async delete(req: Request, res: Response) {
    const id = String(req.params.id);

    try {
      await this.deletePokemonUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({
          error: error.message,
        });
      }
      throw error;
    }
  }

  async patch(req: Request, res: Response) {
    const id = String(req.params.id);
    const { name, type, hp, attack, defense } = req.body;

    try {
      const pokemon = await this.patchPokemonUseCase.execute({
        id,
        name,
        type,
        hp,
        attack,
        defense,
      });

      return res.status(200).json({
        message: 'Pokémon atualizado parcialmente com sucesso!',
        data: pokemon,
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({
          error: error.message,
        });
      }

      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      throw error;
    }
  }
}
