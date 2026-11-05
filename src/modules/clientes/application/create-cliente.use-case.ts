import { Inject, Injectable } from '@nestjs/common';
import { Cliente } from '../domain/cliente.entity';
import { CLIENTE_REPOSITORY, ClienteRepository, NovoCliente } from '../domain/cliente.repository';

@Injectable()
export class CreateClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository) {}

  execute(dados: NovoCliente): Promise<Cliente> {
    return this.clienteRepository.create(dados);
  }
}
