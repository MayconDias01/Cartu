export class Garantia {
  constructor(
    public readonly id: string,
    public readonly ordemServicoId: string,
    public readonly prazoDias: number,
    public readonly termos: string,
  ) {}
}
