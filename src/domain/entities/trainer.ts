export class Trainer {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public city: string,
    public readonly createdAt?: Date,
  ) {}
}
