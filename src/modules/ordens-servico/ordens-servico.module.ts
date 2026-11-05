import { Module } from '@nestjs/common';
import { ClientesModule } from '../clientes/clientes.module';
import { CHECKLIST_SAIDA_PORT } from './domain/checklist-saida.port';
import { ORDEM_SERVICO_REPOSITORY } from './domain/ordem-servico.repository';
import { PrismaChecklistSaidaAdapter } from './infrastructure/prisma-checklist-saida.adapter';
import { PrismaOrdemServicoRepository } from './infrastructure/prisma-ordem-servico.repository';
import { OrdensServicoController } from './presentation/ordens-servico.controller';
import { ContarOrdensPorStatusUseCase } from './application/contar-por-status.use-case';
import { CreateOrdemServicoUseCase } from './application/create-ordem-servico.use-case';
import { FecharOrdemServicoUseCase } from './application/fechar-ordem-servico.use-case';
import { FindOrdemServicoUseCase } from './application/find-ordem-servico.use-case';
import { ListOrdensServicoUseCase } from './application/list-ordens-servico.use-case';

@Module({
  imports: [ClientesModule],
  controllers: [OrdensServicoController],
  providers: [
    ListOrdensServicoUseCase,
    FindOrdemServicoUseCase,
    CreateOrdemServicoUseCase,
    FecharOrdemServicoUseCase,
    ContarOrdensPorStatusUseCase,
    { provide: ORDEM_SERVICO_REPOSITORY, useClass: PrismaOrdemServicoRepository },
    { provide: CHECKLIST_SAIDA_PORT, useClass: PrismaChecklistSaidaAdapter },
  ],
  exports: [FindOrdemServicoUseCase, ContarOrdensPorStatusUseCase],
})
export class OrdensServicoModule {}
