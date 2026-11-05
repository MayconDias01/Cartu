export class Produto {
  constructor(
    public readonly id: string,
    public nome: string,
    public descricao: string | null,
    public precoVenda: number,
    public unidade: string,
    public ativo: boolean,
  ) {}
}
