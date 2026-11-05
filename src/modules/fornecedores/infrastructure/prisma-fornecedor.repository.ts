import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Compra, StatusCompra } from '../domain/compra.entity';
import { Fornecedor } from '../domain/fornecedor.entity';
import { FornecedorRepository, NovaCompra, NovoFornecedor } from '../domain/fornecedor.repository';

@Injectable()
export class PrismaFornecedorRepository implements FornecedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Fornecedor[]> {
    const rows = await this.prisma.fornecedor.findMany({ orderBy: { nome: 'asc' } });
    return rows.map((row) => new Fornecedor(row.id, row.nome, row.cnpj, row.telefone, row.email));
  }

  async findById(id: string): Promise<Fornecedor | null> {
    const row = await this.prisma.fornecedor.findFirst({ where: { id } });
    if (!row) return null;
    return new Fornecedor(row.id, row.nome, row.cnpj, row.telefone, row.email);
  }

  async create(dados: NovoFornecedor): Promise<Fornecedor> {
    const row = await this.prisma.fornecedor.create({ data: dados as Prisma.FornecedorUncheckedCreateInput });
    return new Fornecedor(row.id, row.nome, row.cnpj, row.telefone, row.email);
  }

  async registrarCompra(dados: NovaCompra): Promise<Compra> {
    const row = await this.prisma.compra.create({ data: dados as Prisma.CompraUncheckedCreateInput });
    return new Compra(row.id, row.fornecedorId, Number(row.valorTotal), row.status as StatusCompra);
  }

  async atualizarStatusCompra(id: string, status: StatusCompra): Promise<Compra> {
    const row = await this.prisma.compra.update({ where: { id }, data: { status } });
    return new Compra(row.id, row.fornecedorId, Number(row.valorTotal), row.status as StatusCompra);
  }
}
