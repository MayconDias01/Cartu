import { Module } from '@nestjs/common';
import { TenantsModule } from '../tenants/tenants.module';
import { DADOS_FISCAIS_REPOSITORY } from './domain/dados-fiscais.repository';
import { PrismaDadosFiscaisRepository } from './infrastructure/prisma-dados-fiscais.repository';
import { FiscalController } from './presentation/fiscal.controller';
import { ListarDadosFiscaisUseCase } from './application/listar-dados-fiscais.use-case';
import { SolicitarEmissaoUseCase } from './application/solicitar-emissao.use-case';

@Module({
  imports: [TenantsModule],
  controllers: [FiscalController],
  providers: [
    SolicitarEmissaoUseCase,
    ListarDadosFiscaisUseCase,
    { provide: DADOS_FISCAIS_REPOSITORY, useClass: PrismaDadosFiscaisRepository },
  ],
})
export class FiscalModule {}
