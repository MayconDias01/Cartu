import { Orcamento } from './orcamento.entity';
import { FormaPagamento, Venda } from './venda.entity';

export interface NovoOrcamento {
  clienteId: string;
  valorTotal: number;
}

export interface NovaVenda {
  clienteId?: string;
  valorTotal: number;
  formaPagamento: FormaPagamento;
}

export interface VendasRepository {
  criarOrcamento(dados: NovoOrcamento): Promise<Orcamento>;
  registrarVenda(dados: NovaVenda): Promise<Venda>;
  listarVendas(): Promise<Venda[]>;
}

export const VENDAS_REPOSITORY = Symbol('VENDAS_REPOSITORY');
