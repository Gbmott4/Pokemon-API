import { NotFoundError } from '../../domain/errors/not-found-error';
import { ConflictError } from '../../domain/errors/conflict-error';
import { BadRequestError } from '../../domain/errors/bad-request-error';
import { TrainerCapture } from '../../domain/entities/trainer-capture';
import { ITrainerRepository } from '../../domain/repositories/ITrainerRepository';
import { ITrainerCaptureRepository } from '../../domain/repositories/ITrainerCaptureRepository';
import { IPokeApiGateway } from '../../domain/gateways/IPokeApiGateway';

interface CapturePokemonDTO {
  trainerId: string;
  pokemonName: string;
}

export class CapturePokemonUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private captureRepository: ITrainerCaptureRepository,
    private pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute(data: CapturePokemonDTO): Promise<TrainerCapture> {
    const trainer = await this.trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    const pokemonName = data.pokemonName.trim().toLowerCase();

    if (!pokemonName) {
      throw new BadRequestError('O nome do Pokémon é obrigatório.');
    }

    const totalCaptures = await this.captureRepository.countByTrainerId(
      data.trainerId,
    );

    if (totalCaptures >= 6) {
      throw new ConflictError('O treinador já possui seis Pokémon na equipe.');
    }

    const pokemon = await this.pokeApiGateway.searchByName(pokemonName);

    if (!pokemon) {
      throw new NotFoundError('Pokémon não encontrado na PokéAPI.');
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
