import { Checklist, TipoChecklist } from './checklist.entity';

export interface NovoChecklist {
  ordemServicoId: string;
  tipo: TipoChecklist;
  observacoes?: string;
  fotos: string[];
  autorId: string;
}

export interface ChecklistRepository {
  create(dados: NovoChecklist): Promise<Checklist>;
  findByOrdemServico(ordemServicoId: string): Promise<Checklist[]>;
}

export const CHECKLIST_REPOSITORY = Symbol('CHECKLIST_REPOSITORY');
