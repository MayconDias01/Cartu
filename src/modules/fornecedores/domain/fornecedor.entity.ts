export class Fornecedor {
  constructor(
    public readonly id: string,
    public nome: string,
    public cnpj: string | null,
    public telefone: string | null,
    public email: string | null,
  ) {}
}
