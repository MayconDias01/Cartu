export class Veiculo {
  constructor(
    public readonly id: string,
    public readonly clienteId: string,
    public placa: string,
    public modelo: string,
    public marca: string | null,
    public ano: number | null,
  ) {}
}
