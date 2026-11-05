import { Module } from '@nestjs/common';
import { TENANT_REPOSITORY } from './domain/tenant.repository';
import { PrismaTenantRepository } from './infrastructure/prisma-tenant.repository';
import { TenantsController } from './presentation/tenants.controller';
import { FindTenantUseCase } from './application/find-tenant.use-case';

@Module({
  controllers: [TenantsController],
  providers: [FindTenantUseCase, { provide: TENANT_REPOSITORY, useClass: PrismaTenantRepository }],
  exports: [FindTenantUseCase],
})
export class TenantsModule {}
