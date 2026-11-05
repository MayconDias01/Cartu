import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../domain/cliente.entity';
import { CLIENTE_REPOSITORY, ClienteRepository } from '../domain/cliente.repository';

@Injectable()
export class ListClientesUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository) {}

  execute(): Promise<Cliente[]> {
    return this.clienteRepository.findAll();
  }
}
