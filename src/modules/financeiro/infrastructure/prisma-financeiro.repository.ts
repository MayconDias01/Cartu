import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FiltroLancamento, FinanceiroRepository, NovoLancamento } from '../domain/financeiro.repository';
import { Lancamento, TipoLancamento } from '../domain/lancamento.entity';

@Injectable()
export class PrismaFinanceiroRepository implements FinanceiroRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dados: NovoLancamento): Promise<Lancamento> {
    const row = await this.prisma.financeiro.create({ data: dados as Prisma.FinanceiroUncheckedCreateInput });
    return this.toEntity(row);
  }

  async findAll(filtro?: FiltroLancamento): Promise<Lancamento[]> {
    const rows = await this.prisma.financeiro.findMany({
      where: filtro,
      orderBy: { vencimento: 'asc' },
    });
    return rows.map((row) => this.toEntity(row));
  }

  async marcarComoPago(id: string): Promise<Lancamento> {
    const row = await this.prisma.financeiro.update({ where: { id }, data: { pago: true } });
    return this.toEntity(row);
  }

  private toEntity(row: {
    id: string;
    tipo: string;
    descricao: string;
    valor: unknown;
    vencimento: Date;
    pago: boolean;
    ordemServicoId: string | null;
  }): Lancamento {
    return new Lancamento(
      row.id,
      row.tipo as TipoLancamento,
      row.descricao,
      Number(row.valor),
      row.vencimento,
      row.pago,
      row.ordemServicoId,
    );
  }
}
