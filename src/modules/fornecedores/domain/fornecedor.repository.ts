import { Compra, StatusCompra } from './compra.entity';
import { Fornecedor } from './fornecedor.entity';

export interface NovoFornecedor {
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

export interface NovaCompra {
  fornecedorId: string;
  valorTotal: number;
}

export interface FornecedorRepository {
  findAll(): Promise<Fornecedor[]>;
  findById(id: string): Promise<Fornecedor | null>;
  create(dados: NovoFornecedor): Promise<Fornecedor>;
  registrarCompra(dados: NovaCompra): Promise<Compra>;
  atualizarStatusCompra(id: string, status: StatusCompra): Promise<Compra>;
}

export const FORNECEDOR_REPOSITORY = Symbol('FORNECEDOR_REPOSITORY');
