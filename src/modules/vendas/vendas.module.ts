import { Module } from '@nestjs/common';
import { ClientesModule } from '../clientes/clientes.module';
import { TenantsModule } from '../tenants/tenants.module';
import { VENDAS_REPOSITORY } from './domain/vendas.repository';
import { PrismaVendasRepository } from './infrastructure/prisma-vendas.repository';
import { VendasController } from './presentation/vendas.controller';
import { CriarOrcamentoUseCase } from './application/criar-orcamento.use-case';
import { ListarVendasUseCase } from './application/listar-vendas.use-case';
import { RegistrarVendaUseCase } from './application/registrar-venda.use-case';

@Module({
  imports: [ClientesModule, TenantsModule],
  controllers: [VendasController],
  providers: [
    CriarOrcamentoUseCase,
    RegistrarVendaUseCase,
    ListarVendasUseCase,
    { provide: VENDAS_REPOSITORY, useClass: PrismaVendasRepository },
  ],
})
export class VendasModule {}
