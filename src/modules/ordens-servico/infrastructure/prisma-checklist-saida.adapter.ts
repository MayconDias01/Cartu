import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { ChecklistSaidaPort } from '../domain/checklist-saida.port';

@Injectable()
export class PrismaChecklistSaidaAdapter implements ChecklistSaidaPort {
  constructor(private readonly prisma: PrismaService) {}

  async existeChecklistSaida(ordemServicoId: string): Promise<boolean> {
    const count = await this.prisma.checklist.count({ where: { ordemServicoId, tipo: 'SAIDA' } });
    return count > 0;
  }
}
