
export class TrainerCapture {
  constructor(
    public readonly id: string,
    public readonly trainerId: string,
    public readonly pokemonId: number,
    public readonly pokemonName: string,
    public readonly image: string | null,
    public readonly types: string[],
    public readonly hp: number,
    public readonly attack: number,
    public readonly defense: number,
    public readonly capturedAt?: Date,
  ) {}
}
