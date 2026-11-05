import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Cliente } from '../domain/cliente.entity';
import {
  ClienteRepository,
  NovoCliente,
  NovoVeiculo,
} from '../domain/cliente.repository';
import { Veiculo } from '../domain/veiculo.entity';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Cliente[]> {
    const rows = await this.prisma.cliente.findMany({ orderBy: { nome: 'asc' } });
    return rows.map((row) => new Cliente(row.id, row.nome, row.telefone, row.email, row.cpfCnpj));
  }

  async findById(id: string): Promise<Cliente | null> {
    const row = await this.prisma.cliente.findFirst({ where: { id } });
    if (!row) return null;
    return new Cliente(row.id, row.nome, row.telefone, row.email, row.cpfCnpj);
  }

  async create(dados: NovoCliente): Promise<Cliente> {
    const row = await this.prisma.cliente.create({ data: dados as Prisma.ClienteUncheckedCreateInput });
    return new Cliente(row.id, row.nome, row.telefone, row.email, row.cpfCnpj);
  }

  async addVeiculo(dados: NovoVeiculo): Promise<Veiculo> {
    const row = await this.prisma.veiculo.create({ data: dados as Prisma.VeiculoUncheckedCreateInput });
    return new Veiculo(row.id, row.clienteId, row.placa, row.modelo, row.marca, row.ano);
  }

  async listVeiculos(clienteId: string): Promise<Veiculo[]> {
    const rows = await this.prisma.veiculo.findMany({ where: { clienteId } });
    return rows.map((row) => new Veiculo(row.id, row.clienteId, row.placa, row.modelo, row.marca, row.ano));
  }

  async findVeiculoById(id: string): Promise<Veiculo | null> {
    const row = await this.prisma.veiculo.findFirst({ where: { id } });
    if (!row) return null;
    return new Veiculo(row.id, row.clienteId, row.placa, row.modelo, row.marca, row.ano);
  }
}
