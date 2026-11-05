export type TipoMovimentacao = 'ENTRADA' | 'SAIDA';

export class Movimentacao {
  constructor(
    public readonly id: string,
    public readonly produtoId: string,
    public readonly tipo: TipoMovimentacao,
    public readonly quantidade: number,
    public readonly motivo: string | null,
    public readonly createdAt: Date,
  ) {}
}
