import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { EstoqueRepository, NovaMovimentacao } from '../domain/estoque.repository';
import { Movimentacao, TipoMovimentacao } from '../domain/movimentacao.entity';

@Injectable()
export class PrismaEstoqueRepository implements EstoqueRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(dados: NovaMovimentacao): Promise<Movimentacao> {
    const row = await this.prisma.estoqueMovimentacao.create({
      data: dados as Prisma.EstoqueMovimentacaoUncheckedCreateInput,
    });
    return new Movimentacao(
      row.id,
      row.produtoId,
      row.tipo as TipoMovimentacao,
      row.quantidade,
      row.motivo,
      row.createdAt,
    );
  }

  async listarPorProduto(produtoId: string): Promise<Movimentacao[]> {
    const rows = await this.prisma.estoqueMovimentacao.findMany({
      where: { produtoId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(
      (row) =>
        new Movimentacao(row.id, row.produtoId, row.tipo as TipoMovimentacao, row.quantidade, row.motivo, row.createdAt),
    );
  }

  async saldoAtual(produtoId: string): Promise<number> {
    const [entradas, saidas] = await Promise.all([
      this.prisma.estoqueMovimentacao.aggregate({
        where: { produtoId, tipo: 'ENTRADA' },
        _sum: { quantidade: true },
      }),
      this.prisma.estoqueMovimentacao.aggregate({
        where: { produtoId, tipo: 'SAIDA' },
        _sum: { quantidade: true },
      }),
    ]);
    return (entradas._sum.quantidade ?? 0) - (saidas._sum.quantidade ?? 0);
  }
}
