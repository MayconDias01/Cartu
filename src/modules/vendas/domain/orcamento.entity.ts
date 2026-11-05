export type StatusOrcamento = 'ABERTO' | 'APROVADO' | 'RECUSADO' | 'CONVERTIDO';

export class Orcamento {
  constructor(
    public readonly id: string,
    public readonly clienteId: string,
    public readonly valorTotal: number,
    public status: StatusOrcamento,
  ) {}
}
