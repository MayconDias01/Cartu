import { Lancamento, TipoLancamento } from './lancamento.entity';

export interface NovoLancamento {
  tipo: TipoLancamento;
  descricao: string;
  valor: number;
  vencimento: Date;
  ordemServicoId?: string;
}

export interface FiltroLancamento {
  tipo?: TipoLancamento;
  pago?: boolean;
}

export interface FinanceiroRepository {
  create(dados: NovoLancamento): Promise<Lancamento>;
  findAll(filtro?: FiltroLancamento): Promise<Lancamento[]>;
  marcarComoPago(id: string): Promise<Lancamento>;
}

export const FINANCEIRO_REPOSITORY = Symbol('FINANCEIRO_REPOSITORY');
