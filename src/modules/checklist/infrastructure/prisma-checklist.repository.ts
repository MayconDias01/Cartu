import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Checklist, TipoChecklist } from '../domain/checklist.entity';
import { ChecklistRepository, NovoChecklist } from '../domain/checklist.repository';

@Injectable()
export class PrismaChecklistRepository implements ChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: NovoChecklist): Promise<Checklist> {
    const row = await this.prisma.checklist.create({ data: dados as Prisma.ChecklistUncheckedCreateInput });
    return this.toEntity(row);
  }

  async findByOrdemServico(ordemServicoId: string): Promise<Checklist[]> {
    const rows = await this.prisma.checklist.findMany({
      where: { ordemServicoId },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  private toEntity(row: {
    id: string;
    ordemServicoId: string;
    tipo: string;
    observacoes: string | null;
    fotos: string[];
    autorId: string;
    createdAt: Date;
  }): Checklist {
    return new Checklist(
      row.id,
      row.ordemServicoId,
      row.tipo as TipoChecklist,
      row.observacoes,
      row.fotos,
      row.autorId,
      row.createdAt,
    );
  }
}
