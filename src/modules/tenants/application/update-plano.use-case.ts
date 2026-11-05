import { Inject, Injectable } from '@nestjs/common';
import { Plano } from '../../../common/enums/plano.enum';
import { Tenant } from '../domain/tenant.entity';
import { TENANT_REPOSITORY, TenantRepository } from '../domain/tenant.repository';

@Injectable()
export class UpdatePlanoUseCase {
  constructor(@Inject(TENANT_REPOSITORY) private readonly tenantRepository: TenantRepository) {}

  async execute(tenantId: string, plano: Plano): Promise<Tenant> {
    return this.tenantRepository.updatePlano(tenantId, plano, Tenant.modulosParaPlano(plano));
  }
}
