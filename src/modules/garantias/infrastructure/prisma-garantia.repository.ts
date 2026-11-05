import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Garantia } from '../domain/garantia.entity';
import { GarantiaRepository, NovaGarantia } from '../domain/garantia.repository';

@Injectable()
export class PrismaGarantiaRepository implements GarantiaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: NovaGarantia): Promise<Garantia> {
    const row = await this.prisma.garantia.create({ data: dados as Prisma.GarantiaUncheckedCreateInput });
    return new Garantia(row.id, row.ordemServicoId, row.prazoDias, row.termos);
  }

  async findByOrdemServico(ordemServicoId: string): Promise<Garantia | null> {
    const row = await this.prisma.garantia.findFirst({ where: { ordemServicoId } });
    if (!row) return null;
    return new Garantia(row.id, row.ordemServicoId, row.prazoDias, row.termos);
  }
}
