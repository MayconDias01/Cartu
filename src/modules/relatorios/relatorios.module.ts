import { Module } from '@nestjs/common';
import { FinanceiroModule } from '../financeiro/financeiro.module';
import { OrdensServicoModule } from '../ordens-servico/ordens-servico.module';
import { TenantsModule } from '../tenants/tenants.module';
import { RelatoriosController } from './presentation/relatorios.controller';
import { RelatorioFinanceiroUseCase } from './application/relatorio-financeiro.use-case';
import { RelatorioOperacionalUseCase } from './application/relatorio-operacional.use-case';

@Module({
  imports: [OrdensServicoModule, FinanceiroModule, TenantsModule],
  controllers: [RelatoriosController],
  providers: [RelatorioOperacionalUseCase, RelatorioFinanceiroUseCase],
})
export class RelatoriosModule {}
