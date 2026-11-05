import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { OrdemServico, StatusOrdemServico } from '../domain/ordem-servico.entity';
import {
  FiltroOrdemServico,
  NovaOrdemServico,
  OrdemServicoRepository,
} from '../domain/ordem-servico.repository';

@Injectable()
export class PrismaOrdemServicoRepository implements OrdemServicoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filtro?: FiltroOrdemServico): Promise<OrdemServico[]> {
    const rows = await this.prisma.ordemServico.findMany({
      where: filtro?.mecanicoId ? { mecanicoId: filtro.mecanicoId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async findById(id: string): Promise<OrdemServico | null> {
    const row = await this.prisma.ordemServico.findFirst({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async create(dados: NovaOrdemServico): Promise<OrdemServico> {
    const row = await this.prisma.ordemServico.create({ data: dados as Prisma.OrdemServicoUncheckedCreateInput });
    return this.toEntity(row);
  }

  async updateStatus(id: string, status: StatusOrdemServico): Promise<OrdemServico> {
    const row = await this.prisma.ordemServico.update({ where: { id }, data: { status } });
    return this.toEntity(row);
  }

  async atribuirMecanico(id: string, mecanicoId: string): Promise<OrdemServico> {
    const row = await this.prisma.ordemServico.update({ where: { id }, data: { mecanicoId } });
    return this.toEntity(row);
  }

  private toEntity(row: {
    id: string;
    clienteId: string;
    veiculoId: string;
    mecanicoId: string | null;
    status: string;
    descricaoProblema: string;
    valorTotal: unknown;
  }): OrdemServico {
    return new OrdemServico(
      row.id,
      row.clienteId,
      row.veiculoId,
      row.mecanicoId,
      row.status as StatusOrdemServico,
      row.descricaoProblema,
      Number(row.valorTotal),
    );
  }
}
