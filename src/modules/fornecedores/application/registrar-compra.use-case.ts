import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Compra } from '../domain/compra.entity';
import { FORNECEDOR_REPOSITORY, FornecedorRepository, NovaCompra } from '../domain/fornecedor.repository';

@Injectable()
export class RegistrarCompraUseCase {
  constructor(@Inject(FORNECEDOR_REPOSITORY) private readonly fornecedorRepository: FornecedorRepository) {}

  async execute(dados: NovaCompra): Promise<Compra> {
    const fornecedor = await this.fornecedorRepository.findById(dados.fornecedorId);
    if (!fornecedor) throw new NotFoundException('Fornecedor não encontrado');

    return this.fornecedorRepository.registrarCompra(dados);
  }
}
