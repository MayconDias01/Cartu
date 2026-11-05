import { Inject, Injectable } from '@nestjs/common';
import { Veiculo } from '../domain/veiculo.entity';
import { CLIENTE_REPOSITORY, ClienteRepository, NovoVeiculo } from '../domain/cliente.repository';
import { FindClienteUseCase } from './find-cliente.use-case';

@Injectable()
export class AddVeiculoUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository,
    private readonly findClienteUseCase: FindClienteUseCase,
  ) {}

  async execute(dados: NovoVeiculo): Promise<Veiculo> {
    await this.findClienteUseCase.execute(dados.clienteId);
    return this.clienteRepository.addVeiculo(dados);
  }
}
