import { DadosFiscais } from './dados-fiscais.entity';

export interface NovoDadosFiscais {
  ordemServicoId?: string;
}

export interface DadosFiscaisRepository {
  create(dados: NovoDadosFiscais): Promise<DadosFiscais>;
  findAll(): Promise<DadosFiscais[]>;
}

export const DADOS_FISCAIS_REPOSITORY = Symbol('DADOS_FISCAIS_REPOSITORY');
