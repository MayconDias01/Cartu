export type TipoChecklist = 'ENTRADA' | 'DIAGNOSTICO' | 'SAIDA';

export class Checklist {
  constructor(
    public readonly id: string,
    public readonly ordemServicoId: string,
    public readonly tipo: TipoChecklist,
    public readonly observacoes: string | null,
    public readonly fotos: string[],
    public readonly autorId: string,
    public readonly createdAt: Date,
  ) {}
}
