import { Module } from '@nestjs/common';
import { CatalogoModule } from '../catalogo/catalogo.module';
import { ESTOQUE_REPOSITORY } from './domain/estoque.repository';
import { PrismaEstoqueRepository } from './infrastructure/prisma-estoque.repository';
import { EstoqueController } from './presentation/estoque.controller';
import { ConsultarSaldoUseCase } from './application/consultar-saldo.use-case';
import { RegistrarMovimentacaoUseCase } from './application/registrar-movimentacao.use-case';

@Module({
  imports: [CatalogoModule],
  controllers: [EstoqueController],
  providers: [
    RegistrarMovimentacaoUseCase,
    ConsultarSaldoUseCase,
    { provide: ESTOQUE_REPOSITORY, useClass: PrismaEstoqueRepository },
  ],
})
export class EstoqueModule {}
