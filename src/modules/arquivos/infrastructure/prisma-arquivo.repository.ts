import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Arquivo } from '../domain/arquivo.entity';
import { ArquivoRepository, NovoArquivo } from '../domain/arquivo.repository';

@Injectable()
export class PrismaArquivoRepository implements ArquivoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: NovoArquivo): Promise<Arquivo> {
    // tenantId é injetado pelo middleware do PrismaService, não faz parte do contrato do caso de uso.
    const row = await this.prisma.arquivo.create({ data: dados as Prisma.ArquivoUncheckedCreateInput });
    return new Arquivo(row.id, row.nome, row.url, row.tipo, row.ordemServicoId, row.createdAt);
  }

  async findAll(ordemServicoId?: string): Promise<Arquivo[]> {
    const rows = await this.prisma.arquivo.findMany({
      where: ordemServicoId ? { ordemServicoId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => new Arquivo(row.id, row.nome, row.url, row.tipo, row.ordemServicoId, row.createdAt));
  }
}
