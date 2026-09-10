export class Pokemon {
  constructor(
    public readonly id: string,
    public name: string,
    public type: string,
    public hp: number,
    public attack: number,
    public defense: number,
  ) {
    if (hp <= 0) {
      throw new Error('HP deve ser maior que zero.');
    }

    if (attack <= 0) {
      throw new Error('Attack deve ser maior que zero.');
    }

    if (defense <= 0) {
      throw new Error('Defense deve ser maior que zero.');
    }
  }
}
