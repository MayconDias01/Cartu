import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CLIENTE_REPOSITORY, ClienteRepository } from '../domain/cliente.repository';
import { Veiculo } from '../domain/veiculo.entity';

@Injectable()
export class FindVeiculoUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string): Promise<Veiculo> {
    const veiculo = await this.clienteRepository.findVeiculoById(id);
    if (!veiculo) throw new NotFoundException('Veículo não encontrado');
    return veiculo;
  }
}
