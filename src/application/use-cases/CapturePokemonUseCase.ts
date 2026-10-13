
import { AppError } from '../../domain/errors/app-error';
import { TrainerCapture } from '../../domain/entities/trainer-capture';
import { IPgTrainerRepository } from '../../domain/repositories/IPgTrainerRepository';
import { ITrainerCaptureRepository } from '../../domain/repositories/ITrainerCaptureRepository';
import { PokeApiGateway } from '../../infrastructure/providers/PokeApiGateway';
interface CapturePokemonDTO {
  trainerId: string;
  pokemonName: string;
}

export class CapturePokemonUseCase {
  constructor(
    private trainerRepository: IPgTrainerRepository,
    private captureRepository: ITrainerCaptureRepository,
    private pokeApiGateway: PokeApiGateway  ) {}

  async execute(data: CapturePokemonDTO): Promise<TrainerCapture> {
    const trainer = await this.trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    const pokemonName = data.pokemonName.trim().toLowerCase();

    if (!pokemonName) {
      throw new AppError('O nome do Pokémon é obrigatório.', 400);
    }

    const totalCaptures = await this.captureRepository.countByTrainerId(
      data.trainerId,
    );

    if (totalCaptures >= 6) {
      throw new AppError(
        'O treinador já possui seis Pokémon na equipe.',
        409,
      );
    }

    const pokemon = await this.pokeApiGateway.searchByName(pokemonName);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado na PokéAPI.', 404);
    }

    const capture = new TrainerCapture(
      '',
      data.trainerId,
      pokemon.id,
      pokemon.name,
      pokemon.image,
      pokemon.types,
      pokemon.hp,
      pokemon.attack,
      pokemon.defense,
    );

    await this.captureRepository.create(capture);

    return capture;
  }
}
