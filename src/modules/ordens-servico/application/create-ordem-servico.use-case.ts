import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FindClienteUseCase } from '../../clientes/application/find-cliente.use-case';
import { FindVeiculoUseCase } from '../../clientes/application/find-veiculo.use-case';
import { OrdemServico } from '../domain/ordem-servico.entity';
import {
  NovaOrdemServico,
  ORDEM_SERVICO_REPOSITORY,
  OrdemServicoRepository,
} from '../domain/ordem-servico.repository';

@Injectable()
export class CreateOrdemServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY) private readonly ordemServicoRepository: OrdemServicoRepository,
    private readonly findClienteUseCase: FindClienteUseCase,
    private readonly findVeiculoUseCase: FindVeiculoUseCase,
  ) {}

  async execute(dados: NovaOrdemServico): Promise<OrdemServico> {
    await this.findClienteUseCase.execute(dados.clienteId);
    const veiculo = await this.findVeiculoUseCase.execute(dados.veiculoId);

    if (veiculo.clienteId !== dados.clienteId) {
      throw new BadRequestException('Veículo não pertence ao cliente informado');
    }

    return this.ordemServicoRepository.create(dados);
  }
}
