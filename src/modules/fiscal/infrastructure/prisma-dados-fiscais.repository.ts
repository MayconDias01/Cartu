import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { DadosFiscais, StatusDocumentoFiscal } from '../domain/dados-fiscais.entity';
import { DadosFiscaisRepository, NovoDadosFiscais } from '../domain/dados-fiscais.repository';

@Injectable()
export class PrismaDadosFiscaisRepository implements DadosFiscaisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: NovoDadosFiscais): Promise<DadosFiscais> {
    const row = await this.prisma.dadosFiscais.create({ data: dados as Prisma.DadosFiscaisUncheckedCreateInput });
    return new DadosFiscais(row.id, row.ordemServicoId, row.numeroNota, row.status as StatusDocumentoFiscal);
  }

  async findAll(): Promise<DadosFiscais[]> {
    const rows = await this.prisma.dadosFiscais.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((row) => new DadosFiscais(row.id, row.ordemServicoId, row.numeroNota, row.status as StatusDocumentoFiscal));
  }
}
