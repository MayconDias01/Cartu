import { Module } from '@nestjs/common';
import { CLIENTE_REPOSITORY } from './domain/cliente.repository';
import { PrismaClienteRepository } from './infrastructure/prisma-cliente.repository';
import { ClientesController } from './presentation/clientes.controller';
import { AddVeiculoUseCase } from './application/add-veiculo.use-case';
import { CreateClienteUseCase } from './application/create-cliente.use-case';
import { FindClienteUseCase } from './application/find-cliente.use-case';
import { FindVeiculoUseCase } from './application/find-veiculo.use-case';
import { ListClientesUseCase } from './application/list-clientes.use-case';

@Module({
  controllers: [ClientesController],
  providers: [
    ListClientesUseCase,
    FindClienteUseCase,
    FindVeiculoUseCase,
    CreateClienteUseCase,
    AddVeiculoUseCase,
    { provide: CLIENTE_REPOSITORY, useClass: PrismaClienteRepository },
  ],
  exports: [FindClienteUseCase, FindVeiculoUseCase],
})
export class ClientesModule {}
