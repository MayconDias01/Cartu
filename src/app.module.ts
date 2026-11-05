import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantContextInterceptor } from './common/interceptors/tenant-context.interceptor';
import { IntegrationsModule } from './infra/integrations/integrations.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { ArquivosModule } from './modules/arquivos/arquivos.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogoModule } from './modules/catalogo/catalogo.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { FiscalModule } from './modules/fiscal/fiscal.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { GarantiasModule } from './modules/garantias/garantias.module';
import { OrdensServicoModule } from './modules/ordens-servico/ordens-servico.module';
import { RelatoriosModule } from './modules/relatorios/relatorios.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { VendasModule } from './modules/vendas/vendas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    IntegrationsModule,
    AuthModule,
    TenantsModule,
    ClientesModule,
    CatalogoModule,
    EstoqueModule,
    OrdensServicoModule,
    ChecklistModule,
    GarantiasModule,
    FinanceiroModule,
    ArquivosModule,
    FornecedoresModule,
    VendasModule,
    FiscalModule,
    RelatoriosModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TenantContextInterceptor }],
})
export class AppModule {}
