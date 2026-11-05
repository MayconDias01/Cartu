import { Injectable } from '@nestjs/common';
import { Plano } from '../../../common/enums/plano.enum';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Tenant } from '../domain/tenant.entity';
import { NovoTenant, TenantRepository } from '../domain/tenant.repository';

@Injectable()
export class PrismaTenantRepository implements TenantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Tenant | null> {
    const row = await this.prisma.tenant.findUnique({ where: { id } });
    if (!row) return null;
    return new Tenant(row.id, row.nome, row.plano as Plano, row.modulosLiberados);
  }

  async create(dados: NovoTenant): Promise<Tenant> {
    const row = await this.prisma.tenant.create({ data: dados });
    return new Tenant(row.id, row.nome, row.plano as Plano, row.modulosLiberados);
  }
}
