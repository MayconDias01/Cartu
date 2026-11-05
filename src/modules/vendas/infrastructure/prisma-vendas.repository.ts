import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Orcamento, StatusOrcamento } from '../domain/orcamento.entity';
import { FormaPagamento, Venda } from '../domain/venda.entity';
import { NovaVenda, NovoOrcamento, VendasRepository } from '../domain/vendas.repository';

@Injectable()
export class PrismaVendasRepository implements VendasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criarOrcamento(dados: NovoOrcamento): Promise<Orcamento> {
    const row = await this.prisma.orcamento.create({ data: dados as Prisma.OrcamentoUncheckedCreateInput });
    return new Orcamento(row.id, row.clienteId, Number(row.valorTotal), row.status as StatusOrcamento);
  }

  async registrarVenda(dados: NovaVenda): Promise<Venda> {
    const row = await this.prisma.venda.create({ data: dados as Prisma.VendaUncheckedCreateInput });
    return new Venda(row.id, row.clienteId, Number(row.valorTotal), row.formaPagamento as FormaPagamento);
  }

  async listarVendas(): Promise<Venda[]> {
    const rows = await this.prisma.venda.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((row) => new Venda(row.id, row.clienteId, Number(row.valorTotal), row.formaPagamento as FormaPagamento));
  }
}
