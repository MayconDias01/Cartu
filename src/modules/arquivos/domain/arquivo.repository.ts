import { Arquivo } from './arquivo.entity';

export interface NovoArquivo {
  nome: string;
  url: string;
  tipo: string;
  ordemServicoId?: string;
}

export interface ArquivoRepository {
  create(dados: NovoArquivo): Promise<Arquivo>;
  findAll(ordemServicoId?: string): Promise<Arquivo[]>;
}

export const ARQUIVO_REPOSITORY = Symbol('ARQUIVO_REPOSITORY');
