export type StatusCompra = 'PENDENTE' | 'RECEBIDA' | 'CANCELADA';

export class Compra {
  constructor(
    public readonly id: string,
    public readonly fornecedorId: string,
    public readonly valorTotal: number,
    public status: StatusCompra,
  ) {}
}
