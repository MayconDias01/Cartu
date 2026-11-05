import { Module } from '@nestjs/common';
import { TENANT_REPOSITORY } from './domain/tenant.repository';
import { PrismaTenantRepository } from './infrastructure/prisma-tenant.repository';
import { TenantsController } from './presentation/tenants.controller';
import { CreateTenantUseCase } from './application/create-tenant.use-case';
import { FindTenantUseCase } from './application/find-tenant.use-case';
import { UpdatePlanoUseCase } from './application/update-plano.use-case';

@Module({
  controllers: [TenantsController],
  providers: [
    CreateTenantUseCase,
    FindTenantUseCase,
    UpdatePlanoUseCase,
    { provide: TENANT_REPOSITORY, useClass: PrismaTenantRepository },
  ],
  exports: [FindTenantUseCase],
})
export class TenantsModule {}
