export type StatusDocumentoFiscal = 'PENDENTE' | 'EMITIDA' | 'CANCELADA';

export class DadosFiscais {
  constructor(
    public readonly id: string,
    public readonly ordemServicoId: string | null,
    public numeroNota: string | null,
    public status: StatusDocumentoFiscal,
  ) {}
}
