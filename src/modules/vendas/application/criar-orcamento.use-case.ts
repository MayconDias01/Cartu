import { Inject, Injectable } from '@nestjs/common';
import { FindClienteUseCase } from '../../clientes/application/find-cliente.use-case';
import { Orcamento } from '../domain/orcamento.entity';
import { NovoOrcamento, VENDAS_REPOSITORY, VendasRepository } from '../domain/vendas.repository';

@Injectable()
export class CriarOrcamentoUseCase {
  constructor(
    @Inject(VENDAS_REPOSITORY) private readonly vendasRepository: VendasRepository,
    private readonly findClienteUseCase: FindClienteUseCase,
  ) {}

  async execute(dados: NovoOrcamento): Promise<Orcamento> {
    await this.findClienteUseCase.execute(dados.clienteId);
    return this.vendasRepository.criarOrcamento(dados);
  }
}
