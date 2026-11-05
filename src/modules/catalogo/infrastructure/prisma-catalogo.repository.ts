import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CatalogoRepository, NovoProduto, NovoServico } from '../domain/catalogo.repository';
import { Produto } from '../domain/produto.entity';
import { Servico } from '../domain/servico.entity';

@Injectable()
export class PrismaCatalogoRepository implements CatalogoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllProdutos(): Promise<Produto[]> {
    const rows = await this.prisma.produto.findMany({ where: { ativo: true }, orderBy: { nome: 'asc' } });
    return rows.map(
      (row) => new Produto(row.id, row.nome, row.descricao, Number(row.precoVenda), row.unidade, row.ativo),
    );
  }

  async findProdutoById(id: string): Promise<Produto | null> {
    const row = await this.prisma.produto.findFirst({ where: { id } });
    if (!row) return null;
    return new Produto(row.id, row.nome, row.descricao, Number(row.precoVenda), row.unidade, row.ativo);
  }

  async createProduto(dados: NovoProduto): Promise<Produto> {
    const row = await this.prisma.produto.create({ data: dados as Prisma.ProdutoUncheckedCreateInput });
    return new Produto(row.id, row.nome, row.descricao, Number(row.precoVenda), row.unidade, row.ativo);
  }

  async findAllServicos(): Promise<Servico[]> {
    const rows = await this.prisma.servico.findMany({ where: { ativo: true }, orderBy: { nome: 'asc' } });
    return rows.map((row) => new Servico(row.id, row.nome, row.descricao, Number(row.preco), row.ativo));
  }

  async createServico(dados: NovoServico): Promise<Servico> {
    const row = await this.prisma.servico.create({ data: dados as Prisma.ServicoUncheckedCreateInput });
    return new Servico(row.id, row.nome, row.descricao, Number(row.preco), row.ativo);
  }
}
