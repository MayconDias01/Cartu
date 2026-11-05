export class Cliente {
  constructor(
    public readonly id: string,
    public nome: string,
    public telefone: string | null,
    public email: string | null,
    public cpfCnpj: string | null,
  ) {}
}
