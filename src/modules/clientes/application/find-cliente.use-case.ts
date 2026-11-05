import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../domain/cliente.entity';
import { CLIENTE_REPOSITORY, ClienteRepository } from '../domain/cliente.repository';

@Injectable()
export class FindClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository) {}

  async execute(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return cliente;
  }
}
