export class Servico {
  constructor(
    public readonly id: string,
    public nome: string,
    public descricao: string | null,
    public preco: number,
    public ativo: boolean,
  ) {}
}
