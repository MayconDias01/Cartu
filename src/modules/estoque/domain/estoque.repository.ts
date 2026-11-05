import { Movimentacao, TipoMovimentacao } from './movimentacao.entity';

export interface NovaMovimentacao {
  produtoId: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  motivo?: string;
}

export interface EstoqueRepository {
  registrar(dados: NovaMovimentacao): Promise<Movimentacao>;
  listarPorProduto(produtoId: string): Promise<Movimentacao[]>;
  saldoAtual(produtoId: string): Promise<number>;
}

export const ESTOQUE_REPOSITORY = Symbol('ESTOQUE_REPOSITORY');
