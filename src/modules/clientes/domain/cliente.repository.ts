import { Cliente } from './cliente.entity';
import { Veiculo } from './veiculo.entity';

export interface NovoCliente {
  nome: string;
  telefone?: string;
  email?: string;
  cpfCnpj?: string;
}

export interface NovoVeiculo {
  clienteId: string;
  placa: string;
  modelo: string;
  marca?: string;
  ano?: number;
}

export interface ClienteRepository {
  findAll(): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente | null>;
  create(dados: NovoCliente): Promise<Cliente>;
  addVeiculo(dados: NovoVeiculo): Promise<Veiculo>;
  listVeiculos(clienteId: string): Promise<Veiculo[]>;
  findVeiculoById(id: string): Promise<Veiculo | null>;
}

export const CLIENTE_REPOSITORY = Symbol('CLIENTE_REPOSITORY');
