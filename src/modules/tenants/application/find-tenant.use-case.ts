import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tenant } from '../domain/tenant.entity';
import { TENANT_REPOSITORY, TenantRepository } from '../domain/tenant.repository';

@Injectable()
export class FindTenantUseCase {
  constructor(@Inject(TENANT_REPOSITORY) private readonly tenantRepository: TenantRepository) {}

  async execute(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new NotFoundException('Tenant não encontrado');
    }
    return tenant;
  }
}
