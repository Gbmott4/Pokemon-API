export interface PokemonApiDTO {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}
