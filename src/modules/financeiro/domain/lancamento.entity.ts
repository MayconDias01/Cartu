export type TipoLancamento = 'PAGAR' | 'RECEBER';

export class Lancamento {
  constructor(
    public readonly id: string,
    public readonly tipo: TipoLancamento,
    public readonly descricao: string,
    public readonly valor: number,
    public readonly vencimento: Date,
    public pago: boolean,
    public readonly ordemServicoId: string | null,
  ) {}
}
