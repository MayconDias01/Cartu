export type StatusOrdemServico =
  | 'ABERTA'
  | 'EM_ANDAMENTO'
  | 'AGUARDANDO_PECA'
  | 'CONCLUIDA'
  | 'CANCELADA';

export class OrdemServico {
  constructor(
    public readonly id: string,
    public readonly clienteId: string,
    public readonly veiculoId: string,
    public mecanicoId: string | null,
    public status: StatusOrdemServico,
    public descricaoProblema: string,
    public valorTotal: number,
  ) {}

  /** Regra de domínio: uma OS não fecha sem checklist de saída completo. */
  fechar(possuiChecklistSaida: boolean): void {
    if (this.status === 'CANCELADA') {
      throw new Error('Ordem de serviço cancelada não pode ser concluída');
    }
    if (!possuiChecklistSaida) {
      throw new Error('Ordem de serviço não pode ser fechada sem checklist de saída completo');
    }
    this.status = 'CONCLUIDA';
  }
}
