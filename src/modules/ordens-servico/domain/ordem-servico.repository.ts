import { OrdemServico, StatusOrdemServico } from './ordem-servico.entity';

export interface NovaOrdemServico {
  clienteId: string;
  veiculoId: string;
  mecanicoId?: string;
  descricaoProblema: string;
}

export interface FiltroOrdemServico {
  mecanicoId?: string;
}

export interface OrdemServicoRepository {
  findAll(filtro?: FiltroOrdemServico): Promise<OrdemServico[]>;
  findById(id: string): Promise<OrdemServico | null>;
  create(dados: NovaOrdemServico): Promise<OrdemServico>;
  updateStatus(id: string, status: StatusOrdemServico): Promise<OrdemServico>;
  atribuirMecanico(id: string, mecanicoId: string): Promise<OrdemServico>;
}

export const ORDEM_SERVICO_REPOSITORY = Symbol('ORDEM_SERVICO_REPOSITORY');
