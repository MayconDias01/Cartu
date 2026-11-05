import { Produto } from './produto.entity';
import { Servico } from './servico.entity';

export interface NovoProduto {
  nome: string;
  descricao?: string;
  precoVenda: number;
  unidade?: string;
}

export interface NovoServico {
  nome: string;
  descricao?: string;
  preco: number;
}

export interface CatalogoRepository {
  findAllProdutos(): Promise<Produto[]>;
  findProdutoById(id: string): Promise<Produto | null>;
  createProduto(dados: NovoProduto): Promise<Produto>;
  findAllServicos(): Promise<Servico[]>;
  createServico(dados: NovoServico): Promise<Servico>;
}

export const CATALOGO_REPOSITORY = Symbol('CATALOGO_REPOSITORY');
