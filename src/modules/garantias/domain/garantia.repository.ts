import { Garantia } from './garantia.entity';

export interface NovaGarantia {
  ordemServicoId: string;
  prazoDias: number;
  termos: string;
}

export interface GarantiaRepository {
  create(dados: NovaGarantia): Promise<Garantia>;
  findByOrdemServico(ordemServicoId: string): Promise<Garantia | null>;
}

export const GARANTIA_REPOSITORY = Symbol('GARANTIA_REPOSITORY');
