import { Module } from '@nestjs/common';
import { FINANCEIRO_REPOSITORY } from './domain/financeiro.repository';
import { PrismaFinanceiroRepository } from './infrastructure/prisma-financeiro.repository';
import { FinanceiroController } from './presentation/financeiro.controller';
import { CreateLancamentoUseCase } from './application/create-lancamento.use-case';
import { ListLancamentosUseCase } from './application/list-lancamentos.use-case';
import { MarcarPagoUseCase } from './application/marcar-pago.use-case';

@Module({
  controllers: [FinanceiroController],
  providers: [
    CreateLancamentoUseCase,
    ListLancamentosUseCase,
    MarcarPagoUseCase,
    { provide: FINANCEIRO_REPOSITORY, useClass: PrismaFinanceiroRepository },
  ],
  exports: [ListLancamentosUseCase],
})
export class FinanceiroModule {}
