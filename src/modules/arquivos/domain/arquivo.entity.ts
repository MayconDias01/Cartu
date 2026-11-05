export class Arquivo {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly url: string,
    public readonly tipo: string,
    public readonly ordemServicoId: string | null,
    public readonly createdAt: Date,
  ) {}
}
