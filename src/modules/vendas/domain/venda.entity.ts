export type FormaPagamento = 'DINHEIRO' | 'CARTAO' | 'PIX';

export class Venda {
  constructor(
    public readonly id: string,
    public readonly clienteId: string | null,
    public readonly valorTotal: number,
    public readonly formaPagamento: FormaPagamento,
  ) {}
}
